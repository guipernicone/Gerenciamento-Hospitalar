function exibePacientes(pacientes){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in pacientes){
        var paciente = pacientes[x];
        console.log(paciente);
        console.log(paciente.id_med);

        dadosPaciente = '<div id= ' + paciente.id_pac + ' class="lista">' +
        'ID : ' + paciente.id_pac +
        '<br>Nome : ' + paciente.nome_pac +
        '<br>Idade : ' + paciente.idade +
        '<br>Sexo : ' + paciente.sexo +
        '<br>RG : ' + paciente.rg_pac +
        '<br>CPF : ' + paciente.cpf_pac +
        '<br>Telefone : ' + paciente.telefone_pac +
        '<br>Endereço : ' + paciente.endereco_pac +
        '<br>Quadro Hospitalar: ' + paciente.quadro_hospilar_pac +
        '<br>Convenio: ' + paciente.convenio_pac +
        '<br> <a href="#" onClick="editPaciente(' + paciente.id_pac + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaPaciente(' + paciente.id_pac +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';

        document.getElementById('result').innerHTML += dadosPaciente;
        
    }
}

function exibePaciente(pacientes){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in pacientes){
        var paciente = pacientes[x];
        console.log(paciente);
        console.log(paciente.id_pac);

        dadosPaciente =
        'ID : ' + paciente.id_pac +
        '<br>Nome : ' + paciente.nome_pac +
        '<br>Idade : ' + paciente.idade +
        '<br>Sexo : ' + paciente.sexo +
        '<br>RG : ' + paciente.rg_pac +
        '<br>CPF : ' + paciente.cpf_pac +
        '<br>Telefone : ' + paciente.telefone_pac +
        '<br>Endereço : ' + paciente.endereco_pac +
        '<br>Quadro Hospitalar: ' + paciente.quadro_hospilar_pac +
        '<br>Convenio: ' + paciente.convenio_pac +
        '<br> <a href="#" onClick="editPaciente(' + paciente.id_pac + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaPaciente(' + paciente.id_pac +');"><img src="img/delete.png" alt="delete"></a>';

        document.getElementById(paciente.id_pac).innerHTML = dadosPaciente;
        
    }
}
function deletaPaciente(id){
        $.ajax({
            url:'/listaPaciente/deleta?id='+id,
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

function editPaciente(id){

    $.ajax({
        url:'/listaPaciente/editarPaciente?id=' + id,
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
            "<input name='nome_pac' class='inputText' type='text' required><br>" +
            "<label>Idade</label><br>" +
            "<input name='idade' class='inputText' type='number' required><br>" +
            "<label>Sexo</label><br>" +
            "<select name='sexo' require> <option style='display:none;' >Selecione seu sexo</option><option >Masculino</option><option >Feminino</option><option >Outro</option></select><br>" +
            "<label>Quadro Hospitalar</label><br>" +
            "<input name='quadro_hospilar_pac' class='inputText' type='text' required><br>" +
            "<label>RG</label><br>" +
            "<input name='rg_pac' class='inputText' type='text' required><br>" +
            "<label>CPF</label><br>" +
            "<input name='cpf_pac' class='inputText' type='text' required><br>" +
            "<label>Telefone</label><br>" +
            "<input name='telefone_pac' class='inputText' type='text' required><br>" +
            "<label>Endereço</label><br>" +
            "<input name='endereco_pac' class='inputText' type='text' required><br>" +
            "<label>Convênio</label><br>" +
            "<input name='convenio_pac' class='inputText' type='text' required>" +
            "<button type='button' class='botao' onClick='salvarPaciente("+ id +")'>Editar</button>" +
            "</form>";
            document.getElementById(dados.data[0].id_pac).innerHTML = form;
            var aux = document.getElementById('editar_'+id);
            aux.nome_pac.value = dados.data[0].nome_pac;
            aux.idade.value = dados.data[0].idade;
            aux.sexo.value = dados.data[0].sexo;
            aux.quadro_hospilar_pac.value = dados.data[0].quadro_hospilar_pac;
            aux.rg_pac.value = dados.data[0].rg_pac;
            aux.cpf_pac.value = dados.data[0].cpf_pac;
            aux.telefone_pac.value = dados.data[0].telefone_pac;
            aux.endereco_pac.value = dados.data[0].endereco_pac;
            aux.convenio_pac.value = dados.data[0].convenio_pac;

            //http://localhost:3000/listaMedico?nome_med=rafa&nome2_med=rafa2&nome3_med=rafa3#


        }
    });
}

function salvarPaciente(id){
    var form = document.getElementById('editar_'+id);
    console.log(form.nome_pac.value);
    var input ={
        id_pac :id,
        nome_pac:form.nome_pac.value,
        idade : form.idade.value,
        sexo:form.sexo.value,
        quadro_hospilar_pac:form.quadro_hospilar_pac.value,
        endereco_pac:form.endereco_pac.value,
        rg_pac:form.rg_pac.value,
        cpf_pac:form.cpf_pac.value,
        telefone_pac:form.telefone_pac.value,
        convenio_pac:form.convenio_pac.value,
    }
    $.ajax({
        url:'/listaPaciente/editarPaciente/salva',
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
                    url:'/listaPaciente/editarPaciente?id=' + id,
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
                        exibePaciente(dados.data);
                    }
                });
            }
        }
    });
}