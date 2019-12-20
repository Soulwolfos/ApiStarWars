const axios = require('axios');


const getNaves = async () => {
    const respuestaRyM = await axios.get('https://swapi.co/api/starships/');
    const { results } = respuestaRyM.data;

    return results;
 }; 

 module.exports = getNaves; 