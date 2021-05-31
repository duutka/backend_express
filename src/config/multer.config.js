import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

/* STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${process.env.UPLOAD_PATH}`);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

/* FILTER */
const fileFilter = (req, file, cb) => {
    file.mimetype === "image/jpg" || file.mimetype === "image/png" ||  file.mimetype === "image/jpeg"
    ?   cb(null, true) 
    :   cb(null, false)
}

const upload = multer({ storage, fileFilter });


export default upload;
