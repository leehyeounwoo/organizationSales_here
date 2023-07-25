<template>
	<div style="overflow:hidden" :class="$vuetify.breakpoint.xs ? 'mobile_dashboard_lay' : 'dashboard_lay'">
		<v-layout>
			<v-flex
				@click="closeRight()"
				v-if="$vuetify.breakpoint.lgAndUp"
				lg2
				style="background:#F2F2F2; color:#323153; fontWeight:bold; max-width:200px;"
			>
				<leftNav></leftNav>
			</v-flex>
			<v-flex xs12 style="">
				<div class="mainboard_lay">
					<v-layout>
						<kioskHeader />
					</v-layout>

					<v-layout
						:class="$route.name === 'boardReport' ? 'dashboardNoScroll boardClass' : 'dashboardNoScroll'"
						style="border-radius:1vh;"
						justify-center
						@click="closeRight()"
					>
						<router-view></router-view>
					</v-layout>
					<!-- v-if="$store.state.bellStatus"
						transition="fade-transition" -->
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import leftNav from '../nav/kioskLeftNav.vue'
import kioskHeader from '../nav/kioskHeader.vue'

export default {
	components: {
		leftNav,
		kioskHeader,
	},
	async created() {
		this.$store.state.loading = true
		let ok = 0
		const meDataWaitings = setInterval(async () => {
			ok += 1

			if (sessionStorage.getItem('reserveLite-t')) {
				clearInterval(meDataWaitings)
				await this.medata()
			}
			if (ok === 10) {
				clearInterval(meDataWaitings)
			}
		}, 1000)
	},
	methods: {
		closeRight() {
			this.$store.state.bellStatus = false
			this.$store.state.chatStatus = false
		},
		async medata() {
			console.log(sessionStorage.getItem('reserveLite-t'))
			await this.$store
				.dispatch('me')
				.then(async res => {
					this.$store.state.meData = res.me
					this.$store.state.dashBoardList = [
						{
							title: '대쉬보드',
							name: 'dashBoard',
							click: true,
						},
						// {
						// 	title: '방문예약 생성',
						// 	name: '',
						// 	click: false,
						// },
						{
							title: '방문예약 관리',
							name: 'visitReservationManagement',
							click: false,
						},
						// {
						// 	title: '지점 관리',
						// 	name: 'businessSiteManagement',
						// 	click: false,
						// },
						// {
						// 	title: '문항 관리',
						// 	name: 'campaignManagement',
						// 	click: false,
						// },
						// {
						// 	title: '이벤트 관리',
						// 	name: 'eventManagement',
						// 	click: false,
						// },
						// {
						// 	title: '예약 관리',
						// 	name: 'reservationManagement',
						// 	click: false,
						// },
						// {
						// 	title: '상품 관리',
						// 	name: 'productManagement',
						// 	click: false,
						// },
						{
							title: '예약 고객 관리',
							name: 'customerManagement',
							click: false,
						},
						{
							title: '시스템 관리',
							name: 'systemManagement',
							click: false,
						},
					]
					// 대시 보드
					// ---
					// 지점 관리
					// 문항 관리
					// 이벤트 관리
					// 예약 관리
					// 상품 관리
					// 예약 고객 관리
					// 시스템 관리

					// let idx = this.$store.state.dashBoardList.findIndex(x => x.name === this.$route.name)
					// this.$store.state.dashBoardList.forEach(element => {
					// 	element.click = false
					// })
					// if (idx !== -1) {
					// 	this.$store.state.dashBoardList[idx].click = true
					// }
					// if (res.me.face === null) {
					// 	// this.$store.state.meData.face = { url: location.protocol + '//' + location.host + '/image/default_pic.png' }
					// }
					// if (res.me.group) {
					// 	if (res.me.group.logo !== null) {
					// 		this.$store.state.logoUrl = this.$store.state.backServer + res.me.group.logo.url
					// 	} else {
					// 		this.$store.state.logoUrl = ''
					// 	}
					// }
					// if (this.$store.state.meData.group) {
					// 	if (this.$store.state.meData.group.groupcode === '2q0kv62ja') {
					// 		this.$store.state.rangeStatus = ['예약건수', '방문예약', '분양상담', '-', '상담현황']
					// 		this.$store.state.customerManagementTabs = ['방문고객 관리', '분양상담 고객관리']
					// 	} else {
					// 		this.$store.state.customerManagementTabs = ['방문고객 관리', '상담 고객 관리', '문진표 현황']
					// 		this.$store.state.rangeStatus = ['예약건수', '예약방문', '현장등록', '방문자수', '상담현황']
					// 	}
					// } else {
					// 	if (this.$store.state.meData.groupcode === '2q0kv62ja') {
					// 		this.$store.state.rangeStatus = ['예약건수', '방문예약', '분양상담', '-', '상담현황']
					// 		this.$store.state.customerManagementTabs = ['방문고객 관리', '분양상담 고객관리']
					// 	} else {
					// 		this.$store.state.rangeStatus = ['예약건수', '예약방문', '현장등록', '방문자수', '상담현황']
					// 		this.$store.state.customerManagementTabs = ['방문고객 관리', '상담 고객 관리', '문진표 현황']
					// 	}
					// }
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
					// sessionStorage.removeItem('reserveLite-t')
					this.$router.push('/').catch(() => {})
				})
		},
	},
}
</script>

<style lang="scss" scoped>
.dashboardNoScroll {
	background-color: white;
	overflow-y: auto;
	overflow-x: hidden;
	min-height: auto;
}

.dashboardNoScroll::-webkit-scrollbar {
	width: 0px;
	display: none !important; /* Chrome, Safari, Opera */
}
.alertDiv {
	background-color: #f4f8fd;
	overflow-y: scroll;
	box-shadow: -3px 0px 5px #dfdfdf;
}
.alertDiv::-webkit-scrollbar {
	width: 0px;
	display: none !important; /* Chrome, Safari, Opera */
}
.chatDiv {
	background-color: #f4f8fd;
	box-shadow: -3px 0px 5px #dfdfdf;
}
</style>

<style lang="scss">
.dashboard_lay {
	background-color: var(--point1-color);
	overflow-y: hidden;
	.mainboard_lay {
		background-color: #fff;
		height: 100vh;
		overflow: auto;
	}
}
.mobile_dashboard_lay {
	background-color: var(--point1-color);
	overflow-y: hidden;
	.mainboard_lay {
		background-color: #f4f8fd;
		height: 100vh;
		border-radius: 20px;
	}
}
</style>
