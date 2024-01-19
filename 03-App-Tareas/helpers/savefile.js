const fs = require('fs');
const archivo = './Archivos/data.json'

const guardat = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const read = () => {
    if(!fs.existsSync(archivo)){
        // console.log('asljkdfhajskdhjal');
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}


module.exports = {
    guardat,
    read
}