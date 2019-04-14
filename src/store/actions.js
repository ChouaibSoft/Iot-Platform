import router from "../router";
import axios from "axios";

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
        return axios.post(state.apiURL + payload.link, payload.data,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Authorization': 'Bearer '+ state.token
            },})
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
    }
};
export default actions;
