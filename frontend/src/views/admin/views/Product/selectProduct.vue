<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter1" style="font-size:13px;"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter2" style="font-size:13px"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter3" style="font-size:13px"></selectBox>
			</v-flex>
			<v-btn class="ml-3 search_btn" color="#009dac">적용</v-btn>
		</v-layout>
		<v-layout justify-end>
			<v-btn elevation="0" class="mt-3" color="#f0f2f8" style="border:1px solid #cfdcdd; font-size:13px">상태 업데이트</v-btn>
		</v-layout>
		<datatable :datatable="productManager"></datatable>
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'

export default {
	async created() {
		await this.product_table()
	},
	components: {
		selectBox,
		datatable,
	},
	data() {
		return {
			productFilter1: {
				placeholder: '주택형 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productFilter2: {
				placeholder: '동 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productFilter3: {
				placeholder: '호 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productManager: {
				headers: [
					{ text: '주택형', value: 'housingType', width: '6%' },
					{ text: '동', value: 'dong', width: '5%' },
					{ text: '호수', value: 'ho', width: '5%' },
					{ text: '담당자', value: 'manager', width: '21%' },
					{ text: '배정', value: 'holdTime', width: '28%' },
					{ text: '상태', value: 'product_status', width: '35%' },
				],
				class: 'datatablehover3',
				items: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
				product_manager: {
					placeholder: '담당자 지정여부',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
				team: {
					placeholder: '팀',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
				user: {
					placeholder: '상담사',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
				select_holding: {
					placeholder: '시간 선택',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
				holdingTime1: {
					dialog: false,
					time: '',
				},
				holdingTime2: {
					dialog: false,
					time: '',
				},
				holdingTime3: {
					placeholder: '선택',
					value: '',
					items: ['30분', '60분', '90분'],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
			},
		}
	},
	methods: {
		product_table() {
			this.$store.dispatch('products').then(res => {
				this.productManager.items = res.products
			})
		},
	},
}
</script>

<style lang="scss"></style>
