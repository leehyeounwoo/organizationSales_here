<template>
	<v-dialog v-model="setdialog.dialog" persistent max-width="1300">
		<div class="create_wrap">
			<div class="project_title px-5" :style="`background-color:#323153`">
				<h2 style="font-size:15px">{{ setdialog.title }}</h2>
				<v-spacer />
				<v-icon @click="reset()" class="title-icon" color="white">mdi-close</v-icon>
			</div>

			<v-layout class="ml-8 mt-8 mr-14" wrap>
				<v-flex xs4>
					<v-layout wrap>
						<v-flex xs12>
							<v-layout align-center>
								<div class="slash mr-1"></div>
								<span class="title_font">
									기본 정보
								</span>
							</v-layout>
							<div class="mt-2 sub_font ">
								<v-layout wrap align-center justify-center v-for="(left, index) in leftInfoTop" :key="index" :style="'height:40px;'">
									<v-flex xs3 class="dialog_table">
										<v-layout align-center class="nomal-info" :style="'height:40px;'">
											<v-flex class="info_title">
												{{ left.title }}
											</v-flex>
										</v-layout>
									</v-flex>
									<v-flex class="nomal-input-type px-2" xs9>
										<txtField class="bizInput" v-model="left.value" :txtField="left.txtfield"></txtField>
									</v-flex>
								</v-layout>
							</div>
						</v-flex>
						<v-flex xs12 class="mt-2">
							<v-layout align-center>
								<div class="slash mr-1"></div>
								<span class="title_font">
									이력정보
								</span>
							</v-layout>
							<div>
								<datatable :datatable="changeTable" class="table_header"></datatable>
							</div>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-flex xs8 class="pl-11">
					<v-layout align-center>
						<div class="slash mr-1"></div>
						<span class="title_font">
							기간내 근무내역
						</span>
					</v-layout>
					<div>
						<v-layout align-center class="header_search mt-1">
							<v-layout align-center justify-end>
								<div class="d-flex align-center date_picker2" style="width:115px">
									<DatepickerDialog :picker="start_date_picker"></DatepickerDialog>
								</div>
								<div class="d-flex align-center">
									~
								</div>
								<div class="d-flex align-center date_picker2" style="width:115px">
									<DatepickerDialog :picker="end_date_picker"></DatepickerDialog>
								</div>
								<v-flex class="search_select ml-3 mr-2 " style="max-width:100px !important;">
									<selectBox :sel="searchsel" :class="'searchSel'" style="font-size:12px" @change="changeSel"></selectBox>
								</v-flex>
								<v-flex class="ml-3" style="max-width:100px;">
									<v-btn class="search_btn" color="#5d19ff" elevation="0" @click="getAllworkTime"><v-icon>mdi-magnify</v-icon>조회</v-btn>
								</v-flex>
							</v-layout>
						</v-layout>
						<div style="height:490px;">
							<datatable
								:datatable="attendanceTable"
								class="table_header"
								excelUseYn="true"
								excelType="attendanceManagement_detail"
							></datatable>
						</div>
					</div>

					<v-layout wrap class="pt-10">
						<v-flex xs12 class="ml-auto mb-8">
							<v-layout justify-end>
								<v-btn @click="setdialog.dialog = false" dense width="100" height="26" dark color="#5B5B5B" class="mr-3">확인</v-btn>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
		<sweetAlert :dialog="sweetDialog" @click="clickSave()" />
		<sweetAlert :dialog="sweetInfo" />
	</v-dialog>
</template>

