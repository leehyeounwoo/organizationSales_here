<template>
	<div style="width:100%;">
		<v-layout class="mt-4" xs12>
			<v-flex xs4 class="mr-3">
				<v-layout align-center class="mb-3">
					<div class="slash mr-1"></div>
					<span class="title_font">
						정산금 지급 안내
					</span>
				</v-layout>
				<v-layout style="border-top:1px solid black">
					<v-flex class="notice_right_table" xs2 style="height: 52.3px; border-right:0">
						비고
					</v-flex>
					<v-flex class="notice_right_table" xs10 style="height: 52.3px;">
						내용 작성
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: auto;">
						증빙자료
					</v-flex>

					<v-flex xs10 class="notice_right_table2">
						<div v-if="addedItems.length > 0">
							<v-layout
								v-for="(item, index) of addedItems"
								:key="index"
								style="margin:12px 30px 12px 20px; justify-content: space-between;
								padding: 12px 0;"
							>
								<div class="degreeClass">
									<span
										class="spanInfoClass"
										style="color: #fff
									;"
										>{{ item.degree }}</span
									>
								</div>
								<div class="contentClass">
									<div
										style="background-color: orange;
											font-family: MalgunGothic;
											font-size: 14px;
										width: 100%; margin: 4px ; color: white;"
										v-for="(evi, idx) of item.evidence"
										:key="idx"
									>
										{{ evi }}
									</div>
								</div>
							</v-layout>
						</div>
						<v-layout style="display: flex;">
							<txtField
								:txtField="EvidenceField.degree.txtField"
								v-model="EvidenceField.degree.txtField.value"
								style="width: 20%;"
								class="search_box_admin ma-3 ml-5"
							></txtField>
							<textarea v-model="EvidenceField.evidence.txtField.value" style="width: 70%;" class="search_box_modal2 mt-3"></textarea>
						</v-layout>
						<v-btn class="infoBtn mt-2 mb-4" color="#f0f2f8" elevation="0" @click="addNewItem"
							><span
								style="	font-family: MalgunGothic;
								font-size: 14px;"
								>내용 추가</span
							></v-btn
						>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: auto">
						기타 안내
					</v-flex>
					<v-flex xs10 class="notice_right_table2 pt-3">
						<textarea
							v-model="etcInfo.txtField.value"
							placeholder="※ 증빙서류 누락시 정산 승인이 보류 될 수 있으니 확인 후 첨부바랍니다.
※ pdf, png, jpg파일만 업로드 가능합니다."
							style="width: 90%; height: 70px;"
							class="search_box_modal2 pt-2"
						></textarea>
					</v-flex>
				</v-layout>
				<v-flex style="text-align: end;">
					<v-btn
						@click="openSaveInfoModal"
						style="background-color: #3e7ccc; color: #fff;  
            width: 139px;
            height: 25px;
            margin: 9.8px 0 17.5px 7px;
            padding: 4px 19px 4px 15.4px;"
						><v-icon>mdi-check</v-icon> 지급 안내 저장</v-btn
					>
				</v-flex>
			</v-flex>

			<v-flex xs8>
				<v-layout align-center class="mb-3">
					<div class="slash mr-1"></div>
					<span class="title_font">
						정산금 지급 처리 문자 관리
					</span>
				</v-layout>
				<v-flex style="width:100%; display: flex; justify-content: space-between;">
					<datatable style="width: 100%" :datatable="evidenceTable" class="notice_table" @pagination="pagination" @click="SMSClick">
					</datatable>

					<v-flex xs7 class="ml-4">
						<v-layout style="border-top:1px solid black; height: 52.3px;">
							<v-flex class="notice_right_table" xs2 style="">
								제목
							</v-flex>
							<v-flex xs10 class="notice_right_table2">
								<txtField
									:txtField="EvidenceField.title.txtField"
									v-model="EvidenceField.title.txtField.value"
									class="search_box_admin ma-3 ml-4"
								></txtField>
							</v-flex>
						</v-layout>
						<v-layout style="height: 52.3px;">
							<v-flex class="notice_right_table" xs2>
								유형
							</v-flex>
							<v-flex xs10 class="notice_right_table2">
								<selectBox :sel="searchsel1" :class="'searchSel ml-4 mt-3'" style="font-size:12px; width: 50%;"></selectBox>
							</v-flex>
						</v-layout>
						<v-layout>
							<v-flex class="notice_right_table" xs2 style="height: 360.3px;">
								내용
							</v-flex>
							<v-flex xs10 class="notice_right_table2" style="display: flex; justify-content: center; align-items: center;">
								<textarea
									v-model="EvidenceField.sms.txtField.value"
									style="width: 90%; height: 90%; margin: 0;"
									class="search_box_modal2 pt-2 mt-2 ml-2"
								></textarea>
							</v-flex>
						</v-layout>
						<v-layout>
							<v-flex class="notice_right_table" xs2 style="height: auto;">
								상태
							</v-flex>
							<v-flex xs10 class="notice_right_table2" style="display: flex; align-items: center;">
								<v-radio-group v-model="useType" hide-details row class="notice_radio ma-2 ml-3">
									<v-radio class="mb-0 mr-5" label="사용" value="use" color="#009dac"></v-radio>
									<v-radio class="mb-0" label="미사용" value="noUse" color="#009dac"></v-radio>
								</v-radio-group>
								<v-btn class="search_btn3" style="width: 50%; " color="#3e7ccc" @click="reset">초기화</v-btn>
								<v-btn class="ml-2 search_btn3" style="width: 50%; " color="#3e7ccc" @click="saveEvedenceSMS"
									><v-icon>mdi-check</v-icon>저장</v-btn
								>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-flex>
			</v-flex>
		</v-layout>
		<sweetAlert :dialog="sweetDialog_info" />
		<sweetAlert :dialog="saveDialogStatus" @click="save_confirm" />
	</div>
