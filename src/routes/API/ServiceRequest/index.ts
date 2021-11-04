import express, { Router } from 'express';
import jwt from 'jsonwebtoken'
import { ServiceRequestController } from 'src/controller/ServiceRequest';
import { CONFIG } from '../../../config';

export const MakeServiceRequestRouter = (controller: ServiceRequestController)=>{
    const router = Router();

    router.get('/', controller.getAll.bind(controller));
    router.post('/', controller.create.bind(controller));
    // router.get('/{id}', controller.getID);
    // router.put('/{id}', controller.updateID);
    // router.delete('/{id}', controller.deleteID);
    return router;
}
export default MakeServiceRequestRouter;