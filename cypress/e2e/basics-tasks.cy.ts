describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=start-add-task-button]').click();
    cy.get('.backdrop').click({force: true});
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
    cy.get('[data-cy=start-add-task-button]').click();
    cy.get('form .actions').contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });

  it('should create a new task', () => {
    const testTitleText = 'New Title for task';
    const testDescriptionText = 'New Description for task';
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=start-add-task-button]').click();
    cy.get('#title').type(testTitleText);
    cy.get('#summary').type(testDescriptionText);
    cy.get('.modal').contains('Add Task').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains(testTitleText);
    cy.get('.task p').contains(testDescriptionText);
  });

  it('should validate user input', () => {
    const errorMessage = 'Please provide values for task title, summary and category!';
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=start-add-task-button]').click();
    cy.get('.modal').contains('Add Task').click();
    cy.contains(errorMessage);
  });
})
