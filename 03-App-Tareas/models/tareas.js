const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');

class Tareas{

    _listado = {};

    get listadoArr(){
        const list = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            list.push(tarea);
        });
        return list;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    CrearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    CargarTareas( tareas = []){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })

    }

    listado(){
        this.listadoArr.forEach((tarea, i) =>{
            const ix = `${i + 1}`.green;
            const {description, completadaEn} = tarea;
            const state = (completadaEn) ? 'Completada'.green : 'pendiente'.red

            console.log(`${ix} ${description} :: ${state}`)
        })
    }

    listadocompletadas(completadas = true){
        let conta = 0;
        this.listadoArr.forEach((tarea, i) =>{
            const ix = `${i + 1}`.green;
            const {description, completadaEn} = tarea;
            const state = (completadaEn) ? 'Completada'.green : 'pendiente'.red

            if(completadas){
                if(completadaEn){
                    conta += 1;
                    console.log(`${conta.toString().green} ${description} :: ${completadaEn.green}`)
                }
            }
            else{
                if(!completadaEn){
                    conta += 1;
                    console.log(`${conta.toString().green} ${description} :: ${state}`)
                }
            }
        })
    }

    listadopendientes(){
        this.listadoArr.forEach((tarea, i) =>{
            const ix = `${i + 1}`.green;
            const {description, completadaEn} = tarea;
            const state = (completadaEn) ? 'Completada'.green : 'pendiente'.red

            if(completadaEn == null){
                console.log(`${ix} ${description} :: ${state}`)
            }
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadaEn){
                tarea.completadaEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadaEn = null;
            }
        })
    }
}

module.exports = Tareas;