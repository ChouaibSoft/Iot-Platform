<template>
    <div>
        <!-- Start Navbar -->


        <div class="navbar-fixed">
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="nav-wrapper">
                        <router-link :to="{ name: 'home'}" class="brand-logo left">Iot Platform</router-link>
                        <ul class="actions right">
                            <li>
                            <li>
                                <router-link :to="{ name: 'new-channel'}"
                                             class="tooltipped btn-floating  waves-effect waves-light btn-large teal lighten-1"
                                             data-position="bottom" :data-tooltip="this.$t('tooltips.add-channel')"
                                             style="width: 45px; height: 45px; line-height: 42px">
                                    <i class="material-icons">add</i>
                                </router-link>
                            </li>
                            <li>
                                <a class="dropdown-trigger drop-button waves-effect waves-light" data-target="lang" href="#!">
                                    <flag style="width: 45px; height: 25px;" :iso="getFlag" v-bind:squared=false />
                                 </a>
                            </li>
                            <li><a class=" dropdown-trigger drop-button waves-effect waves-light" href="" data-target="dropdown1"><img src="../assets/images/header6.jpg" alt="profile-image"></a></li>
                        </ul>
                        <ul class="controls">
                            <li>
                                <a href="#" class="sidenav-trigger waves-effect waves-light">
                                    <span class="bars"></span>
                                    <span class="bars long"></span>
                                    <span class="bars"></span>
                                </a>
                            </li>
                            <li class="hide-on-med-and-down">
                                <a href="#"
                                   data-position="bottom" :data-tooltip="this.$t('tooltips.search')"
                                   class="waves-effect waves-light tooltipped"><i class="material-icons">search</i></a>
                            </li>
                            <li class="hide-on-med-and-down">
                                <a href="#" class="waves-effect waves-light tooltipped"
                                   data-position="bottom" :data-tooltip="this.$t('tooltips.notification')">
                                <i class="material-icons">notifications_active</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li class="divider"></li>
            <li><a href="#!">three</a></li>
        </ul>

        <ul id="lang" class="dropdown-content" style="padding: 0" >
            <li v-for="entry in languages" :key="entry.title" @click="changeLocale(entry)" style="padding-top:10px; min-height: 30px !important;">
                <p><flag style="width: 35px; height: 20px;" :iso="entry.flag" v-bind:squared=false /> {{entry.title}}</p>
            </li>
        </ul>

        <!-- End Navbar -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Navbar",
        data() {
            return {
                languages: [
                    { flag: 'us', language: 'en', title: 'English', selected: true},
                    { flag: 'fr', language: 'fr', title: 'Français', selected: false}
                ]
            }
        },
        computed: {
            ...mapGetters(['getFlag'])
        },
        methods: {
            changeLocale(locale) {
                this.$store.dispatch('changeLocale', locale);
            },
        }
    }
    $( document ).ready(function() {
        $(".drop-button").dropdown();
        $(document).ready(function(){
            $('.sidenav').sidenav();
            $('.tooltipped').tooltip();
        });
    });
</script>

<style scoped>

</style>
