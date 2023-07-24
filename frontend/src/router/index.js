import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 에러 화면
import notFound from '../views/errorpage/NotFound.vue'
import notAuth from '../views/errorpage/NotAuthenticated.vue'

// 메인 화면
import codeMachine from '../views/layout/codeMachine.vue'
const mainBoard = () => import(/* webpackChunkName: "main" */ '../views/codeMachine/mainBoard.vue')

const routes = [
	{ path: '*', name: 'notfound', component: notFound },
	{ path: '/block', name: 'block', component: notAuth },
	{
		path: '/',
		name: 'Home',
		component: codeMachine,
		children: [
			{
				path: 'board',
				component: mainBoard,
				name: 'mainBoard',
			},
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
