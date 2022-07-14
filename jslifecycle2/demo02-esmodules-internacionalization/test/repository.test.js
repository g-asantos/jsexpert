import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import {save} from '../src/repository.js'
import { writeFile, readFile } from 'fs/promises';
import appRoot from 'app-root-path';

describe('Repository', () => {

    afterEach(async () => {
        await writeFile('test/mocks/databaseMock.json', JSON.stringify(
            [{"id":1,"vehicles":["Motocicleta","Carro","Caminhão"],"kmTraveled":10000,"from":"2009-01-01","to":"2020-11-26"}]
            ))
    })


    it('should save the information passed', async () => {
        const savedObj = {id: Date.now()}
        const databaseFile = appRoot.resolve('test/mocks/databaseMock.json')

        await save(savedObj, 'test/mocks/databaseMock.json')

        const currentData = JSON.parse(await readFile(databaseFile))

        const objExistsInFile = currentData.find(obj => obj.id === savedObj.id)

        expect(objExistsInFile).to.be.deep.equal(savedObj)
    })
})