const express = require('express');
const router = express.Router();
const { createComment, getCommentsByBusiness, deleteComment, updateComment } = require('../controllers/commentsController');
const authenticateToken = require('../middleware/authMiddleware');

// Only logged-in users can create, update, or delete comments
router.post('/comment', authenticateToken, createComment);
router.put('/comment/:id', authenticateToken, updateComment);
router.delete('/comment/:id', authenticateToken, deleteComment);

// No authentication needed for fetching comments
router.get('/comment/businesses/:businessId/comments', getCommentsByBusiness);

module.exports = router;
