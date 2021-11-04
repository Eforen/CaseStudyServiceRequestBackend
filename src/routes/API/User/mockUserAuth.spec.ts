import request from "supertest";
import { app } from "../../../app"
import jwt from 'jsonwebtoken'
import * as uuid from 'uuid'
import { CONFIG } from "../../../config";
import { AuthMiddleware } from ".";

/** This should ONLY be used by tests */
export function MakeUnsafeUserToken(username: string){
    return jwt.sign(JSON.stringify({username}), CONFIG.JWT.KEY)
}

describe('User', () => {
    describe('User Endpoints', () => {
        it('should login any username with "GoodPassword"', async done=>{
            var username = uuid.v4().toString();
            const res = await request(app)
                .post('/api/user/login')
                .accept('application/json')
                .send({ username, password: 'GoodPassword' })
                .expect('Content-Type', /json/)
                .expect(200)
            
            expect(res.body).toHaveProperty('status')
            expect(res.body.status).toEqual("OK")
            expect(res.body).toHaveProperty('username')
            expect(res.body.username).toEqual(username)
            expect(res.body).toHaveProperty('token')
            let decodedToken: any = jwt.verify(res.body.token, CONFIG.JWT.KEY)
            expect(res.body).toHaveProperty('username')
            expect(decodedToken.username).toEqual(username)
            done()
        })
        it('should not login any username with any password other than "GoodPassword"', async done=>{
            var username = uuid.v4().toString();
            const res = await request(app)
                .post('/api/user/login')
                .accept('application/json')
                .send({ username, password: 'BadPassword' })
                .expect(401)
                .expect('Content-Type', /json/) // skip due to BUG0001
            
            expect(res.body).toHaveProperty('status')
            expect(res.body.status).toEqual("NOPE")
            expect(res.body).not.toHaveProperty('username')
            expect(res.body).not.toHaveProperty('token')
            done()
        })
    })
    describe('User Middleware', () => {
        it('should good token should set auth username"', async done=>{
            var username = uuid.v4().toString();
            var token = MakeUnsafeUserToken(username);
            let testReq: any = {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }
            AuthMiddleware(testReq, {} as any, ()=>{
                expect(testReq).toHaveProperty('auth')
                expect(testReq.auth).toHaveProperty('username')
                expect(testReq.auth.username).toEqual(username)
                done()
            })
        })
        it('should bad token should clear auth', async done=>{
            var username = uuid.v4().toString();
            var token = MakeUnsafeUserToken(username);
            let testReq: any = {
                headers:{
                    authorization: `Bearer NotA Token`
                },
                auth: {username: "yoloman"}
            }
            AuthMiddleware(testReq, {} as any, ()=>{
                expect(testReq).toHaveProperty('auth')
                expect(testReq.auth).not.toHaveProperty('username')
                done()
            })
        })
    })
})