"""Este módulo contém o backend

Autor: Gustavo Guerreiro, Johannes Wachholz José e Lucas Vargas 
"""

from config import *
from model import Usuario
from instituicao import Instituicao
from medico import Medico
from paciente import Paciente


@app.route("/")
def padrao():
    return "backend operante"


# no CMD, curl localhost:5000/listar_usuarios para testar
@app.route("/listar_usuarios")
def listar_usuarios():
	usuarios = db.session.query(Usuario).all()
	retorno = []
	for p in usuarios:
		retorno.append(p.json())
	resposta = jsonify(retorno)
	resposta.headers.add("Access-Control-Allow-Origin", "*")
	return resposta

#Função que pega as informações do usuário para exibir no perfil
@app.route("/exibirUsuario/<int:usuario_id>")
def exibir_usuario(usuario_id):
    usuarios = db.session.query(Usuario).filter(Usuario.id == usuario_id)
    retorno = []
    retorno.append(usuarios[0].json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

#teste da rota: curl -d '{"nome_fantasia":"John", "email":"jakirk@gmail.com", "telefone":"92212-1212"}' -X POST -H "Content-Type:application/json" localhost:5000/incluir_instituicao
#Função para incluir um usuário no banco de dados.
@app.route("/incluir_usuario/<int:pessoa_cadastro>", methods=['post'])
def incluir_instituicao(pessoa_cadastro):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      if pessoa_cadastro == 1:
        nova = Instituicao(**dados) 
      elif pessoa_cadastro == 2:
        nova = Medico(**dados)
      else:
        nova = Paciente(**dados)
      db.create_all() # cria as tabelas se não existirem
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

#Função para validar os dados de login
@app.route("/validar_login", methods=['post'])
def validar_login():
  dados = request.get_json()
  retorno = []
  usuario = db.session.query(Usuario).filter(Usuario.email==dados["email"]).first()
  if usuario == None:
    retorno.append(0)
  elif usuario.senha == dados["senha"]:
    retorno.append(usuario.id)
  else:
    retorno.append(0)
  resposta = jsonify(retorno)
  resposta.headers.add("Access-Control-Allow-Origin", "*")
  return resposta
    

# curl -X DELETE http://localhost:5000/excluir_pessoa/1
# Função para excluir um usuário do Banco de Dados.
@app.route("/excluir_usuario/<int:usuario_id>", methods=['DELETE'])
def excluir_usuario(usuario_id):
  # prepara uma resposta
  resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
  try:
    # excluir o usuário do ID informado
    Usuario.query.filter(Usuario.id == usuario_id).delete()
    # confimar a exclusão
    db.session.commit()
  except Exception as e:
    # informar mensagem de erro
    resposta = jsonify({"resultado": "erro", "detalhes":str(e)})
  resposta.headers.add("Access-Control-Allow-Origin", "*")  
  return resposta
  


# faz com que renicie toda vez que salvar.
app.run(debug=True)
