import RamDatabase from "../../db/Database"
import { ServiceRequestRepository } from "../../repository/ServiceRequest"
import { ServiceRequestService } from "."
// import * as uuid from 'uuid'
const uuid = require('uuid')

describe('ServiceRequest Service', () => {
    const db = new RamDatabase()
    const repository = new ServiceRequestRepository(db)
    const service = new ServiceRequestService(repository)

    beforeEach(async done => {
        await db.clear()
        done()
    })
    it('should reject bad requests', async done => {
        await expect(service.CreateRequest('b', 'asfasgfasfg', 'asgasgasgasg')).rejects.toThrowError('Creator\'s name must be at least 3 characters long')
        await expect(service.CreateRequest('tester', '', 'asgasgasgasg')).rejects.toThrowError('Building code must not be empty')
        await expect(service.CreateRequest('tester', 'asfasgfasfg', 'as')).rejects.toThrowError('Description must be at least 3 characters long')
        await expect(service.CreateRequest('tester', 'asfasgfasfg', 'ak564tyedg 35 uj62 t4b3r')).resolves.not.toThrowError()
        done()
    })
    it('should get all', async done => {
        repository.make({
            buildingCode: "COH",
            description: "Please turn up the AC in suite 1200D. It is too hot here."
        }, "Nik Patel")
        repository.make({
            buildingCode: "COH2",
            description: "2Please turn up the AC in suite 1200D. It is too hot here."
        }, "2Nik Patel")
        var all = await db.all()
        expect(all.length).toEqual(2)
        expect(all[0]).toHaveProperty('buildingCode')
        expect(all[0].buildingCode).toEqual('COH')
        expect(all[0]).toHaveProperty('description')
        expect(all[0].description).toEqual('Please turn up the AC in suite 1200D. It is too hot here.')
        expect(all[0]).toHaveProperty('createdBy')
        expect(all[0].createdBy).toEqual('Nik Patel')
        expect(all[0]).toHaveProperty('lastModifiedBy')
        expect(all[0].lastModifiedBy).toEqual('Nik Patel')
        var get = await service.GetAll()
        expect(get.length).toEqual(2)
        expect(get[0]).toMatchObject({
            buildingCode:'COH',
            description: 'Please turn up the AC in suite 1200D. It is too hot here.',
            createdBy: 'Nik Patel',
            lastModifiedBy: 'Nik Patel',
        })
        expect(get[1]).toMatchObject({
            buildingCode:'COH2',
            description: '2Please turn up the AC in suite 1200D. It is too hot here.',
            createdBy: '2Nik Patel',
            lastModifiedBy: '2Nik Patel',
        })
        done()
    })
    it('should get ByID', async done => {
        repository.make({
            buildingCode: "COH",
            description: "Please turn up the AC in suite 1200D. It is too hot here."
        }, "Nik Patel")
        repository.make({
            buildingCode: "COH2",
            description: "2Please turn up the AC in suite 1200D. It is too hot here."
        }, "2Nik Patel")
        var all = await db.all()
        expect(all.length).toEqual(2)
        expect(all[0]).toHaveProperty('buildingCode')
        expect(all[0].buildingCode).toEqual('COH')
        expect(all[0]).toHaveProperty('description')
        expect(all[0].description).toEqual('Please turn up the AC in suite 1200D. It is too hot here.')
        expect(all[0]).toHaveProperty('createdBy')
        expect(all[0].createdBy).toEqual('Nik Patel')
        expect(all[0]).toHaveProperty('lastModifiedBy')
        expect(all[0].lastModifiedBy).toEqual('Nik Patel')

        var get2 = await service.GetByID(all[1].id)
        var get1 = await service.GetByID(all[0].id)

        expect(get1).toMatchObject({
            buildingCode:'COH',
            description: 'Please turn up the AC in suite 1200D. It is too hot here.',
            createdBy: 'Nik Patel',
            lastModifiedBy: 'Nik Patel',
        })
        expect(get2).toMatchObject({
            buildingCode:'COH2',
            description: '2Please turn up the AC in suite 1200D. It is too hot here.',
            createdBy: '2Nik Patel',
            lastModifiedBy: '2Nik Patel',
        })
        done()
    })
    it('should update', async done => {
        done()
    })
    it('should delete', async done => {
        done()
    })
})