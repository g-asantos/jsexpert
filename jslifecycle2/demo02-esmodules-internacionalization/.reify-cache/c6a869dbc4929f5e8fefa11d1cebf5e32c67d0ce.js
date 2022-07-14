"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var save;module.link('../src/repository.js',{save(v){save=v}},2);var writeFile,readFile;module.link('fs/promises',{writeFile(v){writeFile=v},readFile(v){readFile=v}},3);var appRoot;module.link('app-root-path',{default(v){appRoot=v}},4);
const {describe, it} = mocha

const {expect} = chai




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