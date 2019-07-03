<template>
    <div id="confirm" class="confirm-account">
        <home-nav/>
        <div class="container auth white z-depth-2">
            <ul class="tabs">
                <li class="tab col l12 waves-effect waves-light  white-text">{{ $t('auth.confirm-account.title') }}</li>
            </ul>
            <div class="confirm-account-msg">
                <div v-if="tokenMatch">
                    <i class="fa fa-check"></i>
                    <p>{{ $t('auth.confirm-account.success-msg') }}</p>
                    <router-link v-if="!isLogged" :to="{ name: 'auth'}"  class="btn waves-effect waves-light">{{ $t('auth.sign-in') }} {{ interval }}s</router-link>
                    <p v-else class="redirection">{{ $t('auth.confirm-account.redirection') }} {{ interval }}s</p>
                </div>
                <div v-else class="activate-error">
                    <i class="fa fa-times red-text"></i>
                    <p>{{ $t('auth.confirm-account.error-msg') }}</p>
                    <p v-if="isLogged" class="redirection">{{ $t('auth.confirm-account.redirection') }} {{ interval }}s</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import homeNav from '@/components/HomeNav'
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "ConfirmAccount",
        data(){
            return {
                interval: 5,
                tokenMatch: false
            }
        },
        components:{
            'home-nav': homeNav
        },
        methods:{
            ...mapActions(['postRequest'])
        },
        computed: {
            ...mapGetters([
                'isLogged'
            ])
        },
        created(){
            console.log(this.$route.query.token)
            var payload = {
                'link': '/authentification-service/confirm-account?token=' + this.$route.query.token
            };
            this.postRequest(payload).then((res) => {
                this.tokenMatch = res.data;
                window.setInterval(() => {
                    if(this.interval === 1){
                        if(this.isLogged){
                            window.location.href= '/dashboard'
                        }else{
                            window.location.href= '/auth'
                        }
                    }
                    this.interval--
                }, 1000)
            }).catch( (err)=> {
                console.log(err)
            });
        }
    }
</script>

<style scoped>

</style>
