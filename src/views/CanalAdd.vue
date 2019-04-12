<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>Add Canal</h2>
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
                                            <div v-if="fields.length < 8" @click="addFeild" class="btn waves-effect waves-light submit"><i style="font-size: .9rem" class="fa fa-plus"></i> Field</div>
                                        </div>
                                        <div class="col right">
                                            <button class="btn waves-effect waves-light" type="submit" name="action">Add
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a</p>
                        <h5>Channel Fields</h5>
                        <ul class="help-list">
                            <li>
                                <p><strong>fields1 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields2 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields3 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields4 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields5 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields6 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields7 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { required, minLength, between } from 'vuelidate/lib/validators'
    export default {
        name: "canal-add",
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
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer '+ this.$store.state.token
                    }
                };
                console.log(postData);
                this.$http.post('http://localhost:8091/canals', postData, axiosConfig)
                    .then((res) => {
                        this.flash('Canal added successfully', 'success');
                        this.$router.push('/dashboard');
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                        this.flash('Canal add operation failed!', 'warning');
                    })
            },
            addFeild: function () {
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
