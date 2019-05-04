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
                                    <div class="input-field  col s12">
                                        <select  @change="getChannelFields" v-model="channelID">
                                            <option value="" disabled selected>{{$t('react.channel-select')}}</option>
                                            <option  v-for="canal in getCanals" :value="canal.id">{{ canal.nom }}</option>
                                        </select>
                                        <label>{{$t('react.channel')}}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <p v-for="field in this.channelFields" class="col">
                                        <label>
                                            <input :value="field.id" name="group1" v-model="fieldID" type="radio" class="with-gap" />
                                            <span>{{ field.nom }}</span>
                                        </label>
                                    </p>
                                </div>
                                <div class="row">
                                    <div class="input-field  col s12">
                                        <select v-model="condition">
                                            <option value="" disabled selected>{{$t('react.condition-select')}}</option>
                                            <option >{{$t('react.is-greater-than')}}</option>
                                            <option >{{$t('react.is-less-than')}}</option>
                                            <option >{{$t('react.is-equal-to')}}</option>
                                        </select>
                                        <label>{{$t('react.condition')}}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="value"
                                                type="number"
                                                required
                                                class="validate"
                                                v-model.number="value"
                                                @input="$v.value.$touch()">
                                        <label for="value">{{ $t('react.value') }}</label>
                                        <div v-if="$v.value.$dirty">
                                            <p class="error-message red-text " v-if="!$v.value.required">
                                                {{ $t('errors.required') }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field  col s12">
                                        <select v-model="provider">
                                            <option value="" disabled selected>Choose a provider</option>
                                            <option value="">ESI-IOT TWILIO</option>
                                        </select>
                                        <label>{{$t('react.provider')}}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="message"
                                                type="text"
                                                v-model="message">
                                        <label for="message">{{ $t('react.message') }}</label>

                                    </div>
                                </div>
                                <div class="row" style="margin-bottom: 30px">
                                    <vue-tel-input v-model="phone" enabledCountryCode
                                                   :preferredCountries="['dz']"
                                    ></vue-tel-input>
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
                <div class="col l7 s12">
                    <h4>{{ $t('help') }}</h4>
                    <h5>{{ $t('react-settings') }}</h5>
                    <ul class="help-list">
                        <li>
                            <p><strong>{{ $t('settings.name') }}</strong>{{ $t('settings.name-det') }}</p>
                        </li>
                        <li>
                            <p v-html="this.$t('settings.condition-type')"></p>
                        </li>
                        <li>
                            <p v-html="this.$t('settings.test-frequency')"></p>
                        </li>
                        <li>
                            <p v-html="this.$t('settings.condition')"></p>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";
    import 'vue-tel-input/dist/vue-tel-input.css';
    import VueTelInput from 'vue-tel-input';

    export default {
        name: "new-react",
        components: {
            'generic-form': Form,
            VueTelInput,
        },
        data (){
            return{
                name: '',
                channelFields : null,
                channelID: '',
                fieldID:'',
                condition:'',
                provider:'',
                phone: '',
                value:'',
                message:'',
                id: '',
                iduser:'',
            }
        },
        computed:{
            ...mapState['userId'],
            ...mapGetters(['getCanals','getFields', 'getUserId', 'getToken', 'getAPIUrl'])

        },
        created() {
            let payload = {
                'link': '/appUsers/' + this.getUserId + '/canals',
                'mutation': 'setCanals',
                'all': true
            };
            this.$store.dispatch('getRequest', payload);
        },
        methods: {
            ...mapActions(['postRequest']),
            addReact: function () {
                let postData = {
                    nom: this.name,
                    condition:this.condition,
                    valeur:this.value,
                    CanalId:this.channelID,
                    fieldId:this.fieldID,
                    message:this.message,
                    tel:this.phone,
                    userId: this.$store.state.userId

                };

                let payload = {
                    'data': postData,
                    'link': '/react'};
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('react.add-success'), 'success');
                    this.$router.push('/dashboard/reacts');
                    // this.twilio();
                }).catch(() => {
                    this.flash(this.$t('react.add-error'), 'error');
                })
            },
            getChannelFields(e){
                // e => Get Selected Channel Id
                if(e.target.options.selectedIndex > -1) {
                    let canalId = e.target.options[e.target.options.selectedIndex].value;
                    this.$http.get(this.getAPIUrl + '/canals/' + canalId + '/fields' , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.getToken
                        }
                    }).then(request => {
                        this.channelFields = request.data.content;
                    }).catch(error => {

                    })
                }
            }

        },
        mounted(){
            $('textarea#description').characterCounter();
            $('select').formSelect();
        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            value: {
                required,
            }
        },
    }
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
    "react-settings": "React Settings",
    "settings": {
    "name": "React Name : ",
    "name-det": "Enter a unique name for your React.",
    "condition-type":  "<strong>Condition Type : </strong> Select a condition type corresponding with your data. A channel can hold numeric sensor data, text, strings, status updates, or geographic location information.",
    "test-frequency":  "<strong>Test Frequency : </strong> Choose whether to test your condition every time data enters the channel or on a periodic basis.",
    "condition":  "<strong>Condition : </strong> Select a channel, a field and the condition for your React."
    }
    },
    "fr": {
    "main-title": "Nouveau React",
    "no-channel": "Aucun Canal à Afficher",
    "add-react": "Nouveau React",
    "help": "Aide",
    "react-settings": "Paramètres de  React",
    "settings": {
    "name": "Nom de  React : ",
    "name-det": " Entrez un nom unique pour votre React.",
    "condition-type":  "<strong> Type de condition: </ strong> sélectionnez un type de condition correspondant à vos données. Un canal peut contenir des données de capteur numérique, du texte, des chaînes, des mises à jour de statut ou des informations de localisation géographique.",
    "test-frequency":  "<strong> Fréquence de test: </ strong> choisissez de tester votre condition à chaque fois que des données entrent dans le canal ou de manière périodique..",
    "condition":  "<strong> Condition </strong>: sélectionnez un canal, un champ et la condition de votre réaction."
    }
    }
    }
</i18n>
