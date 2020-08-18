function exibeSala(salas){
    var x;

    /*Insere todos os dados recuperado do banco de dados na di pré-criada */
    for(x in salas){
        var sala = salas[x];
        console.log(sala);
        console.log(sala.id_sala);

        dadosSala = '<div id= ' + sala.id_sala + ' class="lista">' +
        'ID : ' + sala.id_sala +
        '<br>Numero : ' + sala.numero_sala +
        '<br>Especialização : ' + sala.especializacao +
        '<br><a href="#" onClick="deletaSala(' + sala.id_sala +');"><img src="img/delete.png" alt="delete"></a>'+
        '</div>';

        document.getElementById('result').innerHTML += dadosSala;
        
    }
}

function deletaSala(id){
        $.ajax({
            url:'/listaSala/deleta?id='+id,
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