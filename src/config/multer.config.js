import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${process.env.UPLOAD_PATH}`);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

export default upload;
