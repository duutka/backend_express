/* ERROR HANDLER */
import ApiError from '../exceptions/apiError.js';
/* OTHER */
import Disease from '../models/disease.js';

const add = async (req, res, next) => {
    try {
        const { nameRu } = req.body;

        // TODO: translate name to english
        const createdId = await Disease.add({ nameEn: null, nameRu });

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
        const diseases = await Disease.findAll();

        if (!diseases) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(diseases);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const disease = await Disease.findById(id);

        if (!disease) {
            throw ApiError.BadRequest('Произошла непредвиденная ошибка');
        }

        res.status(200).json(disease);
    } catch (error) {
        next(error);
    }
};

export default { findAll, findById, add };
