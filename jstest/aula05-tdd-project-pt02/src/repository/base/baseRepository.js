const {readFile} = require('fs/promises');

// Classe base para os repositórios, simula o comportamento do banco de dados
class BaseRepository{
  constructor({file}){
    this.file=file;
  }

  async find(itemId){
    const content = JSON.parse(await readFile(this.file));
    if(!itemId) return content;

    return content.find(({id}) => id === itemId);
  }
}

module.exports = BaseRepository;