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
		<v-btn class="my-3 new_biz" @click="createBiz()">신규생성</v-btn>
		<createBusiness v-if="createDialog.dialog" :setdialog="createDialog" :getTable="rowperpageChange" :right_data="right_data" />
		<!-- <createBusiness :setdialog="createDialog" :getTable="rowperpageChange" :right_data="right_data" /> -->
		<productDetail :setdialog="table_detail" :newProduct="product_detail" />
	</div>
</template>

<script>
import { txtField, datatable, selectBoxText } from '@/components/index.js'
import createBusiness from '../../viewItem/createBusiness.vue'
import productDetail from '../../viewItem/productDetail.vue'

export default {
	created() {
		this.$store.state.loading = true
		this.rowperpageChange()
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
				id: '',
				manager: '',
				items: [
					// 0
					{
						title: '사업지 명',
						must: true,
						type: 'txtfieldCheck',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
							placeholder: '사업지명을 입력해주세요.',
							readonly: false,
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
						must: true,
						type: 'time',
						worktime1: {
							dialog: false,
							time: '',
						},
						worktime2: {
							dialog: false,
							time: '',
						},
					},
					// 3
					{
						title: '홀딩시간 설정',
						must: true,
						type: 'selectBox',
						value: '',
						selectBox: {
							value: '',
							items: [
								{ text: '30분', value: '30' },
								{ text: '60분', value: '60' },
							],
							hideDetail: true,
							outlined: true,
							class: 'small_font bizInput',
						},
						selectBox2: {
							value: '',
							items: [],
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
							readonly: true,
							placeholder: '※ URL은 자동으로 생성됩니다.',
						},
					},
					// 5
					{
						title: '상품 등록',
						must: false,
						type: 'product',
						value: '',
						viewStatus: true,
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							placeholder: '※ 참여가능 그룹 업로드',
							readonly: true,
						},
					},
					// 6
					{
						title: '사업지 위치',
						must: false,
						type: 'location',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							readonly: true,
							placeholder: '위도, 경도',
						},
					},
				],
			},
			editDialog: {
				dialog: false,
				type: 'create',
				id: '',
				manager: '',
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
							time: '',
						},
						worktime2: {
							dialog: false,
							time: '',
						},
					},
					// 3
					{
						title: '홀딩시간 설정',
						must: false,
						type: 'selectBox',
						value: '',
						selectBox: {
							value: '',
							items: [
								{ text: '30분', value: '30' },
								{ text: '60분', value: '60' },
							],
							hideDetail: true,
							outlined: true,
							class: 'small_font bizInput',
						},
						selectBox2: {
							value: '',
							items: [],
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
							readonly: true,
						},
					},
					// 5
					{
						title: '사업지 위치',
						must: false,
						type: 'location',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							readonly: true,
							placeholder: '위도, 경도',
						},
					},
				],
			},
			right_data: [],
			table_detail: {
				dialog: false,
				item: [],
				contract: '',
				noContract: '',
				lease: '',
				vacancy: '',
				toBeRented: '',
				existing: '',
				selectBox1: {
					placeholder: '주택형',
					value: '',
					items: [{ text: '선택', value: 'new' }],
					hideDetail: true,
					outlined: true,
					class: 'small_font searchSel',
				},
				select_text1: {
					value: '',
					maxlength: '255',
					outlined: true,
					backCol: 'white',
				},
				selectBox2: {
					placeholder: '동',
					value: '',
					items: [{ text: '선택', value: 'new' }],
					hideDetail: true,
					outlined: true,
					class: 'small_font searchSel',
				},
				select_text2: {
					value: '',
					maxlength: '255',
					outlined: true,
					backCol: 'white',
				},
				select_text3: {
					value: '',
					maxlength: '255',
					outlined: true,
					backCol: 'white',
				},
				selectBox3: {
					placeholder: '상태',
					value: '',
					items: ['계약', '미계약'],
					hideDetail: true,
					outlined: true,
					class: 'small_font searchSel',
				},
				selectBox4: {
					placeholder: '상태',
					value: '전체',
					items: ['전체', '계약', '가계약', '임대', '공실', '예정', '기존', '1차매각', '2차매각'],
					hideDetail: true,
					outlined: true,
					class: 'small_font searchSel',
				},

				selectBox5: {
					placeholder: '주택형',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'small_font searchSel',
				},
				selectBox6: {
					placeholder: '동',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'small_font searchSel',
				},
				productTable: {
					headers: [
						{ text: 'No.', value: 'product_number', width: '5%' },
						{ text: '주택형', value: 'housingType' },
						{ text: '동', value: 'dong' },
						{ text: '호수', value: 'ho' },
						{ text: '상태', value: 'contractStatus' },
						{ text: '비고', value: 'product_etc' },
					],
					class: 'datatablehover3',
					items: [],
					noweditting: '',
					itemsPerPage: 10,
					page: 1,
					pageCount: 0,
					showselect: true,
					selected: [],
				},
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
				items_origin: [],
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
		async rowperpageChange() {
			this.$store.state.loading = true
			this.table.itemsPerPage = this.rowperpageSel.value
			// console.log(this.$store.state.meData)
			await this.first_business()
		},
		async first_business() {
			await this.$store.dispatch('businesses', { idArr: [43] }).then(async res => {
				res.businesses.forEach(el => {
					if (el.workingHoursStart) {
						el['startTime'] = el.workingHoursStart.slice(0, 5)
					}
					if (el.workingHoursEnd) {
						el['endTime'] = el.workingHoursEnd.slice(0, 5)
					}
				})
				let data = {
					confirmed: true,
					role: 1,
				}
				await this.$store.dispatch('businessManager', data).then(res_user => {
					res.businesses.forEach(e => {
						let manager = res_user.users.filter(user => user.businessID === e.id)

						e['manager'] = manager.length > 0 ? manager : null
					})
				})
				res.businesses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
				this.table.items = res.businesses
				this.table.items_origin = JSON.parse(JSON.stringify(res.businesses))
				this.table.length = Math.ceil(this.table.items.length / this.rowperpageSel.value)

				this.$store.state.loading = false
			})
		},
		createBiz() {
			this.createDialog.type = 'create'
			this.createDialog.product = []
			this.right_data = []
			this.createDialog.dialog = true
		},
		async product_detail(item) {
			this.table_detail.item = item
			let data = {
				businessID: this.table_detail.item.id,
			}
			await this.$store.dispatch('products', data).then(res => {
				let data = [{ text: '선택', value: '' }]
				let data2 = [{ text: '전체', value: '' }]
				let data3 = [{ text: '전체', value: '' }]
				res.products.forEach(el => {
					data.push({ text: el.housingType, value: el.housingType })
					data2.push({ text: el.housingType, value: el.housingType })
					data3.push({ text: el.dong, value: el.dong })

					this.table_detail.selectBox1.items = data
					this.table_detail.selectBox5.items = data2
					this.table_detail.selectBox6.items = data3

					if (el.contractStatus === 'contract') {
						el.contractStatus = '계약'
					} else if (el.contractStatus === 'noContract') {
						el.contractStatus = '미계약'
					} else if (el.contractStatus === 'lease') {
						el.contractStatus = '임대'
					} else if (el.contractStatus === 'vacancy') {
						el.contractStatus = '공실'
					} else if (el.contractStatus === 'toBeRented') {
						el.contractStatus = '예정'
					} else if (el.contractStatus === 'existing') {
						el.contractStatus = '기존'
					} else if (el.contractStatus === 'firstContract') {
						el.contractStatus = '1차매각'
					} else if (el.contractStatus === 'secondContract') {
						el.contractStatus = '2차매각'
					} else if (!el.contractStatus) {
						el.contractStatus = '-'
					}
					el['product_number'] = res.products.indexOf(el) + 1
				})
				this.table_detail.productTable.items = res.products
				let table_top = this.table_detail.productTable.items.filter(x => x.contractStatus === '계약')
				this.table_detail.contract = table_top.length
				let table_top2 = this.table_detail.productTable.items.filter(x => x.contractStatus === '미계약')
				this.table_detail.noContract = table_top2.length
				let table_top3 = this.table_detail.productTable.items.filter(x => x.contractStatus === '임대')
				this.table_detail.lease = table_top3.length
				let table_top4 = this.table_detail.productTable.items.filter(x => x.contractStatus === '공실')
				this.table_detail.vacancy = table_top4.length
				let table_top5 = this.table_detail.productTable.items.filter(x => x.contractStatus === '예정')
				this.table_detail.toBeRented = table_top5.length
				let table_top6 = this.table_detail.productTable.items.filter(x => x.contractStatus === '기존')
				this.table_detail.existing = table_top6.length
				let table_top7 = this.table_detail.productTable.items.filter(x => x.contractStatus === '1차매각')
				this.table_detail.firstContract = table_top7.length
				let table_top8 = this.table_detail.productTable.items.filter(x => x.contractStatus === '2차매각')
				this.table_detail.secondContract = table_top8.length
			})
			this.table_detail.dialog = true
		},
		biz_detail(item) {
			this.createDialog.type = 'edit'
			this.createDialog.id = item.id
			this.createDialog.code = item.code
			this.createDialog.manager = item.manager ? item.manager.id : ''
			this.createDialog.items[0].value = item.name
			this.createDialog.items[1].value = item.phoneNumber
			this.createDialog.items[2].worktime1.time = item.startTime
			this.createDialog.items[2].worktime2.time = item.endTime
			this.createDialog.items[3].selectBox.value = item.splitHoldingTime
			this.createDialog.product = item.product
			if (item.splitHoldingTime === '30') {
				this.createDialog.items[3].selectBox2.items = [
					{ text: '60분', value: '60' },
					{ text: '90분', value: '90' },
					{ text: '120분', value: '120' },
				]
			} else {
				this.createDialog.items[3].selectBox2.items = [
					{ text: '60분', value: '60' },
					{ text: '90분', value: '90' },
				]
			}
			this.createDialog.items[3].selectBox2.value = item.maximumHoldingTime
			this.createDialog.items[4].value = location.protocol + '//' + location.host + '/QRenter/' + item.code
			this.right_data = []
			if (item.manager) {
				for (let i = 0; i < item.manager.length; i++) {
					this.right_data.push({
						detail: [],
						user_confirmed: true,
						txtfield1: {
							value: '',
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
						},
						txtfield2: {
							value: '',
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
						},
						txtfield3: {
							value: '',
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							placeholder: '이메일 형식',
						},
						txtfield4: {
							value: '',
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							type: 'password',
						},
					})
					this.right_data[i]['id'] = item.manager[i].id
					this.right_data[i].txtfield1.value = item.manager[i].name
					this.right_data[i].txtfield2.value = item.manager[i].phoneNumber
					this.right_data[i].txtfield3.value = item.manager[i].email
				}
			}
			this.createDialog.items[6].value = item.location
			this.createDialog.dialog = true
		},
		search_biz() {
			let item = this.table.items_origin
			item = item.filter(el => el.name.indexOf(this.search_business) !== -1)
			this.table.items = item
			this.table.length = Math.ceil(this.table.items.length / this.rowperpageSel.value)
		},
	},
}
</script>

<style lang="scss"></style>
