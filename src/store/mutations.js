const mutations = {
    LOGIN (state) {
        state.pending = true;
    },
    LOGIN_SUCCESS (state) {
        state.isLogged = true;
        state.pending = false;
    },
    LOGOUT(state) {
        state.token = null;
        state.isLogged = false;
    },
    switchProgress(state) {
        state.progress = !state.progress;
    },
    saveUserId (state, id) {
        state.userId = id
    },
    saveUserToken (state, token) {
        state.token = token
    },
    setCanals(state, payload){
        console.log('data' + payload);
        state.canals = payload;
    }
}
export default mutations
