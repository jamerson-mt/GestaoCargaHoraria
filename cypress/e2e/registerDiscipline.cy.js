/// <reference types="cypress" />

describe('caso de teste com sucesso', () => {
  it('passa ao cadastrar nova disciplina', () => {
    cy.visit('http://localhost:5173');
    cy.get('.painel-dashboard > :nth-child(3)').click();
    cy.get('.filtro > button').click();
    cy.get('#name').type('Sistemas Operacionais');
    cy.get('#cursoId').select('TSI');
    cy.get('#periodo').clear().type('5');
    cy.get('#cargaHoraria').clear().type('80');
    cy.get('form > button').click();
    // Verifique se a disciplina foi cadastrada corretamente, por exemplo:
    cy.contains('Disciplina cadastrada com sucesso!').should('be.visible');
  });
});

describe('caso de teste com erro ao cadastrar a mesma disciplina', () => {
  it('falha ao tentar cadastrar disciplina duplicada', () => {
    cy.visit('http://localhost:5173');
    cy.get('.painel-dashboard > :nth-child(3)').click();
    cy.get('.filtro > button').click();
    cy.get('#name').type('web 1');
    cy.get('#cursoId').select('TSI');
    cy.get('#periodo').clear().type('5');
    cy.get('#cargaHoraria').clear().type('80');
    cy.get('form > button').click();

    // Verifique se uma mensagem de erro aparece
    cy.get('.erro').should('be.visible'); // Ou use um seletor específico para o erro

    // Capture a tela para referência
    cy.screenshot('erro-cadastro-disciplina');
  });
});
