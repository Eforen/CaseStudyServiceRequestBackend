import express from "express";
import { ServiceRequestService } from "../../service/ServiceRequest";
import { CurrentStatus } from "../../db/Database"

export class ServiceRequestController {
    constructor(private readonly _service: ServiceRequestService) {}

    async create(req: express.Request, res: express.Response){
        // Check if logged in
        const username = req.auth.username;
        if(username == undefined){
            return res.status(400).json({ status: 'NOPE' })
        }
        // Make Request
        const request = await this._service.CreateRequest(username, req.body.buildingCode, req.body.description)
        // Return Request with some adjustments to the syntax of the output
        res.status(200).json({...request, currentStatus: CurrentStatus[request.currentStatus]})
    }
    
    async getAll(req: express.Request, res: express.Response){
        // Check if logged in
        const username = req.auth.username;
        if(username == undefined){
            return res.status(400).json({ status: 'NOPE' })
        }
        // This would be a great place to check if user has permissions to view them and only get the ones the user can see
        const requests = await this._service.GetAll()
        res.status(200).json()
    }
}