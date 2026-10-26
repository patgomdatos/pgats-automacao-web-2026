import { seletores } from './seletores.js'

export function preencherLogin(email, senha) {
  cy.visit('/login')
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoLogin).click()
}

export function efetuarLogout() {
  cy.get(seletores.logout).should('be.visible').click()
}