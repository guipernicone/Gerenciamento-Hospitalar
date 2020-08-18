/*Recebe a requisicao do usuario e a direciona para o seu controller*/
module.exports = function(application){

	/*-----------------------MENUS-------------------------*/
	application.get('/', function(req, res){
		res.sendFile("login.html", {root: "app/public/html/home/"});	
	});

	application.get('/logout', function(req, res){
		req.session.destroy();/* Ao usuario requisitar logout é destruido a seção do usaruio */
		res.sendFile("login.html", {root: "app/public/html/home/"});	
	});

	application.get('/index', function(req, res){
		if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
			if(req.session.nivel == 2){/*Caso for uma conta ADMIN  */
				res.sendFile("index_admin.html", {root: "app/public/html/home/"});
			}
			else{
				res.sendFile("index.html", {root: "app/public/html/home/"});
			}	

		else
			res.sendFile("login.html", {root: "app/public/html/home/"});
	});
	/*--------------------------------------------------------*/

	/*-----------------------CADASTRO-------------------------*/
	application.get('/cadastro_usuario', function(req, res){
		res.sendFile("cadastro_usuario.html", {root: "app/public/html/home/"});	
	});
	/*--------------------------------------------------------*/

	/*--------------------SALVAR/VALIDAR-CADASTRO---------------------*/
	application.post('/cadastro_usuario/salvar', function(req, res){
		var dados = req.body;
		var connection = application.config.dbConnection();/*Requista a conexão do bd */
		var querys = application.app.querys.home;
	
		/*Verifica se o email ja foi cadastrado previamente*/
		console.log(dados.email_user);
		querys.validaEmail(dados.email_user, connection, function(error,result){
			if(result.length != 0){
				console.log(result);
				res.redirect("/cadastro_usuario");
			}
			else{
				querys.salvarUsuario(dados,connection,function(error,result){
					if(error){
						console.log(error);
					}
				});
				res.redirect("/");
			}
		});
	});

	application.post('/login/valida_login', function(req, res){
		var dados = req.body;
		var connection = application.config.dbConnection();/*Requista a conexão do bd */
		var querys = application.app.querys.home;

		/*Verifica se a senha e o email estão cadastrado no banco de dados*/
		console.log(dados.email_user);
		querys.validaUser(dados.email_user, dados.senha_user, connection, function(error,result){
			if (error)
				res.json({ status: 'ERRO', data: + err });
			else{
				if(result.length != 0){
					/*caso a chamada do banco de dados tenha tido sucesso 
					*sera mudado o status da seção aberta pelo usuario como logado*/
					req.session.logado = true;
					req.session.nivel = result[0].id_nivel_user;
					res.json({ status: 'OK', data:'Logado com sucesso!' });

				}
				else{
					res.json({ status: 'ERRO', data: 'E-mail ou Senha Incorretos!' });
				}
			}		
		});
	});
}