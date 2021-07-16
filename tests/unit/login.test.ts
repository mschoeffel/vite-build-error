import { userTestData, login } from '../../src/api/model/user'

test('valid login', () => {
  const user = userTestData.find(() => true)
  expect(user).toBeDefined()
  if (user != undefined) {
    const result = login(user.email, user.passwort, true)
    expect(result.isError()).toBeFalsy()
    expect(result.data).toBe(user)
    expect(result.error).toBeNull()
  }
})

test('invalid password login', () => {
  const user = userTestData.find(() => true)
  expect(user).toBeDefined()
  if (user != undefined) {
    const result = login(user.email, 'wrong password', true)
    expect(result.isError()).toBeTruthy()
    expect(result.data).toEqual({})
    expect(result.error).toBe('Invalid Login')
  }
})

test('invalid email login', () => {
  const user = userTestData.find(() => true)
  expect(user).toBeDefined()
  if (user != undefined) {
    const result = login('wrong.email@provider.com', user.passwort, true)
    expect(result.isError()).toBeTruthy()
    expect(result.data).toEqual({})
    expect(result.error).toBe('Invalid Login')
  }
})
