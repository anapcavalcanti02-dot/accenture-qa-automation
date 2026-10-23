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



# Desafio QA Automation — Accenture

Projeto desenvolvido para o desafio de QA Automation, utilizando JavaScript e Cypress para automatizar testes de API e de interface (Frontend) na aplicação DemoQA.

## Tecnologias utilizadas

- JavaScript
- Cypress
- Node.js
- Google Chrome

## Parte 1 — API Testing

**Arquivo:** `cypress/e2e/api/book-store-fluxo-completo.cy.js`

O teste automatiza um fluxo contínuo de API, incluindo:

- Criação de usuário.
- Geração de token de autenticação.
- Validação da autenticação.
- Consulta dos livros disponíveis.
- Seleção de dois livros.
- Reserva dos livros para o usuário.
- Consulta do usuário e validação dos livros associados.
- Limpeza dos dados de teste, quando possível.

A execução é realizada com Cypress, sem depender do Postman para executar o fluxo automatizado.



## Parte 2 — Frontend Testing

Os testes de interface simulam interações do usuário e validam os comportamentos da aplicação DemoQA.

### 1. Practice Form

**Arquivo:** `cypress/e2e/ui/practice-form.cy.js`

**Objetivo:** validar o preenchimento e o envio do formulário.

#### Etapas automatizadas

- Acesso à página inicial e navegação até Practice Form.
- Preenchimento dos campos com dados aleatórios.
- Seleção de gênero, data de nascimento, matéria, hobby, estado e cidade.
- Upload do arquivo `arquivo-upload.txt`.
- Envio do formulário.
- Validação da exibição do modal de confirmação.
- Validação dos dados apresentados no modal.
- Validação do fechamento do modal.

#### Comportamento observado durante o teste manual

Durante a execução manual, foi observado que o botão **Close** do modal não fechou a janela. Ao clicar fora da área do modal, ele foi fechado.

No teste automatizado, foi utilizado o clique fora do modal, seguido da validação de que o elemento não existe mais no DOM.

Esse comportamento foi documentado como uma observação de teste, sem classificá-lo como defeito confirmado da aplicação.

### 2. Web Tables

**Arquivo:** `cypress/e2e/ui/web-tables.cy.js`

**Objetivo:** validar as operações de criação, edição e exclusão de registros.

#### Etapas automatizadas

- Acesso à página inicial do DemoQA.
- Navegação por **Elements → Web Tables**.
- Criação de um novo registro.
- Validação da presença do registro na tabela.
- Edição do registro criado, alterando o departamento para `Quality Assurance`.
- Validação da alteração realizada.
- Exclusão do registro criado.
- Validação de que o registro excluído não aparece mais na página.

#### Observação técnica

Durante a automação, foi necessário utilizar `click({ force: true })` no botão de edição, pois o Cypress identificou outro elemento cobrindo o botão. A abordagem foi utilizada para permitir a interação com o elemento selecionado.

## Como executar os testes

### Executar o teste de API

```bash
npm test
```

### Executar o Practice Form

```bash
npx cypress run --browser chrome --spec "cypress/e2e/ui/practice-form.cy.js"
```

### Executar o Web Tables

```bash
npx cypress run --browser chrome --spec "cypress/e2e/ui/web-tables.cy.js"
```

## Estrutura do projeto

```text
cypress/
├── e2e/
│   ├── api/
│   │   └── book-store-fluxo-completo.cy.js
│   └── ui/
│       ├── practice-form.cy.js
│       └── web-tables.cy.js
└── fixtures/
    └── arquivo-upload.txt
```

## Evidências de teste

As evidências podem incluir capturas de tela, vídeos curtos e resultados de execução do Cypress, demonstrando os comportamentos observados e os resultados dos testes.

### Practice Form — Comportamento do botão Close

**Resultado observado:** o botão Close não fechou o modal durante a execução manual; o clique fora da janela fechou o modal.

- Evidência em vídeo: adicionar link após publicar o vídeo.
- Resultado esperado: o modal deve fechar após a interação prevista pelo comportamento da aplicação.
- Resultado observado: o fechamento ocorreu ao clicar fora do modal.

## Próximos cenários

- **Progress Bar:** validar a interrupção antes de 25%, a conclusão até 100% e o reset.
- **Sortable:** automatizar a ordenação dos itens por meio de arrastar e soltar.

Esses cenários ainda não foram implementados.

## Considerações finais

O projeto demonstra a aplicação de automação de testes de API e interface com Cypress, incluindo validações, interações com elementos visuais, operações CRUD em tabelas e documentação de comportamentos observados durante os testes.




