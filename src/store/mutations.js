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
        state.isLogged = true;
        state.token = token;
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
    setTriggers(state, payload){
        state.triggers = payload;
    },
    changeLocale(state, lang){
        state.locale = lang.language;
        state.flag = lang.flag;
    },
    setNull(state){
        state.canal = null;
        state.canals = null;
        state.fields = null;
    }
}
export default mutations
