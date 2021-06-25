/* NPM */
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

/* MODELS */
import Scan from '../models/scan.js';
import Plant from '../models/plant.js';
import PlantPart from '../models/plant-part.js';
import Disease from '../models/disease.js';

/* ERROR HANDLER */
import ApiError from '../exceptions/apiError.js';

dotenv.config();

const add = async (req, res, next) => {
    try {
        const {
            plantData: { plantId, diseaseId, plantpartId },
        } = req.body;

        const plant = await Plant.findById(plantId);
        const disease = await Disease.findById(diseaseId);
        const plantpart = await PlantPart.findById(plantpartId);

        const ext = path.extname(req.file.filename);
        // eslint-disable-next-line max-len
        const newPath = `${process.env.UPLOAD_PATH}/${plant.name_en}/${disease.name_en}/${plantpart.name_en}/`;
        const newName = `${plant.name_en}-${disease.name_en}-${plantpart.name_en}-${v4()}.${ext}`;

        fs.move(req.file.path, newPath + newName, (error) => {
            if (error) throw ApiError.BadRequest('', error);
        });

        const createdId = await Scan.add({
            plantId,
            diseaseId,
            plantpartId,
            imageName: newName,
        });

        if (!createdId) {
            throw ApiError.BadRequest('Произошла ошибка при сохранении');
        }

        res.status(200).json(createdId);
    } catch (error) {
        next(error);
    }
};

const findAll = async (req, res, next) => {
    try {
        const scans = await Scan.findAll();

        if (!scans) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(scans);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const scan = await Scan.findById(id);

        if (!scan) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(scan);
    } catch (error) {
        next(error);
    }
};

export default { findAll, findById, add };
