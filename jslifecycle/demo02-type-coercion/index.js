9999999999999999
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
// 20
'21' - - 1
// 22
0.1 + 0.2 === 0.3
// false
3 > 2 > 1
// false

"B" + "a" + + "a" + "a"
// BaNaNa

// --------------------------------------------------------------------------

console.assert(String(123) === '123', "explicit conversion to string");
console.assert(123 + '' === '123', "implicit conversion to string");
console.assert(('hello' || 123) === 'hello', "|| returns the first element if both true");
console.assert(('hello' && 123) === 123, "|| returns the last element if both true");


// ---------------------------------------------------------------------------

const item = {
    name: 'Erick Wendel',
    age: 25,
    // string: é chamado primeiro se for primitivo , senão chama o valueOf
    toString(){
        return `Name: ${this.name}, Age: ${this.age}`;
    },
    // number: é chamado primeiro se for primitivo, senão chama toString
    valueOf(){
        return {hey: 'dude'}
    },
    [Symbol.toPrimitive](coercionType){
        console.log('trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: '007'
        }

        return types[coercionType] || types.string;
    }
}

// console.log('toString', String(item));
// retorna NaN pois o toString retornou a string
// console.log('valueOf', Number(item));

// // depois de adicionar toPrimitive
// console.log('String', String(item));
// console.log('Number', Number(item));

// // chama a conversão default!
// console.log('Date', new Date(item))


console.assert(item + 0 === '{"name":"Erick Wendel","age":25}0');
// console.log('!!item is true?', !!item);
console.assert(!!item);

// console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"Erick Wendel","age":25}');

// console.log('implicit + explicit coercion using ==', item == String(item));
console.assert(item == String(item));

const item2 = {
    ...item,
    name: "Zézin",
    age: 20,
};

// console.log('New obj', item2);
console.assert(item2.name === "Zézin" && item.age === 20); 