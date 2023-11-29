import { parks } from '@/mocks/parks';
import Parks from './index';

describe('<Parks />', () => {
  beforeEach(() => {
    cy.intercept('GET', `${process.env.NEXT_PUBLIC_API_URL}/parks/*`, parks).as(
      'getParks'
    );
  });

  it('should render park data', () => {
    cy.mount(<Parks stateCode="test" />);
    cy.wait('@getParks');
    parks.data.forEach(({ fullName, description }) => {
      cy.contains(fullName);
      cy.contains(description);
    });
  });

  it('Should be able to post a park', () => {
    cy.interceptVisitedParksPostEndpoint(201);
    cy.mount(<Parks stateCode="test" />);
    cy.findByDataCy('add-remove-park-button').first().click();
    cy.wait('@postPark');
    cy.contains('Parked added to the list!').should('be.visible');
  });

  it('Should be able to delete a park', () => {
    cy.interceptVisitedParksDeleteEndpoint(200);
    cy.mount(<Parks stateCode="test" />);
    cy.findByDataCy('add-remove-park-button').eq(1).click();
    cy.wait('@deletePark');
    cy.contains('Parked removed from the list').should('be.visible');
  });

  it('Should display images', () => {
    cy.mount(<Parks stateCode="test" />);
    parks.data.forEach(({ images }) => {
      cy.findByAltText(images![0].altText).should('be.visible');
    });
  });

  it('Should show error state when adding park', () => {
    cy.interceptVisitedParksPostEndpoint(500);
    cy.mount(<Parks stateCode="test" />);
    cy.findByDataCy('add-remove-park-button').first().click();
    cy.wait('@postPark');
    cy.contains('There was an unexpected error').should('be.visible');
  });

  it('Should show error state when deleting a park', () => {
    cy.interceptVisitedParksDeleteEndpoint(500);
    cy.mount(<Parks stateCode="test" />);
    cy.findByDataCy('add-remove-park-button').eq(1).click();
    cy.wait('@deletePark');
    cy.contains('There was an unexpected error').should('be.visible');
  });
});
