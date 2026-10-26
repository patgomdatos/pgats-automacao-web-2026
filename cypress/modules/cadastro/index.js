import { seletores } from './seletores.js'

export function iniciarCadastro(nome, email) {
  cy.visit('/login')
  cy.get(seletores.signupNome).type(nome)
  cy.get(seletores.signupEmail).type(email)
  cy.get(seletores.signupBotao).click()
}

export function preencherCadastro(usuario) {
  cy.get(seletores.genero).check()
  cy.get(seletores.senha).type(usuario.senha)
  cy.get(seletores.dia).select(usuario.dia)
  cy.get(seletores.mes).select(usuario.mes)
  cy.get(seletores.ano).select(usuario.ano)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.optin).check()
  cy.get(seletores.nome).type(usuario.nome)
  cy.get(seletores.sobrenome).type(usuario.sobrenome)
  cy.get(seletores.empresa).type(usuario.empresa)
  cy.get(seletores.endereco).type(usuario.endereco)
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.estado).type(usuario.estado)
  cy.get(seletores.cidade).type(usuario.cidade)
  cy.get(seletores.cep).type(usuario.cep)
  cy.get(seletores.telefone).type(usuario.telefone)
  cy.get(seletores.criarConta).click()
}

export function verificarSeCadastroFoiEfetuadoComSucesso() {
  cy.get(seletores.contaCriada)
    .should('be.visible')
    .and('contain', 'Account Created!')
}

export function continuarAposMensagem() {
  cy.get(seletores.continuar).click()
}

export function excluirConta() {
  cy.get(seletores.excluirConta).click()
}
