<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search">
			<v-layout align-center>
				<v-flex xs4>
					<div class="d-flex align-center date_picker2 ml-3 mr-2" style="width:200px;">
						<DatepickerDialog :picker="date_picker" language="ko" @change="click_date_picker"></DatepickerDialog>
					</div>
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
			show-select
			v-model="selected"
			item-key="id"
			class="elevation-0 table_style_2 mt-2"
			:footer-props="{
				['items-per-page-options']: [5, 10, 30, 50],
				['items-per-page-text']: `• Total : ${table.total ? table.total : table.items.length}`,
				['page-text']: ``,
			}"
			@pagination="pagination($event)"
			@page-count="table.pageCount = $event"
		>
			<template v-slot:[`item.data3`]="{ item }">
				<v-layout align-center justify-center>
					{{ item.data3 }}
					<v-icon v-if="item.data3 !== '-'" small class="ml-1" @click="gotoWorkDialogOpen(item)">mdi-pencil-circle</v-icon>
				</v-layout>
			</template>
			<template v-slot:[`item.data4`]="{ item }">
				<v-layout align-center justify-center>
					{{ item.data4 }}
					<v-icon v-if="item.data4 !== '-'" small class="ml-1" @click="leaveWorkDialogOpen(item)">mdi-pencil-circle</v-icon>
				</v-layout>
			</template>

			<template v-slot:[`item.data5`]="{ item }">
				<div>
					{{ item.data5 }}
				</div>
			</template>
			<template v-slot:[`item.data6`]="{ item }">
				<v-layout justify-center align-center>
					<v-switch
						class="switch_style"
						color="#5A18F7"
						:disabled="item.data7"
						value
						:input-value="item.data6"
						@click="goToWorkStatus(item)"
					></v-switch>
				</v-layout>
			</template>
			<template v-slot:[`item.data7`]="{ item }">
				<v-layout justify-center align-center>
					<v-switch
						class="switch_style"
						style="margin-top:0px;"
						color="#5A18F7"
						:disabled="!item.data6 || item.data5.includes('휴가') || item.data5.includes('반차')"
						value
						:input-value="item.data7"
						@click="leaveWorkStatus(item)"
					></v-switch>
				</v-layout>
			</template>
			<template v-slot:[`item.vacation`]="{ item }">
				<div v-if="item.vacation === '-'">
					-
				</div>
				<div v-else style="cursor:pointer; text-decoration: underline;" @click="click_vacation_status(item)">
					{{ vacation_filter(item.vacation) }}
				</div>
			</template>
			<template v-slot:[`item.etc`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn2" small @click="detailClick(item)" color="#9A9C9B" depressed>자세히 보기</v-btn>
				</v-layout>
			</template>
			<template v-slot:footer>
				<v-pagination
					v-model="table.page"
					:length="Math.ceil(table.total / table.pagination.itemsPerPage)"
					@input="e => page(e)"
				></v-pagination>
			</template>
		</v-data-table>
		<v-btn small class="btn-style3" @click="createUnattendedVacation()">
			<span style="color: white;">{{ '연차신청 미처리 : ' + unattendedLength + '건' }}</span>
		</v-btn>
		<v-btn small class="btn-style2" @click="clickExport()">
			<img src="@/assets/images/excel-img2.png" />
			엑셀 다운로드
		</v-btn>
		<download-excel
			class="btn btn-default"
			id="clientExcel"
			:data="selected"
			style="display:none"
			:fields="table.json_fields"
			type="text/csv;charset=utf8"
			worksheet="My Worksheet"
			name="근태관리 엑셀리스트"
		>
		</download-excel>
		<v-dialog v-model="editGotoworkDialog" persistent width="400">
			<div class="create_wrap_lay">
				<div class="px-8 py-4" style="background:#2d1c71; color:white;">
					<v-layout>
						<span style="font-weight:bold;">{{ editGotoworkData.title }}</span>
						<v-spacer />
						<v-icon @click="close()" class="title-icon" color="white">mdi-close</v-icon>
					</v-layout>
				</div>
				<v-container style="font-size:0.75rem;">
					<v-layout style="border-top:2px solid #b6b6b6; border-bottom:0.5px solid #b6b6b6;" align-center>
						<v-flex xs4 px-3 py-2 style="background-color:#f5f4f4; ">상담사</v-flex>
						<v-flex xs8 px-3 py-2>{{ editGotoworkData.counselor }}</v-flex>
					</v-layout>
					<v-layout style="border-bottom:0.5px solid #b6b6b6;">
						<v-flex xs4 px-3 py-2 style="background-color:#f5f4f4;">선택일자</v-flex>
						<v-flex xs8 px-3 py-2>{{ $moment().format('YYYY-MM-DD') }}</v-flex>
					</v-layout>
					<v-layout v-if="editGotoworkData.status === 'goto'" style="border-bottom:0.5px solid #b6b6b6;">
						<v-flex xs4 px-3 py-2 style="background-color:#f5f4f4;">출근시간</v-flex>
						<v-flex xs8 px-3 py-2
							><v-dialog ref="startTimeDialog" v-model="startTimeDialog" :return-value.sync="startTime" persistent width="290px">
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										class="time_picker"
										dense
										v-model="startTime"
										hide-details="false"
										outlined
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-time-picker
									v-if="startTimeDialog"
									:max="editGotoworkData.item.data4 === '-' ? '' : $moment(editGotoworkData.item.data4).format('HH:mm:ss.SSS')"
									v-model="startTime"
									full-width
								>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="startTimeDialog = false">
										Cancel
									</v-btn>
									<v-btn text color="primary" @click="$refs.startTimeDialog.save(startTime)">
										OK
									</v-btn>
								</v-time-picker>
							</v-dialog></v-flex
						>
					</v-layout>
					<v-layout v-if="editGotoworkData.status === 'leave'" style="border-bottom:0.5px solid #b6b6b6;">
						<v-flex xs4 px-3 py-2 style="background-color:#f5f4f4;">퇴근시간</v-flex>
						<v-flex xs8 px-3 py-2
							><v-dialog ref="endTimeDialog" v-model="endTimeDialog" :return-value.sync="endTime" persistent width="290px">
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										class="time_picker"
										dense
										hide-details="false"
										v-model="endTime"
										outlined
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-time-picker v-if="endTimeDialog" v-model="endTime" full-width>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="endTimeDialog = false">
										Cancel
									</v-btn>
									<v-btn text color="primary" @click="$refs.endTimeDialog.save(endTime)">
										OK
									</v-btn>
								</v-time-picker>
							</v-dialog></v-flex
						>
					</v-layout>
				</v-container>
				<v-layout class="mt-4 pb-4" justify-center align-center>
					<v-btn color="primary" style="width:120px; height:35px;" @click="goToworkTimeCheck()">
						저장
					</v-btn>
					<v-btn class="ml-3" outlined style="width:120px; height:35px;" @click="close()">
						취소
					</v-btn>
				</v-layout>
			</div>
		</v-dialog>

		<saveDialog :dialog="saveDialogStatus" :activeSave="activeSave"></saveDialog>
		<saveDialog :dialog="downloadDialogStatus" :activeSave="downloadActiveSave"></saveDialog>
		<detail :setdialog="newDialog2"></detail>
		<vacationStatus :setdialog="newDialog" @update="update"></vacationStatus>
		<unattendedVacation :setdialog="newDialog3" @update="update"></unattendedVacation>
	</div>
</template>

<script>
import { selectBox, txtField } from '@/components/index.js'
import { saveDialog, DatepickerDialog } from '@/components'
import detail from './detail.vue'
import vacationStatus from './vacationStatus.vue'
import downloadExcel from 'vue-json-excel'
import unattendedVacation from './unattendedVacation.vue'
import Axios from 'axios'

export default {
	components: {
		downloadExcel,
		selectBox,
		txtField,
		detail,
		vacationStatus,
		saveDialog,
		DatepickerDialog,
		unattendedVacation,
	},

	data() {
		return {
			unattendedLength: 0,
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
			rowperpageSel: {
				value: 10,
				errorMessage: '',
				hideDetail: true,
				items: [10, 20, 30],
				fullItem: [],
				outlined: true,
				label: '',
				returnObject: true,
				itemText: 'name',
				itemValue: 'id',
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
				title: '미처리 연차 신청 현황',
			},
			downloadDialogStatus: {
				open: false,
				content: '저장하시겠습니까?',
				btnTxt: '저장',
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
					{ text: '영업번호', value: 'salesPhoneNumber', align: 'center', width: '10%' },
					{ text: '등록일', value: 'created_at', align: 'center', width: '10%' },
					{ text: '팀', value: 'team_rank', align: 'center', width: '7%' },
					{ text: '상태', value: 'data5', align: 'center', width: '7%' },
					{ text: '출근시간', value: 'data3', align: 'center', width: '7%' },
					{ text: '퇴근시간', value: 'data4', align: 'center', width: '7%' },
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
					영업번호: 'salesPhoneNumber',
					등록일: 'created_at',
					팀: 'team_rank',
					상태: 'data5',
					출근시간: 'data3',
					퇴근시간: 'data4',
				},
				pagination: {
					itemsPerPage: 10,
					page: 1,
					pageCount: 0,
					start: 0,
					limit: 10000,
				},
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
				start: 0,
				limit: 10000,

				hidedefaultfooter: true,
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
			userLists: [],
			userIDArr: [],
			teamData: [],
			rankData: [],
			vacationData: [],
		}
	},

	async created() {
		this.$store.state.loading = true
		await this.me()
		await this.getTeams()
		await this.getRanks()
		let input = {
			start: 0,
			limit: this.table.pagination.itemsPerPage,
			roleName: 'Counselor',
			businessID: this.$store.state.businessSelectBox.value,
			page: 1,
		}
		await this.viewUsers(input)
		let input2 = {
			date: this.$moment().format('YYYY-MM-DD'),
			roleName: 'Counselor',
			userID: this.userIDArr,
		}
		let input3 = {
			date: this.$moment().format('YYYY-MM-DD'),
			// roleName: 'Counselor',
			idArr: this.userIDArr,
		}
		await this.gotoworksView(input2)
		await this.vacationView(input3)
		await this.unattendedVacation()
		await this.dataSetting()
		this.$store.state.loading = false
	},
	mounted() {},

	methods: {
		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.me
			})
		},

		first_users(data) {
			this.$store.dispatch('users', data).then(res => {
				this.table.items = res.users
				this.table.length = Math.ceil(this.table.items.length / this.rowperpageSel.value)
			})
		},
		async dataSetting() {
			for (let index = 0; index < this.userLists.length; index++) {
				const element = this.userLists[index]
				let teamData = this.teamData.filter(x => x.id === Number(element.teamID))[0]
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
			this.table.items = JSON.parse(JSON.stringify(this.userLists))
			this.table.origin_items = JSON.parse(JSON.stringify(this.userLists))
		},
		async getTeams() {
			Axios.get(process.env.VUE_APP_BACKEND_URL + '/team_data_api.json').then(res => {
				const filterData = res.data.filter(x => x.businessID === this.$store.state.businessSelectBox.value && x.useYn === true)
				this.searchsel1.items = JSON.parse(JSON.stringify(filterData))
				this.searchsel1.items.unshift('전체')
				this.searchsel1.value = '전체'
				this.teamData = filterData
			})
		},
		async getRanks() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
				useYn: true,
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
			this.$store.state.loading = true
			if (this.search_project) {
				input.username = this.search_project
			}
			if (this.searchsel1.value !== '전체' && this.searchsel1.value !== '') {
				input.teamID = this.searchsel1.value.id
			}

			await this.$store
				.dispatch('users', input)
				.then(async res => {
					let list = []
					this.userIDArr = []
					this.table.total = res.usersConnection.aggregate.count
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
						listData.salesPhoneNumber = element.salesPhoneNumber
							? element.salesPhoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
							: '-'
						listData.created_at = this.$moment(element.created_at).format('YYYY-MM-DD')
						listData.teamID = element.teamID ? element.teamID : '-'
						listData.rankID = element.rankID ? element.rankID : '-'
						listData.history = element.history ? element.history : []
						listData.data5 === '미확인' ? (listData.vacation = '-') : ''
						list.push(listData)
					})
					if (input.page) this.table.page = input.page
					this.userLists = list
					this.allCounselor = list.length
					if (this.status_Keyword.value === '전체') {
						this.table.items = list
						this.$store.state.loading = false
					} else {
						let arrayData = []
						arrayData = list.filter(x => x.data5 === this.status_Keyword.value)
						this.table.items = arrayData
						this.$store.state.loading = false
					}
				})
				.catch(err => {
					console.log({ err })
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

					if (element2.startWork && element2.endWork) {
						this.userLists[workIndex]['data8'] = this.timeCheck(element2.startWork, element2.endWork)
					}
				})
			})
		},

		async vacationView(item) {
			await this.$store.dispatch('vacations', item).then(res => {
				res.vacations.forEach(el => {
					let workIndex = this.userLists.findIndex(item => item.id === el.userID)

					this.userLists[workIndex]['vacationDate'] = el.date ? el.date : '-'
					this.userLists[workIndex]['vacationReason'] = el.vacationReason
					this.userLists[workIndex]['vacation'] = el.vacationStatus
					this.userLists[workIndex]['vacationType'] = el.vacationType
					this.userLists[workIndex]['vacationCreated_at'] = el.created_at
					this.userLists[workIndex]['vacationID'] = el.id
					this.userLists[workIndex]['vacationRejectComment'] = el.rejectComment
				})
			})
		},
		clickExport() {
			if (this.selected.length > 0) {
				this.downloadDialogStatus = {
					open: true,
					content: '엑셀 다운로드를 받으시겠습니까?',
					cancelBtnTxt: '취소',
					cancelBtn: true,
					btnTxt: '다운로드',
					activeBtn: true,
				}
				// document.getElementById('clientExcel').click()
			} else {
				this.downloadDialogStatus = {
					open: true,
					content: '엑셀 다운로드 받을 상담사를 선택해주세요.',
					cancelBtnTxt: '확인',
					cancelBtn: true,
				}
			}
			// document.getElementById(`clientExcel`).click()
		},
		downloadActiveSave() {
			document.getElementById('clientExcel').click()
			this.downloadDialogStatus.open = false
		},

		page(val) {
			this.table.page = val
			this.paginAPIs()
		},
		async paginAPIs() {
			let input = {
				start: (this.table.page - 1) * this.table.pagination.itemsPerPage,
				limit: this.table.pagination.itemsPerPage,
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.viewUsers(input)
			let input2 = {
				date: this.$moment().format('YYYY-MM-DD'),
				roleName: 'Counselor',
				userID: this.userIDArr,
			}
			let input3 = {
				date: this.$moment().format('YYYY-MM-DD'),
				idArr: this.userIDArr,
			}
			await this.gotoworksView(input2)
			await this.vacationView(input3)
		},
		async pagination(item) {
			this.table.pagination = item
			if (item.itemsPerPage > this.table.total) this.table.page = 1
			this.paginAPIs()
		},

		async update() {
			await this.me()
			await this.getTeams()
			await this.getRanks()
			let input = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.viewUsers(input)
			let input2 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment().format('YYYY-MM-DD'),
				roleName: 'Counselor',
				userID: this.userIDArr,
			}
			let input3 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment().format('YYYY-MM-DD'),
				// roleName: 'Counselor',
				idArr: this.userIDArr,
			}
			await this.gotoworksView(input2)
			await this.unattendedVacation()
			await this.vacationView(input3)
			await this.dataSetting()
		},

		async click_date_before() {
			await this.getTeams()
			await this.getRanks()
			let input = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.viewUsers(input)
			let input2 = {
				date: this.$moment(this.date_picker.date)
					.subtract(1, 'd')
					.format('YYYY-MM-DD'),
				roleName: 'Counselor',
				userID: this.userIDArr,
			}
			await this.gotoworksView(input2)
			let input3 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment(this.date_picker.date)
					.subtract(1, 'd')
					.format('YYYY-MM-DD'),
				roleName: 'Counselor',
				idArr: this.userIDArr,
			}
			await this.vacationView(input3)
			await this.dataSetting()
			this.date_picker.date = this.$moment(this.date_picker.date).subtract(1, 'd')
		},
		async click_date_next() {
			await this.getTeams()
			await this.getRanks()
			let input = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			let input2 = {
				date: this.$moment(this.date_picker.date)
					.add(1, 'd')
					.format('YYYY-MM-DD'),
				roleName: 'Counselor',
				userID: this.userIDArr,
			}
			let input3 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment(this.date_picker.date)
					.add(1, 'd')
					.format('YYYY-MM-DD'),
				roleName: 'Counselor',
				idArr: this.userIDArr,
			}
			await this.viewUsers(input)
			await this.gotoworksView(input2)
			await this.vacationView(input3)
			await this.dataSetting()
			this.date_picker.date = this.$moment(this.date_picker.date).add(1, 'd')
		},
		async click_date_now() {
			await this.getTeams()
			await this.getRanks()
			let input = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			let input2 = {
				date: this.$moment().format('YYYY-MM-DD'),
				roleName: 'Counselor',
				userID: this.userIDArr,
			}
			let input3 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment().format('YYYY-MM-DD'),
				roleName: 'Counselor',
				idArr: this.userIDArr,
			}
			await this.viewUsers(input)
			await this.gotoworksView(input2)
			await this.vacationView(input3)
			await this.dataSetting()
			this.date_picker.date = this.$moment()
		},
		async click_date_picker() {
			await this.getTeams()
			await this.getRanks()
			this.$store.state.loading = true
			let input = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			let input2 = {
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
				userID: this.userIDArr,
			}
			let input3 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
				roleName: 'Counselor',
				idArr: this.userIDArr,
			}
			await this.viewUsers(input)
			await this.gotoworksView(input2)
			await this.vacationView(input3)
			await this.dataSetting()
			this.date_picker.date = this.$moment(this.date_picker.date)
			this.$store.state.loading = false
		},

		goToWorkStatus(status) {
			let ifStartWork = this.$moment().format('HH:mm:ss.SSS')
			let elseStartWork = this.$moment(this.date).format('HH:mm:ss.SSS')
			if (status.data6) {
				const data = {
					id: status.gotoworksAll.id,
				}
				this.deleteGotoworkAction(data)
			} else {
				const data = {
					date: this.$moment(this.date).format('YYYY-MM-DD'),
					userID: status.id,
					business: this.searchsel.value.id,
					status: 'startWork',
				}
				if (this.$moment().format('YYYY-MM-DD') === this.date) {
					data.startWork = ifStartWork
				} else {
					data.startWork = elseStartWork
				}

				this.createGotoworkAction(data)
			}
		},
		leaveWorkStatus(status) {
			if (status.data7) {
				const data = {
					id: status.gotoworksAll.id,
					userID: status.id,
					endWork: null,
					status: 'startWork',
				}
				this.updateGotoworkAction(data)
			} else {
				if (this.$moment(this.date).format('YYYY-MM-DD') === this.$moment(this.$moment().format('YYYY-MM-DD')).format('YYYY-MM-DD')) {
					const data = {
						id: status.gotoworksAll.id,
						userID: status.id,

						endWork: this.$moment().format('HH:mm:ss.SSS'),
						status: 'endWork',
					}
					this.updateGotoworkAction(data)
				} else {
					const data = {
						id: status.gotoworksAll.id,
						userID: status.id,
						endWork: this.$moment(this.date).format('HH:mm:ss.SSS'),
						status: 'endWork',
					}
					this.updateGotoworkAction(data)
				}
			}
		},
		createGotoworkAction(data) {
			this.$store
				.dispatch('createGotowork', data)
				.then(async () => {
					let input = {
						date: this.$moment(this.date).format('YYYY-MM-DD'),
						roleName: 'Counselor',
						userID: this.userIDArr,
					}
					let input2 = {
						roleName: 'Counselor',
						businessID: this.$store.state.businessSelectBox.value,
					}
					let input3 = {
						start: 0,
						limit: this.table.pagination.itemsPerPage,
						date: this.$moment().format('YYYY-MM-DD'),
						// roleName: 'Counselor',
						idArr: this.userIDArr,
					}
					await this.viewUsers(input2)
					await this.gotoworksView(input)
					await this.unattendedVacation()
					await this.vacationView(input3)
					await this.dataSetting()
				})
				.catch(err => {
					console.log({ err })
				})
		},
		updateGotoworkAction(data) {
			this.$store
				.dispatch('updateGotowork', data)
				.then(async () => {
					let input = {
						date: this.$moment(this.date).format('YYYY-MM-DD'),
						roleName: 'Counselor',
						userID: this.userIDArr,
					}
					let input2 = {
						roleName: 'Counselor',
						businessID: this.$store.state.businessSelectBox.value,
					}
					let input3 = {
						start: 0,
						limit: this.table.pagination.itemsPerPage,
						date: this.$moment().format('YYYY-MM-DD'),
						// roleName: 'Counselor',
						idArr: this.userIDArr,
					}
					await this.viewUsers(input2)
					await this.gotoworksView(input)
					await this.unattendedVacation()
					await this.vacationView(input3)
					await this.dataSetting()
				})
				.catch(err => {
					console.log({ err })
				})
		},
		deleteGotoworkAction(data) {
			this.$store
				.dispatch('deleteGotowork', data)
				.then(async () => {
					let input = {
						date: this.$moment(this.date).format('YYYY-MM-DD'),
						roleName: 'Counselor',
						userID: this.userIDArr,
					}
					let input2 = {
						roleName: 'Counselor',
						businessID: this.$store.state.businessSelectBox.value,
					}
					let input3 = {
						start: 0,
						limit: this.table.pagination.itemsPerPage,
						date: this.$moment().format('YYYY-MM-DD'),
						// roleName: 'Counselor',
						idArr: this.userIDArr,
					}
					await this.viewUsers(input2)
					await this.gotoworksView(input)
					await this.unattendedVacation()
					await this.vacationView(input3)
					await this.dataSetting()
				})
				.catch(err => {
					console.log({ err })
				})
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
		async SearchBiz() {
			this.$store.state.loading = true
			let input = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.viewUsers(input)
			let input2 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
				userID: this.userIDArr,
			}
			await this.gotoworksView(input2)
			let input3 = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
				idArr: this.userIDArr,
			}

			await this.vacationView(input3)
			await this.dataSetting()
			this.$store.state.loading = false
		},
		gotoWorkDialogOpen(item) {
			this.editGotoworkData = {
				title: '출근 시간변경',
				counselor: item.data1,
				status: 'goto',
				item: item,
			}
			this.editGotoworkDialog = true
		},
		leaveWorkDialogOpen(item) {
			this.editGotoworkData = {
				title: '퇴근 시간변경',
				counselor: item.data1,
				status: 'leave',
				item: item,
			}
			this.editGotoworkDialog = true
		},
		goToworkTimeCheck() {
			if (this.editGotoworkData.status === 'goto') {
				if (this.startTime === '') {
					this.saveDialogStatus = {
						open: true,
						content: '시간을 입력해주세요.',
						cancelBtnTxt: '확인',
						cancelBtn: true,
					}
				} else {
					this.saveDialogStatus = {
						open: true,
						content: '저장하시겠습니까?',
						cancelBtnTxt: '취소',
						cancelBtn: true,
						btnTxt: '저장',
						activeBtn: true,
					}
				}
			} else if (this.editGotoworkData.status === 'leave') {
				if (this.endTime === '') {
					this.saveDialogStatus = {
						open: true,
						content: '시간을 입력해주세요.',
						cancelBtnTxt: '확인',
						cancelBtn: true,
					}
				} else {
					this.saveDialogStatus = {
						open: true,
						content: '저장하시겠습니까?',
						cancelBtnTxt: '취소',
						cancelBtn: true,
						btnTxt: '저장',
						activeBtn: true,
					}
				}
			}
		},
		close() {
			this.editGotoworkDialog = false
		},
		activeSave() {
			if (this.editGotoworkData.status === 'goto') {
				const formattedStartTime = this.$moment(this.startTime, 'HH:mm').format('HH:mm:ss.SSS')
				const data = {
					id: this.editGotoworkData.item.gotoworksAll.id,
					userID: this.editGotoworkData.item.id,
					startWork: formattedStartTime,
				}

				this.updateGotoworkAction(data)
			} else if (this.editGotoworkData.status === 'leave') {
				const formattedEndTime = this.$moment(this.endTime, 'HH:mm').format('HH:mm:ss.SSS')
				const data = {
					id: this.editGotoworkData.item.gotoworksAll.id,
					userID: this.editGotoworkData.item.id,
					endWork: formattedEndTime,
				}
				this.updateGotoworkAction(data)
			}
			this.editGotoworkDialog = false
			this.saveDialogStatus.open = false
		},
		detailClick(item) {
			this.newDialog2.title = '근태정보'
			this.newDialog2.dialog = true
			this.newDialog2.edit = true
			this.newDialog2.editData = item
		},
		click_vacation_status(item) {
			this.newDialog.title = '신청 연차 관리'
			this.newDialog.dialog = true
			this.newDialog.edit = true
			this.newDialog.editData = item
		},
		createUnattendedVacation() {
			this.newDialog3.title = '미처리 연차 신청 현황'
			this.newDialog3.dialog = true
			this.newDialog3.edit = true
		},
		async unattendedVacation() {
			let unattendedData = {
				start: 0,
				limit: this.table.pagination.itemsPerPage,
				vacationStatus: 'waiting',
			}

			await this.$store.dispatch('vacations', unattendedData).then(res => {
				this.unattendedLength = res.vacations.length
			})
		},
		vacation_filter(val) {
			if (val) {
				if (val === 'agree') {
					return '승인'
				} else if (val === 'disagree') {
					return '미승인'
				} else if (val === 'waiting') {
					return '처리전'
				} else {
					return '-'
				}
			}
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
	.v-data-footer__pagination {
	}
	.v-data-footer__icons-before {
	}
	.v-data-footer__icons-after {
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
.btn-style3 {
	box-shadow: none;
	background-color: #ff7519 !important;
	border: 1px solid #ff7519;
	color: #ff7519;
	border-radius: 5px;
	position: absolute;
	bottom: 15px;
	height: 15px;
	left: 130px;
}
</style>
