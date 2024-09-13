const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Helper function to validate password
const passwordValidation = (password) => {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasLetter && hasCharacter;
};

// Register new user
exports.register = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  try {
    const userByUsername = await prisma.user.findUnique({
      where: { username },
    });
    const userByEmail = await prisma.user.findUnique({ where: { email } });

    if (userByUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    if (userByEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (!passwordValidation(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain a letter and a special character",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
        firstname,
        lastname,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Include user ID and other necessary information in the response
    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { firstname, lastname, email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        email: email || user.email,
      },
    });

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.delete({ where: { id: req.user.id } });

    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a token and set expiration
    const token = crypto.randomBytes(3).toString("hex").toUpperCase(); // Generates a 6-character code
    const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Store the token in the database
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or any other email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Verification Code",
      text: `You requested a password reset. Please use the following verification code to reset your password: ${token}. The code is valid for 1 hour.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Verification code sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the token in the database
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    // Check if the token is invalid or expired
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Validate the new password (e.g., length, special characters)
    if (!passwordValidation(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain a letter and a special character",
      });
    }

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newPassword, salt);

    // Update the user's password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: passwordHash },
    });

    // Delete the used token
    await prisma.passwordResetToken.delete({ where: { token } });

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
