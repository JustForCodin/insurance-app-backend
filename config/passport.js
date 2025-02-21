import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import User from '../models/User.js';

export default function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Wrong email' });
                    }

                    compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            return done(err);
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Wrong password' });
                        }
                    });
                })
                .catch(err => {
                    return done(err);
                });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};