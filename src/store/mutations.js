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
        console.log("=====" + payload)
        state.trigger = payload;
    },
    setCommands(state, payload){
        state.commands = payload;
    },

    // React
    setReacts(state, payload){
        console.log("im here");
        console.log("===== " + payload)
        state.reacts = payload;
    },
    setReact(state, payload){
        state.react = payload;
    },
    setParams(state,data) {
        state.maxChannels = data.maxChannels ;
        state.maxFields = data.maxFields ;
    },
    setMaxChannels(state,payload) {
        state.maxChannels = payload ;
    },
    setMaxFields(state,payload) {
        state.maxFields = payload ;
    }
}
export default mutations
