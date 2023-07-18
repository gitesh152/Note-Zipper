import { registerUser, loginUser, updateUser } from '../controller/userController.js'
import Express from 'express'
const router = Express.Router()

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/update').post(updateUser);

export default router;