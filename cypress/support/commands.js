// ***********************************************
// Custom commands / comandos customizados
//
// Boa prática (Cypress docs):
// "Don't make everything a custom command".
// Comportamento específico de um único spec deve ser
// uma função; comandos customizados servem para
// comportamento reutilizável em TODOS os testes.
// ***********************************************

// comando existente
// cy.click()

// comandos customizados / custom commands
// Cypress.Commands.add('clickForFloatButton', () => { ... })
