import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Apartments from '../views/Apartments.vue'
import Persons from '../views/Persons.vue'
import User from '../views/User.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/apartments/:id?',
      name: 'Apartments',
      component: Apartments,
    },
    {
      path: '/persons/:id?',
      name: 'Persons',
      component: Persons,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
  ],
})
