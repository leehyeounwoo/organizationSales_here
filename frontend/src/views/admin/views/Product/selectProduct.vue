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
		<datatable :datatable="productManager"></datatable>
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'

export default {
	async created() {
		this.$store.state.loading = true
		await this.medata()
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
					{ text: '주택형', value: '', width: '6%' },
					{ text: '동', value: '', width: '5%' },
					{ text: '호수', value: '', width: '5%' },
					{ text: '담당자', value: '', width: '19%' },
					{ text: '배정', value: '', width: '30%' },
					{ text: '상태', value: '', width: '35%' },
				],
				class: 'datatablehover3',
				items: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
			},
		}
	},
	methods: {
		medata() {
			this.$store.dispatch('me').then(res => {
				console.log(res)
			})
		},
		product_table() {
			this.$store.dispatch('product').then(res => {
				console.log(res)
				this.$store.state.loading = false
			})
		},
	},
}
</script>

<style lang="scss"></style>
