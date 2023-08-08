<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<txtField class="search_box_type" v-model="search_notice" :txtField="search"></txtField>
			<v-btn class="ml-3 search_btn" color="#009dac" @click="searchNotice"><v-icon>mdi-magnify</v-icon>조회</v-btn>
		</v-layout>
		<v-layout class="mt-5">
			<v-flex xs8>
				<datatable :datatable="noticeTable" :refreshTable="first_notices" class="notice_table" @click="notice_detail"></datatable>
			</v-flex>
			<v-flex xs4 class="ml-10">
				<v-layout style="border-top:1px solid black">
					<v-flex class="notice_right_table" xs2>
						사업지
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout wrap>
							<v-flex xs9 class="my-3">
								<selectBox :sel="bizSel" class="searchSel mx-3" style="font-size:12px;"></selectBox>
							</v-flex>
							<v-flex xs3 class="my-3" style="text-align:center">
								<v-btn class="notice_btn" color="#F3F3FF" elevation="0" @click="addBiz">적용</v-btn>
							</v-flex>
							<div style="min-height:50px">
								<v-layout wrap>
									<div
										v-for="(title, i) in bizSel.name"
										:key="i"
										class="table_title_wrap py-1 px-2 ma-3 white--text"
										style="cursor:pointer"
										@click="removeName(title)"
									>
										{{ title.name }}
										<v-icon class="table_icon">mdi-close</v-icon>
									</div>
								</v-layout>
							</div>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2>
						제목
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<txtField :txtField="notice_title" v-model="title_text" class="search_box_admin pa-3"></txtField>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2>
						내용
					</v-flex>
					<v-flex xs10 class="notice_right_table2" style="height:">
						<v-textarea
							class="notice_content_text ma-3"
							outlined
							v-model="content_text"
							auto-grow
							hide-details
							style="font-size:12px !important"
						></v-textarea>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2>
						공개
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-radio-group v-model="show_value" :value="true" hide-details row class="notice_radio ma-3">
							<v-radio class="mb-0 mr-2" label="공개" :value="true" color="#fb9c00" :ripple="false"></v-radio>
							<v-radio class="mb-0" label="비공개" :value="false" color="#fb9c00" :ripple="false"></v-radio>
						</v-radio-group>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2>
						고정
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-checkbox
							v-model="checkbox_value"
							class="right_checkbox"
							color="#fb9c00"
							hide-details
							:ripple="false"
							:label="' 고정 공지글'"
						></v-checkbox>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2>
						첨부파일
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<div class="right_subtable" style="border-bottom:0">
							<txtField :txtField="notice_file" class="search_box_admin pa-3" style="width:100%;"></txtField>
							<div class="mr-3">
								<v-btn class="notice_btn" color="#fff" elevation="0" @click="fileUpload">첨부</v-btn>
								<input type="file" style="display:none;" id="goods_file" accept=".pdf,.hwp,.csv,.ppt,.png" @change="fileUploadChange" />
							</div>
						</div>
						<v-flex xs12 v-if="notice_file.upload.file">
							<div class="right_subtable" style="border-bottom:0">
								<div class="px-3 mb-1" style="color:#0500B7; font-size:12px; text-decoration: underline; cursor:pointer">
									{{ notice_file.upload.name }}
									<v-icon v-if="notice_file.upload.name" style="font-size:17px;" @click="click_delete_file"
										>mdi-close-circle-outline</v-icon
									>
								</div>
							</div>
						</v-flex>
					</v-flex>
				</v-layout>
				<v-layout class="mt-8" justify-space-between>
					<div>
						<v-btn class="new_notice_btn" color="#0500B7" elevation="0" @click="reset_notice">초기화</v-btn>
					</div>
					<div style="display: flex;align-items: center; justify-content: flex-end;">
						<div class="mr-3">
							<v-btn class="new_notice_btn" color="#0500B7" elevation="0" :disabled="btn_active === false" @click="check_notice('edit')"
								>수정</v-btn
							>
						</div>
						<div>
							<v-btn class="new_notice_btn" color="#0500B7" elevation="0" :disabled="btn_active === true" @click="check_notice('create')"
								>생성</v-btn
							>
						</div>
					</div>
				</v-layout>
			</v-flex>
		</v-layout>
		<sweetAlert :dialog="sweetDialog" @click="createNotice" />
	</div>
</template>

<script>
import { txtField, datatable, selectBox, sweetAlert } from '@/components/index.js'

