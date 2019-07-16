<template>
    <div id="sign-up" class="col s12">
        <form class="form col s12" @submit.prevent="register">
            <div class="form-container">
                <h4>{{ $t('auth.welcome') }}</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div v-if="step === 1">

                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input
                                            id="username"
                                            type="text"
                                            class="validate"
                                            required v-model="username"
                                            @input="$v.username.$touch()">
                                    <label for="username">{{ $t('auth.username') }}</label>
                                    <div v-if="$v.username.$dirty">
                                        <p class="error-message red-text " v-if="!$v.username.required">
                                            {{ $t('errors.required') }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">email</i>
                                    <input
                                            id="email"
                                            type="email"
                                            class="validate"
                                            required v-model="email"
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
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">lock</i>
                                    <input
                                            id="password"
                                            type="password"
                                            class="validate"
                                            required
                                            minlength="8"
                                            v-model="password"
                                            @input="$v.password.$touch()">
                                    <label for="password">{{ $t('auth.password') }}</label>
                                </div>
                                <div class="input-field col s6">
                                    <input
                                            id="passwordCheck"
                                            type="password"
                                            class="validate"
                                            required
                                            minlength="8"
                                            v-model="confpass"
                                            @input="$v.confpass.$touch()">
                                    <label for="passwordCheck">{{ $t('auth.conf-password') }}</label>
                                </div>
                                <div class="col s12">
                                    <div v-if="$v.password.$dirty">
                                        <p class="error-message red-text " v-if="!$v.password.required || !$v.confpass.required">
                                            {{ $t('errors.required') }}
                                        </p>
                                        <p class="error-message red-text " v-if="!$v.password.minLength">
                                            {{ $t('errors.min-length-password', {minLength: 8}) }}
                                        </p>
                                    </div>
                                    <div v-if="$v.confpass.$dirty">
                                        <p class="error-message red-text " v-if="!$v.confpass.sameAsPassword">
                                            {{ $t('errors.same-as') }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <center>
                                <button class="btn waves-effect waves-light" @click.prevent="next()">Next</button>
                            </center>
                        </div>
                        <div v-if="step === 2">

                            <div class="row">
                                <div class="col s6 center-align ">
                                    <div class="ab-item">    {{Abonnements[0].option}}
                                    </div>
                                    <div class="ab-item">   max channels {{Abonnements[0].maxChannels}}</div>

                                    <div class="ab-item">   max fields {{Abonnements[0].maxFields}}</div>

                                    <label> <input type="radio" id="one" name="selectedoption" v-model="opt" :value="Abonnements[0].option" checked  >
                                        <span></span>
                                    </label>
                                </div>
                                <div class="col s6 center-align">
                                    <div class="ab-item">    {{Abonnements[1].option}}
                                    </div>

                                    <div class="ab-item">   max channels <span>{{Abonnements[1].maxChannels}}</span></div>

                                    <div class="ab-item">   max fields <span>{{Abonnements[1].maxFields}}</span></div>
                                    <label><input type="radio" id="two" name="selectedoption" v-model="opt":value="Abonnements[1].option"  >
                                        <span></span>
                                    </label>
                                </div></div>
                            <div slot="form-controls">
                                <center>
                                    <button class="btn waves-effect waves-light" @click.prevent="prev()">Previous</button>

                                    <button class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.sign-up') }}</button>
                                </center>
                            </div>
                        </div>
                    </div>

                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import {  mapActions } from 'vuex';
    import { required, minLength, sameAs } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";
    import axios from 'axios';

    export default {
        name: "SignUp",
        components: {
            'generic-form': Form
        },
        data() {
            return {
                component: 'sign-up',
                username: '',
                email: '',
                password: '',
                confpass:'',
                Abonnements : [],
                opt:'',
                selected: 1,
                step:1,


            }
        },
        created: function () {
            this.fetchAbonnements();
        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            prev() {
                this.step--;
            },
            next() {
                this.step++;
            },
            fetchAbonnements () {
                axios.get("http://localhost:8082/achat-service/abonnements").then(response => {
                    this.Abonnements = response.data.content;
                    console.log(response.data.content);
                }) ;

            },
            register(){
                var postData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    passwordConfirmed: this.confpass,
                    opt:this.opt,

                };
                var payload = {
                    'data': postData,
                    'link': '/authentification-service/addUser'
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('auth.success'), 'success');
                }).catch( ()=> {
                    this.flash(this.$t('auth.error'), 'error')
                });
            }
        },
        validations: {
            username: {
                required,
            },
            email: {
                required,
            },
            password: {
                required,
                minLength: minLength(8),
            },
            confpass: {
                required,
                sameAsPassword: sameAs('password')
            }
        },
    }
</script>

<style scoped>


</style>
