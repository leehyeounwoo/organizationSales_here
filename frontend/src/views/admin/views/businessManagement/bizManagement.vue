<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<txtField class="search_box_type" v-model="search_business" :txtField="search"></txtField>
			<v-btn class="ml-3 search_btn" color="#009dac" @click="search_biz"><v-icon>mdi-magnify</v-icon>조회</v-btn>
		</v-layout>
		<v-layout justify-end>
			<v-flex xs1 class="mt-3">
				<selectBoxText :sel="rowperpageSel" class="searchSel" @change="rowperpageChange"></selectBoxText>
			</v-flex>
		</v-layout>
		<datatable :datatable="table" class="mt-5" :productDetailClick="product_detail" :detailClick="biz_detail"></datatable>
		<div class="text-center mt-4">
			<v-pagination v-model="table.page" :length="table.length" :total-visible="7" circle></v-pagination>
		</div>
		<v-btn class="mt-3 new_biz" @click="createBiz()">신규생성</v-btn>
		<createBusiness :setdialog="createDialog" :getTable="rowperpageChange" />
		<productDetail :setdialog="table_detail" />
	</div>
</template>

<script>
import { txtField, datatable, selectBoxText } from '@/components/index.js'
import createBusiness from '../../viewItem/createBusiness.vue'
import productDetail from '../../viewItem/productDetail.vue'

export default {
	async created() {
		this.$store.state.loading = true
		await this.rowperpageChange()
	},
	components: {
		txtField,
		datatable,
		createBusiness,
		productDetail,
		selectBoxText,
	},
	data() {
		return {
			rowperpageSel: {
				value: 10,
				errorMessage: '',
				hideDetail: true,
				items: [10, 20, 30],
				fullItem: [],
				outlined: true,
				label: '',
				returnObject: true,
				itemText: 'name',
				itemValue: 'id',
			},
			createDialog: {
				dialog: false,
				type: 'create',
				items: [
					// 0
					{
						title: '사업지 명',
						must: true,
						type: 'txtfield',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
							placeholder: '사업지명을 입력해주세요.',
						},
					},
					// 1
					{
						title: '대표번호',
						must: true,
						type: 'txtfield',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
							placeholder: '##-####-####, ###-####-####',
						},
					},
					// 2
					{
						title: '근무시간 설정',
						must: false,
						type: 'time',
						worktime1: {
							dialog: false,
							start: '',
						},
						worktime2: {
							dialog: false,
							start: '',
						},
					},
					// 3
					{
						title: '홀딩시간 설정',
						must: false,
						type: 'selectBox',
						value: '',
						selectBox: {
							value: '30분',
							items: ['30분', '60분'],
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
						must: false,
						type: 'scan',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							disable: true,
						},
					},
					// 5
					{
						title: '상품 등록',
						must: false,
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
					{ text: '담당자', value: 'businessManager' },
					{ text: '연락처', value: 'managerPhoneNumber' },
					{ text: '출퇴근 스캔 URL', value: 'workCheckURL' },
					{ text: '등록상품', value: 'select_product' },
					{ text: '비고', value: 'etc_detail' },
				],
				class: 'datatablehover3',
				items: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				length: 1,
				start: 0,
				limit: 10000,
				pageCount: 0,
				pagination: null,
				hidedefaultfooter: true,
			},
		}
	},
	methods: {
		rowperpageChange() {
			this.$store.state.loading = true
			console.log(this.rowperpageSel.value)
			this.table.itemsPerPage = this.rowperpageSel.value
			this.first_business()
		},
		first_business() {
			this.$store.dispatch('businesses').then(async res => {
				res.businesses.forEach(el => {
					if (el.workingHoursStart) {
						el['startTime'] = el.workingHoursStart.slice(0, 5)
					}
					if (el.workingHoursEnd) {
						el['endTime'] = el.workingHoursEnd.slice(0, 5)
					}
				})
				await this.$store.dispatch('businessManager').then(res_user => {
					res.businesses.forEach(e => {
						let manager = res_user.users.filter(user => e.id === user.businessID)
						e['manager'] = manager.length > 0 ? manager[0] : null
					})
				})
				this.table.items = res.businesses
				console.log(this.table.items)
				this.table.length = Math.ceil(this.table.items.length / this.rowperpageSel.value)
				this.$store.state.loading = false
			})
		},
		createBiz() {
			this.createDialog.type = 'create'
			this.createDialog.dialog = true
		},
		product_detail(item) {
			this.table_detail.item = item
			this.table_detail.dialog = true
			console.log(item)
		},
		biz_detail(item) {
			console.log(item)
			this.createDialog.type = 'edit'
			this.createDialog.items[0].value = item.name
			this.createDialog.items[1].value = item.phoneNumber
			this.createDialog.items[4].value = item.code
			console.log(this.createDialog)
			this.createDialog.dialog = true
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
