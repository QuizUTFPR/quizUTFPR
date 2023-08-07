# Quiz UTFPR

![image info](./capa.png)

<p align="center">
  <img alt="Licença" src="https://img.shields.io/github/license/jhonatancunha/quizUTFPR?color=%23372775&style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jhonatancunha/quizUTFPR?color=%23372775&style=for-the-badge">
  <img src="https://img.shields.io/github/stars/jhonatancunha/quizUTFPR?color=%23372775&style=for-the-badge" alt="Quantidade de Estrelas">
  <img src="https://img.shields.io/github/forks/jhonatancunha/quizUTFPR?color=%23372775&style=for-the-badge" alt="Quantidade de Forks!">
</p>

O projeto é uma plataforma web e móvel para criação e análise de avaliações digitais. O sistema está sendo criado sob orientação dos professores Juliano Henrique Foleis e Marcos Silvano Almeida. O mesmo é composto por um painel de controle utilizado para criação de quizzes, bem como um aplicativo móvel gamificado para que os alunos possam acessá-los e respondê-los.

Além disso, o painel de controle também possui uma seção de análise das repostas com algumas opções de filtragem das informações. Tal filtragem visa dar mais opções de visualização dos dados, permitindo a extração de mais informações.

A plataforma web conta com um sistema de turmas tanto públicas quanto privadas. Isso para que o criador do quiz tenha um controle sobre as pessoas que o estão respondendo. Na aplicação móvel, é possível que o usuário se inscreva na turma e responda os quizzes que estão anexados nela.

Os estudantes, na aplicação móvel, possuem acesso a um sistema de ranqueamento. Este último oferece uma gamificação como forma de motivação para um maior empenho na reposta dos quizzes.

Outra funcionalidade existente na plataforma web é a criação de um banco de questões. Nele é possível que o usuário adicione sua questão criada a este banco, permitindo que ele as reutilize em outros quizzes.

## Resumo de Features

#### 🧑‍🏫 Professor

- Login pelo Google @professores.
- Gerenciamento de Turmas.
- Gerenciamento de Quizzes.
- Banco de Questões Pessoal Disponíveis para Criação dos Quizzes.
- Busca Personalizada de Questões por Tags.
- Disponibilização de PIN para Quizzes/Turmas.
- Estatísticas dos Quizzes:
  - Visualização por meio de Gráficos.
  - Filtragem por Turmas:
    - Turma Especifica.
    - Geral.
  - Filtragem dos Scores:
    - Melhor Tentativa.
    - Pior Tentativa.
    - Primeira Tentativa.

#### 🧑‍🎓 Aluno

- Login pelo Google.
- Busca Personalizada de Quizzes por Tags.
- Acesso a Turmas por meio do PIN.
- Busca de Quizzes por meio de PIN.
- Escolha de Nickname e Avatares.
- Marcação de Quiz como Favorito.
- Pesquisa de Turmas Públicas.
- Ranqueamento de Respostas dos Quizzes para Gamificação.
  - Ranking por Turma.
  - Ranking por Quiz.
  - Ranking Geral.

## ⚙️ Como configurar ambiente de produção?

- Realize a cópia do arquivo docker-compose-prod-only-api-example.yml
- Renomeie a cópia para docker-compose-prod-only-api.yml
- Altere as variáveis de ambiente presentes no arquivo
- Execute o arquivo setup.sh
  - Informe o domínio do paínel de controle
  - Informe o domínio da API
  - Informe um e-mail válido

## :checkered_flag: Como configurar ambiente de desenvolvimento?

#### 📚 Criação do Banco de Dados:

