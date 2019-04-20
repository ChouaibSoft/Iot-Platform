<template>
    <aside class="full-aside">
        <div class="items s12 left-align">
            <ul>
                <li class="small-cap">
                    <span>{{ $t('home') }}</span>
                </li>
                <li class="item-header">
                    <router-link :to="{ name: 'dashboard'}" class="group-name">
                        <i class="fa fa-home"></i>
                        <span>{{ $t('page-title.dashboard') }}</span>
                    </router-link>
                </li>
                <li class="small-cap">
                    <span>Business</span>
                </li>
                <li class="item-header">
                    <a class="group-name has-arrow">
                        <i class="fa fa-home"></i>
                        <span>{{ $t('channel') }}</span>
                    </a>
                    <div>
                        <ul class="items-group">
                            <li>
                                <router-link :to="{ name: 'my-channels'}">
                                    <i class="fa fa-dot-circle"></i>
                                    <span>{{ $t('page-title.my-channels') }}</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'new-channel'}">
                                    <i class="fa fa-dot-circle"></i>
                                    <span>{{ $t('page-title.new-channel') }}</span>
                                </router-link>
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
                    <span>{{ $t('help') }}</span>
                </li>
                <li class="item-header">
                    <a href=""   class="group-name">
                        <i class="fa fa-question-circle"></i>
                        <span>FAQ</span>
                    </a>
                </li>
                <li class="small-cap">
                    <span>{{ $t('close') }}</span>
                </li>
                <li class="item-header">
                    <a href=""  @click="logout" class="group-name">
                        <i class="fa fa-power-off"></i>
                        <span>{{ $t('logout') }}</span>
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
        }else{
            aside.addClass("is-visible");
        }

        // Adjust Aside Menu During Window Resize
        $(window).resize(function () {
            if(window.innerWidth > 992) {
                if (!(aside.hasClass("is-visible"))){
                    aside.animate({
                        left: '0'
                    }, 500);
                    dashArea.animate({
                        paddingLeft: "340px",
                    }, 500);
                }else{
                    if(!(dashArea.hasClass("full-size"))) {
                        aside.animate({
                            left: '0'
                        }, 500);
                        dashArea.animate({
                            paddingLeft: "340px",
                        }, 500);
                    }
                }
                dashArea.addClass("full-size");
            }else{
                aside.animate({
                    left : "-256px"
                },500);
                dashArea.animate({
                    width: "98vw",
                    paddingLeft: "15px"
                }, 500);
                aside.addClass("is-visible");
                dashArea.removeClass("full-size");
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
            if ($(this).find("a").hasClass("router-link-exact-active")){
                $(this).addClass('now').find('.items-group').slideDown(300).end()
                    .siblings('.item-header').find('.items-group').slideUp(300);
            }
        });
    });
</script>

<style scoped>

</style>
<i18n>
    {
    "en": {
    "channel": "Channels",
    "logout": "Log out",
    "close": "close",
    "home": "home"
    },
    "fr": {
    "channel": "Canaux",
    "logout": "Deconnexion",
    "close": "fermer",
    "home": "acceuil"
    }
    }
</i18n>
