<template>
	<div style="width: 100%; max-width: 100%; display:grid">
		<v-layout wrap>
			<v-flex>
				<v-layout align-center class="header_search mt-1">
					<v-layout align-center justify-end>
						<div class="d-flex align-center date_picker2" style="width:115px">
							<DatepickerDialog :picker="start_date_picker"></DatepickerDialog>
						</div>
						<div class="d-flex align-center mx-1">
							~
						</div>
						<div class="d-flex align-center date_picker2" style="width:115px">
							<DatepickerDialog :picker="end_date_picker"></DatepickerDialog>
						</div>
						<v-flex class="search_select ml-3 mr-2 " style="max-width:100px !important;">
							<selectBox :sel="searchsel" :class="'searchSel'" style="font-size:12px" @change="changeSel"></selectBox>
						</v-flex>
						<v-flex class="search_select ml-3 mr-2 " style="max-width:150px !important;">
							<selectBox :sel="searchsel1" :class="'searchSel'" style="font-size:12px"></selectBox>
						</v-flex>
						<v-flex style="max-width:200px;">
							<txtField class="search_box_admin" v-model="search_project" :txtField="search"></txtField>
						</v-flex>
						<v-flex class="ml-3" style="max-width:100px;">
							<v-btn class="search_btn" color="#5d19ff" elevation="0" @click="click_search()"><v-icon>mdi-magnify</v-icon>조회</v-btn>
						</v-flex>
					</v-layout>
				</v-layout>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<v-layout class="mt-2" align-center>
					<div class="slash mr-1"></div>
					<span class="title_font">
						출퇴근 리스트
					</span>
				</v-layout>
				<div class="mt-2 " style="position:relative;">
					<v-data-table
						:headers="table.headers"
						:items="table.items"
						class="elevation-0 table_style_1 mt-2"
						show-select
						v-model="selected"
						item-key="name"
						:footer-props="{
							['items-per-page-text']: `• Total : ${table.items.length}`,
						}"
					>
						<template v-slot:body="{ headers, items, isSelected, select }">
							<tbody>
								<tr v-for="(d, index) in items" :key="index">
									<td>
										<v-checkbox
											:input-value="isSelected(d)"
											style="margin:0px;padding:0px"
											color="#535353"
											hide-details
											@click="select(d, !isSelected(d))"
										>
										</v-checkbox>
									</td>
									<td>
										{{ d.username }}
									</td>
									<td style="border-right:1px solid #d1d1d1; ">{{ d.teamID }}팀 / {{ d.rankId === '1' ? '상담사' : '' }}</td>
									<td style="border-right:1px solid #d1d1d1; ">
										{{ d.gotoworks.filter(x => x.status === 'endWork').length }}Day <br />
										{{ allTimeCheck(d.gotoworks) }}
									</td>
									<td style="border-right:1px solid #d1d1d1; ">{{ d.gotoworks.filter(x => x.status === 'vacation').length }}Day</td>
									<td v-for="(hd, i) in headers.slice(5, headers.length)" :key="i">
										<div v-if="d.gotoworks.filter(x => x.date === hd.text).length > 0" style="border:1px solid #d1d1d1; min-width:100px;">
											<v-layout style="color:#606060; font-size:0.75rem; ">
												<v-flex xs6 style="background-color:#f99f9f; border-right:1px solid #a5a4a4;"
													>{{
														d.gotoworks.filter(x => x.date === hd.text)[0].startWork
															? $moment(d.gotoworks.filter(x => x.date === hd.text)[0].startWork).format('HH:mm')
															: '-'
													}}
												</v-flex>
												<v-flex xs6 style="background-color:#D4D3FC;">{{
													d.gotoworks.filter(x => x.date === hd.text)[0].endWork
														? $moment(d.gotoworks.filter(x => x.date === hd.text)[0].endWork).format('HH:mm')
														: '-'
												}}</v-flex>
											</v-layout>
											<v-layout style="color:#606060; font-size:0.75rem;">
												<v-flex style="background-color:#bfbfbf; border-top:1px solid #a5a4a4; border-bottom:1px solid #a5a4a4;">
													{{
														$moment(d.gotoworks.filter(x => x.date === hd.text)[0].startWork) &&
														$moment(d.gotoworks.filter(x => x.date === hd.text)[0].endWork)
															? timeCheck(
																	$moment(d.gotoworks.filter(x => x.date === hd.text)[0].startWork),
																	$moment(d.gotoworks.filter(x => x.date === hd.text)[0].endWork),
															  )
															: '-'
													}}
												</v-flex>
											</v-layout>
											<v-layout style="color:#606060; font-size:0.75rem;">
												<v-flex>
													{{ workStatus(d.gotoworks.filter(x => x.date === hd.text)[0].status) }}
												</v-flex>
											</v-layout>
										</div>
										<div v-else class="my-1" style="font-size:0.75rem; width:100%; border:1px solid #d1d1d1; min-width:100px;">
											<v-layout>
												<v-flex xs6 style="background-color:#f99f9f; border-right:1px solid #a5a4a4; ">-</v-flex>
												<v-flex xs6 style="background-color:#D4D3FC; ">-</v-flex>
											</v-layout>
											<v-layout>
												<v-flex xs12 style="background-color:#bfbfbf;  border-top:1px solid #a5a4a4; border-bottom:1px solid #a5a4a4;">
													-
												</v-flex>
											</v-layout>
											<v-layout>
												<v-flex xs12 style=""> -</v-flex>
											</v-layout>
										</div>
									</td>
								</tr>
							</tbody>
						</template>
					</v-data-table>
					<v-btn small :class="'btn-style'" @click="clickExport()">
						<img src="@/assets/images/excel-img2.png" />
						엑셀파일 다운로드
					</v-btn>
					<download-excel
						class="btn btn-default"
						id="attendanceManagement_Excel"
						:data="excelData"
						style="display:none"
						:fields="table.json_fields"
						type="text/csv;charset=utf8"
						worksheet="My Worksheet"
						name="출퇴근 리스트"
					>
					</download-excel>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { DatepickerDialog, selectBox, txtField } from '@/components'
