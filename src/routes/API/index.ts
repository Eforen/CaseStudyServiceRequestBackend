import { Router } from 'express';
import { ServiceRequestController } from '../../controller/ServiceRequest';
import { ServicesList } from '../../service';
import MakeServiceRequestRouter from './ServiceRequest';
import UserRouter from './User';

export const MakeApIRouter = (servicesList: ServicesList)=>{
    const router = Router();
    
    router.get('/', (req, res) => res.status(404).json({msg: 'Not Found'}))
    
    router.use('/user', UserRouter)
    router.use('/servicerequest', MakeServiceRequestRouter(new ServiceRequestController(servicesList.RequestService)));
    return router;
}