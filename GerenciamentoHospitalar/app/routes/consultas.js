/*Recebe a requisicao do usuario e a direciona para o seu controller*/
module.exports = function(application){

	/*-----------------------MENU-------------------------*/

	application.get('/menu_consultas', function(req, res){
        if(req.session.logado) 
            res.sendFile("menu_consultas.html", {root: "app/public/html/consultas/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
	});
    /*--------------------------------------------------------*/

    /*-----------------------CADASTRO-------------------------*/
    
    application.get('/cadastrar_consulta', function(req, res){
        if(req.session.logado) 
            res.sendFile("cadastrar_consultas.html", {root: "app/public/html/consultas/"});	
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
    });
    

	application.post('/cadastrar_consultas/salvar', function(req, res){
        var dados = req.body;
		var connection = application.config.dbConnection();
		var querys = application.app.querys.consulta;	
		console.log(dados);
		querys.salvarConsulta(dados,connection,function(error,result){
			if(error){
				console.log(error);
				res.redirect("/index");	
			}
			else{
				res.redirect("/index");	
			}
		});
    });

    application.get('/cadastrar_consultas/Medico', function(req, res){
		var connection = application.config.dbConnection();
        var querys = application.app.querys.consulta;	
    
		querys.getMedico(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });

    application.get('/cadastrar_consultas/Paciente', function(req, res){
		var connection = application.config.dbConnection();
        var querys = application.app.querys.consulta;
        	
		querys.getPaciente(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });
    
    application.get('/cadastrar_consultas/Sala', function(req, res){
		var connection = application.config.dbConnection();
		var querys = application.app.querys.consulta;	

		querys.getSala(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });

    application.get('/cadastrar_consultas/Recurso', function(req, res){
		var connection = application.config.dbConnection();
		var querys = application.app.querys.consulta;	

		querys.getRecurso(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });
    
    
    /*-----------------------LISTAR-DADOS---------------------------*/
    application.get('/listaConsulta', function(req, res){
        if(req.session.logado) 
            res.sendFile("listar_consultas.html", {root: "app/public/html/consultas/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
        
    });

    application.get('/listaConsulta/listar', function(req, res){
        var dados = req.body;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.consulta;

        querys.listaConsulta(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaConsulta/editarConsulta/salva', function(req, res){
        console.log("Salva Cir:"+req.body);
        data = req.body;
        
        var connection = application.config.dbConnection();
        var querys = application.app.querys.consulta;
        querys.updateConsulta(data,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
        
    });

    application.post('/listaConsulta/editarConsulta', function(req, res){
        var id =req.query.id;

        var connection = application.config.dbConnection();
        var querys = application.app.querys.consulta;

        querys.getConsulta(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            console.log(result);
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaConsulta/deleta', function(req, res){
        var id =req.query.id;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.consulta;

        querys.deletaConsulta(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });
    //*-----------------------EDITAR-DADOS---------------------------*/

}

