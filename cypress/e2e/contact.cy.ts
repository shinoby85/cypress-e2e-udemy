describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about');
  })
  it('should submit the form', () => {
    // const submitBtn = '[data-cy="contact-btn-submit"]';
    cy.get('[data-cy="contact-input-message"').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-btn-submit"]').then(el => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text().trim()).to.eq('Send Message');
    });
    cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');

    // cy.get(submitBtn).contains('Send Message');
    // cy.get(submitBtn).should('not.have.attr', 'disabled');
    // cy.get(submitBtn).click();
    // cy.get(submitBtn).contains('Sending...');
    // cy.get(submitBtn).should('have.attr', 'disabled');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').contains(' Send Message ');
    cy.get('@submitBtn').should('not.have.attr', 'disabled');
    cy.submitForm();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');

  })

  it('should validate the form input', () => {
    cy.submitForm();
    cy.get('[data-cy="contact-btn-submit"]').then(element => {
      expect(element).to.not.have.attr('disabled');
      expect(element.text()).to.not.eq('Sending...');
    });
    cy.get('[data-cy="contact-btn-submit"]').contains(' Send Message ');
    cy.get('[data-cy="contact-input-message"]').focus().blur();
    cy.get('[data-cy="contact-input-message"]').parent().then(element => {
      expect(element.attr('class')).to.contain('invalid');
    });
    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]').parent().then(element => {
      expect(element.attr('class')).to.contain('invalid');
    });
    cy.get('[data-cy="contact-input-email"').focus().blur();
    // cy.get('[data-cy="contact-input-email"]').parent().then(element => {
    //   expect(element.attr('class')).to.contain('invalid');
    // });
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
  });
})
