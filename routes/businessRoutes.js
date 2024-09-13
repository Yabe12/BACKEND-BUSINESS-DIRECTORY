const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
// Route to register a new business
router.post('/register', businessController.registerBusiness);

// Route to get all businesses
router.get('/', businessController.getAllBusinesses);



// Route to get a specific business by ID
router.get('/:id', businessController.getBusinessById);
router.get('/businesses/category/:categoryId', businessController.getBusinessesByCategoryId);
router.get('/categories/:categoryId', businessController.getCategoryById);
// router.get('/businesses/name/:name', businessController.getBusinessesByName);
router.get('/businesses/search', businessController.getBusinessesBySearchCriteria);
router.put("/business/:id", authMiddleware, businessController.updateBusinessById);
router.delete('/business/:id', authMiddleware, businessController.deleteBusinessById);

module.exports = router;