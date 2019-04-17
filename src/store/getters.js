
const getters = {
    isLogged: state => {
        return state.isLogged;
    },
    getToken: state => {
        return state.token;
    },
    getFlag: state =>{
        return state.flag
    },
    getCanals: state =>{
        return state.canals
    },
    getCanal: state =>{
        return state.canal
    },
    getFields: state =>{
        return state.fields
    }
}
export default getters
