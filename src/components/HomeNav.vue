<template>
    <div>
        <nav class="nav-wraper navbar-home">
            <div class="container">
                <router-link to="/" class="brand-logo">IoT-Platform</router-link>
                <a href="#" class="sidenav-trigger" data-target="mobile-links">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="right  hide-on-med-and-down">
                    <li><router-link :to="{ name: 'home'}" class="waves-effect waves-light">{{ $t('home') }}</router-link></li>
                    <li><a href="#about" class="waves-effect waves-light">{{ $t('about') }}</a></li>
                    <li><a href="#contact" class="waves-effect waves-light">Contact</a></li>
                    <li v-if="!isLogged"><router-link :to="{ name: 'auth'}" class="waves-effect waves-light">{{ $t('login') }}</router-link></li>
                    <li v-else><router-link :to="{ name: 'dash-overview'}" class="waves-effect waves-light">{{ $t('dashboard') }}</router-link></li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="mobile-links">
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/auth">Login</a></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data(){
            return{
                isLogged: localStorage.getItem('userToken')
            }
        },
        mounted(){
            $('.sidenav').sidenav();
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
