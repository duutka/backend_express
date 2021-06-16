/* NPM */
import passport from 'passport';
import JwtPassport from 'passport-jwt';
import dotenv from 'dotenv';

/* OTHER */
import Person from '../models/person.js';

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
                const user = await Person.findByLogin(payload.login);

                if (user) {
                    const profile = {
                        login: user.login,
                        firstname: user.firstname,
                        lastname: user.lastname,
                    };

                    done(null, profile);
                } else {
                    done(null, false);
                }
            } catch (error) {
                console.log('[37]:', error);
            }
        }),
    );
};

export default passportConfig;
