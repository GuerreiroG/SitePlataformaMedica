from config import *
from model import Usuario

class Medico(Usuario):
    id = db.Column(db.Integer, db.ForeignKey(usuario.id))
    area_atuacao = db.Column(db.String(254))
    
    __mapper_args__= {
        'polymorphic_identity' : 'medico',
    }

    def __str__(self):
        return super().__str__() + f', {self.area_atuacao}'
    
    def json(self):
        return super().json() | {"area_atuacao" : self.area_atuacao}

    if __name__ == "__main__":
        if os.path.exists(arquivobd):
            os.remove(arquivobd)

        db.create_all()

        test1 = Medico(estado="RS", cidade="Porto Triste", endereco="Algum Apartamento", 
        complemento="Baixo", cep="55555-955", telefone="47888888888", email="gustavog@email.com",
        senha="321", data_surgimento="11/11/2011",area_atuacao="Urologia")

        db.session.add(test)
        db.session.commit()

        print(p1.json())