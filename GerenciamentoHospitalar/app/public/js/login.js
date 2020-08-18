function loginUsuario() {
    var form = document.formLogin;
    var input = {
        email_user: form.email_user.value,
        senha_user: form.senha_user.value
    };
    $.ajax({
        url: '/login/valida_login',
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert(dados.data);
            else {
                window.location.href = '/index';
            }
        }
    });
}