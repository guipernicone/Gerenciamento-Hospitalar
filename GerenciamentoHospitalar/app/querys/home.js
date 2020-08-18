module.exports = function(){
    /* Inserts que serão mandados para o bd*/
    this.listaEmail = function(connection,callback){
        connection.query('select email_user from  usuario', callback);
    }
    this.validaEmail = function(dados,connection,callback){

        connection.query("select email_user from  usuario where email_user = '" + dados + "'", callback);
    }
    this.validaUser = function(email,senha,connection,callback){

        connection.query("select email_user, senha_user, id_nivel_user from  usuario where email_user = '" + email + "' and senha_user = '" + senha + "'", callback);
    }
    this.salvarUsuario = function(dados,connection,callback){
        connection.query('insert into usuario set ?', dados,callback);
    }
    return this;
}