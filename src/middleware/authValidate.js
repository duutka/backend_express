/* ERROR HANDLER */
import apiError from '../exceptions/apiError.js';
/* MODELS */
import token from '../models/token.js';

const authValidate = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            req.error = 'Пользователь не авторизирован';
            return next(apiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            req.error = 'Пользователь не авторизирован';
            return next(apiError.UnauthorizedError());
        }

        const person = token.validateAccessToken(accessToken);
        if (!person) {
            req.error = 'Пользователь не авторизирован';
            return next(apiError.UnauthorizedError());
        }

        req.person = person;
        next();
    } catch (error) {
        req.error = 'Пользователь не авторизирован';
        return next(apiError.UnauthorizedError());
    }
};

export default authValidate;
