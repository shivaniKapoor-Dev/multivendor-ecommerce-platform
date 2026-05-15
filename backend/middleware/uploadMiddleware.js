const multer = require('multer');

const storage = multer.memoryStorage();
const allowedImageTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
]);

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!allowedImageTypes.has(file.mimetype)) {
            return cb(new Error("Only JPEG, PNG, WebP, and AVIF images are allowed"));
        }

        cb(null, true);
    },
});

module.exports = upload;
