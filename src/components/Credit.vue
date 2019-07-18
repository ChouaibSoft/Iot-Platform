<template>
    <div>
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> My Account</span></p>
            </div>

        </div>
        <div class="row">
            <div class="col s12" style="margin-bottom: 50px">
                <ul class="tabs">
                    <li class="tab col s6"><a href="#test1">Info</a></li>
                    <li class="tab col s6"><a  href="#test2">Add Credit</a></li>

                </ul>
            </div>
            <div id="test1" class="col s12">
                <table >
                    <thead>
                    <tr>
                        <th>Account Type</th>
                        <th>Remaining Credit</th>
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
                            <div>
                                <div class="row">
                                    <div class="col">

                                    </div>
                                    <div class="col right">
                                        <button type="submit" class="button waves-effect waves-light btn">
                                            Ajouter
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </generic-form>
                </form>
            </div>
        </div>


    </div>

</template>

<script>
    import {  mapActions ,mapGetters} from 'vuex';
    import axios from 'axios';
    import Pusher from 'pusher-js';

    const pusher = new Pusher('ea06e336db73b947d592', {
        cluster: 'eu',
        forceTLS: true
    });

    export default {
        name: "Credit",
        data:function() {
            return {
                renderComponent :true ,
                credit : '',
                compKey :0 ,
                abonnement:'',
                selected: '',
                one:'',
            };
        },
        computed:{
            ...mapGetters(['getFields', 'getCanal', 'getUserId','getApiUrl','getCompteId'])
        },
        created: function () {

            var token = localStorage.getItem('userToken');
            var  apiUrl  =  this.getApiUrl;
            var userId = localStorage.getItem('userId2') ;
            axios.get( apiUrl + '/achat-service/appUsers/' + userId,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token}
            }).then(response => {
                this.credit = response.data.credit;

            })
            axios.get( apiUrl+'/achat-service/appUsers/'+ userId +'/abonnement',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token}
            })
                .then(response => {
                    this.abonnement = response.data;
                });

            axios.get(apiUrl +'/achat-service/creditProduits',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token}
            })
                .then(response => {

                    this.selected = response.data.content ;
                });


        },

        mounted :  function () {
            var token = localStorage.getItem('userToken')
            var  apiUrl  =  this.getApiUrl;
            var userId = localStorage.getItem('userId') ;
            $('.tabs').tabs();

        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            addCredit: function () {
                var  apiUrl  =  this.getApiUrl;

                var userId = localStorage.getItem('userId2') ;
                var token = localStorage.getItem('userToken') ;


                let postData = {
                    idProduit: this.one.id,
                };
                console.log(postData);
                let payload = {
                    'data':postData,
                    'link': '/achat-service/appUser/addCredit/'+userId};

                this.postRequest(payload).then(() => {
                    this.flash(this.$t('profile.add-success'), 'success');

                    this.$router.push('#test1');
                    this.credit= this.credit + this.one.credit ;

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
        display:block;
    }
    h5{
        display:inline;
        margin-right:10px;

    }
    .v-select {
        display: grid;
    }

    .textinfo{
        margin-bottom :10px;
    }
</style>
<i18n>
    {
    "en": {
    "main-title": "My Account"
    },
    "fr": {
    "main-title": "Mon Compte"
    }
    }
</i18n>
