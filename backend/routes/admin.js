const express = require('express');
const router = express.Router();
const { getOverview } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin endpoints
 */

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Get application overview statistics (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Application overview statistics
 *       403:
 *         description: Not authorized as admin
 */
router.route('/overview').get(protect, admin, getOverview);

module.exports = router;
