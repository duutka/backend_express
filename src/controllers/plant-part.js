/* OTHER */
import PlantPart from '../models/plant-part.js';

const add = async (req, res) => {
    try {
        const { nameRu } = req.body;

        // TODO: translate name to english
        const createdId = await PlantPart.add({ nameEn: null, nameRu });

        res.status(200).json(createdId);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const plantParts = await PlantPart.findAll();
        res.status(200).json(plantParts);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const plantPart = await PlantPart.findById(id);
        res.status(200).json(plantPart);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { findAll, findById, add };
