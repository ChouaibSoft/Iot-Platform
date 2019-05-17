<template>
    <div id="field-chart" class="field-chart">
        <ul class="collapsible">
            <li>
                <div class="collapsible-header chart">
                    <i class="material-icons">filter_drama</i>Field : <span class="teal-text lighten-1">{{ this.nameField }}</span>
                </div>
                <div class="collapsible-body"
                     style="display: block; position:relative; height: 290px !important; overflow: hidden">
                    <div :id="this.id" width="100%" height="100%"
                         style="display: block; position: absolute; width: 100%; height: 300px !important; top:0; left:0;"></div>
                </div>
            </li>
            <li style="text-align: center;">
                <br>
                <a class="btn" :href="'http://localhost:8091/export-data/' + this.idField">
                    Export as csv
                </a>
                <br>
                <br>
                <input type="file" accept=".csv" @change="processFile($event)">
                <button class="btn" v-on:click="importCSV()">Import file</button>
                <br><br>

            </li>
        </ul>
    </div>
</template>

<script>

    import axios from 'axios';
    import Pusher from 'pusher-js'
    import Plotly from 'plotly.js'
    import {  mapGetters } from 'vuex';

    export default {
        name: "FieldChart",
        data() {
            return {
                valeur: null,
                date: null,
                chart: null,
                id: '',
                file: null,
                idfield: null

            }
        },
        computed: {
            ...mapGetters(['getApiUrl'])
        },
        props: ['nameField', 'idField'],
        created() {
            this.id = this.nameField + '-' + this.idField;
            //   Pusher.logToConsole = true;

            var key = this.$store.state.canal.cleLecture,
                keyWrite = this.$store.state.canal.cleEcriture,
                token = this.$store.state.token,
                nameF = this.nameField,
                idChart = this.id;

            var pusher = new Pusher('84bee67aad46ed497369', {
                cluster: 'eu',
                forceTLS: true
            });

            var channel = pusher.subscribe('my-channel');
            channel.bind('my-event', function (data) {
                if (data['data'] === keyWrite) {
                    axios.get( this.getApiUrl +  '/read?key=' + key + '&field=' + nameF, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                        .then(response => {
                            let results = response.data;
                            let dateresult = results.map(a => a.date);
                            let valueresult = results.map(a => a.valeur);
                            this.valeur = valueresult;
                            this.date = dateresult;

                            let x = [];

                            for (let i = 0; i < dateresult.length; i++) {
                                x.push(i);
                            }

                            var layout = {
                                title: nameF,
                                xaxis: {
                                    title: 'Date',
                                    showticklabels: false,
                                    tickangle: 'auto',
                                    tickvals: x,
                                    ticktext: dateresult

                                },
                                yaxis: {
                                    title: 'Values',
                                    showticklabels: true,
                                }
                            };
                            Plotly.newPlot(idChart, [{y: valueresult}], layout);

                        })
                        .catch(error => {
                        })
                }
            });

        },
        mounted() {
            this.getData();
            $('.fixed-action-btn').floatingActionButton({
                direction: 'left',
                hoverEnabled: false
            });
        },
        methods: {
            getData() {
                var key = this.$store.state.canal.cleLecture,
                    token = this.$store.state.token,
                    nameF = this.nameField,
                    idChart = this.id;
                axios.get( this.getApiUrl +  '/read?key=' + key + '&field=' + nameF, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(response => {
                        let results = response.data;
                        let dateresult = results.map(a => a.date);
                        let valueresult = results.map(a => a.valeur);
                        this.valeur = valueresult;
                        this.date = dateresult;

                        let x = [];

                        for (let i = 0; i < dateresult.length; i++) {
                            x.push(i);
                        }

                        var layout = {
                            //title: nameF,
                            xaxis: {
                                title: 'Date',
                                showticklabels: false,
                                tickangle: 'auto',
                                tickvals: x,
                                ticktext: dateresult

                            },
                            yaxis: {
                                title: 'Values',
                                showticklabels: true,
                            }
                        };
                        Plotly.newPlot(idChart, [{y: valueresult}], layout);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },


            // import

            processFile(event) {
                this.file = event.target.files[0];
            },
            importCSV: function () {

                if (this.file.type == "application/vnd.ms-excel") {

                    let formData = new FormData();
                    formData.append('file', this.file);

                    axios.post( this.getApiUrl +  '/import-data/' + this.idField, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + this.$store.state.token,
                        }

                    }).then(function () {
                        //console.log('SUCCESS!!');
                    }).catch(function () {
                        //console.log('FAILURE!!');
                    });
                }

            },
        }
    }
</script>

<style scoped>

</style>
