<template>
    <div>
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> Compte</span></p>
            </div>
        </div>
        <div class="row">
            <div class="col s12" style="margin-bottom: 40px">
                <ul class="tabs">
                    <li class="tab col s4"><a href="#test1">{{ $t('information') }}</a></li>
                    <li class="tab col s4"><a href="#test2">{{ $t('add-credit') }}</a></li>
                    <li class="tab col s4"><a href="#test3">{{ $t('plan') }}</a></li>
                </ul>
            </div>
            <div id="test1" class="col s12">
                <table class="striped bordered">
                    <thead>
                    <tr>
                        <th width="50%">{{ $t('account-type') }}</th>
                        <th>{{ $t('remaining-credit') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{abonnement.option}}</td>
                        <td id="x">{{credit}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="test2" class="col s12">
                <h5>{{ $t('select-type') }}</h5>
                <form class="form" id="add-canal" @submit.prevent="addCredit">
                    <generic-form>
                        <div slot="form-fields">
                            <div class="row">
                                <div class="input-field col s6">
                                    <v-select v-model="one" label="credit" :options="selected"></v-select>


                                </div>
                                <div class="input-field col s6">
                                    <p>Price : {{one.price}}</p>
                                </div>
                            </div>

                        </div>
                        <div slot="form-controls">
                            <button type="submit" class="left button waves-effect waves-light btn">
                                {{ $t('confirm') }}
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </generic-form>
                </form>
            </div>
            <div id="test3" class="col s12">
                <section>
                    <div class="row plans">
                        <div class="col s12 l4">
                            <div class="average">
                                <div class="price-package">
                                    <div class="package-name">
                                        <h2>Start-Up</h2>
                                    </div>
                                    <div class="package-price">
                                        <div class="package-arrow"></div>
                                        <div class="price">
                                            <sup>R</sup>
                                            <span>1,119</span>
                                        </div>
                                        <div class="term">
                                            <sup>.99</sup>
                                            <span>/per month *3</span>
                                        </div>
                                        <div class="package-features">
                                            <div class="package-arrow"></div>
                                            <ul>
                                                <li>3 Pages</li>
                                                <li>Custom Design</li>
                                                <li>Search Engine Optimization</li>
                                                <li>Basic Google Adword</li>
                                                <li>10 Key words</li>
                                                <li>Contact Form</li>
                                            </ul>
                                            <button class="sign-up">
                                                <h3>sign up now!</h3>
                                            </button>
                                        </div><!--package-features-->
                                    </div><!--package-price-->
                                </div><!--price-package-->
                            </div><!--average-->
                        </div>
                        <div class="col s12 l4">
                            <div class="pro">
                                <div class="price-package">
                                    <div class="package-name">
                                        <h2>Start-Up</h2>
                                    </div>
                                    <div class="package-price">
                                        <div class="package-arrow"></div>
                                        <div class="price">
                                            <sup>R</sup>
                                            <span>1,119</span>
                                        </div>
                                        <div class="term">
                                            <sup>.99</sup>
                                            <span>/per month *3</span>
                                        </div>
                                        <div class="package-features">
                                            <div class="package-arrow"></div>
                                            <ul>
                                                <li>3 Pages</li>
                                                <li>Custom Design</li>
                                                <li>Search Engine Optimization</li>
                                                <li>Basic Google Adword</li>
                                                <li>10 Key words</li>
                                                <li>Contact Form</li>
                                            </ul>
                                            <button class="sign-up">
                                                <h3>sign up now!</h3>
                                            </button>
                                        </div><!--package-features-->
                                    </div><!--package-price-->
                                </div><!--price-package-->
                            </div><!--average-->
                        </div>
                        <div class="col s12 l4">
                            <div class="superduper">
                                <div class="price-package">
                                    <div class="package-name">
                                        <h2>super duper</h2>
                                    </div>
                                    <div class="package-price">
                                        <div class="package-arrow"></div>
                                        <div class="price">
                                            <sup>$</sup>
                                            <span>99</span>
                                        </div>
                                        <div class="term">
                                            <sup>.99</sup>
                                            <span>/month</span>
                                        </div>
                                        <div class="package-features">
                                            <div class="package-arrow"></div>
                                            <ul>
                                                <li><em>Super Duper Feature</em></li>
                                                <li>Special Feature 1</li>
                                                <li>Special Feature 2</li>
                                                <li>Average Feature 1</li>
                                                <li>Average Feature 2</li>
                                                <li>Average Feature 3</li>
                                            </ul>
                                            <button class="sign-up">
                                                <h3>sign up now!</h3>
                                            </button>
                                        </div><!--package-features-->
                                    </div><!--package-price-->
                                </div><!--price-package-->
                            </div><!--superduper-->
                        </div>
                    </div>
                </section>
            </div>
        </div>


    </div>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import axios from 'axios';
    import Pusher from 'pusher-js';

    const pusher = new Pusher('ea06e336db73b947d592', {
        cluster: 'eu',
        forceTLS: true
    });

    export default {
        name: "Credit",
        data: function () {
            return {
                renderComponent: true,
                credit: '',
                compKey: 0,
                abonnement: '',
                selected: '',
                one: '',
            };
        },
        computed: {
            ...mapGetters(['getFields', 'getCanal', 'getUserId', 'getApiUrl', 'getCompteId'])
        },
        created: function () {

            var token = localStorage.getItem('userToken')
            var apiUrl = this.getApiUrl;
            var userId = localStorage.getItem('userId');
            axios.get(apiUrl + '/achat-service/appUsers/' + userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                this.credit = response.data.credit;

            })
            axios.get(apiUrl + '/achat-service/appUsers/' + userId + '/abonnement', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    this.abonnement = response.data;
                });

            axios.get(apiUrl + '/achat-service/creditProduits', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    console.log(response.data.content);
                    this.selected = response.data.content;
                    console.log(this.selected);
                });


        },

        mounted: function () {
            var token = localStorage.getItem('userToken')
            var apiUrl = this.getApiUrl;
            var userId = localStorage.getItem('userId');
            $('.tabs').tabs();

        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            addCredit: function () {
                var apiUrl = this.getApiUrl;

                var userId = localStorage.getItem('userId');
                var token = localStorage.getItem('userToken');


                let postData = {
                    idProduit: this.one.id,
                };
                console.log(postData);
                let payload = {
                    'data': postData,
                    'link': '/achat-service/appUser/addCredit/' + userId
                };

                this.postRequest(payload).then(() => {
                    this.flash(this.$t('profile.add-success'), 'success');

                    this.$router.push('#test1');
                    this.credit = this.credit + this.one.credit;

                }).catch(() => {
                    //alert("fail");
                    this.flash(this.$t('profile.add-error'), 'error');
                })
            },
        }
    }


