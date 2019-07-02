import Vue from 'vue';
import App from './app.vue';

import './assets/styles/global.styl';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    /**
     * 通过 render 将 App 文件挂载到我们的 html 页面,
     * render 只是渲染了 App 的内容，要挂载的话还需要调用 API $mount，
     * mount 到 html 页面的一个节点上，这个节点可以由我们自己设置
     */
    render: (h) => h(App) 
}).$mount(root);