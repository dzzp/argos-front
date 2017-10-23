<template>
<div class="row full">
    <div class="center-block" style="margin: auto; width: 100%;">
        <h1 class="display-4">Loading</h1>
        <p>{{ loadingText }}</p>
        <div class="progress center-block" style="height: 20px; width: 80%; margin: auto;">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="loadingStyle"></div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data: function() {
        return {
            loadingText: '',
            current: 0,
            total: 100,
        }
    },
    computed: {
        loadingStyle: function() {
            return "width : " + Math.floor(this.current * 100 / this.total) + "%";
        }
    },
    methods: {
        setStatus: function(response) {
            // TODO: Do something with response
            this.current += 10;
            console.log(this.current);
            setTimeout(this.getRequest, 1000);

            let done = (this.current >= this.total);
            if (done) {
                this.$router.push('gallery');
            }
        },
        getRequest: function() {
            // TODO: Change address & error
            axios.get('http://www.bing.com')
                .then(this.setStatus)
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted: function axios_get() {
        this.getRequest();
    }
};
</script>

<style scoped>

</style>
