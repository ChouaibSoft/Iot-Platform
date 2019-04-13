<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>My Channels</h2>
            </div>
            <div class="col right">
                <p>Home > <span> My Channels</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l8">
                    <table class = "striped bordered responsive-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created at</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="canal in getCanals">
                            <td>{{canal.nom}}</td>
                            <td>{{canal.description}}</td>
                            <td>{{canal.dateCreation}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col l4 s12">
                    <div class="help">
                        <h4>Help</h4>
                        <p>
                            Collect data in a ThingSpeak channel from a device, from another channel, or from the web.<br>
                            Click <strong>New Channel</strong> to create a new ThingSpeak channel.<br>
                            Click on the column headers of the table to sort by the entries in that column or click on a tag to show channels with that tag.                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "my-channels",
        computed: {
            ...mapGetters(['getCanals'])
        },
        created() {
            var payload = {
                'link': 'appUsers/' + this.$store.state.userId + '/canals',
                'mutation': 'setCanals'

            };
            this.$store.dispatch('getRequest', payload);
        }
    }
</script>

<style scoped>

</style>
