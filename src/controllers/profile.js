/* OTHER */
import User from '../models/user.js';

const profile = async (req, res) => {
    try {
        const { csrf } = req.csrfToken();

        const user = await User.findByLogin(login);

        const profile = {
            login: user.login,
            firstname: user.firstname,
            lastname: user.lastname,
        };

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { profile };
