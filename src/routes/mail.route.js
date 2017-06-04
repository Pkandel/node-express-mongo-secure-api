import express from 'express';
import { sendmail } from '../controllers/mail.controller';
const router = express.Router();

//User registration
router.route('/sendmail')
    .post(sendmail);

export default router;
