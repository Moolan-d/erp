// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';




import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

import App from './App';

//vuex

import store from './store';
// import Vuex from 'vuex'
// Vue.use(Vuex)

import router from './router';
Vue.config.productionTip = false;

/* eslint-disable no-new */
let vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

store.subscribe((mutation, state) => {
    if(mutation.payload.error) {
        let error = mutation.payload.error;
        vue.$message({
          message: error,
          type: 'error'
        });

        if (error.code == 400301) {
            location.href = "/#/"
        }

    }
});
