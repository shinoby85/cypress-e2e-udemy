describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:4200');
    cy.get('.main-header img');
    cy.get('.main-header').find('img');

  });
  it('should display the page title', () => {
    cy.visit('http://localhost:4200');
    cy.get('h1').should('have.length', 1);
    cy.get('.main-header h1').should('have.text', "Angular Tasks");
    cy.get('.main-header h1').contains("Angular Tasks");
    cy.contains('Angular Tasks');

  });
})
