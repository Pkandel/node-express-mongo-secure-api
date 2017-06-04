import express from 'express';
import userRoute from './user.route';
import setupRoute from './setup.route';
import config from '../config';
import jwt from 'jsonwebtoken';
import authenticate from '../middleware/authenticate';


const app = express();
const router = express.Router();

//using middleware
app.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the Prakash Kandel API platform",
        data: {
            test: "Welcome Page"
        }
    })

});
//setting up for token
router.use('/',setupRoute);

//mount user routes
router.use('/user', userRoute);

//adding middleware for unauthorised access
router.use(authenticate)

router.get('/secret', (req, res) => {
    if(req.decoded === undefined ) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    res.send(req.decoded);
})
export default router;
