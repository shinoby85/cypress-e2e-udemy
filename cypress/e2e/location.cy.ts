describe('share location', () => {
  beforeEach(() => {
    cy.clock();
    cy.fixture('user-location.json').as('userLocation');
    cy.visit('/').then(win => {
      cy.get('@userLocation').then(fakePosition => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      })

      cy.stub(win.navigator.clipboard, 'writeText')
        .as('saveToClipboard')
        .resolves();
      cy.spy(win.localStorage, 'setItem').as('setItemStorage');
      cy.spy(win.localStorage, 'getItem').as('getItemStorage');
    });
  })
  it('should fetch the user location', () => {

    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
  });

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called');
    cy.get('@userLocation').then(fakePosition => {
      const {latitude, longitude} = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`));
      cy.get('@setItemStorage').should(
        'have.been.calledWithMatch',
        /John Doe/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`));
    });
    cy.get("@setItemStorage").should('have.been.called');
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getItemStorage').should('have.been.called');
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });
});
