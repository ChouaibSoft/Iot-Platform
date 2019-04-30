
const getters = {
    isLogged: state => {
        return state.isLogged;
    },
    getToken: state => {
        return state.token;
    },
    getLang: state =>{
        return state.locale
    },
    getCanals: state =>{
        return state.canals
    },
    getCanal: state =>{
        return state.canal
    },
    getFields: state =>{
        return state.fields
    },
    getUserId: state=>{
        return state.userId
    },
    getAPIUrl: state=>{
        return state.apiURL;
    }
}
export default getters
