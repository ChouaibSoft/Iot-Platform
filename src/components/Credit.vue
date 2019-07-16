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
                    <li class="tab col s6"><a href="#test1">{{ $t('information') }}</a></li>
                    <li class="tab col s6"><a href="#test2">{{ $t('add-credit') }}</a></li>

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
                                        <p v-for="select in selected">
                                            <label>
                                                <input  name="group1" type="radio" checked v-model="one" />
                                                <span>{{ selected }}</span>
                                            </label>
                                        </p>
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
    "confirm": "confirm"
    },
    "fr": {
    "main-title": "Mon Compte",
    "account-type": "Type de Compte",
    "remaining-credit": "Crédit Restant",
    "information": "Information",
    "add-credit": "ajouter  crédit",
    "select-type": "sélectionner un type",
    "confirm": "confirmer"
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
