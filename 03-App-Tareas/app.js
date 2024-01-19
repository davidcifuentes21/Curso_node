require('colors');
const { ShowMenuI, stop, leerInput, listadotareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/bettermenu');
const {guardat, read} = require('./helpers/savefile')
const Tareas = require('./models/tareas');
// const { ShowMenu, stop } = require('./helpers/menu');



const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tarearread = read();
    if(tarearread){
        tareas.CargarTareas(tarearread);
    }
    do{
        opt = await ShowMenuI();
        switch(opt){
            case 1:
                const desc = await leerInput('Descripcion: ');
                tareas.CrearTarea(desc);
                break;
            case 2:
                tareas.listado();
                break;
            case 3:
                tareas.listadocompletadas(true);
                break;
            case 4:
                tareas.listadopendientes(false);
                break;
            case 5:
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case 6:
                const id = await listadotareasBorrar(tareas.listadoArr);
                if(id != '0'){
                    const ok = await confirmar('Esta seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
                // tareas.borrarTarea(id);
                break;

        }
        
        guardat(tareas.listadoArr);

        await stop();
    }while(opt !== 7);

}

main();