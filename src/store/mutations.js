const mutations = {
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
    setCanal(state, payload){
        state.canal = payload;
    },
    setFields(state, payload){
        state.fields = payload;
    },
    setNull(state){
        state.canals = null,
        state.canal = null,
        state.fields = null;
    },
    changeLocale(state, lang){
        state.locale = lang.language;
        state.flag = lang.flag;
    }
}
export default mutations
