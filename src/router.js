// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Boats from './components/Boats.vue'
import BoatDetails from './components/BoatDetails.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/boats', component: Boats },
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
