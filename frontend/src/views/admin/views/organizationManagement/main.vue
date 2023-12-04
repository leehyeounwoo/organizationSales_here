<template>
	<div style="width:100%; margin:0 37px">
		<v-layout align-center class="header_title mt-5">
			<!--  타이틀  -->
			<v-flex xs8>
				<v-layout align-center>
					<div class="slash mr-1"></div>
					<span class="admin_title">
						조직관리
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
				<organizationStatus></organizationStatus>
			</v-tab-item>
			<v-tab-item style="padding-top:20px;">
				<agentManagement></agentManagement>
			</v-tab-item>
			<v-tab-item style="padding-top:20px;">
				<vacationStatus></vacationStatus>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import agentManagement from './agentManagement'
import organizationStatus from './organizationStatus'
import vacationStatus from './vacationStatus'

export default {
	components: {
		organizationStatus,
		agentManagement,
		vacationStatus,
	},

	data() {
		return {
			tab: 0,
			tabs: ['상담사 관리', '조직 현황', '휴가현황'],
		}
	},
}
</script>

<style></style>
