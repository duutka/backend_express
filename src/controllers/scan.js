/* NPM */
import { validationResult } from 'express-validator';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

/* OTHER */
import Scan from '../models/scan.js';
import Plant from '../models/plant.js';
import PlantPart from '../models/plant-part.js';
import Disease from '../models/disease.js';

dotenv.config();

const add = async (req, res) => {
    try {
        const { plantData: { plantId, diseaseId, plantpartId } } = req.body;

        const plant = await Plant.findById(plantId);
        const disease = await Disease.findById(diseaseId);
        const plantpart = await PlantPart.findById(plantpartId);
        
        const ext = path.extname(req.file.filename);
        const newPath = `${process.env.UPLOAD_PATH}/${plant.name_en}/${disease.name_en}/${plantpart.name_en}/`;
        const newName = `${plant.name_en}-${disease.name_en}-${plantpart.name_en}-${v4()}.${ext}`;
        
        fs.move(req.file.path, newPath + newName, (error) => {
            if (error) throw new Error(error);
        });

        const createdId = await Scan.add({
            plantId, diseaseId, plantpartId, imageName: newName,
        });

        res.status(200).json(createdId);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const scans = await Scan.findAll();
        res.status(200).json(scans);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const scan = await Scan.findById(id);
        res.status(200).json(scan);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { findAll, findById, add };
