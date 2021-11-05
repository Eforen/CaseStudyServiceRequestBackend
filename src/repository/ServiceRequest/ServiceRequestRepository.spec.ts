import RamDatabase from "../../db/Database"
import { ServiceRequestRepository } from "."
// import * as uuid from 'uuid'
const uuid = require('uuid')

describe('ServiceRequest Repository', () => {
    const db = new RamDatabase()
    const repository = new ServiceRequestRepository(db)

    beforeEach(async done => {
        await db.clear()
        done()
    })
    it('should make', async done => {
        // var uspy = jest.spyOn(uuid, 'v4')
        var dspy = jest.spyOn(db, 'create')
        try {
            // uspy.mockReturnValueOnce("7d2ff5fb-8ae3-4608-b592-7a475af5b2b0")
            repository.make({
                buildingCode: "COH",
                description: "Please turn up the AC in suite 1200D. It is too hot here."
            }, "Nik Patel")
            expect(dspy).toBeCalledTimes(1)
            // console.log('Repo Spec Debug ', await db.all())
        } finally {
            dspy.mockRestore()
        }
        var all = await db.all()
        expect(all.length).toEqual(1)
        expect(all[0]).toHaveProperty('buildingCode')
        expect(all[0].buildingCode).toEqual('COH')
        expect(all[0]).toHaveProperty('description')
        expect(all[0].description).toEqual('Please turn up the AC in suite 1200D. It is too hot here.')
        expect(all[0]).toHaveProperty('createdBy')
        expect(all[0].createdBy).toEqual('Nik Patel')
        expect(all[0]).toHaveProperty('lastModifiedBy')
        expect(all[0].lastModifiedBy).toEqual('Nik Patel')
        done()
    })
    it('should get', async done => {
        repository.make({
            buildingCode: "COH",
            description: "Please turn up the AC in suite 1200D. It is too hot here."
        }, "Nik Patel")
        var all = await db.all()
        expect(all.length).toEqual(1)
        expect(all[0]).toHaveProperty('buildingCode')
        expect(all[0].buildingCode).toEqual('COH')
        expect(all[0]).toHaveProperty('description')
        expect(all[0].description).toEqual('Please turn up the AC in suite 1200D. It is too hot here.')
        expect(all[0]).toHaveProperty('createdBy')
        expect(all[0].createdBy).toEqual('Nik Patel')
        expect(all[0]).toHaveProperty('lastModifiedBy')
        expect(all[0].lastModifiedBy).toEqual('Nik Patel')
        var get = await repository.get({})
        expect(get.length).toEqual(1)
        expect(get[0]).toMatchObject({
            buildingCode:'COH',
            description: 'Please turn up the AC in suite 1200D. It is too hot here.',
            createdBy: 'Nik Patel',
            lastModifiedBy: 'Nik Patel',
        })
        done()
    })
    it('should get by id', async done => {
        repository.make({
            buildingCode: "COH",
            description: "Please turn up the AC in suite 1200D. It is too hot here."
        }, "Nik Patel")
        var all = await db.all()
        expect(all.length).toEqual(1)
        expect(all[0]).toHaveProperty('buildingCode')
        expect(all[0].buildingCode).toEqual('COH')
        expect(all[0]).toHaveProperty('description')
        expect(all[0].description).toEqual('Please turn up the AC in suite 1200D. It is too hot here.')
        expect(all[0]).toHaveProperty('createdBy')
        expect(all[0].createdBy).toEqual('Nik Patel')
        expect(all[0]).toHaveProperty('lastModifiedBy')
        expect(all[0].lastModifiedBy).toEqual('Nik Patel')
        var get = await repository.get({id: all[0].id})
        expect(get).toMatchObject({
            buildingCode:'COH',
            description: 'Please turn up the AC in suite 1200D. It is too hot here.',
            createdBy: 'Nik Patel',
            lastModifiedBy: 'Nik Patel',
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