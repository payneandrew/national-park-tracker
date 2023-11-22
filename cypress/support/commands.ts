import '@testing-library/cypress/add-commands';

Cypress.Commands.add('findByDataCy', (selector: string) => {
  return cy.get(`[data-cy='${selector}']`);
});
