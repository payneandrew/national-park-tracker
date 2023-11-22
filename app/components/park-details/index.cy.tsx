import { parks } from '@/mocks/parks';
import ParkDetails from '.';

describe('<ParkDetails />', () => {
  beforeEach(() => {
    cy.intercept('https://maps.googleapis.com/**', (req) => {
      req.reply({ statusCode: 200, body: {} });
    });
  });
  const parkData = parks.data[0];

  it('should render park details', () => {
    cy.mount(<ParkDetails park={parkData} />);
    cy.contains(parkData.fullName);
    cy.contains(parkData.directionsInfo);

    cy.contains(parkData.description);
    cy.contains(parkData.weatherInfo);

    parkData.activities.forEach((activity) => {
      cy.contains(activity.name);
    });

    parkData.entranceFees.forEach((fee) => {
      cy.contains(fee.title);
      cy.contains(`Cost: $${fee.cost}`);
      cy.contains(`Description: ${fee.description}`);
    });
  });

  it('should not render activities if no activities returned', () => {
    const noActivitiesData = { ...parks.data[0], activities: [] };
    cy.mount(<ParkDetails park={noActivitiesData} />);
    cy.findByText('activities').should('not.exist');

    parkData.activities.forEach((activity) => {
      cy.findByText(activity.name).should('not.exist');
    });
  });

  it('should not render entrance fees if no entrance fees returned', () => {
    const noFeesData = { ...parks.data[0], entranceFees: [] };
    cy.mount(<ParkDetails park={noFeesData} />);
    cy.findByText('activities').should('not.exist');

    parkData.entranceFees.forEach((fee) => {
      cy.findByText(fee.description).should('not.exist');
      cy.findByText(fee.cost).should('not.exist');
      cy.findByText(fee.title).should('not.exist');
    });
  });

  it('Should display images', () => {
    cy.mount(<ParkDetails park={parkData} />);

    parkData.images!.forEach((image) => {
      cy.findByAltText(image.altText).should('be.visible');
    });
  });

  it('Should not display images when none are returned', () => {
    const noImagesData = { ...parks.data[0], images: [] };
    cy.mount(<ParkDetails park={noImagesData} />);

    parkData.images!.forEach((image) => {
      cy.findByAltText(image.altText).should('not.exist');
    });
  });
});
