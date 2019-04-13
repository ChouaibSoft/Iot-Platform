import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'
import App from '../App'

Vue.use(Router);

const router = new Router({
    mode: 'history',
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
            meta: {
                protected: true
            },
            children: [
                {
                    path: "channels/new",
                    name: "add-channel",
                    meta: {
                        protected: true
                    },
                    component: () => import("@/views/AddChannel")
                },
                {
                    path: "channels",
                    name: "my-channels",
                    meta: {
                        protected: true
                    },
                    component: () => import("@/views/MyChannels")
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {

    if (!to.meta.protected) { //route is public, don't check for authentication
        next()
    } else {  //route is protected, if authenticated, proceed. Else, login
        if(store.state.token != null){
            next()
        }else{
            router.push('/auth');
        }
    }
})
export default router;

