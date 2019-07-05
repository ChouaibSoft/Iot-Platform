<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> Ajouter Canal</span></p>
            </div>
        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <form class="form" id="add-canal" @submit.prevent="addCanal">
                        <generic-form>
                            <div slot="form-fields">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="name"
                                                type="text"
                                                required
                                                minlength="3"
                                                class="validate"
                                                v-model="name"
                                                @input="$v.name.$touch()">
                                        <label for="name">{{ $t('canal.name') }}</label>
                                        <div v-if="$v.name.$dirty">
                                            <p class="error-message red-text " v-if="!$v.name.required">
                                                {{ $t('errors.required') }}
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.name.minLength">
                                                {{ $t('errors.min-length', {minLength: 3}) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <textarea
                                                id="description"
                                                data-length="120"
                                                class="materialize-textarea validate"
                                                required
                                                minlength="5"
                                                v-model="description"
                                                @input="$v.description.$touch()">
                                        </textarea>
                                        <label for="description">{{ $t('canal.description') }}</label>
                                        <div v-if="$v.description.$dirty">
                                            <p class="error-message red-text " v-if="!$v.description.required">
                                                {{ $t('errors.required') }}
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.description.minLength">
                                                {{ $t('errors.min-length', {minLength: 5}) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-for="(field, index) in fields" :key="field">
                                    <div class="input-field col s12">
                                        <input
                                                v-bind:id="field.name"
                                                type="text"
                                                class="validate"
                                                minlength="3"
                                                required
                                                v-model="fields[index].value">
                                        <label  v-bind:for="field.name" >
                                           {{ $t('canal.fieldX', {num: index + 1}) }}
                                        </label>
                                        <i @click="deleteField(index)" v-if="index > 0" class="fa fa-times delete-field red-text text-darken-5"></i>
                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col">
                                            <div v-if="fields.length < 8" @click="addField" class="btn waves-effect waves-light submit">
                                            <i style="font-size: .9rem" class="fa fa-plus"></i> {{ $t('canal.fieldX', {num: ''}) }}
                                            </div>
                                        </div>
                                        <div class="col right">
                                            <button type="submit" class="button waves-effect waves-light btn">
                                                {{ $t('canal.add') }}
                                                <i class="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </generic-form>
                    </form>
                </div>
                <div class="col l7 s12">
                    <div class="help">
                        <h4>{{ $t('help') }}</h4>
                        <h5>{{ $t('channel') }}</h5>
                        <p>{{ $t('channel-des') }}</p>
                        <h5>{{ $t('channel-settings') }}</h5>
                        <ul class="help-list">
                            <li>
                                <p><strong>{{ $t('settings.name') }}</strong>{{ $t('settings.name-det') }}</p>
                            </li>
                            <li>
                                <p><strong>{{ $t('settings.description') }}</strong>{{ $t('settings.description-det') }}</p>
                            </li>
                            <li>
                                <p><strong>{{ $t('settings.field#') }}</strong>{{ $t('settings.field#-det') }}</p>
                            </li>
                            <li>
                                <strong>{{ $t('settings.location') }}</strong>
                                <ul>
                                    <li>
                                        <p><strong>{{ $t('settings.latitude') }}</strong>
                                            {{ $t('settings.latitude-det') }}
                                        </p>
                                    </li>
                                    <li>
                                        <p><strong>{{ $t('settings.longitude') }}</strong>
                                            {{ $t('settings.longitude-det') }}
                                        </p>
                                    </li>
                                    <li>
                                        <p><strong>{{ $t('settings.evaluation') }}</strong>
                                            {{ $t('settings.evaluation-det') }}
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState, mapActions,mapGetters } from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";

    export default {
        name: "add-channel",
        components: {
            'generic-form': Form
        },
        data (){
            return{
                name: '',
                description: '',
                id: '',
                fields: [
                    {
                        name: 'field1',
                        value: ''
                    },
                ],
                iduser:'',
            }
        },
        methods: {
            ...mapActions(['postRequest']),
            addCanal: function () {
                let postData = {
                    nom: this.name,
                    description: this.description,
                    userId: localStorage.getItem('userId')
                };

                for(let i = 1; i <= this.fields.length; i++){
                    let key = 'field' + i,
                        value = this.fields[i-1].value;
                    if (value === '') {
                        break;
                    }
                    postData[key] = value;
                }
                let payload = {
                    'data': postData,
                    'link': '/canal-service/add-canal'};
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('canal.add-success'), 'success');
                    this.$router.push('/dashboard/channels');
                }).catch(() => {
                        this.flash(this.$t('canal.add-error'), 'error');
                })
            },
            addField: function () {
                let field = "field" + (this.fields.length + 1);
                this.fields.push({
                    name: field,
                    value: ''
                });
            },
            deleteField: function (index) {
                this.fields.splice(index, 1);
            }
        },
        mounted(){
            $('textarea#description').characterCounter();

        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            description: {
                required,
                minLength: minLength(5),
            },
            fields: {
                minLength: minLength(3)
            }
        },
    }
