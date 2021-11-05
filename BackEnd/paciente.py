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
        json1 = super().json()
        json1.update({
            "nome_completo" : self.nome_completo,
            "sexo" : self.sexo,
            "cpf" : self.cpf,
            "alergias" : self.alergias  
        })
        return json1

# comando para remover arquivo banco de dados caso já exista
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando para criar tabela (classe usuario)
    db.create_all()

    # criar objetos (na memória, sem persistência)
    p1 = Paciente(estado="SC", cidade="Pomerode", endereco="Rua Hermann Weege",
    complemento="casa", cep="89107-000", telefone="992922070", email="joao8856@email.com",
    senha="senha123", data_surgimento="11/06/2002", nome_completo="João Machado", sexo="Masculino", 
    cpf=16465232154, alergias="poeira") 
    
    p2 = Paciente(estado="SC", cidade="Blumenau", endereco="Rua Itajaí",
    complemento="Apartamento", cep="12512000", telefone="994210500", email="amanda5521@gmail.com",
    senha="amanda2251", data_surgimento="21/04/1997", nome_completo="Amanda da Silva", sexo="Feminino", 
    cpf=52145561244, alergias="polém")
    
    # para tornar os objetos persistentes
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    
    # exibir paciente
    print(p1.json())
    print(p2)
