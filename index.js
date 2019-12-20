const express = require('express');
const bodyParser= require('body-parser');
const redis = require('redis');
const getNaves = require('./getNaves');

const client = redis.createClient(); //6379, '127.0.0.1' valores por defecto
//client.set('Rodrigo', 'asdqwe', redis.print);


const app = express();
const PORT = 3000; 
app.use(bodyParser.urlencoded({ extended: false})); 
app.use(bodyParser.json());

app.post('/api',(req, res, next) =>{
    console.log(200);
    console.log("oli c: ");
    res.end();
});


app.post('/naves', async (req, res)=>{
    const result = await getNaves(); //obtiene datos de las naves de la api
    result.forEach(element => {
        client.set(element.name, JSON.stringify(element) , redis.print);
    });
  
    res.end("naves guardadas en la bdd...");
});


app.post('/infonave', (req, res) => {
    const paramUser = req.body;
    console.log(paramUser.name);
    client.get(paramUser.name, function(err, reply){
        res.json(JSON.parse(reply));
    });
});


app.listen(PORT, ()=>{
    console.log(`Se inicio la App en el puerto ${PORT}`);
});