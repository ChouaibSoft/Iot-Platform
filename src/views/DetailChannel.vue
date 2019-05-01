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
                        <p><strong>{{ $t('channel-id') }}</strong>#{{ getCanal.id }}</p>
                        <p><strong>{{ $t('channel-name')}}</strong>@chouaib</p>
                    </div>
                </div>
                <div class="col s12 l7">
                    <div class="channel-head ch-head-2" style="border-left: 1px solid #9e9e9e; padding: 0 20px 5px 30px">
                        <p class="description"><strong>{{ $t('description')}}</strong>{{ getCanal.description }}</p>
                        <div>
                            <router-link to="/dashboard/channels/new" class="waves-effect waves-light btn delete-channel">
                                <i class="fa fa-trash fa-small"></i>
                                {{ $t('delete-channel') }}
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="actions">
                        <div class="row">
                            <div class="col s12">
                                <ul class="tabs" id="tabs-swipe-demo">
                                    <li class="tab col s3">
                                        <router-link  :to="{ name: 'view', params: { id: getCanal.id}}"
                                                      exact-active-class="active">
                                            {{ $t('component-toggle.view') }}
                                        </router-link>
                                    </li>
                                    <li class="tab col s3">
                                        <router-link :to="{ name: 'api-key', params: { id: getCanal.id}}"
                                                     exact-active-class="active">
                                            {{ $t('component-toggle.api-keys') }}
                                        </router-link>
                                    </li>
                                    <li class="tab col s3">
                                        <router-link :to="{ name: 'settings', params: { id: getCanal.id}}"
                                                     exact-active-class="active">
                                            {{ $t('component-toggle.channel-settings') }}
                                        </router-link>
                                    </li>
                                    <li class="tab col s3">
                                        <router-link to="/dashboard/channels/12/data-import-export"
                                                     exact-active-class="active">
                                            {{ $t('component-toggle.import-export') }}
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
    import { mapGetters } from 'vuex'

    export default {
        name: "detail-channel",
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['getCanal', 'getFields'])
        },
        mounted(){
            // this.$nextTick(function () {
                    var canalId = this.$route.params.id;
                    var payloadA = {
                        'link': '/appUsers/' + this.$store.state.userId + '/canals/' + canalId,
                        'mutation': 'setCanal',
                        'all': false
                    };
                    this.$store.dispatch('getRequest', payloadA);
                    var payloadB = {
                        'link': '/canals/' + canalId + '/fields',
                        'mutation': 'setFields',
                        'all': true
                    };
                    this.$store.dispatch('getRequest', payloadB);
            // });
            $('.tabs').tabs();
        }
    }
</script>

<style scoped>

</style>
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
