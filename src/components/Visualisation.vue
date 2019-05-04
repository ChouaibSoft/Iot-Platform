<template>
    <div id="view">
        <div class="row">
            <div class="col s12">
            </div>
            <div v-if="!(this.getFields === null) ">
                <div v-for="field in getFields" :key="field" class="col s12 l6">
                    <field-chart  v-bind:nameField="field.nom" v-bind:idField="field.id"></field-chart>
                </div>
            </div>
            <div  v-else class="col s12">
                <div class="alert alert-info" role="alert">
                    {{ $t('no-field') }}
                </div>
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
<i18n>
    {
    "en": {
    "no-field": "No field to display for this channel"
    },
    "fr": {
    "main-title": "Aucun champ à afficher pour ce canal"
    }
    }
</i18n>
