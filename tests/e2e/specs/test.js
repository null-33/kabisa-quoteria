// https://docs.cypress.io/api/introduction/api.html
/// <reference types="cypress" />

describe('Dashboard', () => {
  function openApp() {
    cy.visit('/');

    Cypress.on('uncaught:exception', () => false);
  }

  it('shows a random quote on page load', () => {
    cy.intercept('http://quotes.stormconsultancy.co.uk/random.json', {
      id: 1,
      quote: 'I am quote',
      author: 'I am author',
    }).as('randomQuote');

    openApp();

    cy.wait('@randomQuote');

    const quote = cy.get('.kq-quote--random');

    quote.get('.kq-quote__quote').should('contain.text', 'I am quote');
    quote.get('.kq-quote__author').should('contain.text', 'I am author');
  });

  it('shows a new random quote after 30 seconds', () => {
    cy.intercept('http://quotes.stormconsultancy.co.uk/random.json', {
      id: 1,
      quote: 'I am quote',
      author: 'I am author',
    }).as('randomQuote');

    openApp();

    cy.wait('@randomQuote');

    const quote = cy.get('.kq-quote--random');

    quote.get('.kq-quote__quote').should('contain.text', 'I am quote');
    quote.get('.kq-quote__author').should('contain.text', 'I am author');

    cy.clock(new Date());

    cy.intercept('http://quotes.stormconsultancy.co.uk/random.json', {
      id: 1,
      quote: 'I am new quote',
      author: 'I am new author',
    }).as('randomQuote2');

    cy.tick(31 * 1000);
    cy.wait('@randomQuote2');

    quote.get('.kq-quote__quote').should('contain.text', 'I am new quote');
    quote.get('.kq-quote__author').should('contain.text', 'I am new author');
  });
});
