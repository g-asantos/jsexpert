const {readFile} = require('fs/promises')
const User = require('./user');
const {error} = require('./constants');
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id','name','profession','age']
}

class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath);
        const validation = File.isValid(content);

        if(!validation.valid) throw new Error(validation.error);
        
        const users = File.parseCSVToJSON(content);
        return users;
    }

    static async getFileContent(filePath){
        return (await readFile(filePath)).toString('utf8');
    }

    static isValid(csvString, options = DEFAULT_OPTION){
        const [header, ...fileWithoutHeaders] = csvString.split('\n'); // separa por linha

        // verifica se o header possui os campos esperados
        const isHeaderValid = header === options.fields.join(',');

        // se não possuir, retorna mensagem de erro
        if(!isHeaderValid){
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false,
            }
        }

        // verifica se o numero de linhas é maior que o maximo permitido E se é maior que 0
        const isContentLengthAccepted = (
            fileWithoutHeaders.length > 0 &&
            fileWithoutHeaders.length <= options.maxLines
        )

        // se não for, retorna mensagem de erro
        if(!isContentLengthAccepted){
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false,
            }
        }
        // se tiver tudo certo, retorna valid como true
        return {valid: true};
    }

    static parseCSVToJSON(csvString){
        // separa por linha
        const lines = csvString.split('\n');
        // remove primeiro item e joga na variavel
        const firstLine = lines.shift();
        // separa por virgula
        const header = firstLine.split(',');


        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {};
    
            /* 
            para cada item em columns, ele pega por exemplo header[0] = id, 
            entao ele vai colocar o id do usuario como o id na columns;
            */
            for(const index in columns){
                user[header[index]] = columns[index];
            }
            return new User(user);
        })
        return users;
    }
}

module.exports = File;