/* NPM */
import { validationResult } from 'express-validator';

/* OTHER */
import Disease from '../models/disease.js';

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
        const createdId = await Disease.create({ nameEn: null, nameRu });

        res.status(200).json(createdId);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const all = async (req, res) => {
    try {
        const diseases = await Disease.all();

        res.status(200).json(diseases);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
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

        const disease = await Disease.byId(id);

        res.status(200).json(disease);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export default { all, byId, create };
