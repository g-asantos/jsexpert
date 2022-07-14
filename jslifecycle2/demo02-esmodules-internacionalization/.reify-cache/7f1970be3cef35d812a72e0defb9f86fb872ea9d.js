"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var sinon;module.link('sinon',{default(v){sinon=v}},2);var readFile;module.link('fs/promises',{readFile(v){readFile=v}},3);var chalk;module.link('chalk',{default(v){chalk=v}},4);var appRoot;module.link('app-root-path',{default(v){appRoot=v}},5);var TerminalController;module.link('../src/terminalController.js',{default(v){TerminalController=v}},6);
const { describe, it } = mocha

const { expect } = chai

const {spy} = sinon



const path = appRoot.resolve('test/mocks/databaseMock.json')


describe('TerminalController', () => {
    let terminalController;
    let database;
    beforeEach(async () => {
        terminalController = new TerminalController();
        database = JSON.parse(await readFile(path))
    })

    it('should return table options', () => {
        const tableOptions = terminalController.getTableOptions();

        const expectedTableOptions = {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
                { field: "from", name: chalk.cyan("From") },
                { field: "to", name: chalk.cyan("To") },
            ]
        }

        expect(tableOptions).to.be.deep.equal(expectedTableOptions);
    })

    it('should initialize terminal', async () => {
        terminalController.initializeTerminal(database, 'pt-BR');
        expect(terminalController.terminal).to.not.be.equal(null)
    })

    it('should initialize table', async () => {
        terminalController.initializeTable(database, 'pt-BR')

        const isPrintEmpty = JSON.stringify(terminalController.print) === '{}'
        const isDataEmpty = JSON.stringify(terminalController.data) === '{}'

        expect(isPrintEmpty).to.be.false;
        expect(isDataEmpty).to.be.false;
    })

    it('should update table', async () => {
        terminalController.initializeTable(database, 'pt-BR')

        const item = {
            id: 100,
            vehicles: ['car'],
            kmTraveled: 100,
            from: '2022-04-04',
            to: '2023-12-12'
        }

        terminalController.updateTable(item)

        const isItemInData = terminalController.data.find(item => item.id === 100)

        expect(isItemInData).to.be.deep.equal(item)
    })

    it('should question', async () => {
        terminalController.initializeTerminal(database, 'pt-BR');
        
        const questionFunction = spy(terminalController, 'question')

        terminalController.question();

        expect(questionFunction.calledOnce).to.be.ok
    })

    it('should close terminal', async () => {
        terminalController.initializeTerminal(database, 'pt-BR');
        
        const closeFunction = spy(terminalController, 'closeTerminal')

        terminalController.closeTerminal();

        expect(closeFunction.calledOnce).to.be.ok
    })
})