<template>
    <div>
        <nav class="nav-wraper navbar-home navbar">
            <div class="container">
                <router-link to="/" class="brand-logo">IoT-Platform</router-link>
                <a href="#" class="sidenav-trigger" data-target="mobile-links">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="right  hide-on-med-and-down">
                    <li><router-link to="/" class="waves-effect waves-light">{{ $t('home') }}</router-link></li>
                    <li><a href="#" class="waves-effect waves-light">{{ $t('about') }}</a></li>
                    <li><a href="#" class="waves-effect waves-light">Contact</a></li>
                    <li v-if="!isLogged"><a href="/auth" class="waves-effect waves-light">{{ $t('login') }}</a></li>
                    <li v-else><router-link to="/dashboard" class="waves-effect waves-light">{{ $t('dashboard') }}</router-link></li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="mobile-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#/auth">Login</a></li>
        </ul>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'home',

        computed: {
            ...mapGetters([
                'isLogged'
            ])
        }
    }
</script>
<i18n>
    {
    "en": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "login": "Login",
    "dashboard": "Dashboard"
    },
    "fr": {
    "home": "Accueil",
    "about": "A propos",
    "contact": "Contact",
    "login": "Connexion",
    "dashboard": "Dashboard"
    }
    }
</i18n>
