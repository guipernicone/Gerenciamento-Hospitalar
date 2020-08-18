/*Inicia o servidor e seus packges*/
var express = require('express');
var consign = require('consign');/*Subistitui a necessidade de fazer um require para cada modulo*/
var bodyParser = require('body-parser');/*Serve para recuperar as informacoes do usuario(forms) atravez de jasons)*/
var expressSession = require('express-session');
var SQLiteStore = require('connect-sqlite3')(expressSession);

var app = express();

app.set('html', './app/public/html');//Indica onde esta os arquivos htmls e o formato padrao

app.use(express.static('./app/public'));//Indica qual pasta estao os arquivos que serao requisitados
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    store: new SQLiteStore,
    secret: 'chave', // informar a chave de criptografia da sua session
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 semana  
}));

consign()
    .include('app/routes')//inclui o caminho as rotas a variavel app
    .then('config/dbConnection.js')//inclui o caminho a conexão do banco de dados a variavel app
    .then('app/querys')//inclui o caminho as querys de acesso ao banco a variavel app
    .into(app);
module.exports = app;