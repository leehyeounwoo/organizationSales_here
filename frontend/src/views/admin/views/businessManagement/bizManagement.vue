<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<txtField class="search_box_type" v-model="search_business" :txtField="search"></txtField>
			<v-btn class="ml-3 search_btn" color="#009dac"><v-icon>mdi-magnify</v-icon>조회</v-btn>
		</v-layout>
		<v-data-table class="mt-5 business_table" :headers="table.headers"></v-data-table>
		<v-btn class="mt-3 new_biz">신규생성</v-btn>
	</div>
</template>

<script>
import { txtField } from '@/components/index.js'

export default {
	components: {
		txtField,
	},
	data() {
		return {
			search_business: '',
			search: {
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			table: {
				headers: [
					{ text: '사업지명', value: '' },
					{ text: '대표번호', value: '' },
					{ text: '생성일', value: '' },
					{ text: '근무시간', value: '' },
					{ text: '담당자', value: '' },
					{ text: '연락처', value: '' },
					{ text: '출퇴근 스캔 URL', value: '' },
					{ text: '등록상품', value: '' },
					{ text: '비고', value: '' },
				],
			},
		}
	},
}
</script>

<style lang="scss">
.search_box_type {
	width: 193px;
	margin-left: 10px;
	div {
		div {
			.v-input__slot {
				min-height: 26px !important;
				height: 26px;
				padding: 0 10px !important;
			}
		}
	}
}
.new_biz {
	width: 100px !important;
	height: 26px !important;
	padding: 0 10px !important;
	font-weight: bold;
	color: white !important;
	background: #1428a0 !important;
	border-radius: 0 !important;
}
.business_table {
	.v-data-table__wrapper {
		border-top: 1px solid black;
	}
}
</style>
