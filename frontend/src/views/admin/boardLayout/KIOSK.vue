<template>
	<div style="overflow:hidden" :class="$vuetify.breakpoint.xs ? 'mobile_dashboard_lay' : 'dashboard_lay'">
		<v-layout>
			<v-flex
				@click="closeRight()"
				v-if="$vuetify.breakpoint.lgAndUp"
				lg2
				style="background:#323153; color:#323153; fontWeight:bold; max-width:200px;"
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
			await this.$store
				.dispatch('me')
				.then(async res => {
					this.$store.state.meData = res.me
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
