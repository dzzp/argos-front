<template>
<div>
    <div v-if="address.length > 0">
        <h3>{{address}}</h3>
        <h3>{{datetime}}</h3>
    </div>
    <div v-else>
        <h3>{{shortFilename}}</h3>
    </div>
    <small>{{filename}}</small>
</div>
</template>

<script>
export default {
    props: {
        filename: {
            type: String,
            required: true
        },
        address: {
            type: String,
            default() { return ''; },
        },
        datetime: {
            type: String,
            default() { return ''; },
        }
    },
    computed: {
        shortFilename: function() {
            return this.filename.split('/').slice(-1)[0];
        }
    }
}
</script>