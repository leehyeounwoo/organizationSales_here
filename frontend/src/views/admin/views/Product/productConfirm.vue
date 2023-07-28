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
	</div>
</template>

<script>
import { selectBox } from '@/components/index.js'

export default {
	components: {
		selectBox,
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
		}
	},
}
</script>

<style lang="scss"></style>
