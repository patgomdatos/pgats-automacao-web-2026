/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/index')
const login = require('../modules/login/index')
const produtos = require('../modules/produtos/index')
const subscricao = require('../modules/subscricao/index')
const carrinho = require('../modules/carrinho/index')
import { gerarEmailAleatorio } from '../modules/utilitarios/geracaoDados'

describe('Automation Exercise', () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it('1 - Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    /** Iniciar Cadastro */
    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)
    /** Iniciar Cadastro */

    /** Preencher Cadastro */
    cy.fixture('dados/cadastro.json').then((usuario) => {
      cadastro.preencherCadastro(usuario)
      cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    })

  });

  it('2 - Efetuar Login de Usuário com email e senha corretos', () => {
    // ARRANGE
    /**
     * Ter uma conta para efetuar o Login
     * pgats-aut-test-1791030872114@mail.com / 12345
     */

    // acesso a página de login
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345')
    login.verificarSeLoginFoiEfetuadoComSucesso()

  });

  it('3 - Efetuar Login de Usuário email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '54321')
    login.verificarSeMensagemDeErroFoiExibidaNoLogin()
  });

  it('4 - Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345')
    login.efetuarLogout()
    login.verificarSeOUsuarioFoiDeslogado()

  });

  it('5 - Tentar cadastrar usuário com e-mail já cadastrado', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-1791030872114@mail.com`)
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
  });

    it('8 - Verificar pagina de todos os produtos e detalhe do produto', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href="/products"]').click()

    produtos.confirmarPaginaProdutosComAllProducts()
    produtos.confirmarListaDeProdutos()
    // Verifica product name, category, price, availability, condition, brand
    produtos.verificarDetalhesDoProduto()
  });

   it('9 - Busca de produtos', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href="/products"]').click()

    produtos.confirmarPaginaProdutosComAllProducts()
    produtos.pesquisarProduto('Winter Top')
    produtos.verificarSearchedProductsVisivel()
    produtos.verificarProdutosPesquisados('Winter Top')
  });

  it('10 - Verificar subscricao', () => {
    cy.visit('https://www.automationexercise.com')
    subscricao.verificarHomePageVisivel()

    subscricao.rolarAteRodape()
    subscricao.verificarTextoSubscription()
    subscricao.inscreverEmail(gerarEmailAleatorio())
    subscricao.verificarMensagemDeInscricaoComSucesso()
  });

  it('15 - Realizar pedido: Cadastrar antes do Checkout', () => {
    cy.visit('https://www.automationexercise.com')
    subscricao.verificarHomePageVisivel()
    cy.get('a[href*=login]').click()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)

    cy.fixture('dados/cadastro.json').then((usuario) => {
      cadastro.preencherCadastro(usuario)
      cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
      cadastro.continuarAposMensagem()
      carrinho.verificarUsuarioLogado('PGATS Aut')

      carrinho.adicionarProdutoAoCarrinho()
      carrinho.acessarCarrinho()
      carrinho.verificarPaginaDoCarrinho()
      carrinho.prosseguirParaCheckout()
      carrinho.verificarEnderecoERevisaoDoPedido(usuario)
    })

    cy.fixture('dados/pagamento.json').then((pagamento) => {
      carrinho.inserirComentarioEFazerPedido(pagamento.comentario)
      carrinho.preencherPagamento(pagamento)
      carrinho.confirmarPagamento()
      carrinho.verificarPedidoRealizadoComSucesso()
    })
  });
});

