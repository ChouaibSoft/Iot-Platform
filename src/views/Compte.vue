<template>
    <div>
        <credit/>
    </div>
</template>

<script>
    import Credit from "@/components/Credit"
    import Plotly from 'plotly.js';
    import axios from 'axios';

    import {mapGetters} from 'vuex';

    export default {
        name: "Compte",
        data() {
            return {
                datacollection: null,
                valeur: null,
                date: null,
                chart: null,
                id: ''
            }
        },
        components: {
            'credit': Credit,

        },
        computed: {
            ...mapGetters(['getApiUrl', 'getUserId'])
        },
        created: function () {
            //this.getData();
        },

        methods: {
            getData() {

                var userId = this.getUserId,
                    token = this.$store.state.token,
                    apiUrl = this.getApiUrl;
                this.id = userId;
                var idChart = this.id;
                axios.get(apiUrl + '/messagesCountByDate/' + userId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(response => {
                        let results = response.data;
                        let dateresult = results.map(a => a.date);
                        let valueresult = results.map(a => a.count);
                        this.valeur = valueresult;
                        this.date = dateresult;

                        let x = [];

                        for (let i = 0; i < dateresult.length; i++) {
                            x.push(i);
                        }

                        var layout = {
                            xaxis: {
                                title: 'Date',
                                showticklabels: false,
                                tickangle: 'auto',
                                tickvals: x,
                                ticktext: dateresult
                            },
                            yaxis: {
                                title: 'Messages',
                                showticklabels: true,
                            },
                            title: 'Credit stats'
                        };
                        var dat = [{
                            z: this.date,
                            y: this.valeur
                        }]

                        Plotly.newPlot("mychart", dat, layout);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },

        }
    }
</script>
<style scoped>


</style>
