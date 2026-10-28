import { seletores } from './seletores.js'

export function preencherLogin(email, senha) {
  cy.visit('/login')
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoLogin).click()
}

export function verificarSeLoginFoiEfetuadoComSucesso() {
  cy.contains('.navbar-nav li', 'PGATS Aut')
  cy.get('.navbar-nav li')
    .contains('PGATS Aut')
    .should('be.visible')
}

export function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Your email or password is incorrect!')
    .and('contain.text', 'Your email or password is incorrect!')
}

export function efetuarLogout() {
  cy.get(seletores.logout).should('be.visible').click()
}

export function verificarSeOUsuarioFoiDeslogado() {
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href*="logout"]').should('not.exist')
  cy.get('[action*="login"]').should('be.visible');
  cy.url().should('include', 'login')
}