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
            <div v-if="!(this.getReacts === null)" class="row">
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
                        <tr v-for="(React, index) in displayReacts" :key="index" :data-url="'/dashboard/Reacts/' + React.id">
                            <td>{{index + 1}}</td>
                            <td>{{React.nom}}</td>
                            <td>30/04/2019</td>
                            <td class="action not-allowed" width="15%">
                                <router-link :to="{ name: 'React-overview', params: { id: React.id}}">
                                    <i class="fa fa-chart-bar"></i>
                                </router-link>
                                <a  class="waves-effect waves-light modal-React" href="#modal1">
                                    <i class="material-icons prefix">settings</i>
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
                        {{ $t('no-React') }}
                    </div>
                    <router-link :to="{ name: 'new-React'}" class="waves-effect waves-light btn">
                        {{ $t('add-React') }}
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
        name: "my-reacts",
        data(){
            return{
                CreatedDate: '',
                page: 1,
                perPage: 3,
                pages: [],
            }
        },
        computed: {
            ...mapGetters(['getReacts']),
            displayReacts () {
                return this.paginate(this.getReacts);
            }
        },
        methods:{
            getDateCreated(data){
                return data.substring(0,10);
            },
            setPages () {
                this.pages = [];
                let numberOfPages = Math.ceil(this.getReacts.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (Reacts) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  Reacts.slice(from, to);
            },
        },
        watch: {
            getReacts() {
                this.setPages();
            }
        },
        created() {
            let payload = {
                'link': '/trigger-service/UserReact/' + localStorage.getItem('userId') ,
                'mutation': 'setReacts',
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
    "main-title": "My Reacts",
    "no-React": "No React to display",
    "add-React": "New React",
    "help": "Help",
    "text": "React works with ThingHTTP, ThingTweet, and MATLAB Analysis apps to perform actions when channel data meets a certain condition. For example, you can have a mobile app report your latitude and longitude to a ThingSpeak channel. When your position is within a certain distance of your house, have ThingHTTP turn on your living room lights <br>To create a new reaction, click <strong>New React</strong>.",
    "table": {
    "id": "#",
    "name": "Name",
    "created": "Created",
    "actions": "Actions"
    }
    },
    "fr": {
    "main-title": "Mes Reacts",
    "no-React": "Aucun React à Afficher",
    "add-React": "Nouveau React",
    "help": "Aide",
    "text": "React fonctionne avec les applications ThingHTTP, ThingTweet et MATLAB Analysis pour effectuer des actions lorsque les données de canal remplissent certaines conditions. Par exemple, vous pouvez demander à une application mobile d'indiquer votre latitude et votre longitude à un canal ThingSpeak. Lorsque votre position est à une certaine distance de votre maison, demandez à ThingHTTP d’allumer les lumières de votre salon. <br>Pour créer une nouvelle réaction, cliquez sur <strong> Nouveau React </strong>.",
    "table": {
    "id": "#",
    "name": "Nom",
    "created": "Créé",
    "actions": "Actions"
    }
    }
    }
</i18n>
