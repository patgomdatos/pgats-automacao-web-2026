import { seletores } from './seletores.js'


export function confirmarPaginaProdutosComAllProducts() {
  cy.visit('/products')
  cy.get(seletores.allProducts)
    .should('exist')
    .should('be.visible')
    .and('contain.text', 'All Products')
}

export function confirmarListaDeProdutos() {
//features_items contem o titulo e a lista de produtos
//O teste verifica que a lista tem mais de 0 produtos
cy.get('.features_items .product-image-wrapper')
  .should('have.length.greaterThan', 0)
}

export function pesquisarProduto(nomeProduto) {
  cy.get(seletores.campoBusca).type(nomeProduto)
  cy.get(seletores.botaoBusca).click()
}

export function verificarSearchedProductsVisivel() {
  // Confirma que busca foi feita pelo titulo que aparece na pagina.
  cy.get(seletores.allProducts)
    .should('be.visible')
    .and('contain.text', 'Searched Products')
}

export function verificarDetalhesDoProduto() {
  cy.get(seletores.viewProducts).should('be.visible').click()
  cy.get(seletores.nomeProduto)
    .should('be.visible')
    .and('contain.text', 'Blue Top')
  cy.contains(seletores.informacoesProduto, /^Category:/)
    .should('be.visible')
    .and('contain.text', 'Women > Tops')
  cy.get(seletores.preco)
    .should('be.visible')
    .and('contain.text', 'Rs. 500')
  cy.contains(seletores.informacoesProduto, /^Availability:/)
    .should('be.visible')
    .and('contain.text', 'In Stock')
  cy.contains(seletores.informacoesProduto, /^Condition:/)
    .should('be.visible')
    .and('contain.text', 'New')
  cy.contains(seletores.informacoesProduto, /^Brand:/)
    .should('be.visible')
    .and('contain.text', 'Polo')
}

export function verificarProdutosPesquisados(nomeProduto) {
  cy.get(seletores.produtosListados)
    .should('have.length.greaterThan', 0)
    // Para cada produto listado, verifica se o nome do produto contém o texto da pesquisa
    .each(($produto) => {
      cy.wrap($produto)
        .find(seletores.nomeProdutoListado)
        .first()
        .should('be.visible')
        .invoke('text')
        .should('match', new RegExp(nomeProduto, 'i'))
    })
}