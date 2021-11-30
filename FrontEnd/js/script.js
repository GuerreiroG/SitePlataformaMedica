// Função para exibir perfil do usuário
function carregarLogin(){

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

    function exibirUsuario(usuario){
        // Exibe perfil de uma instituição
        if (usuario[0].razao_social != null){
            var linha = '<h1>' + usuario[0].nome_fantasia + '</h1>';
            var lista_dados = ['<b>Razão Social: </b>' + usuario[0].razao_social, '<b>Cidade/Estado: </b>' + usuario[0].cidade + " / " + usuario[0].estado.toUpperCase(),  
            '<b>Endereço: </b>'+usuario[0].endereco,'<b>CEP: </b>'+ usuario[0].cep,'<b>Telefone: </b>'+ usuario[0].telefone,'<b>E-Mail: </b>'+ usuario[0].email,
            '<b>Data Fundação: </b>'+ usuario[0].data_surgimento, '<b>Tipo da Instituição: </b>'+usuario[0].tipo_instituicao];
            
        // Exibe perfil de um médico
        } else if (usuario[0].nome_medico != null){
            var linha = '<h1>' + usuario[0].nome_medico + '</h1>';
            var lista_dados = ['<b>Especialidade: </b>' + usuario[0].especialidade, '<b>Cidade/Estado: </b>' + usuario[0].cidade + " / " + usuario[0].estado.toUpperCase(),  
            '<b>Sexo: </b>'+usuario[0].sexo_medico,'<b>CNPJ da Instituição: </b>'+ usuario[0].cnpj_instituicao,'<b>Telefone: </b>'+ usuario[0].telefone,
            '<b>E-Mail: </b>'+ usuario[0].email, '<b>Status: </b>'+usuario[0].status_medico];
            
        // Exibe perfil de um paciente
        } else {
            var linha = '<h1>' + usuario[0].nome_completo + '</h1>';
            var lista_dados = ['<b>Cidade/Estado: </b>' + usuario[0].cidade + " / " + usuario[0].estado.toUpperCase(),  
            '<b>Sexo: </b>'+usuario[0].sexo,'<b>Telefone: </b>'+ usuario[0].telefone,
            '<b>E-Mail: </b>'+ usuario[0].email, '<b>Alergias: </b>'+usuario[0].alergias];
        } 

        for (var i in lista_dados) {
            let lin = '<span class="elementos_perfil">' + lista_dados[i] + '</span>';
            linha = linha + lin
        };

        $("#inf_usuario").append(linha);

        if (sessionStorage.perfil[0] == id_usuario){
            $("#perfil_buttons").append('<button type="button" id="botaoAtualizar" class="btn btn-warning btn-lg">Alterar Dados</button>')
            $("#perfil_buttons").append('<button type="button" id="botaoDesconectar" class="btn btn-info btn-lg">Desconectar</button>')
            $("#perfil_buttons").append('<button type="button" id="botaoExcluir" class="btn btn-danger btn-lg">Excluir Perfil</button>')

        };
    };
};

//Função que preparar os valores padrões da página atualizar
function carregarDadosAtualizar(){
    return
}

$( document ).ready(function() {

    // definindo uma constante com o formulário e informando que a função deve ser ativada ao usuário apertar no botão submit
    const formCadastro = document.getElementById('form_cadastro');
    const formAtualizar = document.getElementById('form_atualizar')
    
    if (formCadastro != null){
        formCadastro.addEventListener('submit', logSubmit);
    }

    if (formAtualizar != null){
        formAtualizar.addEventListener('submit', enviarAtualizacoes);
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

    // Se o login estiver correto. Adiciona uma SESSÃO e redireciona para o perfil
    function loginCorreto (retorno) {
        if (retorno == 0){
            alert("Dados incorretos")
        } else {
            alert("Dados corretos, redirecionando para o perfil")
            sessionStorage.setItem('perfil',retorno);
            window.location.href = 'perfil_usuario.html?' + retorno[0];
        }
    }

    function loginIncorreto (retorno) {
        alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
    }
    // --------------------------------

    // função que detecta clique no botão excluir e chama função do backend
    $(document).on("click", "#botaoExcluir", function(){
        url = window.location.href;

        id_usuario = url.split("?").pop();
        
        $.ajax({
            url: 'http://localhost:5000/excluir_usuario/'+sessionStorage.perfil[0],
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

    // REDIRECIONA para a tela de alteração de dados
    $(document).on("click", "#botaoAtualizar", function(){

        listaSession = sessionStorage.perfil.split(",");
        window.location.href = 'atualizar_'+listaSession[1]+'.html';
    });
    // --------------------------------


    // função que detecta clique no botão alterar e ENVIA dados ao backend
    function enviarAtualizacoes(event){
        // recolhe os dados gerais
        estado = $("#campoEstado").val();
        cidade = $("#campoCidade").val();
        endereco = $("#campoEndereco").val();
        complemento = $("#campoComplemento").val();
        cep = $("#campoCEP").val();
        senha = $("#campoSenha").val();
        senha_confirm = $("#campoConfirmarSenha").val();
        tel = $("#campoTelefone").val();
        var dadosGerais = {id: sessionStorage.perfil[0], estado: estado, cidade: cidade, 
        endereco: endereco, complemento: complemento, cep: cep, telefone: tel, senha: senha}; 
        alert(sessionStorage.perfil[0])

        // se for instituicao
        if (sessionStorage.perfil[2] == "i"){
            numero_funcionarios = $("#campoNumeroFuncionarios").val();
            let dadosInstituicao = {numero_funcionarios:numero_funcionarios};
            var dados = Object.assign({}, dadosGerais, dadosInstituicao);
    
        // se for paciente
        } else if (sessionStorage.perfil[2] == "p") {
            alergias = $("#campoAlergia").val();
            let dadosPaciente = {alergias: alergias};
            var dados = Object.assign({}, dadosGerais, dadosPaciente);

        // se for medico
        } else {
            status_medico = $("#campoStatus").val();
            especialidade = $("#campoEspecialidade").val();
            let dadosMedico = {status_medico: status_medico, especialidade: especialidade};
            var dados = Object.assign({}, dadosGerais, dadosMedico)
        }

        dados = JSON.stringify(dados);

        $.ajax({
            url: 'http://localhost:5000/atualizar_usuario',
            method: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados 
            data: dados, // estes são os dados enviados 
            success: dadosAlterados, // chama a função exibirUsuario para processar o resultado
            error: function() {
                alert("erro ao alterar, verifique o backend");
            }
        });
    };

    function dadosAlterados(retorno){
        if (retorno.resultado == "ok"){
            // Se os dados foram alterados com sucesso, avisa o usuario. 
            alert("Dados alterados com sucesso")
            window.location.href = 'perfil_usuario.html?' + sessionStorage.perfil[0];
        } else {
            // Se deu errado, exibe o erro
            alert(retorno.resultado + ":" + retorno.detalhes)
        }
    }
    // --------------------------------


});