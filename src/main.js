import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios';
import { store } from './store/store'


Vue.prototype.$http  =  axios;

require('@/assets/css/base.css');

new Vue({
    mounted() {
        this.$store.dispatch('switchProgress');
        if(localStorage.token != null){
            this.$store.state.isLogged = true;
        }
    },
    store: store,
    el: '#app',
    router,
    axios,
    render: h => h(App)
}).$mount('#app');
