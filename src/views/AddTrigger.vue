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
                                                required
                                                v-model="commandes[index].value">
                                        <label  v-bind:for="cmd.name" >
                                            {{ $t('trigger.commandX', {num: index + 1}) }}
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
                                                <i style="font-size: .9rem" class="fa fa-plus"></i> {{ $t('trigger.commandX', {num: ''}) }}
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
                <div class="col l7 s12">
                    <h4>{{ $t('help') }}</h4>
                    <p>{{ $t('trigger-des') }}</p>
                    <h5>{{ $t('trigger-settings') }}</h5>
                    <ul class="help-list">
                        <li>
                            <p><strong>{{ $t('settings.name') }}</strong>{{ $t('settings.name-det') }}</p>
                        </li>
                        <li>
                            <p v-html="this.$t('settings.command-det')"></p>
                        </li>
                    </ul>

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
                    'link': '/trigger'
                };
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
        mounted(){
            $('textarea#description').characterCounter();

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
</script>

<style scoped lang="scss">
</style>
<i18n>
    {
    "en": {
    "main-title": "New Trigger",
    "trigger-des": "Use the TalkBack app to send new commands to any device.",
    "trigger-settings": "Trigger Settings",
    "settings": {
    "name": "Trigger Name : ",
    "name-det": "Enter a unique name for your Trigger.",
    "command": "Commands",
    "command-det": "<strong>Commands : </strong> Click  <strong>+ command </strong> to queue new commands to your TalkBack. You can also queue up commands using the Trigger API."
    }

    },
    "fr": {
    "main-title": "Nouveau Trigger",
    "trigger-settings": "Paramètres de Trigger",
    "settings": {
    "name": "Nom du Trigger : ",
    "name-det": "Entrez un nom unique pour votre triggers.",
    "command": "Commandes",
    "command-det": "<strong>Commandes : </strong> Cliquez sur  <strong>+ commande </strong> pour ajouter une nouvelle commande pour votre trigger"
    }
    }
    }
</i18n>
