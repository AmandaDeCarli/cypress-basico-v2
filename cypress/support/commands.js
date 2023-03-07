Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  function (nome, sobrenome, email, textoLongo) {
    cy.get("#firstName").type(nome);
    cy.get("#lastName").type(sobrenome);
    cy.get("#email").type(email);
    cy.get("#open-text-area").type(textoLongo);
    cy.get('button[type="submit"]').click();
  }
);
