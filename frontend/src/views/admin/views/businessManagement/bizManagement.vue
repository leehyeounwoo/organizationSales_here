<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<txtField class="search_box_type" v-model="search_business" :txtField="search"></txtField>
			<v-btn class="ml-3 search_btn" color="#009dac"><v-icon>mdi-magnify</v-icon>조회</v-btn>
		</v-layout>
		<datatable :datatable="table" class="mt-5"></datatable>
		<v-btn class="mt-3 new_biz" @click="createBiz()">신규생성</v-btn>
		<createBusiness :setdialog="createDialog" />
	</div>
</template>

<script>
import { txtField, datatable } from '@/components/index.js'
import createBusiness from '../../viewItem/createBusiness.vue'

export default {
	components: {
		txtField,
		datatable,
		createBusiness,
	},
	data() {
		return {
			createDialog: {
				dialog: false,
				items: [
					// 0
					{
						title: '사업지 명',
						type: 'txtfield',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
						},
					},
					// 1
					{
						title: '대표번호',
						type: 'txtfield',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
						},
					},
					// 2
					{
						title: '근무시간 설정',
						type: 'time',
						worktime: {
							start: '',
							end: '',
						},
					},
					// 3
					{
						title: '홀딩시간 설정',
						type: 'selectBox',
						value: '',
						selectBox: {
							value: '30분',
							items: ['10분', '30분', '60분'],
							hideDetail: true,
							outlined: true,
							class: 'small_font bizInput',
						},
						selectBox2: {
							value: '120분',
							items: ['60분', '90분', '120분'],
							hideDetail: true,
							outlined: true,
							class: 'small_font bizInput',
						},
					},
					// 4
					{
						title: '출퇴근 스캔 URL',
						type: 'scan',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
						},
					},
					// 5
					{
						title: '상품 등록',
						type: 'product',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							placeholder: '※ 참여가능 그룹 업로드',
							readonly: true,
						},
					},
				],
			},
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
		createBiz() {
			this.createDialog.dialog = true
		},
	},
}
</script>

<style lang="scss">
.new_biz {
	width: 100px !important;
	height: 26px !important;
	padding: 0 10px !important;
	font-weight: bold;
	color: white !important;
	background: #1428a0 !important;
	border-radius: 0 !important;
}
</style>
