import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios';
import { store } from './store/store';
import VueFlashMessage from 'vue-flash-message';
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon';


Vue.use(Vuelidate);
Vue.use(FlagIcon);
Vue.config.productionTip = false

Vue.use(VueFlashMessage, {
    mixin: true,
    messageOptions: {
        timeout: 3000,
        important: true,
        pauseOnInteract: true
    }
});


Vue.prototype.$http  =  axios;
require('vue-flash-message/dist/vue-flash-message.min.css');
require('@/assets/css/base.css');

new Vue({
    mounted() {
        this.$store.dispatch('switchProgress');
        i18n.locale = this.$store.state.locale;
        if(this.$store.getters.getToken != null){
            this.$store.state.isLogged = true;
        }
    },

    store: store,
    el: '#app',
    router,
    axios,
    i18n,
    render: h => h(App)
}).$mount('#app');
