/* NPM */
import { Router } from 'express';
import multer from 'multer';

const UPLOAD_PATH = './public/images';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${UPLOAD_PATH}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = Router();

router.post('/', upload.single('image'), (req, res, next) => {
    const { plantData } = req.body;

    console.log(plantData.plantId);
    console.log(plantData.deseaseId);
    console.log(plantData.planpartId);

    res.json('ok');
});

export default router;