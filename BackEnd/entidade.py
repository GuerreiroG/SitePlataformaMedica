"""Este módulo contém a classe que representa uma entidade médica

Autor: Lucas Vargas.
"""
from config import *
from model import Usuario

class Entidade(Usuario):
    """Classe que representa uma entidade médica no site
    """
    # atributos da entidade médica
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    nome_fantasia = db.Column(db.String(254))
    razao_social = db.Column(db.String(254))
    numero_funcionarios = db.Column(db.String(254))
    tipo_instituicao = db.Column(db.String(254))
    cnpj = db.Column(db.Integer())
    
    # definindo indentidade polimórfica que ficará armazenada na classe pai
    # no campo type
    __mapper_args__={
        'polymorphic_identity' : 'entidade',
    }

    # para printar as informações do objeto
    def __str__(self):
        return super().__str__() + f', {self.nome_fantasia}, '+\
            f'{self.razao_social}, {self.numero_funcionarios}, '+\
            f'{self.tipo_instituicao}, {self.cnpj}'

    # método para dar return nas informações no padrão json
    def json(self):
        return super().json() | {
            "nome_fantasia" : self.nome_fantasia,
            "razao_social" : self.razao_social,
            "numero_funcionarios" : self.numero_funcionarios,
            "tipo_instituicao" : self.tipo_instituicao,
            "cnpj" : self.cnpj,
        }

# para testar a classe
if __name__ == "__main__":
    # comando para remover arquivo banco de dados caso já exista
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando para criar tabela (classe usuario)
    db.create_all()

    # criar objetos (na memória, sem persistência)
    p1 = Entidade(estado="SC", cidade="Blumenau", endereco="Rua isadora",
    complemento="Fachada branca", cep="89037-255", telefone="992922070", 
    email="lucas@email.com", senha="123", data_surgimento="10/10/2020", 
    nome_fantasia="Santa Isabel", razao_social="NomeTeste", 
    numero_funcionarios="40", tipo_instituicao="EIRELI", cnpj=32323) 
    
    p2 = Entidade(estado="PR", cidade="Itaporoba", endereco="Rua Barelo",
    complemento="Rua Roxa", cep="32076-454", telefone="85920132", 
    email="sabrino@email.com", senha="543", data_surgimento="21/12/2020", 
    nome_fantasia="Santo Agostinho", razao_social="NomeTeste", 
    numero_funcionarios="63", tipo_instituicao="Sociedade Simples Pura", 
    cnpj=344443)
    
    # Torna os objetos persistentes
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    
    # exibe os objetos de Entidade
    print("---------------")
    print(p1)
    print(p1.json())
    print("-----------------------")
    print(p2)
    print(p2.json())
    print("---------------")
