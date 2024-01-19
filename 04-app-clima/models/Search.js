const fs = require('fs');
const axios = require("axios");

class Search{
    historical = [];
    historial = []
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historical.map(lugar =>{
           let palabras = lugar.split(' ');
           palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

           return palabras.join(' ');
        });
    }

    get paramsMap(){
        return {
            'access_token': process.env.MAPBOX,
            'limit': 5,
            'language' : 'es'
        }
    }

    get paramsClima(){
        return{
            'appid': process.env.OPENWHEATHER,
            'units': 'metric',
            'lang' : 'es'
        }
    }


    async city(Place = ''){

        try{
            const instace = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ Place }.json`,
                params:this.paramsMap
            });
            const resp = await instace.get();
    
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
    
        }catch(error){
            return [];
        }
    }

    async climaSitio(lat, lon){
        try{
            const instace = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsClima, lat, lon}
            });
            const resp = await instace.get();
            const {weather, main} = resp.data;

            
            return {
                desc : weather[0].description,
                temp: main.temp,
                Min : main.temp_min,
                Max : main.temp_max
            }

        } catch(error){
            console.log(error);
        }
    }


    agregarHistorial(lugar = ''){

        if(this.historical.includes(lugar.toLowerCase())){
            return;
        }
        this.historical.unshift(lugar.toLowerCase());

        this.guardarDB();

    }

    guardarDB() {
        const payload = {
            historial : this.historical
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            return ;
        }
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
    
        this.historical = data.historial;
    }

}

module.exports = Search;