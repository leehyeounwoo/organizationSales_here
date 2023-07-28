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
		<datatable :datatable="productTable" class="mt-5"></datatable>
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'

export default {
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
			productTable: {
				headers: [
					{ text: '요청 상담사', value: '', width: '12%' },
					{ text: '홀딩 요청 상품', value: '', width: '15%' },
					{ text: '홀딩요청시간', value: '', width: '13%' },
					{ text: '배정 요청 처리', value: '', width: '25%' },
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
}
</script>

<style lang="scss"></style>
