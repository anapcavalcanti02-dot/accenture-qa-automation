
describe("Desafio Accenture - Practice Form", () => {
  it("Deve preencher o formulário com dados aleatórios", () => {
    cy.visit("/automation-practice-form");

    // Gera dados aleatórios para o formulário
    const numeroAleatorio = Date.now();

    const materias = ["Maths", "English", "Physics", "Chemistry"];
    const estados = [
      { nome: "NCR", cidades: ["Delhi"] },
      { nome: "Uttar Pradesh", cidades: ["Agra", "Lucknow", "Merrut"] },
      { nome: "Haryana", cidades: ["Karnal", "Panipat"] },
      { nome: "Rajasthan", cidades: ["Jaipur", "Jaiselmer"] },
    ];

    const estadoEscolhido =
      estados[Math.floor(Math.random() * estados.length)];

    const cidadeEscolhida =
      estadoEscolhido.cidades[
        Math.floor(Math.random() * estadoEscolhido.cidades.length)
      ];

    const dados = {
      nome: `Ana${numeroAleatorio}`,
      sobrenome: `Teste${numeroAleatorio}`,
      email: `ana${numeroAleatorio}@example.com`,
      celular: String(
        Math.floor(1000000000 + Math.random() * 9000000000)
      ),
      endereco: `Rua de Teste, ${Math.floor(Math.random() * 999) + 1}`,
      genero: Math.floor(Math.random() * 3) + 1,
      ano: Math.floor(Math.random() * 16) + 1990,
      mes: Math.floor(Math.random() * 12),
      dia: Math.floor(Math.random() * 28) + 1,
      hobby: Math.floor(Math.random() * 3) + 1,
      materia: materias[Math.floor(Math.random() * materias.length)],
      estado: estadoEscolhido.nome,
      cidade: cidadeEscolhida,
    };

    // Preenche os campos de texto
    cy.get("#firstName").type(dados.nome);
    cy.get("#lastName").type(dados.sobrenome);
    cy.get("#userEmail").type(dados.email);
    cy.get("#userNumber").type(dados.celular);
    cy.get("#currentAddress").type(dados.endereco);

    // Seleciona o gênero aleatório
    cy.get(`#gender-radio-${dados.genero}`).check({ force: true });

    // Preenche a data de nascimento aleatória
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select(String(dados.ano));
    cy.get(".react-datepicker__month-select").select(String(dados.mes));

    cy.get(
      `.react-datepicker__day--${String(dados.dia).padStart(3, "0")}:not(.react-datepicker__day--outside-month)`
    ).click();

    // Seleciona uma matéria aleatória
    cy.get("#subjectsInput").type(dados.materia);
    cy.contains(".subjects-auto-complete__option", dados.materia).click();

    // Seleciona um hobby aleatório
    cy.get(`#hobbies-checkbox-${dados.hobby}`).check({ force: true });

    // Faz upload do arquivo de teste
    cy.get("#uploadPicture").selectFile(
      "cypress/fixtures/arquivo-upload.txt"
    );

    // Seleciona o estado aleatório
    cy.get("#state").click();
    cy.contains("#state div", dados.estado).click();

    // Seleciona a cidade correspondente ao estado
    cy.get("#city").click();
    cy.contains("#city div", dados.cidade).click();

    // Envia o formulário
    cy.get("#submit").click({ force: true });

    // Valida o modal de confirmação
    cy.get("#example-modal-sizes-title-lg")
      .should("be.visible")
      .and("contain.text", "Thanks for submitting the form");

    // Valida alguns dos dados exibidos no modal
    cy.get(".table-responsive")
      .should("contain.text", dados.nome)
      .and("contain.text", dados.sobrenome)
      .and("contain.text", dados.email)
      .and("contain.text", dados.materia)
      .and("contain.text", dados.estado)
      .and("contain.text", dados.cidade);

    // Fecha o modal clicando fora da janela
    cy.get("body").click(10, 10);

    // Confirma que o modal foi removido do DOM
    cy.get("#example-modal-sizes-title-lg").should("not.exist");
  });
});
