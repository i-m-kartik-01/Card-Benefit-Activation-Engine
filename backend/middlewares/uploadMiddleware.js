// middlewares/uploadMiddleware.js

import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "uploads";

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, uploadDir);
    },

    filename(req, file, cb) {

        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG and PNG receipt images are allowed."
            ),
            false
        );
    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        // 10 MB
        fileSize: 10 * 1024 * 1024

    }

});

export default upload;