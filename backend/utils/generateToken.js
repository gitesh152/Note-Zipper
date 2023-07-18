import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'

//Generate and send token to user
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
};

export default generateToken;