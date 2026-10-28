import { seletores } from './seletores.js'

export function verificarHomePageVisivel() {
  //Valida que o carrossel aparece
  cy.get(seletores.homePage).should('be.visible')
}

export function rolarAteRodape() {
  cy.get(seletores.rodape).scrollIntoView()
}

export function verificarTextoSubscription() {
  cy.get(seletores.tituloSubscricao)
    .should('be.visible')
    .and('contain.text', 'Subscription')
}

export function inscreverEmail(email) {
  cy.get(seletores.campoEmail).type(email)
  cy.get(seletores.botaoInscrever).click()
}

export function verificarMensagemDeInscricaoComSucesso() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!')
}
