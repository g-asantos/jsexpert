import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import sinon from 'sinon'
const {spy} = sinon
import { readFile } from 'fs/promises';
import chalk from 'chalk'
import appRoot from 'app-root-path';
const path = appRoot.resolve('test/mocks/databaseMock.json')
import TerminalController from '../src/terminalController.js'

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