import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { v4 as uuid } from 'uuid';
const files = './public/files';

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'pdf' ||
    file.mimetype === 'docs' 
  ) {
    cb(null, true);
  }
  return cb(null, false);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, files); // null is error, file is the file object
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuid();
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default upload;
