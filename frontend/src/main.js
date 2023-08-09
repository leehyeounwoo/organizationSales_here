import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMoment from 'vue-moment'
import VueMeta from 'vue-meta'
import io from 'socket.io-client'
import VueTheMask from 'vue-the-mask'

// vue 가드설정
router.beforeEach(async (to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (sessionStorage.getItem('reserveLite-t') === null) {
			router.push('/')
		} else {
			next()
		}
	} else {
		next()
	}
	// if (to.matched.some(record => record.meta.admin)) {
	// 	store
	// 		.dispatch('me')
	// 		.then(res => {
	// 			if (res.me.role.name === 'partner') {
	// 				router.push('/block')
	// 				sessionStorage.removeItem('here-t')
	// 			} else {
	// 				next()
	// 			}
	// 		})
	// 		.catch(() => {
	// 			sessionStorage.removeItem('here-t')
	// 			router.push('/block')
	// 		})
	// } else {
	// 	next()
	// }
})

Vue.use(VueTheMask)
const socket = io(process.env.VUE_APP_BACKEND_SOCKET, {
	reconnection: true,
	transports: ['websocket'],
})
Vue.prototype.$socket = socket

Vue.config.productionTip = false

Vue.use(VueMoment)
Vue.use(VueMeta)
// env 파일 로드
console.log(process.env)
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app')
