const { describe, it} = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Suite Test', () => {

    describe('/contact', ()=> {
        it('should request the contact page and return HTTP Status 200', async () => {
            const response = await request(app)
            .get('/contact')
            .expect(200);

            assert.deepStrictEqual(response.text, 'Contact us page');
        })
    })

    describe('/hello', ()=> {
        it('should request an inexistent route /hi and return /hello', async () => {
            const response = await request(app)
            .get('/hi')
            .expect(200);

            assert.deepStrictEqual(response.text, 'Hello world!');
        })
    })

    describe('/login', ()=> {
        it('should login successfuly on the login route and return HTTP Status 200', async () => {
            const response = await request(app)
            .post('/login')
            .send({username: 'Guilherme', password: '123'})
            .expect(200);

            assert.deepStrictEqual(response.text, 'Login has succeeded!');
        })

        it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
            const response = await request(app)
            .post('/login')
            .send({username: 'Teste', password: '111'})
            .expect(401);

            assert.ok(response.unauthorized)

            assert.deepStrictEqual(response.text, 'Login failed!');
        })
    })


})