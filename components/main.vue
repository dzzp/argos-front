<template>
  <div class="full">
    <div id="new">
      <div class="header colorh">사건 생성하기</div>
      <input v-model="caseName" class="name" type="name" placeholder="  사건 이름을 입력하세요">
      <input id="datetimepicker" class="time" type="text" placeholder="  사건 시간을 입력하세요"> <!--time choose-->
      <textarea v-model="caseMemo" class="memo" placeholder="  사건 내용을 입력하세요"></textarea>
      <button @click="newCase" class="fix">생성하기</button>
    </div>
    <div id="search">
      <div class="header colorb">사건 조회하기</div>
      <input v-model="searchCaseName" v-on:keyup.enter="searchCase" class="name" type="name" placeholder="  사건 이름을 입력하세요">
      <button @click="searchCase" class="jo fix">조회</button>
    </div>
    <div id="recent">
      <div class="header colorj">최근 사건 조회</div>
      <ul v-if="cases.length !== 0">
        <li @click="loadCase(index)" v-for="(c, index) in cases" :key="c.hash">
          <div>{{c.title}}</div>
          <div>{{c.datetime}}</div>
          <br>
          <div>{{c.memo}}</div>
        </li>
      </ul>
      <ul v-else>
          <li><div style="width: inherit; height: inherit; text-align: center;">
            검색 결과가 없습니다.
          </div></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import "jquery-datetimepicker";
export default {
  data: function() {
    return {
      cases: [],
      caseName: "",
      caseMemo: "",
      searchCaseName: ""
    };
  },
  methods: {
    newCase() {
      axios
        .post(__global__.method.getUrl(["cases"]), {
          title: this.caseName,
          datetime: $("#datetimepicker")[0].value,
          memo: this.caseMemo
        })
        .then(this.__callback_new_case)
        .catch(response => {
          console.log(response);
        });
    },
    searchCase() {
      axios
        .get(
          __global__.method.getUrl(["cases", "?search=" + this.searchCaseName])
        )
        .then(this.__callback_set_cases);
    },
    loadCase(index) {
      __global__.method.setCase(this.cases[index]);
      this.$router.push("upload");
    },
    __callback_set_cases(response) {
      this.cases = response.data.cases;
    },
    __callback_new_case(response) {
      __global__.method.setCase(response.data);
      this.$router.push("upload");
    }
  },
  mounted: function() {
    $("#datetimepicker").datetimepicker({
      step: 1,
      format: "Y-m-d H:i"
    });
    axios
      .get(__global__.method.getUrl(["cases", "?search="]))
      .then(this.__callback_set_cases);
  }
};
</script>

<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
body {
  width: 100%;
  height: 100%;
}
* {
  font-family: "Noto Sans KR", sans-serif;
  position: relative;
}
#new {
  top: 0;
  margin: 0.5%;
  padding: 0;
  width: 49.5%;
  height: 99%;
  z-index: 100;
  float: left;
  box-shadow: 0px 3px 10px #777;
}
#search {
  top: 0;
  margin: 0.5% 0;
  padding: 0;
  float: left;
  width: 49%;
  height: 40%;
  position: relative;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 3px 10px #777;
}

#recent {
  margin: 0 0 0.5% 0;
  padding: 0;
  float: left;
  width: 49%;
  height: 58.5%;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 3px 10px #777;
}

.header {
  border: none;
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
  top: 0;
  position: relative;
  z-index: 120;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 50px;
  box-shadow: 0px 1px 5px #777;
}
.header div {
  width: 50%;
}
.colorh {
  background-color: #2698bf;
}
.colorb {
  background-color: #25bfbc;
}
.fix {
  left: calc((50vw - 200px)/2);
  border: none;
  width: 200px;
  height: 50px;
  top: 12%;
  margin: 0;
  padding: 0;
  position: relative;
  background-color: white;
  color: #2698bf;
  font-weight: bold;
  font-size: 1.3em;
  border-radius: 10px;
  border-style: solid;
}
.fix:hover {
  background-color: #2698bf;
  color: #fff;
  border-style: solid;
  border-color: #2698bf;
}
.jo {
  margin-top: 3%;
  background-color: white;
  color: #25bfbc;
}
button.jo:hover {
  margin-top: 3%;
  background-color: #25bfbc;
  color: #fff;
  border-color: #25bfbc;
}
input {
  position: relative;
  text-indent: 10px;
  margin: 3% 15% 0 15%;
  width: 70%;
  border: 0;
  padding: 10;
  height: 30px;
  color: #4a4a4a;
  font-size: 0.875em;
  background-color: white;
  border-bottom: 2px;
  border-bottom-color: #2698bf;
  border-bottom-style: inset;
}

