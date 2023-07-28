<template>
	<v-layout class="px-10">
		<v-flex xs12 class="pt-12">
			<v-layout align-center>
				<div class="slash mr-1"></div>
				<span style="font-weight:bold">물건 배정</span>
			</v-layout>
			<v-tabs v-model="tab" :color="'#0ca2b0'" class="pt-8 reservationTab">
				<v-tab v-for="(tab, i) in tabs" :ripple="false" :key="i"> {{ tab }}</v-tab>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<selectProduct />
				</v-tab-item>
				<v-tab-item>
					<productConfirm />
				</v-tab-item>
			</v-tabs-items>
		</v-flex>
	</v-layout>
</template>

<script>
import selectProduct from './selectProduct.vue'
import productConfirm from './productConfirm.vue'

export default {
	components: {
		selectProduct,
		productConfirm,
	},
	data() {
		return {
			tab: 0,
			tabs: ['물건 배정', '배정 요청 처리'],
		}
	},
}
</script>

<style></style>
