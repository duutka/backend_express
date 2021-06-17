/* NPM */
import { check, validationResult } from 'express-validator';

/* OTHER */
import Token from '../models/token.js';

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

const validateAuth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            req.error = 'Пользователь не авторизирован';
            return next();
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            req.error = 'Пользователь не авторизирован';
            return next();
        }

        const person = Token.validateAccessToken(accessToken);
        if (!person) {
            req.error = 'Пользователь не авторизирован';
            return next();
        }

        req.person = person;
        next();
    } catch (error) {
        req.error = 'Пользователь не авторизирован';
        return next();
    }
};

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
    validateAuth,
};
