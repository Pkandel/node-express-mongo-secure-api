import express from 'express';
import { setup } from '../controllers/setup.controller';
const router = express.Router();

//User setup for getting api token
router.route('/setup')
    .post(setup);

export default router;
