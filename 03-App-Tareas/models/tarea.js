const { v4: uuidv4 } = require('uuid');

class Tarea{
    id = '';
    description = '';
    completadaEn = null;

    constructor(description){
        this.id = uuidv4();
        this.description = description;
        this.completadaEn = null;
    }

}

module.exports = Tarea;