</template>
<script>
import { datatable, txtField, selectBox, sweetAlert } from '@/components/index.js'

export default {
	components: {
		datatable,
		txtField,
		selectBox,
		sweetAlert,
	},

	data() {
		return {
			date: this.$moment(),
			startTimeDialog: false,
			endTimeDialog: false,
			startTime: '',
			endTime: '',
			useType: 'use',
			editGotoworkDialog: false,
			editGotoworkData: {
				title: '',
				counselor: '',
				status: '',
			},
			saveDialogStatus: {
				open: false,
				title: '',
				content: ``,
				buttonType: 'oneBtn',
				cancelBtnText: '확인',
				modalIcon: 'success',
				save_type: '',
				item: {},
				item_index: null,
			},
			sweetDialog_info: {
				// 저장 불가 팝업
				open: false,
				title: '저장 불가',
				content: ``,
				buttonType: 'twoBtn',
				cancelBtnText: '취소',
				saveBtnText: '반려',
				modalIcon: 'info',
				modalValue: 'no',
				rejectionReason: [
					{
						value: '',
					},
				],
			},
			newDialog: {
				dialog: false,
				edit: false,
				editData: {},
				title: '신청 연차 관리',
			},
			newDialog2: {
				dialog: false,
				edit: false,
				editData: {},
				title: '근태정보',
			},
			newDialog3: {
				dialog: false,
				edit: false,
				editData: {},
				title: '출퇴근 리스트',
			},
			selected: [],
			allCounselor: 0,
			work: 0,
			endWork: 0,
			holiDay: 0,
			evidenceTable: {
				headers: [
					{ text: '유형', value: 'type', align: 'center', width: '20%' },
					{ text: '제목', value: 'SMStitle', align: 'center', width: '40%' },
					{ text: '상태', value: 'SMSuseYn', align: 'center', width: '15%' },
					{ text: '비고', value: 'detailEtc', align: 'center', width: '15%' },
				],
				headerCheck: false,
				items: [],
				select_items: [],
				json_fields: {
					직원명: 'data1',
					연락처: 'data2',
					지점: 'position',
					부서: 'team',
					직급: 'rank',
					상태: 'data5',
					출근시간: 'data3',
					퇴근시간: 'data4',
					'신청 연차 관리': 'vaction',
				},
				itemsPerPage: 10,
				page: 1,
				pageCount: 1,
				total: 1,
				hidedefaultfooter: true,
			},

			searchsel: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '상태',
				returnObject: true,
				itemText: 'title',
			},
			EvidenceField: {
				degree: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '1차',
						readonly: false,
					},
				},
				evidence: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '',
						readonly: false,
					},
				},
				title: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '정산금 지급 설정 안내',
						readonly: false,
					},
				},
				sms: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '',
						readonly: false,
					},
				},
			},
			etcInfo: {
				txtField: {
					maxlength: '255',
					value: '',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					placeholder: '',
					readonly: false,
				},
			},
			searchsel1: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: ['일정 안내', '지급 일정 정보', '지급 결과 안내', '지급 알림'],
				outlined: true,
				placeholder: '일정 안내',
				returnObject: true,
				itemText: 'title',
			},
			search: {
				clearable: false,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			search_project: '',
			status_Keyword: {
				value: '전체',
				items: ['전체', '출근', '정상', '연차', '오전반차', '오후반차', '미확인'],
			},
			date_picker: {
				date: this.$moment().format('YYYY-MM-DD'),
			},
			evidenceInfo: {
				part1: {
					title: '1차',
					evidence: ['evidence1', 'evidence2'],
				},
				part2: {},
				part3: {},
				part4: {},
				part5: {},
			},

			userID: [],
			businessID: [],
			clickVariation: {},
			addedItems: [],
		}
	},

	async created() {
		await this.me()
		const businessData = {
			idArr: this.$store.state.businessSelectBox.value,
		}
		await this.businessView(businessData)
		await this.messageView(businessData)
		await this.infoView(businessData)
	},
	mounted() {},

	methods: {
		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.me
				this.userID = res.me.id
			})
		},

		async userView(userViewData) {
			await this.$store.dispatch('users', userViewData).then(res => {
				this.businessID = res.users[0].businessID
			})
		},
		async businessView(businessData) {
			await this.$store.dispatch('businesses', businessData).then(() => {})
		},

		async messageView(businessData) {
			await this.$store.dispatch('messages', businessData).then(res => {
				let data = res.messages

				data.forEach(el => {
					el['type'] =
						el.type === 'scheduleGuide'
							? '일정 안내'
							: el.type === 'paymentScheduleInformation'
							? '지급 일정 정보'
							: el.type === 'paymentNotification'
							? '지급 결과 안내'
							: el.type === 'paymentResultGuide'
							? '지급 알림'
							: el.type
					el['SMStitle'] = el.title
					el['SMSuseYn'] = el.useYn === true ? '사용' : '미사용'
				})
				this.evidenceTable.items = data
			})
		},

		async infoView(businessData) {
			this.addedItems = []
			if (this.$store.state.businessSelectBox.value === businessData.idArr) {
				await this.$store.dispatch('systems', businessData).then(res => {
					res.systems.forEach(element => {
						const data = {}

						if (element.turn !== 'etc') {
							data.degree = element.turn
							data.evidence = element.inputFiles.evidence
							this.addedItems.push(data)
						} else {
							this.etcInfo.txtField.value = element.inputFiles.evidence
						}
					})
				})
			}
		},

		async pagination(item) {
			if (item.page > this.table.page) {
				// 다음 페이지
				let range = {
					start: (item.page - 1) * item.itemsPerPage,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: item.page,
					date: this.$moment(this.date).format('YYYY-MM-DD'),
				}

				await this.viewUsers(range)
			} else if (item.itemsPerPage !== this.table.itemsPerPage) {
				// 한페이지에 보여줄 아이템 개수 변경
				let range = {
					start: 0,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: 1,
					date: this.$moment(this.date).format('YYYY-MM-DD'),
				}

				await this.viewUsers(range)
			} else if (item.page < this.table.page) {
				// 이전 페이지
				let range = {
					start: (item.page - 1) * item.itemsPerPage,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: item.page,
					date: this.$moment(this.date).format('YYYY-MM-DD'),
				}

				await this.viewUsers(range)
			}
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
			return this.$moment(val).format('YYYY년 MM월 DD일') + `(${text})`
		},
		update() {
			let input = {
				date: this.$moment(this.date).format('YYYY-MM-DD'),
			}

			this.viewUsers(input)
		},
		click_date_before() {
			let input = {
				date: this.$moment(this.date)
					.subtract(1, 'd')
					.format('YYYY-MM-DD'),
			}

			this.viewUsers(input)

			this.date = this.$moment(this.date).subtract(1, 'd')
		},
		click_date_next() {
			let input = {
				date: this.$moment(this.date)
					.add(1, 'd')
					.format('YYYY-MM-DD'),
			}

			this.viewUsers(input)
			this.date = this.$moment(this.date).add(1, 'd')
		},
		click_date_now() {
			let input = {
				date: this.$moment().format('YYYY-MM-DD'),
			}

			this.viewUsers(input)
			this.date = this.$moment()
		},
		click_date_picker() {
			let input = {
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
			}
			if (this.$store.state.meData.role.id !== '4') {
				input.business = this.$store.state.meData.businessID
			}
			this.viewUsers(input)
			this.date = this.$moment(this.date_picker.date)
		},
		addNewItem() {
			if (this.addedItems.length < 5) {
				let splitLine = this.EvidenceField.evidence.txtField.value.split('\n')

				const newItem = {
					degree: this.EvidenceField.degree.txtField.value,
					evidence: splitLine,
				}
				if (this.EvidenceField.degree.txtField.value === '') {
					this.sweetDialog_info.title = `추가 실패`
					this.sweetDialog_info.content = `차수가 입력되지않았습니다.`
					this.sweetDialog_info.modalValue = ''
					this.sweetDialog_info.buttonType = 'oneBtn'
					this.sweetDialog_info.open = true
				} else if (this.EvidenceField.evidence.txtField.value === '') {
					this.sweetDialog_info.title = `추가 실패`
					this.sweetDialog_info.content = `증빙자료가 입력되지않았습니다.`
					this.sweetDialog_info.modalValue = ''
					this.sweetDialog_info.buttonType = 'oneBtn'
					this.sweetDialog_info.open = true
				} else {
					this.addedItems.push(newItem)
					this.EvidenceField.degree.txtField.value = ''
					this.EvidenceField.evidence.txtField.value = ''
				}
			} else {
				this.sweetDialog_info.title = `추가 실패`
				this.sweetDialog_info.content = `지급 안내는 최대 5차까지 가능합니다`
				this.sweetDialog_info.modalValue = ''
				this.sweetDialog_info.buttonType = 'oneBtn'
				this.sweetDialog_info.open = true
			}
		},

		openSaveInfoModal() {
			if (this.addedItems.length === 0) {
				this.sweetDialog_info.title = `저장 실패`
				this.sweetDialog_info.content = `증빙자료, 기타 안내를 입력해주세요`
				this.sweetDialog_info.modalValue = ''
				this.sweetDialog_info.buttonType = 'oneBtn'
				this.sweetDialog_info.open = true
			} else {
				if (this.etcInfo.txtField.value === '') {
					this.sweetDialog_info.title = `저장 실패`
					this.sweetDialog_info.content = `기타 안내가 입력되지 않았습니다`
					this.sweetDialog_info.modalValue = ''
					this.sweetDialog_info.buttonType = 'oneBtn'
					this.sweetDialog_info.open = true
				} else {
					let addEtcLength = this.addedItems.length
					for (let i = 0; i <= addEtcLength; i++) {
						let data = {
							turn: i === addEtcLength ? 'etc' : this.addedItems[i].degree,
							inputFiles: {
								evidence: i === addEtcLength ? this.etcInfo.txtField.value : this.addedItems[i].evidence,
							},
							businessID: this.$store.state.businessSelectBox.value,
						}

						this.$store.dispatch('createSystem', data).then(async () => {
							this.sweetDialog_info.open = false
							this.$store.state.loading = true
							this.saveDialogStatus.title = `저장 완료`
							this.saveDialogStatus.content = `지급 안내 저장이 완료되었습니다`
							this.saveDialogStatus.cancelBtnText = '확인'
							this.saveDialogStatus.open = true
							const userViewData = {
								idArr: this.userID,
								businessID: this.$store.state.businessSelectBox.value,
							}
							await this.userView(userViewData)
							const businessData = {
								idArr: this.businessID,
							}
							await this.businessView(businessData)
							await this.messageView(businessData)
							await this.infoView(businessData)
							this.$store.state.loading = false
						})
					}
				}
			}
		},

		reset() {
			this.clickVariation = {}
			this.useType = 'use'
			this.EvidenceField.sms.txtField.value = ''
			this.searchsel1.value = ''
			this.EvidenceField.title.txtField.value = ''
		},
		saveEvedenceSMS() {
			if (this.EvidenceField.sms.txtField.value === '') {
				this.sweetDialog_info.title = `저장 실패`
				this.sweetDialog_info.content = `내용을 입력해주세요`
				this.sweetDialog_info.modalValue = ''
				this.sweetDialog_info.buttonType = 'oneBtn'
				this.sweetDialog_info.open = true
			} else if (this.EvidenceField.title.txtField.value === '') {
				this.sweetDialog_info.title = `저장 실패`
				this.sweetDialog_info.content = `제목을 입력해주세요`
				this.sweetDialog_info.modalValue = ''
				this.sweetDialog_info.buttonType = 'oneBtn'
				this.sweetDialog_info.open = true
			} else if (this.searchsel1.value === '') {
				this.sweetDialog_info.title = `저장 실패`
				this.sweetDialog_info.content = `유형을 선택해주세요`
				this.sweetDialog_info.modalValue = ''
				this.sweetDialog_info.buttonType = 'oneBtn'
				this.sweetDialog_info.open = true
			} else {
				this.saveDialogStatus.title = `저장`
				this.saveDialogStatus.content = `내용을 저장합니다`
				;(this.saveDialogStatus.buttonType = 'twoBtn'),
					(this.saveDialogStatus.saveBtnText = '저장'),
					(this.saveDialogStatus.cancelBtnText = '취소'),
					(this.saveDialogStatus.open = true)
			}
		},
		save_confirm() {
			this.$store.state.loading = true
			console.log(this.clickVariation)

			if (Object.keys(this.clickVariation).length !== 0) {
				let realType
				if (this.searchsel1.value === '일정 안내') {
					realType = 'scheduleGuide'
				} else if (this.searchsel1.value === '지급 일정 정보') {
					realType = 'paymentScheduleInformation'
				} else if (this.searchsel1.value === '지급 결과 안내') {
					realType = 'paymentNotification'
				} else {
					realType = 'paymentResultGuide'
				}

				let input2 = {
					id: this.clickVariation.id,
					title: this.EvidenceField.title.txtField.value,
					detail: this.EvidenceField.sms.txtField.value,
					useYn: this.useType === 'use' ? true : false,
					type: realType,
					businessID: this.$store.state.businessSelectBox.value,
				}

				this.$store.dispatch('updateMessage', input2).then(async () => {
					this.sweetDialog_info.open = false
					this.$store.state.loading = true
					this.saveDialogStatus.title = `수정 완료`
					this.saveDialogStatus.content = `수정이 완료되었습니다`
					this.saveDialogStatus.buttonType = 'oneBtn'
					this.saveDialogStatus.cancelBtnText = '확인'
					this.saveDialogStatus.open = true
					this.$store.state.loading = false
					const userViewData = {
						idArr: this.userID,
						businessID: this.$store.state.businessSelectBox.value,
					}
					await this.userView(userViewData)
					const businessData = {
						idArr: this.businessID,
					}
					await this.businessView(businessData)
					await this.messageView(businessData)
					await this.infoView(businessData)
				})
			} else {
				let realType
				if (this.searchsel1.value === '일정 안내') {
					realType = 'scheduleGuide'
				} else if (this.searchsel1.value === '지급 일정 정보') {
					realType = 'paymentScheduleInformation'
				} else if (this.searchsel1.value === '지급 결과 안내') {
					realType = 'paymentNotification'
				} else {
					realType = 'paymentResultGuide'
				}

				let input = {
					title: this.EvidenceField.title.txtField.value,
					detail: this.EvidenceField.sms.txtField.value,
					useYn: this.useType === 'use' ? true : false,
					type: realType,
					businessID: this.$store.state.businessSelectBox.value,
				}

				this.$store.dispatch('createMessage', input).then(async () => {
					this.sweetDialog_info.open = false
					this.$store.state.loading = true
					this.saveDialogStatus.title = `저장 완료`
					this.saveDialogStatus.content = `저장이 완료되었습니다`
					this.saveDialogStatus.buttonType = 'oneBtn'
					this.saveDialogStatus.cancelBtnText = '확인'
					this.saveDialogStatus.open = true
					const userViewData = {
						idArr: this.userID,
						businessID: this.$store.state.businessSelectBox.value,
					}
					await this.userView(userViewData)
					const businessData = {
						idArr: this.businessID,
					}
					await this.businessView(businessData)
					await this.messageView(businessData)
					await this.infoView(businessData)
					this.$store.state.loading = false
				})
			}
		},
		SMSClick(val) {
			this.clickVariation = {}
			this.clickVariation = val
			console.log(this.clickVariation)
			this.EvidenceField.title.txtField.value = val.SMStitle
			this.EvidenceField.sms.txtField.value = val.detail
			this.searchsel1.value = val.type
			this.useType = val.useYn === true ? 'use' : 'noUse'
		},
	},
}
</script>
<style lang="scss">
.left_dashboard {
	background-color: white;
	border-radius: 1vh;
}
.search_date_1 {
	max-width: 120px !important;
	margin-left: 40px;
}
.search_date_2 {
	max-width: 120px !important;
}
.search_wrap {
	height: 26px;
}
// 기간 별 버튼
.search_select {
	min-height: 26px !important;
	height: 26px !important;
}
//검색 버튼
.search_btn {
	width: 75px !important;
	height: 26px !important;
	margin-right: 10px !important;
	padding: 0 10px !important;
	font-size: 13px;
	font-weight: bold;
	.v-btn__content {
		color: #fff;
	}
}
.search_btn_type {
	width: 26px !important;
	height: 26px !important;
	min-width: 0px !important;
	font-size: 13px;
	border: 1px solid #707070 !important;
	font-weight: bold;
	.v-btn__content {
		color: #fff;
	}
}
.search_btn_type2 {
	width: 39px !important;
	height: 26px !important;
	min-width: 0px !important;
	font-size: 12px;
	border: 1px solid #707070 !important;
	font-weight: bold;
	.v-btn__content {
		color: #333333;
	}
}
.new_pj {
	// margin-top: -90px;
	width: 113px !important;
	height: 26px !important;
	background: #323153 !important;
	color: #fff !important;
}
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
			margin-left: 990px;
		}
	}
}
.time_picker {
	div {
		div {
			.v-input__slot {
				min-height: 35px !important;
				height: 35px !important;
			}
		}
	}
}
.create_wrap_lay {
	background: white;
	height: 'auto' !important;
}
.switch_style {
	margin-top: 0px;
	.v-input__control {
		.v-messages {
			display: none;
		}
	}
}
.btn-style {
	box-shadow: none;
	background-color: #ffffff;
	border: 1px solid #9a9c9b;
	border-radius: 5px;
	// margin-top: -3rem !important;
	// margin-left: 92.5rem !important;
	position: absolute;
	bottom: 15px;
	right: 0px;
}
.btn-style-type2 {
	width: 122px;
	height: 28px !important;
	box-shadow: none;
	background-color: #5d19ff !important;
	color: #ffffff !important;
	border: 1px solid #707070;
	border-radius: 5px;
	// margin-top: -3rem !important;
	// margin-left: 92.5rem !important;
	position: absolute;
	bottom: 15px;
	left: 0px;
}
.date_picker2 {
	background-color: #fff !important;
	div {
		div {
			.v-input__slot {
				min-height: 27px !important;
				height: 27px !important;
				div {
					div {
						button {
							margin-bottom: 10px;
							font-size: 20px;
						}
					}
				}
			}
		}
	}
}
.btn-style2 {
	box-shadow: none;
	background-color: #ffffff;
	border: 1px solid #9a9c9b;
	border-radius: 5px;
	// margin-top: -3rem !important;
	// margin-left: 92.5rem !important;
	position: absolute;
	bottom: 15px;
	left: 0px;
}
.notice_table {
	div {
		.v-data-table__wrapper {
			margin: 0;
		}
	}
}

