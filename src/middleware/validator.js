/* NPM */
import { check, validationResult } from 'express-validator';

/* ERROR HANDLER */
import ApiError from '../exceptions/apiError.js';

const validateFile = (req, res, next) => {
    if (!req.file) {
        return next(
            ApiError.BadRequest('Необходимо загрузить файл или файл не является картинкой'),
        );
    }

    next();
};

const validatorId = [check('id', 'Некорректный id').isNumeric()];

const validatorName = [
    check('nameRu', 'Необходимо название на русском')
        .trim()
        .exists()
        .isAlpha('ru-RU', { ignore: ' ' }),
];

const validatorPlantData = [
    check('plantData.*.plantId', 'Некорректный id растения').isNumeric(),
    check('plantData.*.diseaseId', 'Некорректный id болезни').isNumeric(),
    check('plantData.*.plantpartId', 'Некорректный id органа растения').isNumeric(),
];

const result = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }

    next();
};

export default {
    result,
    validatorId,
    validatorName,
    validatorPlantData,
    validateFile,
};
