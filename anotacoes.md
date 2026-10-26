# Diretrizes de Modularização e Arquitetura dos Testes Cypress

## Contexto

Este projeto utiliza Cypress para automação de testes E2E.

Os testes devem ser modularizados de forma a separar claramente:

- Cenários e comportamento dos testes (spec);
- Ações de negócio da aplicação;
- Seletores dos elementos.

## Decisões de arquitetura e nomenclatura

- Assuma a solução de ações de negócio como esperada nas próximas refatorações.
- Não use a nomenclatura de "Pages" ou "Page Objects".
- Prefira algo mais próximo de "Ações de Negócio".
- Para a nomenclatura das funções que vão na Spec, use Português (BRL).
- Ao invés de Classes, prefira módulos com funções e `module.exports`.
- Seletores devem ficar separados da lógica de testes (spec), porém próximos das ações/funções.

## Estrutura de pastas

```
cypress/
├── e2e/
│   ├── automation-exercise.cy.js           (spec - versão sem modularização)
│   └── automation-exercise-modules.cy.js   (spec - versão modularizada)
├── modules/
│   └── cadastro/
│       └── index.js                        (ações de negócio: cadastro, login, logout)
├── fixtures/
│   └── users.json
└── support/
    ├── commands.js
    └── e2e.js
```

## Principais motivos de falhas (Automação de Testes Web)

- **Element Not Found** / Elemento Não Encontrado
- **Assertion Error** / Erro de Asserção
- **Command Timeout** / Comando atingiu o Tempo Limite
- **Cannot Read Property of Undefined** / Não é possível ler a propriedade de algo indefinido
- **cy.visit failed** / Falha no comando de acesso à aplicação

## Reaproveitamento e modularização

Funções reutilizáveis com parâmetros:

```
preencherLogin(email, senha)
preencherCadastro()
iniciarCadastro(nome, email)
```
