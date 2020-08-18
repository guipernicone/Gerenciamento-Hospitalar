/*Recebe a requisicao do usuario e a direciona para o seu controller*/
module.exports = function(application){

	/*-----------------------MENU-------------------------*/

	application.get('/menu_cirurgias', function(req, res){
        if(req.session.logado) 
            res.sendFile("menu_cirurgias.html", {root: "app/public/html/cirurgias/"});	
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
		
	});
    /*--------------------------------------------------------*/

    /*-----------------------CADASTRO-------------------------*/
        /*------------------------Cirurgia---------------------------*/
        application.get('/cadastrar_cirurgias', function(req, res){
            if(req.session.logado) 
                res.sendFile("cadastrar_cirurgia.html", {root: "app/public/html/cirurgias/"});	
            else
                res.sendFile("login.html", {root: "app/public/html/home/"});
        });
        
        application.get('/cadastrar_tipoCirurgias', function(req, res){
            if(req.session.logado) 
                res.sendFile("cadastrar_tipoCirurgia.html", {root: "app/public/html/cirurgias/"});	
            else
                res.sendFile("login.html", {root: "app/public/html/home/"});
            
        });
        /*------------------------Tipo-Cirurgia---------------------------*/
        application.post('/cadastrar_tipoCirurgias/salvar', function(req, res){
            var dados = req.body;
            var connection = application.config.dbConnection();
            var querys = application.app.querys.cirurgias;	
            console.log(dados);
            querys.salvarTipoCirurgia(dados,connection,function(error,result){
                if(error){
                    console.log(error);
                    res.redirect("/index");	
                }
                else{
                    res.redirect("/index");	
                }
            });
        });

    /*----------------------Gets-------------------------------------- */
	application.post('/cadastrar_cirurgias/salvar', function(req, res){
        var dados = req.body;
		var connection = application.config.dbConnection();
		var querys = application.app.querys.cirurgias;	
		console.log(dados);
		querys.salvarCirurgia(dados,connection,function(error,result){
			if(error){
				console.log(error);
				res.redirect("/index");	
			}
			else{
				res.redirect("/index");	
			}
		});
    });

    application.get('/cadastrar_cirurgias/Medico', function(req, res){
		var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;	
    
		querys.getMedico(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });

    application.get('/cadastrar_cirurgias/Paciente', function(req, res){
		var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;
        	
		querys.getPaciente(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });
    
    application.get('/cadastrar_cirurgias/Sala', function(req, res){
		var connection = application.config.dbConnection();
		var querys = application.app.querys.cirurgias;	

		querys.getSala(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });

    application.get('/cadastrar_cirurgias/Recurso', function(req, res){
		var connection = application.config.dbConnection();
		var querys = application.app.querys.cirurgias;	

		querys.getRecurso(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });

    application.get('/cadastrar_cirurgias/CodigoCir', function(req, res){
		var connection = application.config.dbConnection();
		var querys = application.app.querys.cirurgias;	

		querys.getCodigo(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });

    application.get('/cadastrar_cirurgias/Enfermeira', function(req, res){
		var connection = application.config.dbConnection();
		var querys = application.app.querys.cirurgias;	

		querys.getEnfermeira(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
		});
    });
    
    
    /*-----------------------LISTAR-DADOS---------------------------*/

    /*-----------------------Cirurgia---------------------------*/
    application.get('/listaCirurgias', function(req, res){
        if(req.session.logado) 
            res.sendFile("listar_Cirurgia.html", {root: "app/public/html/cirurgias/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
        
    });

    application.get('/listaCirurgias/listar', function(req, res){
        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;

        querys.listaCirurgia(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaCirurgias/editarCirurgia/salva', function(req, res){
        console.log("Salva Cir:"+req.body);
        data = req.body;
        
        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;
        querys.updateCirurgia(data,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
        
    });

    application.post('/listaCirurgias/editarCirurgia', function(req, res){
        var id =req.query.id;

        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;

        querys.getCirurgia(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaCirurgias/deleta', function(req, res){
        var id =req.query.id;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;

        querys.deletaCirurgia(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });


    /*------------------------Tipo-Cirurgia---------------------------*/
    application.get('/listaTipoCirurgias', function(req, res){
        if(req.session.logado) 
            res.sendFile("listar_tipoCirurgia.html", {root: "app/public/html/cirurgias/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
                
    });

    application.get('/listaTipoCirurgias/listar', function(req, res){
        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;

        querys.listaTipo(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            console.log(result);
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaTipoCirurgia/editarTipoCirurgia', function(req, res){
        var id =req.query.id;

        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;

        querys.getTipoCirurgia(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaTipoCirurgia/editarTipoCirurgia/salva', function(req, res){
        console.log(req.body);
        data = req.body;
        
        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;
        querys.updateTipo(data,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
        
    });

    application.post('/listaTipoCirurgias/deleta', function(req, res){
        var id =req.query.id;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.cirurgias;

        querys.deletaTipo(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });
            
	
}