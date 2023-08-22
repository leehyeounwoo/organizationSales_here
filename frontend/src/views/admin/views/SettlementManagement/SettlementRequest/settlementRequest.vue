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
				<datatable :datatable="settlementTable" class="notice_table" @pagination="pagination" @click="editUserData" />
			</v-flex>
			<v-flex xs4 class="ml-10">
				<v-layout style="border-top:1px solid black; height: 50px">
					<v-flex class="notice_right_table" xs3>
						계약자
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout>
							<v-flex style="display: flex; justify-content: space-around; align-items: center;">
								<span id="usernameSpan" class="spanClass"></span>
								<span id="phoneNumberSpan" class="spanClass"></span>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3>
						계약물건
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<span id="productSpan" class="spanClass ml-3"></span>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex class="notice_right_table" xs3>
						정산요청이력
					</v-flex>
					<v-flex xs10 class="notice_right_table2" style="height:163px; overflow-y: auto;">
						<v-layout justify-center align-center>
							<v-flex xs5 class="client_table_style" style="border-right: 1px solid #C8C8C8">
								<span class="borderRightSubFont">날짜</span>
							</v-flex>
							<v-flex xs4 class="client_table_style" style="border-right: 1px solid #C8C8C8">
								<span class="borderRightSubFont">내용</span>
							</v-flex>
							<v-flex xs3 class="client_table_style">
								<span class="borderRightSubFont">상태</span>
							</v-flex>
						</v-layout>
						<div v-if="editLogsVariable.length > 0">
							<v-layout v-for="(item, index) of editLogsVariable" :key="index" justify-center align-center>
								<v-flex xs5 class="client_table_style" style="background-color: #fff; border-right: 1px solid #C8C8C8">
									<span class="borderRightSubFont">{{ $moment(item.created_at).format('YYYY-MM-DD HH:mm') }}</span>
								</v-flex>
								<v-flex xs4 class="client_table_style" style="background-color: #fff; border-right: 1px solid #C8C8C8">
									<span class="borderRightSubFont">{{ item.editDetail }}</span>
								</v-flex>
								<v-flex xs3 class="client_table_style" style="background-color: #fff;">
									<span class="borderRightSubFont">{{
										item.editStatus === 'agree' ? '승인' : item.editStatus === 'waiting' ? '대기' : '반려'
									}}</span>
								</v-flex>
							</v-layout>
						</div>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3>
						증빙서류
					</v-flex>
					<v-flex xs10 class="notice_right_table2" style="height:163px; overflow-y: scroll;">
						<v-layout class="attachmentClass" v-for="(filename, index) in attachmentNameList" :key="index" style="">
							<v-flex style="width: 100%; height: 100%;" @click="e => viewAttachment(e, filename.url)">
								<span class="attachmentSpanClass">{{ filename.name }}</span>
							</v-flex>
							<v-icon class="attachmentIconClass" @click="deleteAttachment(filename.id)">mdi-alpha-x-circle-outline</v-icon>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						처리
					</v-flex>
					<v-flex xs10 class="notice_right_table2" style="height:40px; display: flex; align-items: center;">
						<v-radio-group v-model="agreeType" hide-details row class="notice_radio ma-3">
							<v-radio class="mb-0 mr-2" label="요청 승인" :value="true" color="#009dac"></v-radio>
							<v-radio class="mb-0" label="반려" :value="false" color="#009dac"></v-radio>
						</v-radio-group>
						<v-btn @click="openModal" class="ml-2 search_btn2" style="width: 100%; " color="#3e7ccc"><v-icon>mdi-check</v-icon>적용</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
		<sweetAlert :dialog="saveDialogStatus" @click="click_agree"></sweetAlert>
		<sweetAlert :dialog="sweetDialog_info" @click="click_confirm" />
	</div>
