import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLaptopHouse,
  faUserCircle,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLaptopHouse, faUserCircle, faBuilding)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')