.notice_table > .v-data-table__wrapper > table {
	thead {
		th {
			text-align: end;
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
.notice_right_table3 {
	border-bottom: 1px solid #c8c8c8;
}

.client_table_style {
	background-color: #e9ecf4;
	font-size: 13px;
	text-align: center;
	line-height: 29px;
	height: 29px;
}

.search_box_admin2 {
	width: 80%;
	.v-input__control {
		.v-input__slot {
			min-height: 28px !important;
			height: 28px !important;
		}
	}
}
.search_box_modal2 {
	border: 1px solid rgba(0, 0, 0, 1);
	height: 103px;
	width: calc(100% - 20%);
	margin: 0 30px 0 30px;
	resize: none;
	overflow-y: auto;
	font-size: 13px;
}

.infoBtn {
	width: calc(100% - 38%);
	height: 3px;
	margin-left: 32%;

	border: solid 1px #cfdcdd;
}

.search_btn3 {
	width: 50px !important;
	height: 25px !important;
	padding: 0 10px !important;
	font-size: 13px;
	font-weight: bold;
	.v-btn__content {
		color: #fff;
	}
}

.attachmentClass2 {
	margin: 8px 13px;
	border-radius: 3px;
	padding: 4px 20px;
	background-color: #f2a629;
	justify-content: center;
	align-items: center;
}

.degreeClass {
	background-color: #327ccc;
	width: 22.47191011235955%;
	border-radius: 3px;
	max-height: 28px;
	max-width: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.contentClass {
	width: 77.80898876404494%;
	border-radius: 3px;
	max-width: 277px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
}
</style>
