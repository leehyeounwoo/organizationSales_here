<template>
	<v-dialog v-model="setdialog.dialog" persistent max-width="1800">
		<div class="create_wrap">
			<div class="project_title px-5" :style="`background-color:#323153`">
				<h2 style="font-size:15px">{{ setdialog.title }}</h2>
				<v-spacer />
				<v-icon @click="reset()" class="title-icon" color="white">mdi-close</v-icon>
			</div>

			<v-layout class="ml-8 mt-8 mr-14" wrap>
				<v-flex xs8>
					<v-layout align-center>
						<div class="slash mr-1"></div>
						<span class="title_font">
							고객목록
						</span>
					</v-layout>

					<datatable :datatable="attendanceTable" class="table_header datatablehover3"></datatable>
				</v-flex>
				<v-flex xs4 class="pl-11">
					<v-layout align-center>
						<div class="slash mr-1"></div>
						<span class="title_font">
							신청 내용
						</span>
					</v-layout>
					<div class="mt-2 sub_font ">
						<v-layout wrap align-center justify-center v-for="(right, index) in rightInfoTop" :key="index" :style="'height:40px;'">
							<v-flex xs3 class="dialog_table">
								<v-layout align-center class="nomal-info" :style="'height:40px;'">
									<v-flex class="info_title">
										{{ right.title }}
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex class="nomal-input-type px-2" xs9 v-if="index === 2">
								<v-layout align-center>
									<v-flex xs4>
										<txtField class="bizInput" v-model="right.value" :txtField="right.txtfield"></txtField>
									</v-flex>
									<v-flex xs1 style="text-align:center;">
										~
									</v-flex>
									<v-flex xs4>
										<txtField class="bizInput" v-model="right.value2" :txtField="right.txtfield"></txtField>
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex class="nomal-input-type px-2" xs9 v-else>
								<txtField class="bizInput" v-model="right.value" :txtField="right.txtfield"></txtField>
							</v-flex>
						</v-layout>
					</div>
					<v-layout align-center mt-2>
						<div class="slash mr-1"></div>
						<span class="title_font">
							처리
						</span>
					</v-layout>
					<div class="mt-2 sub_font ">
						<v-layout wrap align-center justify-center v-for="(right, index) in rightInfoBottom" :key="index" :style="'height:40px;'">
							<v-flex xs3 class="dialog_table">
								<v-layout align-center class="nomal-info" :style="'height:40px;'">
									<v-flex class="info_title">
										{{ right.title }}
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex class="nomal-input-type px-2" xs9 v-if="index === 0">
								<v-radio-group v-model="right.radio" :disabled="setdialog.editData.vacation !== 'waiting'" row class="project_message">
									<v-radio label="승인" value="agree" color="#2699FB" @click="click_radio()"></v-radio>
									<v-radio label="반려" value="disagree" color="#2699FB" @click="click_radio()"></v-radio>
								</v-radio-group>
							</v-flex>
							<v-flex class="nomal-input-type px-2" xs9 v-else>
								<txtField class="bizInput" v-model="right.value" :txtField="right.txtfield"></txtField>
							</v-flex>
						</v-layout>
					</div>
					<v-layout wrap class="pt-10">
						<v-flex xs12 class="ml-auto mb-8">
							<v-layout justify-end v-if="setdialog.editData.vacation === 'waiting'">
								<v-btn @click="setdialog.dialog = false" dense width="100" height="26" dark color="#5B5B5B" class="mr-3">취소</v-btn>
								<v-btn @click="businessAdd" dense width="100" height="26" dark color="#0500B7">저장</v-btn>
							</v-layout>
							<v-layout justify-end v-else>
								<v-btn @click="setdialog.dialog = false" dense width="100" height="26" dark color="#0500B7" class="mr-3">확인</v-btn>
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
import { txtField, sweetAlert, datatable } from '@/components/index.js'
export default {
	components: {
		txtField,
		sweetAlert,
		datatable,
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
			attendanceTable: {
				itemKey: 'date',
				headers: [
					{ text: '이름', value: 'date' },
					{ text: '연락처', value: 'startWork' },
					{ text: '지점', value: 'endWork' },
					{ text: '팀', value: 'len' },
					{ text: '근무기간', value: 'workStatus' },
					{ text: '내용', value: 'workStatus' },
					{ text: '비고', value: 'workStatus' },
				],
				class: 'datatablehover3',
				items: [],
				selected: [],
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
						maxlength: '15',
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
						placeholder: '',
						readonly: true,
					},

					required: true,
				},
				{
					title: '근무기간',
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
			rightInfoTop: [
				{
					value: '',
					title: '신청일',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '',
						readonly: true,
					},
				},
				{
					value: '',
					title: '유형',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						readonly: true,
					},
				},
				{
					value: '',
					value2: '',
					title: '기간',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						readonly: true,
					},
				},
				{
					value: '',
					title: '사유',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						readonly: true,
					},
				},
			],
			rightInfoBottom: [
				{
					radio: 'agree',
					title: '승인여부',
				},
				{
					value: '',
					title: '반려사유',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						disable: true,
					},
				},
			],
			userLists: [],
			userIDArr: [],
			teamData: [],
			rankData: [],
			vacationData: [],
		}
	},
	methods: {
		click_radio() {
			if (this.rightInfoBottom[0].radio === 'agree') {
				this.rightInfoBottom[1].txtfield.disable = true
				this.rightInfoBottom[1].value = ''
			} else {
				this.rightInfoBottom[1].txtfield.disable = false
			}
		},
		reset() {
			this.setdialog.dialog = false
		},

		async clickSave() {
			this.$store.state.loading = true
			if (this.rightInfoBottom[0].radio === 'agree') {
				// const startDate = this.$moment(this.setdialog.editData.vacationStart)
				// const currentDate = startDate.clone()
				let input = {
					date: this.setdialog.editData.vacationDate,
					userID: this.setdialog.editData.id,
					status: 'vacation',
					vacation: this.setdialog.editData.vacationID,
				}

				await this.$store.dispatch('createGotowork', input).then(res => {
					let input2 = {
						id: this.setdialog.editData.vacationID,
						vacationStatus: 'agree',
						gotowork: res.createGotowork.gotowork.id,
						adminInfo: this.$store.state.meData,
					}
					this.$store.dispatch('updateVacation', input2).then(() => {
						this.sweetDialog.open = false
						this.setdialog.dialog = false
						this.$emit('update')
						this.$store.state.loading = false
					})
				})
			} else {
				let input2 = {
					id: this.setdialog.editData.vacationID,
					rejectComment: this.rightInfoBottom[1].value,
					adminInfo: this.$store.state.meData,
					vacationStatus: 'disagree',
				}
				this.$store.dispatch('updateVacation', input2).then(() => {
					this.sweetDialog.open = false
					this.setdialog.dialog = false
					this.$emit('update')
					this.$store.state.loading = false
				})
			}
		},

		async businessAdd() {
			if (this.rightInfoBottom[0].radio === 'disagree' && this.rightInfoBottom[1].value === '') {
				this.sweetInfo.title = '반려사유 에러'
				this.sweetInfo.content = `반려사유를 입력해 주세요.`
				return (this.sweetInfo.open = true)
			}
			this.sweetDialog.open = true
		},
		async getworkTime() {
			this.$store.state.loading = true

			let input = {
				user: this.setdialog.editData.all.id,
				status_check: ['startWork', 'endWork'],
			}
			await this.$store.dispatch('gotoWork', input).then(res => {
				console.log(res)
				this.leftInfoTop[6].value = res.gotoworksConnection.aggregate.count + '일'
				this.$store.state.loading = false
			})
		},
		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.me
			})
		},
		async getTeams() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
			}

			await this.$store.dispatch('teams', data).then(res => {
				this.teamData = res.teams
			})
		},
		async getRanks() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.$store
				.dispatch('ranks', data)
				.then(res => {
					this.rankData = res.ranks
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async viewUsers(input) {
			await this.$store.dispatch('users', input).then(res => {
				let list = []
				for (let i = 0; i < res.users.length; i++) {
					this.userIDArr.push(res.users[i].id)
				}
				res.users.forEach(element => {
					let listData = {}
					listData.all = element
					listData.id = element.id
					listData.data1 = element.username
					listData.data2 = element.phoneNumber ? element.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) : '-'
					listData.data3 = '-'
					listData.data4 = '-'
					listData.data5 = '미확인'
					listData.gotoworksAll = []
					listData.vacations = []
					listData.salesPhoneNumber = element.salesPhoneNumber
						? element.salesPhoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						: '-'
					listData.created_at = this.$moment(element.created_at).format('YYYY-MM-DD')
					listData.teamID = element.teamID ? element.teamID : '-'
					listData.rankID = element.rankID ? element.rankID : '-'
					listData.history = element.history ? element.history : []
					listData.data5 === '미확인' ? (listData.vacation = '-') : ''
					list.push(listData)
					this.attendanceTable.total = res.usersConnection.aggregate.count
					this.attendanceTable.page = input.page
				})
				this.userLists = list
			})
		},
		async gotoworksView(input2) {
			await this.$store.dispatch('gotoWork', input2).then(res2 => {
				res2.gotoworks.forEach(element2 => {
					let workIndex = this.userLists.findIndex(item => item.id === element2.userID)
					this.userLists[workIndex]['gotoworksAll'] = element2 ? element2 : []
					this.userLists[workIndex]['data3'] = element2.startWork !== null ? this.$moment(element2.startWork)._i.slice(0, 5) : '-'
					this.startTime = element2.startWork !== null ? this.$moment(element2.startWork)._i.slice(0, 5) : '-'
					this.userLists[workIndex]['data4'] = element2.endWork !== null ? this.$moment(element2.endWork)._i.slice(0, 5) : '-'
					this.endTime = element2.endWork !== null ? this.$moment(element2.endWork)._i.slice(0, 5) : '-'
					this.userLists[workIndex]['data5'] =
						element2.status === 'endWork'
							? '퇴근'
							: element2.status === 'afternoonVacation'
							? '오후반차'
							: element2.status === 'morningVacation'
							? '오전반차'
							: element2.status === 'vacation'
							? '휴가'
							: '출근'
					if (element2.status === 'vacation') {
						this.userLists[workIndex]['data6'] = true
						this.userLists[workIndex]['data7'] = true
						this.userLists[workIndex]['data8'] = '-'
					} else {
						this.userLists[workIndex]['data6'] = element2.startWork ? true : false
						this.userLists[workIndex]['data7'] = element2.endWork ? true : false
					}

					// if (element2.startWork && element2.endWork) {
					// 	this.userLists[workIndex]['data8'] = this.timeCheck(element2.startWork, element2.endWork)
					// }
				})
			})
		},
		async vacationView(item) {
			await this.$store.dispatch('vacations', item).then(res => {
				console.log(res)
				res.vacations.forEach(el => {
					this.vacationData = el
					let workIndex = this.userLists.findIndex(item => item.id === el.userID)
					this.userLists[workIndex]['vacations'] = el
					// this.userLists[workIndex]['vacationStart'] = el.start
					// this.userLists[workIndex]['vacationEnd'] = el.end
					this.userLists[workIndex]['vacationDate'] = el.date
					this.userLists[workIndex]['vacationReason'] = el.vacationReason
					this.userLists[workIndex]['vacation'] = el.vacationStatus
					this.userLists[workIndex]['vacationType'] = el.vacationType
					this.userLists[workIndex]['vacationCreated_at'] = el.created_at
					this.userLists[workIndex]['vacationID'] = el.id
					this.userLists[workIndex]['vacationRejectComment'] = el.rejectComment
				})
				console.log(this.vacationData)
			})
		},
		async dataSetting() {
			for (let index = 0; index < this.userLists.length; index++) {
				const element = this.userLists[index]
				let teamData = this.teamData.filter(x => x.id === element.teamID)[0]
				let rankData = this.rankData.filter(x => x.id === element.rankID)[0]

				let teamTitle = '-'
				let rankTitle = '-'
				if (teamData) {
					teamTitle = teamData.id
					element.teamTitle = teamTitle
				}
				if (rankData) {
					rankTitle = rankData.id
					element.rankTitle = rankTitle
				}
				if (teamData && rankData) {
					element.team_rank = `${teamData.title} / ${rankData.rankName}`
				} else {
					element.team_rank = '-'
				}
				element.salesPhoneNumber_txtField = {
					value: '',
					txtfield: {
						maxlength: '255',
						outlined: true,
						hideDetail: false,
						errorMessage: '',
						placeholder: '',
					},
				}
				element.workingStatusName = element.workingStatus ? '재직' : '퇴사'
				element.created_at_format = this.$moment(element.created_at).format('YYYY년MM월DD일')
				element.teamItems = this.teamData
				element.rankItems = this.rankData
			}
			this.attendanceTable.items = JSON.parse(JSON.stringify(this.userLists))
			this.attendanceTable.origin_items = JSON.parse(JSON.stringify(this.userLists))
		},
	},
	async created() {
		await this.me()
		await this.getTeams()
		await this.getRanks()
		let input = {
			start: 0,
			limit: 10,
			roleName: 'Counselor',
			businessID: this.$store.state.businessSelectBox.value,
		}
		await this.viewUsers(input)
		let input2 = {
			start: 0,
			limit: 10,
			date: this.$moment().format('YYYY-MM-DD'),
			roleName: 'Counselor',
			userID: this.userIDArr,
		}
		let input3 = {
			start: 0,
			limit: 10,
			vacationStatus: 'waiting',
			userID: this.userIDArr,
		}
		await this.gotoworksView(input2)
		await this.vacationView(input3)
		console.log(this.userLists)
		// await this.dataSetting()
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
