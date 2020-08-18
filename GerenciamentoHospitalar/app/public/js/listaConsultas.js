function exibeConsultas(consultas){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in consultas){
        var consulta = consultas[x];
        console.log(consulta);
        console.log(consulta.id_cons);
        //var dadosconsulta = document.createElement("div");
        dadosConsulta = '<div id= ' + consulta.id_cons + ' class="lista">' +
        'ID : ' + consulta.id_cons +
        '<br>ID do Paciente : ' + consulta.id_pac_cons +
        '<br>ID do Medico : ' + consulta.id_med_cons +
        '<br>ID do Sala : ' + consulta.id_sala_cons +
        '<br>Material : ' + consulta.recursos_cons +
        '<br>Quantidade do Material : ' + consulta.qtde_rec_cons +
        '<br>Horario da Consulta : ' + consulta.horario_cons +
        '<br>Data da Consulta: ' + consulta.data_cons +
        '<br> <a href="#" onClick="editConsulta(' + consulta.id_cons + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaConsulta(' + consulta.id_cons +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';

        document.getElementById('result').innerHTML += dadosConsulta;
      
    }
}


function exibeConsulta(consultas){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in consultas){
        var consulta = consultas[x];
        console.log(consulta);
        console.log(consulta.id_cons);

        dadosConsulta =
        'ID : ' + consulta.id_cons +
        '<br>ID do Paciente : ' + consulta.id_pac_cons +
        '<br>ID do Medico : ' + consulta.id_med_cons +
        '<br>ID do Sala : ' + consulta.id_sala_cons +
        '<br>Material : ' + consulta.recursos_cons +
        '<br>Quantidade do Material : ' + consulta.qtde_rec_cons +
        '<br>Horario da Consulta : ' + consulta.horario_cons +
        '<br>Data da Consulta: ' + consulta.data_cons +
        '<br> <a href="#" onClick="editConsulta(' + consulta.id_cons + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaConsulta(' + consulta.id_cons +');"><img src="img/delete.png" alt="delete"></a>';

        document.getElementById(consulta.id_cons).innerHTML = dadosConsulta;
        //document.getElementById('result').appendChild(dadosconsulta.firstChild);
    }
}


function deletaConsulta(id){
        $.ajax({
            url:'/listaConsulta/deleta?id='+id,
            type:'post',
            dataType: 'json',
            error:function(dados){
                alert('Erro: '+dados.data);
            },
            success:function(dados){
                if(dados.status === 'ERRO')
                    alert('Erro: '+dados.data);
                else{
                    var divResult = document.getElementById('result');
                    var divId = document.getElementById(id);
                    divResult.removeChild(divId);
            
                }
            }
        });
}

