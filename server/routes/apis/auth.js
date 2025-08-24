import express from 'express';
import bcryptjs from 'bcryptjs';
import passport from 'passport';
import { User } from '../../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'gurardian' // Default role if not specified
        });

        await user.save();

        // Log the user in after signup
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging in after signup' });
            }
            // Return user without password
            const userResponse = { ...user.toJSON() };
            delete userResponse.password;
            res.status(201).json({ user: userResponse });
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});


router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }

        if (!user) {
            return res.status(401).json({ message: info.message || 'Authentication failed' });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging in' });
            }

            // Return user without password
            const userResponse = { ...user.toJSON() };
            delete userResponse.password;
            return res.json({ user: userResponse });
        });
    })(req, res, next);
});

router.post('/signout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Successfully logged out' });
    });
});


router.get('/me', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const userResponse = { ...req.user.toJSON() };
    delete userResponse.password;
    res.json({ user: userResponse });
});

export default router;