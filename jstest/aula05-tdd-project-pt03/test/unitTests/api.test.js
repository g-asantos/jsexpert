const { describe, it} = require('mocha');
const request = require('supertest');
const app = require('../../src/api');
const assert = require('assert');


const mocks = {
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
    cars: require('./../../database/cars.json'),
};


describe('API Suite Test', () => {

    describe('/carbycategory', ()=> {
        it('should request the carbycategory route and return HTTP Status 200 with an registered car', async () => {
            const response = await request(app)
            .post('/carbycategory')
            .send(mocks.validCarCategory)
            .expect(200);
            
            const isInArray = mocks.cars.find(elem => elem.id === response.body.id)

            assert.ok(isInArray);
        });
    })

    describe('/finalrentprice', ()=> {
        it('should request the final rent price and return http status 200 with correct calculation', async () => {
            const response = await request(app)
            .get('/finalrentprice')
            .send({
                customer: mocks.validCustomer,
                carCategory: mocks.validCarCategory,
                numberOfDays: 2
            })
            .expect(200);

           const expectedResult = 'R$ 137,15'.replace(/\s/g, '');
           const result = response.body.replace(/\s/g, '');

           assert.equal(result, expectedResult);
        })
    })

    describe('/rent', ()=> {
        it('should rent successfully return http status 200 and transaction object', async () => {
            const response = await request(app)
            .post('/rent')
            .send({
                customer: mocks.validCustomer,
                carCategory: mocks.validCarCategory,
                numberOfDays: 2
            })
            .expect(200);

            assert.ok(response.body instanceof Object);
        })
    })


})