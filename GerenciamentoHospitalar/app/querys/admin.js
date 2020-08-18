module.exports = function(){
    /* Inserts que serão mandados para o bd*/

    /*------------------------User---------------------------*/
    this.listaUser = function(connection,callback){
        connection.query('select * from usuario', callback);
    }

    this.deletaUser = function(id,connection,callback){
        connection.query('delete from usuario where id_user =' + id, callback);
    }

    this.getNivel = function(connection,callback){
        connection.query('select nome_nivel from nivel', callback);
    }
    return this;
}