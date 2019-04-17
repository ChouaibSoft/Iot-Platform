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
                },
                {
                    path: "channels/:id",
                    name: "detail-channels",
                    meta: {
                        protected: true,
                        title: 'Detail Channel'
                    },
                    component: () => import("@/views/DetailChannel"),
                    children: [
                        {
                            path: "view",
                            name: "view",
                            meta: {
                                protected: true,
                                title: 'Channel Visualisation'
                            },
                            component: () => import("@/components/Visualisation")
                        },
                        {
                            path: "api-key",
                            name: "api-key",
                            meta: {
                                protected: true,
                                title: 'API key'
                            },
                            component: () => import("@/components/APIKeys")
                        },
                        {
                            path: "settings",
                            name: "api-key",
                            meta: {
                                protected: true,
                                title: 'Channel Settings'
                            },
                            component: () => import("@/components/ChannelSettings")
                        },
                        {
                            path: "data-import-export",
                            name: "data-import-export",
                            meta: {
                                protected: true,
                                title: 'Data Import Export'
                            },
                            component: () => import("@/components/DataImportExport")
                        }
                    ]
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (!to.meta.protected) { //route is public, don't check for authentication
        if(store.getters.getToken != null && to.path === '/auth'){
            router.push('/dashboard');
        }else{
            next()
        }
    } else {  //route is protected, if authenticated, proceed. Else, login
        if(store.getters.getToken!= null){
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

