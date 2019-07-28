<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> {{ $t('main-title') }}</span></p>
            </div>
        </div>
        <section class="component-section">
            <div class="row">
                <div class="col l5 s12">
                    <form class="form" id="add-canal" @submit.prevent="addTimeControl">
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
                                        <label for="name">{{ $t('time-control.name') }}</label>
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
                                        <input
                                                id="datecontrol"
                                                type="date"
                                                v-model="dateControl"
                                        >
                                        <label for="name">{{ $t('time-control.date') }}</label>
                                    </div>
                                </div>
                                <h5>{{ $t('time-start') }}</h5>
                                <div class="row">
                                    <div class="input-field col s12 l4">
                                        <select v-model="hr" name="Hour">
                                            <option value="" disabled selected>{{$t('hour')}}</option>
                                            <option  v-for="n in 12" :key="n" >{{n}}</option>
                                        </select>
                                    </div>
                                    <div class="input-field col s12 l4">
                                        <select v-model="min" name="Minutes">
                                            <option value="" disabled selected>{{$t('minute')}}</option>
                                            <option  v-for="m in 59" :key="m">{{m}}</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <p style="display: inline-block">
                                            <label>
                                                <input name="group1" type="radio" checked />
                                                <span>am</span>
                                            </label>
                                        </p>
                                        <p style="display: inline-block; margin-top: 30px">
                                            <label>
                                                <input name="group1" type="radio" />
                                                <span>pm</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                                <h5>{{ $t('time-end') }}</h5>
                                <div class="row">
                                    <div class="input-field col s12 l4">
                                        <select v-model="hrA" name="Hour">
                                            <option value="" disabled selected>{{$t('hour')}}</option>
                                            <option  v-for="n in 12" :key="n" >{{n}}</option>
                                        </select>
                                    </div>
                                    <div class="input-field col s12 l4">
                                        <select v-model="minA" name="Minutes">
                                            <option value="" disabled selected>{{$t('minute')}}</option>
                                            <option  v-for="m in 59" :key="m">{{m}}</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <p style="display: inline-block">
                                            <label>
                                                <input name="group2" type="radio" checked />
                                                <span>am</span>
                                            </label>
                                        </p>
                                        <p style="display: inline-block; margin-top: 30px">
                                            <label>
                                                <input name="group2" type="radio" />
                                                <span>pm</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">

                                        <input id="cmd"
                                               type="text"
                                               class="validate"
                                               minlength="3"
                                               v-model="commande"
                                               placeholder="Commande"
                                        >

                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col right">
                                            <button type="submit" :disabled="lock === true" class="button waves-effect waves-light btn">
                                                {{ $t('time-control.add') }}
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
                        <h5>{{ $t('time-control') }}</h5>
                        <p>{{ $t('time-control-des') }}</p>
                        <h5>{{ $t('time-control-settings') }}</h5>
                        <ul class="help-list">
                            <li>
                                <p><strong>{{ $t('settings.name') }}</strong>{{ $t('settings.name-det') }}</p>
                            </li>
                            <li>
                                <p><strong>{{ $t('settings.time') }}</strong>{{ $t('settings.time-det') }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import {mapState, mapActions, mapGetters} from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";
    export default {
        name: "AddTimeControl",
        components: {
            'generic-form': Form


        },
        data (){
            return{
                name: '',
                dateControl:'',
                hr:'',
                min:'',
                hrA:'',
                minA:'',
                commande:'',
                iduser:'',
                trigeID:'',
                hour : '',
                minu: '',
                lock : false
            }
        },
        computed:{
            ...mapState['userId'],
            ...mapGetters(['getUserId', 'getToken', 'getAPIUrl','getTriggers'])

        },
        created() {

            let payload = {
                'link': '/trigger-service/userTriger/' + localStorage.getItem('userId') ,
                'mutation': 'setTriggers',
                'all': false
            };
            this.$store.dispatch('getRequest', payload);

            console.log(this.getTriggers)

        },
        methods: {
            ...mapActions(['postRequest']),
            addTimeControl: function () {
                this.lock = true
                let postData = {
                    nom: this.name,
                    dateControl:this.dateControl,
                    timeHour:this.hr,
                    minutesHour:this.min,
                    hourD:this.hrA,
                    minD:this.minA,
                    commande: this.commande,
                    idTriger: this.trigeID,
                    idUser: localStorage.getItem('userId')

                };
                let payload = {
                    'data': postData,
                    'link': '/trigger-service/timeControl'
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('react.add-success'), 'success');
                    this.$router.push('/dashboard/');

                }).catch(() => {
                    this.flash(this.$t('react.add-error'), 'error');
                    console.log(this.timeControl.toString()
                    )

                })
            }},
        mounted(){
            $('textarea#description').characterCounter();
            $('select').formSelect();
        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            value: {
                required,
            }
        },
    }
</script>
<style scoped>

</style>

<i18n>
    {
    "en": {
    "main-title": "New Time Control",
    "time-control": "Time Control",
    "time-control-des": "Use the TimeControl app to trigger an action at a specified time. You can set up TimeControl to run MATLAB® code, send ThingTweet statuses, add new TalkBack commands, or send ThingHTTP requests.",
    "time-control-settings": "Time Control Settings",
    "not-enough": "you can't add any more a channel",
    "time-start": "Time Start : ",
    "time-end": "End Time : ",
    "hour": "Hour",
    "minute": "Minute",
    "settings": {
    "name": "Name : ",
    "name-det": "Enter a unique name for this TimeControl.",
    "time": "Heure",
    "time-det": "Enter the time at which the TimeControl runs."
    }
    },
    "fr": {
    "main-title": "Nouveau Time Control",
    "time-control": "Time Control",
    "time-control-des": "Utilisez l'application TimeControl pour déclencher une action à une heure spécifiée. Vous pouvez configurer TimeControl pour exécuter du code MATLAB®, envoyer des statuts ThingTweet, ajouter de nouvelles commandes TalkBack ou envoyer des requêtes ThingHTTP.",
    "time-control-settings": "Paramètres de Time Control",
    "time-start": "Heure de Débût : ",
    "time-end": "Heure de Fin : ",
    "hour": "Hour",
    "minute": "Minute",
    "settings": {
    "name": "Nom : ",
    "name-det": "Entrez un nom unique pour ce TimeControl. ",
    "time": "Temp",
    "time-det": "Entrez l'heure à laquelle TimeControl s'exécute."
    }
    }
    }
</i18n>
