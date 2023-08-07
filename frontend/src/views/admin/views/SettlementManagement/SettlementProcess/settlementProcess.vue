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
			<v-flex xs6>
				<datatable :datatable="processTable" class="notice_table" @pagination="pagination" @click="processRequestData"> </datatable>
			</v-flex>
			<v-flex xs6 class="ml-10">
				<v-layout style="border-top:1px solid black">
					<v-flex class="notice_right_table" xs3 style="height: 52.3px;">
						계약자
					</v-flex>
					<v-flex xs6 class="notice_right_table2">
						<v-layout>
							<v-flex style="display: flex; justify-content: space-around; align-items: center;">
								<span id="spanUsername" class="spanClass"></span>
								<span id="spanPhoneNumber" class="spanClass"></span>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-flex xs2 class="notice_right_table" xs3 style="height: 52.3px;">
						계약 내용
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout style="display: flex; justify-content: space-between;align-items: center;">
							<v-flex>
								<span class="spanInfoClass ml-2">계약일 : <span id="contract" class="spanClass"></span> </span>
							</v-flex>
							<v-flex>
								<span class="spanInfoClass ml-2">물건 : <span id="product" class="spanClass"></span> </span>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 52.3px;">
						수수료
					</v-flex>
					<v-flex xs6 class="notice_right_table2" style="display: flex; justify-content: start;align-items: center;">
						<div style="display: flex;">
							<!-- v-mask="'###,###,###,###'"
							@blur="() => charge.txtField.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')" -->
							<txtField3 :txtField="charge.txtField" v-model="charge.txtField.value" class="search_box_admin2 ml-1"></txtField3>
							<span>원</span>
						</div>
					</v-flex>
					<v-flex xs2 class="notice_right_table" xs3 style="height: 52.3px;">
						지급 계좌 정보
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout>
							<v-flex style="display: flex; justify-content: space-around; align-items: center;">
								<span id="userAccountName" class="spanClass"></span>
								<span id="userAccountInfo" class="spanClass"></span>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 40px;"> </v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						계
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						1차
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						2차
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						3차
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						4차
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						5차
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						지급 회차
					</v-flex>
					<v-flex xs3 class="notice_right_table2" style="display: flex; justify-content: center;align-items: center;">
						<selectBox :sel="timessel" :class="'searchSel'" style="font-size:12px"></selectBox>
					</v-flex>
					<v-flex
						v-for="(items, idx) of start_date_picker"
						:key="idx"
						xs3
						class="notice_right_table2 date_picker3"
						style="display: flex; justify-content: center;align-items: center; "
					>
						<DatepickerDialog :picker="items" class="d-flex align-center date_picker3"></DatepickerDialog>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						지급 비율
					</v-flex>
					<v-flex xs3 class="notice_right_table2" style="display: flex; justify-content: center;align-items: center;">
						<txtField :txtField="paymentRateSum.txtField" v-model="paymentRateSum.txtField.value" class="search_box_admin"></txtField
					></v-flex>
					<v-flex
						v-for="(items, idx) of paymentRate"
						:key="idx"
						xs3
						class="notice_right_table2"
						style="display: flex; justify-content: center;align-items: center;"
						@click="alertRate(idx)"
					>
						<txtField :txtField="items.txtField" v-model="items.txtField.value" class="search_box_admin"></txtField>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						지급 금액
					</v-flex>
					<v-flex xs3 class="notice_right_table2" style="display: flex; justify-content: center;align-items: center;">
						<txtField3 :txtField="charge.txtField" v-model="charge.txtField.value" class="search_box_admin"></txtField3
					></v-flex>
					<v-flex
						v-for="(items, idx) of paymentAmount"
						:key="idx"
						xs3
						class="notice_right_table2"
						style="display: flex; justify-content: center;align-items: center;"
					>
						<txtField :txtField="items.txtField" v-model="items.txtField.value" class="search_box_admin"></txtField>
					</v-flex>
				</v-layout>
				<v-flex style="text-align: end; display: flex; justify-content:end ;">
					<v-checkbox class="mt-1" style="caret-color: #3e7ccc;" color="#3e7ccc"></v-checkbox>
					<span
						style="font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 4.17;
            letter-spacing: normal;
            text-align: center;
            color: #3e7ccc;
            width: 158px;
            height: 16px;
            font-family: MalgunGothic;"
						>저장시 정산 일정 문자 발송</span
					>
					<v-btn
						style="background-color: #3e7ccc; color: #fff;  
            width: 139px;
            height: 25px;
            margin: 9.8px 0 17.5px 7px;
            padding: 4px 19px 4px 15.4px;"
						@click="openProcessModal"
						><v-icon>mdi-check</v-icon> 정산 일정 저장</v-btn
					>
				</v-flex>
				<v-layout style="border-top:1px solid black">
					<v-flex class="notice_right_table" xs2 style="height: 40px; "> </v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						입금 은행
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						계좌 번호
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						금액
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						지급일
					</v-flex>
					<v-flex class="notice_right_table" xs3 style="height: 40px;">
						입금증
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: 40px;">
						1차
					</v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: 40px;">
						2차
					</v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: 40px;">
						3차
					</v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: 40px;">
						4차
					</v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
				</v-layout>
				<v-layout>
					<v-flex class="notice_right_table" xs2 style="height: 40px;">
						5차
					</v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
					<v-flex xs3 class="notice_right_table2"> </v-flex>
				</v-layout>
				<v-flex style="text-align: end;">
					<span
						style="font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 4.17;
            letter-spacing: normal;
            text-align: center;
            color: #3e7ccc;
            width: 158px;
            height: 16px;
            margin: 19.8px 13px 16.5px 0;
            font-family: MalgunGothic;"
						>저장시 정산 일정 문자 발송</span
					>
					<v-btn
						style="background-color: #3e7ccc; color: #fff;  
            width: 139px;
            height: 25px;
            margin: 9.8px 0 17.5px 7px;
            padding: 4px 19px 4px 15.4px;"
						><v-icon>mdi-check</v-icon> 정산 일정 저장</v-btn
					>
				</v-flex>
			</v-flex>
		</v-layout>
		<sweetAlert :dialog="sweetDialog_false"></sweetAlert>
		<sweetAlert :dialog="saveDialogStatus" @click="click_agree"></sweetAlert>
	</div>
