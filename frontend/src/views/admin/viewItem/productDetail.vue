<template>
	<v-dialog persistent v-model="setdialog.dialog" width="90%">
		<div class="create_wrap">
			<div class="project_title px-5" style="position:sticky; top:0">
				<span style="font-size:15px">상품 관리</span>
				<v-spacer />
				<v-icon @click="resetSelect" class="title-icon" color="white">mdi-close</v-icon>
			</div>
			<v-layout class="mt-8 mx-10" align-center>
				<div class="slash mr-1"></div>
				<span style="font-weight:bold">상품 리스트</span>
			</v-layout>
			<v-layout align-center class="mx-10 mt-2 header_search">
				<div class="d-flex align-center" style="font-weight:bold; font-size:13px">
					<div class="pl-3" style="width:65px">주택형</div>
					<selectBox
						class="d-flex align-center"
						:sel="setdialog.selectBox1"
						style="max-width:90px; font-weight:normal"
						@change="selectType"
					></selectBox>
					<txtField
						class="search_box_type"
						v-model="setdialog.select_text1.value"
						:txtField="setdialog.select_text1"
						style="width:80px !important"
					></txtField>
				</div>
				<div class="d-flex align-center ml-5" style="font-weight:bold; font-size:13px">
					<div style="width:25px">동</div>
					<selectBox class="d-flex align-center" :sel="setdialog.selectBox2" style="max-width:90px; font-weight:normal"></selectBox>
					<txtField
						class="search_box_type"
						v-model="setdialog.select_text2.value"
						:txtField="setdialog.select_text2"
						style="width:80px !important"
					></txtField>
				</div>
				<div class="d-flex align-center ml-5" style="font-weight:bold; font-size:13px">
					<div style="width:30px">호수</div>
					<txtField
						class="search_box_type"
						v-model="setdialog.select_text3.value"
						:txtField="setdialog.select_text3"
						style="width:80px !important"
					></txtField>
					<selectBox class="d-flex align-center ml-4" :sel="setdialog.selectBox3" style="max-width:85px; font-weight:normal"></selectBox>
				</div>
				<v-btn elevation="0" class="ml-3 search_btn" color="#ffae28" style="width:80px !important" @click="checkProduct">신규등록</v-btn>
				<v-spacer></v-spacer>
				<selectBox :sel="setdialog.selectBox4" style="max-width:85px; font-weight:normal"></selectBox>
				<selectBox class="mx-2" :sel="setdialog.selectBox5" style="max-width:80px; font-weight:normal" @change="selectType"></selectBox>
				<selectBox :sel="setdialog.selectBox6" style="max-width:80px; font-weight:normal"></selectBox>
				<txtField
					class="search_box_type"
					v-model="search_product"
					:txtField="search"
					style="width:80px !important"
					@enter="searchProduct"
				></txtField>
				<v-btn elevation="0" class="ml-3 search_btn" color="#009dac" @click="searchProduct"><v-icon>mdi-magnify</v-icon>조회</v-btn>
			</v-layout>
			<v-layout align-center class="mx-10 mt-2">
				<v-flex xs8>
					<v-layout justify-end class="table_info mr-7">
						<div class="ml-3">전체 상품 : {{ setdialog.productTable.items.length }} 건,</div>
						<div class="ml-3">임대 : {{ setdialog.lease }} 건</div>
						<div class="ml-3">공실 : {{ setdialog.vacancy }} 건</div>
						<div class="ml-3">예정 : {{ setdialog.toBeRented }} 건</div>
						<div class="ml-3">기존 : {{ setdialog.existing }} 건</div>
						<div class="ml-3">계약 : {{ setdialog.contract }} 건,</div>
						<div class="ml-3">가계약 : {{ setdialog.noContract }} 건</div>
						<div class="ml-3">1차매각 : {{ setdialog.firstContract }} 건</div>
						<div class="ml-3">2차매각 : {{ setdialog.secondContract }} 건</div>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout class="mx-10">
				<v-flex xs8>
					<datatable :datatable="setdialog.productTable" class="product_detail_table" :editProduct="editProduct"></datatable>
					<v-layout>
						<v-btn class="mt-2 mb-6 save_biz" style="background:#434a5d !important" @click="deleteCheck">선택항목 삭제</v-btn>
					</v-layout>
				</v-flex>
				<v-flex xs4 class="ml-7" style="margin-top:5px">
					<v-layout align-center v-for="(right, idx) in right_table1" :key="idx" class="right_table1">
						<v-flex xs3 class="table1_left">{{ right.title }}</v-flex>
						<v-flex xs9 v-if="right.type === 'txtfield'">
							<txtField class="search_box_type" v-model="right.txtfield.value" :txtField="right.txtfield"></txtField>
						</v-flex>
						<v-flex xs9 v-else-if="right.type === 'select'">
							<selectBox class="search_box_type" style="margin-left:10px" :sel="right.select"></selectBox>
						</v-flex>
						<v-flex class="d-flex align-center" xs9 v-else-if="right.type === 'radio'" style="height:50px;">
							<v-radio-group v-model="right.value" row class="system-radio-label" style="margin-left:10px">
								<v-layout wrap>
									<v-radio color="#009dac" label="임대" value="lease" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="공실" value="vacancy" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="예정" value="toBeRented" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="기존" value="existing" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="계약" value="contract" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="가계약" value="noContract" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="1차매각" value="firstContract" style="width:22%;"></v-radio>
									<v-radio color="#009dac" label="2차매각" value="secondContract" style="width:22%;"></v-radio>
								</v-layout>
							</v-radio-group>
						</v-flex>
					</v-layout>
					<v-layout justify-end style="color:black">
						<v-btn elevation="0" class="refresh_btn mt-2" color="#f0f2f8" @click="editReset"><v-icon small>mdi-refresh</v-icon></v-btn>
						<v-btn elevation="0" class="right1_btn mt-2" color="#f0f2f8" @click="editCheck">변경 내용 저장</v-btn>
					</v-layout>
					<v-layout class="my-3" style="border: 1px solid #d7d8e9;">
						<v-flex xs3 class="right_table2" style="background:#f0f2f8; height:250px; border-bottom:0">변경이력</v-flex>
						<v-flex xs9 style="height:250px; overflow:auto">
							<v-layout style="background:#f0f2f8; height:50px">
								<v-flex class="right_table2" xs6>변경내용</v-flex>
								<v-flex class="right_table2" style="border-right:0" xs6>변경일시</v-flex>
							</v-layout>
							<v-layout v-for="(edit, idx) in productEdit" :key="idx" style="height:50px">
								<v-flex class="right_table2" style="font-weight:normal" xs6>{{ edit.editTitle }}</v-flex>
								<v-flex class="right_table2" style="border-right:0; font-weight:normal" xs6>{{ edit.editTime }}</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
					<v-layout justify-end>
						<v-btn class="mt-2 mb-6 save_biz" @click="resetSelect"><v-icon>mdi-check</v-icon>확인</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
		<sweetAlert :dialog="sweetDialog" @click="createProduct" />
		<sweetAlert :dialog="sweetDialog2" @click="deleteProduct" />
		<sweetAlert :dialog="sweetDialog3" @click="editSave" />
		<sweetAlert :dialog="sweetInfo" />
	</v-dialog>
