from config import *

class Usuario(db.Model):
    # atributos do usuário
    id = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.String(254))
    cidade = db.Column(db.String(254))
    endereco = db.Column(db.String(254))
    complemento = db.Column(db.String(254))
    cep = db.Column(db.String(254))
    telefone = db.Column(db.String(254))
    email = db.Column(db.String(254))
    senha = db.Column(db.String(254))
    data_surgimento = db.Column(db.String(254))
    
    # driscriminador
    type = db.Column(db.String(50))

    # definições de mapeamento da classe mãe
    __mapper_args__={
        'polymorphic_identity':'usuario',
        'polymorphic_on':type
    }

    def __str__(self):
        return f'id = {self.id}, {self.estado}, {self.cidade}, '+\
            f'{self.endereco}, {self.complemento}, {self.cep}, '+\
            f'{self.telefone}, {self.email}, {self.email}, '+\
            f'{self.data_surgimento}'

    def json(self):
        return {
            "id" : self.id,
            "estado" : self.estado,
            "cidade" : self.cidade,
            "endereco" : self.endereco,
            "complemento" : self.complemento,
            "cep" : self.cep,
            "telefone" : self.telefone,
            "email" : self.email,
            "senha" : self.senha,
            "data_surgimento" : self.data_surgimento
        }

# comando para remover arquivo banco de dados caso já exista
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando para criar tabela (classe usuario)
    db.create_all()

    # criar objetos (na memória, sem persistência)
    p1 = Usuario(estado="SC", cidade="Blumenau", endereco="Alguma Casa",
    complemento="Alto", cep="89037-255", telefone="992922070", email="lucasv@email.com",
    senha="123", data_surgimento="10/10/2020") 
    p2 = Usuario(estado="PR", cidade="Itaporoboncotoca", endereco="Meio do mato",
    complemento="triste", cep="32076-454", telefone="85920132", email="sabrino@email.com",
    senha="543", data_surgimento="21/40/2460")
    
    # para tornar os objetos persistentes
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()

    # exibir pessoa
    print(p1.json())
    print(p2)

