/* NPM */
import { check, validationResult } from 'express-validator';

const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'Необходимо загрузить файл или файл не является картинкой',
        });
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
        return res.status(400).json({
            errors: errors.array(),
        });
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