</template>
<script>
import { selectBox, txtField, txtField3, datatable, DatepickerDialog, sweetAlert } from '@/components/index.js'

export default {
	components: {
		selectBox,
		txtField3,
		datatable,
		DatepickerDialog,
		sweetAlert,
		txtField,
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
			sweetDialog_false: {
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
			processTable: {
				headers: [
					{ text: '직원명', sortable: false, value: 'username', align: 'center', width: '7%' },
					{ text: '연락처', sortable: false, value: 'phoneNumber', align: 'center', width: '10%' },
					{ text: '영업번호', sortable: false, value: 'settlementPhoneNumber', align: 'center', width: '10%' },
					{ text: '팀', sortable: false, value: 'teamID', align: 'center', width: '7%' },
					{ text: '승인일', sortable: false, value: 'settlementUpdated_at', align: 'center', width: '7%' },
					{ text: '상태', sortable: false, value: '', align: 'center', width: '8%' },
					{ text: '지급예정일', sortable: false, value: '', align: 'center', width: '8%' },
					{ text: '비고', sortable: false, value: 'detailEtc2', align: 'center', width: '3%' },
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
				pageCount: 1,
				total: 1,
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

			timessel: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: ['1차', '2차', '3차', '4차', '5차'],
				outlined: true,
				placeholder: '회차선택',
				returnObject: true,
				itemText: 'title',
			},
			charge: {
				txtField: {
					maxlength: '255',
					value: '',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					placeholder: '-',
					readonly: false,
				},
			},

			start_date_picker: {
				1: {
					date: this.$moment().format('YYYY-MM-DD'),
				},
				2: {
					date: this.$moment().format('YYYY-MM-DD'),
				},
				3: {
					date: this.$moment().format('YYYY-MM-DD'),
				},
				4: {
					date: this.$moment().format('YYYY-MM-DD'),
				},
				5: {
					date: this.$moment().format('YYYY-MM-DD'),
				},
			},
			paymentCircuit: {
				charge1: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge2: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge3: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge4: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge5: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
			},
			paymentRateSum: {
				txtField: {
					maxlength: '3',
					value: '',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					placeholder: '-',
					readonly: false,
				},
			},

			paymentRate: {
				charge1: {
					txtField: {
						maxlength: '3',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge2: {
					txtField: {
						maxlength: '3',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge3: {
					txtField: {
						maxlength: '3',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge4: {
					txtField: {
						maxlength: '3',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge5: {
					txtField: {
						maxlength: '3',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
			},
			paymentsum: {
				txtField: {
					maxlength: '255',
					value: '',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					placeholder: '-',
					readonly: true,
				},
			},
			paymentAmount: {
				charge1: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge2: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge3: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge4: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
				charge5: {
					txtField: {
						maxlength: '255',
						value: '',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						placeholder: '-',
						readonly: true,
					},
				},
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
			paymentRatesum: 0,
		}
	},

	async created() {
		this.$store.state.loading = true
		await this.me()
		const settlementViewData = {
			settlementStatus: 'agree',
		}
		await this.settlementView(settlementViewData)
		const usersViewData = {
			idArr: this.userArrData,
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
	},
	mounted() {},

	methods: {
		currecy_locale_string(e, idx) {
			e.target.value = e.target.value.toLocaleString()
			this.paymentAmount[`charge${idx + 1}`].txtField.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},

		async me() {
			await this.$store.dispatch('me').then(res => {
				this.$store.state.meData = res.data
				console.log(this.$store.state.meData)
			})
		},
		async dataSetting() {
			for (let index = 0; index < this.userData.length; index++) {
				const element = this.userData[index]
				console.log(element)
				let teamTitle = this.teamData.filter(x => x.id === element.teamID)[0].title
				let rankTitle = this.rankData.filter(x => x.id === element.rankId)[0].rankName

				element.teamID = `${teamTitle} / ${rankTitle}`
				this.list.teamID = element.teamID
			}

			this.processTable.items = this.list
			console.log(this.processTable.items)
		},

		async settlementView(settlementViewData) {
			await this.$store.dispatch('settlements', settlementViewData).then(res => {
				this.processTable.total = res.settlementsConnection.aggregate.count
				res.settlements.forEach(element => {
					let listData = {}
					listData.settlements = element
					listData.id = element.id
					listData.settlementCreated_at = this.$moment(element.created_at).format('YYYY-MM-DD HH:mm')
					listData.contractDate = this.$moment(element.contractDate).format('YYYY-MM-DD HH:mm')
					listData.settlementStatus = element.settlementStatus
					listData.settlementUpdated_at = this.$moment(element.updated_at).format('YYYY-MM-DD HH:mm')
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

		async productsView(productsViewData) {
			await this.$store.dispatch('products', productsViewData).then(
				res =>
					res.products.forEach(element => {
						let listData = this.list[this.list.findIndex(item => item.ProductID === element.id)]
						listData.products = element
						listData.product = element.housingType + element.dong + '동' + element.ho + '호'
					}),
				console.log(this.list),
			)
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
		alertRate(val) {
			console.log(val)
			let valChange = Number(val.replace('charge', '')) + ''
			let timeChange = Number(this.timessel.value.replace(/차/g, '')) + ''

			console.log(this.timessel.value)
			console.log(valChange)
			console.log(timeChange)

			if (this.timessel.value === '') {
				console.log(true)
				this.sweetDialog_false.title = `비율 지정 실패`
				this.sweetDialog_false.content = `지급 회차를 먼저 선택해주세요`
				this.sweetDialog_false.modalValue = ''
				this.sweetDialog_false.modalIcon = 'info'
				this.sweetDialog_false.buttonType = 'oneBtn'
				this.sweetDialog_false.open = true
			}
			if (valChange > timeChange) {
				this.sweetDialog_false.title = `비율 지정 실패`
				this.sweetDialog_false.content = `지정한 지급 회차를 확인해주세요`
				this.sweetDialog_false.modalValue = ''
				this.sweetDialog_false.buttonType = 'oneBtn'
				this.sweetDialog_false.modalIcon = 'info'
				this.sweetDialog_false.open = true
			}
		},

		processRequestData(val) {
			for (let i = 0; i < 5; i++) {
				this.paymentAmount[`charge${i + 1}`].txtField.value = ''
				this.paymentRate[`charge${i + 1}`].txtField.value = ''
				this.paymentCircuit[`charge${i + 1}`].txtField.value = ''
			}
			this.finalSettlementData = []
			this.charge.txtField.value = ''
			this.timessel.value = ''
			this.finalSettlementData = val
			console.log(val)
			const usernameSpan = document.getElementById('spanUsername')
			if (usernameSpan) {
				usernameSpan.textContent = `${val.username}`
			}

			const spanPhoneNumber = document.getElementById('spanPhoneNumber')
			if (spanPhoneNumber) {
				spanPhoneNumber.textContent = `${val.phoneNumber}`
			}

			const userAccountInfo = document.getElementById('userAccountInfo')
			if (userAccountInfo) {
				userAccountInfo.textContent = `${val.users.accountNumber}`
			}

			const userAccountName = document.getElementById('userAccountName')
			if (userAccountName) {
				userAccountName.textContent = `${val.users.bank}`
			}

			const product = document.getElementById('product')
			if (product) {
				product.textContent = `${val.product}`
			}

			const contract = document.getElementById('contract')
			if (contract) {
				contract.textContent = `${this.$moment(val.contractDate).format('YYYY-MM-DD')}`
			}
		},

		openProcessModal() {
			console.log(this.finalSettlementData)
			if (this.finalSettlementData.length === 0) {
				this.sweetDialog_false.title = `저장 실패`
				this.sweetDialog_false.content = `정산할 직원을 선택해주세요`
				this.sweetDialog_false.modalValue = ''
				this.sweetDialog_false.buttonType = 'oneBtn'
				this.sweetDialog_false.open = true
			} else if (this.charge.txtField.value === '') {
				this.sweetDialog_false.title = `저장 실패`
				this.sweetDialog_false.content = `수수료를 입력해주세요`
				this.sweetDialog_false.modalValue = ''
				this.sweetDialog_false.buttonType = 'oneBtn'
				this.sweetDialog_false.open = true
			} else if (this.paymentRateSum.txtField.value !== '100%') {
				this.sweetDialog_false.title = `저장 실패`
				this.sweetDialog_false.content = `지급 비율이 100%가 아닙니다`
				this.sweetDialog_false.modalValue = ''
				this.sweetDialog_false.buttonType = 'oneBtn'
				this.sweetDialog_false.open = true
			} else {
				this.saveDialogStatus.title = `정산금 지급 일정 저장`
				this.saveDialogStatus.content = `정산금 지급 일정을 저장합니다`
				this.saveDialogStatus.open = true
			}
		},

		click_agree() {
			this.$store.state.loading = true

			console.log(this.start_date_picker)

			let start_date = []
			let finalPaymentAmount = []

			let timesCheck = Number(this.timessel.value.replace(/차/g, ''))
			for (let i = 1; i <= timesCheck; i++) {
				start_date.push(this.start_date_picker[i].date)
				finalPaymentAmount.push(this.paymentAmount[`charge${i}`].txtField.value)

				let data = {
					prePaymentDate: this.start_date_picker[i].date,
					turnStatus: 'waiting',
					amount: this.paymentAmount[`charge${i}`].txtField.value,
					settlements: this.finalSettlementData.id,
				}

				this.$store.dispatch('createSettlementTurnTable', data).then(res => {
					console.log(res)
				})
			}

			console.log(start_date, finalPaymentAmount)
		},

		calculatePaymentAmount(paymentNumber) {
			paymentAmount = ''
			let paymentRate = Number(this.paymentRate[`charge${paymentNumber}`].txtField.value)

			let charge = Number(this.charge.txtField.value.replace(/,/g, ''))

			let paymentAmount = Number((paymentRate / 100) * charge)

			paymentAmount = Math.floor(paymentAmount)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

			return paymentAmount
		},
		calculatePaymentRate(paymentNumber) {
			paymentRateAmount = ''
			let paymentRate = Number(this.paymentRate[`charge${paymentNumber}`].txtField.value)

			let paymentRateAmount = Number(paymentRate / 100)
			paymentRateAmount = Math.floor(paymentRateAmount) + ''

			return paymentRateAmount
		},
		updatePaymentRateSum() {
			let sum = 0
			for (let i = 1; i <= 5; i++) {
				let paymentRate = Number(this.paymentRate[`charge${i}`].txtField.value)
				sum += paymentRate
			}
			if (sum > 100) {
				this.sweetDialog_false.title = `비율 지정 실패`
				this.sweetDialog_false.content = `지급 비율은 100%를 넘을 수 없습니다`
				this.sweetDialog_false.modalValue = ''
				this.sweetDialog_false.buttonType = 'oneBtn'
				this.sweetDialog_false.modalIcon = 'info'
				this.sweetDialog_false.open = true
			}
			this.paymentRatesum = sum
			this.$nextTick(() => {
				this.paymentRateSum.txtField.value = sum + '%'
			})
		},
	},
	computed: {
		calculatedPaymentAmount1() {
			return this.calculatePaymentAmount(1)
		},
		calculatedPaymentAmount2() {
			return this.calculatePaymentAmount(2)
		},
		calculatedPaymentAmount3() {
			return this.calculatePaymentAmount(3)
		},
		calculatedPaymentAmount4() {
			return this.calculatePaymentAmount(4)
		},
		calculatedPaymentAmount5() {
			return this.calculatePaymentAmount(5)
		},
	},
	watch: {
		'timessel.value'(newValue) {
			console.log(newValue)
			let time = Number(newValue.replace(/차/g, ''))
			console.log(time)
			for (let i = 0; i < 5; i++) {
				this.paymentAmount[`charge${i + 1}`].txtField.readonly = true
				this.paymentRate[`charge${i + 1}`].txtField.readonly = true
				this.paymentCircuit[`charge${i + 1}`].txtField.readonly = true
				this.paymentAmount[`charge${i + 1}`].txtField.value = ''
				this.paymentRate[`charge${i + 1}`].txtField.value = ''
				this.paymentCircuit[`charge${i + 1}`].txtField.value = ''
			}

			for (let j = 0; j < time; j++) {
				this.paymentAmount[`charge${j + 1}`].txtField.readonly = false
				this.paymentRate[`charge${j + 1}`].txtField.readonly = false
				this.paymentCircuit[`charge${j + 1}`].txtField.readonly = false
			}
		},

		'paymentRate.charge1.txtField.value': {
			immediate: true,
			handler() {
				this.paymentAmount.charge5.txtField.value = ''
				this.paymentAmount.charge2.txtField.value = ''
				this.paymentAmount.charge3.txtField.value = ''
				this.paymentAmount.charge4.txtField.value = ''
				this.paymentRate.charge2.txtField.value = ''
				this.paymentRate.charge3.txtField.value = ''
				this.paymentRate.charge4.txtField.value = ''
				this.paymentRate.charge5.txtField.value = ''

				this.paymentAmount.charge1.txtField.value = this.calculatePaymentAmount(1)
				this.updatePaymentRateSum()
			},
		},
		'paymentRate.charge2.txtField.value': {
			immediate: true,
			handler() {
				this.paymentRate.charge3.txtField.value = ''
				this.paymentRate.charge4.txtField.value = ''
				this.paymentRate.charge5.txtField.value = ''
				this.paymentAmount.charge5.txtField.value = ''
				this.paymentAmount.charge3.txtField.value = ''
				this.paymentAmount.charge4.txtField.value = ''
				this.paymentAmount.charge2.txtField.value = this.calculatePaymentAmount(2)
				this.updatePaymentRateSum()
			},
		},
		'paymentRate.charge3.txtField.value': {
			immediate: true,
			handler() {
				this.paymentRate.charge4.txtField.value = ''
				this.paymentRate.charge5.txtField.value = ''
				this.paymentAmount.charge5.txtField.value = ''
				this.paymentAmount.charge4.txtField.value = ''
				this.paymentAmount.charge3.txtField.value = this.calculatePaymentAmount(3)
				this.updatePaymentRateSum()
			},
		},
		'paymentRate.charge4.txtField.value': {
			immediate: true,
			handler() {
				this.paymentRate.charge5.txtField.value = ''
				this.paymentAmount.charge5.txtField.value = ''
				this.paymentAmount.charge4.txtField.value = this.calculatePaymentAmount(4)
				this.updatePaymentRateSum()
			},
		},
		'paymentRate.charge5.txtField.value': {
			immediate: true,
			handler() {
				this.paymentAmount.charge5.txtField.value = this.calculatePaymentAmount(5)
				this.updatePaymentRateSum()
			},
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
.date_picker3 {
	background-color: #fff !important;
	div {
		div {
			.v-input__slot {
				min-height: 27px !important;
				height: 27px !important;
				.v-input__append-inner {
					display: none;
				}
				div {
					div {
						button {
							margin-bottom: 10px;
							font-size: 20px;
							display: none;
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

.spanInfoClass {
	font-family: MalgunGothic;
	font-size: 14px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 3.64;
	letter-spacing: normal;
	text-align: center;
	color: #333;
}
</style>
