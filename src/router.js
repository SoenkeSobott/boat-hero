// router.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/Login.vue'
import BoatsPage from './components/Boats.vue'
import BoatDetails from './components/BoatDetails.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/boats', component: BoatsPage },
    {
        path: "/boats/:id",
        name: "BoatDetails",
        component: BoatDetails,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
