import router from "../router";
import axios from "axios";
import i18n from "../i18n";

const actions = {
    logout() {
        router.push('/');
        localStorage.removeItem('userToken')
    },
    switchProgress({ commit }) {
        commit('switchProgress');
    },
    postRequest({state},  payload){
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',

        };
        if (localStorage.getItem('userToken') != null){
            headers['Authorization'] = 'Bearer '+ localStorage.getItem('userToken')
        }
        return axios.post(state.apiURL1 + payload.link, payload.data, {
            headers
        })
    },
    deleteRequest({state},payload){
        axios.delete(state.apiURL+payload.link, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }
        );
    },
    getRequest({state, commit}, payload) {
        console.log("get =======" + localStorage.getItem('userToken'))
        axios.get(state.apiURL1 + payload.link, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
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
        localStorage.setItem('locale', lang.language)
        i18n.locale = lang.language
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
