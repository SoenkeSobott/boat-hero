// router.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/Login.vue'
import BoatsPage from './components/Boats.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/boats', component: BoatsPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
