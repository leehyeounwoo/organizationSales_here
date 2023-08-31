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
			<v-flex xs9>
				<datatable
					:datatable="table"
					:teamChoiceClick="teamChoiceClick"
					:editUserData="editUserData"
					:salesPhoneNumberSave="salesPhoneNumberSave"
					:workingStatusSave="workingStatusSave"
					:teamRankSave="teamRankSave"
				/>
			</v-flex>
			<v-flex xs3 class="ml-2 mt-5">
				<v-layout v-for="(edit, index) in rightEdit" :key="index" :style="index === 0 ? 'border-top:1px solid black' : ''">
					<v-flex class="notice_right_table" xs2>
						{{ edit.title }}
					</v-flex>
					<v-flex xs10 class="notice_right_table2">
						<v-layout v-if="edit.type === 1" class=" py-3 px-1">
							<v-flex xs8 style="align-self: end;" @click="preview(edit)">
								<txtField :txtField="edit.txtField" v-model="edit.txtField.value" class="search_box_admin"></txtField>
							</v-flex>
							<v-flex xs4>
								<btn :btn="editBtn" btn_txt="파일 첨부" @click="clickEditBtn(edit)" />
								<input
									style="display:none;"
									type="file"
									:id="'file_upload_' + edit.title"
									accept=".pdf, image/jpg, image/png, image/jpeg"
									@change="fileUpload($event, index)"
								/>
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
										<btn :btn="editBtn" btn_txt="파일 첨부" @click="clickEditBtn(edit)" />
									</v-flex>
									<input
										style="display:none;"
										type="file"
										:id="'file_upload_' + edit.title"
										accept=".pdf, image/jpg, image/png, image/jpeg"
										@change="fileUpload($event, index)"
									/>
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
						<datatable :datatable="detailTable" class="detailTable_client"> </datatable>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
		<v-layout justify-space-between mt-1>
			<v-flex>
				<v-btn small class="btn-style2" @click="clickExport()">
					<img src="@/assets/images/excel-img2.png" />
					엑셀 다운로드
				</v-btn>
			</v-flex>
			<v-flex v-if="editUser.btn" style="text-align: end;">
				<v-btn small class="btn-style2" @click="saveCheck()">
					저장
				</v-btn>
			</v-flex>
		</v-layout>

		<download-excel
			class="btn btn-default"
			id="clientExcel"
			:data="table.items"
			style="display:none"
			:fields="table.json_fields"
			type="text/csv;charset=utf8"
			worksheet="My Worksheet"
			name="상담사 관리 리스트"
		>
		</download-excel>
		<teamEdit
			:setdialog="teamEditDialog"
			:left_data="left_data"
			:right_data="right_data"
			:addTeam="addTeamToChild"
			:addRank="addRankToChild"
			:applyTeam="applyTeam"
			:applyRank="applyRank"
			:sweetDialog2="sweetDialog2"
			:sweetDialog3="sweetDialog3"
			@update="update"
		></teamEdit>
		<saveDialog :dialog="saveDialogStatus" :activeSave="activeSave"></saveDialog>
		<sweetAlert :dialog="sweetDialog" @click="detailSave" />
	</div>
</template>

