import { CurrentStatus, IDatabase, ServiceRequest, StrippedServiceRequest } from "../../db/Database";

export class ServiceRequestRepository {
    constructor(private readonly _db: IDatabase){}

    async make(request: Optional<StrippedServiceRequest, 'currentStatus'>, editUser: string){
        //TODO: Create Request via db
        return this._db.create({
            ...request,
            currentStatus: request.currentStatus || CurrentStatus.Created,
            createdBy: editUser,
            createdDate: Date.now(),
            lastModifiedBy: editUser,
            lastModifiedDate: Date.now()
        });
    }

    async update(request: {id:ServiceRequest['id']} & Partial<StrippedServiceRequest>, editUser: string){
        const oldRequest = await this._db.findOne({id: request.id});
        if(oldRequest == undefined) throw new Error(`Service Request Not Found`)
        const edit: Omit<Omit<ServiceRequest, 'createdBy'>, 'createdDate'> = {
            id: request.id,
            buildingCode: request.buildingCode ? request.buildingCode : oldRequest.buildingCode,
            currentStatus: request.currentStatus ? request.currentStatus : oldRequest.currentStatus,
            description: request.description ? request.description : oldRequest.description,
            lastModifiedBy: editUser,
            lastModifiedDate: Date.now()
        };
        return this._db.update(edit);
    }

    async get(request: Partial<ServiceRequest>){
        return this._db.find(request);
    }

    async delete(requestID: ServiceRequest['id']){
        return this._db.delete(requestID)
    }
}
