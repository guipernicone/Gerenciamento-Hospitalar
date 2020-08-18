function exibeMateriais(materiais){
    var x;
    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    //console.log(materiais);
    for(x in materiais){
        var material = materiais[x];
        console.log(material);
        console.log(material.recursos);
        var recurso 
        recurso = "'"+material.recursos+"'";
        console.log(recurso);
        dadosMaterial = '<div id= ' + material.recursos + ' class="lista">' +
        'Recurso : ' + material.recursos +
        '<br>Quantidade Atual: ' + material.quantidade +
        '<br>Quantidade Minima : ' + material.quantidade_minima +
        '<br> <a href="#" onClick="editMaterial(' + recurso + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaMaterial(' + recurso  +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';
        console.log(material.recursos);
        console.log(dadosMaterial);
        document.getElementById('result').innerHTML += dadosMaterial;
        
    }
}

function exibeMaterial(materiais){
    var x;
    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    //console.log(materiais);
    for(x in materiais){
        var material = materiais[x];
        console.log(material);
        console.log(material.recursos);
        var recurso = "'"+material.recursos+"'";
        console.log(recurso);
        dadosMaterial =
        'Recurso : ' + material.recursos +
        '<br>Quantidade Atual: ' + material.quantidade +
        '<br>Quantidade Minima : ' + material.quantidade_minima +
        '<br> <a href="#" onClick="editMaterial(' + recurso + ')"><img src="img/edit.jpg" alt="edit"></a>'+
        '<a href="#" onClick="deletaMaterial(' + recurso  +');"><img src="img/delete.png" alt="delete"></a>'
        console.log(material.recursos);
        console.log(dadosMaterial);
        document.getElementById(material.recursos).innerHTML = dadosMaterial;
        
    }
}

function deletaMaterial(id){
    console.log(id);
        $.ajax({
            url:'/listaMaterial/deleta?id='+id,
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

function editMaterial(id){

    $.ajax({
        url:'/listaMaterial/editarMaterial?id=' + id,
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
            "<label>"+ id +"</label><br>" +
            "<label>Quantidade Atual</label><br>" +
            "<input name='quantidade' class='inputText' type='text' required>" +
            "<label>Quantidade minima no estoque</label><br>" +
            "<input name='quantidade_minima' class='inputText' type='text' required>" +
            "<button type='button' class='botao' onClick='salvarMaterial(" + id +")'>Editar</button>" +
            "</form>";
            document.getElementById(dados.data[0].recursos).innerHTML = form;
            var aux = document.getElementById('editar_'+id);
            aux.quantidade.value = dados.data[0].quantidade;
            aux.quantidade_minima.value = dados.data[0].quantidade_minima;
        
            //http://localhost:3000/listaMedico?nome_med=rafa&nome2_med=rafa2&nome3_med=rafa3#


        }
    });
}

function salvarMaterial(id){
    console.log(id);
    var form = document.getElementById('editar_'+id);
    var input ={
        recursos :id,
        quantidade:form.quantidade.value,
        quantidade_minima:form.quantidade_minima.value
    }
    $.ajax({
        url:'/listaMeterial/editarMaterial/salva',
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
                    url:'/listaMaterial/editarMaterial?id=' + id,
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
                        exibeMaterial(dados.data);
                    }
                });
            }
        }
    });
}