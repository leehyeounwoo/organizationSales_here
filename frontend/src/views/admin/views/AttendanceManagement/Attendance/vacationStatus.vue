<template>
	<v-dialog v-model="setdialog.dialog" persistent max-width="1100">
		<div class="create_wrap">
			<div class="project_title px-5" :style="`background-color:#323153`">
				<h2 style="font-size:15px">{{ setdialog.title }}</h2>
				<v-spacer />
				<v-icon @click="reset()" class="title-icon" color="white">mdi-close</v-icon>
			</div>

			<v-layout class="ml-8 mt-8 mr-14" wrap>
				<v-flex xs6>
					<v-layout align-center>
						<div class="slash mr-1"></div>
						<span class="title_font">
							신청 직원 정보
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
				<v-flex xs6 class="pl-11">
					<v-layout align-center>
						<div class="slash mr-1"></div>
						<span class="title_font">
							신청 직원 정보
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
								<!-- res.data.updateVacation.vacation.gotowork.id -->
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
							<v-layout justify-end v-if="setdialog.editData.vacation === 'waiting' || setdialog.editData.vacation === 'disagree'">
								<v-btn @click="setdialog.dialog = false" dense width="100" height="26" dark color="#5B5B5B" class="mr-3">취소</v-btn>
								<v-btn @click="businessAdd" dense width="100" height="26" dark color="#0500B7">저장</v-btn>
							</v-layout>
							<v-layout justify-end v-else-if="setdialog.editData.vacation === 'agree'">
								<v-btn @click="setdialog.dialog = false" dense width="100" height="26" dark color="#5B5B5B" class="mr-3">취소</v-btn>
								<v-btn @click="businessEdit" dense width="100" height="26" dark color="#0500B7">수정</v-btn>
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
import { txtField, sweetAlert } from '@/components/index.js'
export default {
	components: {
		txtField,
		sweetAlert,
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
		}
	},
	methods: {
		click_radio() {
			if (this.rightInfoBottom[0].radio === 'agree') {
				this.rightInfoBottom[1].txtfield.disable = true
				this.rightInfoBottom[1].value = ''
			} else {
				this.rightInfoBottom[1].txtfield.disable = false
				this.rightInfoBottom[1].txtfield.readonly = false
				this.rightInfoBottom[1].value = ''
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
			} else if (this.setdialog.editData.vacation === 'agree') {
				let input = {
					id: this.setdialog.editData.vacationID,
					rejectComment: this.rightInfoBottom[1].value,
					adminInfo: this.$store.state.meData,
					vacationStatus: 'disagree',
				}
				this.$store.dispatch('updateVacation', input).then(res => {
					this.$store.dispatch('deleteGotowork', { id: res.updateVacation.vacation.gotowork.id }).then(() => {
						this.sweetDialog.open = false
						this.setdialog.dialog = false
						this.$emit('update')
						this.$store.state.loading = false
					})
				})
			} else {
				let input = {
					id: this.setdialog.editData.vacationID,
					rejectComment: this.rightInfoBottom[1].value,
					adminInfo: this.$store.state.meData,
					vacationStatus: 'disagree',
				}
				this.$store.dispatch('updateVacation', input).then(() => {
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
		async businessEdit() {
			if (this.rightInfoBottom[1].value === '') {
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
				this.leftInfoTop[6].value = res.gotoworksConnection.aggregate.count + '일'
				this.$store.state.loading = false
			})
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
						let itemName = ''
						for (let i = 0; i < this.$store.state.businessSelectBox.items.length; i++) {
							if (this.$store.state.businessSelectBox.items[i].id === this.setdialog.editData.all.businessID) {
								itemName = this.$store.state.businessSelectBox.items[i].name
								break
							} else {
								itemName = '-'
							}
						}
						this.leftInfoTop[3].value = itemName
						this.leftInfoTop[4].value = this.$moment(this.setdialog.editData.vacationCreated_at).format('YYYY-MM-DD HH:MM')
						this.leftInfoTop[5].value = this.setdialog.editData.team_rank

						this.rightInfoTop[0].value = this.$moment(this.setdialog.editData.vacationCreated_at).format('YYYY-MM-DD HH:MM')
						this.rightInfoTop[1].value =
							this.setdialog.editData.vacationType === 'afternoonVacation'
								? '오후 반차'
								: this.setdialog.editData.vacationType === 'morningVacation'
								? '오전 반차'
								: this.setdialog.editData.vacationType === 'sick'
								? '병가'
								: this.setdialog.editData.vacationType === 'etc'
								? '기타'
								: '연차'
						this.rightInfoTop[2].value = this.setdialog.editData.vacationDate
						this.rightInfoTop[2].value2 = this.setdialog.editData.vacationDate
						this.rightInfoTop[3].value = this.setdialog.editData.vacationReason
						if (this.setdialog.editData.vacation !== 'waiting') {
							this.rightInfoBottom[0].radio = this.setdialog.editData.vacation === 'agree' ? 'agree' : 'disagree'
							this.rightInfoBottom[1].value = this.setdialog.editData.vacationRejectComment
							this.rightInfoBottom[1].txtfield.readonly = true
						} else {
							this.rightInfoBottom[0].radio = 'disagree'
							this.rightInfoBottom[1].txtfield.disable = false
							this.rightInfoBottom[1].value = ''
							this.rightInfoBottom[1].txtfield.readonly = false
						}

						await this.getworkTime()
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
