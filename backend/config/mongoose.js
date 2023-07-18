import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
mongoose.connect(`${process.env.MONGO_URI}/note_zipper`);

const db = mongoose.connection;

db.on('error', console.error.bind('error', 'ErrorConnecting database.'));

db.once('open', () => {
    console.log(`Connected to ${db.name}`);
});

export default db;
