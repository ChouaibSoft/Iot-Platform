<template>
    <div id="sign-up" class="col s12">
        <form class="col s12">
            <div class="form-container">
                <h4>Bienvenue !</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate">
                                <label for="last_name">First Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate">
                                <label for="last_name">Last Name</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" type="email" class="validate">
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email-confirm" type="email" class="validate">
                                <label for="email-confirm">Email Confirmation</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password" type="password" class="validate">
                                <label for="password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password-confirm" type="password" class="validate">
                                <label for="password-confirm">Password Confirmation</label>
                            </div>
                        </div>
                    </div>
                    <div slot="form-controls">
                        <center>
                            <button class="btn waves-effect waves-light  submit" type="submit" name="action">Sign in</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import Form from "@/components/Form";
    export default {
        name: "SignUp",
        components: {
            'generic-form': Form
        }
    }
</script>

<style scoped>


</style>
