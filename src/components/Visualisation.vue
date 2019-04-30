<template>
    <div id="view">
        <div class="row">
            <div class="col s12">
            </div>
            <div v-for="field in getFields" class="col s12 l6">
                {{ field.nom }}
                <field-chart v-bind:nameField="field.nom" v-bind:idField="field.id"></field-chart>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex'
    import fieldChart from '@/components/FieldChart'
    export default {
        name:"view",
        components:{
            'field-chart': fieldChart
        },
        computed: {
            ...mapGetters(['getFields'])
        },
        created(){
            var canalId = this.$route.params.id;
            var payloadB = {
                'link': '/canals/' + canalId + '/fields',
                'mutation': 'setFields',
                'all': true
            };
            this.$store.dispatch('getRequest', payloadB);
        }

    }
</script>
<style scoped>

</style>
