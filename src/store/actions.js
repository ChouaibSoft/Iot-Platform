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
    deleteRequest({state},payload){
        axios.delete(state.apiURL+payload.link, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + state.token
                }
            }
        );
    },
    getRequest({state, commit}, payload) {
        axios.get(state.apiURL + payload.link, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(request => {
            if (payload.all){
                if (request.data.content[0].id === undefined){
                    commit(payload.mutation, null);
                }else{
                    commit(payload.mutation, request.data.content);

                }
            }else{
                commit(payload.mutation, request.data);
            }
        }).catch(error => {
            commit(payload.mutation, null);
            router.push("/dashboard");
        })
    },
    changeLocale({commit, state}, lang){
        commit('changeLocale', lang);
        i18n.locale = state.locale;
    },
    setPages (perPageParam) {
        let numberOfPages = Math.ceil(this.getCommands.length / perPageParam);
        for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
        }
    },
    paginate (record, pageParam, perPageParam) {
        let page = pageParam;
        let perPage = perPageParam;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  record.slice(from, to);
    }
};
export default actions;
