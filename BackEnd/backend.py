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

# no CMD, curl localhost:5000/listar_usuarios para testar

# faz com que renicie toda vez que salvar.
app.run(debug = True)