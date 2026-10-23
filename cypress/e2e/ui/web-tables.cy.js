describe("Desafio Accenture - Web Tables", () => {
  it("Deve criar, editar e excluir um registro", () => {
    // Acessa a página inicial
    cy.visit("/");

    // Escolhe a opção Elements
    cy.contains("Elements").click();

    // Acessa o submenu Web Tables
    cy.contains("Web Tables").click();

    // Clica para adicionar um novo registro
    cy.get("#addNewRecordButton").click();

    // Preenche os campos do formulário
    cy.get("#firstName").type("Ana");
    cy.get("#lastName").type("Rachel");
    cy.get("#userEmail").type("ana.teste@example.com");
    cy.get("#age").type("33");
    cy.get("#salary").type("5000");
    cy.get("#department").type("QA");

    // Salva o registro
    cy.get("#submit").click();

    // Valida se o registro foi criado
    cy.contains("ana.teste@example.com").should("be.visible");

    // Localiza o registro pelo e-mail e clica em Edit
    cy.contains("td", "ana.teste@example.com")
      .parent("tr")
      .find('[title="Edit"]')
      .click({ force: true });

    // Altera o departamento
    cy.get("#department").clear();
    cy.get("#department").type("Quality Assurance");

    // Salva a alteração
    cy.get("#submit").click();

    // Valida a alteração
    cy.contains("ana.teste@example.com").should("be.visible");
    cy.contains("Quality Assurance").should("be.visible");


    // Exclui o registro criado
    cy.contains("td", "ana.teste@example.com")
      .parent("tr")
      .find('[title="Delete"]')
      .click({ force: true });

    // Confirma que o registro foi excluído
    cy.contains("ana.teste@example.com").should("not.exist");

  });
});
