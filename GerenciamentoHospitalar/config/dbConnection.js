/*Modulo Para a conexão com o Banco de dados*/

/* Para acessar o banco de dados via terminal usar o comando:
 * cd \Program Files\MySQL\MySQL Server 8.0\bin mysql -u root -p*/
/*Para inicializar o servidor do banco de dados service.msc*/
var mysql = require('mysql');

/*Banco de dados Online*/
/*Cria a Conexão com o banco de dados*/
/*E-mail: admin
*senha: admin
*/
var connMySQL = function(){
	return mysql.createConnection({
		host : 'sql10.freemysqlhosting.net',
		user : 'sql10268158',
		password : 'D52W9L1KjT',
		database : 'sql10268158',
	});
}

/*LocalHost*/
/*
var connMySQL = function(){
	return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'foxlife2',
			database : 'topicos',
	});
}
*/
module.exports = function () {
	return connMySQL;
}