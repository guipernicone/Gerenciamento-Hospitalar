module.exports = function(application){

	/*-----------------------LISTA-------------------------*/

	application.get('/lista_admin', function(req, res){
		if(req.session.logado && req.session.nivel == 2) /*Verifica se o usuario requisitando o acesso está logado*/
			res.sendFile("lista_admin.html", {root: "app/public/html/admin/"});
        else
            res.sendFile("login.html", {root: "app/public/html/home/"});
			
    });

    application.get('/listaAdmin/listar', function(req, res){
        var dados = req.body;
        var connection = application.config.dbConnection();/*Requista a conexão do bd */
        var querys = application.app.querys.admin;
        /* Recupera do bd todos os usuarios registrados no bd*/
        querys.listaUser(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });


    application.post('/listaAdmin/deleta', function(req, res){
        var id =req.query.id;

        //var dados = req.body;
        
        var connection = application.config.dbConnection();/*Requista a conexão do bd */
        var querys = application.app.querys.admin;

        /*Chama a query de deletar o usuario com o id passado do bd */
        querys.deletaUser(id,connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });

    application.get('/listaAdmin/nivel', function(req, res){
        var connection = application.config.dbConnection();/*Requista a conexão do bd */
        var querys = application.app.querys.admin;

        /* Recupera do bd o nivel com o id informado*/
        querys.getNivel(connection,function(error,result){
            if(error)
                res.json({status:'error', data: + error});
            res.json({status:'ok', data:result});
        });
    });
   
}