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