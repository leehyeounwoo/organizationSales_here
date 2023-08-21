<template>
	<div class="login-counselor counselor_gray_background">
		<!-- 로그인 화면 로고 -->
		<div class="counselor_content_wrap sticky_wrap">
			<!-- 메인 헤더 -->
			<!-- 서브 헤더 -->
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="to_bizDashboard()">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						고객관리
					</span>
				</v-layout>
				<v-tabs color="primary2" background-color="white" v-model="tab" class="reservationTab">
					<v-tab xs6 v-for="(tab, i) in tabs" :key="i" :ripple="false" style="width:100%; max-width: none; min-width:none;">
						{{ tab }}</v-tab
					>
				</v-tabs>
			</div>
			<div style="width:100%; ">
				<div class="mt-1" style="width:100%">
					<v-tabs-items id="management-tab" v-model="tab" style="background-color:#F3F3F3;">
						<v-tab-item style="padding:20px 8px 0px 8px; width:100vw;">
							<client />
						</v-tab-item>
						<v-tab-item style="padding:0px 8px 0px 8px; width:100vw;">
							<clientList />
						</v-tab-item>
					</v-tabs-items>
				</div>
			</div>
			<!-- <counselorFooter v-if="tab === 1" class="bottom_fix" /> -->
		</div>
	</div>
</template>

<script>
import client from './client.vue'
import clientList from './clientList.vue'
// import { counselorFooter } from '@/components'
export default {
	components: {
		client,
		clientList,
		// counselorFooter,
	},
	created() {
		if (this.$route.query && this.$route.query.tab) {
			this.tab = 1
		}

		if (this.tab === 0) {
			this.$store.state.headerMobileStatus = true
			this.$store.state.footerMobileStatus = false
		} else {
			this.$store.state.headerMobileStatus = true
			this.$store.state.footerMobileStatus = true
		}
	},
	watch: {
		tab() {
			if (this.tab === 0) {
				this.$store.state.footerMobileStatus = false
			} else {
				this.$store.state.footerMobileStatus = true
			}
		},
	},

	mounted() {},
	methods: {
		to_bizDashboard() {
			this.$router.push({
				name: 'counselorBizDashboard',
				params: { id: this.$store.state.meData.businessID },
			})
		},
	},
	data() {
		return {
			tab: 0, // tab
			tabs: ['고객등록하기', '등록고객관리'],
		}
	},
}
</script>
<style lang="scss" scoped>
.main_title {
	font-size: 20px;
}
.router_title {
	font-size: 12px;
	font-weight: 100;
}
.search_box {
	width: 800px;
}
.search_title {
	width: 100px;
	font-size: 12px;
}
.search_body {
	display: flex;
	align-items: center;
	width: 600px;
}
.search_body2 {
	display: flex;
	align-items: center;
}
.search_btn {
	border-bottom: 1px solid #eaeaea;
}
.btn-style {
	box-shadow: none;
	background-color: #ffffff;
	border: 1px solid #9a9c9b;
	border-radius: 5px;
}
.back-icon {
	position: absolute;
	left: 0;
	top: 0;
}
</style>
