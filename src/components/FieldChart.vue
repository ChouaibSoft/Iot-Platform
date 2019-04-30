<template>
    <div id="field-chart" class="field-chart">
        <ul class="collapsible">
            <li>
                <div class="collapsible-header">
                    <i class="material-icons">filter_drama</i>Field :  <span class="teal-text lighten-1">{{ this.nameField }}</span>
                </div>
                <div class="collapsible-body" style="display: block; position:relative; height: 290px !important; overflow: hidden">
                    <canvas :id="this.id" class="chartjs" width="100%" height="100%" style="display: block; position: absolute; width: 100%; height: 300px !important; top:0; left:0;"></canvas>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    import  axios from 'axios';
    import Chart from 'chart.js'
    import Pusher from 'pusher-js'


    export default {
        name:"FieldChart",
        data(){
            return{
                valeur:null,
                date:null,
                chart:null,
                id: ''
            }
        },
        props: ['nameField', 'idField'],
        created () {
            this.id = this.nameField + '-' + this.idField;
            Pusher.logToConsole = true;

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
            channel.bind('my-event', function(data) {
                if (data['data'] === keyWrite ){
                    axios.get('http://localhost:8091/read?key='+ key +'&field=' + nameF , {
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
                            this.chart = new Chart(document.getElementById(idChart),

                                {"type":"line"
                                    ,"data":
                                        {"labels": this.date
                                            ,"datasets":[{"label":"My First Dataset",
                                                "data":this.valeur,
                                                "fill":false,
                                                "borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},
                                });

                        })
                        .catch(error => {
                        })
                }
            });

            this.getData()
        },
        mounted () {
            this.getData()
        },
        methods: {
            getData(){
                var key = this.$store.state.canal.cleLecture,
                    token = this.$store.state.token,
                    nameF = this.nameField,
                    idChart = this.id;
                axios.get('http://localhost:8091/read?key='+ key +'&field=' + nameF , {
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
                        this.chart = new Chart(document.getElementById(idChart),
                            {"type":"line"
                                ,"data":
                                    {"labels": this.date
                                        ,"datasets":[{"label": this.nameField,
                                            "data":this.valeur,
                                            "fill":false,
                                            "borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},

                            });
                    })
                    .catch(error => {
                    })
            },
        }
    }
</script>

<style scoped>

</style>
