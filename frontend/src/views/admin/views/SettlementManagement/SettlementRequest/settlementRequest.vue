<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search">
			<v-layout align-center justify-start>
				<v-flex class=" ml-3 mr-2 " style="max-width:125px !important; font-size:12px; font-weight:bold;">
					{{ date_filter(date) }}
				</v-flex>
				<v-flex>
					<v-btn class="search_btn_type" color="#FFFFFF" elevation="0"
						><v-icon color="#8C72F9" @click="click_date_before">mdi-menu-left</v-icon></v-btn
					>
					<v-btn class="search_btn_type" color="#FFFFFF" elevation="0"
						><v-icon color="#8C72F9" @click="click_date_next">mdi-menu-right</v-icon></v-btn
					>
					<v-btn class="search_btn_type2" color="#FFFFFF" elevation="0" @click="click_date_now">오늘</v-btn>
				</v-flex>
			</v-layout>
			<v-layout align-center justify-end>
				<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
					<selectBox :sel="searchsel1" :class="'searchSel'" style="font-size:12px"></selectBox>
				</v-flex>
				<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
					<selectBox :sel="searchsel" :class="'searchSel'" style="font-size:12px"></selectBox>
				</v-flex>
				<v-flex style="max-width:200px;">
					<txtField class="search_box_admin" v-model="search_project" :txtField="search"></txtField>
				</v-flex>
				<v-flex class="ml-3" style="max-width:100px;">
					<v-btn class="search_btn" color="#5d19ff" @click="SearchBiz()" elevation="0"><v-icon>mdi-magnify</v-icon>조회</v-btn>
				</v-flex>
			</v-layout>
		</v-layout>
		<v-layout class="mt-4">
			<v-flex xs8>
				<datatable
					:datatable="settlementTable"
					class="notice_table"
					excelType="clientManagement"
					excelUseYn="true"
					@pagination="pagination"
				>
				</datatable>
			</v-flex>
			<v-flex xs4 class="ml-10">
				<v-layout style="border-top:1px solid black">
					<v-flex class="notice_right_table" xs3 style="height: 50px;">
						계약자
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout> </v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 50px;">
						계약물건
					</v-flex>
					<v-flex xs10 class="notice_right_table2"> </v-flex>
				</v-layout>

				<v-layout>
					<v-flex class="notice_right_table" xs3>
						정산요청이력
					</v-flex>
					<v-flex xs10 class="notice_right_table2" style="height:163px">
						<v-layout justify-center align-center>
							<v-flex xs5 class="client_table_style" style="border-right: 1px solid #C8C8C8">
								날짜
							</v-flex>
							<v-flex xs4 class="client_table_style" style="border-right: 1px solid #C8C8C8">
								내용
							</v-flex>
							<v-flex xs3 class="client_table_style">
								상태
							</v-flex>
						</v-layout>
						<v-layout wrap class="client_table_body_style">
							<v-layout align-center v-for="(data, index) in detailData.interest_product" :key="data.main.value + index">
								<v-flex xs5 style="min-width:0px; margin:0px 7px;">
									<selectBox
										:sel="data.main"
										:readonly="true"
										class="searchSel px-1"
										:class="index === 0 ? 'py-2' : 'pb-2'"
										style="font-size:12px"
									></selectBox>
								</v-flex>
								<v-flex xs4 style="min-width:0px; margin:0px 7px;">
									<selectBox
										:sel="data.product"
										:readonly="true"
										class="searchSel pr-1"
										:class="index === 0 ? 'py-2' : 'pb-2'"
										style="font-size:12px"
									></selectBox>
								</v-flex>
								<v-flex xs4 style="min-width:0px; margin:0px 7px; display: flex;">
									<v-btn class="detail_etc_btn py-2" style="margin: 0 auto;" small :color="'#9A9C9B'" depressed --> >자세히 보기</v-btn>
								</v-flex>
							</v-layout>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3>
						증빙서류
					</v-flex>
					<v-flex xs10 class="notice_right_table2" style="height:163px">
						<v-layout wrap class="client_table_body_style">
							<v-layout align-center v-for="(data, index) in detailData.contract_product" :key="data.main.value + index">
								<v-flex xs4 style="margin:0px 7px;">
									<selectBox
										:sel="data.main"
										:readonly="true"
										class="searchSel  px-1"
										:class="index === 0 ? 'py-2' : 'pb-2'"
										style="font-size:12px"
									></selectBox>
								</v-flex>
								<v-flex xs4 style="margin:0px 7px;">
									<selectBox
										:sel="data.product"
										:readonly="true"
										class="searchSel pr-1"
										:class="index === 0 ? 'py-2' : 'pb-2'"
										style="font-size:12px"
									></selectBox>
								</v-flex>
								<v-flex xs4 style="margin:0px 7px; display: flex;">
									<v-btn
										class="detail_etc_btn py-2"
										style="margin:0 auto;"
										small
										:color="'#9A9C9B'"
										depressed
										@click="click_detail_path(data)"
										>자세히 보기</v-btn
									>
								</v-flex>
							</v-layout>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						처리
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<datatable :datatable="detailTable" class="detailTable_client"> </datatable>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import { selectBox, txtField, datatable } from '@/components/index.js'

export default {
	components: {
		selectBox,
		txtField,
		datatable,
	},

	data() {
		return {
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
			settlementTable: {
				headers: [
					{ text: '직원명', value: 'data1', align: 'center', width: '7%' },
					{ text: '연락처', value: 'data2', align: 'center', width: '10%' },
					{ text: '영업번호', value: 'salesPhoneNumer', align: 'center', width: '10%' },
					{ text: '팀', value: 'teamID', align: 'center', width: '7%' },
					{ text: '계약일', value: '', align: 'center', width: '7%' },
					{ text: '계약물건', value: '', align: 'center', width: '10%' },
					{ text: '요청일', value: '', align: 'center', width: '10%' },
					{ text: '차수', value: '', align: 'center', width: '8%' },
					{ text: '상태', value: '', align: 'center', width: '8%' },
					{ text: '비고', value: '', align: 'center', width: '7%' },
				],

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
			},
			detailData: {
				id: '',
				name: {
					value: '',
					clearable: false,
					maxlength: '255',
					outlined: true,
					backCol: 'white',
					placeholder: '고객명',
				},
				phone: {
					value: '',
					clearable: false,
					maxlength: '255',
					outlined: true,
					backCol: 'white',
					placeholder: '연락처',
				},
				sex: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '성별',
					items: ['남자', '여자'],
					outlined: true,
				},
				age: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '연령대',
					items: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
					outlined: true,
				},
				inflow: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '유입경로',
					items: ['직접입력', '상담예약', '구독신청', '이벤트참여'],
					outlined: true,
				},
				status: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '고객상태',
					items: ['DB등록', '상담예약', '상담완료', '계약가망', '계약완료'],
					outlined: true,
				},
				counselor_business: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '지점',
					items: [],
					outlined: true,
					returnObject: true,
					itemText: 'business_title',
				},
				counselor_team: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '부서',
					items: [],
					outlined: true,
					returnObject: true,
					itemText: 'title',
				},
				counselor_name: {
					value: '',
					errorMessage: '',
					hideDetail: true,
					placeholder: '상담사명',
					items: [],
					outlined: true,
					returnObject: true,
					itemText: 'name',
				},
				origin_main_data: [],
				interest_product: [],
				contract_product: [],
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
		}
	},

	async created() {
		await this.me()
	},
	mounted() {},

	methods: {
		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.data
				console.log(this.$store.state.meData)
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
</style>
