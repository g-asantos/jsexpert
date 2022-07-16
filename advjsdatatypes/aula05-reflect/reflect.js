'use strict'

const assert = require('assert');

// garantir semantica e segurança dos objetos


// ----- apply

const myObj = {
    add(myValue){
        return this.arg1 + this.arg2 + myValue
    }
}
// myObj.add.apply = function (){
//     throw new Error('Vixxx')
// }
// Function.prototype.apply = () => { throw new TypeError('Eita!')}
assert.deepStrictEqual(myObj.add.apply({arg1: 10, arg2: 20}, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!')}

// esse aqui pode acontecer!
myObj.add.apply = function (){
    throw new TypeError('Vixxx')
}

assert.throws(() => myObj.add.apply({}, []),
{
    name: 'TypeError',
    message: 'Vixxx'
} )

// usando reflect

const result = Reflect.apply(myObj.add, {arg1: 40, arg2: 20}, [200])
assert.deepStrictEqual(result, 260)

// ---- apply


// ---- defineProperty

function MyDate(){

}

// feio pra kct, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', {value: () => 'Hey there!'})

Reflect.defineProperty(MyDate, 'withReflection', {value: () => 'Hey dude!'})

assert.deepStrictEqual(MyDate.withObject(), 'Hey there!')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude!')

// ---- deleteProperty
const withDelete = {user: 'ErickWendel'}
// imperformatico, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'xuxa da silva'}
Reflect.deleteProperty(withReflection, 'user')

assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// ---- get

// Deveriamos fazer um get somente em instancia de referencia
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// ---- has

assert.ok('superman' in {superman: 'Clark Kent'})
assert.ok(Reflect.has({batman: 'Bruce Wayne'}, 'batman'))

// ---- ownKeys

const user = Symbol('user')

const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'erickwendel'
}

// com os metodos do object, temos que fazer 2 requisiçoes

const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser),
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com reflection, só um metodo

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])