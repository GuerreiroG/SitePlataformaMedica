"""Este módulo contém a classe que representa um paciente
No arquivo encontra-se a implementação de uma classe: Paciente.
Autor: Johannes Wachholz José.
"""
from config import *
from model import Usuario

class Paciente(Usuario):
    """Classe que representa um Paciente no site
    """
    # atributos exclusivos do Paciente
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    nome_completo = db.Column(db.String(254))
    sexo = db.Column(db.String(254))
    cpf = db.Column(db.Integer())
    alergias = db.Column(db.String(254))
    
    __mapper_args__={
        'polymorphic_identity' : 'paciente',
    }

    def __str__(self):
        return super().__str__() + f', {self.nome_completo}, '+\
            f'{self.sexo}, {self.cpf}, '+\
            f'{self.alergias}'

    def json(self):
        return super().json() | {
            "nome_completo" : self.nome_completo,
            "sexo" : self.sexo,
            "cpf" : self.cpf,
            "alergias" : self.alergias
        }

# comando para remover arquivo banco de dados caso já exista
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando para criar tabela (classe usuario)
    db.create_all()

    # criar objetos (na memória, sem persistência)
    p1 = Paciente(estado="SC", cidade="Blumenau", endereco="Alguma Casa",
    complemento="Alto", cep="89037-255", telefone="992922070", email="lucasv@email.com",
    senha="123", data_surgimento="10/10/2020", nome_completo="bananinha", sexo="coca-cola", 
    cpf=11111111111, alergias="sol") 
    
    p2 = Paciente(estado="PR", cidade="Itaporoboncotoca", endereco="Meio do mato",
    complemento="triste", cep="32076-454", telefone="85920132", email="sabrino@email.com",
    senha="543", data_surgimento="21/40/2460", nome_completo="chocolate", sexo="paozinho", 
    cpf=22222222222, alergias="Orogotango")
    
    # para tornar os objetos persistentes
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    
    # exibir paciente
    print(p1.json())
    print(p2)
