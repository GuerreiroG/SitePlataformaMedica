"""Este módulo contém a classe que representa um médico

No arquivo encontra-se a implementação de uma classe: Medico.

Autor: Gustavo Guerreiro.
"""
from config import *
from model import Usuario
from entidade import Entidade

class Medico(Usuario):
    """Classe que representa um médico no site
    """
    # atributos exclusivos do médico
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    nome_medico = db.Column(db.String(254))
    area_atuacao = db.Column(db.String(254))
    cpf_medico = db.Column(db.String(254))
    sexo_medico = db.Column(db.String(254))

    # atributo de chave estrangeira
    id_entidade = db.Column(db.Integer, db.ForeignKey('entidade.id'), nullable=False)
    
    # atributo de relacionamento
    entidade = db.relationship("Entidade", foreign_keys=[id_entidade])

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
        f'{self.area_atuacao}, {self.id_entidade}, {self.entidade}'
    
    def json(self):
        """Adiciona area_atuacao ao return do json do Usuario

        Returns:
            (dict): dicionário json com a area de atuação inclusa
        """
        return super().json() | {
            "nome_medico" : self.nome_medico,
            "area_atuacao" : self.area_atuacao,
            "cpf_medico" : self.cpf_medico,
            "sexo_medico" : self.sexo_medico,
            "id_entidade" : self.id_entidade,
            "entidade" : self.entidade.json(),
        }

# parte de teste da classe
if __name__ == "__main__":
    # se um banco de dados já exister, o comando a seguir o apaga
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # comando cria uma tabela
    db.create_all()

    # criando instancia de entidade para fazer o teste do médico
    entidade_teste = Entidade(estado="SC", cidade="Blumenau",
    endereco="Alguma Casa", complemento="Alto", cep="89037-255",
    telefone="992922070", email="lucasv@email.com", senha="123",
    data_surgimento="10/10/2020", nome_fantasia="bananinha",
    razao_social="coca-cola", numero_funcionarios="40",
    tipo_instituicao="médica", cnpj="32323232")

    # comandos para testar o módulo (criar objetos na memória sem persistência)
    test1 = Medico(estado="RS", cidade="Porto Triste", 
    endereco="Algum Apartamento", complemento="Baixo", cep="55555-955",
    telefone="47888888888", email="gustavog@email.com", senha="321",
    data_surgimento="11/11/2011", nome_medico="Jorge", area_atuacao="Urologia",
    sexo_medico="Masculino", cpf_medico="989.654.258-89", id_entidade="1")
    
    # torna os objetos persistentes
    db.session.add(entidade_teste)
    db.session.add(test1)
    db.session.commit()

    # exibe o médico
    print(test1.json())
    print("================================================")
    # acessa o nome fantasia da entidade por meio do médico
    print(test1.entidade.nome_fantasia)