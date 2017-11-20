<template>
    <div>
        <div id="new">
            <div class="header colorh">사건 생성하기</div>
            <input v-model="caseName" class="name" type="name" placeholder="  사건 이름을 입력하세요">
            <input v-model="caseTime" class="time" type="name" placeholder="  사건 시간을 입력하세요"> <!--time choose-->
            <textarea v-model="caseMemo" class="memo" placeholder="  사건 내용을 입력하세요"></textarea>
            <button @click="newCase" class="fix">생성하기</button>
        </div>
        <div id="search">
            <div class="header colorb">사건 조회하기</div>		
            <input v-model="searchCaseName" class="name jo" type="name" placeholder="  사건 이름을 입력하세요">
            <button @click="searchCase" class="jo fix">조회</button>
        </div>
        <div id="recent">
            <div class="header colorj">최근 사건 조회</div>
            <ul>
                <li v-for="c in cases" :key="c.hash"><div>{{c.title}}</div><div>{{c.datetime}}</div><br><div>{{c.memo}}</div></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: function() {
        return {
            cases: [],
            caseName: '',
            caseTime: '',
            caseMemo: '',
            searchCaseName: ''
        }
    },
    methods: {
        newCase() {
            axios.post(
                __global__.method.getUrl(['cases']),
                {
                    'title': this.caseName,
                    'datetime': this.caseTime,
                    'memo': this.caseMemo
                }).then(this.__callback_new_case);
        },
        searchCase() {
            console.log(this.searchCaseName);
            axios.get(__global__.method.getUrl(['cases', '?search=' + this.searchCaseName]))
                .then(this.__callback_set_cases);
        },
        __callback_set_cases: function(response) {
            this.cases = response.data.cases;
        },
        __callback_new_case: function(response) {
            __global__.data.caseHash = response.data.hash;
        }
    },
    mounted: function() {
        axios.get(__global__.method.getUrl(['cases', '?search=']))
            .then(this.__callback_set_cases);
    },
    watch: {
        searchCaseName: function(newval, oldval) {
            console.log(newval);
        }
    }
}
</script>

<style scoped>
html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    width : 100%;
    height : 100%;
    vertical-align: baseline;
}
*{
    font-family: 'Noto Sans KR', sans-serif;
    position:relative;
}
#new{
    top : 0;
    margin : 1% 1% 1% 1%;
    padding : 0;
    width:48%;
    height:98%;
    z-index:100; 
    float : left;
    box-shadow: 0px 0px 10px #777;
}
#search{
    top : 0;
    margin : 1% 1% 1% 1%;
    padding : 0;
    float : left;
    width: 48%;
    height: 40%;
    position:relative;
    z-index:10; 
    background-color:#FFF;
    box-shadow: 0px 0px 10px #777;
}

#recent{
    margin : 1% 1% 1% 1%;
    padding : 0;
    float :left;
    width: 48%;
    height:50%;
    position:relative; 
    background-color:#FFF;
    box-shadow: 0px 0px 10px #777;
}

.header{
    border:none;
    width: 100%;
    height: 50px;
    margin : 0;
    padding : 0;
    top : 0;
    position:relative;
    z-index:120; 
    text-align: center;
    color:white;
    font-weight: bold;
    font-size: 1.5em;
    line-height: 50px;
    box-shadow: 0px 1px 5px #777;
}
.header div{
    width: 50%;
}
.colorh{
    background-color:#2698BF;		
}
.colorb{
    background-color:#25BFBC;		
}
.fix{
    border:none;
    width: 200px;
    height: 50px;
    top : 12%;
    margin : 0;
    padding : 0;
    position:relative;
    background-color:#2698BF;
    color:#fff;
    font-weight: bold;
    font-size: 1.3em;
    border-radius: 10px;
}
.jo{
    margin-top: 3%;
}
input {
    position: relative;
    text-indent: 10px;
    margin: 3% 15% 0 15%;
    width : 70%;
    border:0; 
    padding:10;
    height:30px;
    color:#4A4A4A;
    font-size:0.875em;
    background-color: white;
    border-bottom: 2px;
    border-bottom-color: #2698BF;
    border-bottom-style: inset;
  }

input.jo{
    border-bottom-color: #25BFBC;
}
textarea.memo{
    position: relative;
    text-indent: 10px;
    margin: 3% 15% 5% 15%;
    width : 70%;
    border:0; 
    color:#4A4A4A;
    font-size:0.875em;
    background-color: white;
    height: 6%;
    resize:inherit;
    border-bottom: 2px;
    border-bottom-color: #2698BF;
    border-bottom-style: inset;
}
li{
  width:10%;
  list-style:none;
  vertical-align: middle;
}
ul {
    width: 100%;
    float:left;
}
.list{
    width:100%;
}
span {
    position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: normal;
}
li{
    text-align: center;
    width:calc(99.3vw/7);
    height: 20vh;
    color : white;
    background:#5B5B5B;
    border-right: 0.1vw #EEE;
    margin-right: 0.1vw;
}
.head{
    font-weight: 700;
    font-size: 20px;
}
.black{
    background: #1A1818;
}

.result {
    width : 70%;
    top: 35vh;
    border:0; 
    padding:10;
    height:40px;
    color:#4A4A4A;
    font-size:0.875em;
    background-color: white;
    border-radius: 5px;
}

.colorj {
    background-color:#25BF8A;
}

#recent ul {
    width:100%;
    height:100%;
    overflow-y: auto;
}

#recent ul li {
    width:100%;
    height:calc(100% / 8);
    margin: 0;
    padding: 0;
    float:left;
    position: relative;
}

li:nth-child(2n) {
    background: white;
}
li:nth-child(2n-1) {
    background:#eee;
}

body {
    position: fixed;
}

ul li div {
    margin: 5px 10px;
    height : 30%;
    font-size : 100%;
    color : #333;
    text-align: left;
    width : calc(50% - 20px);
    float: left;
}
</style>