<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> Ajouter Trigger</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <form class="form" id="add-canal" @submit.prevent="addTrigger">
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
                                        <label for="name">{{ $t('trigger.name') }}</label>
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

                                <div class="row" v-for="(cmd, index) in commandes" :key="cmd">
                                    <div class="input-field col s12">
                                        <input
                                                v-bind:id="cmd.name"
                                                type="text"
                                                class="validate"
                                                minlength="3"
                                                v-model="commandes[index].value">
                                        <label  v-bind:for="cmd.name" >
                                            {{ $t('trigger.commandeX', {num: index + 1}) }}
                                        </label>
                                        <i @click="deleteCommande(index)" v-if="index > 0" class="fa fa-times delete-field red-text text-darken-5"></i>
                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col">
                                            <div v-if="commandes.length < 8" @click="addCommande" class="btn waves-effect waves-light submit">
                                                <i style="font-size: .9rem" class="fa fa-plus"></i> {{ $t('trigger.commandeX', {num: ''}) }}
                                            </div>
                                        </div>
                                        <div class="col right">
                                            <button type="submit" class="button waves-effect waves-light btn">
                                                {{ $t('trigger.add') }}
                                                <i class="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </generic-form>
                    </form>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";
    export default {
        name: "new-trigger",
        components: {
            'generic-form': Form
        },
        data (){
            return{
                name: '',
                id: '',
                commandes: [
                    {
                        name: 'Commande 1',
                        value: ''
                    },
                ],
                iduser:'',
            }
        },
        computed:{
            ...mapState['userId']
        },
        methods: {
            ...mapActions(['postRequest']),
            addTrigger: function () {
                var postData = {
                    nom: this.name,
                    userId: this.$store.state.userId
                };
                console.log(this.$store.state.userId)
                for(var i = 1; i <= this.commandes.length; i++){
                    var key = 'commande' + i,
                        value = this.commandes[i-1].value;
                    if (value === '') {
                        break;
                    }
                    postData[key] = value;
                }
                var payload = {
                    'data': postData,
                    'link': '/trigger'};
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('trigger.add-success'), 'success');
                    this.$router.push('/dashboard/triggers');
                }).catch(() => {
                    this.flash(this.$t('trigger.add-error'), 'error');
                })
            },
            addCommande: function () {
                var commande = "Commande" + (this.commandes.length + 1);
                this.commandes.push({
                    name: commande,
                    value: ''
                });
            },
            deleteCommande: function (index) {
                this.commandes.splice(index, 1);
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            commandes: {
                minLength: minLength(3)
            }
        },
    }
    $(document).ready(function () {
        $('textarea#description').characterCounter();
    })
</script>

<style scoped lang="scss">
</style>
<i18n>
    {
    "en": {
    "main-title": "Nouveau Trigger",
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
    "main-title": "Nouveau Trigger",
    "no-channel": "Aucun Canal à Afficher",
    "add-channel": "Nouveau Trigger",
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
