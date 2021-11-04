import { Router } from 'express';
import jwt from 'jsonwebtoken'
import { CONFIG } from '../../../config';

export const UserRouter = Router();
export default UserRouter;

// ServiceRequestRouter.get('/', (req, res) => res.status(404).json({msg: 'Not Found'}))
UserRouter.post('/login', (req, res) => {
    if (req.body.password == "GoodPassword") {
        // Give good token
        var username = req.body.username.toString()
        return res.status(200).json({status: 'OK', username, token: jwt.sign(JSON.stringify({username}), CONFIG.JWT.KEY)});
    }
    // else give bad login
    res.status(401).json({status: 'NOPE'}); // for some reason this does not set content type to json not sure why and I don't have the time to debug it
});