<script>
import { selectBox, txtField, datatable, btn, sweetAlert } from '@/components/index.js'
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
		sweetAlert,
	},

	data() {
		return {
			add_team_data: [],
			add_rank_data: [],
			sweetDialog2: {
				open: false,
				title: '팀 추가',
				content: '변경사항(팀)을 저장합니다.',
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			sweetDialog3: {
				open: false,
				title: '직급 추가',
				content: '변경사항(직급)을 저장합니다.',
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			sweetDialog: {
				open: false,
				title: '상담사 정보 저장',
				content: '상담사 정보를 저장합니다.',
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			editUser: {
				btn: false,
				detail: [],
			},
			files: [
				{ file: null, name: '' },
				{ file: null, name: '' },
				{ file: null, name: '' },
				{ file: null, name: '' },
				{ file: null, name: '' },
			],
			left_data: [],
			left_data_origin: [],
			right_data: [],
			right_data_origin: [],
			ourCoords: {
				//서울 시청 좌표
				latitude: 37.5666263, //위도
				longitude: 126.9783924, //경도
			},
			teamEditDialog: {
				dialog: false,
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
						readonly: false,
						placeholder: '은행명',
					},
					txtField2: {
						value: '',
						clearable: false,
						maxlength: '255',
						outlined: true,
						backCol: 'white',
						readonly: false,
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
					title: `신분증 사본`,
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
					{ text: '주택형', value: 'housingType', width: '25%' },
					{ text: '동', value: 'dong', width: '25%' },
					{ text: '호', value: 'ho', width: '25%' },
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
					{ text: '상담사', value: 'username', align: 'center', width: '7%' },
					{ text: '연락처', value: 'phoneNumber', align: 'center', width: '11%' },
					{ text: '영업번호', value: 'salesPhoneNumber', align: 'center', width: '20%' },
					{ text: '등록일', value: 'created_at', align: 'center', width: '9%' },
					{ text: '팀배정 현황', value: 'team', align: 'center', sortable: false, width: '30%' },
					{ text: '재직상태', value: 'workingStatus', align: 'center', width: '10%' },
					{ text: '비고', value: 'organizationStatusEtc', align: 'center', width: '10%' },
				],
				showselect: true,
				headerCheck: false,
				items: [],
				origin_items: [],
				selected: [],
				json_fields: {
					상담사: 'username',
					연락처: 'phoneNumber',
					영업번호: 'salesPhoneNumber',
					등록일: 'created_at_format',
					'팀배정 현황': 'team_rank',
					재직상태: 'workingStatusName',
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
				placeholder: '팀 선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel2: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: ['전체', '재직', '퇴사'],
				outlined: true,
				placeholder: '재직 상태',
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
			// teamArrData: [],
			teamData: [],
			// rankArrData: [],
			rankData: [],
			basicTeamData: [],
			basicRankData: [],
			detailTableData: [],
		}
	},

	async created() {
		const createInterval = setInterval(async () => {
			if (this.$store.state.businessSelectBox.value !== '') {
				await this.getListAction()
				await this.searchSelect()
				clearInterval(createInterval)
			}
		}, 1000)
		// if (!navigator.geolocation) {
		// 	return alert('위치 정보가 지원되지 않습니다.')
		// }
		// console.log(navigator.geolocation.getCurrentPosition)
		// navigator.geolocation.getCurrentPosition(position => {
		// 	console.log(2)
		// 	console.log(position)
		// 	this.computeDistance(position.coords, this.ourCoords)
		// })
	},
	mounted() {},

	methods: {
		update() {
			this.$store.state.loading = true
			const createInterval = setInterval(async () => {
				if (this.$store.state.businessSelectBox.value !== '') {
					await this.getListAction()
					await this.searchSelect()
					clearInterval(createInterval)
				}
			}, 1000)
			this.$store.state.loading = false
		},
		saveCheck() {
			this.sweetDialog.open = true
		},
		fileUpload(event, index) {
			if (index === 5) {
				this.rightEdit[index].txtField2.value = event.target.files[0].name
				this.files[index - 1].name = event.target.files[0].name
				this.files[index - 1].file = event.target.files[0]
			} else {
				this.rightEdit[index].txtField.value = event.target.files[0].name
				if (index === 0) {
					this.files[index].name = event.target.files[0].name
					this.files[index].file = event.target.files[0]
				} else {
					this.files[index - 1].name = event.target.files[0].name
					this.files[index - 1].file = event.target.files[0]
				}
			}
			console.log(this.files)
		},
		workingStatusSave(val) {
			const data = {
				id: val.id,
				username: val.username,
				email: val.email,
				workingStatus: val.workingStatus,
			}
			this.updateUserAction(data)
		},
		addRankToChild(val) {
			if (val === '') {
				return alert('직급을 입력해주세요.')
			}
			this.addRank(val)
		},
		addRank(val) {
			this.add_rank_data = {
				value: val,
				txtfield1: {
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
				},
				selectBox: {
					value: '사용',
					items: ['사용', '미사용'],
					hideDetail: true,
					outlined: true,
					class: 'small_font bizInput',
				},
			}
			this.right_data.push(this.add_rank_data)
		},
		addTeamToChild(val) {
			if (val === '') {
				return alert('팀명을 입력해주세요.')
			}
			this.addTeam(val)
		},
		addTeam(val) {
			this.add_team_data = {
				value: val,
				txtfield1: {
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
				},
				selectBox: {
					value: '사용',
					items: ['사용', '미사용'],
					hideDetail: true,
					outlined: true,
					class: 'small_font bizInput',
				},
			}
			this.left_data.push(this.add_team_data)
		},
		async applyTeam() {
			this.$store.state.loading = true
			if (this.add_team_data.length !== 0) {
				let teamData1 = {
					businessID: this.$store.state.businessSelectBox.value,
					title: this.add_team_data.value,
				}
				if (this.add_team_data.selectBox.value && this.add_team_data.selectBox.value === '사용') {
					teamData1['useYn'] = true
				} else {
					teamData1['useYn'] = false
				}
				await this.$store.dispatch('createTeam', teamData1).then(() => {
					this.sweetDialog2.open = false
					this.$store.state.loading = false
				})
			} else {
				for (let i = 0; i < this.left_data_origin.length; i++) {
					let teamData2 = {}
					if (this.left_data[i].value !== this.left_data_origin[i].value) {
						teamData2['id'] = this.left_data[i].id
						teamData2['title'] = this.left_data[i].value
						if (this.left_data[i].selectBox.value === '사용') {
							teamData2['useYn'] = true
						} else {
							teamData2['useYn'] = false
						}
						this.$store.dispatch('updateTeam', teamData2).then(() => {
							this.sweetDialog2.open = false
							this.$store.state.loading = false
						})
					}
					if (this.left_data[i].selectBox.value !== this.left_data_origin[i].selectBox.value) {
						teamData2['id'] = this.left_data[i].id
						teamData2['title'] = this.left_data[i].value
						if (this.left_data[i].selectBox.value === '사용') {
							teamData2['useYn'] = true
						} else {
							teamData2['useYn'] = false
						}
						this.$store.dispatch('updateTeam', teamData2).then(() => {
							this.sweetDialog2.open = false
							this.$store.state.loading = false
						})
					}
				}
			}
		},
		async applyRank() {
			this.$store.state.loading = true
			if (this.add_rank_data.length !== 0) {
				let rankData1 = {
					businessID: this.$store.state.businessSelectBox.value,
					rankName: this.add_rank_data.value,
				}
				if (this.add_rank_data.selectBox.value === '사용') {
					rankData1['useYn'] = true
				} else {
					rankData1['useYn'] = false
				}
				await this.$store.dispatch('createRank', rankData1).then(() => {
					this.sweetDialog3.open = false
					this.$store.state.loading = false
				})
			} else {
				for (let i = 0; i < this.right_data_origin.length; i++) {
					let rankData2 = {}
					if (this.right_data[i].value !== this.right_data_origin[i].value) {
						console.log(this.right_data)
						rankData2['id'] = this.right_data[i].id
						rankData2['rankName'] = this.right_data[i].value
						if (this.right_data[i].selectBox.value === '사용') {
							rankData2['useYn'] = true
						} else {
							rankData2['useYn'] = false
						}
						this.$store.dispatch('updateRank', rankData2).then(() => {
							this.sweetDialog3.open = false
							this.$store.state.loading = false
						})
					}
				}
			}
		},
		SearchBiz() {
			let item = JSON.parse(JSON.stringify(this.table.origin_items))
			if (this.searchsel1.value.value && this.searchsel1.value.value !== 'all') {
				item = item.filter(el => el.teamID === this.searchsel1.value.value)
			}
			if (this.searchsel2.value && this.searchsel2.value !== '전체') {
				item = item.filter(el => el.workingStatusName === this.searchsel2.value)
			}
			if (this.search_project) {
				item = item.filter(el => el.username.indexOf(this.search_project) !== -1)
			}
			this.table.items = item
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
		clickExport() {
			if (this.table.selected.length === 0) {
				return alert('상담사를 선택해주세요.')
			}
			document.getElementById(`clientExcel`).click()
		},
		preview(val) {
			console.log(val)
			if (val.url) {
				window.open(process.env.VUE_APP_BACKEND_URL + val.url)
			}
		},
		async detailSave() {
			this.$store.state.loading = true
			let data = {
				id: this.editUser.detail.id,
				username: this.editUser.detail.username,
				email: this.editUser.detail.email,
				bank: this.rightEdit[1].txtField.value,
				accountNumber: this.rightEdit[1].txtField2.value,
			}
			for (let i = 0; i < this.files.length; i++) {
				if (this.files[i].file) {
					let file_input = {
						file: this.files[i].file,
					}
					await this.$store.dispatch('fileUpload', file_input).then(res => {
						if (i === 0) {
							data['profile'] = res.upload.id
						} else if (i === 1) {
							data['copyAccount'] = res.upload.id
						} else if (i === 2) {
							data['employmentContract'] = res.upload.id
						} else if (i === 3) {
							data['ID_Card'] = res.upload.id
						} else if (i === 4) {
							data['businessRegistration'] = res.upload.id
						}
					})
				}
			}
			await this.$store.dispatch('updateUser', data).then(() => {
				this.sweetDialog.open = false
				const createInterval = setInterval(async () => {
					if (this.$store.state.businessSelectBox.value !== '') {
						await this.getListAction()
						await this.searchSelect()
						clearInterval(createInterval)
					}
				}, 1000)
				this.$store.state.loading = false
			})
		},
		teamRankSave(val) {
			const data = {
				id: val.id,
				username: val.username,
				email: val.email,
				teamID: val.teamTitle,
				rankID: val.rankTitle,
			}
			this.updateUserAction(data)
		},
		async getListAction() {
			this.$store.state.loading = true
			const usersViewData = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.usersView(usersViewData)
			const teamsViewData = {
				useYn: true,
				businessID: this.$store.state.businessSelectBox.value,
			}

			await this.teamsView(teamsViewData)
			const ranksViewData = {
				useYn: true,
				businessID: this.$store.state.businessSelectBox.value,
			}

			await this.ranksView(ranksViewData)
			await this.dataSetting()
			this.$store.state.loading = false
		},
		salesPhoneNumberSave(val) {
			const data = {
				username: val.username,
				email: val.email,
				id: val.id,
				salesPhoneNumber: val.salesPhoneNumber,
			}
			this.updateUserAction(data)
		},
		async updateUserAction(data) {
			this.$store.state.loading = true
			await this.$store
				.dispatch('updateUser', data)
				.then(async () => {
					await this.getListAction()
					this.$store.state.loading = false
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		// degreesToRadians(degrees) {
		// 	let radians = (degrees * Math.PI) / 180
		// 	return radians
		// },
		// computeDistance(startCoords, destCoords) {
		// 	var startLatRads = this.degreesToRadians(startCoords.latitude)
		// 	var startLongRads = this.degreesToRadians(startCoords.longitude)
		// 	var destLatRads = this.degreesToRadians(destCoords.latitude)
		// 	var destLongRads = this.degreesToRadians(destCoords.longitude)

		// 	var Radius = 6371 //지구의 반경(km)
		// 	var distance =
		// 		Math.acos(
		// 			Math.sin(startLatRads) * Math.sin(destLatRads) +
		// 				Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads),
		// 		) * Radius
		// 	console.log(distance)
		// 	return distance
		// },
		async dataSetting() {
			for (let index = 0; index < this.userData.length; index++) {
				const element = this.userData[index]
				let teamData = this.teamData.filter(x => x.id === element.teamID)[0]
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
					element.team_rank = `${teamData.title}(${rankData.rankName})`
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
			this.table.items = JSON.parse(JSON.stringify(this.userData))
			this.table.origin_items = JSON.parse(JSON.stringify(this.userData))
		},
		async settlementsViewAction(data) {
			this.$store.state.loading = true
			await this.$store
				.dispatch('settlements', data)
				.then(res => {
					const productData = {
						idArr: res.settlements.map(x => x.ProductID),
					}

					if (res.settlements.length > 0) {
						res.settlements.forEach(el => {
							let listData = {}
							listData.all = el
							listData.result =
								el.settlementStatus === 'created'
									? '계약등록'
									: el.settlementStatus === 'waiting'
									? '정산등록'
									: el.settlementStatus === 'agree'
									? '지급대기'
									: el.settlementStatus === 'disagree'
									? '거절'
									: '-'
							this.detailTableData.push(listData)
						})
						this.productsViewAction(productData)
					}
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async productsViewAction(data) {
			this.$store.state.loading = true
			await this.$store
				.dispatch('products', data)
				.then(res => {
					res.products.forEach(el => {
						let workIndex = this.detailTableData.findIndex(x => x.all.ProductID === el.id)
						this.detailTableData[workIndex]['housingType'] = el.housingType
						this.detailTableData[workIndex]['ho'] = el.ho
						this.detailTableData[workIndex]['dong'] = el.dong
						if (el.contractStatus === 'contract') {
							this.detailTableData[workIndex]['result'] = '계약완료'
						}
					})
					this.detailTable.items = this.detailTableData
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async editUserData(val) {
			this.$store.state.loading = true
			this.detailTableData = []
			this.detailTable.items = []
			this.editUser.btn = true
			this.editUser.detail = val
			const userViewData = {
				userID: val.id,
			}
			await this.settlementsViewAction(userViewData)
			this.rightEdit[0].txtField.value = val.profile ? val.profile.name : ''
			this.rightEdit[0].url = val.profile ? val.profile.url : ''
			this.rightEdit[1].txtField.value = val.bank
			this.rightEdit[1].txtField2.value = val.accountNumber
			this.rightEdit[2].txtField.value = val.copyAccount ? val.copyAccount.name : ''
			this.rightEdit[2].url = val.copyAccount ? val.copyAccount.url : ''
			this.rightEdit[3].txtField.value = val.employmentContract ? val.employmentContract.name : ''
			this.rightEdit[3].url = val.employmentContract ? val.employmentContract.url : ''
			this.rightEdit[4].txtField.value = val.ID_Card ? val.ID_Card.name : ''
			this.rightEdit[4].url = val.ID_Card ? val.ID_Card.url : ''
			// this.rightEdit[5].txtField1.value = val.ID_Card ? val.ID_Card.name : ''
			// this.rightEdit[5].txtField2.value = val.ID_Card ? val.ID_Card.name : ''
			this.rightEdit[5].txtField2.value = val.businessRegistration ? val.businessRegistration.name : ''
			this.$store.state.loading = false
		},
		async teamsView(teamsViewData) {
			await this.$store
				.dispatch('teams', teamsViewData)
				.then(res => {
					console.log(res.teams)
					this.teamData = res.teams
					// this.searchsel1.items = res.teams
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async teamsDialogView(teamsViewData) {
			this.left_data = []
			await this.$store
				.dispatch('teams', teamsViewData)
				.then(res => {
					console.log(res)
					for (let index = 0; index < res.teams.length; index++) {
						const element = res.teams[index]
						this.left_data.push({
							id: element.id,
							value: element.title,
							txtfield1: {
								maxlength: '255',
								outlined: true,
								hideDetail: true,
								errorMessage: '',
							},
							selectBox: {
								value: element.useYn ? '사용' : '미사용',
								items: ['사용', '미사용'],
								hideDetail: true,
								outlined: true,
								class: 'small_font bizInput',
							},
						})
					}
					this.left_data_origin = JSON.parse(JSON.stringify(this.left_data))
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
		async ranksDialogView(teamsViewData) {
			this.right_data = []
			await this.$store
				.dispatch('ranks', teamsViewData)
				.then(res => {
					for (let index = 0; index < res.ranks.length; index++) {
						const element = res.ranks[index]
						this.right_data.push({
							id: element.id,
							value: element.rankName,
							txtfield1: {
								maxlength: '255',
								outlined: true,
								hideDetail: true,
								errorMessage: '',
							},
							selectBox: {
								value: element.useYn ? '사용' : '미사용',
								items: ['사용', '미사용'],
								hideDetail: true,
								outlined: true,
								class: 'small_font bizInput',
							},
						})
					}
					this.right_data_origin = JSON.parse(JSON.stringify(this.right_data))
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		// async ranksView(teamsViewData) {
		// 	await this.$store
		// 		.dispatch('ranks', teamsViewData)
		// 		.then(res => {
		// 			this.rankData = res.ranks
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 			this.$store.state.loading = false
		// 		})
		// },
		async usersView(usersViewData) {
			await this.$store
				.dispatch('users', usersViewData)
				.then(res => {
					console.log(res.users)
					this.userData = res.users
					// this.teamArrData = res.users.filter(x => x.teamID).map(x => x.teamID)
					// this.rankArrData = res.users.filter(x => x.rankID).map(x => x.rankID)
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		activeSave() {},
		async teamChoiceClick() {
			const teamsViewData = {
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.teamsDialogView(teamsViewData)
			const ranksViewData = {
				businessID: this.$store.state.businessSelectBox.value,
			}
			await this.ranksDialogView(ranksViewData)
			this.teamEditDialog.dialog = true
		},
		clickEditBtn(val) {
			console.log(val)
			document.getElementById('file_upload_' + val.title).click()
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
	// position: absolute;
	// bottom: 15px;
	// left: 0px;
}
.notice_right_table {
	background-color: #f5f5f5;
	font-size: 11px;
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
