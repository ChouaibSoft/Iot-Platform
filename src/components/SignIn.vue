<template>
    <div id="sign-in" class="col s12">
        <form v-if="!forgetPassword" class="col s12 form"  @submit.prevent="login">
            <div class="form-container">
                <h4>{{ $t('auth.welcome') }}</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input
                                        id="email"
                                        type="text"
                                        class="validate"
                                        required
                                        v-model="email"
                                        @input="$v.email.$touch()">
                                <label for="email">{{ $t('auth.email') }}</label>
                                <div v-if="$v.email.$dirty">
                                    <p class="error-message red-text " v-if="!$v.email.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock</i>
                                <input
                                        id="password"
                                        type="password"
                                        class="validate"
                                        required
                                        v-model="password"
                                        @input="$v.password.$touch()">
                                <label for="password">{{ $t('auth.password') }}</label>
                                <div v-if="$v.password.$dirty">
                                    <p class="error-message red-text " v-if="!$v.password.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                                <a href="#" class="forget-password" @click="forgetPassword = !forgetPassword">{{ $t('auth.forgot-password') }}</a>
                            </div>
                        </div>
                    </div>
                    <div slot="form-controls">
                        <center>
                            <button class="btn waves-effect waves-light  submit" :disabled="lock === true" type="submit" name="action">{{ $t('auth.sign-in') }}</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
        <form v-else class="col s12"  @submit.prevent="resetPassword">
            <div class="form-container form">
                <h5>{{ $t('auth.forgot-password') }}</h5>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">email</i>
                                <input
                                        id="email-2"
                                        type="text"
                                        class="validate"
                                        required
                                        v-model="emailReset"
                                        @input="$v.emailReset.$touch()">
                                <label for="email-2">{{ $t('auth.email') }}</label>
                                <div v-if="$v.emailReset.$dirty">
                                    <p class="error-message red-text " v-if="!$v.emailReset.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>o
                    <div slot="form-controls">
                        <center>
                            <a @click="forgetPassword= !forgetPassword" class="btn waves-effect waves-light" name="action">{{ $t('auth.cancel') }}</a>
                            <button style="margin-left: 30px" :disabled="lockR === true"   class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.submit') }}</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import Form from "@/components/Form";
    import { required } from 'vuelidate/lib/validators'
    import {  mapActions, mapGetters } from 'vuex';
    import axios from 'axios';

    export default {
        name: "SignIn",
        components: {
            'generic-form': Form
        },
        data() {
            return {
                component: 'sign-in',
                selected: 1,
                email: '',
                emailReset: '',
                password: '',
                forgetPassword: false,
                lock: false,
                lockR: false
            }
        },
        computed: {
            ...mapGetters(['getApiUrl','getUserId',])
        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest',
                'loginProcedure'
            ]),
            login() {
                this.lock = true;
                this.switchProgress();
                var postData = {
                    email: this.email,
                    password: this.password
                };
                var payload = {
                    'data': postData,
                    'link': '/authentification-service/login'
                };
                this.postRequest(payload).then(request => this.loginSuccessful(request))
                    .catch( ()=> {
                        this.flash(this.$t('auth.login-failed'), 'error')
                        this.switchProgress();
                        this.lock = false;
                    })
            },
            loginSuccessful(req) {
                if (req.headers) {
                    localStorage.setItem('userToken', req.headers.authorization);
                    this.$http.get( this.getApiUrl +  '/authentification-service/id',{
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+  localStorage.getItem('userToken')
                            }
                        }
                    ).then(request=>{localStorage.setItem('userId', request.data);

                    });

                    axios.get(this.getApiUrl+"/achat-service/appUsers/"+ localStorage.getItem('userId')+'/abonnement').then(response => {
                        console.log(response.data) ;
                        localStorage.setItem("maxChannels", response.data.maxChannels)
                        localStorage.setItem("maxFields", response.data.maxFields)
                    }) ;


                    var postData = {
                        email: this.email,
                    };

                    var payload = {
                        'data': postData,
                        'link': '/achat-service/appUsers/getId'
                    };

                    this.postRequest(payload).then(response =>
                    {
                        localStorage.setItem('userId2',response.data);
                        console.log(localStorage.getItem('userId2'));
                        this.$store.dispatch('setParams',response.data);

                    });
                    this.switchProgress();
                    return false;
                }
            },
            resetPassword(){
                this.lockR = true;
                var postData = {
                    email: this.emailReset,
                };
                var payloadA = {
                    'data': postData,
                    'link': '/authentification-service/send-email'
                };
                this.postRequest(payloadA).then((res) => {
                    console.log(res)
                    this.flash(this.$t('auth.reset-password.email'), 'success')
                    this.lockR = false;
                }).catch( ()=> {
                    this.flash(this.$t('auth.reset-password.email-err'), 'error')
                    this.lockR = false;
                })
            }
        },
        validations: {
            email: {
                required,
            },
            password: {
                required,
            },
            emailReset: {
                required
            }
        }
    }
</script>


