const multer = require("multer");

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // cb stands for callback
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const filename = file.originalname.split(".")[0];
        cb(null, filename + "-" + uniqueSuffix + ".png")
    },
})


exports.upload = multer({ storage: storage })