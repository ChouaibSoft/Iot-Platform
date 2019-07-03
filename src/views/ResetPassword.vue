<template>
    <div id="reset-password" class="confirm-account">
        <home-nav/>
        <div class="container auth white z-depth-2">
            <ul class="tabs">
                <li class="tab col l6 waves-effect waves-light  white-text">{{ $t('auth.reset-password.title') }}</li>
            </ul>
            <ul>
            <flash-message class="center-align"></flash-message>
            </ul>
            <div id="reset-password-sec"  class="col s12">
                <form class="form col s12" @submit.prevent="resetPassword">
                    <div class="form-container">
                        <h5>{{ $t('auth.reset-password.set-password') }}</h5>
                        <generic-form>
                            <div slot="form-fields">
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
                            </div>
                            <div slot="form-controls">
                                <center>
                                    <button class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.submit') }}</button>
                                </center>
                            </div>
                        </generic-form>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import {  mapActions, mapState } from 'vuex';
    import { required, minLength, sameAs } from 'vuelidate/lib/validators'
    import homeNav from '@/components/HomeNav'
    import Form from "@/components/Form";
    export default {
        name: "RestPassword",
        components: {
            'generic-form': Form,
            'home-nav': homeNav
        },
        data() {
            return {
                password: '',
                confpass:'',
                interval: 3
            }
        },
        computed: {
            ...mapState(['progress'])
        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            resetPassword(){
                var postData = {
                    newPassword: this.password
                };
                var payload = {
                    'data': postData,
                    'link': '/authentification-service/reset-password?token=' + this.$route.query.token
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('auth.reset-password.success-msg',  {delay: this.interval}), 'success');
                    window.setInterval(() => {
                        if(this.interval === 1){
                            window.location.href= '/auth'
                        }
                        this.interval--
                    }, 1000)
                }).catch( ()=> {
                    this.flash(this.$t('auth.reset-password.error-msg'), 'error')
                });
            }
        },
        validations: {
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
