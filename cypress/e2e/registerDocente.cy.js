/// <reference types="cypress" />
describe('caso de teste com email e usuario valido', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/docentes')
    cy.get('.filtro > button').click()
    cy.get('#name').type('liliane')
    cy.get('#email').type('liliane@gmail.com')
    cy.get('form > button').click()
  })
})

describe('caso de teste com usuario correto e email duplicado', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/docentes')
    cy.get('.filtro > button').click()
    cy.get('#name').type('lilia')
    cy.get('#email').type('liliane@gmail.com')
    cy.get('form > button').click()
  })
})

describe('caso de teste com usuario correto email invalido', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/docentes')
    cy.get('.filtro > button').click()
    cy.get('#name').type('liliane')
    cy.get('#email').type('liliane@')
    cy.get('form > button').click()
  })
})
