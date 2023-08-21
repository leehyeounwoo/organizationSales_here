<template>
	<div style="width:100%" class="counselor_footer">
		<v-layout align-center style="height:100%">
			<div v-for="(footer, index) in footers" :key="index" class="footer_item" @click="goTo(footer)">
				<v-img class="mx-auto" :src="`${require(`@/assets/images/ico/${footer.ico}.png`)}`" width="25" height="25"></v-img>
				<span class="footer_name">{{ footer.title }}</span>
			</div>
		</v-layout>
	</div>
</template>

<script>
export default {
	data() {
		return {
			footers: [
				{
					title: '공지사항',
					ico: 'footer_공지사항',
					route: 'counselorNotice',
				},
				{
					title: '근태관리',
					ico: 'footer_출퇴근관리',
					route: 'counselorManage',
				},
				{
					title: 'Home',
					ico: 'footer_Ȩ',
					route: 'counselorDashboard',
				},
				{
					title: '계약관리',
					ico: 'footer_고객관리',
					route: 'settlements',
				},
				{
					title: '정산관리',
					ico: 'footer_상담관리',
					route: 'settlementTruns',
				},
			],
		}
	},
	methods: {
		goTo(item) {
			if (item.route === this.$route.name) {
				return
			}
			if (item.title === '상담관리') {
				this.$router.push({
					name: item.route,
					params: { id: this.$store.state.meData.businessID },
					query: { tab: '1' },
				})
			} else if (item.title === '고객관리') {
				this.$router.push({ name: item.route, query: { tab: '1' } })
			} else if (item.title === 'Home') {
				this.$router.push({
					name: 'counselorBizDashboard',
					params: { id: this.$store.state.meData.businessID },
				})
			} else if (item.title === '공지사항') {
				this.$router.push({
					name: 'counselorNotice',
					params: { id: this.$store.state.meData.businessID },
				})
			} else {
				this.$router.push({ name: item.route })
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
