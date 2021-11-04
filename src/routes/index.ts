import { Router } from 'express';
import { ApiRouter } from './API';
import { PingRouter } from './ping';

export const routes = Router();
export default routes;

routes.get('/', (req, res) => res.status(404).json({msg: 'Not Found'}))

routes.use('/ping', PingRouter)
routes.use('/api', ApiRouter)
