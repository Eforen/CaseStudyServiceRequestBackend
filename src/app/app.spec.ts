import { MakeUnsafeUserToken } from "../routes/API/User/mockUserAuth.spec";
import request from "supertest";
import { MakeApp } from "../app"
import RamDatabase, { CurrentStatus } from "../db/Database";

const db = new RamDatabase()
const app = MakeApp({db: db})

describe('Server Endpoints', ()=>{
    describe('/ping', ()=>{
        it('should respond to ping', async done=>{
            const res = await request(app)
                .get('/ping')
                .accept('application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            
            expect(res.body).toHaveProperty('status')
            expect(res.body.status).toEqual("OK")
            done()
        })
    })
    describe('/api', ()=>{
        describe('/servicerequest', ()=>{
            beforeEach(()=>{
                db.clear()
            })
            it('should create an element when post is called', async done=>{
                const res = await request(app)
                    .post('/api/servicerequest')
                    .accept('application/json')
                    .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                    .send({
                        buildingCode: "Test1",
                        description: "Test2"
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                
                // console.log(res.body)
                // console.log(JSON.parse(res.body))
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('buildingCode')
                expect(res.body.buildingCode).toEqual('Test1')
                expect(res.body).toHaveProperty('description')
                expect(res.body.description).toEqual('Test2')
                expect(res.body).toHaveProperty('currentStatus')
                expect(res.body.currentStatus).toEqual('Created')
                expect(res.body).toHaveProperty('createdBy')
                expect(res.body).toHaveProperty('createdDate')
                expect(res.body).toHaveProperty('lastModifiedBy')
                expect(res.body).toHaveProperty('lastModifiedDate')
                var all = await db.all()
                expect(all.length).toEqual(1)
                expect(all[0]).toHaveProperty('id')
                expect(all[0]).toHaveProperty('buildingCode')
                expect(all[0].buildingCode).toEqual('Test1')
                expect(all[0]).toHaveProperty('description')
                expect(all[0].description).toEqual('Test2')
                expect(all[0]).toHaveProperty('currentStatus')
                expect(all[0].currentStatus).toEqual(CurrentStatus.Created)// This is the internal value of Created
                expect(all[0]).toHaveProperty('createdBy')
                expect(all[0]).toHaveProperty('createdDate')
                expect(all[0]).toHaveProperty('lastModifiedBy')
                expect(all[0]).toHaveProperty('lastModifiedDate')
                done()
            })

            it('should get an element when get is called', async done=>{
                const call = await request(app)
                    .post('/api/servicerequest')
                    .accept('application/json')
                    .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                    .send({
                        buildingCode: "Test1",
                        description: "Test2",
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                var all = await db.all()
                expect(all.length).toEqual(1)
                const res = await request(app)
                    .get('/api/servicerequest')
                    .accept('application/json')
                    .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                    .expect('Content-Type', /json/)
                    .expect(200)
                
                expect(res.body).toHaveProperty('length')
                expect(res.body.length).toEqual(1)
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0].id).toEqual(call.body.id)
                expect(res.body[0]).toHaveProperty('buildingCode')
                expect(res.body[0].buildingCode).toEqual('Test1')
                expect(res.body[0]).toHaveProperty('description')
                expect(res.body[0].description).toEqual('Test2')
                expect(res.body[0]).toHaveProperty('currentStatus')
                expect(res.body[0].currentStatus).toEqual('Created')
                expect(res.body[0]).toHaveProperty('createdBy')
                expect(res.body[0]).toHaveProperty('createdDate')
                expect(res.body[0]).toHaveProperty('lastModifiedBy')
                expect(res.body[0]).toHaveProperty('lastModifiedDate')
                done()
            })
        })
        describe('/servicerequest/{id}', ()=>{
            beforeEach(()=>{
                db.clear()
            })

            it('should get an element when get is called with ID', async done=>{
                const calls = [
                    await request(app)
                        .post('/api/servicerequest')
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("Tester1"))
                        .send({
                            buildingCode: "Test1",
                            description: "Test2",
                        })
                        .expect('Content-Type', /json/)
                        .expect(200),
                    await request(app)
                        .post('/api/servicerequest')
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("Tester2"))
                        .send({
                            buildingCode: "Test3",
                            description: "Test4",
                        })
                        .expect('Content-Type', /json/)
                        .expect(200),
                    await request(app)
                        .post('/api/servicerequest')
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("Tester3"))
                        .send({
                            buildingCode: "Test5",
                            description: "Test6",
                        })
                        .expect('Content-Type', /json/)
                        .expect(200),
                    await request(app)
                        .post('/api/servicerequest')
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("Tester4"))
                        .send({
                            buildingCode: "Test7",
                            description: "Test8",
                        })
                        .expect('Content-Type', /json/)
                        .expect(200)
                ]
                var all = await db.all()
                expect(all.length).toEqual(4)

                const res = [
                    await request(app)
                        .get(`/api/servicerequest/${calls[0].body.id}`)
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                        .expect('Content-Type', /json/)
                        .expect(200),
                    await request(app)
                        .get(`/api/servicerequest/${calls[1].body.id}`)
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                        .expect('Content-Type', /json/)
                        .expect(200),
                    await request(app)
                        .get(`/api/servicerequest/${calls[2].body.id}`)
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                        .expect('Content-Type', /json/)
                        .expect(200),
                    await request(app)
                        .get(`/api/servicerequest/${calls[3].body.id}`)
                        .accept('application/json')
                        .set('authorization', 'Bearer '+MakeUnsafeUserToken("YoloMan"))
                        .expect('Content-Type', /json/)
                        .expect(200)
                ]
                
                expect(res[0].body).toMatchObject({
                    buildingCode:'Test1',
                    description: 'Test2',
                    createdBy: 'tester1',
                    lastModifiedBy: 'tester1',
                })
                
                expect(res[1].body).toMatchObject({
                    buildingCode:'Test3',
                    description: 'Test4',
                    createdBy: 'tester2',
                    lastModifiedBy: 'tester2',
                })
                
                expect(res[2].body).toMatchObject({
                    buildingCode:'Test5',
                    description: 'Test6',
                    createdBy: 'tester3',
                    lastModifiedBy: 'tester3',
                })
                
                expect(res[3].body).toMatchObject({
                    buildingCode:'Test7',
                    description: 'Test8',
                    createdBy: 'tester4',
                    lastModifiedBy: 'tester4',
                })
                done()
            })
        })
    })
})