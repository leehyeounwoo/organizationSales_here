<template>
	<div style="width:100%; height:60px; background-color:#fff; box-shadow:0 0 5px 0">
		<v-layout justify-end align-center>
			<v-flex class="pl-10">
				<v-btn class="kiosk_header_btn" @click="holdTimeShow">현황판</v-btn>
				<v-btn class="kiosk_header_btn ml-3">물건배정</v-btn>
			</v-flex>
			<v-flex lg2 md3 sm5 xs12 style="max-width:none">
				<v-layout align-center>
					<v-layout align-center justify-end style="height:60px">
						<selectBoxValueItems
							class="mr-4 mt-2"
							:sel="$store.state.businessSelectBox"
							v-model="$store.state.businessSelectBox.value"
							:items="$store.state.businessSelectBox.items"
						></selectBoxValueItems>
						<div style="fontSize:14px; fontWeight:bold; color:#0168B2; margin-right:16px;">
							{{ this.$store.state.meData.name ? this.$store.state.meData.name : '-' }}
						</div>
						<div style="fontSize:14px; fontWeight:bold; color:#0168B2; margin-right:16px;">
							{{ this.$store.state.meData.username }}
						</div>
						<!-- <v-divider inset vertical></v-divider> -->
						<v-btn icon @click="logout()" class="ml-1">
							<v-icon size="24" color="black">mdi-logout</v-icon>
						</v-btn>
					</v-layout>
				</v-layout>
			</v-flex>
		</v-layout>
		<holdTimeDetail :setdialog="holdingDetail" />
	</div>
</template>

<script>
import { selectBoxValueItems } from '@/components/index'
import holdTimeDetail from '../viewItem/holdTimeDetail.vue'

export default {
	components: {
		selectBoxValueItems,
		holdTimeDetail,
	},
	data() {
		return {
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
	async created() {
		if (!sessionStorage.getItem('reserveLite-t')) {
			// this.$router.push({ name: 'kioskLogin' }).catch(() => {})
		}
		this.businessView()
		// else {
		// this.meData()
		// }
	},
	methods: {
		holdTimeShow() {
			this.holdingDetail.todayTime = this.$moment().format('YYYY-MM-DD HH:mm')
			this.holdingDetail.dialog = true
		},
		businessView() {
			this.$store.dispatch('businesses').then(res => {
				console.log(res)
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
</style>