</script>

<style scoped lang="scss">


</style>
<i18n>
    {
    "en": {
    "main-title": "New Channel",
    "channel": "Channel",
    "channel-des": "Channels store all the data that a Iot-Platform ESI-SBA application collects. Each channel includes eight fields that can hold any type of data, plus three fields for location data and one for status data. Once you collect data in a channel, you can use ThingSpeak apps to analyze and visualize it.",
    "channel-settings": "Channel Settings",
    "settings": {
        "name": "Channel Name : ",
        "name-det": "Enter a unique name for the Iot-Platform ESI-SBA channel.",
        "description": "Description : ",
        "description-det": "Enter a description of the Iot-Platform ESI-SBA channel.",
        "field#": "Field# : ",
        "field#-det": "Check the box to enable the field, and enter a field name. Each Iot-Platform ESI-SBA channel can have up to 8 fields.",
        "location": "Show Channel Location : ",
        "latitude": "Latitude : ",
        "latitude-det": "Specify the latitude position in decimal degrees. For example, the latitude of the city of London is 51.5072.",
        "longitude": "Longitude : ",
        "longitude-det": "Specify the longitude position in decimal degrees. For example, the longitude of the city of London is -0.1275.",
        "evaluation": "Evaluation : ",
        "evaluation-det": "Specify the elevation position meters. For example, the elevation of the city of London is 35.052. "
    }
    },
    "fr": {
    "main-title": "Nouveau Canal",
    "channel": "Canal",
    "channel-des": "Les canaux stockent toutes les données collectées par une application Iot-Platform ESI-SBA. Chaque canal comprend huit champs pouvant contenir tout type de données, ainsi que trois champs pour les données de localisation et un pour les données d'état. , vous pouvez utiliser les applications ThingSpeak pour l’analyser et le visualiser. ",
    "channel-settings": "Paramètres de Canal",
    "settings": {
    "name": "Nom du Canal : ",
    "name-det": "Enter a unique name for the Iot-Platform ESI-SBA channel.",
    "description": "Description : ",
    "description-det": "Entrez un nom unique pour le canal Iot-Platform ESI-SBA.",
    "field#": "Champ# : ",
    "field#-det": "Cochez la case pour activer le champ et entrez un nom de champ. Chaque canal Iot-Platform ESI-SBA peut avoir jusqu'à 8 champs.",
    "location": "Montrer le Canal : ",
    "latitude": "Latitude : ",
    "latitude-det": "Spécifiez la position de latitude en degrés décimaux. Par exemple, la latitude de la ville de Londres est 51.5072.",
    "longitude": "Longitude : ",
    "longitude-det": "Spécifiez la position de la longitude en degrés décimaux. Par exemple, la longitude de la ville de Londres est -0.1275.",
    "evaluation": "Evaluation : ",
    "evaluation-det": "Spécifiez les indicateurs de position d'élévation. Par exemple, l’altitude de la ville de Londres est de 35,052."
    }
    }
    }
</i18n>
