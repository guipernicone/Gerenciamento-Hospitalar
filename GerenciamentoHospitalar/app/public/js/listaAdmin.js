function exibeUsuarios(usuarios){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */

    for(x in usuarios){
        var usuario = usuarios[x];
        dadosUser = '<tr id= ' + usuario.id_user + ' class="lista">' +
        '<td>' + usuario.id_user + '</td>' +
        '<td>' + usuario.nome_user + '</td>' +
        '<td>' + usuario.email_user + '</td>' +
        '<td>' + usuario.senha_user + '</td>' +
        '<td><label id="nivel_'+ x +'"><label>'+ '</td>' +
        '</tr>';

        document.getElementById('result').innerHTML += dadosUser;
    }
    $.ajax({
        url:'/listaAdmin/nivel',
        dataType: 'json',
        error:function(dados){
            alert('Erro: '+dados.data);
        },
        success:function(dados){
            if(dados.status === 'ERRO')
                alert('Erro: '+dados.data);
            else{
                console.log(usuario.id_user);

                setNivel(dados.data,usuarios)
             
            }
           
        }
    });
}
function deletaUsuario(id){
    $.ajax({
        url:'/listaAdmin/deleta?id='+id,
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

function setNivel(dados, usuarios){
    var x;
    console.log(dados);
    for(x in usuarios){
        usuario = usuarios[x];

        var nivel = document.getElementById("nivel_"+ x);

        nivel.innerHTML = '<td>'+dados[usuario.id_nivel_user-1].nome_nivel+'</td>' +
            '<td><a href="#" onClick="deletaUsuario(' + usuario.id_user +');">&nbsp &nbsp &nbsp &nbsp <img src="img/delete.png" alt="delete"></a> </td>';
    }
}