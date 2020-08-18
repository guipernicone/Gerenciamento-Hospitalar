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
    var select = document.getElementById("sala");
   
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

function setCodigoCir(codigos){
    var x;
    var select = document.getElementById("codigo");
   
    for(x in codigos){
        var option = document.createElement("option");
        codigo = codigos[x];
        option.text= codigo.nome_tc;
        option.value= codigo.cod_tc;
        select.add(option);
    }
}

function setEnfermeira(enfermeiras){
    var x;
    var select = document.getElementById("enfermeira");
   
    for(x in enfermeiras){
        var option = document.createElement("option");
        enfermeira = enfermeiras[x];
        option.text= enfermeira.nome_enf;
        option.value= enfermeira.id_enf;
        select.add(option);
    }
}
