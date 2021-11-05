import * as uuid from "uuid";

export enum CurrentStatus {
    NotApplicable,
    Created,
    InProgress,
    Complete,
    Canceled
}

export interface ServiceRequest {
    id: string
    buildingCode: string
    description: string
    currentStatus: CurrentStatus
    createdBy: string
    createdDate: number
    lastModifiedBy: string
    lastModifiedDate: number
}

export type StrippedServiceRequest = Omit<
Omit<
    Omit<
        Omit<
            Omit<
                ServiceRequest
                , 'id'>
            , 'createdBy'>
        , 'createdDate'>
    , 'lastModifiedBy'>
, 'lastModifiedDate'>

export interface IDatabaseState {
    requests: ServiceRequest[]
}

export interface IDatabase {
    create(request: Omit<ServiceRequest, 'id'>): Promise<ServiceRequest>
    update(request: Omit<Omit<ServiceRequest, 'createdBy'>, 'createdDate'>): Promise<ServiceRequest>
    delete(requestID: ServiceRequest['id']): Promise<ServiceRequest>
    has(id: ServiceRequest['id']): Promise<boolean>
    findOne(matchMask: Partial<ServiceRequest>): Promise<ServiceRequest | undefined>
    find(matchMask: Partial<ServiceRequest>): Promise<ServiceRequest[]>
    all(): Promise<ServiceRequest[]>
    clear(): Promise<void>
}

export default class RamDatabase implements IDatabase {
    private state: IDatabaseState = {
        requests: [],
    }

    /**
     * Creates a new ServiceRequest with the given data
     */
    async create(request: Omit<ServiceRequest, 'id'>) {
        if (!request) {
            throw new Error('Missing request data')
        }

        const createdRequest = {
        id: uuid.v4(),
        ...request,
        }

        this.state.requests.push(createdRequest)
        
        return createdRequest
    }

    /**
     * Updates a new ServiceRequest with the given data
     */
    async update(request: Omit<Omit<ServiceRequest, 'createdBy'>, 'createdDate'>) {
        if (!request) {
            throw new Error('Missing request data')
        }

        let currentRequestID: number = -1
        let currentRequest: ServiceRequest|null = null
        for (let i = 0; i < this.state.requests.length; i++) {
            if(this.state.requests[i].id === request.id) {
                currentRequestID = i
                currentRequest = this.state.requests[i];
            }
        }
        if(currentRequest == null){
            throw new Error('Could not find request data')
        }

        const editedRequest = {
            ...currentRequest,
            ...request,
            id: currentRequest.id
        }

        this.state.requests[currentRequestID] = editedRequest

        return editedRequest
    }

    /**
     * Deletes a new ServiceRequest with the given data
     */
    async delete(requestID: ServiceRequest['id']) {
        if (!requestID) {
            throw new Error('Missing request data')
        }

        let currentRequestID: number = -1
        let currentRequest: ServiceRequest|null = null
        for (let i = 0; i < this.state.requests.length; i++) {
            if(this.state.requests[i].id === requestID){
                currentRequestID = i
                currentRequest = this.state.requests[i];
            }
        }
        if(currentRequest == null){
            throw new Error('Could not find request data')
        }

        const editedRequest = {
            ...currentRequest,
            id: requestID
        }

        this.state.requests[currentRequestID] = editedRequest

        return editedRequest
    }

    /**
     * Returns if the given id exists in the db
     */
    async has(id: ServiceRequest['id']) {
        if(this.state && this.state.requests){
            for (let i = 0; i < this.state.requests.length; i++) {
                const request = this.state.requests[i];
                if (request.id == id) return true
            }
        }
        return false
    }

    /**
     * Find the first request that matches the mask
     */
    async findOne(matchMask: Partial<ServiceRequest>) {
        return this.state.requests.find(request => {
            for (const maskKey in (Object.keys(matchMask))){
                let mask = maskKey as keyof typeof matchMask
                if(request[mask] != matchMask[mask]) return false
            }
            return true
        })
    }

    /**
     * Find the all requests that matches the mask
     */
    async find(matchMask: Partial<ServiceRequest>) {
        if(matchMask == {}) return this.state.requests

        return this.state.requests.filter((request) => {
            var keys = Object.keys(matchMask)
            for (const maskKey in keys){
                let mask = keys[maskKey] as keyof typeof matchMask
                if(request[mask] != matchMask[mask]) return false
            }
            return true
        })
    }

    /**
     * Returns all the requests in the database
     */
    async all() {
        return this.state.requests
    }

    /**
     * Deletes all entries from the database
     */
     public async clear() {
        this.state.requests = []
    }
}