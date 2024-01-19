const inquirer = require('inquirer');
require('colors');

const options =[
    {
        type: 'list',
        name: 'opcion',
        mesage: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Crear tareas`
            },
            {
                value: 2,
                name: `${'2.'.blue} Listar tareas`
            },
            {
                value: 3,
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: 4,
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: 5,
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: 6,
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: 7,
                name: `${'7.'.green} Salir.\n`
            }
        ]
    }
]

const listadotareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, id) => {
        const ix = `${id + 1}`.green;
        return {
            value : tarea.id,
            name : `${ ix } ${tarea.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: 'Cancelar'
    })
    const pregunta =[
        {
            type: 'list',
            name: 'id',
            mesage: 'Borrar',
            choices
    }]
    const {id} = await inquirer.prompt(pregunta);
    return id;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, id) => {
        const ix = `${id + 1}`.green;
        return {
            value : tarea.id,
            name : `${ ix } ${tarea.description}`,
            checked: (tarea.completadaEn) ? true : false
        }
    });

    const pregunta =[
        {
            type: 'checkbox',
            name: 'ids',
            mesage: 'seleciones',
            choices
    }]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}


const confirmar = async (message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const ShowMenuI = async() => {
    
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opcion '.white);
    console.log('=======================\n'.green);

    const {opcion} = await inquirer.prompt(options);
    return opcion;
}


const stop = async() => {
    const pause =[
        {
            type: 'input',
            name: 'stop',
            message: `\nPresione ${'ENTER'.cyan} para continuar\n`
        }
    ]
    const {stop} = await inquirer.prompt(pause);
    return stop;
}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}


module.exports = {
    ShowMenuI,
    stop,
    leerInput,
    listadotareasBorrar,
    confirmar,
    mostrarListadoChecklist
}