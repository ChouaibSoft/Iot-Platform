<template>
    <div id="sign-in" class="col s12">
        <form class="col s12"  @submit.prevent="login">
            <div class="form-container">
                <h4>Bienvenue !</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="username" type="text" class="validate" required v-model="username">
                                <label for="username">Username</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password" type="password" class="validate" required v-model="password">
                                <label for="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div slot="form-controls">
                        <center>
                            <button class="btn waves-effect waves-light  submit" type="submit" name="action">Sign in</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import Form from "@/components/Form";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "SignIn",
        components: {
            'generic-form': Form
        },
        data() {
            return {
                component: 'sign-in',
                selected: 1,
                username: '',
                password: '',
                error: '',
                id: ''
            }
        },
        computed: {
            ...mapState([
                'isLogged'
            ])
        },
        methods: {
            ...mapActions([
                'switchProgress'
            ]),
            login() {
                const API_URL = process.env.API_URL || 'http://localhost:8091';

                this.$http.post(API_URL+'/login',{userName:this.username, password: this.password},{
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': 'Bearer '+ axios.defaults.headers['Authorization']
                        },
                    }
                )
                .then(request => this.loginSuccessful(request))
                .catch( ()=> {
                    this.loginFailed()
                })
            },
            loginSuccessful(req) {
                if (req.headers) {

                    localStorage.token = req.headers.authorization;
                    this.$http.get( 'http://localhost:8091/id',{
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+ localStorage.token
                            }
                        }

                    ).then(request=>this.id=request.data)
                    this.switchProgress();
                    setTimeout(() => {
                        console.log('dfdf' + this.id);
                        this.switchProgress();
                        this.$router.push('/dashboard');
                    },2000);
                    return false;

                }
                else {
                    this.error = 'Login Failed'
                }

            },
            loginFailed () {
                this.error = 'Login failed!'
                delete localStorage.token
            },
            test(request){
                //   console.log(request.data)

                this.$http.get('http://localhost:8091/appUsers/'+request.data+'/canals',{

                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token
                    }
                }).then(request=>this.test2(request))

            },

            test2(request){
                console.log(request.data)
            }
        }
    }
</script>

<style scoped>
    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
    }
    .lds-ellipsis div {
        position: absolute;
        top: 27px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #dfc;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }
</style>
