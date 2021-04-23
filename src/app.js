
const express = require('express');

//Initialize
const app = express();
require('./database');

//Settings
app.set('port',process.env.PORT || 5000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/index.routes'));

module.exports = app;