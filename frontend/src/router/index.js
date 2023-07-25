import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 에러 화면
import notFound from '../views/errorpage/NotFound.vue'
import notAuth from '../views/errorpage/NotAuthenticated.vue'

// 메인 화면
const KIOSK = () => import(/* webpackChunkName: "KIOSK" */ '../views/admin/boardLayout/KIOSK.vue')
const kioskLogin = () => import(/* webpackChunkName: "kioskLogin" */ '../views/admin/login/kioskLogin.vue')
const dashBoard = () => import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/dashboard.vue')
const attendanceManagement = () =>
	import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/AttendanceManagement/attendanceManagement.vue')

const routes = [
	{ path: '*', name: 'notfound', component: notFound },
	{ path: '/block', name: 'block', component: notAuth },
	{
		path: '/',
		component: kioskLogin,
		name: 'kioskLogin',
	},
	{
		path: '/',
		name: 'KIOSK',
		component: KIOSK,
		children: [
			{
				path: '/',
				name: 'dashBoard',
				component: dashBoard,
			},
			{
				path: '/admin/attendanceManagement',
				name: 'attendanceManagement',
				component: attendanceManagement,
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
