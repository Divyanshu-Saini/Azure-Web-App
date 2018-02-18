//Initiallising node modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./route/empRoute');
const app = express(); 

// Configuring port, other settings and Middleware
app.set('PORT',process.env.PORT||2830);
// app.set('PORT',2828);
app.set("view options", {
    layout: false
});
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Configuring routes
app.use('/',api);

//Starting server
const server = app.listen(app.get('PORT'), function () {
     console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
 
});
