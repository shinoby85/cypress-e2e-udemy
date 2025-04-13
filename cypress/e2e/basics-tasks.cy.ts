describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=start-add-task-button]').click();
    cy.get('.backdrop').click({force: true});
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  })
})
