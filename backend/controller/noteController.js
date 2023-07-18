import asyncHandler from "express-async-handler"
import Note from '../models/Note.js'

//Get All Notes of current user
const getNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id })
        if (notes.length > 0) {
            res.status(200).json({
                message: 'Fetched Notes',
                notes,
            });
        } else {
            res.status(404).json({ message: 'Notes not found ...' });
        }
    }
    catch (e) {
        return res.json({
            message: e.message,
            stack: e.stack,
        });
    }
});

//Let current user to create note
const createNote = asyncHandler(async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, user: req.user._id });
        res.status(201).json({
            message: 'Created Note ...',
            note,
        });

    }
    catch (e) {
        return res.json({
            message: e.message,
            stack: e.stack,
        });
    }
})

//Get specific Note of current user
const getNoteById = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (note) {
            res.json({
                message: 'Fetched Note ...',
                note,
            });
        } else {
            res.status(404).json({ message: 'Note not found ...' });
        }
    }
    catch (e) {
        return res.json({
            message: e.message,
            stack: e.stack,
        });
    }
});

//Let current user to update a note
const updateNoteById = asyncHandler(async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const note = await Note.findById(req.params.id);
        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error('Not Authorized to update this note ...')
            }
            note.title = title;
            note.content = content;
            note.category = category;
            const updatedNote = await note.save();
            res.status(201).json({
                message: 'Updated Note ...',
                note: updatedNote,
            });
        }
        else {
            res.status(400);
            throw new Error('Note not found ...');
        }
    }
    catch (e) {
        return res.json({
            message: e.message,
            stack: e.stack,
        });
    }
});

//Let current user to delete specific note
const deleteNoteById = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error('Not Authorized to delete this note ...')
            }

            const deletedNote = await Note.deleteOne({ _id: req.params.id });
            res.status(201).json({
                message: `Deleted Note - ${note.title}-${note._id}`,
                note: deletedNote,
            });
        }
        else {
            res.status(400);
            throw new Error('Note not found ...');
        }
    }
    catch (e) {
        return res.json({
            message: e.message,
            stack: e.stack,
        });
    }
});

export { getNotes, createNote, getNoteById, updateNoteById, deleteNoteById }