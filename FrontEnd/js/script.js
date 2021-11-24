// Função para exibir perfil do usuário
function carregarLogin(){

    // Exibe perfil de uma instituição
    if (usuario[0].razao_social != null){
        var lista_dados = ['<b>Razão Social: </b>' + usuario[0].razao_social, '<b>Cidade/Estado: </b>' + usuario[0].cidade + " / " + usuario[0].estado.toUpperCase(),  
        '<b>Endereço: </b>'+usuario[0].endereco,'<b>CEP: </b>'+ usuario[0].cep,'<b>Telefone: </b>'+ usuario[0].telefone,'<b>E-Mail: </b>'+ usuario[0].email,
        '<b>Data Fundação: </b>'+ usuario[0].data_surgimento, '<b>Tipo da Instituição: </b>'+usuario[0].tipo_instituicao];
        var linha = '<h1>' + usuario[0].nome_fantasia + '</h1>';

        for (var i in lista_dados) {
            let lin = '<span class="elementos_perfil">' + lista_dados[i] + '</span>';
            linha = linha + lin
        };

    // Exibe perfil de um médico
    } else if (usuario[0].nome_medico != null){
        var lista_dados = ['<b>Especialidade: </b>' + usuario[0].especialidade, '<b>Cidade/Estado: </b>' + usuario[0].cidade + " / " + usuario[0].estado.toUpperCase(),  
        '<b>Sexo: </b>'+usuario[0].sexo_medico,'<b>CNPJ da Instituição: </b>'+ usuario[0].cnpj_instituicao,'<b>Telefone: </b>'+ usuario[0].telefone,
        '<b>E-Mail: </b>'+ usuario[0].email, '<b>Status: </b>'+usuario[0].status_medico];
        var linha = '<h1>' + usuario[0].nome_medico + '</h1>';

        for (var i in lista_dados) {
            let lin = '<span class="elementos_perfil">' + lista_dados[i] + '</span>';
            linha = linha + lin
        };
    
    // Exibe perfil de um paciente
    } else {
        var lista_dados = ['<b>Cidade/Estado: </b>' + usuario[0].cidade + " / " + usuario[0].estado.toUpperCase(),  
        '<b>Sexo: </b>'+usuario[0].sexo,'<b>Telefone: </b>'+ usuario[0].telefone,
        '<b>E-Mail: </b>'+ usuario[0].email, '<b>Alergias: </b>'+usuario[0].alergias];
        var linha = '<h1>' + usuario[0].nome_completo + '</h1>';

        for (var i in lista_dados) {
            let lin = '<span class="elementos_perfil">' + lista_dados[i] + '</span>';
            linha = linha + lin
        };
    } 

    $("#inf_usuario").append(linha);

    if (sessionStorage.perfil == id_usuario){
        $("#inf_usuario").append('<p>Você é você :)</p>')
    };
};


