## Tecnologias necessárias

## 🚀 Tecnologias

- [Node.js][https://nodejs.org/en/]
- [MySQL][https://dev.mysql.com/downloads/installer/]
- [Yarn][https://classic.yarnpkg.com/en/docs/install/#windows-stable]
- [Postman][https://www.postman.com/downloads/]


## Configurando Postman para utilizar requesições criadas

- Abra o Postman
- Clique no aba File e selecione a opção Import
- Selecione o arquivo 'QuizUTFPR.postman_collection' disponibilizado na pasta 'backend' do repositorio

## Configurando .env

Crie um arquivo .env informando todos os dados pedidos abaixo

Gere seu secret no site: https://www.md5hashgenerator.com/ utilizando uma frase

No campo expire_in, informe quanto tempo o token será válido, exemplos:

```bash
 expiresIn: '2d' // expira em 2 dias
 expiresIn: "10h" // expira em 10 horas
 expiresIn: 120 // expira em 120ms
 expiresIn: "120s" // expira em 120s
```
```bash
# CONFIGURAÇÃO CASO NÃO USAR O DOCKER
 DB_HOST=
 DB_PORT=
 DB_USER=
 DB_PASS=
 DB_NAME=
 DB_DIALECT=

 SECRET=
 EXPIRE_IN=

 # LDAP CONFIG
LDAP_URL="URL_LDAP_AQUI"
LDAP_USERNAME="USUARIO_LDAP"
LDAP_PASSWORD="SENHA_LDAP"
```



## Criando Banco de Dados

```bash
$ mysql -u seu-nome-de-usuario -p
$ digite sua senha
$ create database db_quiz;
```

## Instalando dependências

NPM

```bash
$ npm install
```

Yarn

```bash
$ yarn install
```

## Criando migrations do banco

```bash
$ yarn sequelize db:migrate
```


## Inicializando Server

```bash
$ yarn dev
```

