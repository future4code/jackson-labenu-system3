
## Labenu System

Projeto: Sistema de alunos e professores da Labenu em formato de API's

Esse é um projeto em grupo, segue o nome da galera:
 
 - Magali da Silva
  - Juan Kleyton
  - Michelle Louzada Carballo
  - Roberto de Abreu Salgado

### O que funciona:

- Todos os *endpoints* ligados diretamente com banco de dados e suas respectivas tabelas;

- Arquivo **MySQL** com todas as tabelas seus *inserts* respectivos pra popular tabelas;

- _Endpoint_ de criar estudante em formato **PUT** validando todas as entradas e verificação de *id's e e-mails* repetidos;

- _Endpoint_ de adicionar um estudante a uma turma no formato **POST** validando se existe aluno e turma informado no body;

- _Endpoint_ de pegar a idade do estudante passando um *id* no *path params* no formato **GET** validando pelo *id* se existe estudante, ele retorna o nome do estudante e sua idade;

- _Endpoint_ de pegar todos os estudantes de uma turma passando um *query.params* noma da turma no formato **GET** validando se turma existe e se tem alunos na turma, caso não tenha alunos ele retorna um erro, caso tenha retorna um *array* de alunos da turma;

- _Endpoint_ deletar estudante passando um *id* de *path.params* no método **DELETE** verifica se há um *id*, caso tenha ele deleta o estudante, caso não tenha ele retorna um erro;

- _Endpoint_ de criar um *teacher* em formato **PUT** validando todas as entradas e verificação de *id's e e-mails* repetidos;

- _Endpoint_ adicionar professor a uma turma passando um body com *id* do professor e turma, usando método **POST** validando se existe os *id's* passados no body;

- _Endpoint_ de criar estudante em formato **PUT** validando todas as entradas e verificação de id's e e-mails repetidos;

- _Endpoint_ de pegar o professor passando um  *query.params* nome da turma no formato **GET** validando se turma existe e se tem um professor registrado nela, caso não tenha professor ele retorna um erro, caso tenha retorna o professor e a turma;

- _Endpoint_ adicionar um missão seu método é o  **PUT** validando todas as entradas, módulos de 1 à 7, *id* e *name* não repetidos, seu retorno é a turma criada;

- _Endpoint_ de remover aluno de uma turma passando um body com *id* e *missionId* usando método **PUT** validando se existe os *id's* passados no body, o valor de *missionId* precisa ser null se não retorna um erro;

### O que não funciona:

- Integração com tabela de *hobbys* de *students*
- Integração com a tabela de *specialty* dos *teacher*;


### Bibliotecas usadas

- npm install cors;
- npm install knex;
- npm install dotenv;
- npm install express;
- npm install mysql;
