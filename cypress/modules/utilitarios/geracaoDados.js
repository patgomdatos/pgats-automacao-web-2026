export function gerarEmailAleatorio(prefixo = 'pgats-aut') {
  return `${prefixo}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@mail.com`
}