</template>
<script>
import { selectBox, txtField, datatable, sweetAlert } from '@/components/index.js'
export default {
	components: {
		selectBox,
		txtField,
		datatable,
		sweetAlert,
	},

	data() {
		return {
			date: this.$moment(),
			agreeType: false,
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
				title: '',
				content: ``,
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				cancelBtnText: '취소',
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

			selected: [],
			allCounselor: 0,
			work: 0,
			endWork: 0,
			holiDay: 0,
			settlementTable: {
				headers: [
					{ text: '직원명', sortable: false, value: 'username', align: 'center', width: '10%' },
					{ text: '연락처', sortable: false, value: 'phoneNumber', align: 'center', width: '10%' },
					{ text: '영업번호', sortable: false, value: 'settlementPhoneNumber', align: 'center', width: '10%' },
					{ text: '팀', sortable: false, value: 'teamText', align: 'center', width: '10%' },
					{ text: '계약일', sortable: false, value: 'contractDate', align: 'center', width: '10%' },
					{ text: '계약물건', sortable: false, value: 'product', align: 'center', width: '10%' },
					{ text: '요청일', sortable: false, value: 'settlementCreated_at', align: 'center', width: '15%' },
					{ text: '차수', sortable: false, value: 'degree', align: 'center', width: '10%' },
					{ text: '상태', sortable: false, value: 'settlementStatus', align: 'center', width: '5%' },
					{ text: '비고', sortable: false, value: 'detailEtc', align: 'center', width: '5%' },
				],
				headerCheck: false,
				items: [],
				origin_items: [],
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
				items: [
					{ title: '전체', value: 'all' },
					{ title: '승인', value: 'agree' },
					{ title: '반려', value: 'disagree' },
					{ title: '대기', value: 'waiting' },
				],
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
			userArrData: [],
			userData: [],
			teamArrData: [],
			teamData: [],
			rankArrData: [],
			rankData: [],
			productData: [],
			productArrData: [],
			settlementData: [],
			settlementArrData: [],
			list: [],
			attachmentNameList: [],
			finalSettlementData: [],
			editLogsVariable: [],
		}
	},

	async created() {
		await this.me()
		await this.searchSelect()
		const settlementData = {
			date: this.$moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
			// settlementStatus: 'agree',
		}
		await this.settlementView(settlementData)
		const usersViewData = {
			idArr: this.userArrData,
			roleName: 'Counselor',
		}
		await this.usersView(usersViewData)
		const productsViewData = {
			idArr: this.productArrData,
		}
		await this.productsView(productsViewData)
		const teamsViewData = {
			idArr: this.teamArrData,
		}
		await this.teamsView(teamsViewData)
		const ranksViewData = {
			idArr: this.rankArrData,
		}
		await this.ranksView(ranksViewData)
		await this.dataSetting()
	},
	mounted() {},

	methods: {
		SearchBiz() {
			let item = JSON.parse(JSON.stringify(this.settlementTable.origin_items))
			if (this.searchsel1.value.value && this.searchsel1.value.value !== 'all') {
				item = item.filter(el => el.teamID === this.searchsel1.value.value)
			}
			if (this.searchsel.value.value && this.searchsel.value.value !== 'all') {
				item = item.filter(el => el.settlementStatus === this.searchsel.value.value)
			}
			if (this.search_project) {
				item = item.filter(el => el.username.indexOf(this.search_project) !== -1)
			}
			this.settlementTable.items = item
		},
		async searchSelect() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.$store.dispatch('teams', data).then(res => {
				let item = [{ title: '전체', value: 'all' }]
				res.teams.forEach(el => {
					item.push({ title: el.title, value: el.id })
				})
				this.searchsel1.items = item
			})
		},
		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.me
			})
		},
		async dataSetting() {
			for (let index = 0; index < this.userData.length; index++) {
				const element = this.userData[index]

				let teamTitle = this.teamData.filter(x => x.id === element.teamID)[0].title

				element.teamID = `${teamTitle}`
				this.list.teamID = element.teamID
			}

			this.settlementTable.items = this.list
			this.settlementTable.origin_items = JSON.parse(JSON.stringify(this.list))
		},

		async settlementView(settlementData) {
			await this.$store.dispatch('settlements', settlementData).then(res => {
				console.log(res)
				this.settlementTable.total = res.settlementsConnection.aggregate.count
				res.settlements.forEach(element => {
					let listData = {}
					listData.settlements = element
					listData.id = element.id
					listData.settlementCreated_at = this.$moment(element.created_at).format('YYYY-MM-DD HH:mm')
					listData.contractDate = this.$moment(element.contractDate).format('YYYY-MM-DD HH:mm')
					listData.settlementStatus = element.settlementStatus
					listData.degree = element.degree
					listData.userID = element.userID
					listData.ProductID = element.ProductID
					this.list.push(listData)
				})
				this.userArrData = res.settlements.filter(x => x.userID).map(x => x.userID)
				this.productArrData = res.settlements.filter(x => x.ProductID).map(x => x.ProductID)
			})
		},

		async usersView(usersViewData) {
			await this.$store
				.dispatch('users', usersViewData)
				.then(res => {
					this.userData = res.users
					res.users.forEach(element => {
						for (let items of this.list) {
							if (items.userID === element.id) {
								items.users = element
								items.username = element.username
								items.phoneNumber = element.phoneNumber
								items.settlementPhoneNumber = element.salesPhoneNumber
								items.teamID = element.teamID
								let teamText = this.searchsel1.items.filter(el => el.value === String(items.teamID))
								if (items.teamID && teamText.length > 0) {
									items.teamText = teamText[0].title
								} else {
									items.teamText = ''
								}
							}
						}
					})
					this.teamArrData = res.users.filter(x => x.teamID).map(x => x.teamID)
					this.rankArrData = res.users.filter(x => x.rankId).map(x => x.rankId)
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async teamsView(teamsViewData) {
			await this.$store
				.dispatch('teams', teamsViewData)
				.then(res => {
					this.teamData = res.teams
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

		async productsView(productsViewData) {
			await this.$store.dispatch('products', productsViewData).then(res => {
				for (let index = 0; index < this.list.length; index++) {
					const element = this.list[index]

					let productData = res.products.filter(x => x.id === element.ProductID)

					if (productData.length > 0) {
						element.products = productData[0]
						element.product = productData[0].housingType + productData[0].dong + '동' + productData[0].ho + '호'
					}
				}
			})

			// res.products.forEach(element => {
			// 	let listData = this.list[this.list.findIndex(item => item.ProductID === element.id)]
			// 	console.log(this.list.filter(x => x.ProductID === element.id))
			// 	console.log(this.list)
			// 	listData.products = element
			// 	listData.product = element.housingType + element.dong + '동' + element.ho + '호'
			// }),
			// )
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

				await this.usersView(range)
			} else if (item.itemsPerPage !== this.table.itemsPerPage) {
				// 한페이지에 보여줄 아이템 개수 변경
				let range = {
					start: 0,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: 1,
					date: this.$moment(this.date).format('YYYY-MM-DD'),
				}

				await this.usersView(range)
			} else if (item.page < this.table.page) {
				// 이전 페이지
				let range = {
					start: (item.page - 1) * item.itemsPerPage,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: item.page,
					date: this.$moment(this.date).format('YYYY-MM-DD'),
				}

				await this.usersView(range)
			}
		},
		date_filter(val) {
			let date = this.$moment(val).format('ddd')

			return this.$moment(val).format('YYYY년 MM월 DD일') + `(${date})`
		},
		update() {
			let input = {
				date: this.$moment(this.date).format('YYYY-MM-DD'),
			}

			this.usersView(input)
		},
		click_date_before() {
			let input = {
				date: this.$moment(this.date)
					.subtract(1, 'd')
					.format('YYYY-MM-DD'),
			}

			this.usersView(input)

			this.date = this.$moment(this.date).subtract(1, 'd')
		},
		click_date_next() {
			let input = {
				date: this.$moment(this.date)
					.add(1, 'd')
					.format('YYYY-MM-DD'),
			}

			this.usersView(input)
			this.date = this.$moment(this.date).add(1, 'd')
		},
		click_date_now() {
			let input = {
				date: this.$moment().format('YYYY-MM-DD'),
			}

			this.usersView(input)
			this.date = this.$moment()
		},
		click_date_picker() {
			let input = {
				date: this.$moment(this.date_picker.date).format('YYYY-MM-DD'),
			}
			if (this.$store.state.meData.role.id !== '4') {
				input.business = this.$store.state.meData.businessID
			}
			this.usersView(input)
			this.date = this.$moment(this.date_picker.date)
		},
		editUserData(val) {
			this.editLogsVariable = []
			this.attachmentNameList = []
			this.finalSettlementData = []
			this.finalSettlementData = val
			console.log('파이널', this.finalSettlementData)
			let data = {
				settlementID: this.finalSettlementData.ProductID,
			}
			console.log(data)
			this.$store.dispatch('settlementEditLogs', data).then(res => {
				console.log(res)
				if (this.finalSettlementData.settlements.productID === res.settlementEditLogs.settlementID)
					this.editLogsVariable = res.settlementEditLogs
				console.log(this.editLogsVariable)
			})
			const usernameSpan = document.getElementById('usernameSpan')
			if (usernameSpan) {
				usernameSpan.textContent = `${val.username}`
			}

			const phoneNumberSpan = document.getElementById('phoneNumberSpan')
			if (phoneNumberSpan) {
				phoneNumberSpan.textContent = `${val.phoneNumber}`
			}

			const productSpan = document.getElementById('productSpan')
			if (productSpan) {
				productSpan.textContent = `${val.product}`
			}

			if (val.settlements.attachment.length > 0) {
				for (let i = 0; i < val.settlements.attachment.length; i++) {
					this.attachmentNameList.push({
						name: val.settlements.attachment[i].name,
						url: val.settlements.attachment[i].url,
						id: val.settlements.attachment[i].id,
					})
				}
			}

			if (val.settlementStatus === 'agree') {
				this.agreeType = true
			} else {
				this.agreeType = false
			}
		},
		openModal() {
			if (this.agreeType === true) {
				if (this.finalSettlementData.length === 0) {
					this.sweetDialog_info.title = `승인 처리 실패`
					this.sweetDialog_info.content = `승인 처리할 데이터가 없습니다`
					this.sweetDialog_info.modalValue = ''
					this.sweetDialog_info.buttonType = 'oneBtn'
					this.sweetDialog_info.open = true
				} else {
					if (this.finalSettlementData.settlementStatus === 'agree' && this.agreeType === true) {
						this.sweetDialog_info.title = `승인 처리 실패`
						this.sweetDialog_info.content = `이미 승인된 정산요청입니다`
						this.sweetDialog_info.modalValue = ''
						this.sweetDialog_info.buttonType = 'oneBtn'
						this.sweetDialog_info.open = true
					} else {
						this.saveDialogStatus.title = `정산 요청 승인`
						this.saveDialogStatus.content = `정산요청을 승인합니다`
						this.saveDialogStatus.open = true
					}
				}
			} else {
				if (this.finalSettlementData.length === 0) {
					this.sweetDialog_info.title = `반려 처리 실패`
					this.sweetDialog_info.content = `반려 처리할 데이터가 없습니다`
					this.sweetDialog_info.modalValue = ''
					this.sweetDialog_info.buttonType = 'oneBtn'
					this.sweetDialog_info.open = true
				} else {
					if (this.finalSettlementData.settlementStatus === 'disagree' && this.agreeType === false) {
						this.sweetDialog_info.title = `반려 처리 실패`
						this.sweetDialog_info.content = `이미 반려된 정산요청입니다`
						this.sweetDialog_info.modalValue = ''
						this.sweetDialog_info.buttonType = 'oneBtn'
						this.sweetDialog_info.open = true
					} else {
						this.sweetDialog_info.title = `정산 요청 반려`
						this.sweetDialog_info.content = `위의 사유로 정산요청을 반려합니다`
						this.sweetDialog_info.modalValue = 'no'
						this.sweetDialog_info.buttonType = 'twoBtn'
						this.sweetDialog_info.open = true
					}
				}
			}
		},
		deleteAttachment(val) {
			this.attachmentNameList = this.attachmentNameList.filter(item => item.id !== val)
		},

		click_confirm() {
			this.$store.state.loading = true
			let li = []
			for (let item of this.attachmentNameList) {
				li.push(item.id)
			}

			if (this.finalSettlementData.settlementStatus === 'waiting') {
				let input = {
					id: this.finalSettlementData.id,
					settlementStatus: 'disagree',
					updated_at: this.$moment().format('YYYY-MM-DD HH:mm'),
					adminName: this.$store.state.meData.username,
					rejectComment: this.sweetDialog_info.rejectionReason[0].value,
					attachID: li,
				}
				this.$store
					.dispatch('updateSettlement', input)
					.then(() => {})
					.catch(() => {})
				let input2 = {
					settlementID: this.finalSettlementData.id,
					editStatus: 'disagree',
					editDetail: this.finalSettlementData.degree + '차 요청',
				}
				this.$store.dispatch('createSettlementEditLogs', input2).then(async () => {
					this.sweetDialog_info.open = false
					this.$store.state.loading = true
					this.saveDialogStatus.title = `반려 처리 완료`
					this.saveDialogStatus.content = `정산 요청이 반려되었습니다.`
					this.saveDialogStatus.buttonType = 'oneBtn'
					this.saveDialogStatus.cancelBtnText = '확인'
					this.saveDialogStatus.open = true
					this.settlementTable.items = []
					this.list = []
					const settlementData = {
						date: this.$moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
					}
					await this.settlementView(settlementData)
					const usersViewData = {
						idArr: this.userArrData,
						roleName: 'Counselor',
					}
					await this.usersView(usersViewData)
					const productsViewData = {
						idArr: this.productArrData,
					}
					await this.productsView(productsViewData)
					const teamsViewData = {
						idArr: this.teamArrData,
					}
					await this.teamsView(teamsViewData)
					const ranksViewData = {
						idArr: this.rankArrData,
					}
					await this.ranksView(ranksViewData)
					await this.dataSetting()
					this.$store.state.loading = false
				})
			}
			this.$store.state.loading = false
		},
		click_agree() {
			this.$store.state.loading = true

			if (this.finalSettlementData.settlementStatus === 'waiting') {
				let input = {
					id: this.finalSettlementData.id,
					settlementStatus: 'agree',
					updated_at: this.$moment().format('YYYY-MM-DD HH:mm'),
					adminName: this.$store.state.meData.username,
				}
				this.$store
					.dispatch('updateSettlement', input)
					.then(() => {})
					.catch(() => {})
				let input2 = {
					settlementID: this.finalSettlementData.id,
					editStatus: 'agree',
					editDetail: this.finalSettlementData.degree + '차 요청',
				}
				this.$store.dispatch('createSettlementEditLogs', input2).then(async () => {
					this.sweetDialog_info.open = false
					this.$store.state.loading = true
					this.saveDialogStatus.title = `승인 처리 완료`
					this.saveDialogStatus.content = `정산 요청이 승인되었습니다.`
					this.saveDialogStatus.buttonType = 'oneBtn'
					this.saveDialogStatus.cancelBtnText = '확인'
					this.saveDialogStatus.open = true
					this.settlementTable.items = []
					this.list = []
					const settlementData = {
						date: this.$moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
					}
					await this.settlementView(settlementData)
					const usersViewData = {
						idArr: this.userArrData,
						roleName: 'Counselor',
					}
					await this.usersView(usersViewData)
					const productsViewData = {
						idArr: this.productArrData,
					}
					await this.productsView(productsViewData)
					const teamsViewData = {
						idArr: this.teamArrData,
					}
					await this.teamsView(teamsViewData)
					const ranksViewData = {
						idArr: this.rankArrData,
					}
					await this.ranksView(ranksViewData)
					await this.dataSetting()
					this.$store.state.loading = false
					this.$store.state.loading = false
				})
			}

			this.$store.state.loading = false
		},
		viewAttachment(e, val) {
			const url = process.env.VUE_APP_BACKEND_URL + val
			const link = document.createElement('a')
			link.href = url
			link.target = '_blank'
			link.download = val
			link.click()
			link.remove()
			window.URL.revokeObjectURL(url)
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

.borderRightSubFont {
	width: 26px;
	height: 17px;
	font-family: MalgunGothic;
	font-size: 13px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: normal;
	text-align: center;
	color: #333;
}

.search_btn2 {
	width: 100px !important;
	height: 25px !important;
	margin-right: 10px !important;
	padding: 0 10px !important;
	font-size: 13px;
	font-weight: bold;
	.v-btn__content {
		color: #fff;
	}
}

.spanClass {
	font-family: MalgunGothic;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 3.64;
	letter-spacing: normal;
	text-align: center;
	color: #333;
}

.attachmentClass {
	margin: 8px 13px;
	border-radius: 3px;
	padding: 4px 12px;
	background-color: #f2a629;
	justify-content: space-between;
	align-items: center;
}

.attachmentSpanClass {
	font-size: 13px;
	text-align: left;
	color: #fff;
}
</style>