input.jo {
  border-bottom-color: #25bfbc;
  background: white;
}

textarea.memo {
  position: relative;
  text-indent: 10px;
  margin: 3% 15% 5% 15%;
  width: 70%;
  border: 0;
  color: #4a4a4a;
  font-size: 0.875em;
  background-color: white;
  height: 6%;
  resize: inherit;
  border-bottom: 2px;
  border-bottom-color: #2698bf;
  border-bottom-style: inset;
}
li {
  width: 10%;
  list-style: none;
  vertical-align: middle;
}
ul {
  width: 100%;
  float: left;
}
.list {
  width: 100%;
}
span {
  position: relative;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal;
}
li {
  text-align: center;
  width: calc(99.3vw/7);
  height: 20vh;
  color: white;
  background: #5b5b5b;
  border-right: 0.1vw #eee;
  margin-right: 0.1vw;
}
.head {
  font-weight: 700;
  font-size: 20px;
}
.black {
  background: #1a1818;
}

.head {
}

.result {
  width: 70%;
  top: 35vh;
  border: 0;
  padding: 10;
  height: 40px;
  color: #4a4a4a;
  font-size: 0.875em;
  background-color: white;
  border-radius: 5px;
}

.colorj {
  background-color: #25bf8a;
}

#recent ul {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
}

#recent ul li {
  width: 100%;
  height: calc(100% / 8);
  margin: 0;
  padding: 0;
  float: left;
  position: relative;
}

li:nth-child(2n) {
  background: white;
}
li:nth-child(2n-1) {
  background: #eee;
}

body {
  position: fixed;
}

ul li div {
  margin: 5px 10px;
  height: 30%;
  font-size: 100%;
  color: #333;
  text-align: left;
  width: calc(50% - 20px);
  float: left;
}
</style>

