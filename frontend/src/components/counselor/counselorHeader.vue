<template>
	<div style="width:100%" class="counselor_header">
		<v-layout align-center style="height:100%">
			<div @click="logo_click()">
				<v-img src="/image/counselor_logo_0.png"></v-img>
			</div>
			<v-spacer></v-spacer>
			<div class="mr-1">
				<v-avatar size="32px">
					<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
				</v-avatar>
			</div>
			<div class="mr-2">
				<div class="white--text">
					{{ $store.state.meData.name }}
				</div>
				<div></div>
			</div>
			<div v-if="logout" icon dark @click="logoutClick()" style="cursor:pointer" class="ml-auto">
				<v-img src="@/assets/images/ico/ico_logout.png" width="20"></v-img>
			</div>
		</v-layout>
	</div>
</template>

<script>
export default {
	props: {
		logout: Boolean,
	},
	data() {
		return {}
	},
	methods: {
		logoutClick() {
			sessionStorage.removeItem('reserveLite-t')
			this.$router.push('/')
		},
		logo_click() {
			if (this.$store.state.meData.business && this.$store.state.meData.business.id) {
				if (
					this.$route.name !== 'counselorLogin' &&
					this.$route.name !== 'counselorRegister' &&
					this.$route.name !== 'counselorBizDashboard'
				) {
					this.$router.push({
						name: 'counselorBizDashboard',
						params: { id: this.$store.state.meData.business.id },
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
