import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'


Vue.use(Vuex);



// noinspection JSAnnotator
export const store = new Vuex.Store ({
    state: {
        progress: false,
        canals: null,
        canal: null,
        triggers: null,
        trigger: null,
        reacts: null,
        react: null,
        commands: null,
        fields: null,
        maxChannels : null,
        maxFields: null,
        apiURL1: "http://192.168.8.105:8082"
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules:{
        user : user
    }
});
