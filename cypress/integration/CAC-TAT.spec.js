/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.visit("./src/index.html");

    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preencha os campos obrigatórios e envia o formulário", function () {
    const longText =
      "teste, teste, teste, teste, teste, teste, teste, teste, teste, testeteste, teste, teste, teste, testeteste, teste, teste, teste, testeteste, teste, teste, teste, teste";

    cy.get("#firstName").type("Amanda");
    cy.get("#lastName").type("De Carli");
    cy.get("#email").type("amandadecarli@outlook.com");
    cy.get("#phone").type("51991400000");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação", function () {
    cy.get("#firstName").type("Amanda");
    cy.get("#lastName").type("De Carli");
    cy.get("#email").type("amandadecarli.com");
    cy.get("#phone").type("51991400000");
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido quando não numérico", function () {
    cy.get("#phone").type("abcdfghhjk").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Amanda");
    cy.get("#lastName").type("De Carli");
    cy.get("#email").type("amandadecarli@outlook.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Amanda")
      .should("have.value", "Amanda")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("De Carli")
      .should("have.value", "De Carli")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("amandadecarli@outlook.com")
      .should("have.value", "amandadecarli@outlook.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("51991400000")
      .should("have.value", "51991400000")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit(
      "Amanda",
      "De Carli",
      "amanda@outlook.com",
      "teste"
    );
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (Youtube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it.only("", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });
});
