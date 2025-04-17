describe('contact form', () => {
  it('should submit the form', () => {
    // const submitBtn = '[data-cy="contact-btn-submit"]';
    cy.visit('http://localhost:4200/about');
    cy.get('[data-cy="contact-input-message"').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');
    // cy.get(submitBtn).contains('Send Message');
    // cy.get(submitBtn).should('not.have.attr', 'disabled');
    // cy.get(submitBtn).click();
    // cy.get(submitBtn).contains('Sending...');
    // cy.get(submitBtn).should('have.attr', 'disabled');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').contains('Send Message');
    cy.get('@submitBtn').should('not.have.attr', 'disabled');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');

  })
})
