import '@testing-library/cypress/add-commands';

Cypress.Commands.add('findByDataCy', (selector: string) => {
  return cy.get(`[data-cy='${selector}']`);
});

Cypress.Commands.add(
  'interceptVisitedParksPostEndpoint',
  (statusCode = 201) => {
    return cy
      .intercept(
        'POST',
        `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/*`,
        (req) => {
          req.reply({ statusCode });
        }
      )
      .as('postPark');
  }
);

Cypress.Commands.add(
  'interceptVisitedParksDeleteEndpoint',
  (statusCode = 200) => {
    return cy
      .intercept(
        'DELETE',
        `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/*`,
        (req) => {
          req.reply({ statusCode });
        }
      )
      .as('deletePark');
  }
);
