<template>
	<v-layout class="px-10">
		<v-flex xs12 class="pt-12">
			<v-layout align-center>
				<div class="slash mr-1"></div>
				<span style="font-weight:bold">사업지 관리</span>
			</v-layout>
			<v-tabs v-model="tab" :color="'#0ca2b0'" class="pt-8 reservationTab">
				<v-tab v-for="(tab, i) in tabs" :ripple="false" :key="i"> {{ tab }}</v-tab>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<bizManagement />
				</v-tab-item>
				<v-tab-item>
					<noticeManagement />
				</v-tab-item>
			</v-tabs-items>
		</v-flex>
	</v-layout>
</template>

<script>
import bizManagement from './businessManagement/bizManagement.vue'
import noticeManagement from './businessManagement/noticeManagement.vue'

export default {
	components: {
		bizManagement,
		noticeManagement,
	},
	data() {
		return {
			tab: 0,
			tabs: ['사업지 관리', '공지사항 관리'],
		}
	},
}
</script>

<style></style>
