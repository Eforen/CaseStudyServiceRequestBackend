import { Router } from 'express';
import UserRouter from './User';

export const ApiRouter = Router();

ApiRouter.get('/', (req, res) => res.status(404).json({msg: 'Not Found'}))

ApiRouter.use('/user', UserRouter)