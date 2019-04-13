
const getters = {
    isLogged: state => {
        return state.isLogged;
    },
    token: state => {
        return state.token;
    },
    getCanals: state => {
        return state.canals;
    }
}
export default getters