function coletarDados(){
    url = window.location.href;

    id_usuario = url.split("?").pop();

    $.ajax({
        url: 'http://localhost:5000/coletarDados/'+id_usuario,
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: exibirUsuario, // chama a função exibirUsuario para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });
};

$( document ).ready(function() {

    // definindo uma constante com o formulário e informando que a função deve ser ativada ao usuário apertar no botão submit
    const formCadastro = document.getElementById('form_cadastro');
    
    if (formCadastro != null){
        formCadastro.addEventListener('submit', logSubmit);
    }

    // Função para recolher os dados do formulário e enviar ao backend para efetuar o cadastro.
    function logSubmit(event){
        var pessoa_cadastro = 0
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
        if (document.getElementById("campoRazaoSocial") != null) {
            razao_social = $("#campoRazaoSocial").val();
            nome_fantasia = $("#campoNomeFantasia").val();
            tipo_instituicao = $("#campoTipoInstituicao").val();
            numero_funcionarios = $("#campoNumeroFuncionarios").val();
            cnpj = $("#campoCNPJ").val();
            let dadosInstituicao = {nome_fantasia: nome_fantasia, 
            razao_social: razao_social, numero_funcionarios: numero_funcionarios,
            tipo_instituicao: tipo_instituicao, cnpj: cnpj};
            var dados = Object.assign({}, dadosGerais, dadosInstituicao); 
            dados = JSON.stringify(dados);
            pessoa_cadastro = 1

        // Se for médico
        } else if (document.getElementById("campoEspecialidade") != null) {
            console.log('medico')
            nome_medico = $("#campoNomeCompleto").val();
            especialidade= $("#campoEspecialidade").val();
            cpf_medico = $("#campoCPF").val();
            sexo_medico = $("input[name='flexRadioDefault sexo']:checked").val();
            cnpj_instituicao = $("#campoCNPJ").val();
            status_medico = $("#campoStatus").val();
            let dadosMedico = {nome_medico: nome_medico, especialidade: especialidade,
            cpf_medico: cpf_medico, sexo_medico: sexo_medico, 
            cnpj_instituicao: cnpj_instituicao, status_medico: status_medico}
            var dados = Object.assign({}, dadosGerais, dadosMedico);
            dados = JSON.stringify(dados);
            pessoa_cadastro = 2
        
        // Se for paciente
        } else {
            console.log('paciente')
            nome_completo = $("#campoNomeCompleto").val();
            sexo = $("input[name='flexRadioDefault sexo']:checked").val();
            cpf = $("#campoCPF").val();
            alergias = $("#campoAlergia").val();
            let dadosPaciente = {nome_completo: nome_completo,
            sexo: sexo, cpf: cpf, alergias: alergias};
            var dados = Object.assign({}, dadosGerais, dadosPaciente);
            dados = JSON.stringify(dados);
            pessoa_cadastro = 3
        }

        // preparar os dados recebidos para o formato json
        $.ajax({ 
            url: 'http://localhost:5000/incluir_usuario/'+pessoa_cadastro, 
            type: 'POST', 
            dataType: 'json', // os dados são recebidos no formato json 
            contentType: 'application/json', // tipo dos dados enviados 
            data: dados, // estes são os dados enviados 
            success: pessoaIncluida, // chama a função listar para processar o resultado 
            error: erroAoIncluir
        })
        

    };

    function pessoaIncluida (retorno) { 
        if (retorno.resultado == "ok") {
            alert("Pessoa incluída com sucesso!"); 
            $("#campoSurgimento").val("");
            $("#campoEstado").val("");
            $("#campoCidade").val("");
            $("#campoEndereco").val("");
            $("#campoComplemento").val("");
            $("#campoCEP").val("");
            $("#campoSenha").val("");
            $("#campoConfirmarSenha").val("");
            $("#campoEmail").val("");
            $("#campoConfirmarEmail").val("");
            $("#campoTelefone").val("");

            if ($("#campoRazaoSocial").val() != null) {
                $("#campoRazaoSocial").val("");
                $("#campoNomeFantasia").val("");
                $("#campoTipoInstituicao").val("");
                $("#campoNumeroFuncionarios").val("");
                $("#campoCNPJ").val("");
            } else if ($("#campoEspecialidade").val() != null) {
                $("#campoNomeCompleto").val("");
                $("#campoEspecialidade").val("");
                $("#campoCPF").val("");
                $("#campoCNPJ").val("");
                $("#campoStatus").val("");
            } else {
                $("#campoNomeCompleto").val("");
                $("#campoCPF").val("");
                $("#campoAlergia").val("");
            }

        } else {
            alert(retorno.resultado + ": " + retorno.detalhes); 
        } 
    } 

    function erroAoIncluir (retorno) { 
        alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes); 
    }
    // --------------------------------

    // função para pegar os dados de login e enviar para o backend para validação
    $("#enviarLogin").click(function(){
        emailLogin = $("#campoEmail").val();
        senhaLogin = $("#campoSenha").val();
        listaLogin = {email: emailLogin, senha: senhaLogin};
        listaLogin = JSON.stringify(listaLogin);
        
        $.ajax({ 
            url: 'http://localhost:5000/validar_login', 
            type: 'POST', 
            dataType: 'json', // os dados são recebidos no formato json 
            contentType: 'application/json', // tipo dos dados enviados 
            data: listaLogin, // estes são os dados enviados 
            success: loginCorreto, // chama a função listar para processar o resultado 
            error: loginIncorreto
        });
    });

    function loginCorreto (retorno) {
        if (retorno == 0){
            alert("Dados incorretos")
        } else {
            alert("Dados corretos, redirecionando para o perfil")

            sessionStorage.setItem('perfil',retorno);

            window.location.href = 'perfil_usuario.html?' + retorno;
        }
    }

    function loginIncorreto (retorno) {
        alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
    }
    // --------------------------------

    // função que detecta clique no botão excluir e chama função do backend
    $("#botaoExcluir").click(function(){
        url = window.location.href;

        id_usuario = url.split("?").pop();
        
        $.ajax({
            url: 'http://localhost:5000/excluir_usuario/'+id_usuario,
            method: 'DELETE',
            dataType: 'json', // os dados são recebidos no formato json
            success: usuarioExcluido, // chama a função exibirUsuario para processar o resultado
            error: function() {
                alert("erro ao excluir, verifique o backend");
            }
        });
    });
    function usuarioExcluido(retorno) {
        if (retorno.resultado == "ok") {
            // Se o deu certo, avisa o usuario e redireciona para o home
            alert("Usuario excluido");
            window.location.href = 'login_geral.html';
        } else {
            // Se deu errado, exibe o erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }
    // --------------------------------

    // função que detecta clique no botão alterar e chama função do backend
    $("#botaoAtualizar").click(function(){
        url = window.location.href;

        id_usuario = url.split("?").pop();



        $.ajax({
            url: 'http://localhost:5000/alterar_usuario',
            method: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            success: dadosAlterados, // chama a função exibirUsuario para processar o resultado
            error: function() {
                alert("erro ao excluir, verifique o backend");
            }
        });
    });

    function dadosAlterados(retorno){
        if (retorno.resultado == "ok"){
            // Se os dados foram alterados com sucesso, avisa o usuario. 
            alert("Dados alterados com sucesso")
            location.reload()
        } else {
            // Se deu errado, exibe o erro
            alert(retorno.resultado + ":" + retorno.detalhes)
        }
    }
    // --------------------------------

});