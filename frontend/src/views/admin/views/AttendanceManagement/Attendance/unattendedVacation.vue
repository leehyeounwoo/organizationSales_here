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
					<datatable :datatable="unattendedTable" @click="checkVacationData" class="table_header datatablehover3"></datatable>
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

							<v-flex class="nomal-input-type px-2" xs9>
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
								<v-radio-group v-model="right.radio" row class="project_message">
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
							<v-layout justify-end>
								<v-btn @click="reset()" dense width="100" height="26" dark color="#5b5b5b" class="mr-3">확인</v-btn>
								<v-btn @click="businessAdd" dense width="100" height="26" dark color="#0500B7">{{ saveButton }}</v-btn>
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
	computed: {
		saveButton() {
			return this.rightInfoBottom[0].radio === 'disagree' ? '저장' : '일괄저장'
		},
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
				title: '미처리 연차 신청 저장',
				content: `승인 결과를 저장합니다 \n 반려되지 않은 모든 연차가 승인처리됩니다`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			unattendedTable: {
				itemKey: 'date',
				headers: [
					{ text: '이름', value: 'username' },
					{ text: '신청일', value: 'date' },
					{ text: '연락처', value: 'phoneNumber' },
					{ text: '지점', value: 'businessName' },
					{ text: '팀', value: 'team_rank' },
					{ text: '근무기간', value: 'duration' },
					{ text: '내용', value: 'vacationType' },
					{ text: '비고', value: 'detailEtc' },
				],
				class: 'datatablehover3',
				items: [],
				selected: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
			},

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
			currentVacationData: {},
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
			this.currentVacationData = {}
			this.rightInfoBottom[1].value = ''
			this.rightInfoTop[0].value = ''
			this.rightInfoTop[1].value = ''
			this.rightInfoTop[2].value = ''
			this.setdialog.dialog = false
		},

		async clickSave() {
			this.$store.state.loading = true
			if (this.rightInfoBottom[0].radio === 'agree') {
				for (let i = 0; i < this.vacationData.length; i++) {
					let input = {
						date: this.vacationData[i].date,
						userID: this.vacationData[i].userID,
						status: 'vacation',
						vacation: this.vacationData[i].id,
					}
					await this.$store.dispatch('createGotowork', input).then(res => {
						let input2 = {
							id: this.vacationData[i].id,
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
				}
			} else {
				let input2 = {
					id: this.currentVacationData.id,
					rejectComment: this.rightInfoBottom[1].value,
					adminInfo: this.$store.state.meData,
					vacationStatus: 'disagree',
				}
				this.$store.dispatch('updateVacation', input2).then(async () => {
					this.sweetDialog.open = false
					this.currentVacationData = {}
					this.rightInfoBottom[1].value = ''
					this.rightInfoTop[0].value = ''
					this.rightInfoTop[1].value = ''
					this.rightInfoTop[2].value = ''
					await this.getTeams()
					await this.getRanks()
					let input3 = {
						start: 0,
						limit: 10,
						vacationStatus: 'waiting',
					}
					let input = {
						start: 0,
						limit: 10,
						roleName: 'Counselor',
						businessID: this.$store.state.businessSelectBox.value,
						idArr: this.userIDArr,
					}
					await this.vacationView(input3)
					await this.viewUsers(input)
					await this.dataSetting()
					this.$emit('update')
					this.$store.state.loading = false
				})
			}
		},

		checkVacationData(val) {
			this.currentVacationData = {}
			this.currentVacationData = val
			this.rightInfoTop[0].value = val.date
			this.rightInfoTop[1].value = val.vacationType
			this.rightInfoTop[2].value = val.vacationReason
		},

		async businessAdd() {
			if (this.rightInfoBottom[0].radio === 'disagree' && Object.keys(this.currentVacationData).length === 0) {
				this.sweetInfo.title = '반려 실패'
				this.sweetInfo.content = '반려할 연차를 선택해주세요'
				return (this.sweetInfo.open = true)
			}
			if (this.rightInfoBottom[0].radio === 'disagree' && this.rightInfoBottom[1].value === '') {
				this.sweetInfo.title = '반려사유 에러'
				this.sweetInfo.content = `반려사유를 입력해 주세요.`
				return (this.sweetInfo.open = true)
			}
			if (this.rightInfoBottom[0].radio === 'disagree') {
				this.sweetDialog.title = '미처리 연차 신청 반려'
				this.sweetDialog.content = '해당 연차를 반려합니다'
				return (this.sweetDialog.open = true)
			}
			this.sweetDialog.open = true
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
				const currentDate = new Date()

				res.users.forEach(element => {
					this.vacationData.forEach((item, index) => {
						if (item.userID === element.id) {
							this.vacationData[index]['username'] = element.username
							this.vacationData[index]['phoneNumber'] = element.phoneNumber
								? element.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
								: '-'
							this.vacationData[index]['businessID'] = element.businessID
							let itemName = ''
							for (let i = 0; i < this.$store.state.businessSelectBox.items.length; i++) {
								if (this.$store.state.businessSelectBox.items[i].id === element.businessID) {
									itemName = this.$store.state.businessSelectBox.items[i].name
									break
								} else {
									itemName = '-'
								}
							}
							const createdAtDate = new Date(element.created_at)
							const timeDiff = Math.abs(currentDate - createdAtDate)
							const daysPassed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
							const yearsPassed = Math.floor(daysPassed / 365)
							const monthsPassed = Math.floor((daysPassed % 365) / 30)
							const remainingDays = daysPassed % 30
							const formattedDuration = `${yearsPassed}년 ${monthsPassed}개월 ${remainingDays}일`
							this.vacationData[index]['duration'] = formattedDuration
							this.vacationData[index]['businessName'] = itemName
							this.vacationData[index]['teamID'] = element.teamID
							this.vacationData[index]['rankID'] = element.rankID

							this.unattendedTable.page = input.page
						}
					})
				})
			})
		},

		async vacationView(item) {
			await this.$store.dispatch('vacations', item).then(res => {
				this.unattendedTable.total = res.vacations.length
				let list = []
				for (let i = 0; i < res.vacations.length; i++) {
					this.userIDArr.push(res.vacations[i].userID)
				}
				res.vacations.forEach(el => {
					let listData = {}
					listData.all = el
					listData.id = el.id
					listData.date = el.date
					listData.created_at = this.$moment(el.created_at).format('YYYY-MM-DD')
					listData.userID = el.userID
					listData.vacationReason = el.vacationReason
					listData.vacationStatus = el.vacationStatus
					listData.vacationType =
						el.vacationType === 'vacation'
							? '연차'
							: el.vacationType === 'morningVacation'
							? '오전반차'
							: el.vacationType === 'afternoonVacation'
							? '오후반차'
							: el.vacationType === 'sick'
							? '병가'
							: el.vacationType === 'etc'
							? '기타'
							: ''
					listData.rejectComment = el.rejectComment
					listData.gotoworksAll = []
					list.push(listData)
				})
				this.vacationData = list
			})
		},
		async dataSetting() {
			for (let index = 0; index < this.vacationData.length; index++) {
				const element = this.vacationData[index]
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

				element.teamItems = this.teamData
				element.rankItems = this.rankData
			}
			this.unattendedTable.items = JSON.parse(JSON.stringify(this.vacationData))
		},
	},
	async created() {
		await this.me()
		await this.getTeams()
		await this.getRanks()
		let input3 = {
			start: 0,
			limit: 10,
			vacationStatus: 'waiting',
		}
		let input = {
			start: 0,
			limit: 10,
			roleName: 'Counselor',
			businessID: this.$store.state.businessSelectBox.value,
			idArr: this.userIDArr,
		}
		await this.vacationView(input3)
		await this.viewUsers(input)
		await this.dataSetting()
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
