import Express from 'express'
const router = Express.Router()
import { getNotes, createNote, getNoteById, updateNoteById, deleteNoteById } from '../controller/noteController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').get(protect, getNotes);
router.route('/:id').get(protect, getNoteById);
router.route('/:id').put(protect, updateNoteById);
router.route('/:id').delete(protect, deleteNoteById);
router.route('/createnote').post(protect, createNote);

export default router;