require('dotenv').config();

const { ShowMenuI, stop, leerInput, listarLugares, confirmar, mostrarListadoChecklist } = require('./helpers/bettermenu');
const Search = require('./models/Search');


const main = async() => {
    const Busqueda = new Search();
    let opt = '';

    do{
        opt = await ShowMenuI();

        switch(opt){
            case 1:
                //mensaje
                const place = await leerInput('Ciudad: ');
                //buscar los lugares
                const Places = await Busqueda.city(place);
                //seleccionar lugar
                const id = await listarLugares(Places);
                if(id === '0') continue;
                
                const lugarSel = Places.find(l => l.id === id);
                
                Busqueda.agregarHistorial(lugarSel.nombre);

                const clima = await Busqueda.climaSitio(lugarSel.lat, lugarSel.lng);

                console.clear();
                console.log('\nInfo de la ciudad\n');
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('long: ', lugarSel.lng);
                console.log('Temp: ', clima.temp);
                console.log('Temp min: ', clima.Min);
                console.log('Temp Max: ', clima.Max);
                console.log('descipcion: ', clima.desc);

            break;

            case 2:
                Busqueda.historialCapitalizado.forEach(lugar => {
                    console.log(`${lugar}`)
                });
            break;
            
            default:
                break;
        }

        if(opt != 0) await stop();
    }while(opt !== 0);

}

main();