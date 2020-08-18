/*Recebe a requisicao do usuario e a direciona para o seu controller*/
module.exports = function(application){

	/*-----------------------MENU-------------------------*/

	application.get('/menu_staff', function(req, res){
		if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
			res.sendFile("menu_staff.html", {root: "app/public/html/staff/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
	});
	/*--------------------------------------------------------*/

	/*-----------------------CADASTRO-------------------------*/
	application.get('/cadastrar_medicos', function(req, res){
		if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
			res.sendFile("cadastrar_medico.html", {root: "app/public/html/staff/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
	});
	application.get('/cadastrar_paciente', function(req, res){
		if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
			res.sendFile("cadastrar_paciente.html", {root: "app/public/html/staff/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
	});
	application.get('/cadastrar_enfermeira', function(req, res){
		if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
            res.sendFile("cadastrar_enfermeira.html", {root: "app/public/html/staff/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
	});
	application.get('/cadastrar_cirurgia', function(req, res){
		if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
			res.sendFile("cadastrar_cirurgia.html", {root: "app/public/html/cirurgias/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
		
	});
	/*--------------------------------------------------------*/

	/*--------------------SALVAR-CADASTRO---------------------*/
	application.post('/cadastrar_medico/salvar', function(req, res){
		var dados = req.body;
		var connection = application.config.dbConnection();/*Requista a conexão do bd */
		var querys = application.app.querys.staff;	
		console.log(dados);
		/*Requisita que os dados fornecidos pelo usuario sejam inserido no bd*/
		querys.salvarMedico(dados,connection,function(error,result){
			if(error){
				console.log("Cadastro com erro:"+error);
				res.redirect("/index");	
			}
			else{
				res.redirect("/index");	
			}
		});
	});

	application.post('/cadastrar_enfermeira/salvar', function(req, res){
		var dados = req.body;
		var connection = application.config.dbConnection();/*Requista a conexão do bd */
		var querys = application.app.querys.staff;	
		console.log(dados);
		/*Requisita que os dados fornecidos pelo usuario sejam inserido no bd*/
		querys.salvarEnfermeira(dados,connection,function(error,result){
			if(error){
				console.log(error);
				res.redirect("/index");	
			}
			else{
				res.redirect("/index");	
			}
		});
	});

	application.post('/cadastrar_paciente/salvar', function(req, res){
		var dados = req.body;
		var connection = application.config.dbConnection();/*Requista a conexão do bd */
		var querys = application.app.querys.staff;	
		console.log(dados);
		/*Requisita que os dados fornecidos pelo usuario sejam inserido no bd*/
		querys.salvarPaciente(dados,connection,function(error,result){
			if(error){
				console.log(error);
				res.redirect("/index");	
			}
			else{
				res.redirect("/index");	
			}
		});
	});
	/*-----------------------LISTAR-DADOS---------------------------*/
		/*------------------------Medico---------------------------*/
		application.get('/listaMedico', function(req, res){
			if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
            	res.sendFile("listar_medico.html", {root: "app/public/html/staff/"});
       		else
            	res.sendFile("login.html", {root: "app/public/html/home/"});
			
		});

		application.get('/listaMedico/listar', function(req, res){
			var dados = req.body;
			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;
			/* Recupera do bd todos os medicos registrados no bd*/
			querys.listaMedicos(connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
		});

		application.post('/listaMedico/editarMedico', function(req, res){
			var id =req.query.id;

			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;
			/*Recupera o medico com o id passado */
			querys.getMedico(id,connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
		});

		application.post('/listaMedico/editarMedico/salva', function(req, res){
			//console.log(req.query);
			console.log(req.body);
			data = req.body;
			
			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;

			/*Atualiza os dados do medico passado com o novos dados inseridos pelo usuario */
			querys.updateMedico(req.body,connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
			
		});
		application.post('/listaMedico/deleta', function(req, res){
			var id =req.query.id;

			//var dados = req.body;
			
			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;

			/*Chama a query de deletar o medico com o id passado do bd */
			querys.deletaMedico(id,connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
		});

		/*------------------------Enfermeira---------------------------*/
		application.get('/listaEnfermeira', function(req, res){
			if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
				res.sendFile("listar_enfermeira.html", {root: "app/public/html/staff/"});
        	else
            	res.sendFile("login.html", {root: "app/public/html/home/"});
			
		});

		application.get('/listaEnfermeira/listar', function(req, res){
			var dados = req.body;
			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;

			/* Recupera do bd todos as enfermeiras registrados no bd*/
			querys.listaEnfermeira(connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
		});

		application.post('/listaEnfermeira/editarEnfermeira', function(req, res){
			var id =req.query.id;

			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;

			/*Recupera a enfermeira com o id passado */
			querys.getEnfermeira(id,connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
		});

		application.post('/listaEnfermeira/editarEnfermeira/salva', function(req, res){
			//console.log(req.query);
			console.log(req.body);
			data = req.body;
			
			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;

			/*Atualiza os dados da enfermeira passado com o novos dados inseridos pelo usuario */
			querys.updateEnfermeira(req.body,connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
			
		});
		application.post('/listaEnfermeira/deleta', function(req, res){
			var id =req.query.id;

			var connection = application.config.dbConnection();/*Requista a conexão do bd */
			var querys = application.app.querys.staff;

			/*Chama a query de deletar a enfermeira com o id passado do bd */
			querys.deletaEnfermeira(id,connection,function(error,result){
				if(error)
					res.json({status:'error', data: + error});
				res.json({status:'ok', data:result});
			});
		});

			/*------------------------Paciente---------------------------*/
			application.get('/listaPaciente', function(req, res){
				if(req.session.logado) /*Verifica se o usuario requisitando o acesso está logado*/
					res.sendFile("listar_paciente.html", {root: "app/public/html/staff/"});
				else
					res.sendFile("login.html", {root: "app/public/html/home/"});
				
			});
	
			application.get('/listaPaciente/listar', function(req, res){
				var dados = req.body;
				var connection = application.config.dbConnection();/*Requista a conexão do bd */
				var querys = application.app.querys.staff;
				
				/* Recupera do bd todos os pacientes registrados no bd*/
				querys.listaPaciente(connection,function(error,result){
					if(error)
						res.json({status:'error', data: + error});
					res.json({status:'ok', data:result});
				});
			});
			
			application.post('/listaPaciente/editarPaciente', function(req, res){
				var id =req.query.id;
	
				var connection = application.config.dbConnection();/*Requista a conexão do bd */
				var querys = application.app.querys.staff;
			
				/*Recupera o paciente com o id passado */
				querys.getPaciente(id,connection,function(error,result){
					if(error)
						res.json({status:'error', data: + error});
					res.json({status:'ok', data:result});
				});
			});
	
			application.post('/listaPaciente/editarPaciente/salva', function(req, res){
				//console.log(req.query);
				console.log(req.body);
				data = req.body;
				
				var connection = application.config.dbConnection();/*Requista a conexão do bd */
				var querys = application.app.querys.staff;

				/*Atualiza os dados do paciente passado com o novos dados inseridos pelo usuario */
				querys.updatePaciente(req.body,connection,function(error,result){
					if(error)
						res.json({status:'error', data: + error});
					res.json({status:'ok', data:result});
				});
				
			});

			application.post('/listaPaciente/deleta', function(req, res){
				var id =req.query.id;
	
				var connection = application.config.dbConnection();/*Requista a conexão do bd */
				var querys = application.app.querys.staff;
	
				/*Chama a query de deletar o paciente com o id passado do bd */
				querys.deletaPaciente(id,connection,function(error,result){
					if(error)
						res.json({status:'error', data: + error});
					res.json({status:'ok', data:result});
				});
			});
			
			
}