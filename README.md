
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

- _Endpoint_ de criar estudante em formato **PUT** validando todas as entradas e verificação de *id's e e-mails* repetidos, adição de lista de hobbies e exibição junto do estudante criado;

- _Endpoint_ de adicionar um estudante a uma turma no formato **POST** validando se existe aluno e turma informado no body;

- _Endpoint_ de pegar a idade do estudante passando um *id* no *path params* no formato **GET** validando pelo *id* se existe estudante, ele retorna o nome do estudante e sua idade;

- _Endpoint_ de pegar todos os estudantes de uma turma passando um *query.params* noma da turma no formato **GET** validando se turma existe e se tem alunos na turma, caso não tenha alunos ele retorna um erro, caso tenha retorna um *array* de alunos da turma;

- _Endpoint_ deletar estudante passando um *id* de *path.params* no método **DELETE** verifica se há um *id*, caso tenha ele deleta o estudante, caso não tenha ele retorna um erro. Alterada a lógica para garantir que o id do estudante é removido antes da tabela de junção dos hobbies;

- _Endpoint_ de criar um *teacher* em formato **PUT** validando todas as entradas e verificação de *id's e e-mails* repetidos, adição de lista de hobbies e exibição junto do estudante criado;;

- _Endpoint_ adicionar professor a uma turma passando um body com *id* do professor e turma, usando método **POST** validando se existe os *id's* passados no body;

- _Endpoint_ de pegar o professor passando um  *query.params* nome da turma no formato **GET** validando se turma existe e se tem um professor registrado nela, caso não tenha professor ele retorna um erro, caso tenha retorna o professor e a turma;

- _Endpoint_ adicionar um missão - seu método é o  **PUT** validando todas as entradas, módulos de 1 à 7, *id* e *name* não repetidos, seu retorno é a turma criada. Se o módulo não for passado esse valor é considerado como null, indicando que as aulas dessa turma não começaram;

- _Endpoint_ de remover aluno de uma turma usando método **PUT**. Método de mudar de turma e adicionar a turma foi feito na mesma lógica, alterando apenas a coluna turma na tabela de estudantes;

- _Endpoint_ de remover professor de uma turma com método **PUT**. Método de mudar de turma e adicionar a turma foi feito na mesma lógica, alterando apenas a coluna turma na tabela de docentes;

- _Endpoint_ de exibir estudantes que tenham o mesmo hobby com método **GET** passando o hobby buscado por query.

- _Endpoint_ de exibir docentes que tenham a mesma especialidade com método **GET** passando a especialidade buscada por query.

### O que não funciona:

- Exibir lista de hobbies no retorno do endpoint exibir estudante por id;
- Exibir lista de especialidades no retorno do endpoint exibir docente por id;


### Bibliotecas usadas

- npm install cors;
- npm install knex;
- npm install dotenv;
- npm install express;
- npm install mysql;
