<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> My Channels</span></p>
            </div>

        </div>
        <section class="component-section">
            <div v-if="!(this.getTriggers === null) " class="row">
                <div class="col s12 l8">
                    <table class = "striped bordered">
                        <thead>
                        <tr>
                            <th>{{ $t('table.id') }}</th>
                            <th>{{ $t('table.name') }}</th>
                            <th>{{ $t('table.created') }}</th>
                            <th>{{ $t('table.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(trigger, index) in this.getTriggers" :data-url="'/dashboard/triggers/' + trigger.id">
                            <td>{{index + 1}}</td>
                            <td>{{trigger.nom}}</td>
                            <td>30/04/2019</td>
                            <td class="action not-allowed" width="15%">
                                <router-link :to="{ name: 'trigger-overview', params: { id: trigger.id}}">
                                    <i class="fa fa-chart-bar"></i>
                                </router-link>
                                <a  class="waves-effect waves-light modal-trigger" href="#modal1">
                                    <i class="material-icons prefix">vpn_key</i>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col l4 s12">
                    <div class="help">
                        <h4>{{ $t('help') }}</h4>
                        <p v-html="this.$t('text')"></p>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div  class="col s12">
                    <div class="alert alert-info" role="alert">
                        {{ $t('no-trigger') }}
                    </div>
                    <router-link :to="{ name: 'new-trigger'}" class="waves-effect waves-light btn">
                        {{ $t('add-trigger') }}
                    </router-link>
                </div>
            </div>
        </section>
        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "my-triggers",
        data(){
            return{
                CreatedDate: ''
            }
        },
        computed: {
            ...mapGetters(['getTriggers', 'getUserId'])
        },
        methods:{
            getDateCreated(data){
                return data.substring(0,10);
            }
        },
        created() {
            let payload = {
                'link': '/appUsers/' + this.getUserId + '/trigers',
                'mutation': 'setTriggers',
                'all': true
            };
            this.$store.dispatch('getRequest', payload);
        },
        mounted(){
            $("tr").find("td").click(function(){
                if (!($(this).hasClass("not-allowed"))){
                    window.location = $(this).parent("tr").data('url');
                }
            });
            $('.modal').modal();
        }
    }
</script>
<i18n>
    {
    "en": {
    "main-title": "My Triggers",
    "no-trigger": "No Trigger to display",
    "add-trigger": "New Trigger",
    "help": "Help",
    "text": "TalkBack enables any device to act on queued commands. For example, if you have a door that is outfitted with Wi-Fi and a motion sensor, you can queue up commands to open and close the door. When the door senses someone nearby, open the door. After a specified time, close the door. If there are no more commands in the queue, the door does not open when the next person approaches.",
    "table": {
    "id": "ID",
    "name": "Name",
    "created": "Created",
    "actions": "Actions"
    }
    },
    "fr": {
    "main-title": "Mes Triggers",
    "no-trigger": "Aucun Trigger à Afficher",
    "add-trigger": "Nouveau Trigger",
    "help": "Aide",
    "text": "TalkBack permet à tout appareil d'agir sur les commandes en file d'attente. Par exemple, si une porte est équipée du Wi-Fi et d'un détecteur de mouvement, vous pouvez mettre en file d'attente les commandes permettant d'ouvrir et de fermer la porte. Lorsque la porte détecte quelqu'un à proximité, ouvrez-la. Après un temps spécifié, fermez la porte. S'il n'y a plus de commandes dans la file d'attente, la porte ne s'ouvre pas à l'approche de la personne suivante. ",
    "table": {
    "id": "ID",
    "name": "Nom",
    "created": "Créé",
    "actions": "Actions"
    }
    }
    }
</i18n>
