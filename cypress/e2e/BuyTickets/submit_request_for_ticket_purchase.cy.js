/// <reference types="Cypress" />

const departureDate = new Date();
const returnDate = new Date();

const departureCity = 'Lagos'
const arrivalCity = 'Porto - Campanha'

/**
 * @param {!Date} d
 */
function formatDateForInput(d) {
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * @param {!Date} d
 */
function formatDateForVerification(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

describe('Submit Request for Ticket Purchase', () => {

  beforeEach(() => {
    // Navigate to the buy-tickets
    cy.visit('/buy-tickets');
  })

  it('Enter and validate ticket parameters', () => {

    // Enter Departure City 
    cy.findByTitle('From').type(departureCity);
    // Selecting the city from the dropdown
    cy.findAllByText(departureCity).click();

    // Enter Arrival City 
    cy.findByTitle("To").type(arrivalCity);
    // Selecting the city from the dropdown
    cy.contains(arrivalCity).click();

    // Set departing date to 3 days from today
    departureDate.setDate(departureDate.getDate() + 3);

    // Enter Departure Date
    cy.findByPlaceholderText('Date').clear().type(formatDateForInput(departureDate)).type('{enter}');

    // Set arrival date to 5 days from today
    returnDate.setDate(returnDate.getDate() + 5);

    // Enter Return Date
    // There has been a bug with cypress that resets the value to todays date when the return date is set. 
    // cy.findByPlaceholderText('Return date').clear().type(formatDateForInput(returnDate)).type('{enter}');

    // To overcome the bug, I have set the value in the dom object directly which is used for the submit request
    // Dom sets the date in "YYYY - MM - DD". 
    cy.get("input[name=textBoxDataVolta]").then(el => el.val(formatDateForVerification(returnDate)));

    // Submit the search with the entered ticket parameters
    cy.contains('Submit').click();

    // Increasing default pageLoadTimeout. This is required as the dom has been modified to set the return date
    Cypress.config('pageLoadTimeout', 100000);

    // Scroll to bottom of results page
    cy.scrollTo('bottom');

    const baseUrl = Cypress.config('baseUrl');

    // Click "Cancel" to go back to the previous page
    cy.get('#exitButton').click();

    // Assert that the user is redirected to the buy tickets page
    cy.url().should('eq', `${baseUrl}/buy-tickets`);


    // Validate users ticket parameters
    cy.get('[ng-model="depart"]')
      .invoke('val')
      .should('eq', departureCity);

    cy.get('[ng-model="arrival"]')
      .invoke('val')
      .should('eq', arrivalCity);

    cy.get('[ng-model="depart"]')
      .invoke('val')
      .should('eq', departureCity);

    cy.get('[ng-model="departDate"]')
      .invoke('val').then((val) => {
        const formattedDepartDate = val.replace(/,/g, '');
        cy.wrap(formattedDepartDate).should('eq', formatDateForInput(departureDate))
      })
     
    cy.get('[ng-model="returnDate"]')
      .invoke('val').then((val) => {
        const formattedReturnDate = val.replace(/,/g, '');
        cy.wrap(formattedReturnDate).should('eq', formatDateForInput(returnDate))
      })

  });

});

