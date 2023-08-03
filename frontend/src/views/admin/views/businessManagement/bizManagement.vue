<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<txtField class="search_box_type" v-model="search_business" :txtField="search"></txtField>
			<v-btn class="ml-3 search_btn" color="#009dac" @click="search_biz"><v-icon>mdi-magnify</v-icon>조회</v-btn>
		</v-layout>
		<datatable :datatable="table" class="mt-5" :detailClick="product_detail"></datatable>
		<v-btn class="mt-3 new_biz" @click="createBiz()">신규생성</v-btn>
		<createBusiness :setdialog="createDialog" />
		<productDetail :setdialog="table_detail" />
	</div>
</template>

<script>
import { txtField, datatable } from '@/components/index.js'
import createBusiness from '../../viewItem/createBusiness.vue'
import productDetail from '../../viewItem/productDetail.vue'

export default {
	created() {
		this.$store.state.loading = true
		this.first_business()
	},
	components: {
		txtField,
		datatable,
		createBusiness,
		productDetail,
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
			table_detail: {
				dialog: false,
				item: [],
			},
			search_business: '',
			search: {
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			table: {
				headers: [
					{ text: '사업지명', value: 'name' },
					{ text: '대표번호', value: 'phoneNumber' },
					{ text: '생성일', value: 'created_at' },
					{ text: '근무시간', value: 'workTime' },
					{ text: '담당자', value: 'business_manager' },
					{ text: '연락처', value: 'managerPhoneNumber' },
					{ text: '출퇴근 스캔 URL', value: 'workCheckURL' },
					{ text: '등록상품', value: '' },
					{ text: '비고', value: 'etc_detail' },
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
		first_business() {
			this.$store.dispatch('businesses').then(res => {
				res.businesses.forEach(el => {
					el['startTime'] = el.workingHoursStart.slice(0, 5)
					el['endTime'] = el.workingHoursEnd.slice(0, 5)
				})
				this.table.items = res.businesses
				console.log(this.table.items)
				this.$store.state.loading = false
			})
		},
		createBiz() {
			this.createDialog.dialog = true
		},
		product_detail(item) {
			this.table_detail.item = item
			this.table_detail.dialog = true
		},
		search_biz() {
			this.$store.state.loading = true
			let variable = {
				name: this.search_business,
			}
			this.$store.dispatch('businesses', variable).then(res => {
				this.table.items = res.businesses
				this.$store.state.loading = false
			})
		},
	},
}
</script>

<style lang="scss"></style>
