/* ERROR HANDLER */
import ApiError from '../exceptions/apiError.js';
/* MODELS */
import PlantPart from '../models/plant-part.js';

const add = async (req, res, next) => {
    try {
        const { nameRu } = req.body;

        // TODO: translate name to english
        const createdId = await PlantPart.add({ nameEn: null, nameRu });

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
        const plantParts = await PlantPart.findAll();

        if (!plantParts) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(plantParts);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const plantPart = await PlantPart.findById(id);

        if (!plantPart) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(plantPart);
    } catch (error) {
        next(error);
    }
};

export default { findAll, findById, add };
