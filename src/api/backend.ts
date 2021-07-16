import axios from 'axios'
import User, { userTestData } from './model/user'
import BackendResult from './model/result'

const fake = true

export const AXIOS = axios.create({
  baseURL: `localhost:3000/api`,
  timeout: 1000,
})

export const login = (email: string, password: string): BackendResult<User> => {
  const result: BackendResult<User> = new BackendResult()
  if (fake) {
    const r: User | undefined = userTestData.find((user: User) => {
      return user.email === email && user.passwort === password
    })
    if (r != undefined) {
      result.data = r
    } else {
      result.error = 'Invalid Login'
    }
  } else {
    axios
      .post<User>('/login', { email: email, password: password })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        }
        result.error = response.status.toString()
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}
