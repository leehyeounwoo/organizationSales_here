import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 에러 화면
// import notFound from '../views/errorpage/NotFound.vue'
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
	{
		path: '/admin/login',
		component: kioskLogin,
		name: 'kioskLogin',
	},
	{ path: '*', name: 'notfound', component: () => import(/* webpackChunkName: "counselorPage" */ '../views/counselor/main.vue') },
	{ path: '/', name: 'mainPage', component: () => import(/* webpackChunkName: "counselorPage" */ '../views/counselor/main.vue') },
	{ path: '/block', name: 'block', component: notAuth },

	{
		path: '/counselor/main/:code',
		name: 'counselorMain',
		component: () => import(/* webpackChunkName: "counselorPage" */ '../views/counselor/main.vue'),
	},

	// 상담사 화면
	{
		path: '/counselors',
		name: 'counselors',
		component: () => import(/* webpackChunkName: "counselorBiz" */ '../views/counselor/board.vue'),
		children: [
			{
				path: '/counselor/login',
				name: 'counselorLogin',
				component: () => import(/* webpackChunkName: "counselorPage" */ '../views/counselor/login.vue'),
			},

			{
				path: '/counselor/register/:code',
				name: 'counselorRegister',
				component: () => import(/* webpackChunkName: "counselorPage" */ '../views/counselor/register.vue'),
			},

			{
				path: '/counselor/dashboard',
				name: 'counselorDashboard',
				component: () => import(/* webpackChunkName: "counselorBiz" */ '../views/counselor/dashboard.vue'),
				// meta: { requiresAuth: true },
			},
			// 상담사  - 대시보드
			{
				path: '/counselor/bizDashboard/:id',
				name: 'counselorBizDashboard',
				component: () => import(/* webpackChunkName: "counselorBiz" */ '../views/counselor/bizDashboard.vue'),
				meta: { requiresAuth: true },
			},
			// 상담사  - 상담관리
			{
				path: '/counselor/reservation/:id',
				name: 'counselorBizReservation',
				component: () =>
					import(
						/* webpackChunkName: "counselorBiz" */ '../views/counselor/bizDashboardItem/counselManagement/counselorBizReservation.vue'
					),
				meta: { requiresAuth: true },
			},
			{
				path: '/counselor/bizDashboardItem/clientManagement',
				name: 'counselorClients',
				component: () => import(/* webpackChunkName: "counselorBiz" */ '../views/counselor/bizDashboardItem/clientManagement/index.vue'),
				meta: { requiresAuth: true },
			},

			{
				path: '/counselor/commuteManagement/manage',
				component: () => import(/* webpackChunkName: "campaign" */ '../views/counselor/commuteManagement/manage.vue'),
				name: '/counselor/commuteManagement/manage',
				meta: { requiresAuth: true },
			},
			// 공지사항  - 공지사항
			{
				path: '/counselor/notice/:id',
				name: 'counselorNotice',
				component: () => import(/* webpackChunkName: "counselorBiz" */ '../views/counselor/bizDashboardItem/notice.vue'),
				meta: { requiresAuth: true },
			},
		],
	},
	{
		path: '/KIOSK',
		name: 'KIOSK',
		component: KIOSK,
		meta: { requiresAuth: true },
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
