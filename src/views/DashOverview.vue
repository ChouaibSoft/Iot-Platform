<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> dashboard</span></p>
            </div>
        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12">
                    <div class="col s12 l5" style="padding-left: 0">
                        <ul class="collapsible">
                            <li class="active">
                                <div class="collapsible-header">
                                    <i class="fa fa-chart-bar"></i>
                                    Channel
                                </div>
                                <div class="collapsible-body">
                                    <h3 class="center-align">5 / <span class="grey-text" style="font-size: 1.6rem">9 Remaining</span></h3>
                                </div>
                            </li>
                        </ul>
                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header">
                                    <i class="fa fa-charging-station"></i>
                                    Trigger
                                    <span class="new badge">3</span></div>
                                <div class="collapsible-body">
                                    <h3 class="center-align">8 / <span class="grey-text" style="font-size: 1.6rem">7 Remaining</span></h3>
                                </div>
                            </li>
                        </ul>
                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header">
                                    <i class="fa fa-react"></i>
                                    React
                                    <span class="new badge">2</span></div>
                                <div class="collapsible-body">
                                    <h3 class="center-align">3 / <span class="grey-text" style="font-size: 1.6rem">3 Remaining</span></h3>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col s12 l7" style="padding-right: 0">
                        <div class="map">
                            <img src="../assets/images/GoogleMapTA.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "DashOverview",
        mounted(){
            $('.collapsible').collapsible();
        }
    }
</script>
<i18n>
    {
    "en": {
    "main-title": "Dashboard"
    },
    "fr": {
    "main-title": "Dashboard"
    }
    }
</i18n>
<style>
    .map{
        width: 100%;
        min-height: 400px;
        position: relative;
    }
    .map img{
        position: absolute;
        width: 100%;
        height: 100%;
        top:7px;
        left:0;
    }
</style>
