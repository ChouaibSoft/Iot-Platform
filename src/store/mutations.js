const mutations = {
    switchProgress(state) {
        state.progress = !state.progress;
    },
    // Channels & Fields
    setCanals(state, payload){
        state.canals = payload;
    },
    setCanal(state, payload){
        state.canal = payload;
    },
    setFields(state, payload){
        state.fields = payload;
    },
    // Triggers & Commands
    setTriggers(state, payload){
        state.triggers = payload;
    },
    setTrigger(state, payload){
        state.trigger = payload;
    },
    setCommands(state, payload){
        state.commands = payload;
    },

    // React
    setReacts(state, payload){
        state.reacts = payload;
    },
    setReact(state, payload){
        state.react = payload;
    }
}
export default mutations
