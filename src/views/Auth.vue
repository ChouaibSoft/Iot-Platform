<template xmlns:active="http://www.w3.org/1999/xhtml">
    <div id="auth">
        <home-nav/>
        <div class="container auth white z-depth-2">
            <ul class="tabs">
                <li class="tab col l6 waves-effect waves-light  white-text"
                    @click="component = 'sign-in', selected = 1"
                    v-bind:class="{active:selected == 1}"
                >Sign In</li>
                <li class="tab col l6 waves-effect waves-light  white-text"
                    @click="component = 'sign-up', selected = 2"
                    v-bind:class="{active:selected == 2}"
                >Sign Un</li>
            </ul>
            <component v-bind:is="component"></component>
        </div>
            </div>
</template>

<script>
import homeNav from '@/components/HomeNav'
import singnIn from '@/components/SignIn'
import signUp from '@/components/SignUp'
import Form from "@/components/Form";


export default {
    name : 'auth',
    components : {
        'home-nav': homeNav,
        'sign-in': singnIn,
        'sign-up': signUp,
        'generic-form': Form
    },
    data() {
        return{
           component: 'sign-in',
            selected: 1
        }
    },
    methods:{

    }
}
</script>

<style scoped>

</style>
