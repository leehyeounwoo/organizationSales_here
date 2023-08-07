<template>
	<v-app>
		<router-view></router-view>
		<v-dialog
			v-model="$store.state.loading"
			fullscreen
			overlay-color="transparent"
			transition="dialog-center-transition"
			content-class="mainloadingBar"
		>
			<!-- style="background-color: rgba(255, 255, 255, 0.5);" -->
			<v-container fluid fill-height>
				<v-layout justify-center align-center>
					<v-progress-circular indeterminate :size="100" :width="5" color="grey lighten-1"> </v-progress-circular>
				</v-layout>
			</v-container>
		</v-dialog>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			loading: false,
		}
	},
	watch: {
		// to, form
		$route() {
			if (window.location.pathname.includes('counselor')) {
				if (
					window.location.pathname.includes('clientManagement') ||
					window.location.pathname.includes('login') ||
					window.location.pathname.includes('register')
				) {
					this.$store.state.headerMobileStatus = true
					this.$store.state.footerMobileStatus = false
				} else {
					this.$store.state.headerMobileStatus = true
					this.$store.state.footerMobileStatus = true
				}
			} else {
				this.$store.state.headerMobileStatus = false
				this.$store.state.footerMobileStatus = false
			}
		},
	},
	created() {
		// 	this.$appbus.$on('loading::show', () => {
		// 		this.loading = true
		// 	})
		// 	this.$appbus.$on('loading::hide', () => {
		// 		this.loading = false
		// 	})
	},
}
</script>
<style lang="scss">
@import './public/css/grobal.scss';
</style>
