const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category endpoints
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List predefined categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.route('/').get(protect, getCategories);

module.exports = router;
