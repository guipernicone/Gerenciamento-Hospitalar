module.exports = function(){
    /* Inserts que serão mandados para o bd*/

    /*------------------------Medico---------------------------*/
    this.salvarMedico = function(dados,connection,callback){
        connection.query('insert into medicos set ?', dados,callback);
    }

    this.listaMedicos = function(connection,callback){
        connection.query('select * from medicos', callback);
    }

    this.getMedico = function(id,connection,callback){
        connection.query('select * from medicos where id_med =' + id, callback);
    }

    this.updateMedico = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.id_med);
        connection.query('update medicos set ? where id_med =' + dados.id_med, dados, callback);
    }

    this.deletaMedico = function(id,connection,callback){
        connection.query('delete from medicos where id_med =' + id, callback);
    }

    /*------------------------Enfermeira---------------------------*/
    
    this.salvarEnfermeira = function(dados,connection,callback){
        connection.query('insert into enfermeiras set ?', dados,callback);
    }

    this.listaEnfermeira = function(connection,callback){
        connection.query('select * from enfermeiras', callback);
    }

    this.getEnfermeira = function(id,connection,callback){
        connection.query('select * from enfermeiras where id_enf =' + id, callback);
    }

    this.updateEnfermeira = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.id_enf);
        connection.query('update enfermeiras set ? where id_enf =' + dados.id_enf, dados, callback);
    }


    this.deletaEnfermeira = function(id,connection,callback){
        connection.query('delete from enfermeiras where id_enf =' + id, callback);
    }
    /*------------------------Paciente---------------------------*/

    this.salvarPaciente = function(dados,connection,callback){
        connection.query('insert into pacientes set ?', dados,callback);
    }

    this.listaPaciente = function(connection,callback){
        connection.query('select * from pacientes', callback);
    }

    this.getPaciente = function(id,connection,callback){
        connection.query('select * from pacientes where id_pac =' + id, callback);
    }

    this.updatePaciente = function(dados,connection,callback){
        
        console.log(dados);
        console.log(dados.id_pac);
        connection.query('update pacientes set ? where id_pac =' + dados.id_pac, dados, callback);
    }


    this.deletaPaciente = function(id,connection,callback){
        connection.query('delete from pacientes where id_pac =' + id, callback);
    }
    return this;
}