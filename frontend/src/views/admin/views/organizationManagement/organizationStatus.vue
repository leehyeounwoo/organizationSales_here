<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search" justify-end>
			<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
				<selectBox :sel="searchsel1" :class="'searchSel'" style="font-size:12px"></selectBox>
			</v-flex>
			<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
				<selectBox :sel="searchsel2" :class="'searchSel'" style="font-size:12px"></selectBox>
			</v-flex>
			<v-flex style="max-width:200px;">
				<txtField class="search_box_admin" v-model="search_project" :txtField="search"></txtField>
			</v-flex>
			<v-flex class="ml-3" style="max-width:100px;">
				<v-btn class="search_btn" color="#5d19ff" @click="SearchBiz()" elevation="0"><v-icon>mdi-magnify</v-icon>조회</v-btn>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs8>
				<datatable :datatable="table" :teamChoiceClick="teamChoiceClick" @click="editUserData" />
			</v-flex>
			<v-flex xs4 class="ml-10 mt-5">
				<v-layout v-for="(edit, index) in rightEdit" :key="index" :style="index === 0 ? 'border-top:1px solid black' : ''">
					<v-flex class="notice_right_table" xs2>
						{{ edit.title }}
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout v-if="edit.type === 1" class=" py-3 px-1">
							<v-flex xs8 style="align-self: end;">
								<txtField :txtField="edit.txtField" v-model="edit.txtField.value" class="search_box_admin"></txtField>
							</v-flex>
							<v-flex xs4>
								<btn :btn="editBtn" btn_txt="파일 첨부" :click="clickEditBtn" />
							</v-flex>
						</v-layout>
						<v-layout v-if="edit.type === 2" class=" py-3 px-1">
							<v-flex xs6 style="align-self: end;" mr-1>
								<txtField :txtField="edit.txtField" v-model="edit.txtField.value" class="search_box_admin"></txtField>
							</v-flex>
							<v-flex xs6 style="align-self: end;">
								<txtField :txtField="edit.txtField" v-model="edit.txtField2.value" class="search_box_admin"></txtField>
							</v-flex>
						</v-layout>
						<v-layout v-if="edit.type === 3" class=" py-3 px-1">
							<v-flex xs12>
								<v-layout>
									<v-flex xs6 style="align-self: end;" mr-1>
										<txtField :txtField="edit.txtField" v-model="edit.txtField.value" class="search_box_admin"></txtField>
									</v-flex>
									<v-flex xs6 style="align-self: end;">
										<txtField :txtField="edit.txtField1" v-model="edit.txtField1.value" class="search_box_admin"></txtField>
									</v-flex>
								</v-layout>
								<v-layout mt-1>
									<v-flex xs8 style="align-self: end;">
										<txtField :txtField="edit.txtField2" v-model="edit.txtField2.value" class="search_box_admin"></txtField>
									</v-flex>
									<v-flex xs4>
										<btn :btn="editBtn" btn_txt="파일 첨부" :click="clickEditBtn" />
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2>
						계약고객 현황
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<datatable :datatable="detailTable" :teamChoiceClick="teamChoiceClick" class="detailTable_client"> </datatable>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>

		<v-btn small class="btn-style2" @click="clickExport()">
			<img src="@/assets/images/excel-img2.png" />
			엑셀 다운로드
		</v-btn>
		<download-excel
			class="btn btn-default"
			id="clientExcel"
			:data="table.items"
			style="display:none"
			:fields="table.json_fields"
			type="text/csv;charset=utf8"
			worksheet="My Worksheet"
			name="근태관리 엑셀리스트"
		>
		</download-excel>
		<teamEdit :setdialog="teamEditDialog"></teamEdit>
		<saveDialog :dialog="saveDialogStatus" :activeSave="activeSave"></saveDialog>
	</div>
</template>

<script>
import { selectBox, txtField, datatable, btn } from '@/components/index.js'
import { saveDialog } from '@/components'
import downloadExcel from 'vue-json-excel'
import teamEdit from '../../viewItem/teamEditDialog.vue'