</script>

<style scoped>
    .v-select .dropdown-menu {
        display: block;
    }
    h5{
        color: #9098ac;
    }
    .plans h2 {
        font-size: .9em;
        font-weight: bold;
        display: inline;
        text-transform: uppercase;
    }
    h3 {
        font-size: 1.2em;
        display: inline;
        text-transform: capitalize;
    }
    em {
        font-style: normal;
        text-decoration: underline;
        font-size: 1rem;
    }
    plans section {
        text-align: justify !important;
        text-justify: distribute-all-lines;
        font-size: 0 !important;
    }
    .plans  > * {
        text-align: left;
        font-size: medium;
    }
    section:after {
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
        padding-top: 20px;
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
        font-size: 1.4rem;
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
        font-size: 1.3rem;
        position: absolute;
        top: 6px;
        left: -12px;
    }
    .price-package .package-price .price span {
        font-size: 3.5rem;
    }
    .price-package .package-price .term {
        display: inline-block;
        vertical-align: top;
        text-align: left;
        padding-top: 6px;
    }
    .price-package .package-price .term sup {
        font-size: 1.5rem;
        display: block;
        padding: 0;
    }
    .price-package .package-price .term span {
        font-size: 1rem;
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
        font-size: 1.1rem;
        margin: 0;
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
        margin: 0 auto 12.5px;
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
        font-size: 1.6rem;
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
        background-color:   #66CAA6  ;
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
        background-color:   #66CAA6  ;
    }
    .average .price-package .sign-up:active {
        background-color: #e0f2ed;
    }
    .average .price-package .package-price .package-arrow {
        border-top-color: #009a86;
    }
    .average .price-package .package-features .package-arrow {
        border-top-color:   #66CAA6  ;
    }
    .average .price-package .sign-up .package-arrow {
        border-top-color: #e0f2ed;
    }
    .pro .price-package {
        background-color: #273146;
    }
    .pro .price-package .package-name {
        color: white;
    }
    .pro .price-package .package-price {
        background-color:   #78909c  ;
        color: white;
    }
    .pro .price-package .package-features {
        background-color: #e0f2ed;
        color: #273146;
    }
    .pro .price-package .sign-up {
        background-color: #273146;
        color: white;
        transition: background-color 0.5s ease;
    }
    .pro .price-package .sign-up:hover {
        background-color:   #78909c  ;
    }
    .pro .price-package .sign-up:active {
        background-color: #e0f2ed;
    }
    .pro .price-package .package-price .package-arrow {
        border-top-color: #273146;
    }
    .pro .price-package .package-features .package-arrow {
        border-top-color:   #78909c  ;
    }
    .pro .price-package .sign-up .package-arrow {
        border-top-color: #e0f2ed;
    }

    .superduper .price-package {
        background-color: #757575;
    }
    .superduper .price-package .package-name {
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
        background-color: #9fa8da;
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
        background-color: #9fa8da;
    }
    .all-plans .price-package .sign-up:active {
        background-color: #e5ebf4;
    }
    .all-plans .price-package .package-price .package-arrow {
        border-top-color: #646c7f;
    }
    .all-plans .price-package .package-features .package-arrow {
        border-top-color: #9fa8da;
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
<i18n>
    {
    "en": {
    "main-title": "My Account",
    "account-type": "Account Type",
    "remaining-credit": "Remaining Credit",
    "information": "Information",
    "add-credit": "Add Credit",
    "select-type": "selec a type",
    "confirm": "confirm",
    "profile.add-success": "credit added successfully"
    },
    "fr": {
    "main-title": "Mon Compte",
    "account-type": "Type de Compte",
    "remaining-credit": "Crédit Restant",
    "information": "Information",
    "add-credit": "ajouter  crédit",
    "select-type": "sélectionner un type",
    "confirm": "confirmer",
    "profile.add-error": "crédit ajouté avec succès"
    }
    }
</i18n>

addCredit: function () {
let postData = {
idProuit: this.one.id,
};

let payload = {
'data': postData,
'link': "/comptes/"+this.getCompteId};
this.postRequest(payload).then(() => {
this.flash(this.$t('canal.add-success'), 'success');
alert("succes");
this.$router.push('/dashboard/channels');
}).catch(() => {
alert("fail");
//this.flash(this.$t('canal.add-error'), 'error');
})
},
