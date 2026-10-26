/// <reference types="cypress" />

describe('Automation Exercise', () => {
    const password = '12345'

    const registroUsuario = (email) => {
        cy.visit('/signup')
        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS Aut')
        cy.xpath('//*[@data-qa="signup-email"]').type(email)
        cy.xpath('//*[@data-qa="signup-button"]').click()
        cy.xpath('//*[@id="id_gender2"]').check()
        cy.xpath('//*[@data-qa="password"]').type(password)
        cy.xpath('//*[@data-qa="days"]').select('14')
        cy.xpath('//*[@data-qa="months"]').select('November')
        cy.xpath('//*[@data-qa="years"]').select('1986')
        cy.xpath('//*[@id="newsletter"]').check()
        cy.xpath('//*[@id="optin"]').check()
        cy.xpath('//*[@data-qa="first_name"]').type('PGATS')
        cy.xpath('//*[@data-qa="last_name"]').type('Aut')
        cy.xpath('//*[@data-qa="company"]').type('PGATS')
        cy.xpath('//*[@data-qa="address"]').type('Example Address')
        cy.xpath('//*[@data-qa="country"]').select('United States')
        cy.xpath('//*[@data-qa="state"]').type('California')
        cy.xpath('//*[@data-qa="city"]').type('San Francisco')
        cy.xpath('//*[@data-qa="zipcode"]').type('12345')
        cy.xpath('//*[@data-qa="mobile_number"]').type('999999999')
        cy.xpath('//*[@data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
        cy.contains('Logged in as PGATS Aut').should('be.visible')
    }

    it('01 - Registro de usuário', () => {
        const email = `patricia.silva${Date.now()}@mail.com`

        registroUsuario(email)
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('02 - Login do usuario com email e senha corretos', () => {
        const email = `patricia.silva${Date.now()}@mail.com`

        registroUsuario(email)
        cy.xpath('//a[contains(@href, "logout")]').click()
        cy.visit('/login')
        cy.url().should('include', '/login')
        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(password)
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.contains('Logged in as PGATS Aut').should('be.visible')

        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('03 - Login de usuario com e-mail e senha incorretos', () => {
        cy.visit('/login')
        cy.url().should('include', '/login')
        cy.xpath('//*[@data-qa="login-email"]').type(`invalid-${Date.now()}@mail.com`)
        cy.xpath('//*[@data-qa="login-password"]').type('senha-incorreta')
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('04 - Logout do Usuário', () => {
        const email = `patricia.silva-${Date.now()}@mail.com`

        registroUsuario(email)
        cy.xpath('//a[contains(@href, "logout")]').click()
        cy.visit('/login')
        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')

        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(password)
        cy.xpath('//*[@data-qa="login-button"]').click()
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('05: Cadastrar usuário com um email que já existe', () => {
        const email = `patricia.silva${Date.now()}@mail.com`

        registroUsuario(email)
        cy.xpath('//a[contains(@href, "logout")]').click()
        cy.visit('/signup')
        cy.url().should('include', '/signup')
        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS Aut')
        cy.xpath('//*[@data-qa="signup-email"]').type(email)
        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.contains('Email Address already exist!').should('be.visible')

        cy.visit('/login')
        cy.url().should('include', '/login')
        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(password)
        cy.xpath('//*[@data-qa="login-button"]').click()
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })
}); 