function editConsulta(id){

    $.ajax({
        url:'/listaConsulta/editarConsulta?id=' + id,
        type:'post',
        dataType: 'json',
        error:function(dados){
            alert('Erro: '+dados.data);
        },
        success:function(dados){
            if(dados.status === 'ERRO')
                alert('Erro: '+dados.data);
            else
            console.log(dados.data);
            var form;
            //= document.createElement("FORM"); 
            form = 
            "<h3>Editar</h3><br>" +
            "<form id='editar_"+id+"' class='form'>" +
            "<label>Paciente envolvido</label><br>" +
            '<select id="paciente' + id + '" name="id_pac_cons"  class="form-control"required> </select>'+
            "<label>Médico envolvido</label><br>" +
            '<select id="medico' + id + '" name="id_med_cons" class="form-control" required> </select>' +
            "<label>Sala envolvida</label><br>" +
            '<select id="sala' + id + '" name="id_sala_cons"  class="form-control" required> </select>' +
            "<label>Recurso necessário</label><br>" +
            '<select id="recursos' + id + '" name="recursos_cons" class="form-control" required> </select>' +
            "<label>Quantidade de recursos</label><br>" +
            "<input name='qtde_rec_cons' class='inputText' type='number' class='form-control'  required><br>" +
            "<label>Horário da consulta</label><br>" +
            "<input name='horario_cons' class='inputText' type='text' class='form-control'required><br>" +
            "<label>Data da consulta</label><br>" +
            "<input name='data_cons' class='inputText' type='text' class='form-control'required><br>" +
            "<button type='button' class='botao'onClick='salvarConsultas("+id+")'>Editar</button>" +
            "</form>";
            
            document.getElementById(dados.data[0].id_cons).innerHTML = form;
            var aux = document.getElementById('editar_'+id);
           /* aux.id_pac_cons.value = dados.data[0].id_pac_cons;
            aux.id_med_cons.value = dados.data[0].id_med_cons;
            aux.id_sala_cons.value = dados.data[0].id_sala_cons;
            aux.recursos_cons.value = dados.data[0].recursos_cons;*/
            aux.qtde_rec_cons.value = dados.data[0].qtde_rec_cons;
            aux.horario_cons.value = dados.data[0].horario_cons;
            aux.data_cons.value = dados.data[0].data_cons;

            $.ajax({
                url:'/cadastrar_consultas/Medico',
                dataType: 'json',
                error:function(dadosSelect){
                    alert('Erro: '+dadosSelect.data);
                },
                success:function(dadosSelect){
                    if(dados.status === 'ERRO'){
                        alert('Erro: '+dadosSelect.data);
                    }  
                    else{
                        setMedico(dadosSelect.data, dados.data[0].id_med_cons, id);
                        $.ajax({
                            url:'/cadastrar_consultas/Paciente',
                            dataType: 'json',
                            error:function(dadosSelect){
                                alert('Erro: '+dadosSelect.data);
                            },
                            success:function(dadosSelect){
                                if(dados.status === 'ERRO'){
                                    alert('Erro: '+dados.data);
                                }  
                                else{
                                    setPaciente(dadosSelect.data, dados.data[0].id_pac_cons, id);
                                    $.ajax({
                                        url:'/cadastrar_consultas/Sala',
                                        dataType: 'json',
                                        error:function(dadosSelect){
                                            alert('Erro: '+dadosSelect.data);
                                        },
                                        success:function(dadosSelect){
                                            if(dadosSelect.status === 'ERRO'){
                                                alert('Erro: '+dadosSelect.data);
                                            }
                                            else{
                                                setSala(dadosSelect.data,dados.data[0].id_sala_cons, id);
                                                /*Se a recuperação de sala deu certo faz a de recursos*/    
                                                $.ajax({
                                                    url:'/cadastrar_consultas/Recurso',
                                                    dataType: 'json',
                                                    error:function(dadosSelect){
                                                        alert('Erro: '+dadosSelect.data);
                                                    },
                                                    success:function(dadosSelect){
                                                        if(dadosSelect.status === 'ERRO'){
                                                            alert('Erro: '+dadosSelect.data);
                                                        }   
                                                        else{
                                                            setRecurso(dadosSelect.data,dados.data[0].recursos_cons, id);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    });
}


function setMedico(medicos,id_escolhido,id_bloco){
    var x;
    var select = document.getElementById("medico"+id_bloco);
    console.log(id_escolhido);
    for(x in medicos){
        var option = document.createElement("option");
        medico = medicos[x];
        option.text= medico.nome_med;
        option.value= medico.id_med;
        if(medico.id_med == id_escolhido)
            select.add(option,select[0]);  
        else  
            select.add(option,select[1]);
        select.options[0].defaultSelected = true;
    }

}

function setPaciente(pacientes,id_escolhido,id_bloco){
    var x;
    var select = document.getElementById("paciente"+id_bloco);

    for(x in pacientes){
        var option = document.createElement("option");
        paciente = pacientes[x];
        option.text= paciente.nome_pac;
        option.value= paciente.id_pac;
        if(paciente.id_pac == id_escolhido)
            select.add(option,select[0]);
        else  
            select.add(option,select[x + 1]);   
        select.options[0].defaultSelected = true;
    }

}

function setSala(salas,id_escolhido,id_bloco){
    var x;
    var select = document.getElementById("sala"+id_bloco);
   
    for(x in salas){
        var option = document.createElement("option");
        sala = salas[x];
        option.text= sala.numero_sala;
        option.value= sala.id_sala;
        if(sala.id_sala == id_escolhido)
            select.add(option,select[0]);
        else  
            select.add(option,select[1]);
        select.options[0].defaultSelected = true;
    }

}

function setRecurso(recursos,id_escolhido,id_bloco){
    var x;
    var select = document.getElementById("recursos"+id_bloco);
   
    for(x in recursos){
        var option = document.createElement("option");
        recurso = recursos[x];
        option.text= recurso.recursos;
        option.value= recurso.recursos;
        if(recurso.recursos == id_escolhido)
            select.add(option,select[0]);
        else
            select.add(option,select[1]);
        select.options[0].defaultSelected = true;
    }

}

function salvarConsultas(id){
    console.log(id);
    var form = document.getElementById('editar_'+id);

    var input ={
        id_cons :id,
        id_sala_cons:form.id_sala_cons.value,
        id_pac_cons:form.id_pac_cons.value,
        id_med_cons:form.id_med_cons.value,
        recursos_cons:form.recursos_cons.value,
        qtde_rec_cons:form.qtde_rec_cons.value,
        horario_cons:form.horario_cons.value,
        data_cons:form.data_cons.value
    }
    $.ajax({
        url:'/listaConsulta/editarConsulta/salva',
        type:'post',
        data:input,
        error:function(dados){
            alert('1Erro: '+dados);
        },
        success:function(dados){
            if(dados.status === 'ERRO')
                alert('Erro: '+dados.data);
            else{
                $.ajax({
                    url:'/listaConsulta/editarConsulta?id=' + id,
                    type:'post',
                    dataType: 'json',
                    error:function(dados){
                        alert('Erro: '+dados.data);
                    },
                    success:function(dados){
                        if(dados.status === 'ERRO')
                            alert('Erro: '+dados.data);
                        else
                        console.log(dados.data);
                        exibeConsulta(dados.data);
                    }
                });
            }
        }
    });
}