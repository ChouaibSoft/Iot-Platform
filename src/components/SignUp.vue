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
                            <h5 class="center-align">{{ $t('auth.payment') }}</h5>
                            <div class="carousel">
                                <div style="margin-top: -80px;">
                                    <a @click="this.opt = 'Standard'" href="#one!" class="carousel-item">
                                        <section>
                                            <div class="row plans">
                                                <div class="superduper">
                                                    <div class="price-package">
                                                        <div class="package-name">
                                                            <h2>Free</h2>
                                                        </div>
                                                        <div class="package-price">
                                                            <div class="package-arrow"></div>
                                                            <div class="price">
                                                                <sup>$ </sup>
                                                                <h2> 0.00 </h2>
                                                            </div>
                                                            <div class="term">
                                                                <sup>.99</sup>
                                                                <span>/month</span>
                                                            </div>
                                                            <div class="package-features">
                                                                <div class="package-arrow"></div>
                                                                <ul>
                                                                    <li>Max Channel : 4</li>
                                                                    <li>Max Fields : 4</li>
                                                                    <li>Credit : 300000</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </a>
                                    <a @click="this.opt = 'Basic'" class="carousel-item" href="#four!">
                                        <section>
                                            <div class="row plans">
                                                <div class="special">
                                                    <div class="price-package">
                                                        <div class="package-name">
                                                            <h2>Basic</h2>
                                                        </div>
                                                        <div class="package-price">
                                                            <div class="package-arrow"></div>
                                                            <div class="price">
                                                                <sup>$</sup>
                                                                <h2>199</h2>
                                                            </div>
                                                            <div class="term">
                                                                <sup>.99</sup>
                                                                <span>/month</span>
                                                            </div>
                                                            <div class="package-features">
                                                                <div class="package-arrow"></div>
                                                                <ul>
                                                                    <li>Max Channel : 4</li>
                                                                    <li>Max Fields : 4</li>
                                                                    <li>Credit : 300000</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div><!--special-->
                                            </div>
                                        </section>
                                    </a>
                                    <a @click="this.opt = 'Pro'" class="carousel-item" href="#three!">
                                        <section>
                                            <div class="row plans">
                                                <div class="average">
                                                    <div class="price-package">
                                                        <div class="package-name">
                                                            <h2>Pro</h2>
                                                        </div>
                                                        <div class="package-price">
                                                            <div class="package-arrow"></div>
                                                            <div class="price">
                                                                <sup>$</sup>
                                                                <h2>299</h2>
                                                            </div>
                                                            <div class="term">
                                                                <sup>.99</sup>
                                                                <span>/month</span>
                                                            </div>
                                                            <div class="package-features">
                                                                <div class="package-arrow"></div>
                                                                <ul>
                                                                    <li>Max Channel : 10</li>
                                                                    <li>Max Fields : 8</li>
                                                                    <li>Credit : 9000000</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div><!--average-->
                                            </div>
                                        </section>
                                    </a>
                                </div>
                            </div>
                            <center>
                                <button style="margin-top: -80px" class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.submit') }}</button>
                            </center>
                        </div>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import {  mapActions, mapGetters } from 'vuex';
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
                Abonnements : null,
                opt:'Standard',
                selected: 1,
                step:1,
            }
        },
        created() {
            axios.get(this.getApiUrl +  "/achat-service/abonnements").then(response => {
                this.Abonnements = response.data.content;
                console.log(response.data.content);
            }) ;
        },
        computed:{
            ...mapGetters(['getApiUrl'])
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
        mounted(){
            $('.carousel').carousel();
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
    .carousel{
        overflow: visible;
    }
    .plans h2 {
        font-size: 1.1em;
        font-weight: bold;
        display: inline;
        text-transform: uppercase;
    }
    h3 {
        font-size: 1em;
        display: inline;
        text-transform: capitalize;
    }
    em {
        font-style: normal;
        text-decoration: underline;
        font-size: .9rem;
    }
    .plans{
        margin-left: 0;
    }
    .plans section {
        text-align: justify !important;
        text-justify: distribute-all-lines;
        font-size: 0 !important;
    }
    .plans  > * {
        text-align: left;
        font-size: medium;
    }
    section:after {
        margin-left: 25px;
        content: '';
        display: inline-block;
        width: 100%;
    }
    section > div {
        vertical-align: top;
        width: 100%;
        margin-bottom: 1.9%;
    }
    @media only screen and (max-width: 529px) {
        section > div {
            width: 100%;
            margin-bottom: 1.9%;
        }
    }
    .price-package {
        padding-top: 12px;
        margin-bottom: 10px;
        text-align: center;
        -moz-border-radius-topleft: 10px;
        -moz-border-radius-topright: 10px;
        -webkit-border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-bottomleft: 10px;
        -moz-border-radius-bottomright: 10px;
        -webkit-border-bottom-left-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
    }
    .price-package .package-name {
        height: 5px;
        font-size: 1rem;
    }
    @media only screen and (max-width: 529px) {
        .price-package {
            padding-top: 1rem;
        }
    }
    .price-package .package-price {
        -moz-border-radius-topleft: 10px;
        -moz-border-radius-topright: 10px;
        -webkit-border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-bottomleft: 10px;
        -moz-border-radius-bottomright: 10px;
        -webkit-border-bottom-left-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        margin-top: 25px;
    }
    @media only screen and (max-width: 529px) {
        .price-package .package-price {
            margin-top: 1rem;
        }
    }
    .price-package .package-price .price {
        position: relative;
        display: inline-block;
    }
    .price-package .package-price .price sup {
        font-size: .8rem;
        position: absolute;
        top: 13px;
        left: -12px;
    }
    .price-package .package-price .price span {
        font-size: 1.1rem;
    }
    .price-package .package-price .term {
        display: inline-block;
        vertical-align: top;
        text-align: left;
        padding-top: 6px;
    }
    .price-package .package-price .term sup {
        font-size: 1.1rem;
        display: block;
        padding: 0;
    }
    .price-package .package-price .term span {
        font-size: .5rem;
        display: block;
        margin-top: -3px;
    }
    .price-package .package-features {
        -moz-border-radius-topleft: 10px;
        -moz-border-radius-topright: 10px;
        -webkit-border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-bottomleft: 10px;
        -moz-border-radius-bottomright: 10px;
        -webkit-border-bottom-left-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        margin-top: 16.666666666667px;
    }
    .price-package .package-features ul {
        font-size: .8rem;
        margin: -7px;
        padding: 0;
        list-style: none;
    }
    .price-package .package-features ul li {
        margin: 10px auto;
        padding: 0;
    }
    @media only screen and (max-width: 529px) {
        .price-package .package-features ul li {
            margin: 10px auto;
        }
    }
    .price-package .sign-up {
        -moz-border-radius-topleft: 10px;
        -moz-border-radius-topright: 10px;
        -webkit-border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-bottomleft: 10px;
        -moz-border-radius-bottomright: 10px;
        -webkit-border-bottom-left-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        padding: 16.666666666667px 0;
        margin-top: 16.666666666667px;
        width: 100%;
        outline: none;
        border: none;
        cursor: pointer;
    }
    .price-package .package-arrow {
        width: 0;
        height: 0;
        margin: 0 auto 11.5px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 8px solid;
    }
    .all-plans .all-plans-features {
        display: table;
        width: 100%;
    }
    .all-plans .all-plans-features text {
        display: table-cell;
        font-size: 1.2rem;
        vertical-align: middle;
        width: 33%;
    }
    @media only screen and (max-width: 529px) {
        .all-plans .all-plans-features text {
            display: block;
            margin: 10px auto;
        }
    }
    .average .price-package {
        background-color: #009a86;
    }
    .average .price-package .package-name {
        color: white;
    }
    .average .price-package .package-price {
        background-color: #66CAA6;
        color: white;
    }
    .average .price-package .package-features {
        background-color: #e0f2ed;
        color: #009a86;
    }
    .average .price-package .sign-up {
        background-color: #009a86;
        color: white;
        transition: background-color 0.5s ease;
    }
    .average .price-package .sign-up:hover {
        background-color: #66CAA6;
    }
    .average .price-package .sign-up:active {
        background-color: #e0f2ed;
    }
    .average .price-package .package-price .package-arrow {
        border-top-color: #009a86;
    }
    .average .price-package .package-features .package-arrow {
        border-top-color: #66CAA6;
    }
    .average .price-package .sign-up .package-arrow {
        border-top-color: #e0f2ed;
    }
    .special .price-package {
        background-color: #273146;
    }
    .special .price-package .package-name {
        height: 5px;
        color: white;
    }
    .special .price-package .package-price {
        background-color: # #273146c2;
        color: white;
    }
    .special .price-package .package-features {
        background-color: #efe9fc;
        color: #273146;
    }
    .special .price-package .sign-up {
        background-color: #273146;
        color: white;
        transition: background-color 0.5s ease;
    }
    .special .price-package .sign-up:hover {
        background-color: # #273146c2;
    }
    .special .price-package .sign-up:active {
        background-color: #efe9fc;
    }
    .special .price-package .package-price .package-arrow {
        border-top-color: #273146;
    }
    .special .price-package .package-features .package-arrow {
        border-top-color: # #273146c2;
    }
    .special .price-package .sign-up .package-arrow {
        border-top-color: #efe9fc;
    }
    .superduper .price-package {
        background-color: #757575;
    }
    .superduper .price-package .package-name {
        height: 5px;
        color: white;
    }
    .superduper .price-package .package-price {
        background-color: #9e9e9e;
        color: white;
    }
    .superduper .price-package .package-features {
        background-color: #e0f2fa;
        color: #757575;
    }
    .superduper .price-package .sign-up {
        background-color: #757575;
        color: white;
        transition: background-color 0.5s ease;
    }
    .superduper .price-package .sign-up:hover {
        background-color: #9e9e9e;
    }
    .superduper .price-package .sign-up:active {
        background-color: #e0f2fa;
    }
    .superduper .price-package .package-price .package-arrow {
        border-top-color: #757575;
    }
    .superduper .price-package .package-features .package-arrow {
        border-top-color: #9e9e9e;
    }
    .superduper .price-package .sign-up .package-arrow {
        border-top-color: #e0f2fa;
    }
    .all-plans .price-package {
        background-color: #646c7f;
    }
    .all-plans .price-package .package-name {
        color: white;
    }
    .all-plans .price-package .package-price {
        background-color: #8b94ab;
        color: white;
    }
    .all-plans .price-package .package-features {
        background-color: #e5ebf4;
        color: #646c7f;
    }
    .all-plans .price-package .sign-up {
        background-color: #646c7f;
        color: white;
        transition: background-color 0.5s ease;
    }
    .all-plans .price-package .sign-up:hover {
        background-color: #8b94ab;
    }
    .all-plans .price-package .sign-up:active {
        background-color: #e5ebf4;
    }
    .all-plans .price-package .package-price .package-arrow {
        border-top-color: #646c7f;
    }
    .all-plans .price-package .package-features .package-arrow {
        border-top-color: #8b94ab;
    }
    .all-plans .price-package .sign-up .package-arrow {
        border-top-color: #e5ebf4;
    }
    .all-plans .package-features .package-arrow {
        border-top-color: #646c7f !important;
    }
    .all-plans .package-features {
        padding-bottom: 20px;
    }
</style>
