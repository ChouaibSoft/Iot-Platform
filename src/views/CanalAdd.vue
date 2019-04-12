<template>
    <section class="content">
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
                                        <input id="name" type="text" class="validate" v-model="name">
                                        <label for="name">Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="description" type="text" class="validate" v-model="description">
                                        <label for="description">description</label>
                                    </div>
                                </div>
                                <div class="row" v-for="(field, index) in fields">
                                    <div class="input-field col s12">
                                        <input v-bind:id="field.name"  type="text" class="validate" v-model="fields[index].value">
                                        <label  v-bind:for="field.name" >Field {{ index + 1 }}</label>
                                        <i @click="deleteField(index)" v-if="index > 2" class="fa fa-times delete-field red-text text-darken-5"></i>

                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col">
                                            <div v-if="fields.length < 8" @click="addFeild" class="btn waves-effect waves-light submit">Add Feild</div>
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
    </section>
</template>

<script>

    import axios from 'axios';
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
        methods: {
            addCanal: function () {
                this.id= localStorage.id;
                var postData = {
                    nom: this.name,
                    description: this.description,
                    dateCreation:new Date(),
                    userid: this.id
                };
                console.log(postData);

                for(var i = 1; i <= this.fields.length; i++){
                    var key = 'field' + i,
                        value = this.fields[i-1].value;
                    console.log(this.fields[i-1].value);
                    postData[key] = value;
                }
                console.log(postData);

                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer '+localStorage.token,
                    }
                };

                this.$http.post('http://localhost:8091/canals', postData, axiosConfig)
                    .then((res) => {
                        console.log("RESPONSE RECEIVED: ", res);
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    })

                // const API_URL = process.env.API_URL || 'http://localhost:8091';
                // this.$http.post(API_URL+'/canals',{nom:this.name, description: this.description,dateCreation:new Date(),
                //         userid:this.id,field1:this.field1,field2:this.field2,field3:this.field2
                //     },{
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': 'Bearer '+localStorage.token
                //         },
                //     }
                // ).then(()=> this.$router.push({name:'dash-user'}))

                // this.$router.push({name:'api-key',params:{Pid:this.id}});
            },
            addFeild: function () {
                var field = "field" + (this.fields.length + 1);
                this.fields.push({
                    name: field,
                    value: ''
                });
                console.log(this.fields);
            },
            deleteField: function (index) {
                this.fields.splice(index, 1);
            }
        }
    }
</script>

<style scoped lang="scss">



</style>
