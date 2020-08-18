function exibeMedicos(medicos){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in medicos){
        var medico = medicos[x];
        //console.log(medico);
        //console.log(medico.id_med);
        //var dadosMedico = document.createElement("div");
        dadosMedico = '<div id= ' + medico.id_med + ' class="lista">' +
        'ID : ' + medico.id_med +
        '<br>Nome : ' + medico.nome_med +
        '<br>Especialização : ' + medico.especializacao_med +
        '<br>RG : ' + medico.rg_med +
        '<br>CPF : ' + medico.cpf_med +
        '<br>Telefone : ' + medico.telefone_med +
        '<br>Endereço : ' + medico.endereco_med +
        '<br>Horario de entrada : ' + medico.hora_de_entrada_med +
        '<br>Horario de saida : ' + medico.hora_de_saida_med +
        '<br> <a href="#" onClick="editMedico(' + medico.id_med + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaMedico(' + medico.id_med +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';

        document.getElementById('result').innerHTML += dadosMedico;
        //document.getElementById('result').appendChild(dadosMedico.firstChild);
    }
}

function exibeMedico(medicos){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in medicos){
        var medico = medicos[x];
        console.log(medico);
        console.log(medico.id_med);
        //var dadosMedico = document.createElement("div");
        dadosMedico =
        'ID : ' + medico.id_med +
        '<br>Nome : ' + medico.nome_med +
        '<br>Especialização : ' + medico.especializacao_med +
        '<br>RG : ' + medico.rg_med +
        '<br>CPF : ' + medico.cpf_med +
        '<br>Telefone : ' + medico.telefone_med +
        '<br>Endereço : ' + medico.endereco_med +
        '<br>Horario de entrada : ' + medico.hora_de_entrada_med +
        '<br>Horario de saida : ' + medico.hora_de_saida_med +
        '<br> <a href="#" onClick="editMedico(' + medico.id_med + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaMedico(' + medico.id_med +');"><img src="img/delete.png" alt="delete"></a>';

        document.getElementById(medico.id_med).innerHTML = dadosMedico;

    }
}

function deletaMedico(id){
        $.ajax({
            url:'/listaMedico/deleta?id='+id,
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

function editMedico(id){

     $.ajax({
        url:'/listaMedico/editarMedico?id=' + id,
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
            form = "<h3>Editar</h3><br>" +
            "<form id ='editar_"+id+"' class='form'>" +
            '<div><label>Nome do Médico</label></div>' +
            "<input name='nome_med' class='inputText' type='text' required>" +
            '<div><label>Especialização</label></div>' +
            '<input name="especializacao_med" class="inputText" type="text" required>'+
            '<div><label>RG</label></div>' +
            '<input name="rg_med" class="inputText" type="text" required>' +
            '<div><label>CPF</label></div>' +
            '<input name="cpf_med" class="inputText" type="text" required>' +
            '<div><label>Telefone</label></div>' +
            '<input name="telefone_med" class="inputText" type="text" required>' +
            '<div><label>Horário de entrada do expediente</label></div>' +
            '<input name="hora_de_entrada_med" class="inputText" type="text" required>' +
            '<div><label>Horário de saida do expediente</label></div>' +
            '<input name="hora_de_saida_med" class="inputText" type="text" required>' +
            '<div><label>Endereço</label></div>' +
            '<input name="endereco_med" class="inputText" type="text" required>' +
            
            
            "<button type='button'  class='botao' onClick='salvarMedico("+ id +")'>Editar</button>" +
            "</form>";
            document.getElementById(dados.data[0].id_med).innerHTML = form;
            var aux = document.getElementById('editar_'+id);
            aux.nome_med.value = dados.data[0].nome_med;
            aux.especializacao_med.value = dados.data[0].especializacao_med;
            aux.rg_med.value = dados.data[0].rg_med;
            aux.cpf_med.value = dados.data[0].cpf_med;
            aux.telefone_med.value = dados.data[0].telefone_med;
            aux.hora_de_entrada_med.value = dados.data[0].hora_de_entrada_med;
            aux.hora_de_saida_med.value = dados.data[0].hora_de_saida_med;
            aux.endereco_med.value = dados.data[0].endereco_med;

            //http://localhost:3000/listaMedico?nome_med=rafa&nome2_med=rafa2&nome3_med=rafa3#


        }
    });
}

function salvarMedico(id){
    var form = document.getElementById('editar_'+id);
    console.log(form.nome_med.value);
    var input ={
        id_med :id,
        nome_med:form.nome_med.value,
        especializacao_med:form.especializacao_med.value,
        endereco_med:form.endereco_med.value,
        rg_med:form.rg_med.value,
        cpf_med:form.cpf_med.value,
        telefone_med:form.telefone_med.value,
        hora_de_entrada_med:form.hora_de_entrada_med.value,
        hora_de_saida_med:form.hora_de_saida_med.value
    }
    $.ajax({
        url:'/listaMedico/editarMedico/salva',
        type:'post',
        data:input,
        error:function(dados){
            alert('1Erro: '+dados.data);
        },
        success:function(dados){
            if(dados.status === 'ERRO')
                alert('Erro: '+dados.data);
            else{
                $.ajax({
                    url:'/listaMedico/editarMedico?id=' + id,
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
                        exibeMedico(dados.data);
                    }
                });
            }
        }
    });
}