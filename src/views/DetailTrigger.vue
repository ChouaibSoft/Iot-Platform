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
                        <p><strong>{{ $t('trigger-name') }}</strong>{{ getCanal.nom }}</p>
                        <p><strong>{{ $t('trigger-id') }}</strong>#{{ getCanal.id }}</p>
                        <p><strong>{{ $t('trigger-name')}}</strong>@chouaib</p>
                    </div>
                </div>
                <div class="col s12 l7">
                    <div class="Trigger-head ch-head-2" style="border-left: 1px solid #9e9e9e; padding: 0 20px 5px 30px">
                        <p class="description"><strong>{{ $t('description')}}</strong>{{ getCanal.description }}</p>
                        <div>
                            <router-link to="/dashboard/Triggers/new" class="waves-effect waves-light btn delete-Trigger">
                                <i class="fa fa-trash fa-small"></i>
                                {{ $t('delete-trigger') }}
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
                                        <router-link  :to="{ name: 'overview', params: { id: getTrigger.id}}"
                                                      exact-active-class="active">
                                            {{ $t('component-toggle.overview') }}
                                        </router-link>
                                    </li>
                                    <li class="tab col s3">
                                        <router-link :to="{ name: 'settings', params: { id: getTrigger.id}}"
                                                     exact-active-class="active">
                                            {{ $t('component-toggle.trigger-settings') }}
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
        name: "detail-trigger",
        data() {
            return {
            }
        },
        computed: {
            // ...mapGetters(['getCanal', 'getFields'])
        },
        created(){
            // var canalId = this.$route.params.id;
            // var payloadA = {
            //     'link': '/appUsers/' + this.$store.state.userId + '/canals/' + canalId,
            //     'mutation': 'setCanal',
            //     'all': false
            // };
            // this.$store.dispatch('getRequest', payloadA);
            // var payloadB = {
            //     'link': '/canals/' + canalId + '/fields',
            //     'mutation': 'setFields',
            //     'all': true
            // };
            // this.$store.dispatch('getRequest', payloadB);
        },
    }
    $(document).ready(function () {
        $('.tabs').tabs();
    });
</script>

<style scoped>

</style>
<i18n>
    {
    "en": {
    "main-title": "Trigger Trigger :",
    "trigger-name": "Trigger Name :",
    "trigger-id": "Trigger ID :",
    "trigger-owner": "Owner :",
    "description": "Description :",
    "delete-Trigger": "Trigger",
    "component-toggle": {
    "overview": "Overview",
    "trigger-settings": "Trigger Settings"
    }
    },
    "fr": {
    "main-title": "Detail de Trigger",
    "trigger-name": "Nom du Trigger :",
    "trigger-id": "ID du Trigger :",
    "trigger-owner": "Propriétaire :",
    "description": "Description :",
    "delete-Trigger": "Trigger",
    "component-toggle": {
    "overview": "Overview",
    "trigger-settings": "Paramètres de Trigger"
    }
    }
    }
</i18n>
