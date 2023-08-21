<template>
	<div class="counselor_container " style="overflow: hidden;">
		<div :class="reservationStatus ? 'counsel_create_wrap' : 'counselor_content_wrap'" class="sticky_wrap small_sticky_header pt-0">
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="to_bizDashboard()">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						근태관리
					</span>
				</v-layout>
			</div>
			<div class="px-2 pb-10" style="width:100vw;">
				<v-layout align-center class="date_filter_holyday mt-1 mx-1">
					<div>
						<DatepickerDialog
							:picker="startPicker"
							:allowed_dates="allowed_datesStart"
							class="super_dense"
							@input="headerCheckAction(startPicker.date, endPicker.date)"
						></DatepickerDialog>
					</div>
					<div class="mx-2">
						~
					</div>
					<div>
						<DatepickerDialog
							:picker="endPicker"
							:allowed_dates="allowed_datesEnd"
							class="super_dense"
							@input="headerCheckAction(startPicker.date, endPicker.date)"
						></DatepickerDialog>
					</div>
					<div class="ml-1">
						<v-btn
							style="background-color:#633efd; font-size:0.8rem;"
							dark
							rounded
							depressed
							@click="reservationStatus = !reservationStatus"
							height="25"
							>연차신청</v-btn
						>
					</div>
				</v-layout>
				<v-layout v-if="!reservationStatus" style="font-size:0.75rem; justify-content: left; color:#633efd;" mb-2>
					※ 휴무일은 3일전에 신청해주세요.
				</v-layout>

				<v-layout v-else style="font-size:0.75rem; justify-content: right; color:#633efd;" mb-2>
					※ 연차 신청이 불가한 날은 관리자에게 직접 문의하세요
				</v-layout>

				<!-- <v-layout style="font-size:0.75rem; justify-content: right; color:#633efd;" mb-2>
					연차 사용가능일은 {{ ' ' }} <span style="font-weight:bold;">{{ vacation_input }}일</span> {{ ' ' }}입니다.
				</v-layout> -->
				<v-layout wrap>
					<v-layout py-1 align-center style="background-color:#633efd; border-radius:5px; color:white; height:auto; font-size: 0.75rem;">
						<v-flex style="text-align: center;" xs5>일자</v-flex>
						<v-flex style="text-align: center;" xs2>출근</v-flex>
						<v-flex style="text-align: center;" xs2>퇴근</v-flex>
						<v-flex style="text-align: center;" xs3>근무시간</v-flex>
					</v-layout>
				</v-layout>
				<div v-for="(date, index) in workDate" :key="index">
					<v-layout v-if="holiDayCheck(date)" style="font-size: 0.75rem;" justify-center align-center>
						<div class="contentCheckBox" v-if="reservationStatus">
							<v-checkbox v-model="date.checkBoxValue" color="primary2" hide-details :disabled="checkBoxStatus(date)"></v-checkbox>
						</div>
						<v-flex
							py-1
							my-1
							mr-1
							style="text-align: center; background-color:white; border-radius:5px; color:black;"
							:style="$moment().format('YYYY-MM-DD') === date.date ? 'color:#633efd; font-weight:bold;' : ''"
							xs5
							>{{ dayCheck(date.date) }}</v-flex
						>
						<v-flex py-1 my-1 style="text-align: center; background-color:white; border-radius:5px; color:black;" xs7>
							<v-layout justify-center align-center>
								<v-flex style="text-align: center;" xs3>{{ date.startWork ? $moment(date.startWork).format('HH:mm') : '-' }}</v-flex>
								<v-flex style="text-align: center;" xs3>{{ date.endWork ? $moment(date.endWork).format('HH:mm') : '-' }}</v-flex>
								<v-flex style="text-align: center;" xs6>{{
									date.startWork && date.endWork ? timeCheck(date.startWork, date.endWork) : '-'
								}}</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
					<v-layout v-else style="font-size: 0.75rem;" justify-center align-center>
						<div class="contentCheckBox" v-if="reservationStatus">
							<v-checkbox v-model="date.checkBoxValue" hide-details :disabled="checkBoxStatus(date)"></v-checkbox>
						</div>
						<v-flex
							v-if="!date.agree"
							py-1
							my-1
							mr-1
							style="text-align: center; background-color:#633efd; border-radius:5px; color:black; border:1px solid #633efd; color:white;"
							xs5
							>{{
								date.status === 'vacation'
									? '연차승인'
									: date.status === 'afternoonVacation'
									? '오후반차승인'
									: date.status === 'morningVacation'
									? '오전반차승인'
									: date.status === 'sick'
									? '병가승인'
									: '기타승인'
							}}
						</v-flex>
						<!-- <v-flex
							v-else-if="date.result === 'disagree'"
							py-1
							my-1
							mr-1
							style="text-align: center; background-color:white; border-radius:5px; color:black; border:1px solid #633efd; color:#633efd;"
							xs5
							>{{ date.status === 'vacation' ? '연차신청' : date.status === 'afternoonVacation' ? '오후반차신청' : '오전반차신청' }}
						</v-flex> -->
						<v-flex
							v-else
							py-1
							my-1
							mr-1
							style="text-align: center; background-color:white; border-radius:5px; color:black; border:1px solid #633efd; color:#633efd;"
							xs5
							>{{
								date.status === 'vacation'
									? '연차신청'
									: date.status === 'afternoonVacation'
									? '오후반차신청'
									: date.status === 'morningVacation'
									? '오전반차신청'
									: date.status === 'sick'
									? '병가신청'
									: '기타신청'
							}}
						</v-flex>
						<v-flex py-1 my-1 style="text-align: center; background-color:white; border-radius:5px; color:black;" xs7>
							<v-layout justify-center align-center>
								<v-flex style="text-align: center;" xs3>{{ date.startWork ? $moment(date.startWork).format('HH:mm') : '-' }}</v-flex>
								<v-flex style="text-align: center;" xs3>{{ date.endWork ? $moment(date.endWork).format('HH:mm') : '-' }}</v-flex>
								<v-flex style="text-align: center;" xs6>{{
									date.startWork && date.endWork ? timeCheck(date.startWork, date.endWork) : '-'
								}}</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</div>
			</div>
			<div style="width:100%; position: fixed; bottom: 60px;">
				<v-btn v-if="reservationStatus" class="bottom_fix" color="primary2" block tile dark depressed @click="holyDayAction()">
					신청하기
				</v-btn>
			</div>
			<!-- 일반 푸터 -->
			<!-- <counselorFooter v-if="!reservationStatus" class="bottom_fix" /> -->
		</div>
		<applicationDialogVue v-if="workDate.length > 0" :dialog="applicationDialog" :checkData="dialogData"></applicationDialogVue>
		<disagreeDialogVue v-if="workDate.length > 0" :dialog="disagreeDialog" :checkData="disagreeArrData"></disagreeDialogVue>
	</div>
