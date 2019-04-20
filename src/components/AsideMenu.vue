<template>
    <aside class="full-aside">
        <div class="items s12 left-align">
            <ul>
                <li class="small-cap">
                    <span>Personnal</span>
                </li>
                <li class="item-header">
                    <a  class="group-name has-arrow">
                        <i class="fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <div>
                        <ul class="items-group">
                            <li>
                                <a href="#" class="active">
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
                    <a class="group-name has-arrow">
                        <i class="fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <div>
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
                    <router-link to="/dashboard/channels" class="group-name has-arrow">
                        <i class="fa fa-chart-bar"></i>
                        <span>Canaux</span>
                    </router-link>
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
    $(document).ready(function(){
        var aside = $("aside"),
            dashArea = $(".dash-area");
        if(window.innerWidth < 992){
            aside.animate({
                left : "-256px"
            },500);
            dashArea.animate({
                width: "98vw",
                paddingLeft: "15px"
            }, 500);
        }

        // Adjust Aside Menu During Window Resize
        $(window).resize(function () {
            if(window.innerWidth > 992){
                if (aside.hasClass("is-visible")){
                    aside.animate({
                        left : '-256px'
                    },500);
                    dashArea.animate({
                        paddingLeft: "90px",
                        paddingRight: 0,
                        width: "100%"
                    }, 500);
                }else{
                    aside.animate({
                        left : '0'
                    },500);
                    dashArea.animate({
                        paddingLeft: "340px",
                    }, 500);
                }
            }else{
                aside.animate({
                    left : "-256px"
                },500);
                dashArea.animate({
                    width: "98vw",
                    paddingLeft: "15px"
                }, 500);
            }
        });

        // Add now class to active dropdow list
        $(".item-header").click(function() {
            $(this).addClass("now").siblings().removeClass("now").end()
                .find('.items-group').slideDown(300).end()
                .siblings('.item-header').find('.items-group').slideUp(300);
        });
        // Add Selected Class in Active Link
        $(".item-header").each(function () {
            if ($(this).find("a").hasClass("active")){
                $(this).addClass('now').find('.items-group').slideDown(300).end()
                    .siblings('.item-header').find('.items-group').slideUp(300);
            }
        });
    });
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
