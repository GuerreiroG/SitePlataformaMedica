$( document ).ready(function() {
    
    $("#listar").click(function(){
        let id_usuario = 1;

        $.ajax({
            url: 'http://localhost:5000/exibir_usuario/'+id_usuario,
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: exibir_usuario, // chama a função exibir_usuario para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function exibir_usuario(usuario) {
            
            console.log('oi');
            
            // montar uma linha da tabela de usuarios
            lin = usuario.cep;

            console.log(usuario[0].cep);

            // colocar as linhas na tabela
            $("#dados").append(lin);

            }
    });

    $("#enviar").click(function(){
        // pegar os dados do formulario
        nome = $("#campoNomeFantasia").val();
        email = $("#campoEmail").val();
        tel = $("#campoTelefone").val();
  
        // preparar os dados recebidos para o formato json
        var dados = JSON.stringify({ nome_fantasia: nome, email: email, telefone: tel }); 
        $.ajax({ 
            url: 'http://localhost:5000/incluir_instituicao', 
            type: 'POST', 
            dataType: 'json', // os dados são recebidos no formato json 
            contentType: 'application/json', // tipo dos dados enviados 
            data: dados, // estes são os dados enviados 
            success: pessoaIncluida, // chama a função listar para processar o resultado 
            error: erroAoIncluir
        })
    });

    function pessoaIncluida (retorno) { 
        if (retorno.resultado == "ok") {
            alert("Pessoa incluída com sucesso!"); 
            $("#campoNomeFantasia").val(""); 
            $("#campoEmail").val(""); 
            $("#campoTelefone").val(""); 
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes); 
        } 
    } 

    function erroAoIncluir (retorno) { 
        alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes); 
    }

});