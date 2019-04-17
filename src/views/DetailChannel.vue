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
                    <div class="channel-head" style="border-right: 1px solid #9e9e9e">
                        <div class="row">
                            <div class="col">
                                <strong>{{ $t('channel-name') }}</strong>
                            </div>
                            <div class="col">
                                <p>My Channel</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <strong>{{ $t('channel-id') }}</strong>
                            </div>
                            <div class="col">
                                <p>#1253</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <strong>{{ $t('channel-owner') }}</strong>
                            </div>
                            <div class="col">
                                <p>@chouaib</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 l7">
                    <div class="channel-head">
                        <div class="row">
                            <div class="col">
                                <strong>{{ $t('description') }} </strong>
                            </div>
                            <div class="col">
                                <p>this is description about my channel</p>
                            </div>
                        </div>
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
                                <ul class="tabs">
                                    <li class="tab col s3">
                                        <a v-bind:class="{active:selected == 1}"
                                           @click="component = 'visualisation', selected = 1">
                                            {{ $t('component-toggle.view') }}
                                        </a>
                                    </li>
                                    <li class="tab col s3">
                                        <a  v-bind:class="{active:selected == 2}"
                                           @click="component = 'api-keys', selected = 2">
                                        {{ $t('component-toggle.api-keys') }}
                                    </a>
                                    </li>
                                    <li class="tab col s3">
                                        <a v-bind:class="{active:selected == 3}"
                                           @click="component = 'channel-settings', selected = 3">
                                            {{ $t('component-toggle.channel-settings') }}
                                        </a>
                                    </li>
                                    <li class="tab col s3">
                                        <a v-bind:class="{active:selected == 4}"
                                           @click="component = 'import-export', selected = 4">
                                            {{ $t('component-toggle.import-export') }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div  class="col s12">
                                <component v-bind:is="component"></component>
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
    import Visualisation from '@/components/Visualisation'
    import APIKeys from '@/components/APIKeys'
    import ChannelSettings from '@/components/ChannelSettings'
    import DataImportExport from "@/components/DataImportExport";
    export default {
        name: "detail-channels",
        components : {
            'visualisation': Visualisation,
            'api-keys': APIKeys,
            'channel-settings': ChannelSettings,
            'import-export': DataImportExport
        },
        data() {
            return {
                component: 'visualisation',
                selected: 1,
            }
        },
        computed: {
        },
        created() {

        }
    }
    $(document).ready(function () {
        $(document).ready(function(){
            $('.tabs').tabs();
        });
    })
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
    "view": "VisualisImport / export de donnéesation",
    "api-keys": "API keys",
    "channel-settings": "Paramètres",
    "import-export": "Import / Export de données"
    }
    }
    }
</i18n>
