
describe('Desafio Accenture - Book Store API', () => {
  const usuario = `qa${Date.now()}`
  const senha = 'Teste@12345'

  let userId
  let token
  let livrosEscolhidos = []

  after(() => {
    // Limpar o usuário criado durante o teste
    if (userId && token) {
      cy.request({
        method: 'DELETE',
        url: `/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
        log: false,
      })
    }
  })

  it('Deve executar todas as etapas do desafio em sequência', () => {
    // 1. Criar usuário
    cy.log('Etapa 1: Criar usuário')

    cy.request({
      method: 'POST',
      url: '/Account/v1/User',
      body: {
        userName: usuario,
        password: senha,
      },
    }).then((resposta) => {
      expect(resposta.status).to.eq(201)
      expect(resposta.body.userID).to.be.a('string').and.not.be.empty
      expect(resposta.body.username).to.eq(usuario)
      expect(resposta.body.books).to.be.an('array').that.is.empty

      userId = resposta.body.userID
    })

    // 2. Gerar token
    cy.log('Etapa 2: Gerar token')

    cy.then(() => {
      return cy.request({
        method: 'POST',
        url: '/Account/v1/GenerateToken',
        body: {
          userName: usuario,
          password: senha,
        },
      })
    }).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.status).to.eq('Success')
      expect(resposta.body.token).to.be.a('string').and.not.be.empty

      token = resposta.body.token
    })

    // 3. Validar autorização
    cy.log('Etapa 3: Validar autorização')

    cy.then(() => {
      return cy.request({
        method: 'POST',
        url: '/Account/v1/Authorized',
        body: {
          userName: usuario,
          password: senha,
        },
      })
    }).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body).to.eq(true)
    })

    // 4. Listar livros disponíveis
    cy.log('Etapa 4: Listar livros')

    cy.request({
      method: 'GET',
      url: '/BookStore/v1/Books',
    }).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.books).to.be.an('array').with.length.greaterThan(1)

      livrosEscolhidos = resposta.body.books.slice(0, 2)

      expect(livrosEscolhidos).to.have.length(2)
      expect(livrosEscolhidos[0].isbn).not.to.eq(livrosEscolhidos[1].isbn)

      livrosEscolhidos.forEach((livro) => {
        expect(livro.isbn).to.be.a('string').and.not.be.empty
        expect(livro.title).to.be.a('string').and.not.be.empty
      })
    })

    // 5. Reservar dois livros
    cy.log('Etapa 5: Reservar dois livros')

    cy.then(() => {
      return cy.request({
        method: 'POST',
        url: '/BookStore/v1/Books',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          userId,
          collectionOfIsbns: livrosEscolhidos.map((livro) => ({
            isbn: livro.isbn,
          })),
        },
      })
    }).then((resposta) => {
      expect(resposta.status).to.eq(201)
      expect(resposta.body.books).to.be.an('array').with.length(2)

      const isbnsReservados = resposta.body.books.map((livro) => livro.isbn)

      livrosEscolhidos.forEach((livro) => {
        expect(isbnsReservados).to.include(livro.isbn)
      })
    })

    // 6. Consultar usuário e validar livros
    cy.log('Etapa 6: Consultar usuário e livros reservados')

    cy.then(() => {
      return cy.request({
        method: 'GET',
        url: `/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.username).to.eq(usuario)
      expect(resposta.body.books).to.be.an('array').with.length(2)

      livrosEscolhidos.forEach((livro) => {
        const reservado = resposta.body.books.find(
          (item) => item.isbn === livro.isbn
        )

        expect(reservado, `Livro reservado: ${livro.title}`).to.exist
        expect(reservado.title).to.eq(livro.title)
      })
    })
  })
})
