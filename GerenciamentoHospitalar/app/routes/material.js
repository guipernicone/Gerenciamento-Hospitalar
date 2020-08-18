/*Recebe a requisicao do usuario e a direciona para o seu controller*/
module.exports = function(application){

	/*-----------------------MENU-------------------------*/

	application.get('/menu_material', function(req, res){
        if(req.session.logado) 
            res.sendFile("menu_material.html", {root: "app/public/html/material/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});		
	});
    /*--------------------------------------------------------*/

    /*-----------------------CADASTRO-------------------------*/
    
    application.get('/cadastrar_material', function(req, res){
        if(req.session.logado) 
            res.sendFile("cadastrar_material.html", {root: "app/public/html/material/"});	
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
    });
    

	application.post('/cadastrar_material/salvar', function(req, res){
        var dados = req.body;
		var connection = application.config.dbConnection();
		var querys = application.app.querys.material;	
		console.log(dados);
		querys.salvarMaterial(dados,connection,function(error,result){
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
    application.get('/listaMaterial', function(req, res){
        if(req.session.logado) 
            res.sendFile("listar_material.html", {root: "app/public/html/material/"});	
		else
			res.sendFile("login.html", {root: "app/public/html/home/"});
        
    });

    application.get('/listaMaterial/listar', function(req, res){
        var dados = req.body;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.material;

        querys.listaMaterial(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaMaterial/editarMaterial', function(req, res){
        var id =req.query.id;

        var connection = application.config.dbConnection();
        var querys = application.app.querys.material;

        querys.getMaterial(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.post('/listaMeterial/editarMaterial/salva', function(req, res){
        console.log(req.body);
        data = req.body;
        
        var connection = application.config.dbConnection();
        var querys = application.app.querys.material;
        querys.updateMaterial(req.body,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
        
    });

    application.post('/listaMaterial/deleta', function(req, res){
        var id =req.query.id;
        var connection = application.config.dbConnection();
        var querys = application.app.querys.material;

        querys.deletaMaterial(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });
}