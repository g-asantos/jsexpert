'use strict';

const { watch, promises: { readFile }} = require('fs');


class File{
    watch(event, filename){
        this.showContent(filename);
    }

    async showContent(filename){
        console.log((await readFile(filename)).toString());
    }
}


const file = new File();

// alternativa para não herdar o this da função
// watch(__filename, (event, filename) => file.watch(event, filename));

// podemos deixar explicito qual é o contexto que a função deve seguir
// a bind retorna uma função com o 'this' que se mantém do file, ignorando do watch
// watch(__filename, file.watch.bind(file))

// a diferença entre um e outro é que um voce passa os argumentos como array e o outro uma lista de argumentos
file.watch.call({showContent: () => console.log('call: hey sinon!')}, null, __filename)
file.watch.apply({showContent: () => console.log('call: hey sinon!')}, [null, __filename])