<template>
    <div>
        <div class="row full">
            <div class="col-6 full">
                <div class="row full">
                    <div class="col-6 full pad scrollable">
                        <button type="button" class="btn btn-primary btn-lg btn-block" @click="sendVideos">Analyze Videos</button>
                        <button type="button" class="btn btn-primary btn-lg btn-block" @click="fileDialog">Add Video</button>
                        <div class="card pad" v-for="(video, index) in videos" :key="video.file"
                             v-on:click="fileOpen(index)" v-bind:class="{'bg-secondary' : index === selectedVideoIndex}">
                            <videoitem class="card-block" :filename="video.file"> </videoitem>
                        </div>
                    </div>
                    <div class="col-6 full pad scrollable">
                        <form v-if="selectedVideo !== null">
                            <div class="form-group">
                                <label for="inputFile">File name</label>
                                <input type="text" class="form-control" id="inputFile" v-bind:placeholder="selectedVideoFile" readonly>
                            </div>
                            <div class="form-group">
                                <label for="inputMemo">Memo</label>
                                <input type="text" class="form-control" id="inputMemo" v-model="selectedVideo.memo">
                            </div>
                            <div class="form-group">
                                <label for="inputDatetime">Datetime</label>
                                <input type="datetime-local" class="form-control" id="inputDatetime" v-model="selectedVideo.datetime">
                            </div>
                            <div class="form-group">
                                <label for="selectedLocation">Location</label>
                                <input type="text" class="form-control" id="selectedLocation" v-model="selectedVideo.location.address">
                                 <div v-if="locations.length > 0">
                                    <div class="card pad" v-for="(location, index) in locations" @click="locationSet(location)" :key="location.address">
                                        <div class="card-block">
                                            <h4 class="card-title">{{location.address}}</h4>
                                            <p class="card-text">{{location.lat}}, {{location.lng}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="selectedVideo.location.address.length > 0">
                                    <div class="card pad">
                                        <div class="card-block">
                                            <h4 class="card-title">Not found.</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary btn-lg btn-block" @click="saveSelectedVideo">Save Video</button>
                            <button type="button" class="btn btn-danger btn-lg btn-block" @click="deleteSelectedVideo">Delete Video</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-6 full">
                <div class="full" id="navermap" v-pre></div>
            </div>
        </div>
    </div>
</template>

<script>
import videoitem from "./videoitem.vue";
import Video from "./video.js";
import Location from "./location.js";

export default {
    data: function() {
        return {
        videos: [],
        selectedVideoIndex: null,
        selectedVideo: null,

        markers: [],
        selectedMarker: null,

        locations: []
        };
    },
    components: {
        videoitem: videoitem
    },
    methods: {
        fileDialog: function() {
            require("electron").remote.dialog.showOpenDialog(
                {
                    title: "Choose Video",
                    properties: ["openFile", "multiSelections"]
                },
                    files => {
                    let currentFiles = [];
                    for (let i = 0; i < this.videos.length; i++) {
                        currentFiles.push(this.videos[i].file);
                    }
                    for (let file of files) {
                        if (currentFiles.includes(file) === false) {
                        currentFiles.push(file);
                        this.videos.push(
                            new Video(file, null, new Location("", null, null), "")
                        );
                        this.markers.push(null);
                        }
                    }
                }
            );
        },
        fileOpen: function(index) {
            this.selectedVideoIndex = index;
            this.selectedVideo = new Video(
                this.videos[index].file,
                this.videos[index].datetime,
                this.videos[index].location,
                this.videos[index].memo
            ); // Deep copy
            if (this.markers[index] !== null) this.markers[index].setAnimation(naver.maps.Animation.BOUNCE);
            if (this.selectedMarker !== null) this.selectedMarker.setAnimation(null);
            this.selectedMarker = this.markers[index];
            this.locations = [];
        },
        saveSelectedVideo: function() {
        if (this.selectedVideo !== null) {
            let errors = this.selectedVideo.check();
            if (errors.length > 0) {
                alert("Cannot save video metadata.\n" + errors.join("\n"));
                return;
            }
            this.videos.splice(this.selectedVideoIndex, 1, this.selectedVideo);
            this.markers[this.selectedVideoIndex] = this.selectedMarker;
            this.markers[this.selectedVideoIndex].setAnimation(null);
            this.selectedVideoIndex = null;
            this.selectedVideo = null;
            this.selectedMarker = null;
            this.locatons = [];
        }
        },
        deleteSelectedVideo: function() {
            if (this.selectedVideoIndex !== null) {
                this.videos.splice(this.selectedVideoIndex, 1);
                this.markers.splice(this.selectedVideoIndex, 1);
                this.selectedVideoIndex = null;
                this.selectedVideo = null;
                this.locations = [];
                if (this.selectedMarker !== null) {
                this.selectedMarker.setMap(null);
                this.selectedMarker = null;
                }
            }
        },
        sendVideos: function() {
            let errors = [];
            for (let i = 0; i < this.videos.length; i++) {
                let video = this.videos[i];
                let videoErrors = video.check();
                if (videoErrors.length > 0) {
                errors = errors.concat([video.file], video.check(), [""]);
                }
            }
            if (errors.length > 0) {
                alert("Cannot analyze video.\n" + errors.join("\n"));
            } else {
                if (confirm("Are you sure you want to stop adding videos?")) {
                let reqVideos = [];
                for (let i = 0; i < this.videos.length; i++) {
                    reqVideos.push(this.videos[i].json());
                }
                let reqData = JSON.stringify({
                    videos: reqVideos,
                    code: "detect_request"
                });
                // TODO: SEND reqData
                console.log(reqData);
                }
            }
        },
        locationSet: function(location) {
            this.selectedVideo.location = new Location(
                location.address,
                location.lat,
                location.lng
            );
            if (this.selectedMarker !== null) this.selectedMarker.setMap(null);
            let position = new naver.maps.LatLng(location.lat, location.lng);
            this.selectedMarker = new naver.maps.Marker({
                position: position,
                map: __global_navermap
            });
            this.selectedMarker.setAnimation(naver.maps.Animation.BOUNCE);
            __global_navermap.panTo(position);
        },
        __navermap__callback(status, response) {
            this.locations = [];
            if (status === naver.maps.Service.Status.ERROR) {
                return;
            }
            for (let i = 0; i < response.result.total; i++) {
                this.locations.push(
                    new Location(
                        response.result.items[i].address,
                        response.result.items[i].point.y,
                        response.result.items[i].point.x
                    )
                );
            }
        }
    },
    computed: {
        selectedVideoFile: function() {
        return this.selectedVideo.file.split('/').slice(-1)[0];
        },
        selectedAddress: function() {
        if (this.selectedVideo === null) return '';
        return this.selectedVideo.location.address;
        }
    },
    watch: {
        selectedAddress: function(newVal, oldVal) {
            if(newVal === '') return;
            naver.maps.Service.geocode({ address: newVal }, this.__navermap__callback);
        }
    }
};
</script>

<style scoped>

</style>