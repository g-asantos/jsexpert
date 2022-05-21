const http = require('http');
const { join } = require('path');
const carsDatabase = join(__dirname, '../database', 'cars.json');
const carService = require('../src/service/carService')


const carsService = new carService({
    cars: carsDatabase
});

const routes = {
    '/carbycategory:post': async (request, response) => {
        for await (const data of request) {
            const carCategory = JSON.parse(data);
            try {
                const selectedCar = await carsService.getAvailableCar(carCategory);
                return response.end(JSON.stringify(selectedCar));
            } catch (err) {
                console.log(err);
                return response.end();
            }
        }
    },

    '/finalrentprice:get': async (request, response) => {
        for await (const data of request) {
            const { customer, carCategory, numberOfDays } = JSON.parse(data);

            try {
                const finalPrice = carsService.calculateFinalPrice(customer, carCategory, numberOfDays)

                return response.end(JSON.stringify(finalPrice));
            } catch (err) {
                console.log(err);
                return response.end();
            }
        }
    },

    '/rent:post': async (request, response) => {

        for await (const data of request) {
            const { customer, carCategory, numberOfDays } = JSON.parse(data);

            try {
                const rented = await carsService.rent(customer, carCategory, numberOfDays);
                console.log(rented, 'rented')
                return response.end(JSON.stringify(rented));
            } catch (err) {
                console.log(err);
                return response.end();
            }
        }
    },

    default: (request, response) => {
        response.write('Bem vindo ao serviço de aluguel de carros! Você fez uma requisição para uma rota inexistente, tente novamente');
        return response.end();
    }
}


const handler = function (request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;

    const chosen = routes[routeKey] || routes.default;
    response.writeHead(200, {
        'Content-Type': 'application/json'
    })
    return chosen(request, response);
}

const app = http
    .createServer(handler)
    .listen(3000, () => {
        console.log('app running at', 3000);
    })


module.exports = app;