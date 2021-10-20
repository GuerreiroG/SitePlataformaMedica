"""Este módulo contém o backend

Autor: Gustavo Guerreiro, Johannes Wachholz José e Lucas Vargas 
"""

from config import *
from model import Usuario
from entidade import Entidade
from medico import Medico
from paciente import Paciente


@app.route("/")
def padrao():
    return "backend operante"


@app.route("/listar_usuarios")
def listar_usuarios():
	usuarios = db.session.query(Usuario).all()
	retorno = []
	for p in usuarios:
		retorno.append(p.json())
	resposta = jsonify(retorno)
	resposta.headers.add("Access-Control-Allow-Origin", "*")
	return resposta


@app.route("/exibir_usuario/<int:usuario_id>")
def listar_usuario(usuario_id):
    usuarios = db.session.query(Usuario).filter(Usuario.id == usuario_id)
    retorno = []
    retorno.append(usuarios[0].json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

#teste da rota: curl -d '{"nome_fantasia":"John", "email":"jakirk@gmail.com", "telefone":"92212-1212"}' -X POST -H "Content-Type:application/json" localhost:5000/incluir_instituicao
@app.route("/incluir_instituicao", methods=['post'])
def incluir_instituicao():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Entidade(**dados) # criar a nova pessoa
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!



# no CMD, curl localhost:5000/listar_usuarios para testar


# faz com que renicie toda vez que salvar.
app.run(debug=True)
