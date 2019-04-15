<template>
    <div>
        <!-- Start Navbar -->


        <div class="navbar-fixed">
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="nav-wrapper">
                        <router-link to="/" class="brand-logo left">Iot Platform</router-link>
                        <ul class="actions right">
                            <li>
                            <li>
                                <router-link to="/dashboard/channels/new" class="btn-floating  waves-effect waves-light btn-large teal lighten-1" style="width: 45px; height: 45px; line-height: 45px">
                                    <i class="material-icons">add</i>
                                </router-link>
                            </li>
                            <li><a class="dropdown-trigger lang " data-target="lang" href="#!"><img src="../assets/images/flag-401.png" alt="profile-image"></a></li>
                            <li><a class="dropdown-trigger" href="#!" data-target="dropdown1"><img src="../assets/images/header6.jpg" alt="profile-image"></a></li>
                        </ul>
                        <ul class="controls">
                            <li>
                                <a href="#" class="sidenav-trigger waves-effect waves-light">
                                    <span class="bars"></span>
                                    <span class="bars long"></span>
                                    <span class="bars"></span>
                                </a>
                            </li>
                            <li>
                                <div>
                                    <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
                                        <flag :iso="entry.flag" v-bind:squared=false /> {{entry.title}}
                                    </button>
                                </div>
                            </li>
                            <li class="hide-on-med-and-down"><a href="#" data-position="bottom tooltipped" data-tooltip="I am a tooltip" class="waves-effect waves-light"><i class="material-icons">search</i></a></li>
                            <li class="hide-on-med-and-down"><a href="#" class="waves-effect waves-light"><i class="material-icons">notifications_active</i></a></li>
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

        <!--<ul id="lang" class="dropdown-content">-->
            <!--<li><a href="#!" ><img src="../assets/images/header6.jpg" alt="profile-image"> French</a></li>-->
            <!--<li><a href="#!" ><img src="../assets/images/header6.jpg" alt="profile-image"> English</a></li>-->
        <!--</ul>-->

        <!-- End Navbar -->
    </div>
</template>

<script>
    import  i18n  from '../i18n';
    export default {
        name: "Navbar",
        data() {
            return {
                languages: [
                    { flag: 'us', language: 'en', title: 'English' },
                    { flag: 'fr', language: 'fr', title: 'French' }
                ]
            }
        },
        methods: {
            changeLocale(locale) {
                console.log('fdfdf')
                this.$store.dispatch('changeLocale', locale);
            }
        }
    }
</script>

<style scoped>

</style>
