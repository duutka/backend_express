/* NPM */
import crypto from 'crypto';

/* OTHER */
import User from '../models/user.js';

const csrfToken = async (req, res) => {
    try {
        res.status(200).json({ csrfToken: req.csrfToken });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { login, password, firstname, lastname } = req.body;

        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');

        const hashPass = salt + '$' + hash;

        await User.add({
            login: login,
            password: hashPass,
            firstname: firstname,
            lastname: lastname,
        })
            .then(() => {
                res.status(200).json({ message: 'Пользователь зарегистрирован' });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error.message,
                    stack: error.stack,
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const authUser = async (req, res, next) => {
    try {
        const { login, password } = req.body;

        const user = await User.findByLogin(login);

        if (!user[0]) {
            res.status(404).send({ error: 'Неверный логин или пароль' });
        } else {
            const passwordFields = password.split('$');
            const salt = passwordFields[0];
            const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
            console.log(hash);
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { csrfToken, authUser, registerUser };
