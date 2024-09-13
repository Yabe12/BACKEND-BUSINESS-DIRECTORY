const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRating = async (req, res) => {
    try {
        const { userId } = req.user; // Ensure userId is available from authentication middleware
        const { businessId, rating } = req.body;

        // Validate input
        if (!userId || !businessId || !rating) {
            console.error('Missing fields:', { userId, businessId, rating });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Ensure rating is a number
        const numericRating = parseInt(rating, 10);
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        // Create new rating
        const newRating = await prisma.rating.create({
            data: {
                userId, // Pass the userId correctly
                businessId,
                rating: numericRating, // Ensure rating is numeric
            },
        });

        res.status(201).json(newRating);
    } catch (error) {
        console.error('Error creating rating:', error.message); // Log the error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Rating
const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        // Validate input
        if (rating === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate rating value (assuming a rating between 1 and 5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        // Update rating
        const updatedRating = await prisma.rating.update({
            where: { id },
            data: { rating },
        });

        res.status(200).json(updatedRating);
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete Rating
const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the rating
        const deletedRating = await prisma.rating.delete({
            where: { id },
        });

        res.status(200).json(deletedRating);
    } catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Ratings by Business
const getRatingsByBusiness = async (req, res) => {
    try {
        const { businessId } = req.params;

        // Fetch ratings for the specific business
        const ratings = await prisma.rating.findMany({
            where: { businessId },
            include: { user: true }, // Include the user who gave the rating
        });

        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createRating,
    updateRating,
    deleteRating,
    getRatingsByBusiness,
};
