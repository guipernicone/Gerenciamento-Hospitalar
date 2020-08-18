/*Recebe a requisicao do usuario e a direciona para o seu controller*/
module.exports = function(application){

	/*-----------------------MENU-------------------------*/

	application.get('/menu_salas', function(req, res){
        if(req.session.logado) 
            res.sendFile("menu_salas.html", {root: "app/public/html/salas/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});

			
	});
    /*--------------------------------------------------------*/

    /*-----------------------CADASTRO-------------------------*/
    
    application.get('/cadastrar_sala', function(req, res){
        if(req.session.logado) 
            res.sendFile("cadastrar_sala.html", {root: "app/public/html/salas/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
    });
    

	application.post('/cadastrar_salas/salvar', function(req, res){
        var dados = req.body;
		var connection = application.config.dbConnection();
		var querys = application.app.querys.salas;	
		console.log(dados);
		querys.salvarSala(dados,connection,function(error,result){
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
    application.get('/listaSala', function(req, res){
        if(req.session.logado) 
              res.sendFile("listar_sala.html", {root: "app/public/html/salas/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
    });

    application.get('/listaSala/listar', function(req, res){
        var dados = req.body;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.salas;

        querys.listaSalas(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaSala/deleta', function(req, res){
        var id =req.query.id;

        //var dados = req.body;
        
        var connection = application.config.dbConnection();
        var querys = application.app.querys.salas;

        querys.deletaSala(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });
}