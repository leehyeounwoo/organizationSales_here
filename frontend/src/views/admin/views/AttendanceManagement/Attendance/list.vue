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
				<v-flex>
					<div class="d-flex align-center date_picker2" style="width:115px">
						<DatepickerDialog :picker="date_picker" @change="click_date_picker"></DatepickerDialog>
					</div>
				</v-flex>
			</v-layout>
			<v-layout align-center justify-end>
				<v-flex class="search_select ml-3 mr-2 " style="max-width:200px !important; min-width:200px !important;">
					<selectBox v-if="$store.state.meData.role.id === '4'" :sel="searchsel" :class="'searchSel'" style="font-size:12px"></selectBox>
				</v-flex>
				<v-flex class="search_select ml-3 mr-2 " style="max-width:200px !important;">
					<selectBox :sel="searchsel1" :class="'searchSel'" style="font-size:12px"></selectBox>
				</v-flex>
				<v-flex class="search_select ml-3 mr-2 " style="max-width:200px !important;">
					<selectBox :sel="searchsel2" :class="'searchSel'" style="font-size:12px"></selectBox>
				</v-flex>
				<v-flex class="search_select ml-3 mr-2 " style="max-width:200px !important;">
					<selectBox :sel="searchsel3" :class="'searchSel'" style="font-size:12px"></selectBox>
				</v-flex>
				<v-flex style="max-width:200px;">
					<txtField class="search_box_admin" v-model="search_project" :txtField="search"></txtField>
				</v-flex>
				<v-flex class="ml-3" style="max-width:100px;">
					<v-btn class="search_btn" color="#5d19ff" @click="SearchBiz()" elevation="0"><v-icon>mdi-magnify</v-icon>조회</v-btn>
				</v-flex>
			</v-layout>
		</v-layout>
		<v-data-table
			:headers="table.headers"
			:items="table.items"
			item-key="userId"
			class="elevation-0 table_style_2 mt-2"
			:footer-props="{
				['items-per-page-text']: `• Total : ${table.total ? table.total : table.items.length}`,
				['page-text']: ` 1 - ${table.itemsPerPage ? Math.ceil(table.total / table.itemsPerPage) : Math.ceil(table.items.length / 10)} of ${
					table.page ? table.page : 1
				} `,
			}"
		>
		</v-data-table>
	</div>
</template>

<script>
import { selectBox, txtField } from '@/components/index.js'
import { DatepickerDialog } from '@/components'

export default {
	components: {
		selectBox,
		txtField,
		DatepickerDialog,
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
			table: {
				headers: [
					{ text: '직원명', value: 'data1', align: 'center', width: '7%' },
					{ text: '연락처', value: 'data2', align: 'center', width: '10%' },
					{ text: '영업번호', value: 'position', align: 'center', width: '10%' },
					{ text: '등록일', value: 'team', align: 'center', width: '7%' },
					{ text: '팀', value: 'rank', align: 'center', width: '7%' },
					{ text: '상태', value: 'data5', align: 'center', width: '7%' },
					{ text: '출근시간', value: 'data3', align: 'center', width: '10%' },
					{ text: '퇴근시간', value: 'data4', align: 'center', width: '10%' },
					{ text: '출근', value: 'data6', align: 'center', width: '8%' },
					{ text: '퇴근', value: 'data7', align: 'center', width: '8%' },
					{ text: '신청 연차 관리', value: 'vacation', align: 'center', width: '10%' },
					{ text: '비고', value: 'etc', align: 'center', width: '7%' },
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
				pageCount: 0,
				total: 0,
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
				placeholder: '부서선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel2: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '직급선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel3: {
				value: '이름',
				errorMessage: '',
				hideDetail: true,
				items: ['이름', '휴대전화'],
				outlined: true,
				placeholder: '이름/휴대전화',
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

	async created() {},
	mounted() {},

	methods: {
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
					background-color: #f5f5f5 !important;
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
	justify-content: center;
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
</style>
