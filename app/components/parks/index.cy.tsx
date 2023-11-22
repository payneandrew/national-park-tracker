import { parks } from '@/mocks/parks';
import Parks from './index';

describe('<Parks />', () => {
  beforeEach(() => {
    cy.intercept('GET', `${process.env.NEXT_PUBLIC_API_URL}/parks/*`, parks).as(
      'getParks'
    );

    cy.intercept('POST', `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/*`, {
      statusCode: 201,
    }).as('postPark');

    cy.intercept(
      'DELETE',
      `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/*`,
      { statusCode: 200 }
    ).as('deletePark');
    cy.mount(<Parks stateCode="test" />);
  });

  it('should render park data', () => {
    cy.wait('@getParks');
    parks.data.forEach(({ fullName, description }) => {
      cy.contains(fullName);
      cy.contains(description);
    });
  });

  it('Should be able to post a park', () => {
    cy.findByDataCy('add-remove-park-button').first().click();
    cy.wait('@postPark');
    cy.contains('Parked added to the list!').should('be.visible');
  });

  it('Should be able to delete a park', () => {
    cy.findByDataCy('add-remove-park-button').eq(1).click();
    cy.wait('@deletePark');
    cy.contains('Parked removed from the list').should('be.visible');
  });

  it('Should display images', () => {
    parks.data.forEach(({ images }) => {
      cy.findByAltText(images![0].altText).should('be.visible');
    });
  });
});
