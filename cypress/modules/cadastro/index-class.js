
const dadosCadastro = require('../../fixtures/dados/cadastro.json')

class Cadastro {


  iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)

  cy.get('[data-qa="signup-button"]').click()
}

preencherCadastro() {
  // radio buttons -> check
  cy.get('#id_gender2').check()

  cy.get('[data-qa="password"]').type('12345')

  // Selects e Comboboxes -> select
  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('September')
  cy.get('[data-qa="years"]').select('1990')

  // checkboxes -> check
  cy.get('#newsletter').check()
  cy.get('#optin').check()

  cy.get('[data-qa="first_name"]').type('PGATS')
  cy.get('[data-qa="last_name"]').type('Aut')
  cy.get('[data-qa="company"]').type('PGATS')
  cy.get('[data-qa="address"]').type('Example Address')

  cy.get('[data-qa="country"]').select('United States')
  cy.get('[data-qa="state"]').type('California')
  cy.get('[data-qa="city"]').type('San Francisco')
  cy.get('[data-qa="zipcode"]').type('12345')

  cy.get('[data-qa="mobile_number"]').type('999999999')

  cy.get('[data-qa="create-account"]').click()
}

verificarSeCadastroFoiEfetuadoComSucesso() {
  cy.get('[data-qa="create-account"]').click()
  cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!')
}

verificarSeMensagemDeCadastroExistenteFoiExibida() {
  cy.get('form[action*=signup] p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Email Address already exist!')
    .and('contain.text', 'Email Address already exist!')
}

// LOGIN

preencherLogin(email, senha) {
  // ACT
  // cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
  // cy.get('[data-qa="login-password"]').type('12345')
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)

  cy.get('[data-qa="login-button"]').click()
}

verificarSeLoginFoiEfetuadoComSucesso() {
  cy.get('a[href*="logout"]').should('be.visible')
  cy.get('li').contains('Logged in as').should('be.visible')
}

verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Your email or password is incorrect!')
    .and('contain.text', 'Your email or password is incorrect!')
}

// LOGOUT

efetuarLogout() {
  cy.get('a[href*="logout"]')
    .should('be.visible')
    .click()
}

verificarSeOUsuarioFoiDeslogado() {
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href*="logout"]').should('not.exist')
  cy.get('[action*="login"]').should('be.visible')
  cy.url().should('include', 'login')

  // https://www.automationexercise.com/login -> 'login'
  }

}

export default Cadastro();
