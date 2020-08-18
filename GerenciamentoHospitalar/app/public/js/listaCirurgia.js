function exibeCirurgias(cirurgias){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in cirurgias){
        var cirurgia = cirurgias[x];
        console.log(cirurgia);

        //var dadoscirurgia = document.createElement("div");
        dadosCirurgia = '<div id= ' + cirurgia.id_cir + ' class="lista">' +
        'ID : ' + cirurgia.id_cir +
        '<br>ID do Paciente : ' + cirurgia.id_pac_cir +
        '<br>ID do Medico : ' + cirurgia.id_med_cir +
        '<br>ID do Enfermeiro : ' + cirurgia.id_enf_cir +
        '<br>ID do Sala : ' + cirurgia.id_sala_cir +
        '<br>Codigo da Cirurgia : ' + cirurgia.cod_tc_cir +
        '<br>Material : ' + cirurgia.recursos_cir +
        '<br>Quantidade do Material : ' + cirurgia.qtde_rec_cir +
        '<br>Horario da cirurgia : ' + cirurgia.horario_cir +
        '<br>Data da cirurgia: ' + cirurgia.data_cir +
        '<br> <a href="#" onClick="editCirurgia(' + cirurgia.id_cir + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaCirurgia(' + cirurgia.id_cir +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';

        document.getElementById('result').innerHTML += dadosCirurgia;
        //document.getElementById('result').appendChild(dadoscirurgia.firstChild);
    }
}

function exibeCirurgia(cirurgias){
    var x;

    /*Insere todos os dados recuperado do banco de dados na div pré-criada */
    for(x in cirurgias){
        var cirurgia = cirurgias[x];
        console.log(cirurgia);

        //var dadoscirurgia = document.createElement("div");
        dadosCirurgia = 
        'ID : ' + cirurgia.id_cir +
        '<br>ID do Paciente : ' + cirurgia.id_pac_cir +
        '<br>ID do Medico : ' + cirurgia.id_med_cir +
        '<br>ID do Enfermeiro : ' + cirurgia.id_enf_cir +
        '<br>ID do Sala : ' + cirurgia.id_sala_cir +
        '<br>Codigo da Cirurgia : ' + cirurgia.cod_tc_cir +
        '<br>Material : ' + cirurgia.recursos_cir +
        '<br>Quantidade do Material : ' + cirurgia.qtde_rec_cir +
        '<br>Horario da cirurgia : ' + cirurgia.horario_cir +
        '<br>Data da cirurgia: ' + cirurgia.data_cir +
        '<br> <a href="#" onClick="editCirurgia(' + cirurgia.id_cir + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaCirurgia(' + cirurgia.id_cir +');"><img src="img/delete.png" alt="delete"></a>';

        document.getElementById(cirurgia.id_cir).innerHTML = dadosCirurgia;
        //document.getElementById('result').appendChild(dadoscirurgia.firstChild);
    }
}

