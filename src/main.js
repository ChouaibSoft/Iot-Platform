import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import "jquery/dist/jquery"
window.$ = require('jquery');
window.JQuery = require('jquery');


require('@/assets/css/normalize.css');
require('@/assets/css/base.css');

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
