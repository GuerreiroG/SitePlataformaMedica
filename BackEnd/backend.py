from config import * 
from model import Usuario
from entidade import Entidade
from medico import Medico

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
	return resposta

#no CMD, curl localhost:5000/listar_usuarios para testar

#Isso faz o server rodar
#o debug faz com que renicie toda vez que salvar.
app.run(debug = True)