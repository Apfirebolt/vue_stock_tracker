import { createRouter, createWebHistory } from 'vue-router'
import Home from '../screens/Home.vue'
import NotFound from '../screens/404.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../screens/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../screens/Register.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../screens/About.vue')
    },
    {
        path: '/symbol',
        name: 'Symbol',
        component: () => import('../screens/Symbol.vue')
    },
    {
        path: '/symbols/:symbol',
        name: 'StockDetail',
        component: () => import('../screens/StockDetail.vue')
    },
    {
        path: '/country',
        name: 'Country',
        component: () => import('../screens/Country.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router