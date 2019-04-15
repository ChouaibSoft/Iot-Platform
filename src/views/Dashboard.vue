<template>
    <div id="dashboard">
        <!-- Start Global -->
        <navbar></navbar>
        <section class="dashboard">
            <div class="container-fluid">
                <div class="row">
                    <div class="col l3 hide-on-med-and-down" style="padding: 0 !important;">
                        <aside-menu></aside-menu>
                    </div>
                    <div class="col l9 s12">
                        <section class="content">
                            <div class="row">
                                <flash-message  class="in-left"></flash-message>
                            </div>
                            <!-- Start Main Content -->
                            <router-view></router-view>
                            <!-- End Main Content -->
                        </section>
                    </div>
                </div>
            </div>
        </section>

        <!-- End Global -->
    </div>
</template>

<script>
    import AsideMenu from "@/components/AsideMenu";
    import Navbar from "@/components/Navbar";
    export default {
        name: "Dashboard",
        date(){
            return{
                langs: ['en', 'fr']
            }
        },
        components: {
            'aside-menu': AsideMenu,
            'navbar': Navbar
        },
        methods: {
        }
    }
</script>

<style scoped>

    @-webkit-keyframes fadeInLeft {
        from {
            opacity:0;
            -webkit-transform: translatex(-10px);
            -moz-transform: translatex(-10px);
            -o-transform: translatex(-10px);
            transform: translatex(-10px);
        }
        to {
            opacity:1;
            -webkit-transform: translatex(0);
            -moz-transform: translatex(0);
            -o-transform: translatex(0);
            transform: translatex(0);
        }
    }
    @-moz-keyframes fadeInLeft {
        from {
            opacity:0;
            -webkit-transform: translatex(-10px);
            -moz-transform: translatex(-10px);
            -o-transform: translatex(-10px);
            transform: translatex(-10px);
        }
        to {
            opacity:1;
            -webkit-transform: translatex(0);
            -moz-transform: translatex(0);
            -o-transform: translatex(0);
            transform: translatex(0);
        }
    }
    @keyframes fadeInLeft {
        from {
            opacity:0;
            -webkit-transform: translatex(-100px);
            -moz-transform: translatex(-100px);
            -o-transform: translatex(-100px);
            transform: translatex(-100px);
        }
        to {
            opacity:1;
            -webkit-transform: translatex(0);
            -moz-transform: translatex(0);
            -o-transform: translatex(0);
            transform: translatex(0);
        }
    }
    .in-left {
        -webkit-animation-name: fadeInLeft;
        -moz-animation-name: fadeInLeft;
        -o-animation-name: fadeInLeft;
        animation-name: fadeInLeft;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
        -o-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-duration: 4s;
        -moz-animation-duration: 2s;
        -o-animation-duration: 2s;
        animation-duration: 6s;
        -webkit-animation-delay: 6s;
        -moz-animation-delay: 6s;
        animation-delay: 6s;
        animation-iteration-count: 1;
    }

</style>
