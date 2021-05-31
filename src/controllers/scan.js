/* NPM */
import { validationResult } from 'express-validator';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import fs from 'fs-extra';

/* OTHER */
import Scan from '../models/scan.js';
import Plant from '../models/plant.js';
import PlantPart from '../models/plant-part.js';
import Disease from '../models/disease.js';

dotenv.config();

const add = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        
        if(req.file===undefined) {
            return res.status(400).json({
                errors: "File is not a image"
            })
        }

        const { plantData: { plantId, diseaseId, plantpartId } } = req.body;
            
        const plantName = await Plant.findById(plantId);
        const diseaseName = await Disease.findById(diseaseId);
        const plantpartName = await PlantPart.findById(plantpartId);
        
        const newPath = `${process.env.UPLOAD_PATH}/${plantName.name_en}/${diseaseName.name_en}/${plantpartName.name_en}/`;
        const newName = `${plantName.name_en}-${diseaseName.name_en}-${plantpartName.name_en}-${v4()}.ext`;
        
        fs.move(req.file.path, newPath + newName, (error) => {
            if (error) {
                return res.status(400).json({error});
            }
        });

        const createdId = await Scan.add({
            plantId, diseaseId, plantPartId: plantpartId, imageName: newName,
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
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

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
