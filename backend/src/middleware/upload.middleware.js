const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure this directory exists
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Prefix with timestamp to avoid name collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
    // Accept only mp3 files
    // Checking mimetype and extension
    if (file.mimetype === "audio/mpeg" || path.extname(file.originalname).toLowerCase() === ".mp3") {
        cb(null, true);
    } else {
        cb(new Error("Only .mp3 files are allowed!"), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit to 10MB, adjust as needed
    }
});

module.exports = { upload };
