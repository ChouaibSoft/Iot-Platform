<template>
    <section class="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ Fr.title }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> Ajouter Canal</span></p>
            </div>
        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <div class="form">
                        <generic-form>
                            <div slot="form-fields">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="text" type="email" class="validate">
                                        <label for="text">Field 1</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="text" type="email" class="validate">
                                        <label for="text">Field 1</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="text" type="email" class="validate">
                                        <label for="text">Field 1</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="text" type="email" class="validate">
                                        <label for="text">Field 1</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="text" type="email" class="validate">
                                        <label for="text">Field 1</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="text" type="email" class="validate">
                                        <label for="text">Field 1</label>
                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <button class="btn waves-effect waves-light  submit">Add</button>
                            </div>
                        </generic-form>
                    </div>
                </div>
                <div class="col l7 s12">
                    <div class="help">
                        <h4>Help</h4>
                        <h5>Channel</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a</p>
                        <h5>Channel Fields</h5>
                        <ul class="help-list">
                            <li>
                                <p><strong>fields1 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields2 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields3 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields4 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields5 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields6 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                            <li>
                                <p><strong>fields7 :</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>

    export default {
        name: "canal-add",
        components: {
        },
        data (){
            return{
                Fr: {
                    title: 'Ajouter une Channel'
                },
                En: {
                    title: 'Add a canal'
                },
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">



</style>
