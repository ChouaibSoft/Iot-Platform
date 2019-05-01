<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> My Triggers</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <div class="Trigger-head">
                        <p><strong>{{ $t('trigger-name') }}</strong>{{ getTrigger.nom }}</p>
                        <p><strong>{{ $t('trigger-id') }}</strong>#{{ getTrigger.id }}</p>
                        <p><strong>{{ $t('trigger-owner')}}</strong>@chouaib</p>
                    </div>
                </div>
                <div class="col s12 l7">
                    <div class="Trigger-head ch-head-2" style="border-left: 1px solid #9e9e9e; padding: 0 20px 5px 30px">
                        <p><strong class="transparent">{{ $t('trigger-key')}}</strong><span class="red  lighten-4 red-text">{{ getTrigger.apikey }}</span></p>
                        <div>
                            <router-link to="/dashboard/Triggers/new" class="waves-effect waves-light btn delete-Trigger">
                                <i class="fa fa-trash fa-small"></i>
                                {{ $t('delete-trigger') }}
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="trigger-detail">
                        <div class="row">
                            <div class="col s12 l6">
                                <h5>{{$t('commands')}}</h5>
                                <table class = "striped bordered">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{{ $t('table.command-id') }}</th>
                                        <th>{{ $t('table.command-name') }}</th>
                                        <th>{{ $t('table.command-created') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(command, index) in this.getCommands" v-bind:class="{ 'green lighten-5': command.executed	 }" >
                                        <td>{{ index + 1 }}</td>
                                        <td>{{command.id}}</td>
                                        <td>{{command.valeur}}</td>
                                        <td>30/04/2019</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <form class="form add-command" id="add-command" @submit.prevent="pushCommand">
                                    <generic-form>
                                        <div slot="form-fields" style="width: 104%; overflow: hidden">
                                            <div class="row" v-for="(cmd, index) in this.commands" :key="cmd">
                                                <div class="input-field col s12">
                                                    <input
                                                            v-bind:id="cmd.name"
                                                            type="text"
                                                            class="validate"
                                                            minlength="3"
                                                            v-model="commands[index].value">
                                                    <label  v-bind:for="cmd.name" >
                                                        {{ $t('trigger.commandX', {num: index + 1}) }}
                                                    </label>
                                                    <i @click="deleteCommand(index)"  class="fa fa-times delete-field red-text text-darken-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="form-controls" style="width: 104%; overflow: hidden">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="btn waves-effect waves-light submit" @click="addCommand">
                                                        <i style="font-size: .9rem" class="fa fa-plus"></i> {{ $t('trigger.commandX', {num: ''}) }}
                                                    </div>
                                                </div>
                                                <div class="col right">
                                                    <button v-if="this.commands.length > 0" type="submit" class="button waves-effect waves-light btn">
                                                        {{ $t('trigger.add') }}
                                                        <i class="material-icons right">send</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </generic-form>
                                </form>
                            </div>
                            <div class="col s12 l6">
                                <h5>{{$t('api-requests')}}</h5>
                                <div class="urls">
                                    <div>
                                        <h6>{{$t('update-url')}}</h6>
                                        <pre>  POST : http://localhost:8091/ExecuteCommande/<span class="key">{id}</span></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "detail-trigger",
        data() {
            return {
                commands: [],
            }
        },
        computed: {
            ...mapGetters(['getTrigger', 'getCommands', 'getUserId'])
        },
        methods: {
            ...mapActions(['postRequest']),
            pushCommand: function () {
                var postData = {
                    nom: this.getTrigger.nom,
                    userId: this.$store.state.userId
                };
                for(var i = 1; i <= this.commands.length; i++){
                    var key = 'commande' + i,
                        value = this.commands[i-1].value;
                    if (value === '') {
                        break;
                    }
                    postData[key] = value;
                }
                var payload = {
                    'data': postData,
                    'link': '/trigger'
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('trigger.add-success'), 'success');
                }).catch(() => {
                    this.flash(this.$t('trigger.add-error'), 'error');
                })
            },
            addCommand: function () {
                var commande = "Commande" + (this.commands.length + 1);
                this.commands.push({
                    name: commande,
                    value: ''
                });
            },
            deleteCommand: function (index) {
                this.commands.splice(index, 1);
            }
        },
        created(){
            var triggerId = this.$route.params.id;
            var payloadA = {
                'link': '/appUsers/' + this.getUserId + '/trigers/' + triggerId ,
                'mutation': 'setTrigger',
                'all': false
            };
            this.$store.dispatch('getRequest', payloadA);
            var payloadB = {
                'link': '/trigers/' + triggerId  + '/commandes',
                'mutation': 'setCommands',
                'all': true
            };
            this.$store.dispatch('getRequest', payloadB);
            console.log("commands" +  this.getCommands);
        },
    }
</script>

<style scoped>

</style>
<i18n>
    {
    "en": {
    "main-title": "Trigger Detail :",
    "trigger-name": "Trigger Name :",
    "trigger-id": "Trigger ID :",
    "trigger-owner": "Owner :",
    "trigger-key": "API Key : ",
    "description": "Description :",
    "delete-trigger": "Trigger",
    "commands": "Commands",
    "api-requests": "Requêtes API",
    "update-url": "Update URL",
    "table": {
    "command-id": "Command ID",
    "command-name": "Command Name",
    "command-created": "Created"
    }
    },
    "fr": {
    "main-title": "Detail de Trigger",
    "trigger-name": "Nom de Trigger :",
    "trigger-id": "ID de Trigger :",
    "trigger-owner": "Propriétaire :",
    "trigger-key": "API Key : ",
    "description": "Description :",
    "delete-trigger": "Trigger",
    "commands": "Commandes",
    "api-requests": "API Requests",
    "update-url": "Update URL",
    "table": {
    "command-id": "ID Commande",
    "command-name": "Nom Commande",
    "command-created": "Crée"
    }
    }
    }
</i18n>
