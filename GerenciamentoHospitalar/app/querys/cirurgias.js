module.exports = function(){
    /* Inserts que serão mandados para o bd*/
    /*---------------------Cirurgia-------------*/
    this.salvarCirurgia = function(dados,connection,callback){
        connection.query('insert into cirurgias set ?', dados,callback);
    }
    this.listaCirurgia = function(connection,callback){
        connection.query('select * from cirurgias', callback);
    }
    this.getCirurgia = function(id,connection,callback){
        connection.query('select * from cirurgias where id_cir =' + id, callback);
    }
    this.updateCirurgia = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.id_cir);
        connection.query('update cirurgias set ? where id_cir =' + dados.id_cir, dados, callback);
    }
    this.deletaCirurgia = function(id,connection,callback){
        connection.query('delete from cirurgias where id_cir =' + id, callback);
    }

    /*----------------Tipo Cirurgia----------------------------*/
    this.salvarTipoCirurgia = function(dados,connection,callback){
        connection.query('insert into tipos_cirurgias set ?', dados,callback);
    }
    this.listaTipo = function(connection,callback){
        connection.query('select * from tipos_cirurgias', callback);
    }
    this.getTipoCirurgia = function(id,connection,callback){
        connection.query('select * from tipos_cirurgias where cod_tc =' + id, callback);
    }
    this.updateTipo = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.cod_tc);
        connection.query('update tipos_cirurgias set ? where cod_tc =' + dados.cod_tc, dados, callback);
    }
    this.deletaTipo = function(id,connection,callback){
        connection.query('delete from tipos_cirurgias where cod_tc =' + id, callback);
    }

    /*-------------------------GET------------------------------*/
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
    this.getCodigo = function(connection,callback){
        connection.query('select cod_tc, nome_tc from tipos_cirurgias',callback);
    }
    this.getEnfermeira = function(connection,callback){
        connection.query('select id_enf, nome_enf from enfermeiras',callback);
    }
    return this;
}