import multer,{FileFilterCallback} from 'multer';
import fs from 'fs';
import { Request,Response,NextFunction } from 'express';

// Create temporary directory if it does not exist
const TEMP_DIR = './temp';
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
};

const fileFilter = (req:Request, file:Express.Multer.File, cb:FileFilterCallback) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
}

const limits = { fileSize: 10 * 1024 * 1024 };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR);
      },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  const mediaUploader = multer({fileFilter,limits,storage});

  export default mediaUploader;