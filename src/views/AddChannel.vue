<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>New Channel</h2>
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
                                        <label for="name">Name</label>
                                        <div v-if="$v.name.$dirty">
                                            <p class="error-message red-text " v-if="!$v.name.required">
                                                name field is required.
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.name.minLength">
                                                the field length must be greater than 3 characters.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="description"
                                                type="text"
                                                class="validate"
                                                required
                                                minlength="5"
                                                maxlength="30"
                                                v-model="description"
                                                @input="$v.description.$touch()">
                                        <label for="description">description</label>
                                        <div v-if="$v.description.$dirty">
                                            <p class="error-message red-text " v-if="!$v.description.required">
                                                description field is required.
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.description.minLength">
                                                the field description must be greater than 5 characters.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-for="(field, index) in fields">
                                    <div class="input-field col s12">
                                        <input
                                                v-bind:id="field.name"
                                                type="text"
                                                class="validate"
                                                minlength="3"
                                                v-model="fields[index].value">
                                        <label  v-bind:for="field.name" >Field {{ index + 1 }}</label>
                                        <i @click="deleteField(index)" v-if="index > 2" class="fa fa-times delete-field red-text text-darken-5"></i>
                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col">
                                            <div v-if="fields.length < 8" @click="addField" class="btn waves-effect waves-light submit"><i style="font-size: .9rem" class="fa fa-plus"></i> Field</div>
                                        </div>
                                        <div class="col right">
                                            <button class="btn waves-effect waves-light" type="submit" name="action">Add
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
                        <h4>Help</h4>
                        <h5>Channel</h5>
                        <p>
                            Channels store all the data that a ThingSpeak application collects. Each channel includes eight fields that can hold any type of data, plus three fields for location data and one for status data. Once you collect data in a channel, you can use ThingSpeak apps to analyze and visualize it.
                        </p>
                        <h5>Channel Settings</h5>
                        <ul class="help-list">
                            <li>
                                <p><strong>Channel Name: </strong>Enter a unique name for the ThingSpeak channel.</p>
                            </li>
                            <li>
                                <p><strong>Description : </strong>Enter a description of the ThingSpeak channel.</p>
                            </li>
                            <li>
                                <p><strong>Field#: </strong>Check the box to enable the field, and enter a field name. Each ThingSpeak channel can have up to 8 fields.</p>
                            </li>
                            <li>
                                <strong>Show Channel Location:</strong>
                                <ul>
                                    <li>
                                        <p><strong>Latitude : </strong>Specify the latitude position in decimal degrees. For example, the latitude of the city of London is 51.5072.
                                        </p>
                                    </li>
                                    <li>
                                        <p><strong>Longitude : </strong> Specify the longitude position in decimal degrees. For example, the longitude of the city of London is -0.1275.
                                        </p>
                                    </li>
                                    <li>
                                        <p><strong>Elevation : </strong>Specify the elevation position meters. For example, the elevation of the city of London is 35.052.
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
    import { mapState, mapActions } from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    export default {
        name: "add-channel",
        components: {
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
                    {
                        name: 'field2',
                        value: ''
                    },
                    {
                        name: 'field3',
                        value: ''
                    }
                ],
                iduser:'',
                dateCreation:'',
            }
        },
        computed:{
            ...mapState['userId']
        },
        methods: {
            ...mapActions(['postRequest']),
            addCanal: function () {
                var postData = {
                    nom: this.name,
                    description: this.description,
                    dateCreation:new Date(),
                    userid: this.$store.state.userId
                };

                for(var i = 1; i <= this.fields.length; i++){
                    var key = 'field' + i,
                        value = this.fields[i-1].value;
                    if (value === '') {
                        break;
                    }
                    postData[key] = value;
                }
                var payload = {
                    'data': postData,
                    'link': '/canals'};
                this.postRequest(payload).then(() => {
                    this.flash('Canal added successfully.', 'success');
                    this.$router.push('/dashboard/channels');
                }).catch(() => {
                        this.flash('Canal add operation failed !', 'warning');
                })
            },
            addField: function () {
                var field = "field" + (this.fields.length + 1);
                this.fields.push({
                    name: field,
                    value: ''
                });
            },
            deleteField: function (index) {
                this.fields.splice(index, 1);
            }
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
