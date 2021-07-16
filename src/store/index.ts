import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import User from '../api/model/user'

export interface State {
  loggedInUser: User | null
}

export default createStore<State>({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    loggedInUser: null,
  },
  actions: {},
  mutations: {
    login(state: State, user: User) {
      state.loggedInUser = user
    },
    logout(state: State) {
      state.loggedInUser = null
      sessionStorage.clear()
    },
  },
  getters: {
    getLoggedInUser: (state: State) => {
      return state.loggedInUser
    },
  },
})
