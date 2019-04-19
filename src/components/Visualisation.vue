<!--<template>-->
<!--    <div id="api-key">-->
<!--        <div class="row">-->
<!--            <div class="col s12 l6">-->
<!--                view-->
<!--            </div>-->
<!--            <div class="col s12 l6">-->
<!--                hello-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Visualisation"-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>Name of channal</h2>
            </div>
            <div class="col right">
                <p>Home > <span> My Channels</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">

                CAHRT HERE
                <canvas id="chartjs-0" class="chartjs" width="521" height="260" style="display: block; width: 521px; height: 260px;"></canvas>
            </div>
        </section>
    </div>
</template>


<script>


    import  axios from 'axios';

    import Chart from 'chart.js'

    import Pusher from 'pusher-js'


    export default {
        name:"view",
        data(){
            return{
                valeur:null,
                date:null,
                chart:null,
            }
        },

        created () {

            Pusher.logToConsole = true;

            var pusher = new Pusher('84bee67aad46ed497369', {
                cluster: 'eu',
                forceTLS: true
            });

            var channel = pusher.subscribe('my-channel');
            channel.bind('my-event', function(data) {
                // alert(JSON.stringify(data));


                axios.get('http://localhost:8091/read?key=C2F5BAF139E34176A76D63C55344C2B4&field=aaaaa' , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$store.state.token
                    }
                })
                    .then(response => {
                        let results = response.data


                        let dateresult = results.map(a => a.date)
                        let valueresult = results.map(a => a.valeur)

                        console.log(response.data)

                        this.valeur = valueresult
                        this.date = dateresult

                        this.chart = new Chart(document.getElementById("chartjs-0"),

                            {"type":"line"
                                ,"data":
                                    {"labels": this.date
                                        ,"datasets":[{"label":"My First Dataset",
                                            "data":this.valeur,
                                            "fill":false,
                                            "borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},
                                "options":{}});

                    })
                    .catch(error => {
                        console.log(error)
                    })




          $(window).reload()


            });



        },

        mounted () {


            this.getData()
        },


        methods: {



            getData(){

                setTimeout(() => {
                axios.get('http://localhost:8091/read?key=C2F5BAF139E34176A76D63C55344C2B4&field=aaaaa' , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$store.state.token
                    }
                })
                    .then(response => {
                        let results = response.data


                        let dateresult = results.map(a => a.date)
                        let valueresult = results.map(a => a.valeur)

                        console.log(response.data)

                        this.valeur = valueresult
                        this.date = dateresult

                        this.chart = new Chart(document.getElementById("chartjs-0"),

                            {"type":"line"
                                ,"data":
                                    {"labels": this.date
                                        ,"datasets":[{"label":"My First Dataset",
                                            "data":this.valeur,
                                            "fill":false,
                                            "borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},
                                "options":{}});

                    })
                    .catch(error => {
                        console.log(error)
                    })
                },0);





            },

        }

    }
</script>
<style scoped>

</style>
