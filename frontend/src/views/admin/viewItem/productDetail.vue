<template>
	<v-dialog persistent v-model="setdialog.dialog" width="90%">
		<div class="create_wrap">
			<div class="project_title px-5">
				<span style="font-size:15px">상품 관리</span>
				<v-spacer />
				<v-icon @click="setdialog.dialog = false" class="title-icon" color="white">mdi-close</v-icon>
			</div>
			<v-layout class="mt-8 mx-10" align-center>
				<div class="slash mr-1"></div>
				<span style="font-weight:bold">상품 리스트</span>
			</v-layout>
			<v-layout align-center class="mx-10 mt-2 header_search">
				<div class="d-flex align-center" style="font-weight:bold; font-size:13px">
					<div class="pl-3" style="width:65px">주택형</div>
					<selectBox class="d-flex align-center" :sel="setdialog.selectBox1" style="max-width:90px; font-weight:normal"></selectBox>
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
				<selectBox :sel="selectBox4" style="max-width:85px; font-weight:normal"></selectBox>
				<selectBox class="mx-2" :sel="selectBox5" style="max-width:80px; font-weight:normal"></selectBox>
				<selectBox :sel="selectBox6" style="max-width:80px; font-weight:normal"></selectBox>
				<txtField class="search_box_type" v-model="search_product" :txtField="search" style="width:80px !important"></txtField>
				<v-btn elevation="0" class="ml-3 search_btn" color="#009dac"><v-icon>mdi-magnify</v-icon>조회</v-btn>
			</v-layout>
			<v-layout align-center class="mx-10 mt-2">
				<v-flex xs8>
					<v-layout justify-end class="table_info mr-7">
						<div class="ml-3">전체 상품 : 건,</div>
						<div class="ml-3">계약 : 건,</div>
						<div class="ml-3">미계약 : 건</div>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout class="mx-10">
				<v-flex xs8>
					<datatable :datatable="productTable" class="product_detail_table"></datatable>
					<v-layout>
						<v-btn class="mt-2 mb-6 save_biz" style="background:#434a5d !important">선택항목 삭제</v-btn>
					</v-layout>
				</v-flex>
				<v-flex xs4 class="ml-7" style="margin-top:5px">
					<v-layout align-center v-for="(right, idx) in right_table1" :key="idx" class="right_table1">
						<v-flex xs3 class="table1_left">{{ right.title }}</v-flex>
						<v-flex xs9 v-if="right.type === 'txtfield'">
							<txtField class="search_box_type" :txtField="right.txtfield"></txtField>
						</v-flex>
						<v-flex xs9 v-else-if="right.type === 'select'">
							<selectBox class="search_box_type" style="margin-left:10px" :sel="right.select"></selectBox>
						</v-flex>
						<v-flex class="d-flex align-center" xs9 v-else-if="right.type === 'radio'" style="height:50px;">
							<v-radio-group row class="system-radio-label" style="margin-left:10px">
								<v-radio color="#009dac" label="계약" :value="true"></v-radio>
								<v-radio color="#009dac" label="미계약" :value="false"></v-radio>
							</v-radio-group>
						</v-flex>
					</v-layout>
					<v-layout justify-end style="color:black">
						<v-btn elevation="0" class="refresh_btn mt-2" color="#f0f2f8"><v-icon small>mdi-refresh</v-icon></v-btn>
						<v-btn elevation="0" class="search_btn right1_btn mt-2" color="#f0f2f8">신규 항목 등록</v-btn>
					</v-layout>
					<v-layout class="my-3" style="border: 1px solid #d7d8e9;">
						<v-flex xs3 class="right_table2" style="background:#f0f2f8; height:250px; border-bottom:0">변경이력</v-flex>
						<v-flex xs9 style="height:250px; overflow:auto">
							<v-layout style="background:#f0f2f8; height:50px">
								<v-flex class="right_table2" xs6>변경내용</v-flex>
								<v-flex class="right_table2" style="border-right:0" xs6>변경일시</v-flex>
							</v-layout>
							<v-layout style="height:50px">
								<v-flex class="right_table2" style="font-weight:normal" xs6></v-flex>
								<v-flex class="right_table2" style="border-right:0; font-weight:normal" xs6></v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
					<v-layout justify-end>
						<v-btn class="mt-2 mb-6 save_biz"><v-icon>mdi-check</v-icon>저장</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
		<sweetAlert :dialog="sweetDialog" @click="createProduct" />
		<sweetAlert :dialog="sweetInfo" />
	</v-dialog>
</template>

<script>
import { txtField, selectBox, datatable, sweetAlert } from '@/components/index.js'

export default {
	components: {
		txtField,
		selectBox,
		datatable,
		sweetAlert,
	},
	props: {
		setdialog: Object,
	},
	data() {
		return {
			sweetDialog: {
				open: false,
				title: '상품 등록',
				content: `상품을 등록합니다.`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
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
			selectBox4: {
				placeholder: '상태',
				value: '',
				items: ['전체', '계약', '미계약'],
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
					{ text: 'No.', value: 'product_number' },
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
			},
			right_table1: [
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
				{
					title: '상태',
					type: 'radio',
				},
			],
		}
	},
	methods: {
		createProduct() {
			this.$store.state.loading = true
			console.log(this.setdialog)
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
			if (this.setdialog.selectBox3.value === '계약') {
				data['contractStatus'] = 'contract'
			} else {
				data['contractStatus'] = 'noContract'
			}
			this.$store.dispatch('createProduct', data).then(res => {
				console.log(res)
				this.sweetDialog.open = false
				this.$store.state.loading = false
			})
			console.log(data)
		},
		checkProduct() {
			console.log(this.setdialog)
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
