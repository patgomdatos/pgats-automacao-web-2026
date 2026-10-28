import { seletores } from './seletores.js'

export function verificarUsuarioLogado(nome) {
  cy.get(seletores.usuarioLogado)
    .should('be.visible')
    .and('contain.text', `Logged in as ${nome}`)
}

export function adicionarProdutoAoCarrinho() {
  //Adiciona o primeiro produto ao carrinho e fecha o modal de confirmação
  cy.get(seletores.produtoCard).first().scrollIntoView().trigger('mouseover')
  cy.get(seletores.adicionarAoCarrinho).first().click({ force: true })
  cy.get(seletores.modalCarrinho).should('be.visible')
  cy.get(seletores.continuarComprando).click()
}

export function acessarCarrinho() {
  cy.get(seletores.linkCarrinho).click()
}

export function verificarPaginaDoCarrinho() {
  cy.url().should('include', '/view_cart')
  cy.get(seletores.itensCarrinho).should('have.length', 1)
}

export function prosseguirParaCheckout() {
  cy.get(seletores.proceedCheckout).click()
}

export function verificarEnderecoERevisaoDoPedido(usuario, quantidade = 1) {
  cy.get(seletores.enderecoEntrega)
    .should('be.visible')
    .and('contain.text', usuario.endereco)
    .and('contain.text', usuario.cidade)
  cy.get(seletores.enderecoFaturamento)
    .should('be.visible')
    .and('contain.text', usuario.endereco)
  cy.get(seletores.revisaoPedido).should('be.visible')
  cy.get(`${seletores.revisaoPedido} tbody tr[id^="product-"]`).should('have.length', quantidade)
}

export function inserirComentarioEFazerPedido(comentario) {
  cy.get(seletores.comentario).type(comentario)
  cy.get(seletores.placeOrder).click()
}

export function preencherPagamento(pagamento) {
  cy.url().should('include', '/payment')
  cy.get(seletores.nomeCartao).type(pagamento.nome)
  cy.get(seletores.numeroCartao).type(pagamento.numero)
  cy.get(seletores.cvc).type(pagamento.cvc)
  cy.get(seletores.mesExpiracao).type(pagamento.mes)
  cy.get(seletores.anoExpiracao).type(pagamento.ano)
}

export function confirmarPagamento() {
  cy.get(seletores.pagarConfirmar).click()
}

export function verificarPedidoRealizadoComSucesso() {
  cy.url().should('include', '/payment_done')
  cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!')
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
}