</template>

<script>
import { txtField, selectBox, datatable, sweetAlert } from '@/components/index.js'

export default {
	async created() {
		await this.first_productTable()
	},
	components: {
		txtField,
		selectBox,
		datatable,
		sweetAlert,
	},
	props: {
		setdialog: Object,
		newProduct: Function,
	},
	data() {
		return {
			productDetail: [],
			productEdit: [],
			sweetDialog: {
				open: false,
				title: '상품 등록',
				content: `상품을 등록합니다.`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			sweetDialog2: {
				open: false,
				title: '상품 삭제',
				content: `상품을 삭제하시겠습니까?`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '확인',
				modalIcon: 'warning',
			},
			sweetDialog3: {
				open: false,
				title: '상품 편집',
				content: `변경내용을 저장합니다.`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'info',
			},
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			search: {
				value: '',
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			search_product: '',
			right_id: '',
			right_table1: [
				// 0
				{
					title: '호수',
					type: 'txtfield',
					txtfield: {
						value: '',
						maxlength: '255',
						outlined: true,
						backCol: 'white',
					},
				},
				// 1
				{
					title: '동',
					type: 'select',
					select: {
						value: '',
						items: [],
						hideDetail: true,
						outlined: true,
						class: 'small_font searchSel',
					},
				},
				// 2
				{
					title: '주택형',
					type: 'select',
					select: {
						value: '',
						items: [],
						hideDetail: true,
						outlined: true,
						class: 'small_font searchSel',
					},
				},
				// 3
				{
					title: '상태',
					type: 'radio',
					value: '',
				},
				// 4
				{
					title: '변경사유',
					type: 'txtfield',
					txtfield: {
						value: '',
						maxlength: '255',
						outlined: true,
						backCol: 'white',
					},
				},
			],
		}
	},
	methods: {
		editReset() {
			this.right_table1[0].txtfield.value = ''
			this.right_table1[1].select.value = ''
			this.right_table1[2].select.value = ''
			this.right_table1[4].txtfield.value = ''
		},
		editCheck() {
			if (this.right_table1[0].txtfield.value === '') {
				this.sweetInfo.title = '변경 상품'
				this.sweetInfo.content = '변경할 상품을 선택해주세요'
				return (this.sweetInfo.open = true)
			}
			if (this.right_table1[1].select.value === '') {
				this.sweetInfo.title = '변경 내용'
				this.sweetInfo.content = '변경할 상품을 선택해주세요'
				return (this.sweetInfo.open = true)
			}
			if (this.right_table1[2].select.value === '') {
				this.sweetInfo.title = '변경 내용'
				this.sweetInfo.content = '변경할 상품을 선택해주세요'
				return (this.sweetInfo.open = true)
			}
			if (this.right_table1[3].value === '') {
				this.sweetInfo.title = '변경 내용'
				this.sweetInfo.content = '변경할 상품을 선택해주세요'
				return (this.sweetInfo.open = true)
			}
			this.sweetDialog3.open = true
		},
		editSave() {
			this.$store.state.loading = true

			let data = {
				id: this.right_id,
				housingType: this.right_table1[2].select.value,
				dong: this.right_table1[1].select.value,
				ho: this.right_table1[0].txtfield.value,
			}
			let log = []
			if (this.productEdit === null) {
				data['editLog'] = [{ editTitle: this.right_table1[4].txtfield.value, editTime: this.$moment().format('YYYY-MM-DD HH:mm') }]
			} else {
				log = JSON.parse(JSON.stringify(this.productEdit))
				log.push({
					editTitle: this.right_table1[4].txtfield.value,
					editTime: this.$moment().format('YYYY-MM-DD HH:mm'),
				})
				data.editLog = log
			}
			if (this.right_table1[3].value) {
				data['contractStatus'] = this.right_table1[3].value
			}
			//  else {
			// 				data['contractStatus'] = 'noContract'
			// 			}
			this.$store.dispatch('updateProduct', data).then(res => {
				this.sweetDialog3.open = false
				this.newProduct(this.setdialog.item)
				this.productEdit = res.updateProduct.product.editLog
				this.$store.state.loading = false
			})
		},
		searchProduct() {
			let data = {
				businessID: this.setdialog.item.id,
			}
			if (this.setdialog.selectBox4.value !== '전체') {
				if (this.setdialog.selectBox4.value === '계약') {
					data['contractStatus'] = 'contract'
				} else if (this.setdialog.selectBox4.value === '가계약') {
					data['contractStatus'] = 'noContract'
				} else if (this.setdialog.selectBox4.value === '임대') {
					data['contractStatus'] = 'lease'
				} else if (this.setdialog.selectBox4.value === '공실') {
					data['contractStatus'] = 'vacancy'
				} else if (this.setdialog.selectBox4.value === '예정') {
					data['contractStatus'] = 'toBeRented'
				} else if (this.setdialog.selectBox4.value === '기존') {
					data['contractStatus'] = 'existing'
				} else if (this.setdialog.selectBox4.value === '1차매각') {
					data['contractStatus'] = 'firstContract'
				} else if (this.setdialog.selectBox4.value === '2차매각') {
					data['contractStatus'] = 'secondContract'
				}
			}
			if (this.setdialog.selectBox5.value !== '') {
				data['housingType'] = this.setdialog.selectBox5.value
			}
			if (this.setdialog.selectBox6.value !== '') {
				data['dong'] = this.setdialog.selectBox6.value
			}
			if (this.search_product !== '') {
				data.ho = this.search_product
			}
			this.$store.dispatch('products', data).then(res => {
				res.products.forEach(el => {
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
				this.setdialog.productTable.items = res.products
				let table_top = this.setdialog.productTable.items.filter(x => x.contractStatus === '계약')
				this.setdialog.contract = table_top.length
				let table_top2 = this.setdialog.productTable.items.filter(x => x.contractStatus === '미계약')
				this.setdialog.noContract = table_top2.length
				let table_top3 = this.setdialog.productTable.items.filter(x => x.contractStatus === '임대')
				this.setdialog.lease = table_top3.length
				let table_top4 = this.setdialog.productTable.items.filter(x => x.contractStatus === '공실')
				this.setdialog.vacancy = table_top4.length
				let table_top5 = this.setdialog.productTable.items.filter(x => x.contractStatus === '예정')
				this.setdialog.toBeRented = table_top5.length
				let table_top6 = this.setdialog.productTable.items.filter(x => x.contractStatus === '기존')
				this.setdialog.existing = table_top6.length
				let table_top7 = this.setdialog.productTable.items.filter(x => x.contractStatus === '1차매각')
				this.setdialog.firstContract = table_top7.length
				let table_top8 = this.setdialog.productTable.items.filter(x => x.contractStatus === '2차매각')
				this.setdialog.secondContract = table_top8.length
			})
		},
		deleteProduct() {
			this.$store.state.loading = true
			for (let i = 0; i < this.setdialog.productTable.selected.length; i++) {
				let data = {
					id: this.setdialog.productTable.selected[i].id,
				}
				this.$store.dispatch('deleteProduct', data).then(() => {
					this.sweetDialog2.open = false
					this.newProduct(this.setdialog.item)
					this.$store.state.loading = false
				})
			}
		},
		deleteCheck() {
			if (this.setdialog.productTable.selected.length === 0) {
				this.sweetInfo.title = '상품 선택'
				this.sweetInfo.content = '상품을 선택해주세요.'
				return (this.sweetInfo.open = true)
			}
			this.sweetDialog2.open = true
		},
		async editProduct(item) {
			this.$store.state.loading = true
			this.productDetail = item
			this.right_table1[4].txtfield.value = ''
			this.productEdit = item.editLog

			this.right_id = item.id
			let data = {
				businessID: item.businessID,
			}
			await this.$store.dispatch('products', data).then(res => {
				res.products.forEach(el => {
					this.right_table1[1].select.items.push({ text: el.dong, value: el.dong })
					this.right_table1[2].select.items.push({ text: el.housingType, value: el.housingType })
				})
				this.right_table1[0].txtfield.value = item.ho
				this.right_table1[1].select.value = item.dong
				this.right_table1[2].select.value = item.housingType
				if (item.contractStatus === '계약') {
					this.right_table1[3].value = 'contract'
				} else if (item.contractStatus === '미계약') {
					this.right_table1[3].value = 'noContract'
				} else if (item.contractStatus === '임대') {
					this.right_table1[3].value = 'lease'
				} else if (item.contractStatus === '공실') {
					this.right_table1[3].value = 'vacancy'
				} else if (item.contractStatus === '예정') {
					this.right_table1[3].value = 'toBeRented'
				} else if (item.contractStatus === '기존') {
					this.right_table1[3].value = 'existing'
				} else if (item.contractStatus === '1차매각') {
					this.right_table1[3].value = 'firstContract'
				} else if (item.contractStatus === '2차매각') {
					this.right_table1[3].value = 'secondContract'
				}
			})
			this.$store.state.loading = false
		},
		first_productTable() {
			if (this.setdialog.dialog) {
				let data = {
					businessID: this.setdialog.item.id,
				}
				this.$store.dispatch('products', data).then(() => {})
			}
		},
		resetSelect() {
			this.setdialog.dialog = false
			this.setdialog.selectBox1.value = ''
			this.setdialog.selectBox2.value = ''
			this.setdialog.selectBox3.value = ''
			this.setdialog.select_text1.value = ''
			this.setdialog.select_text2.value = ''
			this.setdialog.select_text3.value = ''
			this.setdialog.selectBox4.value = ''
			this.setdialog.selectBox5.value = ''
			this.setdialog.selectBox6.value = ''
			this.search_product = ''
			this.right_table1[0].txtfield.value = ''
			this.right_table1[1].select.value = ''
			this.right_table1[2].select.value = ''
		},
		selectType() {
			if (this.setdialog.selectBox1.value === 'new') {
				this.setdialog.selectBox2.items = [{ text: '선택', value: 'new' }]
			} else {
				let data = {
					housingType: this.setdialog.selectBox1.value,
				}
				this.$store.dispatch('products', data).then(res => {
					let item = [{ text: '선택', value: 'new' }]
					res.products.forEach(el => {
						item.push({ text: el.dong, value: el.dong })
					})

					this.setdialog.selectBox2.items = item
				})
			}
			let data = {}
			if (this.setdialog.selectBox5.value !== '') {
				data.housingType = this.setdialog.selectBox5.value
			}
			this.$store.dispatch('products', data).then(res => {
				let item = []
				res.products.forEach(el => {
					item.push({ text: el.dong, value: el.dong })
				})
				item.unshift({ text: '전체', value: '' })
				this.setdialog.selectBox6.items = item
			})
		},
		createProduct() {
			this.$store.state.loading = true

			let data = {
				businessID: this.setdialog.item.id,
				ho: this.setdialog.select_text3.value,
			}
			if (this.setdialog.selectBox1.value === 'new') {
				data['housingType'] = this.setdialog.select_text1.value
			} else {
				data['housingType'] = this.setdialog.selectBox1.value
			}
			if (this.setdialog.selectBox2.value === 'new') {
				data['dong'] = this.setdialog.select_text2.value
			} else {
				data['dong'] = this.setdialog.selectBox2.value
			}
			if (this.setdialog.selectBox3.value) {
				data['contractStatus'] = this.setdialog.selectBox3.value
			}
			// else {
			// 				data['contractStatus'] = 'noContract'
			// 			}
			this.$store.dispatch('createProduct', data).then(() => {
				this.sweetDialog.open = false
				this.newProduct(this.setdialog.item)
				this.$store.state.loading = false
			})
		},
		checkProduct() {
			if (!this.setdialog.selectBox1.value && !this.setdialog.select_text1.value) {
				this.sweetInfo.title = '주택형 선택'
				this.sweetInfo.content = '주택형을 선택 또는 직접 입력해주세요.'
				return (this.sweetInfo.open = true)
			}
			if (!this.setdialog.selectBox2.value && !this.setdialog.select_text2.value) {
				this.sweetInfo.title = '동 선택'
				this.sweetInfo.content = '동을 선택 또는 직접 입력해주세요.'
				return (this.sweetInfo.open = true)
			}
			if (this.setdialog.selectBox1.value !== 'new' && this.setdialog.select_text1.value) {
				this.sweetInfo.title = '주택형 선택'
				this.sweetInfo.content = '주택형을 선택 또는 직접 입력해주세요.'
				return (this.sweetInfo.open = true)
			} else if (this.setdialog.selectBox1.value == 'new' && !this.setdialog.select_text1.value) {
				this.sweetInfo.title = '주택형 선택'
				this.sweetInfo.content = '주택형을 선택 또는 직접 입력해주세요.'
				return (this.sweetInfo.open = true)
			}
			if (this.setdialog.selectBox2.value !== 'new' && this.setdialog.select_text2.value) {
				this.sweetInfo.title = '동 선택'
				this.sweetInfo.content = '동을 선택 또는 직접 입력해주세요.'
				return (this.sweetInfo.open = true)
			} else if (this.setdialog.selectBox2.value == 'new' && !this.setdialog.select_text2.value) {
				this.sweetInfo.title = '동 선택'
				this.sweetInfo.content = '동을 선택 또는 직접 입력해주세요.'
				return (this.sweetInfo.open = true)
			}
			if (!this.setdialog.select_text3.value) {
				this.sweetInfo.title = '호수 선택'
				this.sweetInfo.content = '호수를 입력해주세요.'
				return (this.sweetInfo.open = true)
			}
			if (!this.setdialog.selectBox3.value) {
				this.sweetInfo.title = '계약상태 선택'
				this.sweetInfo.content = '계약상태를 선택해주세요.'
				return (this.sweetInfo.open = true)
			}
			this.sweetDialog.open = true
		},
	},
}
</script>

<style lang="scss">
.product_detail_table {
	.v-data-table__wrapper {
		margin-top: 5px;
	}
}
.right_table1 {
	border-right: 1px solid #d7d8e9;
	border-left: 1px solid #d7d8e9;
	border-bottom: 1px solid #d7d8e9;
}
.right_table1:nth-child(1) {
	border-top: 1px solid black;
}
.right_table1:nth-last-child(1) {
	margin-bottom: 7px;
}
.table1_left {
	height: 50px;
	font-size: 13px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f0f2f8;
	border-right: 1px solid #d7d8e9;
}
.refresh_btn {
	border: 1px solid #cfdcdd !important;
	border-radius: 0;
	min-width: 22px !important;
	width: 22px !important;
	height: 26px !important;
	margin-right: 10px !important;
	padding: 0 10px !important;
	font-size: 13px;
	font-weight: bold;
	.v-btn__content {
		color: #666666;
	}
}
.right_table2 {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
	font-weight: bold;
	border-bottom: 1px solid #d7d8e9;
	border-right: 1px solid #d7d8e9;
}
</style>
