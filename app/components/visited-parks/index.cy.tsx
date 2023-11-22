import { parks } from '@/mocks/parks';
import VisitedParks from './index';

describe('<VisitedParks />', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${process.env.NEXT_PUBLIC_API_URL}/visited-parks`,
      (req) => {
        req.reply({
          statusCode: Cypress.env('statusCode') ?? 200,
          body: Cypress.env('body') ?? parks,
        });
      }
    );

    cy.mount(<VisitedParks />);
  });

  it('should display the park names', () => {
    parks.data.forEach(({ fullName }) => {
      cy.contains(fullName);
    });
  });

  it('should not show error message', () => {
    cy.contains('There was an error loading the parks.').should('not.exist');
  });

  it('should not show loading indicator', () => {
    cy.contains('Loading').should('not.exist');
  });
});
