import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("@/views/Home")
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import("@/views/Auth")
        },
        {
            path: "/dashboard",
            component: () => import("@/views/Dashboard"),
            children: [
                {
                    path: "addCanal",
                    name: "addCanal",
                    component: () => import("@/views/CanalAdd")
                }
            ]
        }
    ]
})
