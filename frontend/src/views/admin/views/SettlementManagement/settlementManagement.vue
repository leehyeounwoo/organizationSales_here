<template>
	<div style="width:100%; margin:0 37px">
		<v-layout align-center class="header_title mt-5">
			<!--  타이틀  -->
			<v-flex xs8>
				<v-layout align-center>
					<div class="slash mr-1"></div>
					<span class="admin_title">
						정산관리
					</span>
				</v-layout>
			</v-flex>
		</v-layout>
		<v-spacer></v-spacer>
		<v-tabs :color="'#0ca2b0'" background-color="#F4F8FD" v-model="tab" class="reservationTab mt-5" slider-size="1">
			<v-tab v-for="(tab, i) in tabs" :key="i" :ripple="false"> {{ tab }}</v-tab>
		</v-tabs>
		<v-tabs-items id="management-tab" v-model="tab" style="">
			<v-tab-item style="padding-top:20px;">
				<settlementRequest v-if="tab === 0"></settlementRequest>
			</v-tab-item>
			<v-tab-item style="padding-top:20px;">
				<settlementProcessing v-if="tab === 1"></settlementProcessing>
			</v-tab-item>
			<v-tab-item style="padding-top:20px;">
				<settlementInfo v-if="tab === 2"></settlementInfo>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import settlementRequest from './SettlementRequest/settlementRequest.vue'
import settlementProcessing from './SettlementProcess/settlementProcess.vue'
import settlementInfo from './SettlementInfo/settlementInfo.vue'

export default {
	components: {
		settlementRequest,
		settlementProcessing,
		settlementInfo,
	},

	data() {
		return {
			tab: 0,
			tabs: ['정산금 지급 요청 처리', '정산금 지급 처리', '정산금 지급 안내'],
		}
	},
}
</script>

<style></style>
