<template>
	<div class="leftNav_wrap">
		<v-layout v-if="$vuetify.breakpoint.xs" class="pa-4" justify-end>
			<v-icon @click="$store.state.drawer = false">mdi-close</v-icon>
		</v-layout>
		<v-layout class="logoLayout" style="" justify-center>
			<span style="color:white">Members Here</span>
		</v-layout>
		<v-layout justify-center>
			<span
				style="color:#ff6600; 
				font-size:1.25rem;
				overflow:hidden;
      	text-overflow:ellipsis;
      	white-space:nowrap;
"
				>{{
					this.$store.state.businessSelectBox.items.length > 0 &&
						this.$store.state.businessSelectBox.items.filter(x => x.id === this.$store.state.businessSelectBox.value)[0].name
				}}</span
			>
		</v-layout>
		<div v-for="(list, index) in $store.state.dashBoardList" :key="index">
			<!-- index === 0 ? 'active' : -->
			<v-layout
				:class="'listNav'"
				justify-center
				align-center
				:style="routeName === list.name ? `background-color:#3e7ccc; border-radius:1vh; color:white` : `border-radius:1vh;`"
				@click.stop="listClick(list)"
			>
				<v-flex style="text-align:center;">
					<div>{{ list.title }}</div>
				</v-flex>
			</v-layout>
		</div>
		{{ $route.name }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			routeName: '',
		}
	},

	async created() {
		this.$store.state.loading = true
		this.routeName = this.$route.name
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
					this.$store.state.loading = false
					this.$store.state.meData = res.me
					this.$store.state.dashBoardList = [
						{
							title: '사업지 관리',
							name: 'dashBoard',
							click: true,
						},
						{
							title: '현황판',
							name: 'statusBoard',
							click: true,
						},
						{
							title: '물건 배정',
							name: 'productManagement',
							click: false,
						},

						{
							title: '조직 관리',
							name: 'organizationManagement',
							click: false,
						},
						{
							title: '근태 관리',
							name: 'attendanceManagement',
							click: false,
						},
						{
							title: '정산 관리',
							name: 'settlementManagement',
							click: false,
						},
						// {
						// 	title: '알림톡 관리',
						// 	name: '',
						// 	click: false,
						// },
					]
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
					// sessionStorage.removeItem('reserveLite-t')
					this.$router.push('/').catch(() => {})
				})
		},
		listClick(list) {
			this.$store.state.drawer = false
			this.$store.state.productTab = 0
			this.routeName = list.name
			this.$router.push({ name: list.name }).catch(() => {})
			this.$store.state.dashBoardList.forEach(element => {
				element.click = false
			})
			list.click = true

			this.closeRight()
		},
	},
}
</script>

<style lang="scss" scoped>
.active {
	cursor: pointer;
	margin: 14px 14px 20px !important;
	background: #3e7ccc;
	color: white;
	width: 166px;
	height: 40px;
}
.active:hover {
	background-color: #3e7ccc;
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
	background-color: #3e7ccc;
	color: white;
	border-radius: 1vh;
	transition: 0.5s;
}
</style>

<style lang="scss">
// :root {
// 	--point1-color: rgb(222, 222, 222);
// 	--point2-color: #323153;
// 	--point3-color: #ffae28;
// 	--info-color: blue;
// }
.leftNav_wrap {
	width: 200px;
}
.logoLayout {
	padding-top: 22px;
	padding-bottom: 31px;
}
</style>
