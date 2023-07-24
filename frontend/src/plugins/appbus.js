import Vue from 'vue';
const bus = new Vue();
Vue.prototype.$appbus = bus;
export default bus;
