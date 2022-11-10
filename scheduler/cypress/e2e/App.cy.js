describe('Test App', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })

  it('opens with Fall CS courses', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=course]').should('contain', 'Fall CS')
  })

  it('shows Winter courses when Winter is selected', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=Winter]').click()
    cy.get('[data-cy=course]').should('contain', 'Winter CS')
  })
})