Esta aplicação utiliza o SGBD [MySQL](https://www.mysql.com/). É necessário apenas criar o banco, o Sequelize fará todo o resto.

```
$ mysql -u root -p
$ create database NOME_DO_BANCO;
```

#### ⚙️ Para a API:

##### 🖥️ Configurando .env

```
APP_URL=http://URL_AQUI:PORTA

DB_HOST="HOST_MYSQL"
DB_PORT="PORTA_MYSQL"
DB_USER="USUARIO_MYSQL"
DB_PASS="SENHA_DO_BANCO"
DB_NAME="NOME_DO_BANCO"
DB_DIALECT="mysql"

SECRET="DIGITE_SECRET_AQUI"
EXPIRE_IN="DIAS_PARA_EXPIRAR_TOKEN"
REFRESH_EXPIRATION="MINUTOS_PARA_EXPIRAR_REFRESH_TOKEN"
TIMEZONE="DIGITE_TIMEZONE_AQUI"

LDAP_URL="URL_LDAP_AQUI"
LDAP_USERNAME="USUARIO_LDAP"
LDAP_PASSWORD="SENHA_LDAP"

NODE_ENV=development OU production
PORT=PORTA_USADA_PELO_BACKEND
```

##### :checkered_flag: Inicializando

```
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

#### :computer: Para o frontend:

##### 🖥️ Configurando .env

```
REACT_APP_BASE_URL=URL_DA_API
```

##### :checkered_flag: Inicializando

```
cd frontend
npm install
npm run start
```

#### :iphone: Para o mobile:

##### 🖥️ Configurando env.js

```
export const API_URL = 'URL_DA_API';
```

##### :checkered_flag: Inicializando

```
cd mobile
npm install
expo start
```

## 👩‍💻 Tecnologias Utilizadas

#### :computer: Painel de Controle

- [React JS](https://reactjs.org)
- [Material UI](https://mui.com/pt/)

#### :iphone: Aplicativo Móvel

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)

#### ⚙️ API

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)

## :bug: Bugs e Sugestões

Encontrou algum problema ou possui alguma sugestão para a melhoria do projeto? Por favor, siga os seguintes passos:

1. Pesquise se já existe alguma issue fechada ou aberta sobre o assunto na ferramenta de [Issue Tracker](https://github.com/jhonatancunha/quizUTFPR/issues).
2. Caso não encontrar nenhuma issue sobre o assunto, por favor, crie uma [issue](https://github.com/jhonatancunha/quizUTFPR/issues/new) sobre o bug ou sugestão.
3. Inclua na issue as tags referentes ao assunto abordado:
   - **feature** - Utilizada para indicar uma sugestão de melhoria para o projeto.
   - **bug** - Discussão aberta para informar sobre um possivel bug presente na aplicação.

## :interrobang: Como contribuir?

Primeiramente, gostaria de agradecer pelo interesse em contribuir para o crescimento deste projeto. Doravante, para realizar sua contribuição, você poderá abrir um [pull request](https://help.github.com/articles/about-pull-requests/) enviando suas alterações. Por favor, siga os seguintes passos:

1. Crie um [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) do projeto e clone seu fork:

```
$ git clone https://github.com/jhonatancunha/quizUTFPR.git
$ cd quizUTFPR
```

2. Crie uma nova branch que conterá suas alterações:

```
$ git checkout -b <nome-descritivo-da-alteracao>
```

3. Após realizar as alterações, faça um commit para seu repositório:

```
$ git commit -m "titulo do commit" -m "descrição das alterações"
$ git push origin <nome-da-branch>
```

4. Abra um [Pull Request](https://help.github.com/articles/about-pull-requests/) para a branch _development_. O mesmo deverá com um título claro e uma descrição contendo todas as alterações feitas.

## :mortar_board: Autores

<center>
<table><tr>
<td align="center"><a href="https://github.com/jhonatancunha">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/52831621?s=460&u=2b0cfdafeb7756176ded82c41738e773e92762b8&v=4" width="100px;" alt=""/>
<br />
 <b>Jhonatan Cunha</b></a>
 <a href="https://github.com/jhonatancunha" title="Repositorio Jhonatan"></a>

[![Gmail Badge](https://img.shields.io/badge/-jhonatancunha@alunos.utfpr.edu.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jhonatancunha@alunos.utfpr.edu.br)](mailto:jhonatancunha@alunos.utfpr.edu.br)</td>

<td align="center"><a href="https://github.com/JessePires">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/20424496?s=460&u=87f2870ff153ab88402d6246cb3347a46ae33fe9&v=4" width="100px;" alt=""/>
<br />
 <b>Jessé Pires</b>
 </a> <a href="https://github.com/JessePires" title="Repositorio Jessé"></a>

[![Gmail Badge](https://img.shields.io/badge/-jesserocha@alunos.utfpr.edu.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jesserocha@alunos.utfpr.edu.br)](mailto:jesserocha@alunos.utfpr.edu.br)</td>

<td align="center"><a href="https://github.com/iagocarmona">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/69121686?s=400&u=c6fc38d355b96f4abf690ae95912c07e5f057b94&v=4" width="100px;" alt=""/>
<br />
 <b>Iago Carmona</b>
 </a> <a href="https://github.com/iagocarmona" title="Repositorio Iago"></a>

[![Gmail Badge](https://img.shields.io/badge/-iagocarmona@alunos.utfpr.edu.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:iagocarmona@alunos.utfpr.edu.br)](mailto:iagocarmona@alunos.utfpr.edu.br)</td>

</tr>
<tr>

<td align="center"><a href="https://github.com/vitorRibeiro7">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/72838474?v=4" width="100px;" alt=""/>
<br />
 <b>Vitor Ribeiro</b>
 </a> <a href="https://github.com/vitorRibeiro7" title="Repositorio Vitor"></a>

[![Linkedin Badge](https://img.shields.io/badge/-vitorribeiro7-4040ff?style=flat-square&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/vitorribeiro7/)](https://www.linkedin.com/in/vitorribeiro7/)</td>

<td align="center"><a href="https://github.com/DiogoRodriguees">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/92277603?v=4" width="100px;" alt=""/>
<br />
 <b>Diogo Rodrigues</b>
 </a> <a href="https://github.com/DiogoRodriguees" title="Repositorio Diogo"></a>

[![Linkedin Badge](https://img.shields.io/badge/-diogorodriguees-4040ff?style=flat-square&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/diogorodriguees/)](https://www.linkedin.com/in/diogorodriguees/)</td>

</tr>

</table>
</center>
