<template>
    <div>
        <!-- Start Navbar -->


        <div class="navbar-fixed">
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="nav-wrapper">
                        <a href="#!" class="brand-logo left">Iot Platform</a>
                        <ul class="actions right">
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
                            <li class="hide-on-med-and-down"><a href="#" class="waves-effect waves-light"><i class="material-icons">search</i></a></li>
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
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>
