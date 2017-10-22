<template>
<div>
    <h2>{{shortFilename}}</h2>
    <small>{{filename}}</small>
</div>
</template>

<script>
export default {
    props: {
        filename: {
            type: String,
            default() { return ''; }
        }
    },
    computed: {
        shortFilename: function() {
            return this.filename.split('/').slice(-1)[0];
        }
    }
}
</script>