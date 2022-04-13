const {error} = require('./src/constants');
const File = require('./src/file');
const {rejects, deepStrictEqual} = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        
        // aguarda promise concluir e checa se ela foi rejeitada, se for retorna o erro passado como segundo parametro
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        
        // aguarda promise concluir e checa se ela foi rejeitada, se for retorna o erro passado como segundo parametro
        await rejects(result, rejection);
    }
    Date.prototype.getFullYear = () => 2020;
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
              "name": "Guilherme Santos",
              "id": 123,
              "profession": "Dev",
              "birthDay": 1992,
            },
            {
              "name": "Xuxa da Silva",
              "id": 321,
              "profession": "Dev",
              "birthDay": 1940,
            },
            {
              "name": "Joaozinho",
              "id": 213,
              "profession": "Medico",
              "birthDay": 1989,
            }
          ];

          //compara se o resultado é igual ao esperado
          deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})();