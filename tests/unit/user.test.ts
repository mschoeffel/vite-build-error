import User, {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  userTestData,
} from '../../src/api/model/user'

test('get all users', () => {
  const result = getAllUsers(true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(userTestData)
  expect(result.error).toBeNull()
})

test('get valid user by id', () => {
  const id = 1
  const user = userTestData.find((u) => u.id === id)
  expect(user).not.toBeUndefined()
  if (user !== undefined) {
    const result = getUserById(id, true)
    expect(result.isError()).toBeFalsy()
    expect(result.data).toEqual(user)
    expect(result.error).toBeNull()
  }
})

test('get error user by invalid id', () => {
  const invalidId = 100
  const result = getUserById(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toEqual({})
  expect(result.error).toBe('User not found')
})

test('create user', () => {
  const user: User = {
    id: 0,
    vorname: 'Daisy',
    nachname: 'Doe',
    email: 'Daisy.Doe@mail.com',
    telefon: '0152 776234',
    passwort: 'SuperDaisy',
    profile_image : 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256',
  }
  const result = createUser(user, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(user)
  expect(result.data.id).toBeGreaterThanOrEqual(1)
  expect(result.error).toBeNull()
  expect(userTestData.find((u) => u.id === result.data.id)).toEqual(result.data)
})

test('update valid user', () => {
  const id = 1
  const user = userTestData.find((u) => u.id === id)
  expect(user).not.toBeUndefined()
  if (user != undefined) {
    const userUpdate = {
      id: 1,
      vorname: 'Johnathan',
      nachname: 'Doesy',
      email: 'johnathan.Doesy@mail.com',
      telefon: '0151 776243',
      passwort: 'Test123Doesy',
      profile_image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256',
    }

    const result = updateUser(userUpdate, true)
    expect(result.isError()).toBeFalsy()
    expect(result.error).toBeNull()
    expect(result.data).toEqual(userUpdate)
    expect(result.data.id).toEqual(userUpdate.id)
    expect(result.data.id).toEqual(id)
    expect(userTestData.find((u) => u.id === id)).toEqual(userUpdate)
  }
})

test('update invalid user', () => {
  const invalidId = 100
  const user = {
    id: invalidId,
    vorname: 'Johnathan',
    nachname: 'Doesy',
    email: 'johnathan.Doesy@mail.com',
    telefon: '0151 776243',
    passwort: 'Test123Doesy',
    profile_image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256',
  }
  const result = updateUser(user, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toEqual({})
  expect(result.error).toBe('User not found')
})

test('delete user by id', () => {
  const id = 1
  const result = deleteUser(id, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toBeTruthy()
  expect(result.error).toBeNull()
  const userDeleted = userTestData.find((u) => u.id === id)
  expect(userDeleted).toBeUndefined()
})

test('get error deleting user by invalid id', () => {
  const invalidId = 100
  const result = deleteUser(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toBeFalsy()
  expect(result.error).toBe('User not found')
})
