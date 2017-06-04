import express from 'express';
import {signup,login} from '../controllers/user.controller';
const router = express.Router();

//User registration
router.route('/signup')
    .post(signup);

//User login
router.route('/login')
    .post(login);

export default router;
