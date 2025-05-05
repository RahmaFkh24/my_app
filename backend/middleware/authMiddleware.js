const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// backend/middleware/authMiddleware.js
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Add verification debugging
            console.log('Received Token:', token);
            console.log('JWT Secret:', process.env.JWT_SECRET?.slice(0, 5) + '...');

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verify user exists
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                throw new Error('User not found');
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };