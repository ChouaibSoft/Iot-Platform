<template>
    <div id="sign-up" class="col s12">
        <form class="col s12" @submit.prevent="register">
            <div class="form-container">
                <h4>Bienvenue !</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="username" type="text" class="validate" required v-model="username">
                                <label for="username">User Name</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="password" type="password" class="validate" required v-model="password">
                                <label for="password">Password</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="passwordCheck" type="password" class="validate" required v-model="confpass">
                                <label for="passwordCheck">Password Confirmation</label>
                            </div>
                        </div>
                    </div>
                    <div slot="form-controls">
                        <center>
                            <button class="btn waves-effect waves-light  submit" type="submit" name="action">Sign Up</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import Form from "@/components/Form";
    export default {
        name: "SignUp",
        components: {
            'generic-form': Form
        },
        data() {
            return {
                component: 'sign-up',
                selected: 1,
                username: '',
                password: '',
                confpass:'',
                error: false,
                error2:false,
                msg:'',
                jwtToken:''
            }
        },
        methods: {
            checkCurrentLogin () {
                if (this.currentUser) {
                    this.$router.replace(this.$route.query.redirect || '/dashboard')
                }
            },
            register(){
                const API_URL1 = process.env.API_URL || 'http://localhost:8091';
                this.$http.post(API_URL1+'/register',{

                        username:this.username,password:this.password,passwordConfirmed:this.confpass

                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }

                ).then(request=>{

                    this.registerSucess(request)

                })
                    .catch((request)=>{
                        this.registerError(request)
                    })


            },
            registerError(request){
                this.error2=true
                this.msg=request.response.data.message;
            },
            registerSucess(request){
                this.$router.push('/dashboard');
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

            },
            loginFailed () {
                this.error = 'Login failed!';
                delete localStorage.token
            }


        }
    }
</script>

<style scoped>


</style>
