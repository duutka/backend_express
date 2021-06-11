/* NPM */
import passport from 'passport';
import JwtPassport from 'passport-jwt';
import dotenv from 'dotenv';

/* OTHER */
import User from '../models/user.js';

dotenv.config();

const jwtStrategy = JwtPassport.Strategy;
const jwtExtract = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const passportConfig = () => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findByLogin(payload.login);

                const profile = {
                    login: user.login,
                    firstname: user.firstname,
                    lastname: user.lastname,
                };

                if (user) {
                    done(null, profile);
                } else {
                    done(null, false);
                }
            } catch (error) {
                console.log(error);
            }
        }),
    );
};

export default passportConfig;
