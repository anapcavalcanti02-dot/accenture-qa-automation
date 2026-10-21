
describe('Desafio API - Book Store', () => {
  it('Deve criar um usuário com sucesso', () => {
    const usuario = `qa${Date.now()}`
    const senha = 'Teste@12345'

    cy.request({
      method: 'POST',
      url: '/Account/v1/User',
      body: {
        userName: usuario,
        password: senha,
      },
    }).then((resposta) => {
      expect(resposta.status).to.eq(201)
      expect(resposta.body).to.have.property('userID')
      expect(resposta.body.username).to.eq(usuario)
      expect(resposta.body.books).to.be.an('array').that.is.empty
    })
  })
})
