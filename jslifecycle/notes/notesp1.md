** Javascript Strict Mode -

Strict Mode foi introduzido em 2015, com uma série de regras para evitar erros de semantica silenciosa no javascript. Usado por padrão no Typescript. Para utilizar escreva 'use strict' no começo do arquivo.

** Javascript Call Stack & Memory Heap - 
Call Stack - Pilha de operações onde é armazenada a sequencia de ações que um programa irá executar linha por linha.
É basicamente uma "tabela" onde a chave é o endereço de memoria, e o valor é um tipo primitivo de dado(string, number, bigint, boolean, undefined, and symbol) ou um apontamento para outro endereço em memoria. Lugar onde todos valores de tipos primitivos são armazenados.
Guarda dados de tipo de valor primitivo.

Memory Heap - Pilha de memoria onde são armazenados os endereços de memoria que podem ser apontados pelo Call Stack para trabalhar os
valores de variaveis, funções, objetos, arrays, etc. 
Guarda dados de tipo de referencia, que podem crescer dinamicamente.

** Tipo de Valor X Tipo de Referencia

Quando primitivos são atribuidos a uma variavel, o JS gera uma copia daquele valor em memória.
Quando não primitivos(Objetos) são atribuidos a uma variavel, o JS copia o endereço de memória onde esta armazenado o objeto.

** Coerção de tipos e Objects lifecycle

Coerção de tipos é um processo de conversão de um valor para outro tipo, só 3 tipos de coerção, para string/number/boolean.
2 tipos de coerção: implicita e explicita. A implicita é, por exemplo, quando somamos 1 + '1', quando usamos ==, etc.
Explicita seria quando utilizamos por exemplo o construtor String('exemplo').

Coerção com objetos, todo objeto tem alguns metodos por padrão para coerção como toString, isPrototypeOf, hasOwnProperty,
valueOf. 

Na hora de conversão de objeto para string ele vai seguir ordem de chamada, verifica se tipo já é primitivo, se for não faz
nada e já retorna. Se não, chama função toString do objeto, e se o resultado for primitivo, ele retorna, caso não seja,
ele vai chamar o valueOf. Se ambos não retornarem valor primitivo, estora TypeError.

Ordem de chamada do toString e valueOf muda de acordo com tipo de conversão. Se for tipo numero, chama primeiro o valueOf.

Symbol.toPrimitive tem prioridade maior que toString e valueOf, se vc implementa-lo, vai ignorar todo resto.

** Prototype Chain

