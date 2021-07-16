import { userTestData } from '../../src/api/model/user'

const MAIN_URL = 'http://localhost:3000'
const LOGIN_URL = MAIN_URL + '/login'

const INPUT_EMAIL_ID = '#email'
const INPUT_PASSWORD_ID = '#password'
const BUTTON_SUBMIT_ID = '#submit'
const TEXT_HEADING_ID = '#heading'
const TEXT_EMAIL_ERROR_ID = '#email-error'
const TEXT_PASSWORD_ERROR_ID = '#password-error'

const HEADING_TEXT = 'MiWo - Anmeldung'
const INVALID_LOGIN_MESSAGE = 'Ungültige Eingabe'

describe('login', () => {
  it('forwarded to login site if not already logged in', () => {
    cy.visit(MAIN_URL)
    cy.url().should('eq', LOGIN_URL)
  })

  it('form completely visible', () => {
    cy.get(TEXT_HEADING_ID).should('text', HEADING_TEXT)
    cy.get(INPUT_EMAIL_ID).should('be.visible')
    cy.get(INPUT_EMAIL_ID).should('be.visible')
    cy.get(INPUT_PASSWORD_ID).should('be.visible')
    cy.get(BUTTON_SUBMIT_ID).should('be.visible')
  })

  it('shows error with wrong password', () => {
    const user = userTestData.find(
      (u) => u.id === Math.random() * userTestData.length
    )
    if (user != undefined) {
      cy.visit(LOGIN_URL)
      cy.get(INPUT_EMAIL_ID).type(user.email)
      cy.get(INPUT_PASSWORD_ID).type(user.passwort + '_is_wrong{enter}')
      cy.url().should('eq', LOGIN_URL)
      cy.get(TEXT_EMAIL_ERROR_ID).should('text', INVALID_LOGIN_MESSAGE)
      cy.get(TEXT_PASSWORD_ERROR_ID).should('text', INVALID_LOGIN_MESSAGE)
      cy.visit(MAIN_URL)
      cy.url().should('eq', LOGIN_URL)
    }
  })

  it('shows error with wrong email', () => {
    const user = userTestData.find(
      (u) => u.id === Math.random() * userTestData.length
    )
    if (user != undefined) {
      cy.visit(LOGIN_URL)
      cy.get(INPUT_EMAIL_ID).type('wrong.mail@provider.net')
      cy.get(INPUT_PASSWORD_ID).type(user.passwort + '{enter}')
      cy.url().should('eq', LOGIN_URL)
      cy.get(TEXT_EMAIL_ERROR_ID).should('text', INVALID_LOGIN_MESSAGE)
      cy.get(TEXT_PASSWORD_ERROR_ID).should('text', INVALID_LOGIN_MESSAGE)
      cy.visit(MAIN_URL)
      cy.url().should('eq', LOGIN_URL)
    }
  })

  it('valid login', () => {
    const user = userTestData.find(
      (u) => u.id === Math.random() * userTestData.length
    )
    if (user != undefined) {
      cy.visit(LOGIN_URL)
      cy.get(INPUT_EMAIL_ID).type(user.email)
      cy.get(INPUT_PASSWORD_ID).type(user.passwort + '{enter}')
      cy.url().should('eq', MAIN_URL)
    }
  })
})
