$( document ).ready(function() {
    
    $("#listar").click(function(){
        
        $.ajax({
            url: 'http://localhost:5000/listar_usuarios',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_usuarios, // chama a função listar_usuarios para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar_usuarios(usuarios) {
        
            // percorrer as usuarios retornadas em json
            for (var i in usuarios) {

              // montar uma linha da tabela de usuarios
              lin =  usuarios[i].email + ", " + 
                usuarios[i].telefone + ", " +
                usuarios[i].endereco + "<br>";

                // colocar as linhas na tabela
                $("#dados").append(lin);
            }
            
        }

    });

  });
$( document ).on("click", "enviar"), function() {
    // pegar os dados do formulario
    nome = $("#campoNomeFantasia").val();
    email = $("#campoEmail").val();
    tel = $("#campoTelefone").val();
    // preparar os dados recebidos para o formato json
    var dados = JSON.stringify({ nome: nome, email: email, telefone: tel }); 
    $.ajax({ 
        url: 'http://localhost:5000/incluir_pessoa', 
        type: 'POST', 
        dataType: 'json', // os dados são recebidos no formato json 
        contentType: 'application/json', // tipo dos dados enviados 
        data: dados, // estes são os dados enviados 
        success: pessoaIncluida, // chama a função listar para processar o resultado 
        error: erroAoIncluir 
}
function pessoaIncluida (retorno) { 
    if (retorno.resultado == "ok") {
        alert("Pessoa incluída com sucesso!"); 
        $("#campoNome").val(""); 
        $("#campoEmail").val(""); 
        $("#campoTelefone").val(""); 
    } else {
        alert(retorno.resultado + ":" + retorno.detalhes); 
    } 
} 
function erroAoIncluir (retorno) { 
    alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes); 
}