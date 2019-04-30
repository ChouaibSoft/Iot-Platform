<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> Ajouter React</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <form class="form" id="add-canal" @submit.prevent="addReact">
                        <generic-form>
                            <div slot="form-fields">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="name"
                                                type="text"
                                                required
                                                minlength="3"
                                                class="validate"
                                                v-model="name"
                                                @input="$v.name.$touch()">
                                        <label for="name">{{ $t('react.name') }}</label>
                                        <div v-if="$v.name.$dirty">
                                            <p class="error-message red-text " v-if="!$v.name.required">
                                                {{ $t('errors.required') }}
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.name.minLength">
                                                {{ $t('errors.min-length', {minLength: 3}) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>



                                <div class="row">

                                    <div class="mdl-selectfield">
                                        <label>{{$t('react.canal')}}</label>

                                        <select v-model="selected" class="browser-default" >

                                            <option  v-for="c in (this.$store.state.canals)" v-bind:key="c"  :value="c.id" >{{c.nom}}</option>
                                        </select>

                                    </div>
                                </div>


                                <div class="row">

                                    <div class="mdl-selectfield">
                                        <label>{{$t('react.field')}}</label>

                                        <select class="browser-default" v-model="selected2"  @click="getFieldCanal" >

                                            <option  v-for="f in (this.$store.getters.getFields)" v-bind:key="f" :value="f.id">{{f.nom}}</option>
                                        </select>

                                    </div>
                                </div>

                                <div class="row">

                                    <div class="mdl-selectfield">
                                        <label>{{$t('react.Condition')}}</label>

                                        <select class="browser-default" v-model="selected3" >

                                            <option></option>
                                            <option >is greater than</option>
                                            <option >is less than</option>
                                            <option>is equal to</option>
                                        </select>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="valeur"
                                                type="number"
                                                required
                                                v-model.number="valeur">
                                        <label for="name">{{ $t('react.Valeur') }}</label>

                                    </div>
                                </div>



                                <div class="row">

                                    <div class="mdl-selectfield">
                                        <label>{{$t('react.action')}}</label>

                                        <select class="browser-default" v-model="selected4" >
                                            <option value="">ESI-IOT TWILIO</option>
                                        </select>

                                    </div>
                                </div>


                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="msg"
                                                type="text"
                                                required
                                                v-model="message">
                                        <label for="name">{{ $t('react.message') }}</label>

                                    </div>
                                </div>



                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col right">
                                            <button type="submit" class="button waves-effect waves-light btn">
                                                {{ $t('react.add') }}
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
        </section>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";

    export default {
        name: "new-react",
        components: {
            'generic-form': Form
        },
        data (){
            return{
                name: '',
                selected: '',
                selected2:'',
                selected3:'',
                selected4:'',

                valeur:'',
                message:'',

                id: '',
                iduser:'',
            }
        },
        computed:{
            ...mapState['userId'],
            ...mapGetters['getCanals','getFields','getValeurs']

        },

        created() {
            var payload = {
                'link': 'appUsers/' + this.$store.state.userId + '/canals',
                'mutation': 'setCanals',
                'all': true
            };
            this.$store.dispatch('getRequest', payload);
        },



        methods: {


            ...mapActions(['postRequest']),




            addReact: function () {


                var postData = {
                    nom: this.name,
                    condition:this.selected3,
                    valeur:this.valeur,
                    CanalId:this.selected,
                    fieldId:this.selected2,
                    message:this.message,
                    userId: this.$store.state.userId

                };

                var payload = {
                    'data': postData,
                    'link': 'react'};
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('react.add-success'), 'success');
                    this.$router.push('/dashboard/reacts');
                    // this.twilio();
                }).catch(() => {
                    this.flash(this.$t('react.add-error'), 'error');
                })
            },

        }


        ,
        getFieldCanal(){

            var payload = {
                'link': 'canals/' + this.selected + '/fields',
                'mutation': 'setFields',
                'all': true
            };
            this.$store.dispatch('getRequest', payload);




        },

        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            commandes: {
                minLength: minLength(3)
            }
        },
    }
    $(document).ready(function () {
        $('textarea#description').characterCounter();
    })
</script>

<style scoped lang="scss">


</style>
<i18n>
    {
    "en": {
    "main-title": "New React",
    "no-channel": "No Channel to displayed",
    "add-channel": "New Channel",
    "help": "Help",
    "text": "Collect data in a Iot-Platform ESI-SBA channel from a device, from another channel, or from the web. <br>Click <strong>New Channel </strong> to create a new Iot-Platform ESI-SBA channel. <br>Click on the column headers of the table to sort by the entries in that column or click on a tag to show channels with that tag.",
    "table": {
    "name": "Name",
    "description": "Description",
    "created": "Created",
    "updated": "Updated",
    "actions": "Actions"
    }
    },
    "fr": {
    "main-title": "Nouveau React",
    "no-channel": "Aucun Canal à Afficher",
    "add-react": "Nouveau React",
    "help": "Aide",
    "text": "Collectez des données sur un canal ESI-SBA Iot-Platform à partir d'un périphérique, d'un autre canal ou du Web. <br> Cliquez sur <strong> Nouveau canal </strong> pour créer un nouveau canal ESI-SBA Iot-Platform. <br> Cliquez sur les en-têtes de colonne du tableau pour trier les entrées de cette colonne ou cliquez sur une balise pour afficher les canaux avec cette balise.",
    "table": {
    "name": "Nom",
    "description": "Description",
    "created": "Créé",
    "updated": "mis à jour",
    "actions": "Actions"
    }
    }
    }
</i18n>
