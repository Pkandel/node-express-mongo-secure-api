import express from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';

const app = express();
const router = express.Router();

//adding middleware for unauthorised access
router.use((req, res, next) => {
    //checking token from header
    const token = req.headers['token'];
    if (token) {
        //verify secret and check access level
        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "failed to authenticate token",
                    error: err
                });
            } else {
                //check access level
                req.decoded = decoded;
                next();

            }
        })
    } else {
        //if no header send to the end points and this will handle the error
        req.decoded = undefined;
        next();
    }
});

export default router;