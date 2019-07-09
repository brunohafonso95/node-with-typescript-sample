"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.default = multer({ storage: storage });
