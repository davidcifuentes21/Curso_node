require('colors');


const ShowMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('======================='.green);
        console.log(' Seleccione una opcion '.green);
        console.log('=======================\n'.green);
    
        console.log(`${'1.'.green} Crear tareas`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'7.'.green} Salir.\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    });
}


const stop = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question(`\nPresione ${'ENTER'.cyan} para continuar\n`, (opt) => {
            readline.close();
            resolve(opt);
        })
    });
}


module.exports = {
    ShowMenu,
    stop
}