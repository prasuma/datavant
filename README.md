This repository contains an automated test for Submit Request for ticket purchase functionality on a web application using Cypress.

## Use Case Overview
The primary goal of this automation is to test the process of submitting a ticket purchase request on a web application. The test covers entering various parameters such as departure city, arrival city, departure date, and return date. Additionally, it validates that the entered parameters are correctly displayed on the user interface.

## Setup and Architecture
1. Prerequisite : `npm` (Node package manager) must be pre-installed in the system.
2. Create a Project Folder, set this folder as the root folder in the terminal and install Cypress using the command `npm init`. 
   This command creates a `package.json` file.
3. Run the command `npm install cypress --save-dev` to create Cypress locally as a dev dependency for the project  
4. Cypress Testing Library is the lightweight testing library for DOM nodes that provides methods resembling the way a user finds elements on a page.
    To install a cypress-testing library, run the below command in the terminal from your root cypress project.
    `npm install --save-dev @testing-library/cypress`
    
## Test Organization
1. Test files are in `cypress/e2e` under the spec folder. All the test scripts that need to be executed are created here.
2. Functionality Test can be done for the following using Cypress:
    2.1 Train Times
    2.2 Buy Tickets
    2.3 Buy Leisure
    2.4 How to travel
    2.5 Discounts and Benefits
    2.6 Login page
3. Base URL - "https://www.cp.pt/passageiros/en" is configured in cypress.json file
3. Test case focused on the "submit_request_for_ticket_purchase" scenario is under Buy Tickets. 
   ### Test Execution Flow
    1. Navigate to the "buy-tickets" page.
    2. Enter departure and arrival cities.
    3. Set departure and return dates.
    4. Submit the search with entered ticket parameters.
    5. Click "Cancel" to go back to the previous page.
    6. Assert that the user is redirected to the buy tickets page
    
4. The utility functions `formatDateForInput` and `formatDateForVerification` help format dates consistently for input and verification purposes.
### Page Load Bug Workaround
Due to a bug with Cypress that resets the return date to today's date, a workaround has been implemented. Instead of relying on the Cypress command, the return date is set directly in the DOM object using `cy.get("input[name=textBoxDataVolta]").val()`.

## Other Alternatives 

1. The test currently hardcodes departure and arrival cities. We can consider utilizing data-driven inputs for testing with diverse cities.
2. The test presently has fixed, hardcoded days for arrival and departure. We can enhance flexibility by parameterizing them in fixture files to accommodate varied input scenarios.
3. To promote reusability, we can consider exporting date utilities to commands.
4. We can create `.github/workflows/cypress.yml` to setup CI via github actions

## Running the Tests
To run the tests, ensure that Cypress is installed, and the web application is accessible. Use the following command:
```
npx cypress run --spec cypress/e2e/BuyTickets/submit_request_for_ticket_purchase.cy.js 
```

## Bugs:

1. There is no indication of mandatory fields that are required.
2. Visual error messages are not displayed when mandatory fields are missing, though red highlights indicate the mandatory status. An error popup message aids screen reader devices in translation.
3. Selecting a return date earlier than the departure date does not trigger an error message, though departure and return date resets to same day.
4. Date picker allows to pick disabled dates
5. Date formats lack consistency across different pages.
6. URLs lack localization, making it challenging for English-speaking users to remember.
7. Prices are not displayed per passenger; instead, they are shown for all passengers collectively.
8. Certain options (e.g., bike rack and priority seat) are represented as checkboxes in forms but as radio buttons in chat.
9. The purchase flow, both in the form and in chat, allows for a return date-time before the outward departure and arrival.
10. It is unclear what the availability is within +/- N days to assist with better scheduling.
11. Seat option selection is currently split between the first and second pages of the search, and it would be beneficial to unify this process.
12. Parameters do not persist when the URL is copied into a new window.
13. Clicking the search button does not indicate search in progress, and the search process is slow.
14. Attempting to purchase tickets with invalid credentials results in an error message displayed in a language other than the expected one.
15. The registration page for a new user is dysfunctional, as the Next button appears to be disabled.
16. Current functionality has a limitation of booking tickets in future. 

## Enhancements:
1. Implement accessibility roles for buttons and add test IDs for the selectable elements.
2. Introduce data-cy attributes for buttons and dropdown menu items.
3. Provide options for selecting between one-way and return trips.
4. Instead of a fixed dropdown list, allow users to enter the number of passengers in a text field.
5. Include an option to specify the number of children in the passenger list.
6. Address performance issues, particularly the visible load delay from the search results page to the ticket purchase page.


