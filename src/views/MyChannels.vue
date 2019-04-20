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
            <div v-if="!(this.$store.state.canals === null) " class="row">
                <div class="col s12 l8">
                    <table class = "striped bordered">
                        <thead>
                        <tr>
                            <th>{{ $t('table.name') }}</th>
                            <th>{{ $t('table.description') }}</th>
                            <th>{{ $t('table.created') }}</th>
                            <th>{{ $t('table.updated') }}</th>
                            <th>{{ $t('table.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="canal in getCanals" v-bind:key="canal">
                            <td>{{canal.nom}}</td>
                            <td>{{canal.description}}</td>
                            <td>{{getDateCreated(canal.dateCreation)}}</td>
                            <td>{{getDateCreated(canal.dateCreation)}}</td>
                            <td class="action" width="15%">
                                <router-link :to="{ name: 'view', params: { id: canal.id}}">
                                    <i class="fa fa-chart-bar"></i>
                                </router-link>
                                <router-link :to="{ name: 'api-key', params: { id: canal.id}}">
                                    <i class="material-icons prefix">vpn_key</i>
                                </router-link>
                                <router-link :to="{ name: 'settings', params: { id: canal.id}}">
                                    <i class="material-icons prefix">settings</i>
                                </router-link>
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
                        {{ $t('no-channel') }}
                    </div>
                    <router-link to="/dashboard/channels/new" class="waves-effect waves-light btn">
                        {{ $t('add-channel') }}
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "my-channels",
        data(){
            return{
                CreatedDate: ''
            }
        },
        computed: {
            ...mapGetters(['getCanals']),
        },
        methods:{
            getDateCreated(data){
                return data.substring(0,10);
            }
        },
        created() {
            var payload = {
                'link': '/appUsers/' + this.$store.state.userId + '/canals',
                'mutation': 'setCanals',
                'all': true
            };
            this.$store.dispatch('getRequest', payload);
        }
    }
</script>

<style scoped>

</style>
<i18n>
    {
    "en": {
    "main-title": "My Channels",
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
    "main-title": "Mes Canaux",
    "no-channel": "Aucun Canal à Afficher",
    "add-channel": "Nouveau Canal",
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
