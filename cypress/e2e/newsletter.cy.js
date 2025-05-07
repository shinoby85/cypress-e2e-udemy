 describe('Newsletter', ()=>{
   beforeEach(()=>{
     cy.task('seedDatabase');
   });

   it('should display a success message', () => {
     cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe');
     cy.visit('/');
     cy.get('[data-cy="newsletter-email"]').click();
     cy.get('[data-cy="newsletter-email"]').type('test@example.com');
     cy.get('[data-cy="newsletter-submit"]').click();
     cy.wait('@subscribe');
     cy.contains('Thanks for signing up!');
   });

   it('should display validation errors', () => {
     const httpErrorMessage = 'Email exists already.'
     cy.intercept('POST', '/newsletter*', { message: httpErrorMessage }).as('subscribe');
     cy.visit('/');
     cy.get('[data-cy="newsletter-email"]').type('test@example.com');
     cy.get('[data-cy="newsletter-submit"]').click();
     cy.wait('@subscribe');
     cy.contains(httpErrorMessage);
   });

   it('should successfully create a new contact', () => {
     cy.request({
       method: 'POST',
       url: '/newsletter',
       body: {email: 'test@example.com'},
       form: true
     }).then(resp=>{
       expect(resp.status).to.eq(201);
     })
   });
 })
