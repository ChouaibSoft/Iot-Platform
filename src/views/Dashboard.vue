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

                        <!-- Start Main Content -->
                        <router-view></router-view>
                        <!-- End Main Content -->
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
        components: {
            'aside-menu': AsideMenu,
            'navbar': Navbar
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
