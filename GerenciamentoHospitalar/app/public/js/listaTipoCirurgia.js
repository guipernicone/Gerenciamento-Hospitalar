function exibeTipos(tipos){
    var x;
    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    //console.log(materiais);
    for(x in tipos){
        var tipo = tipos[x];
   
        dadosTipo = '<div id= ' + tipo.cod_tc + ' class="lista">' +
        'Cod : ' + tipo.cod_tc +
        '<br>Tipo de Cirurgia : ' + tipo.nome_tc +
        '<br> <a href="#" onClick="editTipoCirurgia(' + tipo.cod_tc + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaTipo(' + tipo.cod_tc  +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';
        console.log(dadosTipo);
        document.getElementById('result').innerHTML += dadosTipo;
        
    }
}

function exibeTipo(tipos){
    var x;
    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    //console.log(materiais);
    for(x in tipos){
        var tipo = tipos[x];
   
        dadosTipo =
        'Cod : ' + tipo.cod_tc +
        '<br>Tipo de Cirurgia : ' + tipo.nome_tc +
        '<br> <a href="#" onClick="editTipoCirurgia(' + tipo.cod_tc + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaTipo(' + tipo.cod_tc  +');"><img src="img/delete.png" alt="delete"></a>'
        console.log(dadosTipo);
        document.getElementById(tipo.cod_tc).innerHTML = dadosTipo;
        
    }
}

function deletaTipo(id){;
        $.ajax({
            url:'/listaTipoCirurgias/deleta?id='+id,
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
                    console.log(divId);
                    divResult.removeChild(divId);
            
                }
            }
        });
}
function editTipoCirurgia(id){

    $.ajax({
        url:'/listaTipoCirurgia/editarTipoCirurgia?id=' + id,
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
            "<label>Nome da Cirurgia</label><br>" +
            "<input name='nome_tc' class='inputText' type='text' required>" +
            "<button type='button' class='botao' onClick='salvarTipo("+ id +")'>Editar</button>" +
            "</form>";
            document.getElementById(dados.data[0].cod_tc).innerHTML = form;
            var aux = document.getElementById('editar_'+id);
            aux.nome_tc.value = dados.data[0].nome_tc;
            
            //http://localhost:3000/listaMedico?nome_med=rafa&nome2_med=rafa2&nome3_med=rafa3#


        }
    });
}

function salvarTipo(id){
    console.log(id);
    var form = document.getElementById('editar_'+id);
    var input ={
        cod_tc :id,
        nome_tc:form.nome_tc.value
    }
    $.ajax({
        url:'/listaTipoCirurgia/editarTipoCirurgia/salva',
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
                    url:'/listaTipoCirurgia/editarTipoCirurgia?id=' + id,
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
                        exibeTipo(dados.data);
                    }
                });
            }
        }
    });
}