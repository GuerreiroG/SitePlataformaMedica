from config import *

class Usuario(db.Model):
    # atributos do usuário
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    estado = db.Column(db.String(254))
    """cidade = db.Column(db.String(254))
    endereco = db.Column(db.String(254))
    complemento = db.Column(db.String(254))
    cep = db.Column(db.String(254))
    telefone = db.Column(db.String(254))
    email = db.Column(db.String(254))
    senha = db.Column(db.String(254))
    data_surgimento = db.Column(db.Date)"""

    def __str__(self):
        """return f'(id={self.id}) {self.nome}, {self.estado}, '+\
                f'{self.cidade}, {self.endereco}, {self.complemento}, '+\
                f'{self.cep}, {self.telefone}, {self.email}, '+\
                f'{self.email}, {self.data_surgimento}'"""
        return f'(id={self.id}) {self.nome}, {self.estado}'

    def json(self):
        """return {
            "id" : self.id,
            "nome" : self.nome,
            "estado" : self.estado,
            "cidade" : self.cidade,
            "endereco" : self.endereco,
            "complemento" : self.complemento,
            "cep" : self.cep,
            "telefone" : self.telefone,
            "email" : self.email,
            "senha" : self.senha,
            "data_surgimento" : self.data_surgimento
        }"""
        return {
            "id" : self.id,
            "nome" : self.nome,
            "estado" : self.estado,
        }


# comando para remover arquivo banco de dados caso já exista
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando para criar tabela (classe usuario)
    db.create_all()

    # criar objetos (na memória, sem persistência)
    p1 = Usuario(id=1, nome="Pedroca", estado="Ipiranga")
    p2 = Usuario(id=2, nome="Joao", estado="Imacetopo")
    
    # para tornar os objetos persistentes
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()

    # exibir pessoa
    print(p1)
    print(p2)

