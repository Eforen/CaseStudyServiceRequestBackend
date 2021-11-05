import { ServiceRequest } from "src/db/Database";
import { ServiceRequestRepository } from "src/repository/ServiceRequest";

export class ServiceRequestService {
    constructor(private readonly _repo: ServiceRequestRepository) {}
    async CreateRequest(creator: ServiceRequest['createdBy'], buildingCode: ServiceRequest['buildingCode'], description: ServiceRequest['description']){
        //Would normally check the creator is a user
        //Maybe would check the buildingCode is in the DB here
        // A little data sanity checking
        if(!creator || creator.length < 3){
            throw new Error('Creator\'s name must be at least 3 characters long');
        }
        if(!buildingCode || buildingCode.length <= 0) {
            throw new Error('Building code must not be empty');
        }
        if(!description || description.length < 3) {
            throw new Error('Description must be at least 3 characters long');
        }

        return this._repo.make({buildingCode:buildingCode, description:description}, creator);
    }

    async GetAll() {
        return this._repo.get({})
    }
}