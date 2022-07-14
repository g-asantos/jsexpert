"use strict";module.export({default:()=>TerminalController});var readline;module.link('readline',{default(v){readline=v}},0);var Person;module.link('./person.js',{default(v){Person=v}},1);var DraftLog;module.link('draftlog',{default(v){DraftLog=v}},2);var chalk;module.link('chalk',{default(v){chalk=v}},3);var chalkTable;module.link('chalk-table',{default(v){chalkTable=v}},4);





class TerminalController{
    constructor(){
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database,language){
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    initializeTable(database, language){
        const data = database.map(item => new Person(item).formatted(language));

        const table = chalkTable(this.getTableOptions(), data)
        this.print = console.draft(table)
        this.data = data
    }

    updateTable(item){
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    question(msg = ''){
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal(){
        this.terminal.close()
    }

    getTableOptions(){
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID")},
                { field: "vehicles", name: chalk.magenta("Vehicles")},
                { field: "kmTraveled", name: chalk.cyan("Km Traveled")},
                { field: "from", name: chalk.cyan("From")},
                { field: "to", name: chalk.cyan("To")},
            ]
        }
    }
}