<template>
    <div id="api-key">
        <div class="row">
            <div class="col s12 l6">
                <form class="form" id="add-canal" @submit.prevent="keyGenerator">
                    <generic-form>
                        <div slot="form-fields">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input
                                            id="write-key"
                                            type="text"
                                            required
                                            autofocus
                                            v-model="getCanal.cleEcriture"
                                            class="validate"
                                            >
                                    <label for="write-key">{{ $t('write-api-key') }}</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                        <input
                                            id="read-key"
                                            type="text"
                                            required
                                            v-model="getCanal.cleLecture"
                                            class="validate"/>
                                    <label for="read-key">{{ $t('read-api-key') }}</label>
                                </div>
                            </div>
                        </div>
                        <div slot="form-controls">
                            <div>
                                <div class="row">
                                    <div class="col right">
                                        <button type="submit" class="button waves-effect waves-light btn">
                                            {{ $t('generate') }}
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </generic-form>
                </form>
                <h5>{{$t('api-requests')}}</h5>
                <div class="urls">
                    <h6>{{$t('update-url')}}</h6>
                    <pre>  POST : <span>http://localhost:8091/record?key=</span><span class="key">{{getCanal.cleEcriture}}{{this.paramlist}}</span></pre>
                    <h6>{{$t('read-url')}}</h6>
                    <pre v-for="f in getFields" v-bind:key="f.id">  GET : <span>http://localhost:8091/record?key=</span><span class="key">={{getCanal.cleLecture}}&field={{f.nom}}</span></pre>

                </div>
            </div>
            <div class="col s12 l6">
                <div class="help">
                    <h4>{{ $t('help') }}</h4>
                    <p>{{ $t('api-key-des') }}</p>
                    <h5>{{ $t('api-key-settings') }}</h5>
                    <ul class="help-list">
                        <li>
                            <p><strong>{{ $t('write-api-key') }}</strong>{{ $t('write-api-key-det') }}</p>
                        </li>
                        <li>
                            <p><strong>{{ $t('read-api-key') }}</strong>{{ $t('read-api-key-det') }}</p>
                        </li>
                        <li>
                            <p><strong>{{ $t('note') }}</strong>{{ $t('note-det') }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from "@/components/Form";
    import {mapGetters } from 'vuex'
    export default {
        name: "API-keys",
        components: {
            'generic-form': Form,
        },
        data(){
            return{
                paramlist: '',
            }
        },
        computed:{
            ...mapGetters(['getCanal', 'getFields'])
        },
        methods: {
            keyGenerator(){
                var payload = {
                    'link': '/canals/' + this.$store.state.canal.id + '/fields',
                    'mutation': 'setFields',
                    'all': true
                };
                this.$store.dispatch('getRequest', payload);
                this.getFields.forEach( f => {
                    this.paramlist=this.paramlist + "&"+f.nom+"=";
                });
            }
        }
    }
</script>

<style scoped>

</style>
<i18n>
    {
    "en": {
    "api-key-des": "API keys enable you to write data to a channel or read data from a private channel. API keys are auto-generated when you create a new channel. ",
    "api-key-settings": "API Keys Settings",
    "write-api-key": "Write API Key : ",
    "write-api-key-det": "Use this key to write data to a channel. If you feel your key has been compromised, click Generate New Write API Key.",
    "read-api-key": "Read API Key : ",
    "read-api-key-det": "Use this key to allow other people to view your private channel feeds and charts. Click Generate New Read API Key to generate an additional read key for the channel.",
    "note": "Note : ",
    "note-det": "Use this field to enter information about channel read keys. For example, add notes to keep track of users with access to your channel. ",
    "generate": "Generate New API Key",
    "api-requests": "API Requests",
    "update-url": "Update URL",
    "read-url": "Read URLs"
    },
    "fr": {
    "api-key-des": "Les clés API vous permettent d'écrire des données sur un canal ou de lire des données d'un canal privé. Les clés API sont générées automatiquement lorsque vous créez un nouveau canal.",
    "api-key-settings": "Paramètres des clés de l'API",
    "write-api-key": "API Key d'éctiture : ",
    "write-api-key-det": "Utilisez cette touche pour écrire des données sur un canal. Si vous pensez que votre clé a été compromise, cliquez sur Générer une nouvelle clé d'API en écriture.",
    "read-api-key": "API Key de lecture : ",
    "read-api-key-det": "Utilisez cette clé pour permettre à d’autres personnes d’afficher les flux et les graphiques de vos canaux privés. Cliquez sur Générer une nouvelle clé API de lecture pour générer une clé de lecture supplémentaire pour le canal.",
    "note": "Note : ",
    "note-det": "Utilisez ce champ pour saisir des informations sur les clés de lecture de canal. Par exemple, ajoutez des notes pour suivre les utilisateurs ayant accès à votre chaîne.",
    "generate": "Générer une nouvelle clé API",
    "api-requests": "Requêtes API",
    "update-url": "Update URL",
    "read-url": "Read URLs"
    }
    }
</i18n>
