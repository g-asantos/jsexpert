import { writeFile, readFile } from 'fs/promises';
import appRoot from 'app-root-path';


export const save = async (data, path) => {
    // nao tem __filename, __dirname

    const databaseFile = appRoot.resolve(path)

    const currentData = JSON.parse(await readFile(databaseFile))
    currentData.push(data)

    await writeFile(databaseFile, JSON.stringify(currentData))
}