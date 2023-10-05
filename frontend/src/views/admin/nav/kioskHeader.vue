<template>
	<div style="width:100%; height:60px; background-color:#fff; box-shadow:0 0 5px 0">
		<v-layout justify-end align-center>
			<v-flex class="pl-10">
				<!-- <v-btn class="kiosk_header_btn" @click="statusBoardShow">현황판</v-btn> -->
				<!-- <v-btn class="kiosk_header_btn ml-3" @click="productShow">물건배정</v-btn> -->
				<v-btn :class="settlementsCount === 0 ? 'kiosk_header_btn2 ml-3' : 'kiosk_header_btn_active ml-3'" @click="settlementShow"
					>정산 대기
					<span class="mr-1">
						{{ settlementsCount }}
					</span>
					<v-progress-circular :rotate="-90" :size="20" :width="5" :value="settlementsValue" color="white"> </v-progress-circular>
				</v-btn>
				<v-btn :class="assignmentsCount === 0 ? 'kiosk_header_btn2 ml-3' : 'kiosk_header_btn_active ml-3'" @click="productShow"
					>배정 대기
					<span class="mr-1">
						{{ assignmentsCount }}
					</span>
					<v-progress-circular :rotate="-90" :size="20" :width="5" :value="assignmentsValue" color="white"> </v-progress-circular>
				</v-btn>
				<v-btn :class="unattendedLength === 0 ? 'kiosk_header_btn2 ml-3' : 'kiosk_header_btn_active ml-3'" @click="vacationShow"
					>연차 대기

					<span class="mr-1">
						{{ unattendedLength }}
					</span>
					<v-progress-circular :rotate="-90" :size="20" :width="5" :value="vacationsValue" color="white"> </v-progress-circular>
				</v-btn>
			</v-flex>
			<v-flex lg2 md3 sm5 xs12 style="max-width:none">
				<v-layout align-center>
					<v-layout align-center justify-end style="height:60px">
						<selectBoxValueItems
							class="mr-4 mt-2"
							:sel="$store.state.businessSelectBox"
							:value="$store.state.businessSelectBox.value"
							:items="$store.state.businessSelectBox.items"
							@change="businessValueChange"
						></selectBoxValueItems>
						<div style="fontSize:14px; fontWeight:bold; color:#0168B2; margin-right:16px;">
							{{ this.$store.state.meData ? this.$store.state.meData.name : '-' }}
						</div>
						<!-- <v-divider inset vertical></v-divider> -->
						<v-btn icon @click="logout()" class="ml-1">
							<v-icon size="24" color="black">mdi-logout</v-icon>
						</v-btn>
					</v-layout>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { selectBoxValueItems } from '@/components/index'

