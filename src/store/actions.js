import router from "../router";
import axios from "axios";
import i18n from "../i18n";

const actions = {
    logout({ commit }) {
        router.push('/');
        commit('LOGOUT');
    },
    switchProgress({ commit }) {
        commit('switchProgress');
    },
    saveUserId (context, Id) {
        context.commit('saveUserId', Id)
    },
    saveUserToken (context, token) {
        context.commit('saveUserToken', token)
    },
    postRequest({state},  payload){
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',

        };
        if (state.token != null){
            headers['Authorization'] = 'Bearer '+ state.token
        }
        return axios.post(state.apiURL + payload.link, payload.data, {
            headers
        })
    },
    getRequest({state, commit}, payload) {
        axios.get(state.apiURL + payload.link, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(request => {
            commit(payload.mutation, request.data.content);
        })
    },
    changeLocale({commit, state}, lang){
        commit('changeLocale', lang);
        i18n.locale = state.locale;
    }
};
export default actions;
