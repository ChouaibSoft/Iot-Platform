<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span></span></p>
            </div>
        </div>
        <section class="component-section">
            <div v-if="!(this.getCanals === null) " class="row">
                <div class="col s12 l8">
                    <table class = "striped bordered">
                        <thead>
                        <tr>
                            <th style="width: 4%">{{ $t('table.num') }}</th>
                            <th>{{ $t('table.name') }}</th>
                            <th>{{ $t('table.description') }}</th>
                            <th>{{ $t('table.created') }}</th>
                            <th>{{ $t('table.updated') }}</th>
                            <th>{{ $t('table.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(canal, index) in displayChannels"  :key="index" :data-url="'/dashboard/channels/' + canal.id +  '/view'">
                                <td>{{ index + 1 }}</td>
                                <td>{{canal.nom}}</td>
                                <td>{{canal.description.length > 40 ? canal.description.substring(1, 50) + '...': canal.description }}</td>
                                <td>{{getDateCreated(canal.dateCreation)}}</td>
                                <td>{{getDateCreated(canal.dateCreation)}}</td>
                                <td class="action not-allowed">
                                    <router-link :to="{ name: 'view', params: { id: canal.id}}">
                                        <i class="fa fa-chart-bar"></i>
                                    </router-link>
                                    <router-link :to="{ name: 'api-key', params: { id: canal.id}}">
                                        <i class="material-icons prefix">vpn_key</i>
                                    </router-link>
                                    <router-link :to="{ name: 'settings', params: { id: canal.id}}">
                                        <i class="material-icons prefix">settings</i>
                                    </router-link>
                                    <a href="#" @click="deleteChannel(canal.id, index)">
                                        <i class="material-icons prefix red-text lighten-2">delete</i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="right">
                        <ul v-if="pages.length > 1" class="pagination">
                            <li v-if="page != 1" @click="page--"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                            <li v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber" :class="{active: page == pageNumber }"><a href="#!">{{pageNumber}}</a></li>
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
                        {{ $t('no-channel') }}
                    </div>
                    <router-link :to="{ name: 'new-channel' }" class="waves-effect waves-light btn">
                        {{ $t('add-channel') }}
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "my-channels",
        data(){
            return{
                CreatedDate: '',
                page: 1,
                perPage: 3,
                pages: [],
            }
        },
        computed: {
            ...mapGetters(['getCanals', 'getUserId']),
            displayChannels () {
                return this.paginate(this.getCanals);
            }
        },
        methods:{
            ...mapActions(['deleteRequest']),
            getDateCreated(data){
                return data.substring(0,10);
            },
            deleteChannel:function (canalID, index) {
                var confirmR = confirm(this.$t('canal.delete-msg'));
                if (confirmR){
                    var payload={
                        'link':'/canals/'+ canalID,
                        'mutation':'setCanals',
                    };
                    this.deleteRequest(payload).then(() => {
                        this.getCanals.splice(index, 1);
                        if(this.getCanals.length === 0){
                            this.$store.state.canals = null;
                        }
                        this.flash(this.$t('canal.delete-success'), 'success');
                    }).catch(() => {
                        this.flash(this.$t('canal.delete-error'), 'error');
                    })
                }
            },
            setPages () {
                this.pages = [];
                let numberOfPages = Math.ceil(this.getCanals.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (channels) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  channels.slice(from, to);
            }
        },
        watch: {
            getCanals() {
                this.setPages();
            }
        },
        created() {
            var payload = {
                'link': '/appUsers/' + this.getUserId + '/canals',
                'mutation': 'setCanals',
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
        }
    }
</script>
<i18n>
    {
    "en": {
    "main-title": "My Channels",
    "no-channel": "No Channel to displayed",
    "add-channel": "New Channel",
    "help": "Help",
    "text": "Collect data in a Iot-Platform ESI-SBA channel from a device, from another channel, or from the web. <br>Click <strong>New Channel </strong> to create a new Iot-Platform ESI-SBA channel. <br>Click on the column headers of the table to sort by the entries in that column or click on a tag to show channels with that tag.",
    "table": {
        "num": "#",
        "name": "Name",
        "description": "Description",
        "created": "Created",
        "updated": "Updated",
        "actions": "Actions"
    }
    },
    "fr": {
    "main-title": "Mes Canaux",
    "no-channel": "Aucun Canal à Afficher",
    "add-channel": "Nouveau Canal",
    "help": "Aide",
    "text": "Collectez des données sur un canal ESI-SBA Iot-Platform à partir d'un périphérique, d'un autre canal ou du Web. <br> Cliquez sur <strong> Nouveau canal </strong> pour créer un nouveau canal ESI-SBA Iot-Platform. <br> Cliquez sur les en-têtes de colonne du tableau pour trier les entrées de cette colonne ou cliquez sur une balise pour afficher les canaux avec cette balise.",
    "table": {
        "num": "#",
        "name": "Nom",
        "description": "Description",
        "created": "Créé",
        "updated": "mis à jour",
        "actions": "Actions"
    }
    }
    }
</i18n>
