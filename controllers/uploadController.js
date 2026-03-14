const cloudinary = require('../config/cloudinary');
const User = require('../models/User');

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to cloudinary from buffer
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'capstone/profile_pictures' },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                const streamifier = require('streamifier');
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req);

        // Update user profile
        if (req.user) {
            req.user.profilePicture = result.secure_url;
            await req.user.save();
        }

        res.json({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadProfilePicture,
};
