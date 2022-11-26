import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '/src/views/NotFound.vue'
import Login from '/src/views/Login.vue'
import Main from '/src/views/Main.vue'
import Redirect from '/src/views/Redirect.vue'

const routes = [
  {
    path: '/',
    component: Main,
    meta: { auth: true },
    children: [
      {
        path: '/',
        component: () => import('/src/views/Home.vue'),
        name: 'home',
      },
      {
        path: '/admin',
        component: () => import('/src/views/Admin.vue'),
        name: 'admin',
      },
      {
        path: '/my-profile',
        component: () => import('/src/views/Profile.vue'),
        name: 'profile',
      },
    ],
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '/redirect', component: Redirect, name: 'redirect' },
  { path: '/:pathMatch(.*)', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
