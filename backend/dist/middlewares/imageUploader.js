"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Create temporary directory if it does not exist
const TEMP_DIR = './temp';
if (!fs_1.default.existsSync(TEMP_DIR)) {
    fs_1.default.mkdirSync(TEMP_DIR);
}
;
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
    }
    else {
        cb(null, false); // Reject the file
    }
    // if (!file.mimetype.startsWith('image/')) { 
    //     const err = new Error()
    //   return cb(new Error('Please upload only images'), false)
    // //   return cb(new Error('Please upload only images'), false)
    // }
    // cb(null, true);
};
const limits = {
    fileSize: 10 * 1024 * 1024,
    files: 1,
    fields: 20,
    parts: 30,
    headerPairs: 2000
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR);
    },
    filename: (req, file, cb) => {
        const filename = `img-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage, fileFilter, limits });
function imageUploader(keyName) {
    return (req, res, next) => {
        upload.single(`${keyName}`)(req, res, (err) => {
            if (err) {
                return next(err);
            }
            next();
        });
    };
}
exports.default = imageUploader;
