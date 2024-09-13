const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authMiddleware'); // Import the authentication middleware

const createComment = async (req, res) => {
  try {
    const { businessId, comment } = req.body;

    // Check if all required fields are present
    if (!businessId || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new comment associated with the logged-in user
    const newComment = await prisma.comment.create({
      data: {
        userId: req.user.id,  // Use the user ID from the authenticated user
        businessId,
        comment,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    console.log('Request params:', req.params); // Debugging logs
    console.log('Request body:', req.body);     // Debugging logs

    // Validate input
    if (!id || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Optionally, verify if the user owns the comment
    // if (existingComment.userId !== req.user.id) {
    //   return res.status(403).json({ error: 'You can only update your own comment' });
    // }

    // Update the comment
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { comment },
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCommentsByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Validate businessId
    if (!businessId) {
      return res.status(400).json({ error: 'Missing businessId' });
    }

    // Get comments for the specific business
    const comments = await prisma.comment.findMany({
      where: { businessId },
      include: { user: true },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate comment ID
    if (!id) {
      return res.status(400).json({ error: 'Missing comment ID' });
    }

    // Check if the comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Optionally, ensure the logged-in user owns the comment or has permission
    // if (existingComment.userId !== req.user.id) {
    //   return res.status(403).json({ error: 'You can only delete your own comment' });
    // }

    // Delete the comment
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Comment deleted successfully', deletedComment });
  } catch (error) {
    console.error('Error deleting comment:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createComment,
  getCommentsByBusiness,
  deleteComment,
  updateComment,
};
