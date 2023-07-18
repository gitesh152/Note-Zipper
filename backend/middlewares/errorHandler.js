import dotenv from 'dotenv';
dotenv.config();


//Error handling for invalid urls
const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error(`Not found - ${req.originalUrl}`)
    next(error);
}

//Error handling for every error with message
const errorHandler = (err, req, res, next) => {
    //If statusCode is like 200, then 500 or statuscode
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export { notFound, errorHandler }