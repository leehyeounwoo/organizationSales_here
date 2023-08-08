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
					<v-flex class="notice_right_table" xs2 style="height: 52.3px;">
						비고
					</v-flex>
					<v-flex class="notice_right_table" xs10 style="height: 52.3px;">
						내용 작성
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: 457.3px;">
						증빙자료
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout style="display: flex;">
							<txtField
								:txtField="EvidenceField.degree.txtField"
								v-model="EvidenceField.degree.txtField.value"
								style="width: 20%;"
								class="search_box_admin ma-3 ml-5"
							></txtField>
							<textarea v-model="etcInfo.txtField.value" style="width: 70%;" class="search_box_modal2 mt-3"></textarea>
						</v-layout>
						<v-btn class="infoBtn mt-2" color="#f0f2f8" elevation="0"
							><span
								style="	font-family: MalgunGothic;
	font-size: 14px;"
								>내용 추가</span
							></v-btn
						>
					</v-flex>
					<v-flex class="addNewItem"> </v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: auto">
						기타 안내
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<textarea
							v-model="EvidenceField.evidence.txtField.value"
							placeholder="※ 증빙서류 누락시 정산 승인이 보류 될 수 있으니 확인 후 첨부바랍니다.
※ pdf, png, jpg파일만 업로드 가능합니다."
							style="width: 90%; height: 70px;"
							class="search_box_modal2 pt-2"
						></textarea>
					</v-flex>
				</v-layout>
				<v-flex style="text-align: end;">
					<v-btn
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
					<datatable style="width: 100%" :datatable="settlementTable" class="notice_table" @pagination="pagination"> </datatable>

					<v-flex xs7 class="ml-4">
						<v-layout style="border-top:1px solid black">
							<v-flex class="notice_right_table" xs2 style="height: 52.3px;">
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
						<v-layout>
							<v-flex class="notice_right_table" xs2 style="height: 52.3px;">
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
									<v-radio class="mb-0 mr-5" label="사용" :value="true" color="#009dac"></v-radio>
									<v-radio class="mb-0" label="미사용" :value="false" color="#009dac"></v-radio>
								</v-radio-group>
								<v-btn class="search_btn3" style="width: 50%; " color="#3e7ccc" @click="reset">초기화</v-btn>
								<v-btn class="ml-2 search_btn3" style="width: 50%; " color="#3e7ccc"><v-icon>mdi-check</v-icon>저장</v-btn>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-flex>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import { datatable, txtField, selectBox } from '@/components/index.js'

export default {
	components: {
		datatable,
		txtField,
		selectBox,
	},

	data() {
		return {
			date: this.$moment(),
			startTimeDialog: false,
			endTimeDialog: false,
			startTime: '',
			endTime: '',
			useType: true,
			editGotoworkDialog: false,
			editGotoworkData: {
				title: '',
				counselor: '',
				status: '',
			},
			saveDialogStatus: {
				open: false,
				content: '저장하시겠습니까?',
				btnTxt: '저장',
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
			settlementTable: {
				headers: [
					{ text: '유형', value: '', align: 'center', width: '20%' },
					{ text: '제목', value: '', align: 'center', width: '40%' },
					{ text: '상태', value: '', align: 'center', width: '15%' },
					{ text: '비고', value: '', align: 'center', width: '15%' },
				],
				showselect: true,
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
				pageCount: 0,
				total: 0,
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
				items: ['일정 안내', '결과 안내'],
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
		}
	},

	async created() {
		await this.me()
		const userViewData = {
			idArr: this.userID,
		}
		await this.userView(userViewData)
		const businessData = {
			idArr: this.businessID,
		}
		await this.businessView(businessData)
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
				console.log(res.users[0].businessID)
				this.businessID = res.users[0].businessID
			})
		},
		async businessView(businessData) {
			await this.$store.dispatch('businesses', businessData).then(res => {
				console.log(businessData)
				console.log(res)
			})
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
				input.business = this.$store.state.meData.business.id
			}
			this.viewUsers(input)
			this.date = this.$moment(this.date_picker.date)
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
</style>
