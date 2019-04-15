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
    deleteToken(state){
        state.token = null;
    },
    setCanals(state, payload){
        state.canals = payload;
    },
    changeLocale(state, lang){
        state.locale = lang.language;
        state.flag = lang.flag;
    }
}
export default mutations
