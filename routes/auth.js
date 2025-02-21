const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error registering user.', error);
        res.status(500).json({ message: 'Registratiom error' });
    }
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { 
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Logged in successfully', user: { email: user.email, id: user.id } });
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout(function(err) { 
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

router.get('/current-user', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: { email: req.user.email, id: req.user.id } });
    } else {
        res.status(401).json({ message: 'Not autheniticated' }); 
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Authenitication needed' }); 
}

router.get('/protected', ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Access granted.', user: { email: req.user.email, id: req.user.id } });
});

module.exports = router;