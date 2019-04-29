import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'
import i18n from '../i18n'

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
                title: i18n.t('page-title.auth')
            },
        },
        {
            path: "/dashboard",
            name:"dashboard",
            component: () => import("@/views/Dashboard"),
            meta: {
                protected: true,
                title: i18n.t('page-title.dashboard')
            },
            children: [
                {
                    path: "channels/new",
                    name: "new-channel",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.new-channel')
                    },
                    component: () => import("@/views/AddChannel")
                },
                {
                    path: "channels",
                    name: "my-channels",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.my-channels')
                    },
                    component: () => import("@/views/MyChannels")
                },
                {
                    path: "triggers/new",
                    name: "new-trigger",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.new-trigger')
                    },
                    component: () => import("@/views/AddTrigger")
                },
                {
                    path: "triggers",
                    name: "my-triggers",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.my-triggers')
                    },
                    component: () => import("@/views/MyTriggers")
                },
                {
                    path: "react/new",
                    name: "add-react",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.new-react')
                    },
                    component: () => import("@/views/AddReact")
                },
                {
                    path: "reacts",
                    name: "my-reacts",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.my-reacts')
                    },
                    component: () => import("@/views/MyReact")
                },




                {
                    path: "channels/:id",
                    name: "detail-channels",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.detail-channel')
                    },
                    component: () => import("@/views/DetailChannel"),
                    children: [
                        {
                            path: "view",
                            name: "view",
                            meta: {
                                protected: true,
                                title: i18n.t('page-title.view')
                            },
                            component: () => import("@/components/Visualisation")
                        },
                        {
                            path: "api-key",
                            name: "api-key",
                            meta: {
                                protected: true,
                                title: i18n.t('page-title.api-key')
                            },
                            component: () => import("@/components/APIKeys")
                        },
                        {
                            path: "settings",
                            name: "settings",
                            meta: {
                                protected: true,
                                title: i18n.t('page-title.settings')
                            },
                            component: () => import("@/components/ChannelSettings")
                        },
                        {
                            path: "data-import-export",
                            name: "data-import-export",
                            meta: {
                                protected: true,
                                title: i18n.t('page-title.import-export')
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
