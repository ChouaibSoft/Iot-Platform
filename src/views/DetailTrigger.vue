<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> {{ $t('main-title') }}</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <div class="Trigger-head">
                        <p><strong>{{ $t('trigger-name') }}</strong>{{ this.trigger.nom }}</p>
                        <p><strong>{{ $t('trigger-id') }}</strong>#{{ this.trigger.id }}</p>
                        <p><strong>{{ $t('trigger-owner')}}</strong>@chouaib</p>
                    </div>
                </div>
                <div class="col s12 l7">
                    <div class="Trigger-head ch-head-2"
                         style="border-left: 1px solid #9e9e9e; padding: 0 20px 5px 30px">
                        <p><strong class="transparent">{{ $t('trigger-key')}}</strong><span
                                class="red  lighten-4 red-text">{{ this.trigger.apikey }}</span></p>
                        <div>
                            <router-link to="/dashboard/Triggers/new"
                                         class="waves-effect waves-light btn delete-Trigger">
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
                                <table class="striped bordered">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{{ $t('table.command-id') }}</th>
                                        <th>{{ $t('table.command-name') }}</th>
                                        <th>{{ $t('table.command-created') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(command, index) in displayCommands" v-bind:key="command.id"
                                        v-bind:class="{ 'teal lighten-4': command.executed}">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{command.id}}</td>
                                        <td>{{command.valeur}}</td>
                                        <td>30/04/2019</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="right">
                                    <ul v-if="pages.length > 1" class="pagination">
                                        <li v-if="page != 1" @click="page--"><a href="#!"><i class="material-icons">chevron_left</i></a>
                                        </li>
                                        <li v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber"
                                            :class="{active: page == pageNumber }"><a href="#!">{{pageNumber}}</a></li>
                                        <li class="waves-effect" @click="page++" v-if="page < pages.length"><a
                                                href="#!"><i class="material-icons">chevron_right</i></a></li>
                                    </ul>
                                </div>
                                <form class="form add-command" id="add-command" @submit.prevent="pushCommand">
                                    <generic-form>
                                        <div slot="form-fields">
                                            <div class="row" v-for="(cmd, index) in this.commands" :key="cmd">
                                                <div class="input-field col s12">
                                                    <input
                                                            v-bind:id="cmd.name"
                                                            type="text"
                                                            class="validate"
                                                            minlength="3"
                                                            v-model="commands[index].value">
                                                    <label v-bind:for="cmd.name">
                                                        {{ $t('trigger.commandX', {num: index + 1}) }}
                                                    </label>
                                                    <i @click="deleteCommand(index)"
                                                       class="fa fa-times delete-field red-text text-darken-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="form-controls">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="btn waves-effect waves-light submit"
                                                         @click="addCommand">
                                                        <i style="font-size: .9rem" class="fa fa-plus"></i> {{
                                                        $t('trigger.commandX', {num: ''}) }}
                                                    </div>
                                                </div>
                                                <div class="col right">
                                                    <button v-if="this.commands.length > 0" :disabled="look === true" type="submit"
                                                            class="button waves-effect waves-light btn">
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
                                        <pre>  POST : <span>{{ getApiUrl }}/ExecuteCommands/</span><span class="key">{{IdTriger}}</span></pre>

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
    import {mapActions, mapGetters} from 'vuex'
    import Form from "@/components/Form";

    export default {
        name: "detail-trigger",
        data() {
            return {
                commands: [],
                IdTriger: '',
                page: 1,
                perPage: 4,
                pages: [],
                trigger: '',
                triggerCommands: '',
                look: false
            }
        },
        components: {
            'generic-form': Form,
        },
        computed: {
            ...mapGetters(['getTrigger', 'getUserId', 'getApiUrl']),
            displayCommands() {
                return this.paginate(this.triggerCommands);
            },
            getCommands(){
                return this.triggerCommands;
             }
        },
        methods: {
            ...mapActions(['postRequest', 'getRequestLite']),
            pushCommand: function () {
                this.look = true
                var postData = {};
                for (var i = 1; i <= this.commands.length; i++) {
                    var key = 'commande' + i,
                        value = this.commands[i - 1].value;
                    if (value === '') {
                        break;
                    }
                    postData[key] = value;
                }
                var payload = {
                    'data': postData,
                    'link': '/trigger-service/trigers/' + this.IdTriger
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('commande.add-success'), 'success');
                    var payloadB = {
                        'link': '/trigger-service/trigers/' + this.IdTriger + '/commandes'
                    };
                    this.getRequestLite(payloadB).then(request => {
                        this.triggerCommands = request.data
                    }).catch( (err)=> {
                        console.log("error " + err);
                    });
                    this.commands = [];
                }).catch(() => {
                    this.flash(this.$t('commande.add-error'), 'error');
                })
                this.look = false;
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
            },
            setPages() {
                this.pages = [];
                let numberOfPages = Math.ceil(this.triggerCommands.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate(commands) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return commands.slice(from, to);
            }
        },
        watch: {
            getCommands() {
                this.setPages();
            }
        },
        created() {
            var triggerId = this.$route.params.id;
            this.IdTriger = triggerId
            var payloadA = {
                'link': '/trigger-service/trigers/' + triggerId
            };

            this.getRequestLite(payloadA).then(request => {
                this.trigger = request.data
                 }).catch( (err)=> {
                    console.log("error " + err);
            });

            this.$store.dispatch('getRequest', payloadA);
            var payloadB = {
                'link': '/trigger-service/trigers/' + triggerId + '/commandes'
            };
            this.getRequestLite(payloadB).then(request => {
                this.triggerCommands = request.data
            }).catch( (err)=> {
                console.log("error " + err);
            });
        }
    }
</script>

<style scoped>
</style>
<i18n>
    {
    "en": {
    "main-title": "Action Detail :",
    "trigger-name": "Action Name :",
    "trigger-id": "Action ID :",
    "trigger-owner": "Owner :",
    "trigger-key": "API Key : ",
    "description": "Description :",
    "delete-trigger": "Action",
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
    "main-title": "Detail de Action",
    "trigger-name": "Nom de l'Action :",
    "trigger-id": "ID de Action :",
    "trigger-owner": "Propriétaire :",
    "trigger-key": "API Key : ",
    "description": "Description :",
    "delete-trigger": "Action",
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
