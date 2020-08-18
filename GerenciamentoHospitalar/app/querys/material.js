module.exports = function(){
    /* Inserts que serão mandados para o bd*/
    /*------------------------Material---------------------------*/
    this.salvarMaterial = function(dados,connection,callback){
        connection.query('insert into recursos_hospitalares set ?', dados,callback);
    }

    this.listaMaterial = function(connection,callback){
        connection.query('select * from recursos_hospitalares', callback);
    }

    this.getMaterial = function(id,connection,callback){
        connection.query('select * from recursos_hospitalares where recursos =' + id, callback);
    }

    this.updateMaterial = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.recursos);
        connection.query('update recursos_hospitalares set ? where recursos =' + dados.recursos, dados, callback);
    }

    this.deletaMaterial = function(id,connection,callback){
        connection.query('delete from recursos_hospitalares where recursos = "' + recursos + '"', callback);
    }
    return this;
}