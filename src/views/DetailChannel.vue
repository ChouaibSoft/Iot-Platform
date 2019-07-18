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
            <div class="row">
                <div class="col s12 l5">
                    <div class="channel-head">
                        <p><strong>{{ $t('channel-name') }}</strong>{{ getCanal.nom }}</p>
                        <p><strong>{{ $t('channel-id') }}</strong>#{{ getCanal.canalId }}</p>
                        <p><strong>{{ $t('channel-owner')}}</strong>@chouaib</p>
                    </div>
                </div>
                <div class="col s12 l7">
                    <div class="channel-head ch-head-2" style="border-left: 1px solid #9e9e9e; padding: 0 20px 5px 30px">
                        <p class="description"><strong>{{ $t('description')}}</strong>{{ getCanal.description }}</p>
                        <div @click="deleteChannel" >
                            <a class="waves-effect waves-light btn delete-channel">
                                <i class="fa fa-trash fa-small"></i>
                                {{ $t('delete-channel') }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="actions">
                        <div class="row">
                            <div class="col s12">
                                <ul class="tabs" id="tabs-swipe-demo">
                                    <li class="tab col s4">
                                        <router-link  :to="{ name: 'view', params: { id: getCanal.canalId}}"
                                                      exact-active-class="active">
                                            {{ $t('component-toggle.view') }}
                                        </router-link>
                                    </li>
                                    <li class="tab col s4">
                                        <router-link :to="{ name: 'api-key', params: { id: getCanal.canalId}}"
                                                     exact-active-class="active">
                                            {{ $t('component-toggle.api-keys') }}
                                        </router-link>
                                    </li>
                                    <li class="tab col s4">
                                        <router-link :to="{ name: 'settings', params: { id: getCanal.canalId}}"
                                                     exact-active-class="active">
                                            {{ $t('component-toggle.channel-settings') }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                            <div  class="col s12 call-component">
                                <router-view></router-view>
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
        name: "detail-channel",
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['getCanal', 'getFields'])
        },
        methods: {
            ...mapActions(['deleteRequest']),
            deleteChannel:function () {
                var confirmR = confirm(this.$t('canal.delete-msg'));
                if (confirmR){
                    let payloadC={
                        'link':'/canal-service/canals/'+ this.getCanal.canalId,
                        'mutation':'setCanals',
                    };
                    this.deleteRequest(payloadC).then(() => {
                        this.flash(this.$t('canal.delete-success'), 'success');
                        let payload = {
                            'link': '/canal-service/canals/'+ localStorage.getItem('userId'),
                            'mutation': 'setCanals',
                            'all': false
                        };
                        this.$store.dispatch('getRequest', payload);
                        this.$router.push('/dashboard/channels');
                    }).catch(() => {
                        this.flash(this.$t('canal.delete-error'), 'error');
                    })
                }
            }
        },
        mounted(){
            // this.$nextTick(function () {
            let canalId = this.$route.params.id;
            let payloadA = {
                'link': '/canal-service/Allcanals/'+ canalId,
                'mutation': 'setCanal',
                'all': false
            };
            this.$store.dispatch('getRequest', payloadA);
            let payloadB = {
                'link': '/canal-service/Allcanals/' + canalId + '/fields',
                'mutation': 'setFields',
                'all': false
            };
            this.$store.dispatch('getRequest', payloadB);
            // });
            $('.tabs').tabs();
        }
    }
</script>
<i18n>
    {
    "en": {
    "main-title": "Channel Detail :",
    "channel-name": "Channel Name :",
    "channel-id": "Channel ID :",
    "channel-owner": "Owner :",
    "description": "Description :",
    "delete-channel": "Channel",
    "component-toggle": {
    "view": "Visualisation",
    "api-keys": "API keys",
    "channel-settings": "Channel Settings",
    "import-export": "Data import / export"
    }
    },
    "fr": {
    "main-title": "Detail du Canal",
    "channel-name": "Nom du Canal :",
    "channel-id": "ID du Canal :",
    "channel-owner": "Propriétaire :",
    "description": "Description :",
    "delete-channel": "Canal",
    "component-toggle": {
    "view": "Visualisation",
    "api-keys": "API keys",
    "channel-settings": "Paramètres",
    "import-export": "Import / Export de données"
    }
    }
    }
</i18n>
