# Desafio de Automação de Testes — Accenture

Projeto desenvolvido para o desafio técnico de QA Automation da Accenture, utilizando Cypress e JavaScript para automatizar um fluxo completo de testes de API.

O objetivo é validar, em uma única execução, as operações de criação e autorização de usuário, consulta de livros, reserva de livros e validação dos dados finais.

## Tecnologias

- JavaScript
- Node.js
- Cypress
- Git e GitHub

## Parte 1 — Automação de API

Os testes utilizam a API Book Store da DemoQA e executam as seguintes etapas em sequência:

1. Criar um usuário.
2. Gerar um token de acesso.
3. Confirmar se o usuário está autorizado.
4. Listar os livros disponíveis.
5. Reservar dois livros.
6. Consultar os dados do usuário e validar os livros reservados.

### Arquivo de teste

`cypress/e2e/api/book-store-fluxo-completo.cy.js`


### API e documentação

- [Book Store API — DemoQA] (https://demoqa.com)

- [Documentação Swagger] (https://demoqa.com/swagger)

## Pré-requisitos

Para executar o projeto, é necessário ter:

- Node.js e npm  instalados
- Google Chrome instalado
- Conexão com a internet

Não é necessário iniciar uma aplicação local, pois os testes realizam requisições diretamente à API da DemoQA.

## Como executar o projeto

### 1.Clone o repositório:

```bash
git clone https://github.com/anapcavalcanti02-dot/accenture-qa-automation.git
```

### 2.Entre na pasta do projeto:

```bash
cd accenture-qa-automation
```

### 3.Instale as dependências:

```bash
npm install
```

### 4.Execute o teste:

```bash
npm test
```

O Cypress abre o Chrome em modo headless e chama a API. Não é necessário acessar o site manualmente.

## Validações realizadas

Durante o fluxo, são verificadas as respostas da API, os códigos HTTP esperados, a geração do token, a autorização do usuário, a reserva dos dois livros e a confirmação dos livros associados ao usuário.

O cenário utiliza um usuário gerado para cada execução e tenta removê-lo ao final do teste, por meio de uma rotina de limpeza.


## Resultado esperado

Na execução validada durante o desenvolvimento:

- Testes aprovados: 1
- Testes com falha: 0
- Navegador: Google Chrome
- Execução: modo headless

