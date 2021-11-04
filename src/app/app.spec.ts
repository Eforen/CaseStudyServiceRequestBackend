import request from "supertest";
import { app } from "../app"

describe('Server Endpoints', ()=>{
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