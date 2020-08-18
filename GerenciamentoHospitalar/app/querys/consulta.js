module.exports = function(){
    /* Inserts que serão mandados para o bd*/
    this.salvarConsulta = function(dados,connection,callback){
        connection.query('insert into consultas set ?', dados,callback);
    }

    this.listaConsulta = function(connection,callback){
        connection.query('select * from consultas', callback);
    }

    this.getConsulta = function(id,connection,callback){
        connection.query('select * from consultas where id_cons =' + id, callback);
    }

    this.updateConsulta = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.id_cons);
        connection.query('update consultas set ? where id_cons =' + dados.id_cons, dados, callback);
    }

    this.deletaConsulta = function(id,connection,callback){
        connection.query('delete from consultas where id_cons =' + id, callback);
    }

    /*-----------------GETs-------------------------*/
    this.getMedico = function(connection,callback){
        connection.query('select id_med, nome_med from medicos',callback);
    }
    this.getPaciente = function(connection,callback){
        connection.query('select id_pac, nome_pac from pacientes',callback);
    }
    this.getSala = function(connection,callback){
        connection.query('select id_sala, numero_sala from salas',callback);
    }
    this.getRecurso = function(connection,callback){
        connection.query('select recursos from recursos_hospitalares',callback);
    }
    
    return this;
}