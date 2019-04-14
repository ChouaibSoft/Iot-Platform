<template>
    <aside class="full-aside">
        <div class="items s12 left-align">
            <ul>
                <li class="small-cap">
                    <span>Personnal</span>
                </li>
                <li class="item-header" v-bind:class="{active: selected === 'item1'}">
                    <a  class="group-name has-arrow" @click="selected = 'item1'">
                        <i class="fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <transition name="slide">
                        <div v-if="selected === 'item1'">
                            <ul class="items-group">
                                <li>
                                    <a href="#">
                                        <i class="fa fa-dot-circle"></i>
                                        <span>Dashboard-1</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-dot-circle"></i>
                                        <span>Dashboard-2</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-dot-circle"></i>
                                        <span>Dashboard-3</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </li>

                <li class="small-cap">
                    <span>Information</span>
                </li>
                <li class="item-header" v-bind:class="{active: selected === 'item2'}">
                    <a  class="group-name has-arrow" @click="selected = 'item2'">
                        <i class="fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <transition name="slide">
                        <div v-if="selected === 'item2'">
                            <ul class="items-group">
                                <li>
                                    <a href="#">
                                        <i class="fa fa-dot-circle"></i>
                                        <span>Dashboard-1</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-dot-circle"></i>
                                        <span>Dashboard-2</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-dot-circle"></i>
                                        <span>Dashboard-3</span>
                                    </a>
                                </li>
                            </ul>
                    </div>
                    </transition>
                </li>
                <li class="small-cap">
                    <span>Information</span>
                </li>
                <li class="item-header">
                    <a href="#" class="group-name has-arrow">
                        <i class="fa fa-user"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li class="item-header">
                    <a href="#" class="group-name has-arrow">
                        <i class="fa fa-cogs"></i>
                        <span>Settings</span>
                    </a>
                </li>
                <li class="small-cap">
                    <span>Bussiness</span>
                </li>
                <li class="item-header">
                    <a href="#" class="group-name has-arrow">
                        <i class="fa fa-chart-bar"></i>
                        <span>Canaux</span>
                    </a>
                </li>
                <li class="small-cap">
                    <span>Fermer</span>
                </li>
                <li class="item-header">
                    <a href=""  @click="logout" class="group-name">
                        <i class="fa fa-power-off"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
    import {  mapActions } from 'vuex';
    export default {
        name: "AsideMenu",
        data(){
            return{
                selected: 'item1'
            }
        },
        methods: {
            ...mapActions([
                'logout'
            ])
        }
    }
</script>

<style scoped>
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>
