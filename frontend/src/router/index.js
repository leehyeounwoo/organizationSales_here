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
const productManagement = () => import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/Product/productManagement.vue')
const attendanceManagement = () =>
	import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/AttendanceManagement/attendanceManagement.vue')
const organizationManagement = () => import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/organizationManagement/main.vue')
const agentManagement = () => import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/organizationManagement/agentManagement.vue')
const organizationStatus = () =>
	import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/organizationManagement/organizationStatus.vue')
const settlementManagement = () =>
	import(/* webpackChunkName: "KIOSK" */ '../views/admin/views/SettlementManagement/settlementManagement.vue')

const routes = [
	{ path: '*', name: 'notfound', component: notFound },
	{ path: '/block', name: 'block', component: notAuth },
	{
		path: '/',
		component: kioskLogin,
		name: 'kioskLogin',
	},
	{
		path: '/KIOSK',
		name: 'KIOSK',
		component: KIOSK,
		children: [
			{
				path: '/',
				name: 'dashBoard',
				component: dashBoard,
			},
			{
				path: '/admin/productManagement',
				name: 'productManagement',
				component: productManagement,
			},
			{
				path: '/admin/attendanceManagement',
				name: 'attendanceManagement',
				component: attendanceManagement,
			},
			{
				path: '/admin/organizationManagement',
				name: 'organizationManagement',
				component: organizationManagement,
			},
			{
				path: '/admin/agentManagement',
				name: 'agentManagement',
				component: agentManagement,
			},
			{
				path: '/admin/organizationStatus',
				name: 'organizationStatus',
				component: organizationStatus,
			},
			{
				path: '/admin/settlementManagement',
				name: 'settlementManagement',
				component: settlementManagement,
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
