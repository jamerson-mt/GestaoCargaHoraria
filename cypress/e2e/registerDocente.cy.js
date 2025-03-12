/// <reference types="cypress" />
describe('template register Docente', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/docentes')
    cy.get('.filtro > button').click()
    cy.get('#name').type('pedro')
    cy.get('#email').type('pedro@gmail.com')
    cy.get('form > button').click()
  })
})
