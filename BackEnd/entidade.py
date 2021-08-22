from config import *
from model import Usuario

class Entidade(Usuario):
    # atributos da entidade médica
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    nome_fantasia = db.Column(db.String(254))
    razao_social = db.Column(db.String(254))
    numero_funcionarios = db.Column(db.String(254))
    tipo_instituicao = db.Column(db.String(254))
    cnpj = db.Column(db.String(254))
    
    __mapper_args__={
        'polymorphic_identity' : 'entidade',
    }

    def __str__(self):
        return super().__str__() + f', {self.nome_fantasia}, '+\
            f'{self.razao_social}, {self.numero_funcionarios}, '+\
            f'{self.tipo_instituicao}, {self.cnpj}'

    def json(self):
        return super().json() | {
            "nome_fantasia" : self.nome_fantasia,
            "razao_social" : self.razao_social,
            "numero_funcionarios" : self.numero_funcionarios,
            "tipo_instituicao" : self.tipo_instituicao,
            "cnpj" : self.cnpj,
        }

# comando para remover arquivo banco de dados caso já exista
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando para criar tabela (classe usuario)
    db.create_all()

    # criar objetos (na memória, sem persistência)
    p1 = Entidade(estado="SC", cidade="Blumenau", endereco="Alguma Casa",
    complemento="Alto", cep="89037-255", telefone="992922070", email="lucasv@email.com",
    senha="123", data_surgimento="10/10/2020", nome_fantasia="bananinha", razao_social="coca-cola", 
    numero_funcionarios="40", tipo_instituicao="médica", cnpj="32323232") 
    
    p2 = Entidade(estado="PR", cidade="Itaporoboncotoca", endereco="Meio do mato",
    complemento="triste", cep="32076-454", telefone="85920132", email="sabrino@email.com",
    senha="543", data_surgimento="21/40/2460", nome_fantasia="chocolate", razao_social="paozinho", 
    numero_funcionarios="63", tipo_instituicao="Orogotango", cnpj="3444")
    
    # para tornar os objetos persistentes
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    
    # exibir pessoa
    print(p1.json())
    print(p2)
