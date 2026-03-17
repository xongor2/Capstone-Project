const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadProfilePicture } = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format. Images only.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB max
    fileFilter: fileFilter,
});

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload endpoints
 */

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload profile picture for user
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded
 */
router.post('/profile-picture', protect, upload.single('image'), uploadProfilePicture);

module.exports = router;
