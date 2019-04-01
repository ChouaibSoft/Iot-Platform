<template>
    <form  method="get">
        <div id="form-fields">
            <slot name="form-fields"></slot>

        </div>
        <div id="form-controls">
            <slot name="form-controls"></slot>
        </div>
    </form>
</template>

<script>
    export default {
        name: "Form"
    }
</script>

<style scoped>

</style>
