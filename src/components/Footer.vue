<template>
    <footer>
        <div class="footer-copyright">
               <p>ESI Iot-Platform &copy; Copyright {{ getYear }}</p>
        </div>
    </footer>
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

<style scoped>
    footer{
        position: relative;
    }
    footer p{
        position: absolute;
        bottom: -36px;
        left: -4%;
        color: #ccc;
    }
</style>
