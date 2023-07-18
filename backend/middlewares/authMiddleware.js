import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Setting req.user from Bearer token
const protect = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {

            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password'); //Excluding password
            next();
        }
        catch (e) {
            return res.status(401).json({
                message: 'Not Authorized, Invalid Token',
            });
        }

    }
    else {
        return res.status(401).json({
            message: 'Not Authorized, No Token',
        });
    }
});

export { protect }