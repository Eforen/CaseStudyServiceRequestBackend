import express, { Router } from 'express';
import jwt from 'jsonwebtoken'
import { CONFIG } from '../../../config';

export const UserRouter = Router();
export default UserRouter;

function MakeUserToken(username: string){
    return jwt.sign(JSON.stringify({username}), CONFIG.JWT.KEY)
}

// ServiceRequestRouter.get('/', (req, res) => res.status(404).json({msg: 'Not Found'}))
UserRouter.post('/login', (req, res) => {
    if (req.body.password == "GoodPassword") {
        // Give good token
        var username = req.body.username.toString()
        return res.status(200).json({status: 'OK', username, token: MakeUserToken(username)});
    }
    // else give bad login
    res.status(401).json({status: 'NOPE'}); // for some reason this does not set content type to json not sure why and I don't have the time to debug it
});

export function AuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // if(!req.headers || !req.headers.authorization) {
        //     req.auth = {}
        //     return next()
        // }
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) throw new Error('Invalid token');
        const decodedToken: any = jwt.verify(token, CONFIG.JWT.KEY)
        req.auth = {username: decodedToken.username}
    } catch(err) {
        req.auth = {}
    }
    next()
}