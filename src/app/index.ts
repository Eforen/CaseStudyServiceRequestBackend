import express from "express"
import { AuthMiddleware } from "../routes/API/User"

import { MakeRoutes } from "../routes"
import RamDatabase from "../db/Database"
import { ServiceRequestRepository } from "../repository/ServiceRequest"
import { ServiceRequestService } from "../service/ServiceRequest"

export const MakeApp = (overrides?: {db?:RamDatabase, repo?: ServiceRequestRepository, RequestService?: ServiceRequestService})=>{
    const app = express()
    app.use(express.json())
    app.use(AuthMiddleware)

    const db = (overrides && overrides.db)? overrides.db : new RamDatabase()
    const repository = (overrides && overrides.repo) ? overrides.repo : new ServiceRequestRepository(db)
    const RequestService = (overrides && overrides.RequestService) ? overrides.RequestService : new ServiceRequestService(repository)

    app.use('/', MakeRoutes({
        RequestService
    }))
    return app
}
