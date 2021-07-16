import BackendResult from './result'
import { AXIOS } from '../backend'

export default interface User {
  id: number
  vorname: string
  nachname: string
  email: string
  telefon: string
  passwort: string
  profile_image: string
}

/**
 * Returns all Users
 * @param useTestData Flag if temp test data should be used
 */
export const getAllUsers = (useTestData: boolean): BackendResult<User[]> => {
  const result: BackendResult<User[]> = new BackendResult()
  if (useTestData) {
    result.data = userTestData
  } else {
    AXIOS.get('/users')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Searches for a User by its Id and returns it if found
 * @param id Id of User to search for
 * @param useTestData Flag if temp test data should be used
 */
export const getUserById = (
  id: number,
  useTestData: boolean
): BackendResult<User> => {
  const result: BackendResult<User> = new BackendResult()
  if (useTestData) {
    const user = userTestData.find((u) => u.id === id)
    if (user != undefined) {
      result.data = user
    } else {
      result.error = 'User not found'
    }
  } else {
    AXIOS.get('/users/' + id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Creates a new User
 * @param user User to create
 * @param useTestData Flag if temp test data should be used
 */
export const createUser = (
  user: User,
  useTestData: boolean
): BackendResult<User> => {
  const result: BackendResult<User> = new BackendResult()
  if (useTestData) {
    user.id = userTestData.length + 1
    userTestData.push(user)
    result.data = user
  } else {
    AXIOS.post('/users/', user)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Updates a User
 * @param user User to update
 * @param useTestData Flag if temp test data should be used
 */
export const updateUser = (
  user: User,
  useTestData: boolean
): BackendResult<User> => {
  const result: BackendResult<User> = new BackendResult()
  if (useTestData) {
    const userToUpdate = userTestData.find((u) => u.id === user.id)
    if (userToUpdate != undefined) {
      userTestData = userTestData.filter((u) => u.id !== user.id)
      userTestData.push(user)
      result.data = user
    } else {
      result.error = 'User not found'
    }
  } else {
    AXIOS.put('/users/' + user.id, user)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Deletes a User by a given id
 * @param id Id of User to delete
 * @param useTestData Flag if temp test data should be used
 */
export const deleteUser = (
  id: number,
  useTestData: boolean
): BackendResult<boolean> => {
  const result: BackendResult<boolean> = new BackendResult()
  result.data = false
  if (useTestData) {
    const userToUpdate = userTestData.find((u) => u.id === id)
    if (userToUpdate !== undefined) {
      userTestData = userTestData.filter((u) => u.id !== id)
      result.data = true
    } else {
      result.error = 'User not found'
    }
  } else {
    AXIOS.delete('/users/' + id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = true
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Logging in a user with his email and password
 * @param email users email
 * @param password users password
 * @param useTestData Flag if temp test data should be used
 */
export const login = (
  email: string,
  password: string,
  useTestData: boolean
): BackendResult<User> => {
  const result: BackendResult<User> = new BackendResult()
  if (useTestData) {
    const user: User | undefined = userTestData.find((u: User) => {
      return u.email === email && u.passwort === password
    })
    if (user != undefined) {
      result.data = user
    } else {
      result.error = 'Invalid Login'
    }
  } else {
    AXIOS.post<User>('/login', { email: email, password: password })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Temp test data
 */
export let userTestData: User[] = [
  {
    id: 1,
    vorname: 'John',
    nachname: 'Doe',
    email: 'John.Doe@mail.com',
    telefon: '0151 7463278',
    passwort: 'test123',
    profile_image:
      'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&w=256&h=256',
  },
  {
    id: 2,
    vorname: 'Bob',
    nachname: 'Dylan',
    email: 'Bob32@cloudmail.com',
    telefon: '0163 553667',
    passwort: 'bobbob',
    profile_image:
      'https://images.unsplash.com/photo-1611774119019-461b5dbd3ae8?auto=format&fit=crop&w=256&h=256',
  },
  {
    id: 3,
    vorname: 'Jennifer',
    nachname: 'Abe',
    email: 'Jenny.Abe@mail.com',
    telefon: '0163 745191',
    passwort: 'jennyPassword11',
    profile_image:
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=256&h=256',
  },
]
