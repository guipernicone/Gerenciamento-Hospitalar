function exibeEnfermeiras(enfermeiras){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in enfermeiras){
        var enfermeira = enfermeiras[x];
        console.log(enfermeira);
        console.log(enfermeira.id_enf);

        dadosEnfermeira = '<div id= ' + enfermeira.id_enf + ' class="lista" >' +
        'ID : ' + enfermeira.id_enf +
        '<br>Nome : ' + enfermeira.nome_enf +
        '<br>RG : ' + enfermeira.rg_enf +
        '<br>CPF : ' + enfermeira.cpf_enf +
        '<br>Telefone : ' + enfermeira.telefone_enf +
        '<br>Endereço : ' + enfermeira.endereco_enf +
        '<br>Horario de entrada : ' + enfermeira.hora_de_entrada_enf +
        '<br>Horario de saida : ' + enfermeira.hora_de_saida_enf +
        '<br> <a href="#" onClick="editEnfermeira(' + enfermeira.id_enf + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaEnfermeira(' + enfermeira.id_enf +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';

        document.getElementById('result').innerHTML += dadosEnfermeira;
        
    }
}

function exibeEnfermeira(enfermeiras){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in enfermeiras){
        var enfermeira = enfermeiras[x];
        console.log(enfermeira);
        console.log(enfermeira.id_enf);

        dadosEnfermeira = 
        'ID : ' + enfermeira.id_enf +
        '<br>Nome : ' + enfermeira.nome_enf +
        '<br>RG : ' + enfermeira.rg_enf +
        '<br>CPF : ' + enfermeira.cpf_enf +
        '<br>Telefone : ' + enfermeira.telefone_enf +
        '<br>Endereço : ' + enfermeira.endereco_enf +
        '<br>Horario de entrada : ' + enfermeira.hora_de_entrada_enf +
        '<br>Horario de saida : ' + enfermeira.hora_de_saida_enf +
        '<br> <a href="#" onClick="editEnfermeira(' + enfermeira.id_enf + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaEnfermeira(' + enfermeira.id_enf +');"><img src="img/delete.png" alt="delete"></a>'

        document.getElementById(enfermeira.id_enf).innerHTML = dadosEnfermeira;
        
    }
}

function deletaEnfermeira(id){
        $.ajax({
            url:'/listaEnfermeira/deleta?id='+id,
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

function editEnfermeira(id){

    $.ajax({
        url:'/listaEnfermeira/editarEnfermeira?id=' + id,
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
            "<label>Nome</label><br>" +
            "<input name='nome_enf' class='inputText' type='text' required><br>" +
            "<label>RG</label><br>" +
            "<input name='rg_enf' class='inputText' type='text' required><br>" +
            "<label>CPF</label><br>" +
            "<input name='cpf_enf' class='inputText' type='text' required><br>" +
            "<label>Telefone</label><br>" +
            "<input name='telefone_enf' class='inputText' type='text' required><br>" +
            "<label>Endereço</label><br>" +
            "<input name='endereco_enf' class='inputText' type='text' required><br>" +
            "<label>Horário de entrada do expediente</label><br>" +
            "<input name='hora_de_entrada_enf' class='inputText' type='text' required>" +
            "<label>Horário de saída do expediente</label><br>" +
            "<input name='hora_de_saida_enf' class='inputText' type='text' required>" +
            "<button type='button' class='botao'onClick='salvarEnfermeira("+ id +")'>Editar</button>" +
            "</form>";
            document.getElementById(dados.data[0].id_enf).innerHTML = form;
            var aux = document.getElementById('editar_'+id);
            aux.nome_enf.value = dados.data[0].nome_enf;
            aux.rg_enf.value = dados.data[0].rg_enf;
            aux.cpf_enf.value = dados.data[0].cpf_enf;
            aux.telefone_enf.value = dados.data[0].telefone_enf;
            aux.endereco_enf.value = dados.data[0].endereco_enf;
            aux.hora_de_entrada_enf.value = dados.data[0].hora_de_entrada_enf;
            aux.hora_de_saida_enf.value = dados.data[0].hora_de_saida_enf;

            //http://localhost:3000/listaMedico?nome_med=rafa&nome2_med=rafa2&nome3_med=rafa3#


        }
    });
}

function salvarEnfermeira(id){
    var form = document.getElementById('editar_'+id);
    console.log(form.nome_enf.value);
    var input ={
        id_enf :id,
        nome_enf:form.nome_enf.value,
        endereco_enf:form.endereco_enf.value,
        rg_enf:form.rg_enf.value,
        cpf_enf:form.cpf_enf.value,
        telefone_enf:form.telefone_enf.value,
        hora_de_entrada_enf :  form.hora_de_entrada_enf.value,
        hora_de_saida_enf : form.hora_de_saida_enf.value
    }
    $.ajax({
        url:'/listaEnfermeira/editarEnfermeira/salva',
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
                    url:'/listaEnfermeira/editarEnfermeira?id=' + id,
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
                        exibeEnfermeira(dados.data);
                    }
                });
            }
        }
    });
}