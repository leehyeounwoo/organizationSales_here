<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search">
			<v-layout align-center justify-start>
				<v-flex>
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
				['items-per-page-text']: `• Total : ${table.total ? table.total : table.items.length}`,
				['page-text']: ` 1 - ${table.itemsPerPage ? Math.ceil(table.total / table.itemsPerPage) : Math.ceil(table.items.length / 10)} of ${
					table.page ? table.page : 1
				} `,
			}"
			@pagination="pagination($event)"
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
		</v-data-table>
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
									:max="editGotoworkData.item.data4 === '-' ? '' : $moment(editGotoworkData.item.data4).format('HH:mm')"
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
								<v-time-picker
									v-if="endTimeDialog"
									:min="$moment(editGotoworkData.item.data3).format('HH:mm')"
									v-model="endTime"
									full-width
								>
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
		<detail :setdialog="newDialog2"></detail>
		<vacationStatus :setdialog="newDialog" @update="update"></vacationStatus>
	</div>
</template>

<script>
import { selectBox, txtField } from '@/components/index.js'
import { saveDialog, DatepickerDialog } from '@/components'
import detail from './detail.vue'
import vacationStatus from './vacationStatus.vue'
// import moment from 'moment'
// import 'moment/locale/ko'

export default {
	components: {
		selectBox,
		txtField,
		detail,
		vacationStatus,
		saveDialog,
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
					{ text: '영업번호', value: 'salesPhoneNumber', align: 'center', width: '10%' },
					{ text: '등록일', value: 'created_at', align: 'center', width: '7%' },
					{ text: '팀', value: 'team', align: 'center', width: '7%' },
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
		this.$store.state.loading = true
		await this.me()
		await this.getTeams()
		let input = {
			start: 0,
			limit: 10,
			date: this.$moment().format('YYYY-MM-DD'),
			role: '3',
		}
		await this.viewUsers(input)
		this.$store.state.loading = false
	},
	mounted() {},

	methods: {
		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.data
				console.log(this.$store.state.meData)
			})
		},
		async getTeams() {
			let data = {}

			await this.$store.dispatch('teams', data).then(res => {
				this.searchsel1.items = JSON.parse(JSON.stringify(res.teams))
				this.searchsel1.items.unshift('전체')
				this.searchsel1.value = '전체'
			})
		},
		async viewUsers(input) {
			this.$store.state.loading = true
			if (this.searchsel1.value !== '전체' && this.searchsel1.value !== '') {
				input.team = this.searchsel1.value.id
			}

			if (this.search_project) {
				input.username = this.search_project
			} else {
				input
			}
			if (this.searchsel1.value !== '전체' && this.searchsel1.value !== '') {
				input.teamID = this.searchsel1.value.id
			}

			if (this.userIDArr !== []) {
				input.userID = this.userIDArr
			}
			console.log(input)
			await this.$store
				.dispatch('users', input)
				.then(async res => {
					console.log(res.users)
					let list = []
					let workCount = 0
					let endWorkCount = 0
					let holiDayCount = 0
					let userIDArr = []

					for (let i = 0; i < res.users.length; i++) {
						userIDArr.push(res.users[i].id)
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
						listData.salesPhoneNumber = element.salesPhoneNumber
							? element.salesPhoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
							: '-'
						listData.created_at = this.$moment(element.created_at).format('YYYY-MM-DD')
						listData.team = element.teamID ? element.teamID + '팀' : '-'
						listData.history = element.history ? element.history : []

						list.push(listData)
						this.table.total = res.usersConnection.aggregate.count
						this.table.page = input.page
					})

					console.log(userIDArr)
					await this.$store.dispatch('gotoWork', input).then(res2 => {
						console.log(res2)
						console.log(list)
						res2.gotoworks.forEach(element2 => {
							let workIndex = list.findIndex(item => item.id === element2.userID)
							console.log(this.$moment(element2.startWork)._i.slice(0, 5))
							list[workIndex]['gotoworksAll'] = element2
							list[workIndex]['data3'] = element2.startWork !== null ? this.$moment(element2.startWork)._i.slice(0, 5) : '-'
							list[workIndex]['data4'] = element2.endWork !== null ? this.$moment(element2.endWork)._i.slice(0, 5) : '-'
							list[workIndex]['data5'] =
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
								list[workIndex]['data6'] = true
								list[workIndex]['data7'] = true
								list[workIndex]['data8'] = '-'
							} else {
								list[workIndex]['data6'] = element2.startWork ? true : false
								list[workIndex]['data7'] = element2.endWork ? true : false
							}

							if (element2.startWork && element2.endWork) {
								list[workIndex]['data8'] = this.timeCheck(element2.startWork, element2.endWork)
							}
							if (element2.status === 'startWork') {
								workCount = workCount + 1
							}
							if (element2.status === 'endWork') {
								endWorkCount = endWorkCount + 1
							}
							if (element2.status === 'afternoonVacation' || element2.status === 'morningVacation' || element2.status === 'vacation') {
								holiDayCount = holiDayCount + 1
							}

							this.table.items = list
							console.log('최종', this.table.items)
							// element.vacations.reverse()
							// let vactionIndex = element.vacations.findIndex(el => el.vacationDate === this.$moment(this.date).format('YYYY-MM-DD'))
							// if (vactionIndex !== -1) {
							// 	listData.vacationData = element.vacations[vactionIndex]
							// 	listData.vacation = element.vacations[vactionIndex].vacationStatus
							// } else {
							// 	listData.vacation = '-'
							// }
						})
					})

					this.allCounselor = list.length
					this.work = workCount
					this.endWork = endWorkCount
					this.holiDay = holiDayCount
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

		update() {
			let input = {
				date: this.$moment(this.date).format('YYYY-MM-DD'),
				role: '3',
			}

			this.viewUsers(input)
		},

		click_date_before() {
			let input = {
				date: this.$moment(this.date_picker.date)
					.subtract(1, 'd')
					.format('YYYY-MM-DD'),
				role: '3',
			}
			this.viewUsers(input)
			this.date_picker.date = this.$moment(this.date_picker.date).subtract(1, 'd')
		},
		click_date_next() {
			let input = {
				date: this.$moment(this.date_picker.date)
					.add(1, 'd')
					.format('YYYY-MM-DD'),
				role: '3',
			}

			this.viewUsers(input)
			this.date_picker.date = this.$moment(this.date_picker.date).add(1, 'd')
		},
		click_date_now() {
			let input = {
				date: this.$moment().format('YYYY-MM-DD'),
				role: '3',
			}
			this.viewUsers(input)
			this.date_picker.date = this.$moment()
		},
		click_date_picker() {
			let input = {
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
			}
			console.log(input, '22')
			this.viewUsers(input)
			this.date = this.$moment(this.date_picker.date)
		},

		goToWorkStatus(status) {
			let ifStartWork = this.$moment().format('HH:mm:ss.SSS')
			let elseStartWork = this.$moment(this.date).format('HH:mm:ss.SSS')
			console.log(status)
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
			console.log(status)
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
						id: status.all.gotoworks[0].id,
						user: status.id,
						endWork: this.$moment(this.date).format('HH:mm:ss.SSS'),
						status: 'endWork',
					}
					this.updateGotoworkAction(data)
				}
			}
		},
		createGotoworkAction(data) {
			console.log(data)
			this.$store
				.dispatch('createGotowork', data)
				.then(() => {
					let input = {
						date: this.$moment(this.date).format('YYYY-MM-DD'),
						role: '3',
					}
					this.viewUsers(input)
				})
				.catch(err => {
					console.log({ err })
				})
		},
		updateGotoworkAction(data) {
			console.log(data)
			this.$store
				.dispatch('updateGotowork', data)
				.then(() => {
					let input = {
						date: this.$moment(this.date).format('YYYY-MM-DD'),
						role: '3',
					}
					this.viewUsers(input)
				})
				.catch(err => {
					console.log({ err })
				})
		},
		deleteGotoworkAction(data) {
			this.$store
				.dispatch('deleteGotowork', data)
				.then(() => {
					let input = {
						date: this.$moment(this.date).format('YYYY-MM-DD'),
						role: '3',
					}
					this.viewUsers(input)
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
			let data = { date: this.$moment(this.date).format('YYYY-MM-DD') }

			await this.viewUsers(data)
		},
		gotoWorkDialogOpen(item) {
			console.log('클릭')
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
			let today = this.$moment(this.date).format('YYYY-MM-DD')
			console.log(this.editGotoworkData)
			if (this.editGotoworkData.status === 'goto') {
				const data = {
					id: this.editGotoworkData.item.all.gotoworks[0].id,
					user: this.editGotoworkData.item.id,
					startWork: this.$moment(today + ' ' + this.startTime),
				}
				console.log(data)
				this.updateGotoworkAction(data)
			} else if (this.editGotoworkData.status === 'leave') {
				const data = {
					id: this.editGotoworkData.item.all.gotoworks[0].id,
					user: this.editGotoworkData.item.id,
					endWork: this.$moment(today + ' ' + this.endTime),
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
		vacation_filter(val) {
			console.log(val)
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
</style>
