import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios';
import { store } from './store/store';
import VueFlashMessage from 'vue-flash-message';
import 'vue-tel-input/dist/vue-tel-input.css';
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon';
import VueBreadcrumbs from 'vue-breadcrumbs'
import vSelect from 'vue-select';



Vue.component('v-select', vSelect)

Vue.use(VueBreadcrumbs);
Vue.use(Vuelidate);
Vue.use(FlagIcon);
Vue.config.productionTip = false;

require('@/assets/css/base.css');


Vue.use(VueFlashMessage, {
    mixin: true,
    messageOptions: {
        timeout: 3000,
        important: true,
        pauseOnInteract: true
    }
});

Vue.use(VueBreadcrumbs, {
    registerComponent: false,
    template: '<nav class="breadcrumb" v-if="$breadcrumbs.length"> ' +
        '<router-link class="breadcrumb-item" v-for="(crumb, key) in $breadcrumbs" :to="linkProp(crumb)" :key="key">{{ crumb | crumbText }}</router-link> ' +
        '</nav>'
});


Vue.prototype.$http  =  axios;
require('vue-flash-message/dist/vue-flash-message.min.css');

new Vue({
    mounted() {
        this.$store.dispatch('switchProgress');
        i18n.locale = localStorage.getItem('locale');
        if(localStorage.getItem('userToken') != null){
            this.$store.state.isLogged = true;
            localStorage.setItem('isLogged', true);
        }
    },
    store: store,
    el: '#app',
    router,
    axios,
    i18n,
    render: h => h(App)
}).$mount('#app');