<script>
import { txtField, sweetAlert, datatable, DatepickerDialog, selectBox } from '@/components'
export default {
	components: {
		txtField,
		sweetAlert,
		datatable,
		DatepickerDialog,
		selectBox,
	},
	props: {
		setdialog: Object,
	},
	data() {
		return {
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			sweetDialog: {
				open: false,
				title: '신청 연차 관리',
				content: `승인 결과를 저장합니다.`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			changeTable: {
				headers: [
					{ text: '변경일', value: 'date' },
					{ text: '변경내용', value: 'content' },
				],
				hidedefaultfooter: true,
				class: 'datatablehover3',
				items: [],
				height: '126px',
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
			},
			searchsel: {
				value: '최근 30일',
				errorMessage: '',
				hideDetail: true,
				items: ['오늘', '어제', '이번 주', '지난 주', '최근 7일', '최근 14일', '최근 30일', '이번 달', '지난 달'],
				outlined: true,
				placeholder: '',
				returnObject: true,
				itemText: 'title',
			},
			start_date_picker: {
				date: this.$moment()
					.subtract(30, 'days')
					.format('YYYY-MM-DD'),
			},
			end_date_picker: {
				date: this.$moment().format('YYYY-MM-DD'),
			},
			attendanceTable: {
				itemKey: 'date',
				headers: [
					{ text: '일자', value: 'date' },
					{ text: '출근시간', value: 'startWork' },
					{ text: '퇴근시간', value: 'endWork' },
					{ text: '근무시간', value: 'len' },
					{ text: '상태', value: 'workStatus' },
				],
				class: 'datatablehover3',
				items: [],
				selected: [],
				showselect: true,
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
			},

			leftInfoTop: [
				{
					value: '',
					title: '이름',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '',
						readonly: true,
					},
					required: true,
				},
				{
					value: '',
					title: '연락처',
					txtfield: {
						maxlength: '15',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '예) 010-1234-5678',
						readonly: true,
					},
					required: true,
				},
				{
					value: '',
					title: '영업번호',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '예) 010-1234-5678',
						readonly: true,
					},
					required: false,
				},
				{
					value: '',
					title: '사업자 정보',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						readonly: true,
					},
					required: false,
				},
				{
					value: '',
					title: '등록일',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '예) 2023-01-01',
						readonly: true,
					},
					required: false,
				},
				{
					title: '팀',
					value: '',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '1팀 / 상담사',
						readonly: true,
					},

					required: true,
				},
				{
					title: '전체 근무일',
					value: '',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '',
						readonly: true,
					},
					required: true,
				},
				{
					title: '전체 휴무일',
					value: '',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '',
						readonly: true,
					},
					required: true,
				},
				{
					title: '기간내 근무기간',
					value: '',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '',
						readonly: true,
					},
					required: true,
				},
				{
					title: '기간내 휴무일',
					value: '',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '',
						readonly: true,
					},
					required: true,
				},
			],
		}
	},
	methods: {
		reset() {
			this.setdialog.dialog = false
		},

		async clickSave() {},
		async getworkTime() {
			this.$store.state.loading = true

			let input2 = {
				business: this.setdialog.editData.all.business.id,
				users_permissions_user: this.setdialog.editData.all.id,
				status: 'vacation',
			}
			await this.$store.dispatch('gotoWork', input2).then(async res2 => {
				this.leftInfoTop[9].value = res2.gotoworks.length + '일'
				let input = {
					business: this.setdialog.editData.all.business.id,
					users_permissions_user: this.setdialog.editData.all.id,
				}
				await this.$store.dispatch('gotoWork', input).then(res => {
					this.leftInfoTop[8].value = res.gotoworks.length - res2.gotoworks.length + '일'
					this.$store.state.loading = false
				})
			})
		},
		async getAllworkTime() {
			this.$store.state.loading = true
			let input = {
				business: this.setdialog.editData.all.business.id,
				users_permissions_user: this.setdialog.editData.all.id,
				date_gte: this.start_date_picker.date,
				date_lte: this.end_date_picker.date,
			}
			await this.$store.dispatch('gotoWork', input).then(res => {
				let li = []
				let start = this.start_date_picker.date
				let end = this.$moment(this.end_date_picker.date)
					.add(1, 'day')
					.format('YYYY-MM-DD')
				while (start !== end) {
					let obj = {}
					obj.date = this.date_filter(start)
					let idx = res.gotoworks.findIndex(x => x.date === start)
					if (idx > -1) {
						if (res.gotoworks[idx].status !== 'vacation') {
							obj.len =
								res.gotoworks[idx].startWork && res.gotoworks[idx].endWork
									? this.timeCheck(res.gotoworks[idx].startWork, res.gotoworks[idx].endWork)
									: '-'
							obj.startWork = res.gotoworks[idx].startWork ? this.$moment(res.gotoworks[idx].startWork).format('YYYY-MM-DD HH:mm:ss') : '-'
							obj.endWork = res.gotoworks[idx].endWork ? this.$moment(res.gotoworks[idx].endWork).format('YYYY-MM-DD HH:mm:ss') : '-'
						} else {
							obj.len = '-'
							obj.startWork = '-'
							obj.endWork = '-'
						}
						obj.workStatus = this.workStatusChange(res.gotoworks[idx].status)
						li.push(obj)
					} else {
						obj.len = '-'
						obj.startWork = '-'
						obj.endWork = '-'
						obj.workStatus = '-'
						li.push(obj)
					}

					start = this.$moment(start)
						.add(1, 'day')
						.format('YYYY-MM-DD')
				}

				this.attendanceTable.items = li
				this.$store.state.loading = false
			})
		},
		date_filter(val) {
			let date = this.$moment(val).format('ddd')
			let text
			if (date === 'Sun') {
				text = '일'
			} else if (date === 'Mon') {
				text = '월'
			} else if (date === 'Tue') {
				text = '화'
			} else if (date === 'Wed') {
				text = '수'
			} else if (date === 'Thu') {
				text = '목'
			} else if (date === 'Fri') {
				text = '금'
			} else if (date === 'Sat') {
				text = '토'
			}
			return this.$moment(val).format('YYYY-MM-DD') + ` (${text})`
		},
		workStatusChange(data) {
			if (data === 'vacation') {
				return '연차'
			} else if (data === 'afternoonVacation') {
				return '오후반차'
			} else if (data === 'morningVacation') {
				return '오전반차'
			} else if (data === 'endWork') {
				return '정상근무'
			} else if (data === '-') {
				return '-'
			}
		},
		timeCheck(start, end) {
			const moment = require('moment')
			let timeData = ''
			let hour = parseInt(moment.duration(this.$moment(end).diff(this.$moment(start))).asMinutes() / 60)
			let minute = parseInt(moment.duration(this.$moment(end).diff(this.$moment(start))).asMinutes() % 60)
			if (minute === 0) {
				timeData = hour + '시간'
			} else {
				timeData = hour + '시간' + minute + '분'
			}
			return timeData
		},
		changeSel() {
			let date
			if (this.$moment().format('ddd') === 'Sun') {
				date = 6
			} else if (this.$moment().format('ddd') === 'Mon') {
				date = 0
			} else if (this.$moment().format('ddd') === 'Tue') {
				date = 1
			} else if (this.$moment().format('ddd') === 'Wed') {
				date = 2
			} else if (this.$moment().format('ddd') === 'Thu') {
				date = 3
			} else if (this.$moment().format('ddd') === 'Fri') {
				date = 4
			} else if (this.$moment().format('ddd') === 'Sat') {
				date = 5
			}
			if (this.searchsel.value === '오늘') {
				this.start_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '어제') {
				this.start_date_picker.date = this.$moment()
					.subtract(1, 'days')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '이번 주') {
				this.start_date_picker.date = this.$moment()
					.subtract(date, 'day')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '지난 주') {
				this.start_date_picker.date = this.$moment()
					.subtract(date + 7, 'day')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment()
					.subtract(date + 1, 'day')
					.format('YYYY-MM-DD')
			} else if (this.searchsel.value === '최근 7일') {
				this.start_date_picker.date = this.$moment()
					.subtract(7, 'days')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '최근 14일') {
				this.start_date_picker.date = this.$moment()
					.subtract(14, 'days')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '최근 30일') {
				this.start_date_picker.date = this.$moment()
					.subtract(30, 'days')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '이번 달') {
				this.start_date_picker.date = this.$moment()
					.subtract(Number(this.$moment().format('DD')) - 1, 'days')
					.format('YYYY-MM-DD')
				this.end_date_picker.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.searchsel.value === '지난 달') {
				let date2
				date2 = this.$moment().subtract(1, 'month')
				this.start_date_picker.date = this.$moment(date2)
					.startOf('month')
					.format('YYYY-MM-DD')

				this.end_date_picker.date = this.$moment(date2)
					.endOf('month')
					.format('YYYY-MM-DD')
			}
		},
	},
	watch: {
		setdialog: {
			deep: true,
			async handler() {
				if (this.setdialog.dialog) {
					if (this.setdialog.edit) {
						this.leftInfoTop[0].value = this.setdialog.editData.data1
						this.leftInfoTop[1].value = this.setdialog.editData.data2
						this.leftInfoTop[2].value = this.setdialog.editData.salesPhoneNumber
						this.leftInfoTop[3].value = this.setdialog.editData.all.startDate
						this.leftInfoTop[4].value = this.$moment(this.setdialog.editData.all.created_at).format('YYYY-MM-DD HH:mm')
						this.leftInfoTop[5].value = this.setdialog.editData.team ? this.setdialog.editData.team : '-'
						this.leftInfoTop[6].value = this.setdialog.editData.team
						this.leftInfoTop[7].value = this.setdialog.editData.rank

						this.changeTable.items = this.setdialog.editData.history

						await this.getworkTime()
						await this.getAllworkTime()
						this.attendanceTable.selected = []
					}
				}
			},
		},
	},
}
</script>

<style lang="scss">
.terms-content-filed2 {
	white-space: pre-line;
	font-size: 12px;
	max-height: 118px;
	min-height: 118px;
	// overflow: auto;
	border: 1px solid #d1d1d1;
}
.counselorTable {
	.v-data-table__wrapper {
		margin-top: 8px !important;
		border: 1px solid #d1d1d1;
		border-bottom: none;
		border-top: none;
	}
}
.counselorTable > .v-data-table > .v-data-table__wrapper > table {
	border: none !important;
	thead {
		border-top: 1px solid #d1d1d1;
		border-bottom: 1px solid #d1d1d1;
		tr {
			th:not(:last-of-type) {
				border: none !important;
				text-align: center !important;
			}
		}
	}
}
.counselorTable > .v-data-table > .v-data-table__wrapper > table {
	tbody {
		tr {
			height: 40px !important;
			td:not(:last-of-type) {
				border-top: none !important;
				border-right: none !important;
				text-align: center !important;
			}
		}
	}
}
.all-counselor {
	font-weight: bold;
	color: #535353;
	font-size: 14px;
	.count {
		color: #e89000;
	}
}
</style>
