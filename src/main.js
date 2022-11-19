import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { NotificationsPlugin, ModalPlugin, IconPlugin } from 'purplefox-tools'
import userPlugin from '/src/plugins/user'
import router from './router'

import 'purplefox-tools/style.css'
import './style/index.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(userPlugin, { router })
  .use(NotificationsPlugin)
  .use(IconPlugin)
  .use(ModalPlugin)
  .mount('#app')
