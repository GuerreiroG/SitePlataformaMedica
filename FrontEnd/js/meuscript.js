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
            
            // montar uma linha da tabela de usuarios
            const lista_dados = [usuario[0].razao_social, usuario[0].cidade + "/" + usuario[0].estado,  
            usuario[0].endereco, usuario[0].cep, usuario[0].telefone, usuario[0].email, usuario[0].data_surgimento,
            usuario[0].tipo_instituicao];
            var linha = '<h1>' + usuario[0].nome_fantasia + '</h1>';

            for (var i in lista_dados) {
                let lin = '<span class="elementos_perfil">' + lista_dados[i] + '</span>';
                linha = linha + lin
            };

            $("#inf_instituicao").append(linha);

            }
    });

    $("#enviar").click(function(){
        // pegar os dados do formulario
        surgimento = $("#campoSurgimento").val();
        estado = $("#campoEstado").val();
        cidade = $("#campoCidade").val();
        endereco = $("#campoEndereco").val();
        complemento = $("#campoComplemento").val();
        cep = $("#campoCEP").val();
        senha = $("#campoSenha").val();
        senha_confirm = $("#campoConfirmarSenha").val();
        email = $("#campoEmail").val();
        email_confirm = $("#campoConfirmarEmail").val();
        tel = $("#campoTelefone").val();
        var dadosGerais = {estado: estado, cidade: cidade, endereco: endereco,
        complemento: complemento, cep: cep, telefone: tel, email: email, senha: senha, 
        data_surgimento: surgimento}; 

        // Se for instituicao:
        if ($("#campoRazaoSocial").val() != "") {
            razao_social = $("#campoRazaoSocial").val();
            nome_fantasia = $("#campoNomeFantasia").val();
            tipo_instituicao = $("campoTipoInstituicao").val();
            numero_funcionarios = $("campoNumeroFuncionariuos").val();
            cnpj = $("#campoCNPJ").val();
            let dadosInstituicao = JSON.stringify({nome_fantasia: nome_fantasia, 
            razao_social: razao_social, numero_funcionarios: numero_funcionarios,
            tipo_instituicao: tipo_instituicao, cnpj: cnpj});
            var dados = Object.assign({}, dadosGerais, dadosInstituicao); 

        // Se for Paciente:
        //......

        // Se for Medico:
        //......
        }
         
        // preparar os dados recebidos para o formato json
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