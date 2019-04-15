
const getters = {
    isLogged: state => {
        return state.isLogged;
    },
    token: state => {
        return state.token;
    },
    getCanals: state => {
        return state.canals;
    },
    getFlag: state =>{
        return state.flag
    }
}
export default getters
