from flask import Flask, jsonify #Sera usado para a integração web=BD
from flask_sqlalchemy import SQLAlchemy # Importando framework
import os #Para usar o path

#vínculo com flask
app = Flask(__name__) 

#pega o NOME do diretório do arquivo em si (config)
path = os.path.dirname(os.path.abspath(__file__)) 

#concatena o caminho de cima com o nome do arquivo de banco de dados
# caminho do arquivo config + nome arquivo bd
arquivobd = os.path.join(path, 'testemodelo.db')

#diz onde o banco de dado vai ser criado
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
#para remover alguns erros
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#vínculo que sera utilizado para a criação da classe
db = SQLAlchemy(app) 

