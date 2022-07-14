"use strict";module.export({save:()=>save},true);var writeFile,readFile;module.link('fs/promises',{writeFile(v){writeFile=v},readFile(v){readFile=v}},0);var appRoot;module.link('app-root-path',{default(v){appRoot=v}},1);



const save = async (data, path) => {
    // nao tem __filename, __dirname

    const databaseFile = appRoot.resolve(path)

    const currentData = JSON.parse(await readFile(databaseFile))
    currentData.push(data)

    await writeFile(databaseFile, JSON.stringify(currentData))
}