function deletaCirurgia(id){
        $.ajax({
            url:'/listaCirurgias/deleta?id='+id,
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

function editCirurgia(id){

    $.ajax({
        url:'/listaCirurgias/editarCirurgia?id=' + id,
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
            '<select id="paciente' + id + '" name="id_pac_cir" class="form-control" required></select>'+
            "<label>Médico envolvido</label><br>" +
            '<select id="medico'+ id +'" name="id_med_cir" class="form-control" required></select>'+
            "<label>Enfermeiro envolvido</label><br>" +
            '<select id="enfermeira' + id + '" name="id_enf_cir" class="form-control" required></select>'+
            "<label>Sala da cirurgia</label><br>" +
            '<select id="sala' + id + '" name="id_sala_cir" class="form-control" required></select>'+
            "<label>Tipo da cirurgia</label><br>" +
            '<select id="codigo' + id + '" name="cod_tc_cir" class="form-control" required></select>'+
            "<label>Recurso necessário</label><br>" +
            '<select id="recursos' + id + '" name="recursos_cir" class="form-control" required></select>'+
            "<label>Quantidade do recurso</label><br>" +
            "<input name='qtde_rec_cir' class='inputText' type='number' required><br>" +
            "<label>Horário da cirurgia</label><br>" +
            "<input name='horario_cir' class='inputText' type='text' required><br>" +
            "<label>Data da cirurgia</label><br>" +
            "<input name='data_cir' class='inputText' type='text' required>" +
            "<button type='button' class='botao' onClick='salvarCirurgia("+ id +")'>Editar</button>" +
            "</form>";
            document.getElementById(dados.data[0].id_cir).innerHTML = form;
            var aux = document.getElementById('editar_'+id);

            /*aux.id_pac_cir.value = dados.data[0].id_pac_cir;
            aux.id_med_cir.value = dados.data[0].id_med_cir;
            aux.id_enf_cir.value = dados.data[0].id_enf_cir;
            aux.id_sala_cir.value = dados.data[0].id_sala_cir;
            aux.cod_tc_cir.value = dados.data[0].cod_tc_cir;
            aux.recursos_cir.value = dados.data[0].recursos_cir;*/
            aux.qtde_rec_cir.value = dados.data[0].qtde_rec_cir;
            aux.horario_cir.value = dados.data[0].horario_cir;
            aux.data_cir.value = dados.data[0].data_cir;

            $.ajax({
                url:'/cadastrar_cirurgias/Medico',
                dataType: 'json',
                error:function(dadosSelect){
                    alert('Erro: '+dadosSelect.data);
                },
                success:function(dadosSelect){
                    if(dados.status === 'ERRO'){
                        alert('Erro: '+dadosSelect.data);
                    }  
                    else{
                        setMedico(dadosSelect.data, dados.data[0].id_med_cir, id);
                        $.ajax({
                            url:'/cadastrar_cirurgias/Paciente',
                            dataType: 'json',
                            error:function(dadosSelect){
                                alert('Erro: '+dadosSelect.data);
                            },
                            success:function(dadosSelect){
                                if(dados.status === 'ERRO'){
                                    alert('Erro: '+dados.data);
                                }  
                                else{
                                    setPaciente(dadosSelect.data, dados.data[0].id_pac_cir, id);
                                    $.ajax({
                                        url:'/cadastrar_cirurgias/Sala',
                                        dataType: 'json',
                                        error:function(dadosSelect){
                                            alert('Erro: '+dadosSelect.data);
                                        },
                                        success:function(dadosSelect){
                                            if(dadosSelect.status === 'ERRO'){
                                                alert('Erro: '+dadosSelect.data);
                                            }
                                            else{
                                                setSala(dadosSelect.data,dados.data[0].id_sala_cir, id);
                                                /*Se a recuperação de sala deu certo faz a de recursos*/    
                                                $.ajax({
                                                    url:'/cadastrar_cirurgias/Recurso',
                                                    dataType: 'json',
                                                    error:function(dadosSelect){
                                                        alert('Erro: '+dadosSelect.data);
                                                    },
                                                    success:function(dadosSelect){
                                                        if(dadosSelect.status === 'ERRO'){
                                                            alert('Erro: '+dadosSelect.data);
                                                        }
                                                            
                                                        else{
                                                            setRecurso(dadosSelect.data,dados.data[0].recursos_cir, id);

                                                            $.ajax({
                                                                url:'/cadastrar_cirurgias/CodigoCir',
                                                                dataType: 'json',
                                                                error:function(dadosSelect){
                                                                    alert('Erro: '+dadosSelect.data);
                                                                },
                                                                success:function(dadosSelect){
                                                                    if(dadosSelect.status === 'ERRO'){
                                                                        alert('Erro: '+dadosSelect.data);
                                                                    }
                                                                        
                                                                    else{
                                                                        setCodigoCir(dadosSelect.data,dados.data[0].cod_tc_cir, id);

                                                                        $.ajax({
                                                                            url:'/cadastrar_cirurgias/Enfermeira',
                                                                            dataType: 'json',
                                                                            error:function(dadosSelect){
                                                                                alert('Erro: '+dadosSelect.data);
                                                                            },
                                                                            success:function(dadosSelect){
                                                                                if(dadosSelect.status === 'ERRO'){
                                                                                    alert('Erro: '+dadosSelect.data);
                                                                                }
                                                                                    
                                                                                else{
                                                                                    setEnfermeira(dadosSelect.data,dados.data[0].id_enf_cir, id);
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

function setCodigoCir(codigos,id_escolhido,id_bloco){
    var x;
    var select = document.getElementById("codigo"+id_bloco);
   
    for(x in codigos){
        var option = document.createElement("option");
        codigo = codigos[x];
        option.text= codigo.nome_tc;
        option.value= codigo.cod_tc;
        if(codigo.cod_tc == id_escolhido)
            select.add(option,select[0]);
        else
            select.add(option,select[1]);
        select.options[0].defaultSelected = true;
    }
}

function setEnfermeira(enfermeiras,id_escolhido,id_bloco){
    var x;
    var select = document.getElementById("enfermeira"+id_bloco);
   
    for(x in enfermeiras){
        var option = document.createElement("option");
        enfermeira = enfermeiras[x];
        option.text= enfermeira.nome_enf;
        option.value= enfermeira.id_enf;
        if(enfermeira.id_enf == id_escolhido)
            select.add(option,select[0]);
        else
            select.add(option,select[1]);
        select.options[0].defaultSelected = true;
    }
}



function salvarCirurgia(id){
    console.log(id);
    var form = document.getElementById('editar_'+id);

    var input ={
        id_cir :id,
        id_enf_cir:form.id_enf_cir.value,
        id_med_cir:form.id_med_cir.value,
        id_sala_cir:form.id_sala_cir.value,
        id_pac_cir:form.id_pac_cir.value,
        cod_tc_cir:form.cod_tc_cir.value,
        recursos_cir:form.recursos_cir.value,
        qtde_rec_cir:form.qtde_rec_cir.value,
        horario_cir:form.horario_cir.value,
        data_cir:form.data_cir.value
    }
    $.ajax({
        url:'/listaCirurgias/editarCirurgia/salva',
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
                    url:'/listaCirurgias/editarCirurgia?id=' + id,
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
                        exibeCirurgia(dados.data);
                    }
                });
            }
        }
    });
}