<template>
	<div class="leftNav_wrap">
		<v-layout v-if="$vuetify.breakpoint.xs" class="pa-4" justify-end>
			<v-icon @click="$store.state.drawer = false">mdi-close</v-icon>
		</v-layout>
		<v-layout class="logoLayout" style="">
			<v-img
				v-if="$store.state.logoUrl !== '' && $store.state.logoUrl"
				@click="$router.push({ name: 'businessSiteManagement' }).catch(() => {}), ($store.state.drawer = false)"
				:src="$store.state.logoUrl"
				lazy-src="/image/reserve_lite logo.png"
			></v-img>
			<v-layout
				v-else
				justify-center
				@click="$router.push({ name: 'businessSiteManagement' }).catch(() => {}), ($store.state.drawer = false)"
				style="cursor:pointer;"
			>
				<v-layout justify-center>
					<v-img contain max-width="115.6" max-height="30" src="../../../assets/images/reserve_lite logo.png"></v-img>
				</v-layout>
			</v-layout>
		</v-layout>
		<div v-for="(list, index) in $store.state.dashBoardList" :key="index">
			<v-layout
				:class="index === 0 ? 'active' : 'listNav'"
				justify-center
				align-center
				:style="list.click ? `background-color:${$store.state.PointColor2}; border-radius:1vh; color:white` : `border-radius:1vh;`"
				@click.stop="listClick(list)"
			>
				<v-flex style="text-align:center;">
					<div>{{ list.title }}</div>
				</v-flex>
			</v-layout>
			<v-divider v-if="index === 0" style="width:166px; padding-bottom:6px; margin:0 auto"></v-divider>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
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
			await this.$store
				.dispatch('me')
				.then(async res => {
					console.log(res)
					this.$store.state.meData = res.me
					this.$store.state.dashBoardList = [
						{
							title: '사업자 관리',
							name: 'dashBoard',
							click: true,
						},

						{
							title: '상품 관리',
							name: 'visitReservationManagement',
							click: false,
						},

						{
							title: '조직 관리',
							name: 'customerManagement',
							click: false,
						},
						{
							title: '근태 관리',
							name: 'systemManagement',
							click: false,
						},
						{
							title: '정산 관리',
							name: 'systemManagement',
							click: false,
						},
					]
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
.active {
	cursor: pointer;
	margin: 14px 14px 20px !important;
	background: #ffae28;
	color: white;
	width: 166px;
	height: 40px;
}
.active:hover {
	background-color: var(--point2-color);
	color: white;
	border-radius: 1vh;
	transition: 0.5s;
}
.listNav {
	cursor: pointer;
	margin: 14px !important;
	background: #e4e4eb;
	width: 166px;
	height: 40px;
}
.listNav:hover {
	background-color: var(--point2-color);
	color: white;
	border-radius: 1vh;
	transition: 0.5s;
}
</style>

<style lang="scss">
:root {
	--point1-color: rgb(222, 222, 222);
	--point2-color: #323153;
	--point3-color: #ffae28;
	--info-color: blue;
}
.leftNav_wrap {
	width: 200px;
}
.logoLayout {
	padding-top: 22px;
	padding-bottom: 31px;
}
</style>
