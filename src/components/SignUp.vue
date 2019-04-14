<template>
    <div id="sign-up" class="col s12">
        <form class="col s12" @submit.prevent="register">
            <div class="form-container">
                <h4>Bienvenue !</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <input
                                        id="username"
                                        type="text"
                                        class="validate"
                                        required v-model="username"
                                        @input="$v.username.$touch()">
                                <label for="username">User Name</label>
                                <div v-if="$v.username.$dirty">
                                    <p class="error-message red-text " v-if="!$v.username.required">
                                        username field is required.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                        id="password"
                                        type="password"
                                        class="validate"
                                        required
                                        minlength="8"
                                        v-model="password"
                                        @input="$v.password.$touch()">
                                <label for="password">Password</label>
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
                                <label for="passwordCheck">Password Confirmation</label>
                            </div>
                            <div class="col s12">
                                <div v-if="$v.password.$dirty">
                                    <p class="error-message red-text " v-if="!$v.password.required">
                                        password field is required.
                                    </p>
                                    <p class="error-message red-text " v-if="!$v.password.minLength">
                                        the field password must be greater than 8 or equal characters.
                                    </p>
                                </div>
                                <div v-if="$v.confpass.$dirty">
                                    <p class="error-message red-text " v-if="!$v.confpass.required">
                                        confirmation password  is required.
                                    </p>
                                    <p class="error-message red-text " v-if="!$v.confpass.sameAsPassword">
                                        passwords must match.
                                    </p>
                                </div>
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
    import {  mapActions } from 'vuex';
    import { required, minLength, sameAs } from 'vuelidate/lib/validators'
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
            }
        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            register(){
                var postData = {
                    username: this.username,
                    password: this.password,
                    passwordConfirmed: this.confpass
                };
                var payload = {
                    'data': postData,
                    'link': '/register'
                };
                this.postRequest(payload).then(request => {
                    this.registerSucess();
                    this.flash('Congratulation! !', 'success');
                })
                    .catch( ()=> {
                        this.flash('Registration Failed !', 'error')
                    });
            },
            registerSucess(request){
                this.$router.push('/dashboard');
            }
        },
        validations: {
            username: {
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