export default {
	components: {
		selectBox,
		txtField,
		saveDialog,
		datatable,
		btn,
		downloadExcel,
		teamEdit,
	},

	data() {
		return {
			teamEditDialog: {
				dialog: false,
				items: [
					// 0
					{
						title: '사업지 명',
						type: 'txtfield',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
						},
					},
					// 1
					{
						title: '대표번호',
						type: 'txtfield',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
						},
					},
					// 2
					{
						title: '근무시간 설정',
						type: 'time',
						worktime: {
							start: '',
							end: '',
						},
					},
					// 3
					{
						title: '홀딩시간 설정',
						type: 'selectBox',
						value: '',
						selectBox: {
							value: '30분',
							items: ['10분', '30분', '60분'],
							hideDetail: true,
							outlined: true,
							class: 'small_font bizInput',
						},
						selectBox2: {
							value: '120분',
							items: ['60분', '90분', '120분'],
							hideDetail: true,
							outlined: true,
							class: 'small_font bizInput',
						},
					},
					// 4
					{
						title: '출퇴근 스캔 URL',
						type: 'scan',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
						},
					},
					// 5
					{
						title: '상품 등록',
						type: 'product',
						value: '',
						txtfield: {
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							placeholder: '※ 참여가능 그룹 업로드',
							readonly: true,
						},
					},
				],
			},
			rightEdit: [
				{
					title: '프로필 사진',
					type: 1,
					txtField: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '프로필 사진',
					},
				},
				{
					title: '계좌정보',
					type: 2,
					txtField: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '은행명',
					},
					txtField2: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '계좌번호',
					},
				},
				{
					title: '통장사본',
					type: 1,
					txtField: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '통장사본',
					},
				},
				{
					title: '근로계약서',
					type: 1,
					txtField: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '근로계약서',
					},
				},
				{
					title: '신분증 사본 등',
					type: 1,
					txtField: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '신분증 사본 등',
					},
				},
				{
					title: '사업자 정보',
					type: 3,
					txtField: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '사업지 이름',
					},
					txtField1: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '사업자 번호',
					},
					txtField2: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: true,
						placeholder: '사업자 등록증',
					},
				},
			],
			editBtn: {
				outlined: true,
				small: true,
				class: 'percentbtn ml-2',
			},
			detailTable: {
				headers: [
					{ text: '주택형', value: 'history', width: '25%' },
					{ text: '동', value: 'created_at', width: '25%' },
					{ text: '호', value: 'result', width: '25%' },
					{ text: '비고', value: 'result', width: '25%' },
				],
				class: 'datatablehover3',
				items: [],
				hidedefaultfooter: true,
				header_fixed: true,
				height: '102px',
				noweditting: '',
				itemsPerPage: -1,
				page: 1,
				pageCount: 0,
			},
			detailTable_talk: {
				headers: [
					{ text: '알림톡 정보', value: 'subject_1' },
					{ text: '발송일시', value: 'created_at' },
				],
				class: 'datatablehover3',
				items: [],
				hidedefaultfooter: true,
				header_fixed: true,
				height: '102px',
				noweditting: '',
				itemsPerPage: -1,
				page: 1,
				pageCount: 0,
			},
			// detailData: {
			// 	id: '',
			// 	name: {
			// 		value: '',
			// 		clearable: false,
			// 		maxlength: '255',
			// 		outlined: true,
			// 		backCol: 'white',
			// 		placeholder: '고객명',
			// 	},
			// 	phone: {
			// 		value: '',
			// 		clearable: false,
			// 		maxlength: '255',
			// 		outlined: true,
			// 		backCol: 'white',
			// 		placeholder: '연락처',
			// 	},
			// 	sex: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '성별',
			// 		items: ['남자', '여자'],
			// 		outlined: true,
			// 	},
			// 	age: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '연령대',
			// 		items: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
			// 		outlined: true,
			// 	},
			// 	inflow: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '유입경로',
			// 		items: ['직접입력', '상담예약', '구독신청', '이벤트참여'],
			// 		outlined: true,
			// 	},
			// 	status: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '고객상태',
			// 		items: ['DB등록', '상담예약', '상담완료', '계약가망', '계약완료'],
			// 		outlined: true,
			// 	},
			// 	counselor_business: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '지점',
			// 		items: [],
			// 		outlined: true,
			// 		returnObject: true,
			// 		itemText: 'business_title',
			// 	},
			// 	counselor_team: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '부서',
			// 		items: [],
			// 		outlined: true,
			// 		returnObject: true,
			// 		itemText: 'title',
			// 	},
			// 	counselor_name: {
			// 		value: '',
			// 		errorMessage: '',
			// 		hideDetail: true,
			// 		placeholder: '상담사명',
			// 		items: [],
			// 		outlined: true,
			// 		returnObject: true,
			// 		itemText: 'name',
			// 	},
			// 	origin_main_data: [],
			// 	interest_product: [],
			// 	contract_product: [],
			// },
			date: this.$moment(),
			startTimeDialog: false,
			endTimeDialog: false,
			startTime: '',
			endTime: '',
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
			table: {
				headers: [
					{ text: '상담사', value: 'username', align: 'center' },
					{ text: '연락처', value: 'phoneNumber', align: 'center' },
					{ text: '영업번호', value: 'salesPhoneNumber', align: 'center' },
					{ text: '등록일', value: 'created_at', align: 'center' },
					{ text: '팀배정 현황', value: 'team', align: 'center', sortable: false },
					{ text: '재직상태', value: 'data5', align: 'center' },
					{ text: '비고', value: 'etc', align: 'center' },
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
				pageCount: 1,
				total: 1,
			},

			searchsel: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '지점선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel1: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '팀선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel2: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '재직상태',
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
			userArrData: [],
			userData: [],
			teamArrData: [],
			teamData: [],
			rankArrData: [],
			rankData: [],
		}
	},

	async created() {
		const usersViewData = {
			role: 3,
		}
		await this.usersView(usersViewData)
		const teamsViewData = {
			idArr: this.teamArrData,
		}

		await this.teamsView(teamsViewData)
		const ranksViewData = {
			idArr: this.rankArrData,
		}

		await this.ranksView(ranksViewData)
		await this.dataSetting()

		// console.log(this.rankArrData)
		this.$store.state.loading = false
	},
	mounted() {},

	methods: {
		async dataSetting() {
			// let arrData = []
			console.log(this.teamData)
			console.log(this.rankData)
			for (let index = 0; index < this.userData.length; index++) {
				const element = this.userData[index]
				console.log(element)
				let teamTitle = this.teamData.filter(x => x.id === element.teamID)[0].title
				let rankTitle = this.rankData.filter(x => x.id === element.rankId)[0].rankName
				element.team = `${teamTitle}(${rankTitle})`
			}
			this.table.items = this.userData
			// arrData =
			// 			console.log(arrData)
		},
		editUserData(val) {
			// console.log(val)
			// console.log(this.rightEdit)
			this.rightEdit[1].txtField.value = val.bank
			this.rightEdit[1].txtField2.value = val.accountNumber
		},
		async teamsView(teamsViewData) {
			await this.$store
				.dispatch('teams', teamsViewData)
				.then(res => {
					this.teamData = res.teams
					// console.log(res.teams)
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async ranksView(teamsViewData) {
			await this.$store
				.dispatch('ranks', teamsViewData)
				.then(res => {
					this.rankData = res.ranks
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async usersView(usersViewData) {
			await this.$store
				.dispatch('users', usersViewData)
				.then(res => {
					this.userData = res.users
					this.teamArrData = res.users.filter(x => x.teamID).map(x => x.teamID)
					this.rankArrData = res.users.filter(x => x.rankId).map(x => x.rankId)
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		activeSave() {},
		teamChoiceClick() {
			this.teamEditDialog.dialog = true
		},
		clickEditBtn() {},
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

.table_style_2 > .v-data-table__wrapper {
	overflow: overlay;
	table {
		border-right: 1px solid #d1d1d1;
		border-left: 1px solid #d1d1d1;
		border-bottom: 1px solid #d1d1d1;
		thead {
			tr {
				z-index: 1;
				th:not(:last-of-type) {
					border-right: 1px solid #d1d1d1;
				}
				th {
					text-align: center !important;
					color: #333333;
					height: 53px;
					border-top: 1px solid #7d7d7d !important;
					border-bottom: 1px solid #7d7d7d !important;
					background-color: #e9ecf4 !important;
				}
			}
		}
	}
}

.table_style_2 > .v-data-table__wrapper > table {
	tbody {
		tr {
			td:not(:last-of-type) {
				border-right: 1px solid #d1d1d1;
			}
			td {
				height: 36px;
				text-align: center !important;
				background-color: #ffffff !important;
			}
		}
	}
}
.table_style_2 > .v-data-footer {
	justify-content: end;
	padding-right: 0px;
	.v-data-footer__select {
		margin-left: 0px;
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
				min-height: 28px !important;
				height: 28px !important;
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
.notice_right_table {
	background-color: #f5f5f5;
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
.detailTable_client > .v-data-table > .v-data-table__wrapper {
	margin-top: 0px;
	table {
		thead {
			tr {
				th {
					height: 28px !important;
					background-color: #f5f5f5;
					border-top: 1px solid #d1d1d1 !important;
				}
			}
		}
	}
}
.client_table_style {
	background-color: #f5f5f5;
	font-size: 13px;
	text-align: center;
	line-height: 29px;
	height: 29px;
}
</style>
