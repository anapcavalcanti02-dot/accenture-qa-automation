# Desafio de Automação de Testes — Accenture

Projeto desenvolvido para o desafio técnico de QA Automation da Accenture, utilizando **JavaScript e Cypress** para automatizar testes de API e de interface web na aplicação DemoQA.

O objetivo é validar fluxos funcionais por meio de testes automatizados, incluindo requisições HTTP, validações de respostas e interações com elementos da interface.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Cypress
- Google Chrome
- Git e GitHub

## Parte 1 — Automação de API

Os testes utilizam a API Book Store da DemoQA e executam um fluxo completo em sequência, com uma única execução.

**Arquivo de teste:** `cypress/e2e/api/book-store-fluxo-completo.cy.js`

### Etapas automatizadas

1. Criação de usuário.
2. Geração de token de autenticação.
3. Validação da autorização do usuário.
4. Consulta dos livros disponíveis.
5. Seleção e reserva de dois livros.
6. Consulta dos dados do usuário e validação dos livros associados.
7. Tentativa de exclusão do usuário criado durante o teste.

O fluxo utiliza `cy.request()` para realizar as requisições HTTP e asserções para validar os códigos de status e os dados retornados pela API. A execução é automatizada com Cypress e JavaScript, sem depender do Postman.

**Documentação da API:** [Swagger — DemoQA](https://demoqa.com/swagger)

## Parte 2 — Automação de Interface (Frontend)

Os testes de interface simulam ações do usuário e validam comportamentos da aplicação DemoQA.

### 2.1 Practice Form

**Arquivo:** `cypress/e2e/ui/practice-form.cy.js`

**Objetivo:** validar o preenchimento e o envio do formulário.

**Cenários automatizados:**

- Navegação até a página Practice Form.
- Preenchimento dos campos com dados dinâmicos.
- Seleção de gênero, data de nascimento, matéria, hobby, estado e cidade.
- Upload do arquivo `arquivo-upload.txt`.
- Envio do formulário.
- Validação do modal de confirmação e dos dados apresentados.
- Validação do fechamento do modal.

**Observação de teste manual:** durante a verificação manual, o botão `Close` não fechou o modal. O fechamento ocorreu ao clicar fora da janela. Esse comportamento foi registrado como uma observação, sem classificá-lo como defeito confirmado da aplicação.

**Evidência em vídeo:** [Gravação do teste](evidencias/practice-form-modal-close.mov)

### 2.2 Web Tables

**Arquivo:** `cypress/e2e/ui/web-tables.cy.js`

**Objetivo:** validar as operações de criação, edição e exclusão de registros.

**Cenários automatizados:**

- Navegação até `Elements → Web Tables`.
- Criação de um novo registro e validação de sua presença na tabela.
- Edição do registro, alterando o departamento para `Quality Assurance`.
- Validação da alteração realizada.
- Exclusão do registro criado.
- Validação de que o registro excluído não aparece mais na página.

**Observação técnica:** durante a automação, foi utilizado `click({ force: true })` no botão de edição, pois o Cypress identificou outro elemento cobrindo o botão.

## Pré-requisitos

Para executar os testes, é necessário ter:

- Node.js e npm instalados.
- Google Chrome instalado.
- Conexão com a internet.

Não é necessário iniciar uma aplicação local, pois os testes acessam diretamente a aplicação e a API da DemoQA.

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/anapcavalcanti02-dot/accenture-qa-automation.git
```

### 2. Acessar a pasta do projeto

```bash
cd accenture-qa-automation
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar o teste de API

```bash
npm test
```

### 5. Executar o Practice Form

```bash
npx cypress run --browser chrome --spec "cypress/e2e/ui/practice-form.cy.js"
```

### 6. Executar o Web Tables

```bash
npx cypress run --browser chrome --spec "cypress/e2e/ui/web-tables.cy.js"
```

Os testes podem ser executados pelo terminal em modo headless, sem necessidade de interação manual com o navegador.

## Estrutura do projeto

```text
accenture-qa-automation/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── book-store-fluxo-completo.cy.js
│   │   └── ui/
│   │       ├── practice-form.cy.js
│   │       └── web-tables.cy.js
│   └── fixtures/
│       └── arquivo-upload.txt
├── evidencias/
│   └── practice-form-modal-close.mov
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```
