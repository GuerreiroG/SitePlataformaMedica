"""Este módulo contém a classe que representa um médico

No arquivo encontra-se a implementação de uma classe: Medico.

Autor: Gustavo Guerreiro.
"""
from config import *
from model import Usuario
from instituicao import Instituicao

class Medico(Usuario):
    """Classe que representa um médico no site
    """
    # atributos exclusivos do médico
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    nome_medico = db.Column(db.String(254))
    especialidade = db.Column(db.String(254))
    status_medico = db.Column(db.String(254))
    cnpj_instituicao = db.Column(db.Integer())
    cpf_medico = db.Column(db.String(254))
    sexo_medico = db.Column(db.String(254))

    # atributo de chave estrangeira
    id_instituicao = db.Column(db.Integer, db.ForeignKey('instituicao.id'), nullable=False)
    
    # atributo de relacionamento
    instituicao = db.relationship("Instituicao", foreign_keys=[id_instituicao])

    # definindo indentidade polimórfica que ficará armazenada na classe pai
    # no campo type
    __mapper_args__= {
        'polymorphic_identity' : 'medico',
    }

    def __str__(self):
        """Feita para fazer o print imprimir o dicionario contido em Medico

        Returns:
            (str): string adicionando a area de atuacao do medico ao dicionario
        """
        return super().__str__() + f', {self.nome_medico}, ' +\
        f'{self.cpf_medico}, {self.sexo_medico}, ' +\
        f'{self.especialidade}, {self.id_instituicao}, {self.instituicao}' +\
        f'{self.status_medico}, {self.cnpj_instituicao}' 
    
    def json(self):
        """Adiciona especialidade ao return do json do Usuario

        Returns:
            (dict): dicionário json com a area de atuação inclusa
        """
        json1 = super().json()  
        json1.update({
            "nome_medico" : self.nome_medico,
            "especialidade" : self.especialidade,
            "cpf_medico" : self.cpf_medico,
            "sexo_medico" : self.sexo_medico,
            "id_instituicao" : self.id_instituicao,
            "instituicao" : self.instituicao.json(),
            "status_medico" : self.status_medico,
            "cnpj_instituicao" : self.cnpj_instituicao
        })
        return json1

# parte de teste da classe
if __name__ == "__main__":
    # se um banco de dados já exister, o comando a seguir o apaga
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando cria uma tabela
    db.create_all()

    # criando instancia de instituicao para fazer o teste do médico
    instituicao_teste = Instituicao(estado="SC", cidade="Blumenau",
    endereco="Alguma Casa", complemento="Alto", cep="89037-255",
    telefone="992922070", email="lucasv@email.com", senha="123",
    data_surgimento="10/10/2020", nome_fantasia="bananinha",
    razao_social="coca-cola", numero_funcionarios="40",
    tipo_instituicao="médica", cnpj="32323232")

    # comandos para testar o módulo (criar objetos na memória sem persistência)
    test1 = Medico(estado="RS", cidade="Porto Triste", 
    endereco="Algum Apartamento", complemento="Baixo", cep="55555-955",
    telefone="47888888888", email="gustavog@email.com", senha="321",
    data_surgimento="11/11/2011", nome_medico="Jorge", especialidade="Urologia",
    sexo_medico="Masculino", cpf_medico="989.654.258-89", id_instituicao="1")
    
    # torna os objetos persistentes
    db.session.add(instituicao_teste)
    db.session.add(test1)
    db.session.commit()

    # exibe o médico
    print(test1.json())
    print("================================================")
    # acessa o nome fantasia da instituicao por meio do médico
    print(test1.instituicao.nome_fantasia)