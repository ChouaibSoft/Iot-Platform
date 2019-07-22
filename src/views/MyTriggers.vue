<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span>{{ $t('main-title') }}</span></p>
            </div>

        </div>
        <section class="component-section">
            <div v-if="!(this.getTriggers === null) " class="row">
                <div class="col s12 l8">
                    <table class = "striped bordered">
                        <thead>
                        <tr>
                            <th style="width: 4%">{{ $t('table.id') }}</th>
                            <th>{{ $t('table.name') }}</th>
                            <th>{{ $t('table.created') }}</th>
                            <th>{{ $t('table.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(trigger, index) in displayTriggers" :key="trigger.id" :data-url="'/dashboard/actions/' + trigger.id + '/overview'">
                                <td>{{index + 1}}</td>
                                <td>{{trigger.nom}}</td>
                                <td>30/04/2019</td>
                                <td class="action not-allowed" width="10%">
                                    <router-link :to="{ name: 'trigger-overview', params: { id: trigger.id}}">
                                        <i class="fa fa-plus"></i>
                                    </router-link>
                                    <a href="#" @click="deleteTrigger(trigger.id, index)">
                                        <i class="material-icons prefix red-text lighten-2">delete</i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="right">
                        <ul v-if="pages.length > 1" class="pagination">
                            <li v-if="page != 1" @click="page--"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                            <li v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber" :class="{active: page == pageNumber }"><a href="#!">{{pageNumber}}</a></li>
                            <li class="waves-effect"  @click="page++" v-if="page < pages.length"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                        </ul>
                    </div>
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

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "my-triggers",
        data(){
            return{
                CreatedDate: '',
                page: 1,
                perPage: 8,
                pages: [],
            }
        },
        computed: {
            ...mapGetters(['getTriggers']),
            displayTriggers () {
                return this.paginate(this.getTriggers);
            }
        },
        methods:{
            ...mapActions(['deleteRequest']),
            getDateCreated(data){
                return data.substring(0,10);
            },
            setPages () {
                this.pages = [];
                let numberOfPages = Math.ceil(this.getTriggers.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (triggers) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  triggers.slice(from, to);
            },
            deleteTrigger:function (triggerID, index) {
                var confirmR = confirm(this.$t('trigger.delete-msg'));
                if (confirmR){
                    var payload={
                        'link':'/canal-service/trigers/'+ triggerID,
                        'mutation':'setTriggers',
                    };
                    this.deleteRequest(payload).then(() => {
                        this.getTriggers.splice(index, 1);
                        if(this.getTriggers.length === 0){
                            this.$store.state.triggers = null;
                        }
                        this.flash(this.$t('trigger.delete-success'), 'success');
                    }).catch(() => {
                        this.flash(this.$t('trigger.delete-error'), 'error');
                    })
                }
            },
        },
        watch: {
            getTriggers() {
                this.setPages();
            }
        },
        created() {
            let payload = {
                'link': '/trigger-service/userTriger/' + localStorage.getItem('userId') ,
                'mutation': 'setTriggers',
                'all': false
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
    "main-title": "My Actions",
    "no-trigger": "No Action to display",
    "add-trigger": "New Action",
    "help": "Help",
    "text": "TalkBack enables any device to act on queued commands. For example, if you have a door that is outfitted with Wi-Fi and a motion sensor, you can queue up commands to open and close the door. When the door senses someone nearby, open the door. After a specified time, close the door. If there are no more commands in the queue, the door does not open when the next person approaches.",
    "table": {
    "id": "#",
    "name": "Name",
    "created": "Created",
    "actions": "Actions"
    }
    },
    "fr": {
    "main-title": "Mes Actions",
    "no-trigger": "Aucune Action à Afficher",
    "add-trigger": "Nouveau Action",
    "help": "Aide",
    "text": "TalkBack permet à tout appareil d'agir sur les commandes en file d'attente. Par exemple, si une porte est équipée du Wi-Fi et d'un détecteur de mouvement, vous pouvez mettre en file d'attente les commandes permettant d'ouvrir et de fermer la porte. Lorsque la porte détecte quelqu'un à proximité, ouvrez-la. Après un temps spécifié, fermez la porte. S'il n'y a plus de commandes dans la file d'attente, la porte ne s'ouvre pas à l'approche de la personne suivante. ",
    "table": {
    "id": "#",
    "name": "Nom",
    "created": "Créé",
    "actions": "Actions"
    }
    }
    }
</i18n>