export default {
	components: {
		DatepickerDialog,
		selectBox,
		txtField,
	},
	async created() {
		await this.me()
		this.headerCheckAction(this.start_date_picker.date, this.end_date_picker.date)
		let data = {
			data_gte: this.start_date_picker.date,
			date_lte: this.end_date_picker.date,
		}
		await this.viewUsers(data)
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
			search: {
				clearable: false,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			search_project: '',
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
			searchsel1: {
				value: '상담사 이름',
				errorMessage: '',
				hideDetail: true,
				items: ['상담사 이름', '휴대전화'],
				outlined: true,
				placeholder: '상담사 이름/휴대전화',
			},
			start_date_picker: {
				date: this.$moment()
					.subtract(30, 'days')
					.format('YYYY-MM-DD'),
			},
			end_date_picker: {
				date: this.$moment().format('YYYY-MM-DD'),
			},
			table: {
				headers: [
					{ text: '상담사', value: 'username', align: 'center', width: '100px' },
					{ text: '팀', value: 'team', align: 'center', width: '100px' },
					{ text: '근무일', value: 'workday', align: 'center', width: '100px' },
					{ text: '휴무일', value: 'holiday', align: 'center', width: '100px' },
				],
				headerCheck: false,
				items: [],
				select_items: [],
				json_fields: {
					상담사: 'name',
					연락처: 'phone',
					검색기간: 'rangeDate',
					'휴무일(연차+반차)': 'vacationLength',
					근무일: 'amount',
				},
			},
			selected: [],
			excelData: [],
		}
	},
	methods: {
		async clickExport() {
			if (this.selected.length === 0) {
				this.sweetInfo.open = true
				this.sweetInfo.title = '파일 다운로드 에러'
				this.sweetInfo.content = '데이터를 클릭후 엑셀 다운로드를 해주세요'
				return
			}
			this.excelData = JSON.parse(JSON.stringify(this.selected))
			const total = this.excelData
				.map(x => x.amount)
				.reduce((a, b) => {
					return a + b
				})
			const totalVacation = this.excelData
				.map(x => x.vacationLength)
				.reduce((a, b) => {
					return a + b
				})
			this.excelData.push({
				name: '계',
				amount: total,
				vacationLength: totalVacation,
			})
			document.getElementById(`attendanceManagement_Excel`).click()
		},
		reset() {
			this.setdialog.dialog = false
		},
		workStatus(val) {
			if (val === 'endWork') {
				return '정상근무'
			} else if (val === 'afternoonVacation') {
				return '오후반차'
			} else if (val === 'morningVacation') {
				return '오전반차'
			} else if (val === 'vacation') {
				return '휴가'
			} else {
				return '출근'
			}
		},
		click_search() {
			this.headerCheckAction(this.start_date_picker.date, this.end_date_picker.date)
			let data = {
				date_gte: this.start_date_picker.date,
				date_lte: this.end_date_picker.date,
			}
			if (this.searchsel1.value === '상담사 이름') {
				data.name = this.search_project
			} else {
				data.phone = this.search_project
			}

			this.viewUsers(data)
		},

		timeCheck(start, end) {
			if (!isNaN(start) && !isNaN(end)) {
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
			} else {
				return '-'
			}
		},
		allTimeCheck(gotoworks) {
			if (gotoworks && gotoworks.length > 0) {
				const moment = require('moment')
				let totalMinutes = 0

				for (const gw of gotoworks) {
					if (gw.status !== 'vacation') {
						let minutes = moment.duration(this.$moment(gw.endWork).diff(this.$moment(gw.startWork))).asMinutes()
						totalMinutes += minutes
					}
				}

				const hours = Math.floor(totalMinutes / 60)
				const formattedTime = `${hours}Hours`

				return formattedTime
			} else {
				return '-'
			}
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
		viewUsers(data) {
			this.$store.state.loading = true
			if (this.search_project) {
				data.username = this.search_project
			} else {
				data
			}

			this.$store
				.dispatch('users', data)
				.then(res => {
					console.log(res)
					for (let index = 0; index < res.users.length; index++) {
						const element = res.users[index]
						element.amount = element.gotoworks.filter(x => x.status === 'endWork').length

						let num1 = element.gotoworks.filter(x => x.status === 'vacation').length
						let num2 = element.gotoworks.filter(x => x.status === 'morningVacation' || x.status === 'afternoonVacation').length
						element.vacationLength = num1 + num2 * 0.5
						element.rangeDate = this.start_date_picker.date + '~' + this.end_date_picker.date
						// if (element.gotoworks.length !== 0) {
						for (let i = 0; i < this.table.headers.slice(2, this.table.headers.length).length; i++) {
							const e = this.table.headers.slice(2, this.table.headers.length)[i]
							if (element.gotoworks.filter(x => this.$moment(x.date).format('YYYY-MM-DD') === e.text).length !== 0) {
								element['data' + i] = this.workStatus(
									element.gotoworks.filter(x => this.$moment(x.date).format('YYYY-MM-DD') === e.text)[0].status,
								)
							} else {
								element['data' + i] = '-'
							}
						}
						// }
					}
					this.table.items = res.users
					console.log(this.table.items)
					this.$store.state.loading = false
				})
				.catch(err => {
					console.log({ err })
					this.$store.state.loading = false
				})
		},
		headerCheckAction(startDate, endDate) {
			let count = this.$moment.duration(this.$moment(endDate).diff(this.$moment(startDate))).asDays() + 1
			let result = []
			this.table.headers = [
				{ text: '상담사', value: 'name', align: 'center', width: '100px' },
				{ text: '팀', value: 'team', align: 'center', width: '100px' },
				{ text: '근무일', value: 'workday', align: 'center', width: '100px' },
				{ text: '휴무일', value: 'holiday', align: 'center', width: '100px' },
			]
			for (let index = 0; index < count; index++) {
				let day = this.$moment(startDate)
					.add(index, 'd')
					.format('YYYY-MM-DD')
				result.push(this.table.headers.push({ text: day, value: 'data' + index, align: 'center' }))
				this.table.json_fields[day] = 'data' + index
			}
		},
		async me() {
			await this.$store
				.dispatch('me')
				.then(() => {})
				.catch(() => {})
		},
	},
}
</script>

<style lang="scss">
.main_title {
	font-size: 20px;
}
.router_title {
	font-size: 12px;
	font-weight: 100;
}
.search_box {
	width: 800px;
}
.search_title {
	width: 100px;
	font-size: 12px;
}
.search_body {
	display: flex;
	align-items: center;
	width: 600px;
}
.search_body2 {
	display: flex;
	align-items: center;
}
.search_btn {
	border-bottom: 1px solid #eaeaea;
}

.btn-style {
	box-shadow: none;
	background-color: #ffffff;
	border: 1px solid #9a9c9b;
	border-radius: 5px;
}
</style>
<style lang="scss">
.search_select {
	div {
		.v-input__slot {
			height: 35px !important;
			max-height: 35px !important;
			min-height: 35px !important;
			div {
				.v-input__append-inner {
					margin-top: 6px;
				}
			}
		}
	}
}
.text_field {
	width: 193px;
	margin-left: 10px;
	div {
		.v-input__slot {
			min-height: 35px !important;
			height: 35px;
			padding: 0 10px !important;
		}
	}
}
.date_picker {
	div {
		div {
			.v-input__slot {
				min-height: 35px !important;
				height: 35px !important;
			}
		}
	}
}

.table_style_1 > .v-data-table__wrapper {
	// max-width: calc(100% - 200px);
	// width: calc(100% - 200px);
	overflow: auto;
	table {
		border-right: 1px solid #d1d1d1;
		border-bottom: 1px solid #d1d1d1;
		thead {
			tr {
				z-index: 1;
				// th:not(:last-of-type) {
				// 	border-right: 1px solid #d1d1d1;
				// }
				th {
					text-align: center !important;
					color: #333333;
					height: 53px;
					border-top: 1px solid #7d7d7d !important;
					border-bottom: 1px solid #7d7d7d !important;
					background-color: #f5f5f5 !important;
				}
				th:nth-child(1) {
					position: sticky;
					left: 0;
					z-index: 2 !important;
					border-left: 1px solid #d1d1d1;
					// border-right: 1px solid #d1d1d1;
					> i {
						display: none;
					}
				}
				th:nth-child(2) {
					position: sticky;
					left: 65px;
					z-index: 2 !important;
					border-left: 1px solid #d1d1d1;
					// border-right: 1px solid #d1d1d1;
				}
				th:nth-child(3) {
					position: sticky;
					left: 165px;
					z-index: 2 !important;
					border-left: 1px solid #d1d1d1;
					border-right: 1px solid #d1d1d1;
				}
				th:nth-child(4) {
					position: sticky;
					left: 165px;
					z-index: 2 !important;
					border-left: 1px solid #d1d1d1;
					border-right: 1px solid #d1d1d1;
				}
				th:nth-child(5) {
					position: sticky;
					left: 165px;
					z-index: 2 !important;
					border-left: 1px solid #d1d1d1;
					border-right: 1px solid #d1d1d1;
				}
			}
		}
	}
}

.table_style_1 > .v-data-table__wrapper > table {
	max-width: calc(100% - 200px);
	width: calc(100% - 200px);
	tbody {
		tr {
			// td:not(:last-of-type) {

			// }
			td {
				height: 50px;
				text-align: center !important;
				background-color: #ffffff !important;
			}
			td:nth-child(1) {
				position: sticky;
				left: 0;
				z-index: 2 !important;
				border-left: 1px solid #d1d1d1;
				// border-right: 1px solid #d1d1d1;
			}
			td:nth-child(2) {
				position: sticky;
				left: 65px;
				z-index: 2 !important;
				border-left: 1px solid #d1d1d1;
				// border-right: 1px solid #d1d1d1;
			}
			td:nth-child(3) {
				position: sticky;
				left: 165px;
				z-index: 2 !important;
				border-left: 1px solid #d1d1d1;
				border-right: 1px solid #d1d1d1;
			}
			th:nth-child(4) {
				position: sticky;
				left: 165px;
				z-index: 2 !important;
				border-left: 1px solid #d1d1d1;
				border-right: 1px solid #d1d1d1;
			}
			th:nth-child(5) {
				position: sticky;
				left: 165px;
				z-index: 2 !important;
				border-left: 1px solid #d1d1d1;
				border-right: 1px solid #d1d1d1;
			}
		}
	}
}
.table_style_1 {
	.v-data-footer {
		display: flex;
		justify-content: center;
		.v-data-footer__select {
			margin-left: 0;
		}
	}
}
.table_box {
	div {
		.v-data-table__wrapper::-webkit-scrollbar {
			width: 12px;
			height: 12px;
		}
	}
}
.table_box {
	div {
		.v-data-table__wrapper::-webkit-scrollbar-thumb {
			background-color: #ced4d7;
			border-radius: 10px;
			background-clip: padding-box;
			border: 2px solid transparent;
		}
	}
}
.table_box {
	div {
		.v-data-table__wrapper::-webkit-scrollbar-track {
			background-color: transparent;
			border-radius: 10px;
			box-shadow: inset 0px 0px 5px white;
			margin-left: 465px;
		}
	}
}
.theme--light.v-data-table .v-data-footer {
	border-top: none;
}
</style>
