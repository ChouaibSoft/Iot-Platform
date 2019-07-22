<template>

</template>

<script>
    export default {
        name: "Footer",
        data(){
            return{
                year: ''
            }
        },
        computed:{
            getYear(){
                this.year = new Date().getFullYear();
                return this.year;
            }
        }
    }
</script>


