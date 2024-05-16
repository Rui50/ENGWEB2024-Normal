var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contratosRouter = require('./routes/contratos');

var app = express();

var mongoDB = 'mongodb://127.0.0.1/contratos'

mongoose.connect(mongoDB)
var db = mongoose.connection
db.on("error", console.error.bind(console, "Erro de conexão"))
db.once("open", () =>{
  console.log("Conexão ao mongoDB realizada com sucesso")
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contratos', contratosRouter);

module.exports = app;
