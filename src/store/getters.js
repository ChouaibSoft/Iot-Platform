
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
    getApiUrl: state=>{
        return state.apiURL1;
    },
    getState: state=>{
        return state.isActivated
    },
    // Channels & Fields
    getCanals: state =>{
        return state.canals
    },
    getCanal: state =>{
        return state.canal
    },
    getFields: state =>{
        return state.fields
    },
    // Triggers & Commands
    getTriggers: state =>{
        return state.triggers
    },
    getTrigger: state =>{
        return state.trigger
    },
    getCommands: state =>{
        return state.commands
    },

    // Reacts
    getReacts: state =>{
        return state.reacts
    },
    getReact: state =>{
        return state.react
    },

    getUserId: state=>{
        return state.userId
    },
    getAPIUrl: state=>{
        return state.apiURL1;
    }
}
export default getters
