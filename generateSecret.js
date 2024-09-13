const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex"); // Generate a 256-bit secret
console.log(secret);
