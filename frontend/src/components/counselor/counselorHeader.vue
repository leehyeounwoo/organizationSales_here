<template>
	<div style="width:100%; margin: 0 auto;" class="counselor_header">
		<v-layout align-center style="height:100%;">
			<div>
				<v-img src="/image/counselor_logo_0.png"></v-img>
			</div>
			<v-spacer></v-spacer>
			<!-- <div class="mr-4" v-if="auth">
				<v-avatar size="32px" v-if="$store.state.meData.profile">
					<img :src="$store.state.backServer + $store.state.meData.profile.url" alt="John" />
				</v-avatar>
			</div>
			<div class="mr-4" v-if="auth">
				<div class="white--text">
					{{ $store.state.meData.name }}
				</div>
				<div class="white--text" v-if="$store.state.meData.team && auth">
					{{ $store.state.meData.team.title }}
				</div>
			</div> -->
			<div class="py-4" v-if="auth">
				<v-divider dark vertical style="height: 40px;"></v-divider>
			</div>
			<v-btn icon dark class="mx-1" @click="setting" v-if="auth">
				<v-icon>mdi-cog</v-icon>
			</v-btn>
			<div v-if="auth" icon dark @click="logoutClick()" style="cursor:pointer" class="ml-auto">
				<v-img src="@/assets/images/ico/ico_logout.png" width="20" style="transform: scaleX(-1);"></v-img>
			</div>
		</v-layout>
	</div>
</template>

<script>
export default {
	data() {
		return {
			auth: sessionStorage.getItem('reserveLite-t') ? true : false,
		}
	},
	watch: {
		$route() {
			if (sessionStorage.getItem('reserveLite-t')) this.auth = true
			else this.auth = false
		},
	},
	created() {
		this.$store.dispatch('businesses', { idArr: [this.$store.state.meData.businessID] }).then(res => {
			console.log(res)
			this.$store.state.businessName = res.businesses[0].name
		})
	},
	methods: {
		setting() {
			this.$router.push({ name: 'counselorMypage' })
		},
		logoutClick() {
			this.$store.dispatch('businesses', { idArr: [this.$store.state.meData.businessID] }).then(res => {
				sessionStorage.removeItem('reserveLite-t')
				this.$router.push({ name: 'mainPage', params: { code: res.businesses[0].code } })
			})
		},
		logo_click() {
			if (this.$store.state.meData.businessID) {
				if (
					this.$route.name !== 'counselorLogin' &&
					this.$route.name !== 'counselorRegister' &&
					this.$route.name !== 'counselorBizDashboard'
				) {
					this.$router.push({
						name: 'counselorBizDashboard',
						params: { id: this.$store.state.meData.businessID },
					})
				}
			}
		},
	},
}
</script>

<style lang="scss">
.whiteBack {
	background-color: white;
}
.samplePicker {
	background-color: white;
}
</style>
