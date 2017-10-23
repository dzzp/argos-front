<template>
    <div id="vueapp" class="row full">
        <div class="col-3 full pad scrollable">
            <div class="card pad" v-for="(video, index) in videos" :key="video.file"
                    v-on:click="chooseVideo(index)" v-bind:class="{'bg-secondary' : index === selectedVideoIndex}">
                <videoitem class="card-block" :filename="video.path"> </videoitem>
            </div>
        </div>
        <div class="col-9 full pad scrollable">
            <div style="padding: 50px 100px 50px 100px; margin: 10px;">
                <input id="slider" type="range"></input>
            </div>
            <div class="card-columns" v-if="selectedVideoIndex !== null">
                <div class="card" v-for="(person, index) in chosenPeople" :key="person.person_idx">
                    <img class="card-img-top" :src="'file://'+person.bbox_img">
                    <div class="card-body">
                        <input type="checkbox" v-model="person.chosen"> Suspect
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import videoitem from './videoitem.vue';
import Video from './video.js';
import $ from 'jquery';
import ionRangeSlider from 'ion-rangeslider';
import moment from 'moment';

export default {
    data: function() {
        return {
            videos: [
                {
                    'lat': 3.3,
                    'lng': 4.4,
                    'path': '/home/juice500/Desktop/input.mp4',
                    'memo': 'memo memo',
                    'img': [
                        {
                            'time': '2017-10-12T21:32',
                            'persons': [
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/6_0.jpg',
                                    'person_idx': 1,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/7_0.jpg',
                                    'person_idx': 2,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/7_1.jpg',
                                    'person_idx': 3,
                                }
                            ]
                        },
                        {
                            'time': '2017-10-12T21:33',
                            'persons': [
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/7_2.jpg',
                                    'person_idx': 4,
                                },
                            ]
                        },
                        {
                            'time': '2017-10-12T21:34',
                            'persons': [
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/8_0.jpg',
                                    'person_idx': 5,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/9_0.jpg',
                                    'person_idx': 6,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/9_1.jpg',
                                    'person_idx': 7,
                                }
                            ]
                        },
                    ]
                },
                {
                    'lat': 3.3,
                    'lng': 4.4,
                    'path': '/home/juice500/Desktop/input2.mp4',
                    'memo': 'memo memo 2',
                    'img': [
                        {
                            'time': '2017-10-12T21:40',
                            'persons': [
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/6_0.jpg',
                                    'person_idx': 8,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/7_0.jpg',
                                    'person_idx': 9,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/7_1.jpg',
                                    'person_idx': 10,
                                }
                            ]
                        },
                        {
                            'time': '2017-10-12T21:43',
                            'persons': [
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/7_2.jpg',
                                    'person_idx': 11,
                                },
                            ]
                        },
                        {
                            'time': '2017-10-12T21:44',
                            'persons': [
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/8_0.jpg',
                                    'person_idx': 12,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/9_0.jpg',
                                    'person_idx': 13,
                                },
                                {
                                    'bbox_img': '/home/juice500/Desktop/bbox/9_1.jpg',
                                    'person_idx': 14,
                                }
                            ]
                        },
                    ]
                },
            ],
            selectedVideoIndex: null,
            chosenPeople: [],
        }
    },
    components: {
        videoitem: videoitem
    },
    methods: {
        chooseVideo: function(index) {
            this.chosenPeople = [];
            this.selectedVideoIndex = index;
            let imgList = this.videos[index].img;
            if(imgList.length < 1) return;

            $('#slider').data('ionRangeSlider').destroy();
            $('#slider').ionRangeSlider({
                type: "double",
                grid: true,
                min: +moment(imgList[0].time),
                max: +moment(imgList[imgList.length-1].time),
                prettify: (num) => {
                    return moment(num).format("llll");
                },
                onFinish: this.__slider__callback
            });
        },
        __slider__callback(data) {
            this.chosenPeople = [];
            let imgList = this.videos[this.selectedVideoIndex].img;
            for(let i=0; i<imgList.length; i++) {
                let imgTime = moment(imgList[i].time);
                if(imgTime.isSameOrAfter(data['from']) && imgTime.isSameOrBefore(data['to'])) {
                    for(let j=0; j<imgList[i].persons.length; j++) {
                        this.chosenPeople.push(imgList[i].persons[j]);
                    }
                }
            }
        }
    },
    mounted: function() {
        $('#slider').ionRangeSlider({
            type: "double",
            grid: true,
            disable: true,
            min: +moment(),
            max: +moment(),
            prettify: (num) => {
                return moment(num).format("llll");
            },
        });
    }
}
</script>

<style scoped>
.card-columns {
    column-count: 8;
}
</style>
