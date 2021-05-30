/* OTHER */
import Scan from '../models/scan.js';
import { validationResult } from 'express-validator';

const create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        console.log(req.file);

        const { plantData: { plantId, diseaseId, plantpartId } } = req.body;

        console.log('PlantId = ', plantId);
        console.log('DiseaseId = ', diseaseId);
        console.log('PlantpartId = ', plantpartId);

        //TODO: image upload

        const createdId = await Scan.create({
            plantId, diseaseId, plantPartId: plantpartId, imageName: 'some-name.png',
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

const all = async (req, res) => {
    try {
        const scans = await Scan.all();
        res.status(200).json(scans);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const byId = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { id } = req.params;

        const scan = await Scan.byId(id);
        res.status(200).json(scan);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { create, all, byId };
