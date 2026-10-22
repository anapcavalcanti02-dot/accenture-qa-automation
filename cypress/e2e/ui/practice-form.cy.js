describe("Desafio Accenture - Practice Form", () => {
  it("Deve preencher os dados principais do formulário", () => {
    cy.visit("/automation-practice-form");

    // Gera dados aleatórios para o formulário
    const numeroAleatorio = Date.now();

    const dados = { 
      nome: `Ana${numeroAleatorio}`,
      sobrenome: `Teste${numeroAleatorio}`,
      email: `ana${numeroAleatorio}@example.com`,
      celular: String(Math.floor(1000000000 + Math.random() * 9000000000)),
      endereco: `Rua de Teste, ${Math.floor(Math.random() * 999) + 1}`,
    };

    // Preenche os campos de texto
    cy.get("#firstName").type(dados.nome);
    cy.get("#lastName").type(dados.sobrenome);
    cy.get("#userEmail").type(dados.email);
    cy.get("#userNumber").type(dados.celular);
    cy.get("#currentAddress").type(dados.endereco);

    // Seleciona o gênero
    cy.get("#gender-radio-2").check({ force: true });

    // Preenche a data de nascimento
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select("1993");
    cy.get(".react-datepicker__month-select").select("4");
    cy.get(
      ".react-datepicker__day--015:not(.react-datepicker__day--outside-month)",
    ).click();

    // Seleciona o hobby Reading
    cy.get("#hobbies-checkbox-2").check({ force: true });

    // Faz upload do arquivo de teste
    cy.get("#uploadPicture").selectFile("cypress/fixtures/arquivo-upload.txt");

    // Seleciona o estado
    cy.get("#state").click();
    cy.get("#react-select-3-option-0").click();

    // Seleciona a cidade
    cy.get("#city").click();
    cy.get("#react-select-4-option-0").click();

    // Envia o formulário
    cy.get("#submit").click({ force: true });

    // Valida o modal de confirmação
    cy.get("#example-modal-sizes-title-lg")
      .should("be.visible")
      .and("contain.text", "Thanks for submitting the form");

    // Fecha o modal clicando fora da janela
    cy.get("body").click(10, 10);

    // Confirma que o modal foi fechado
    cy.get("#example-modal-sizes-title-lg").should("not.exist");

    // Valida os dados preenchidos
    cy.get("#firstName").should("have.value", dados.nome);
    cy.get("#lastName").should("have.value", dados.sobrenome);
    cy.get("#userEmail").should("have.value", dados.email);
    cy.get("#userNumber").should("have.value", dados.celular);
    cy.get("#currentAddress").should("have.value", dados.endereco);

    cy.get("#gender-radio-2").should("be.checked");
    cy.get("#hobbies-checkbox-2").should("be.checked");
    cy.get("#dateOfBirthInput").should("have.value", "15 May 1993");
  });
});
