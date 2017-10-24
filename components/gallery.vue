<template>
    <div class="row full">
        <div class="col-2 full pad scrollable">
            <div class="card pad" v-for="suspect in suspectedPeople" :key="suspect.img">
                <img class="card-img-top" :src="'file://' + suspect.img">
                <button type="button" class="btn btn-primary btn-block" @click="sendPeople">Found suspect</button>
            </div>
        </div>
        <div class="col-10 full">
            <div class="full" id="navermap" v-pre></div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            foundPeople: [
                {
                    lat: 37.3595704,
                    lng: 127.105399,
                    time: '2017-10-12T21:32:30',
                    img: '/home/juice500/Desktop/bbox/6_0.jpg'
                },
                {
                    lat: 37.3591704,
                    lng: 127.101399,
                    time: '2017-10-12T21:33:30',
                    img: '/home/juice500/Desktop/bbox/7_1.jpg'
                },
                {
                    lat: 37.3593704,
                    lng: 127.103399,
                    time: '2017-10-12T21:34:30',
                    img: '/home/juice500/Desktop/bbox/7_0.jpg'
                }
            ],
            suspectedPeople: [
                {
                    time: '2017-10-12T21:33:30',
                    img: '/home/juice500/Desktop/bbox/8_0.jpg'
                },
                {
                    time: '2017-10-12T21:35:30',
                    img: '/home/juice500/Desktop/bbox/9_0.jpg'
                },
                {
                    time: '2017-10-12T21:40:30',
                    img: '/home/juice500/Desktop/bbox/10_1.jpg'
                },
                {
                    time: '2017-10-12T21:40:30',
                    img: '/home/juice500/Desktop/bbox/13_3.jpg'
                }
            ]
        }
    },
    mounted: function() {
        this.navermap = new naver.maps.Map(
            'navermap', {
                center: new naver.maps.LatLng(37.3595704, 127.105399),
                zoom: 10
            }
        );
        let path = [];
        for(let i=0; i<this.foundPeople.length; i++) {
            let person = this.foundPeople[i];
            let latlng = new naver.maps.LatLng(person.lat, person.lng);
            let marker = new naver.maps.Marker({
                map: this.navermap,
                position: latlng,
            });
            let infowindowContent = [
                '<div>',
                '   <img src="file://' + person.img + '">',
                '   <p>' + person.time + '</p>',
                '</div>'
            ];
            let infowindow = new naver.maps.InfoWindow({
                content: infowindowContent.join('')
            });
            path.push(latlng);
        }
        console.log(path);
        let polyline = new naver.maps.Polyline({
            map: this.navermap,
            path: path,
        });
    }
};
</script>

<style scoped>

</style>