export default {
	created() {
		this.$store.state.loading = true
		this.first_notices()
		this.notice_businesses()
	},
	components: {
		txtField,
		datatable,
		selectBox,
		sweetAlert,
	},
	data() {
		return {
			edit_biz_id: '',
			sweetDialog: {
				open: false,
				title: '공지사항 관리',
				content: `공지사항을 저장합니다.`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
				save_type: '',
			},
			search_notice: '',
			search: {
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			noticeTable: {
				headers: [
					{ text: '제목', value: 'title', width: '30%' },
					{ text: '공개여부', value: 'notice_useYn', width: '10%' },
					{ text: '작성일', value: 'created_at', width: '15%' },
					{ text: '적용 사업지', value: 'notice_title', width: '45%' },
				],
				class: 'datatablehover3',
				items: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
				allBiz: [],
			},
			bizSel: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				name: [],
				returnObject: true,
				itemText: 'name',
			},
			notice_title: {
				clearable: false,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			title_text: '',
			content_text: '',
			show_value: true,
			checkbox_value: true,
			notice_file: {
				clearable: false,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
				disable: true,
				placeholder: 'pdf, hwp, doc, ppt, png',
				upload: {
					file: {},
					name: '',
					update: false,
				},
			},
			btn_active: false,
		}
	},
	methods: {
		searchNotice() {
			this.$store.state.loading = true
			let data = {
				title: this.search_notice,
			}
			this.$store.dispatch('notices', data).then(res => {
				this.noticeTable.items = res.notices
				this.$store.state.loading = false
			})
		},
		async createNotice() {
			console.log(this.show_value)
			this.$store.state.loading = true
			let data = {
				businesses: [],
				title: this.title_text,
				detail: this.content_text,
				useYn: this.show_value,
				fixYn: this.checkbox_value,
			}
			if (this.notice_file.upload.update) {
				let file_input = {
					file: this.notice_file.upload.file,
				}
				await this.$store.dispatch('fileUpload', file_input).then(res => {
					data['fileUpload'] = res.upload.id
				})
			}
			if (this.bizSel.name.length > 0) {
				for (let i = 0; i < this.bizSel.name.length; i++) {
					data.businesses.push(this.bizSel.name[i].value)
				}
			}
			console.log(data)
			if (this.sweetDialog.save_type === 'edit') {
				data['id'] = this.edit_biz_id
				this.$store.dispatch('updateNotice', data).then(res => {
					console.log(res)
					this.sweetDialog.open = false
					this.first_notices()
				})
			} else {
				this.$store.dispatch('createNotice', data).then(res => {
					console.log(res)
					this.sweetDialog.open = false
					this.first_notices()
				})
			}
		},
		check_notice(type) {
			if (this.title_text === '') {
				return alert('제목을 입력해주세요.')
			} else if (this.content_text === '') {
				return alert('내용을 입력해주세요.')
			}
			this.sweetDialog.save_type = type
			this.sweetDialog.open = true
		},
		click_delete_file() {
			this.notice_file.upload.name = ''
			this.notice_file.upload.file = ''
			this.notice_file.upload.update = true
		},
		fileUploadChange(val) {
			this.notice_file.upload.file = val.target.files[0]
			this.notice_file.upload.name = val.target.files[0].name
			this.notice_file.upload.update = true
		},
		fileUpload() {
			document.getElementById(`goods_file`).value = ''
			document.getElementById(`goods_file`).click()
		},
		reset_notice() {
			this.bizSel.value = ''
			this.bizSel.name = []
			this.title_text = ''
			this.content_text = ''
			this.show_value = true
			this.checkbox_value = false
			this.btn_active = false
		},
		removeName(item) {
			for (let i = 0; i < this.bizSel.name.length; i++) {
				if (this.bizSel.name[i] === item) {
					this.bizSel.name.splice(i, 1)
				}
			}
		},
		notice_detail(item) {
			let data = JSON.parse(JSON.stringify(item))
			console.log(data)
			if (data.businesses && data.businesses.length >= 0) {
				this.bizSel.name = data.businesses
			}
			this.edit_biz_id = data.id
			this.bizSel.value = ''
			this.title_text = data.title
			this.content_text = data.detail
			this.show_value = data.useYn
			this.checkbox_value = data.fixYn
			this.btn_active = true
		},
		addBiz() {
			if (this.bizSel.name.findIndex(x => x.name === this.bizSel.value.name) === -1 && this.bizSel.value) {
				this.bizSel.name.push(this.bizSel.value)
			}
		},
		first_notices() {
			this.$store.dispatch('notices').then(res => {
				res.notices.forEach(el => {
					el.businesses.forEach(e => {
						e['value'] = e.id
					})
				})
				this.noticeTable.items = res.notices
				console.log(this.noticeTable.items)
				this.$store.state.loading = false
			})
		},
		notice_businesses() {
			this.$store.dispatch('businesses_title').then(res => {
				let businesses = []
				res.businesses.forEach(el => {
					businesses.push({ name: el.name, value: el.id })
				})
				this.bizSel.items = businesses
				console.log(this.bizSel.items)
			})
		},
	},
}
</script>

<style lang="scss">
.notice_table {
	div {
		.v-data-table__wrapper {
			margin: 0;
		}
	}
}
.notice_right_table {
	background-color: #e9ecf4;
	font-size: 12px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #c8c8c8;
	border-bottom: 1px solid #c8c8c8;
	border-left: 1px solid #c8c8c8;
}
.notice_right_table2 {
	border-right: 1px solid #c8c8c8;
	border-bottom: 1px solid #c8c8c8;
}
.notice_content_text {
	.v-text-field__slot {
		textarea {
			margin-top: 0px !important;
			padding-top: 5px !important;
			max-height: 120px !important;
			overflow: auto;
			line-height: 18px !important;
		}
	}
}
.right_checkbox {
	margin: 12px !important;
	padding: 0 !important;
	.v-label {
		font-size: 12px;
	}
}
.right_subtable {
	display: flex;
	align-items: center;
	text-align: center;
	border-bottom: 1px solid #c8c8c8;
}
</style>
