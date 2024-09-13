const express = require('express');
const router = express.Router();
const { createRating, updateRating, deleteRating, getRatingsByBusiness } = require('../controllers/ratingController');
const auth = require('../middleware/authMiddleware'); // Middleware to check if the user is logged in

router.post('/rate', auth, createRating); // Only logged-in users can create a rating
router.put('/rate/:id', auth, updateRating); // Only logged-in users can update their rating
router.delete('/rate/:id', auth, deleteRating); // Only logged-in users can delete their rating
router.get('/business/:businessId/ratings', getRatingsByBusiness); // Fetch ratings for a business

module.exports = router;
