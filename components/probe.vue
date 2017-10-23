<template>
    <div id="vueapp" class="row full">
        <div class="col-3 full pad scrollable" style="background-color: black">
            <div class="card pad" v-for="(video, index) in videos" :key="video.file"
                    v-on:click="fileOpen(index)" v-bind:class="{'bg-secondary' : index === selectedVideoIndex}">
                <videoitem class="card-block" :filename="video.file"> </videoitem>
            </div>
        </div>
        <div class="col-9 full pad scrollable">
            <div style="padding: 50px 100px 50px 100px; margin: 10px;">
                <input id="slider" type="range"></input>
            </div>
        </div>
    </div>
</template>

<script>
import videoitem from './videoitem.vue';

export default {
    components: {
        videoitem: videoitem
    },
}
</script>

<style scoped>

</style>
