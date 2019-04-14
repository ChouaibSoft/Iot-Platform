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
            component: () => import("@/views/Home"),
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import("@/views/Auth"),
            meta: {
                title: 'Authentication'
            },
        },
        {
            path: "/dashboard",
            component: () => import("@/views/Dashboard"),
            meta: {
                protected: true,
                title: 'Dashboard'
            },
            children: [
                {
                    path: "channels/new",
                    name: "add-channel",
                    meta: {
                        protected: true,
                        title: 'New Channel'
                    },
                    component: () => import("@/views/AddChannel")
                },
                {
                    path: "channels",
                    name: "my-channels",
                    meta: {
                        protected: true,
                        title: 'My Channels'
                    },
                    component: () => import("@/views/MyChannels")
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (!to.meta.protected) { //route is public, don't check for authentication
        if(store.state.token != null){
            router.push('/dashboard');
        }else{
            next()
        }
    } else {  //route is protected, if authenticated, proceed. Else, login
        if(store.state.token != null){
            next()
        }else{
            router.push('/auth');
        }
    }
});
router.afterEach((to) => {
    Vue.nextTick( () => {
        document.title = to.meta.title ? to.meta.title : 'Iot Platform ESI-SBA';
    });
})
export default router;

