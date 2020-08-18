function setPaciente(pacientes){
    var x;
    var select = document.getElementById("paciente");

    for(x in pacientes){
        var option = document.createElement("option");
        paciente = pacientes[x];
        option.text= paciente.nome_pac;
        option.value= paciente.id_pac;
        select.add(option);
    }

}

function setMedico(medicos){
    var x;
    var select = document.getElementById("medico");
    
    for(x in medicos){
        var option = document.createElement("option");
        medico = medicos[x];
        option.text= medico.nome_med;
        option.value= medico.id_med;
        select.add(option);
    }

}

function setSala(salas){
    var x;
    var select = document.getElementById("Sala");
   
    for(x in salas){
        var option = document.createElement("option");
        sala = salas[x];
        option.text= sala.numero_sala;
        option.value= sala.id_sala;
        select.add(option);
    }

}

function setRecurso(recursos){
    var x;
    var select = document.getElementById("recursos");
   
    for(x in recursos){
        var option = document.createElement("option");
        recurso = recursos[x];
        option.text= recurso.recursos;
        option.value= recurso.recursos;
        select.add(option);
    }

}