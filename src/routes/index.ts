import { Router } from 'express';
import { ServicesList } from '../service';
import { MakeApIRouter } from './API';
import { PingRouter } from './ping';

export const MakeRoutes = (servicesList: ServicesList)=>{
    const routes = Router();
    
    routes.get('/', (req, res) => res.status(404).json({msg: 'Not Found'}))
    
    routes.use('/ping', PingRouter)
    routes.use('/api', MakeApIRouter(servicesList));
    return routes;
}
export default MakeRoutes;
