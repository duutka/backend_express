/* OTHER */
import Plant from '../models/plant.js';

const add = async (req, res) => {
    try {
        const { nameRu } = req.body;

        // TODO: translate name to english
        const createdId = await Plant.add({ nameEn: null, nameRu });

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
        const plants = await Plant.findAll();
        res.status(200).json(plants);
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

        const plants = await Plant.findById(id);
        res.status(200).json(plants);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { findAll, findById, add };
