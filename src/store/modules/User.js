const User = {
    state:{
        isLogged: !!localStorage.getItem("token"),
        userId: '',
        token: null,
        locale: 'en', // Default Language,
        flag: 'us'
    }
}
export default User