</template>
<script>
import { DatepickerDialog } from '@/components'
import applicationDialogVue from './applicationDialog.vue'
import disagreeDialogVue from './disagreeDialog.vue'
export default {
	data() {
		return {
			disagreeArrData: [],
			dialogData: [],
			applicationDialog: {
				open: false,
				type: 'application',
			},
			disagreeDialog: {
				open: false,
				type: 'application',
			},
			startPicker: {
				class: 'super_dense',
				date: this.$moment()
					.subtract(15, 'd')
					.format('YYYY-MM-DD'),
			},
			endPicker: {
				class: 'super_dense',
				date: this.$moment()
					.add(15, 'd')
					.format('YYYY-MM-DD'),
			},
			workDate: [],
			reservationStatus: false,
			vacation_input: 0,
		}
	},
	watch: {
		applicationDialog: {
			deep: true,
			handler() {
				this.reservationStatus = false
				this.workDate.forEach(element => {
					element.checkBoxValue = false
				})
				this.headerCheckAction(this.startPicker.date, this.endPicker.date)
			},
		},
		reservationStatus() {
			this.workDate.forEach(element => {
				element.checkBoxValue = false
			})
		},
	},
	methods: {
		holyDayAction() {
			const filterData = this.workDate.filter(x => x.checkBoxValue === true)
			if (filterData.length > 0) {
				this.dialogData = filterData
				if (this.dialogData.length > 0) {
					this.applicationDialog.open = true
				}
			} else {
				alert('신청하실 날짜를 선택해주세요.')
			}
		},
		to_bizDashboard() {
			// 뒤로가기 버튼
			this.$router.go(-1)
		},
		systemsView(variable) {
			this.$store
				.dispatch('systems', variable)
				.then(res => {
					console.log(res)
					this.vacation_input = res.systems[0].vacationReservation
				})
				.catch(err => {
					console.log({ err })
					this.$store.state.loading = false
				})
		},
		checkBoxStatus(val) {
			if (this.$moment(val.date) > this.$moment().add(this.vacation_input, 'd')) {
				if (
					val.status === 'vacation' ||
					val.status === 'morningVacation' ||
					val.status === 'afternoonVacation' ||
					val.status === 'etc' ||
					val.status === 'sick'
				) {
					if (val.result === 'disagree') {
						return false
					} else {
						return true
					}
				} else {
					return false
				}
			} else {
				return true
			}
		},
		dayOfTheWeek(val) {
			if (val === '0') {
				return '(일)'
			} else if (val === '1') {
				return '(월)'
			} else if (val === '2') {
				return '(화)'
			} else if (val === '3') {
				return '(수)'
			} else if (val === '4') {
				return '(목)'
			} else if (val === '5') {
				return '(금)'
			} else if (val === '6') {
				return '(토)'
			}
		},
		dayCheck(val) {
			return this.$moment(val).format('gg.MM.DD') + ' ' + this.dayOfTheWeek(this.$moment(val).format('e'))
		},
		holiDayCheck(val) {
			if (
				val.status === 'vacation' ||
				val.status === 'morningVacation' ||
				val.status === 'afternoonVacation' ||
				val.status === 'waiting' ||
				val.status === 'etc' ||
				val.status === 'sick'
			) {
				if (val.result === 'disagree') {
					return true
				} else {
					return false
				}
			} else {
				return true
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
		headerCheckAction(startDate, endDate) {
			const moment = require('moment')
			let count = moment.duration(this.$moment(endDate).diff(this.$moment(startDate))).asDays() + 1
			let result = []
			for (let index = 0; index < count; index++) {
				let day = this.$moment(startDate)
					.add(index, 'd')
					.format('YYYY-MM-DD')
				result.push({
					date: day,
					startWork: '',
					endWork: '',
					workTime: '',
					status: '',
					checkBoxValue: false,
					comment: '',
					textAreaStatus: true,
				})
			}
			this.workDate = result
			const data = {
				business: this.$store.state.meData.businessID,
				date_gte: this.startPicker.date,
				date_lte: this.endPicker.date,
				id: this.$store.state.meData.id,
			}
			this.usersView(data)
		},
		allowed_datesEnd(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment(this.startPicker.date).format('YYYY-MM-DD') <= val
			}
			return val
		},
		allowed_datesStart(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment(this.endPicker.date).format('YYYY-MM-DD') >= val
			}
			return val
		},
		usersView(data) {
			this.$store
				.dispatch('users', data)
				.then(res => {
					console.log(res)
					res.users[0].gotoworks.forEach(element => {
						let idx = this.workDate.findIndex(x => x.date === element.date)
						let arr = this.workDate.filter(x => x.date === element.date)
						if (arr.length > 0) {
							arr[0].startWork = element.startWork
							arr[0].endWork = element.endWork
							arr[0].status = element.status
						}
						this.workDate[idx] = arr[0]
					})
					this.workDate.forEach(element => {
						element.dialogType = 'morningVacation'
					})
					let disagreeArr = []
					res.users[0].vacations.forEach((element, index) => {
						let idx = this.workDate.findIndex(x => x.date === element.vacationDate && x.status === 'waiting' && x.status === 'disagree')
						let arr = this.workDate.filter(x => x.date === element.vacationDate)
						if (arr.length > 0) {
							arr[0].startWork = element.startWork
							arr[0].endWork = element.endWork
							arr[0].status = element.type
							arr[0].result = element.status

							if (element.status === 'agree' || element.status === 'admin') {
								arr[0].agree = false
							} else {
								arr[0].agree = true
							}
						}

						if (!element.viewStatus) {
							element.dialogType = element.type
							element.date = element.vacationDate
							disagreeArr.push(element)

							this.disagreeDialog.open = true
						}
						if (index === res.users[0].vacations.length - 1) {
							this.disagreeArrData = disagreeArr
						}
						this.workDate[idx] = arr[0]
					})
					this.workDate.forEach(element => {
						element.dialogType = 'morningVacation'
					})
				})
				.catch(err => {
					console.log({ err })
				})
		},
	},
	created() {
		const meDataCheck = setInterval(() => {
			let ok = 0
			ok += 1
			if (this.$store.state.meData.businessID) {
				this.headerCheckAction(this.startPicker.date, this.endPicker.date)
				const data1 = { business: this.$store.state.meData.businessID }
				this.systemsView(data1)
				clearInterval(meDataCheck)
			} else if (ok === 5) {
				clearInterval(meDataCheck)
			}
		}, 1000)
	},
	components: {
		disagreeDialogVue,
		applicationDialogVue,
		DatepickerDialog,
		// counselorFooter,
	},
}
</script>
<style lang="scss">
.contentCheckBox > div > div > div > div > i.theme--light.v-icon {
	color: #633efd;
}
.reserve-datepicker {
	.v-date-picker-table--date .v-btn {
		border-radius: 0px !important;
	}
	.theme--light.v-btn.v-btn--disabled {
		color: white !important;
		background-color: #b2b2b2 !important;
	}
}

.contentCheckBox > div {
	margin-top: 0px;
	padding-top: 0px;
}
.layout.date_filter_holyday.mt-1.mx-1.align-center > div.ml-1 > button {
	height: 30px;
}
</style>