export default {
	components: {
		selectBoxValueItems,
	},
	beforeDestroy() {
		clearInterval(this.interval)
	},
	mounted() {
		this.assignmentsInterval = setInterval(() => {
			if (this.assignmentsValue === 100) {
				const assignmentsViewData = {
					businessID: this.$store.state.businessSelectBox.value,
					status: 'waiting',
					created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
					created_at_lte: this.$moment(
						this.$moment()
							.add(1, 'd')
							.format('YYYY-MM-DD'),
					),
				}
				this.assignmentView(assignmentsViewData)
				return (this.assignmentsValue = 0)
			}
			this.assignmentsValue += 5
		}, 500)
		this.settlementsInterval = setInterval(() => {
			if (this.$store.state.headerRefresh) {
				this.settlementsValue = 100
			}
			if (this.settlementsValue === 100) {
				const settlementsViewData = {
					businessID: this.$store.state.businessSelectBox.value,
					// settlementStatus: 'waiting',
				}
				this.settlementsView(settlementsViewData)
				return (this.settlementsValue = 0)
			}
			this.settlementsValue += 1
		}, 1800)
		this.vacationsInterval = setInterval(() => {
			if (this.vacationsValue === 100) {
				this.unattendedVacation()
				return (this.vacationsValue = 0)
			}
			this.vacationsValue += 5
		}, 500)
	},
	data() {
		return {
			assignmentsInterval: {},
			assignmentsValue: 0,
			settlementsInterval: {},
			settlementsValue: 0,
			vacationsInterval: {},
			vacationsValue: 0,
			assignmentsCount: 0,
			settlementsCount: 0,
			unattendedLength: 0,
			holdingDetail: {
				dialog: false,
				todayTime: '',
			},
			defalutImg: location.protocol + '//' + location.host + '/image/default_pic.png',
			overlay: false,
			drawer: false,
			rightDrawer: false, // 오른쪽 nav
			header_btn: [
				{ type: 'alert', color: '#3143DC', btn_icon: 'mdi-bell-outline', badgeNo: 1 },
				{ type: 'chat', color: '#3143DC', btn_icon: 'mdi-message-minus-outline', badgeNo: 5 },
				// { type: 'package', color: '#5C5C5C', btn_icon: 'mdi-gift-outline', badgeNo: 4 },
				{ type: 'system', color: '', btn_icon: 'mdi-cog-outline', badgeNo: '' },
				// { type: 'red', color: '#FB714D', btn_icon: 'mdi-cog-outline', badgeNo: 1 },
			],
			profile: {
				btn_txt: 'profile',
				color: 'blue',
				small: true,
				dark: true,
				width: '70',
				height: 35,
			},
			blue: {
				color: '#E8E7FF',
				iconMdi: true,
				iconColor: '#3143DC',
				small: true,
				iconSize: 18,
				height: 33,
				width: 33,
				class: 'headerBtn',
			},
			gray: {
				color: 'grey lighten-2',
				iconMdi: true,
				iconColor: '#5C5C5C',
				small: true,
				iconSize: 18,
				height: 33,
				width: 33,
				class: 'headerBtn',
			},
			red: {
				color: '#FCE6E4',
				iconMdi: true,
				iconColor: '#FB714D',
				small: true,
				iconSize: 18,
				height: 33,
				width: 33,
				class: 'headerBtn',
			},
			menus: [{ title: 'My Profile' }, { title: 'Logout' }],
		}
	},
	computed: {
		cartValue() {
			return this.$store.state.bellNum
		},
	},
	beforeCreate() {
		this.$store.dispatch('businesses').then(res => {
			if (res.businesses.length !== 0) {
				this.$store.state.businessSelectBox.items = res.businesses
				this.$store.state.businessSelectBox.value = res.businesses[0].id
			} else {
				this.$router.push('/KIOSK').catch(() => {})
				return alert('등록된 사업지가 없습니다. \n등록 후 이용해주세요.')
			}
		})
	},
	async created() {
		if (!sessionStorage.getItem('reserveLite-t')) {
			// this.$router.push({ name: 'kioskLogin' }).catch(() => {})
		}
		// this.businessView()
		// else {
		// this.meData()
		// }
	},
	methods: {
		async unattendedVacation() {
			let vacationIDArr = []

			let input = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
				workingStatus: true,
			}

			await this.$store.dispatch('users', input).then(res => {
				for (let i = 0; i < res.users.length; i++) {
					vacationIDArr.push(res.users[i].id)
				}
			})

			let unattendedData = {
				vacationStatus: 'waiting',
				idArr: vacationIDArr,
			}

			await this.$store.dispatch('vacations', unattendedData).then(res => {
				this.unattendedLength = res.vacations.length
			})
		},
		async settlementsView(settlementsViewData) {
			await this.$store.dispatch('settlements', settlementsViewData).then(res => {
				this.settlementsCount = res.settlements.filter(
					x =>
						(x.paymentReject === false &&
							x.settlementStatus === 'agree' &&
							x.settlement_turn_tables.filter(x => x.turnStatus === 'complete').length < x.settlement_turn_tables.length) ||
						(x.paymentReject === false && x.settlementStatus === 'agree' && x.settlement_turn_tables.length === 0) ||
						x.settlementStatus === 'waiting',
				).length
				this.$store.state.headerRefresh = false
			})
		},
		async assignmentView(assignmentsViewData) {
			await this.$store
				.dispatch('assignments', assignmentsViewData)
				.then(res => {
					this.assignmentsCount = res.assignments.length
				})
				.catch(err => {
					console.log(err)
				})
		},
		businessValueChange(val) {
			this.$store.state.businessSelectBox.value = val
			this.$router.push('/KIOSK').catch(() => {})
			this.assignmentsValue = 0
			this.settlementsValue = 0
			this.assignmentsCount = 0
			this.settlementsCount = 0
			const assignmentsViewData = {
				businessID: this.$store.state.businessSelectBox.value,
				status: 'counselorNoAssignment',
				created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
				created_at_lte: this.$moment(
					this.$moment()
						.add(1, 'd')
						.format('YYYY-MM-DD'),
				),
			}
			this.assignmentView(assignmentsViewData)
			const settlementsViewData = {
				businessID: this.$store.state.businessSelectBox.value,
				// settlementStatus: 'waiting',
			}
			this.settlementsView(settlementsViewData)
			alert('사업지 변경이 완료되었습니다.')
		},
		vacationShow() {
			this.$router.push('/admin/attendanceManagement').catch(() => {})
		},
		productShow() {
			this.$store.state.productTab = 1
			this.$router.push('/admin/productManagement').catch(() => {})
		},
		settlementShow() {
			this.$router.push('/admin/settlementManagement').catch(() => {})
		},
		// statusBoardShow() {
		// 	// console.log(this.$store.state.businessSelectBox.value)
		// 	this.$router.push('/admin/statusBoard')
		// },
		businessView() {
			this.$store.dispatch('businesses').then(res => {
				this.$store.state.businessSelectBox.items = res.businesses
				this.$store.state.businessSelectBox.value = res.businesses[0].id
			})
		},
		// async meData() {
		// 	this.$store.state.loading = true
		// 	await this.$store
		// 		.dispatch('me', {})
		// 		.then(res => {
		// 			this.$store.state.loading = false
		// 			console.log(res)
		// 		})
		// 		.catch(err => {
		// 			console.log({ err })
		// 			this.$store.state.loading = false
		// 		})
		// },
		toPackage() {
			this.$router.push({ name: 'kioskPackage' }).catch(() => {})
		},
		blueIcon() {
			if (this.$route.name !== 'allAlert') {
				this.$store.state.bellStatus = !this.$store.state.bellStatus
			}
		},
		toChat() {
			this.$store.state.chatStatus = !this.$store.state.chatStatus
		},
		logout() {
			sessionStorage.removeItem('reserveLite-t')
			this.$store.commit('meData', {})
			this.$router.push({ name: 'kioskLogin' }).catch(() => {})
		},
		myPage() {
			this.$router.push({ name: 'mypage' }).catch(() => {})
		},
		toSystem() {
			this.$router.push({ name: 'system' }).catch(() => {})
		},
	},
}
</script>

<style lang="scss">
.noScrollAlert {
	width: 30vw !important;
	min-width: 260px;
	.v-navigation-drawer__content::-webkit-scrollbar {
		width: 0px;
		display: none !important; /* Chrome, Safari, Opera */
	}
}
.userImage {
	margin: 0px 0px 0px -10px;
}
.pofileMenu {
	cursor: pointer;
	background-color: white;
	padding: 20px 10px;
	font-weight: bold;
	font-size: 13px;
	color: grey;
	border-bottom: 1px solid lightgray;
	.icon {
		margin-right: 10px;
	}
}
.kiosk_header_btn {
	width: 100px;
	color: white !important;
	background-color: #323153 !important;
	font-weight: bold;
}
.kiosk_header_btn2 {
	width: 150px;
	color: white !important;
	background-color: #323153 !important;
	font-weight: bold;
}
.kiosk_header_btn_active {
	width: 150px;
	color: white !important;
	background-color: #ff6600 !important;
	font-weight: bold;
}
</style>
