"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('./../src/person.js',{default(v){Person=v}},2);
const {describe, it} = mocha

const {expect} = chai


describe('Person', () => {
    it('should return a person instance from string', () => {
        const person = Person.generateInstanceFromString('2 Bike,aviao,navio 2000000 2010-01-01 2011-02-01')

        const expected = {
            from: '2010-01-01',
            to: '2011-02-01',
            vehicles: ['Bike', 'aviao', 'navio'],
            kmTraveled: '2000000',
            id: '2'
        }

        expect(person).to.be.deep.equal(expected);
    })

    it('should format values', () => {
        const person = new Person({
            from: '2010-01-01',
            to: '2011-02-01',
            vehicles: ['Bike', 'aviao', 'navio'],
            kmTraveled: '2000000',
            id: '2'
        })

        const result = person.formatted('pt-BR')
        const expected = {
            id: 2,
            vehicles: 'Bike, aviao e navio',
            kmTraveled: '2.000.000 km',
            from: '01 de janeiro de 2010',
            to: '01 de fevereiro de 2011'
        }

        expect(result).to.be.deep.equal(expected);
    })

})