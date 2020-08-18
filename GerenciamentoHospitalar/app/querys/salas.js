module.exports = function(){
    /* Inserts que serão mandados para o bd*/
    /*------------------------Salas---------------------------*/
    this.salvarSala = function(dados,connection,callback){
        connection.query('insert into salas set ?', dados,callback);
    }

    this.listaSalas = function(connection,callback){
        connection.query('select * from salas', callback);
    }
    
    this.getSala = function(id,connection,callback){
        connection.query('select * from salas where id_sala =' + id, callback);
    }

    this.deletaSala = function(id,connection,callback){
        connection.query('delete from salas where id_sala =' + id, callback);
    }
    return this;
}