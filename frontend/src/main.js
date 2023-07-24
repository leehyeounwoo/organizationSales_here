import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/axios';
import './plugins/appbus';
import './plugins/appmain';
import VueMoment from 'vue-moment';
import VueMeta from 'vue-meta';
Vue.config.productionTip = false;

Vue.use(VueMoment);
Vue.use(VueMeta);
// env 파일 로드
console.log(process.env);
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
