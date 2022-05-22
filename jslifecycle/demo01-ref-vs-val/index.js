const {deepStrictEqual} = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;
// counter2 = 1 / counter = 0

const item = {
    counter: 0
}

const item2 = item;
// item2.counter++;
// item e item2: counter = 1


// tipo primitivo gera uma copia em memoria 
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

// tipo de referencia, copia o endereço de memoria
// e aponta pro msm lugar
item2.counter++;
deepStrictEqual(item, {counter: 1});
deepStrictEqual(item2, {counter: 1});