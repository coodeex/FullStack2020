describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'juhax',
      name: 'Juuhan Lehti',
      password: 'salaisuus'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('At first the login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#Username').type('juhax')
      cy.get('#Password').type('salaisuus')
      cy.get('#login-button').click()

      cy.contains('Juuhan Lehti logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#Username').type('juhaxasdfgh')
      cy.get('#Password').type('salaisuusasdfgh')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Juuhan Lehti logged in')
    })
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'juhax', password: 'salaisuus'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  it('A blog can be created', function () {
    cy.contains('new Blog').click()
    cy.get('#Title').type('Testing if blog creation works')
    cy.get('#Author').type('Cypress-library')
    cy.get('#Url').type('https://www.cypress.io/')
    cy.get('#create-button').click()

    // cy.createBlog('Testing if blog creation works', 'Cypress-library', 'https://www.cypress.io/')

    cy.contains('Testing if blog creation works')
  })

  it('and the blog can be liked', function () {
    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('1')
  })
  
  it('and the blog can be deleted by user', function () {
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.get('html').should('not.contain', 'Testing if blog creation works')
  })

  it('three posts are made and given some likes', function () {
    cy.contains('new Blog').click()
    cy.get('#Title').type('first blog')
    cy.get('#Author').type('Cypress-library')
    cy.get('#Url').type('https://www.cypress.io/')
    cy.get('#create-button').click()
    
    cy.contains('new Blog').click()
    cy.get('#Title').type('second blog')
    cy.get('#Author').type('Cypress-library')
    cy.get('#Url').type('https://www.cypress.io/')
    cy.get('#create-button').click()
    
    cy.contains('new Blog').click()
    cy.get('#Title').type('third blog')
    cy.get('#Author').type('Cypress-library')
    cy.get('#Url').type('https://www.cypress.io/')
    cy.get('#create-button').click()
    
    cy.contains('view').click()
    cy.contains('view').click()
    cy.contains('view').click()
    
    // second blog gets 2 likes and third gets 1
    cy.contains('second blog Cypress-library').find('#Like').click()
    cy.contains('second blog Cypress-library').find('#Like').click()
    cy.contains('third blog Cypress-library').find('#Like').click()
  })

  it('the order of blogs is right', function () {
    cy.contains('view').click()
    cy.contains('view').click()
    cy.contains('view').click()
    //check that the order is right
    cy.get(':nth-child(6) > :nth-child(1)').contains('second blog')
    cy.get(':nth-child(6) > :nth-child(2)').contains('third blog')
    cy.get(':nth-child(6) > :nth-child(3)').contains('first blog')


  })

})

