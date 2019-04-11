<template>
    <aside class="full-aside">
        <div class="items s12 left-align">
            <ul>
                <li class="small-cap">
                    <span>Personnal</span>
                </li>
                <li class="item-header active">
                    <a href="#" class="group-name has-arrow">
                        <i class="fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <div class="items-group">
                        <ul>
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
                    <a href="#"  @click="logout" class="group-name">
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
        methods: {
            ...mapActions([
                'logout'
            ])
        }
    }
</script>

<style scoped>

</style>
