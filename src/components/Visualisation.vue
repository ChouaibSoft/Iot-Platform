<template>
    <div id="view">
        <div class="row">
            <div class="col s12">
            </div>
            <div v-for="field in getFields" :key="field" class="col s12 l6">
                <field-chart  v-bind:nameField="field.nom" v-bind:idField="field.id"></field-chart>
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
        }
    }
</script>
<style scoped>

</style>
