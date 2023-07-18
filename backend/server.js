import Express from "express";
const app = Express()
const PORT = process.env.PORT || 5000;
import userRoute from './routes/userRoute.js'
import noteRoute from './routes/noteRoute.js'
import db from './config/mongoose.js'
import cors from 'cors';
import { notFound, errorHandler } from './middlewares/errorHandler.js'

app.use(Express.json())     //Middleware to read req.body
app.use(cors());            //TO resolve cors policy
app.use('/api/user', userRoute)
app.use('/api/notes', noteRoute)

//Error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started listening on PORT ${PORT}`));