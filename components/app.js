import Vue from 'vue';
import VueRouter from 'vue-router';

import app from './app.vue';
import upload_app from './upload.vue';
import loading_app from './loading.vue';
import probe_app from './probe.vue';
import gallery_app from './gallery.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/upload', component: upload_app },
        { path: '/loading', component: loading_app },
        { path: '/probe', component: probe_app },
        { path: '/gallery', component: gallery_app },
    ],
});

const vueapp = new Vue({
    el: '#app',
    router: router,
    render: (func) => func(app),
});

router.push('upload');