<template>
	<div>
		<div v-if="$store.state.headerMobileStatus" style="position:fixed; width:100%; ">
			<counselorHeader :logout="session" />
		</div>
		<div
			class="board_layout"
			style="margin-top: 60px; margin-bottom: 60px; overflow-y:auto; background-color:#F3F3F3; margin-left: auto; margin-right: auto; overflow-x: hidden;"
			:style="'height:' + calc_height() + 'px;'"
		>
			<router-view></router-view>
		</div>
		<div v-if="$store.state.headerMobileStatus" style="position:fixed; width:100%; bottom:0">
			<counselorFooter v-if="$store.state.footerMobileStatus" />
		</div>
	</div>
</template>

<script>
import { counselorHeader, counselorFooter } from '@/components'
export default {
	components: {
		counselorHeader,
		counselorFooter,
	},
	data() {
		return {
			session: sessionStorage.getItem('reserveLite-t'),
			mobileHeight: 0,
		}
	},
	async created() {
		this.mobileHeight = window.innerHeight || document.body.clientHeight
		if (window.location.pathname.includes('counselor')) {
			this.$store.state.mobileStatus = true
		} else {
			this.$store.state.mobileStatus = false
		}
	},
	methods: {
		calc_height() {
			if (this.$store.state.headerMobileStatus && this.$store.state.footerMobileStatus) {
				return this.mobileHeight - 120
			} else if (this.$store.state.headerMobileStatus || this.$store.state.footerMobileStatus) {
				return this.mobileHeight - 60
			} else {
				return this.mobileHeight
			}
		},
		closeRight() {
			this.$store.state.bellStatus = false
			this.$store.state.chatStatus = false
		},
	},
}
</script>

<style lang="scss" scoped>
.dashboardNoScroll {
	background-color: white;
	overflow-y: auto;
	overflow-x: hidden;
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
	height: 100vh;
	.mainboard_lay {
		padding: 24px;
		background-color: white;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
}
.board_layout::-webkit-scrollbar {
	display: none;
}
</style>
