<template>
    <div>
        <nav class="nav-wraper navbar">
            <div class="container">
                <a href="/" class="brand-logo">IOT-Platform</a>
                <a href="#" class="sidenav-trigger" data-target="mobile-links">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="right  hide-on-med-and-down">
                    <li><a href="#" class="waves-effect waves-light">Home</a></li>
                    <li><a href="#" class="waves-effect waves-light">About</a></li>
                    <li><a href="#" class="waves-effect waves-light">Contact</a></li>
                    <li><a href="#/auth" class="waves-effect waves-light">Login</a></li>
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
