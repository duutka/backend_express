/* OTHER */
import Plant from '../models/plant.js';
import { validationResult } from 'express-validator';

const create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { nameRu } = req.body;

        // TODO: translate name to english
        const createdId = await Plant.create({ nameEn: null, nameRu });

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
        const plants = await Plant.all();
        res.status(200).json(plants);
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

        const plants = await Plant.byId(id);
        res.status(200).json(plants);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { all, byId, create };
