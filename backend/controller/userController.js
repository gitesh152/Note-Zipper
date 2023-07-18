import asyncHandler from 'express-async-handler';
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

//Signup User
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists ...')
        }

        const newUser = await User.create(req.body);
        res.status(201);
        res.json({
            message: 'User Created ...',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                pic: newUser.pic,
            }
        })
    }

    catch (e) {
        res.json({
            //Since Error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

//Login User
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists && await userExists.matchPassword(req.body.password)) {
            res.status(201);
            res.json({
                message: 'User Found ...',
                user: {
                    _id: userExists._id,
                    name: userExists.name,
                    email: userExists.email,
                    pic: userExists.pic,
                    token: generateToken(userExists._id)
                }
            })
        }
        else {
            res.status(401);
            throw new Error('Incorrect email/password');
        }
    }

    catch (e) {
        res.json({
            //Since Error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

//Update User
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            user.name = req.body.name || user.name;
            user.pic = req.body.pic || user.pic;
            user.password = req.body.password || user.password;
            const updateUser = await user.save();
            res.status(201).json({
                message: 'User Updated',
                user: {
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    pic: updateUser.pic,
                    token: generateToken(updateUser._id),
                },
            });
        }
        else {
            res.status(401);
            throw new Error('User not found ... ');
        }
    }

    catch (e) {
        res.json({
            //Since Error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

export { registerUser, loginUser, updateUser }