<style>
.xdsoft_datetimepicker {
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.506);
  background: #fff;
  border-bottom: 1px solid #bbb;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 8px;
  padding-left: 0;
  padding-top: 2px;
  position: absolute;
  z-index: 9999;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: none;
}
.xdsoft_datetimepicker.xdsoft_rtl {
  padding: 8px 0 8px 8px;
}
.xdsoft_datetimepicker iframe {
  position: absolute;
  left: 0;
  top: 0;
  width: 75px;
  height: 210px;
  background: transparent;
  border: 0;
}
.xdsoft_datetimepicker button {
  border: none !important;
}
.xdsoft_noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.xdsoft_noselect::selection {
  background: transparent;
}
.xdsoft_noselect::-moz-selection {
  background: transparent;
}
.xdsoft_datetimepicker.xdsoft_inline {
  display: inline-block;
  position: static;
  box-shadow: none;
}
.xdsoft_datetimepicker * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.xdsoft_datetimepicker .xdsoft_datepicker,
.xdsoft_datetimepicker .xdsoft_timepicker {
  display: none;
}
.xdsoft_datetimepicker .xdsoft_datepicker.active,
.xdsoft_datetimepicker .xdsoft_timepicker.active {
  display: block;
}
.xdsoft_datetimepicker .xdsoft_datepicker {
  width: 224px;
  float: left;
  margin-left: 8px;
}
.xdsoft_datetimepicker.xdsoft_rtl .xdsoft_datepicker {
  float: right;
  margin-right: 8px;
  margin-left: 0;
}
.xdsoft_datetimepicker.xdsoft_showweeks .xdsoft_datepicker {
  width: 256px;
}
.xdsoft_datetimepicker .xdsoft_timepicker {
  width: 58px;
  float: left;
  text-align: center;
  margin-left: 8px;
  margin-top: 0;
}
.xdsoft_datetimepicker.xdsoft_rtl .xdsoft_timepicker {
  float: right;
  margin-right: 8px;
  margin-left: 0;
}
.xdsoft_datetimepicker .xdsoft_datepicker.active + .xdsoft_timepicker {
  margin-top: 8px;
  margin-bottom: 3px;
}
.xdsoft_datetimepicker .xdsoft_monthpicker {
  position: relative;
  text-align: center;
}
.xdsoft_datetimepicker .xdsoft_label i,
.xdsoft_datetimepicker .xdsoft_prev,
.xdsoft_datetimepicker .xdsoft_next,
.xdsoft_datetimepicker .xdsoft_today_button {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAeCAYAAADaW7vzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0NBRjI1NjM0M0UwMTFFNDk4NkFGMzJFQkQzQjEwRUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0NBRjI1NjQ0M0UwMTFFNDk4NkFGMzJFQkQzQjEwRUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQ0FGMjU2MTQzRTAxMUU0OTg2QUYzMkVCRDNCMTBFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQ0FGMjU2MjQzRTAxMUU0OTg2QUYzMkVCRDNCMTBFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoNEP54AAAIOSURBVHja7Jq9TsMwEMcxrZD4WpBYeKUCe+kTMCACHZh4BFfHO/AAIHZGFhYkBBsSEqxsLCAgXKhbXYOTxh9pfJVP+qutnZ5s/5Lz2Y5I03QhWji2GIcgAokWgfCxNvcOCCGKqiSqhUp0laHOne05vdEyGMfkdxJDVjgwDlEQgYQBgx+ULJaWSXXS6r/ER5FBVR8VfGftTKcITNs+a1XpcFoExREIDF14AVIFxgQUS+h520cdud6wNkC0UBw6BCO/HoCYwBhD8QCkQ/x1mwDyD4plh4D6DDV0TAGyo4HcawLIBBSLDkHeH0Mg2yVP3l4TQMZQDDsEOl/MgHQqhMNuE0D+oBh0CIr8MAKyazBH9WyBuKxDWgbXfjNf32TZ1KWm/Ap1oSk/R53UtQ5xTh3LUlMmT8gt6g51Q9p+SobxgJQ/qmsfZhWywGFSl0yBjCLJCMgXail3b7+rumdVJ2YRss4cN+r6qAHDkPWjPjdJCF4n9RmAD/V9A/Wp4NQassDjwlB6XBiCxcJQWmZZb8THFilfy/lfrTvLghq2TqTHrRMTKNJ0sIhdo15RT+RpyWwFdY96UZ/LdQKBGjcXpcc1AlSFEfLmouD+1knuxbduvrvobmooc/rEcN7OQxKVeJTCiAdUzUJhA2Oez9QTkp72OTVcxDcXY8iKNkxGAJXmJCOQwOa6dhyXsOa6XwEGAKdeb5ET3rQdAAAAAElFTkSuQmCC);
}
.xdsoft_datetimepicker .xdsoft_label i {
  opacity: 0.5;
  background-position: -92px -19px;
  display: inline-block;
  width: 9px;
  height: 20px;
  vertical-align: middle;
}
.xdsoft_datetimepicker .xdsoft_prev {
  float: left;
  background-position: -20px 0;
}
.xdsoft_datetimepicker .xdsoft_today_button {
  float: left;
  background-position: -70px 0;
  margin-left: 5px;
}
.xdsoft_datetimepicker .xdsoft_next {
  float: right;
  background-position: 0 0;
}
.xdsoft_datetimepicker .xdsoft_next,
.xdsoft_datetimepicker .xdsoft_prev,
.xdsoft_datetimepicker .xdsoft_today_button {
  background-color: transparent;
  background-repeat: no-repeat;
  border: 0 none;
  cursor: pointer;
  display: block;
  height: 30px;
  opacity: 0.5;
  -ms-filter: "alpha(opacity=50)";
  outline: medium none;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-indent: 100%;
  white-space: nowrap;
  width: 20px;
  min-width: 0;
}
.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_prev,
.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_next {
  float: none;
  background-position: -40px -15px;
  height: 15px;
  width: 30px;
  display: block;
  margin-left: 14px;
  margin-top: 7px;
}
.xdsoft_datetimepicker.xdsoft_rtl .xdsoft_timepicker .xdsoft_prev,
.xdsoft_datetimepicker.xdsoft_rtl .xdsoft_timepicker .xdsoft_next {
  float: none;
  margin-left: 0;
  margin-right: 14px;
}
.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_prev {
  background-position: -40px 0;
  margin-bottom: 7px;
  margin-top: 0;
}
.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_time_box {
  height: 151px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
}
.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_time_box > div > div {
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  color: #666;
  font-size: 12px;
  text-align: center;
  border-collapse: collapse;
  cursor: pointer;
  border-bottom-width: 0;
  height: 25px;
  line-height: 25px;
}
.xdsoft_datetimepicker
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div:first-child {
  border-top-width: 0;
}
.xdsoft_datetimepicker .xdsoft_today_button:hover,
.xdsoft_datetimepicker .xdsoft_next:hover,
.xdsoft_datetimepicker .xdsoft_prev:hover {
  opacity: 1;
  -ms-filter: "alpha(opacity=100)";
}
.xdsoft_datetimepicker .xdsoft_label {
  display: inline;
  position: relative;
  z-index: 9999;
  margin: 0;
  padding: 5px 3px;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  background-color: #fff;
  float: left;
  width: 182px;
  text-align: center;
  cursor: pointer;
}
.xdsoft_datetimepicker .xdsoft_label:hover > span {
  text-decoration: underline;
}
.xdsoft_datetimepicker .xdsoft_label:hover i {
  opacity: 1;
}
.xdsoft_datetimepicker .xdsoft_label > .xdsoft_select {
  border: 1px solid #ccc;
  position: absolute;
  right: 0;
  top: 30px;
  z-index: 101;
  display: none;
  background: #fff;
  max-height: 160px;
  overflow-y: hidden;
}
.xdsoft_datetimepicker .xdsoft_label > .xdsoft_select.xdsoft_monthselect {
  right: -7px;
}
.xdsoft_datetimepicker .xdsoft_label > .xdsoft_select.xdsoft_yearselect {
  right: 2px;
}
.xdsoft_datetimepicker
  .xdsoft_label
  > .xdsoft_select
  > div
  > .xdsoft_option:hover {
  color: #fff;
  background: #ff8000;
}
.xdsoft_datetimepicker .xdsoft_label > .xdsoft_select > div > .xdsoft_option {
  padding: 2px 10px 2px 5px;
  text-decoration: none !important;
}
.xdsoft_datetimepicker
  .xdsoft_label
  > .xdsoft_select
  > div
  > .xdsoft_option.xdsoft_current {
  background: #3af;
  box-shadow: #178fe5 0 1px 3px 0 inset;
  color: #fff;
  font-weight: 700;
}
.xdsoft_datetimepicker .xdsoft_month {
  width: 100px;
  text-align: right;
}
.xdsoft_datetimepicker .xdsoft_calendar {
  clear: both;
}
.xdsoft_datetimepicker .xdsoft_year {
  width: 48px;
  margin-left: 5px;
}
.xdsoft_datetimepicker .xdsoft_calendar table {
  border-collapse: collapse;
  width: 100%;
}
.xdsoft_datetimepicker .xdsoft_calendar td > div {
  padding-right: 5px;
}
.xdsoft_datetimepicker .xdsoft_calendar th {
  height: 25px;
}
.xdsoft_datetimepicker .xdsoft_calendar td,
.xdsoft_datetimepicker .xdsoft_calendar th {
  width: 14.2857142%;
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
  font-size: 12px;
  text-align: right;
  vertical-align: middle;
  padding: 0;
  border-collapse: collapse;
  cursor: pointer;
  height: 25px;
}
.xdsoft_datetimepicker.xdsoft_showweeks .xdsoft_calendar td,
.xdsoft_datetimepicker.xdsoft_showweeks .xdsoft_calendar th {
  width: 12.5%;
}
.xdsoft_datetimepicker .xdsoft_calendar th {
  background: #f1f1f1;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_today {
  color: #3af;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_highlighted_default {
  background: #ffe9d2;
  box-shadow: #ffb871 0 1px 4px 0 inset;
  color: #000;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_highlighted_mint {
  background: #c1ffc9;
  box-shadow: #00dd1c 0 1px 4px 0 inset;
  color: #000;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_default,
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_current,
.xdsoft_datetimepicker
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div.xdsoft_current {
  background: #3af;
  box-shadow: #178fe5 0 1px 3px 0 inset;
  color: #fff;
  font-weight: 700;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_other_month,
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_disabled,
.xdsoft_datetimepicker .xdsoft_time_box > div > div.xdsoft_disabled {
  opacity: 0.5;
  -ms-filter: "alpha(opacity=50)";
  cursor: default;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_other_month.xdsoft_disabled {
  opacity: 0.2;
  -ms-filter: "alpha(opacity=20)";
}
.xdsoft_datetimepicker .xdsoft_calendar td:hover,
.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_time_box > div > div:hover {
  color: #fff !important;
  background: #ff8000 !important;
  box-shadow: none !important;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_current.xdsoft_disabled:hover,
.xdsoft_datetimepicker
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div.xdsoft_current.xdsoft_disabled:hover {
  background: #3af !important;
  box-shadow: #178fe5 0 1px 3px 0 inset !important;
  color: #fff !important;
}
.xdsoft_datetimepicker .xdsoft_calendar td.xdsoft_disabled:hover,
.xdsoft_datetimepicker
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div.xdsoft_disabled:hover {
  color: inherit !important;
  background: inherit !important;
  box-shadow: inherit !important;
}
.xdsoft_datetimepicker .xdsoft_calendar th {
  font-weight: 700;
  text-align: center;
  color: #999;
  cursor: default;
}
.xdsoft_datetimepicker .xdsoft_copyright {
  color: #ccc !important;
  font-size: 10px;
  clear: both;
  float: none;
  margin-left: 8px;
}
.xdsoft_datetimepicker .xdsoft_copyright a {
  color: #eee !important;
}
.xdsoft_datetimepicker .xdsoft_copyright a:hover {
  color: #aaa !important;
}
.xdsoft_time_box {
  position: relative;
  border: 1px solid #ccc;
}
.xdsoft_scrollbar > .xdsoft_scroller {
  background: #ccc !important;
  height: 20px;
  border-radius: 3px;
}
.xdsoft_scrollbar {
  position: absolute;
  width: 7px;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
}
.xdsoft_datetimepicker.xdsoft_rtl .xdsoft_scrollbar {
  left: 0;
  right: auto;
}
.xdsoft_scroller_box {
  position: relative;
}
.xdsoft_datetimepicker.xdsoft_dark {
  box-shadow: 0 5px 15px -5px rgba(255, 255, 255, 0.506);
  background: #000;
  border-bottom: 1px solid #444;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  border-top: 1px solid #333;
  color: #ccc;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_timepicker .xdsoft_time_box {
  border-bottom: 1px solid #222;
}
.xdsoft_datetimepicker.xdsoft_dark
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div {
  background: #0a0a0a;
  border-top: 1px solid #222;
  color: #999;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_label {
  background-color: #000;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_label > .xdsoft_select {
  border: 1px solid #333;
  background: #000;
}
.xdsoft_datetimepicker.xdsoft_dark
  .xdsoft_label
  > .xdsoft_select
  > div
  > .xdsoft_option:hover {
  color: #000;
  background: #007fff;
}
.xdsoft_datetimepicker.xdsoft_dark
  .xdsoft_label
  > .xdsoft_select
  > div
  > .xdsoft_option.xdsoft_current {
  background: #c50;
  box-shadow: #b03e00 0 1px 3px 0 inset;
  color: #000;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_label i,
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_prev,
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_next,
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_today_button {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAeCAYAAADaW7vzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUExQUUzOTA0M0UyMTFFNDlBM0FFQTJENTExRDVBODYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUExQUUzOTE0M0UyMTFFNDlBM0FFQTJENTExRDVBODYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQTFBRTM4RTQzRTIxMUU0OUEzQUVBMkQ1MTFENUE4NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQTFBRTM4RjQzRTIxMUU0OUEzQUVBMkQ1MTFENUE4NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp0VxGEAAAIASURBVHja7JrNSgMxEMebtgh+3mslr1t1xn2choskb08+QmR8Bx9A8e7RixdB9CKCoNdexIugxFlJa7rNZneTbLIpM/CnNLsdMvNjM8l0mRCiQ9Ye61IKCAgZAUnH+mU3MMZaHYChBnJUDzWOFZdVfc5+ZFLbrWDeXPwbxIqrLLfaeS0hEBVGIRQCEiZoHQwtlGSByCCdYBl8g8egTTAWoKQMRBRBcZxYlhzhKegqMOageErsCHVkk3hXIFooDgHB1KkHIHVgzKB4ADJQ/A1jAFmAYhkQqA5TOBtocrKrgXwQA8gcFIuAIO8sQSA7hidvPwaQGZSaAYHOUWJABhWWw2EMIH9QagQERU4SArJXo0ZZL18uvaxejXt/Em8xjVBXmvFr1KVm/AJ10tRe2XnraNqaJvKE3KHuUbfK1E+VHB0q40/y3sdQSxY4FHWeKJCunP8UyDdqJZenT3ntVV5jIYCAh20vT7ioP8tpf6E2lfEMwERe+whV1MHjwZB7PBiCxcGQWwKZKD62lfGNnP/1poFAA60T7rF1UgcKd2id3KDeUS+oLWV8DfWAepOfq00CgQabi9zjcgJVYVD7PVzQUAUGAQkbNJTBICDhgwYTjDYD6XeW08ZKh+A4pYkzenOxXUbvZcWz7E8ykRMnIHGX1XPl+1m2vpypl+2qdb8cdaarlkfez/ZVkAAAAABJRU5ErkJggg==);
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar td,
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar th {
  background: #0a0a0a;
  border: 1px solid #222;
  color: #999;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar th {
  background: #0e0e0e;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar td.xdsoft_today {
  color: #c50;
}
.xdsoft_datetimepicker.xdsoft_dark
  .xdsoft_calendar
  td.xdsoft_highlighted_default {
  background: #ffe9d2;
  box-shadow: #ffb871 0 1px 4px 0 inset;
  color: #000;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar td.xdsoft_highlighted_mint {
  background: #c1ffc9;
  box-shadow: #00dd1c 0 1px 4px 0 inset;
  color: #000;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar td.xdsoft_default,
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar td.xdsoft_current,
.xdsoft_datetimepicker.xdsoft_dark
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div.xdsoft_current {
  background: #c50;
  box-shadow: #b03e00 0 1px 3px 0 inset;
  color: #000;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar td:hover,
.xdsoft_datetimepicker.xdsoft_dark
  .xdsoft_timepicker
  .xdsoft_time_box
  > div
  > div:hover {
  color: #000 !important;
  background: #007fff !important;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_calendar th {
  color: #666;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_copyright {
  color: #333 !important;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_copyright a {
  color: #111 !important;
}
.xdsoft_datetimepicker.xdsoft_dark .xdsoft_copyright a:hover {
  color: #555 !important;
}
.xdsoft_dark .xdsoft_time_box {
  border: 1px solid #333;
}
.xdsoft_dark .xdsoft_scrollbar > .xdsoft_scroller {
  background: #333 !important;
}
.xdsoft_datetimepicker .xdsoft_save_selected {
  display: block;
  border: 1px solid #ddd !important;
  margin-top: 5px;
  width: 100%;
  color: #454551;
  font-size: 13px;
}
.xdsoft_datetimepicker .blue-gradient-button {
  font-family: "museo-sans", "Book Antiqua", sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: #82878c;
  height: 28px;
  position: relative;
  padding: 4px 17px 4px 33px;
  border: 1px solid #d7d8da;
  background: -moz-linear-gradient(top, #fff 0, #f4f8fa 73%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #fff),
    color-stop(73%, #f4f8fa)
  );
  background: -webkit-linear-gradient(top, #fff 0, #f4f8fa 73%);
  background: -o-linear-gradient(top, #fff 0, #f4f8fa 73%);
  background: -ms-linear-gradient(top, #fff 0, #f4f8fa 73%);
  background: linear-gradient(to bottom, #fff 0, #f4f8fa 73%);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr="#fff",
      endColorstr="#f4f8fa",
      GradientType=0
    );
}
.xdsoft_datetimepicker .blue-gradient-button:hover,
.xdsoft_datetimepicker .blue-gradient-button:focus,
.xdsoft_datetimepicker .blue-gradient-button:hover span,
.xdsoft_datetimepicker .blue-gradient-button:focus span {
  color: #454551;
  background: -moz-linear-gradient(top, #f4f8fa 0, #fff 73%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #f4f8fa),
    color-stop(73%, #fff)
  );
  background: -webkit-linear-gradient(top, #f4f8fa 0, #fff 73%);
  background: -o-linear-gradient(top, #f4f8fa 0, #fff 73%);
  background: -ms-linear-gradient(top, #f4f8fa 0, #fff 73%);
  background: linear-gradient(to bottom, #f4f8fa 0, #fff 73%);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr="#f4f8fa",
      endColorstr="#FFF",
      GradientType=0
    );
}
</style>