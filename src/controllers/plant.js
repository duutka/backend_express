/* ERROR HANDLER */
import ApiError from '../exceptions/apiError.js';
/* MODELS */
import Plant from '../models/plant.js';

const add = async (req, res, next) => {
    try {
        const { nameRu } = req.body;

        // TODO: translate name to english
        const createdId = await Plant.add({ nameEn: null, nameRu });

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
        const plants = await Plant.findAll();

        if (!plants) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(plants);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const plants = await Plant.findById(id);

        if (!plants) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(plants);
    } catch (error) {
        next(error);
    }
};

export default { findAll, findById, add };
