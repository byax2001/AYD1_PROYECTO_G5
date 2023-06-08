'use strict'

var express = require('express');
const config = require('./config/config');
const routes = require('./routes/routes');

var app = express();
app.disable('x-powered-by');    
var port = config.nodePort

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(routes);

//Inicio de la aplicación
var server = app.listen(port,f=>{
    var host = server.address().address;    
    var port = server.address().port;
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);    
    var date = new Date(utc + (3600000*5));
    console.log(config.messageTerminal, 'host:'+host, 'port:'+port, 'date:'+date);
});