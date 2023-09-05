<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter1" style="font-size:13px;" @change="setFilter2"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter2" style="font-size:13px" @change="setFilter3"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter3" style="font-size:13px"></selectBox>
			</v-flex>
			<v-btn class="ml-3 search_btn" color="#009dac" @click="searchProduct">적용</v-btn>
		</v-layout>
		<v-layout justify-end>
			<v-btn elevation="0" class="mt-3" color="#f0f2f8" style="border:1px solid #cfdcdd; font-size:13px" @click="refreshTable()"
				>상태 업데이트</v-btn
			>
		</v-layout>
		<datatable
			:datatable="productManager"
			:teamChange="teamChange"
			:managerChoiceStatusChange="managerChoiceStatusChange"
			:holdingTypeChoice="holdingTypeChoice"
			:createAssignmentAction="createAssignmentAction"
			:updateAssignmentAction="updateAssignmentAction"
		></datatable>
		<v-layout justify-center>
			<v-flex xs6>
				<v-pagination v-model="productManager.page" :length="productManager.totalpage" @input="paginationClick($event)"></v-pagination>
			</v-flex>
		</v-layout>
		<v-btn class="my-4 new_biz" @click="holdTimeShow()">배정현황</v-btn>
		<holdTimeDetail :setdialog="holdingDetail" :updateAssignmentAction="updateAssignmentAction" />
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'
import holdTimeDetail from '../../viewItem/holdTimeDetail.vue'
// import Axios from 'axios'
export default {
	async created() {
		// const response = await fetch('http://58.127.186.144:5005/team_data_api.json')
		// const jsonData = await response.json()
		// console.log(jsonData)

		let ok = 0
		const createInterval = setInterval(async () => {
			if (this.$store.state.businessSelectBox.value !== '') {
				await this.productSelectData()
				await this.setFilter1()
				clearInterval(createInterval)
			}

			if (ok === 10) {
				clearInterval(createInterval)
				// alert('비즈니스 정보가 없습니다.')
				// this.$router.push({ name: 'dashBoard' }).catch(() => {})
			}
			ok += 1
		}, 1000)
	},
	components: {
		selectBox,
		datatable,
		holdTimeDetail,
	},
	data() {
		return {
			productIdArr: [],
			userIdArr: [],
			teamIdArr: [],
			businessData: {},
			holdingDetail: {
				dialog: false,
				todayTime: '',
				holdingDashboard: {
					productIdArr: [],
					userIdArr: [],
					teamIdArr: [],
					headers: [
						{ text: '주택형', value: 'housingType' },
						{ text: '동', value: 'dong' },
						// { text: '층', value: '' },
						{ text: '호수', value: 'ho' },
						{ text: '담당자', value: 'holdingDashboardUser' },
						{ text: '배정시간', value: 'holdingDashboarduUpdated_at' },
						{ text: '비고', value: 'holdingDashboardEtc' },
					],
					class: 'datatablehover3',
					items: [],
					noweditting: '',
					itemsPerPage: 10,
					page: 1,
					totalpage: 1,
					pageCount: 0,
				},
			},
			productFilter1: {
				placeholder: '주택형 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productFilter2: {
				placeholder: '동 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productFilter3: {
				placeholder: '호 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productManager: {
				headers: [
					{ text: '주택형', value: 'housingType', width: '6%' },
					{ text: '동', value: 'dong', width: '5%' },
					{ text: '호수', value: 'ho', width: '5%' },
					{ text: '담당자', value: 'manager', width: '21%' },
					{ text: '배정', value: 'holdTime', width: '28%' },
					{ text: '상태', value: 'product_status', width: '35%' },
				],
				hidedefaultfooter: true,
				class: 'datatablehover3',
				items: [],
				items_origin: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				totalpage: 1,
				total: 0,
				pageCount: 0,
			},
		}
	},
	methods: {
		setFilter1() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
			}
			this.$store.dispatch('productsFilter', data).then(res => {
				let data1 = [{ text: '전체', value: 'all' }]
				res.products.forEach(el => {
					data1.push({ text: el.housingType, value: el.housingType })
				})
				this.productFilter1.items = data1
			})
		},
		setFilter2() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
			}
			if (this.productFilter1.value && this.productFilter1.value !== 'all') {
				data['housingType'] = this.productFilter1.value
			}
			this.$store.dispatch('productsFilter', data).then(res => {
				let data2 = [{ text: '전체', value: 'all' }]
				res.products.forEach(el => {
					data2.push({ text: el.dong, value: el.dong })
				})
				this.productFilter2.value = ''
				this.productFilter3.value = ''
				this.productFilter2.items = data2
			})
		},
		setFilter3() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
				housingType: this.productFilter1.value,
			}
			if (this.productFilter2.value && this.productFilter2.value !== 'all') {
				data['dong'] = this.productFilter2.value
			}
			this.$store.dispatch('productsFilter', data).then(res => {
				let data3 = [{ text: '전체', value: 'all' }]
				res.products.forEach(el => {
					data3.push({ text: el.ho, value: el.ho })
				})
				this.productFilter3.value = ''
				this.productFilter3.items = data3
			})
		},
		async refreshTable() {
			this.$store.state.loading = true
			let ok = 0
			const createInterval = setInterval(async () => {
				if (this.$store.state.businessSelectBox.value !== '') {
					this.productManager.page = 1
					await this.productSelectData()
					clearInterval(createInterval)
				}

				if (ok === 10) {
					clearInterval(createInterval)
					alert('비즈니스 정보가 없습니다.')
					this.$router.push({ name: 'dashBoard' })
				}
				ok += 1
				this.$store.state.loading = false
			}, 1000)
		},
		async paginationClick() {
			const product_tableData = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
				start: (this.productManager.page - 1) * this.productManager.itemsPerPage,
				limit: this.productManager.itemsPerPage,
			}
			if (this.productFilter1.value && this.productFilter1.value !== 'all') {
				product_tableData['housingType'] = this.productFilter1.value
			}
			if (this.productFilter2.value && this.productFilter2.value !== 'all') {
				product_tableData['dong'] = this.productFilter2.value
			}
			if (this.productFilter3.value && this.productFilter3.value !== 'all') {
				product_tableData['ho'] = this.productFilter3.value
			}
			await this.product_table(product_tableData)
			const assignmentsViewData = {
				productArr: this.productIdArr,
				created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
				created_at_lte: this.$moment(
					this.$moment()
						.add(1, 'd')
						.format('YYYY-MM-DD'),
				),
				status: 'assignment',
			}
			await this.assignmentsView(assignmentsViewData)
			const usersViewData = {
				idArr: this.userIdArr,
			}
			await this.usersView(usersViewData)
			const teamViewData = {
				idArr: this.teamIdArr,
			}
			await this.teamView(teamViewData)
		},
		async searchProduct() {
			// let item = this.productManager.items_origin
			// if (this.productFilter1.value && this.productFilter1.value !== 'all') {
			// 	item = item.filter(el => el.housingType === this.productFilter1.value)
			// }
			// if (this.productFilter2.value && this.productFilter2.value !== 'all') {
			// 	item = item.filter(el => el.dong === this.productFilter2.value)
			// }
			// if (this.productFilter3.value && this.productFilter3.value !== 'all') {
			// 	item = item.filter(el => el.ho === this.productFilter3.value)
			// }

			// this.productManager.items = item
			let item = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
				start: 0,
				limit: 10,
			}
			if (this.productFilter1.value && this.productFilter1.value !== 'all') {
				item['housingType'] = this.productFilter1.value
			}
			if (this.productFilter2.value && this.productFilter2.value !== 'all') {
				item['dong'] = this.productFilter2.value
			}
			if (this.productFilter3.value && this.productFilter3.value !== 'all') {
				item['ho'] = this.productFilter3.value
			}
			await this.product_table(item)
			await this.productsCountView(item)
		},
		async productsCountView(productsCountViewData) {
			await this.$store.dispatch('productsCount', productsCountViewData).then(async res => {
				this.productManager.total = res.productsConnection.aggregate.count
				this.productManager.totalpage = Math.ceil(res.productsConnection.aggregate.count / this.productManager.itemsPerPage)
			})
		},
		async productSelectData() {
			const productsCountViewData = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
			}
			await this.productsCountView(productsCountViewData)
			const businessViewData = {
				idArr: this.$store.state.businessSelectBox.value,
			}
			await this.businessView(businessViewData)
			const product_tableData = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'noContract',
				start: 0,
				limit: 10,
			}
			await this.product_table(product_tableData)
			const assignmentsViewData = {
				productArr: this.productIdArr,
				created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
				created_at_lte: this.$moment(
					this.$moment()
						.add(1, 'd')
						.format('YYYY-MM-DD'),
				),
				status: 'assignment',
			}
			await this.assignmentsView(assignmentsViewData)
			const usersViewData = {
				idArr: this.userIdArr,
			}
			await this.usersView(usersViewData)
			const teamViewData = {
				idArr: this.teamIdArr,
			}
			await this.teamView(teamViewData)
		},
		holdingTypeChoice(val, item) {
			let splitStartData = this.businessData.workingHoursStart.substr(0, 5)
			let splitEndData = this.businessData.workingHoursEnd.substr(0, 5)
			if (val === '종일 홀딩') {
				item.holdingTime1.time = splitStartData
				item.holdingTime1.disabled = true
				item.holdingTime2.time = splitEndData
				item.holdingTime2.disabled = true
			} else if (val === '시간 홀딩') {
				item.holdingTime1.time = ''
				item.holdingTime1.disabled = false
				item.holdingTime1.minTime = this.businessData.workingHoursStart.substr(0, 5)
				item.holdingTime1.maxTime = this.businessData.workingHoursEnd.substr(0, 5)
				item.holdingTime2.time = ''
				item.holdingTime2.disabled = false
				item.holdingTime2.minTime = this.businessData.workingHoursStart.substr(0, 5)
				item.holdingTime2.maxTime = this.businessData.workingHoursEnd.substr(0, 5)
			}
		},
		async businessView(businessViewData) {
			await this.$store.dispatch('businesses', businessViewData).then(async res => {
				this.businessData = res.businesses[0]
			})
		},
		createAssignmentAction(item) {
			if (item.assingnmentData) {
				alert('이미 배정되어있는 물건입니다.')
			} else {
				let nowTime = this.$moment().format('YYYY-MM-DD ')
				let startTime = this.businessData.workingHoursStart.substr(0, 5)
				let endTime = this.businessData.workingHoursEnd.substr(0, 5)

				if (this.$moment() >= this.$moment(nowTime + startTime) && this.$moment() <= this.$moment(nowTime + endTime)) {
					if (item.product_manager.value === '미지정') {
						return alert('담당자를 선택해주세요.')
					}
					if (item.team.value === '') {
						return alert('담당자를 선택해주세요.')
					}
					if (item.user.value === '') {
						return alert('담당자를 선택해주세요.')
					}
					if (item.select_holding.value === '') {
						return alert('홀딩타입을 선택해주세요.')
					}
					if (item.select_holding.value === '') {
						return alert('홀딩타입을 선택해주세요.')
					}
					if (item.select_holding.value === '즉시 홀딩') {
						if (item.holdingTime3.value === '') {
							return alert('홀딩시간을 선택해주세요.')
						}
					} else {
						if (item.holdingTime1.time === '') {
							return alert('홀딩시간을 선택해주세요.')
						}
						if (item.holdingTime2.time === '') {
							return alert('홀딩시간을 선택해주세요.')
						}
					}
					const data = {
						useYn: true,
						userID: item.user.value,
						status: 'assignment',
						productID: item.id,
						orderType: 'admin',
						businessID: this.$store.state.businessSelectBox.value,
					}
					if (item.select_holding.value === '종일 홀딩') {
						data.type = 'allday'
						data.start = item.holdingTime1.time + ':00.000'
						data.end = item.holdingTime2.time + ':00.000'
					} else if (item.select_holding.value === '시간 홀딩') {
						data.type = 'time'
						data.start = item.holdingTime1.time + ':00.000'
						data.end = item.holdingTime2.time + ':00.000'
					} else if (item.select_holding.value === '즉시 홀딩') {
						data.type = 'now'
						data.holdingTime = item.holdingTime3.value
						data.start = this.$moment().format('HH:mm') + ':00.000'
						data.end =
							this.$moment()
								.add(item.holdingTime3.value.replace(/[^0-9]/g, ''), 'm')
								.format('HH:mm') + ':00.000'
					}
					this.$store
						.dispatch('createAssignment', data)
						.then(async () => {
							this.productSelectData()
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					alert(`근무시간이 아닙니다.\n(근무시간:${startTime}~${endTime})`)
				}
			}
		},
		updateAssignmentAction(item) {
			if (confirm('배정을 해제하시겠습니까?')) {
				const data = {
					id: item.assingnmentData.id,
					useYn: false,
				}
				this.$store.dispatch('updateAssignment', data).then(async () => {
					this.productSelectData()
				})
			}
			this.holdingDetail.dialog = false
		},
		managerChoiceStatusChange(val, item) {
			if (val === '담당자 지정') {
				const teamViewData = {
					businessID: this.$store.state.businessSelectBox.value,
				}
				this.$store.dispatch('teams', teamViewData).then(res => {
					item.team.value = ''
					item.team.items = res.teams
					item.team.disabled = false
				})
			} else {
				item.team.value = ''
				item.team.items = []
				item.team.disabled = true
				item.user.value = ''
				item.user.items = []
				item.user.disabled = true
			}
		},
		teamChange(val, item) {
			this.$store.state.loading = true
			const usersData = {
				teamID: val,
			}
			this.$store.dispatch('users', usersData).then(res => {
				item.user.value = ''
				item.user.items = res.users
				item.user.disabled = false
				this.$store.state.loading = false
			})
		},
		async assignmentsView(assignmentsViewData) {
			await this.$store
				.dispatch('assignments', assignmentsViewData)
				.then(res => {
					this.userIdArr = res.assignments.map(x => x.userID)

					for (let index = 0; index < res.assignments.length; index++) {
						const element = res.assignments[index]
						this.productManager.items.filter(x => x.id === element.productID)[0].assingnmentData = element
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		async usersView(usersViewData) {
			await this.$store
				.dispatch('users', usersViewData)
				.then(res => {
					this.teamIdArr = res.users.map(x => x.teamID)
					for (let index = 0; index < this.productManager.items.length; index++) {
						const element = this.productManager.items[index]
						if (element.assingnmentData) {
							element.assingnmentUserData = res.users.filter(x => x.id === element.assingnmentData.userID)[0]
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		async teamView(teamViewData) {
			await this.$store
				.dispatch('teams', teamViewData)
				.then(res => {
					for (let index = 0; index < this.productManager.items.length; index++) {
						const element = this.productManager.items[index]
						if (element.assingnmentData) {
							element.assingnmentTeamData = res.teams.filter(x => x.id === element.assingnmentUserData.teamID)[0]
						}
					}
					this.productManager.items = JSON.parse(JSON.stringify(this.productManager.items))
					this.productManager.items.forEach(el => {
						if (el.assingnmentData) {
							el['leaveTime'] = this.$moment(this.$moment().format(`YYYY-MM-DD`) + ' ' + el.assingnmentData.end.substr(0, 5)).diff(
								this.$moment(),
								'minute',
							)
							if (el.leaveTime < 0) {
								const data = {
									id: el.assingnmentData.id,
									useYn: false,
								}
								this.$store.dispatch('updateAssignment', data).then(async () => {
									this.productSelectData()
								})
							}
						}
					})
					// this.productManager.items = []
					// this.productManager.items.forEach(el => {
					// 	data1.push({ text: el.housingType, value: el.housingType })
					// 	data2.push({ text: el.dong + '동', value: el.dong })
					// 	data3.push({ text: el.ho + '호', value: el.ho })
					// })
					// this.productManager.items.team.value= this.productManager.items.assingnmentTeamData.id
				})
				.catch(err => {
					console.log(err)
				})
		},
		async product_table(product_tableData) {
			await this.$store.dispatch('products', product_tableData).then(res => {
				this.productIdArr = res.products.map(x => x.id)
				for (let index = 0; index < res.products.length; index++) {
					const element = res.products[index]
					element.product_manager = {
						placeholder: '담당자 지정여부',
						value: '미지정',
						items: ['담당자 지정', '미지정'],
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
					}
					element.team = {
						placeholder: '팀',
						value: '',
						items: [],
						disabled: true,
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
						itemValue: 'id',
						itemText: 'title',
					}
					element.user = {
						placeholder: '상담사',
						value: '',
						items: [],
						disabled: true,
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
						itemValue: 'id',
						itemText: 'username',
					}
					element.select_holding = {
						placeholder: '시간 선택',
						value: '',
						items: ['종일 홀딩', '시간 홀딩', '즉시 홀딩'],
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
					}
					element.holdingTime1 = {
						dialog: false,
						time: '',
						disabled: false,
						minTime: '',
						maxTime: '',
					}
					element.holdingTime2 = {
						dialog: false,
						time: '',
						disabled: false,
						minTime: '',
						maxTime: '',
					}
					element.holdingTime3 = {
						placeholder: '선택',
						value: '',
						items: [
							{ text: '30분', value: '30' },
							{ text: '60분', value: '60' },
							{ text: '90분', value: '90' },
						],
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
					}
				}
				this.productManager.items = res.products
				this.productManager.items_origin = JSON.parse(JSON.stringify(res.products))
			})
		},
		async holdTimeShow() {
			const data1 = {
				businessID: this.$store.state.businessSelectBox.value,
				contractStatus: 'contract',
			}
			await this.$store.dispatch('products', data1).then(res => {
				this.holdingDetail.holdingDashboard.productIdArr = res.products.map(x => x.id)
				this.holdingDetail.holdingDashboard.items = res.products
			})
			const data2 = {
				productArr: this.holdingDetail.holdingDashboard.productIdArr,
				created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
				created_at_lte: this.$moment(
					this.$moment()
						.add(1, 'd')
						.format('YYYY-MM-DD'),
				),
				status: 'assignment',
			}
			await this.$store.dispatch('assignments', data2).then(res2 => {
				this.holdingDetail.holdingDashboard.userIdArr = res2.assignments.map(x => x.userID)
				for (let index = 0; index < res2.assignments.length; index++) {
					const element = res2.assignments[index]
					this.holdingDetail.holdingDashboard.items.filter(x => x.id === element.productID)[0].assingnmentData = element
				}
			})
			const data3 = {
				idArr: this.holdingDetail.holdingDashboard.idArr,
			}
			await this.$store.dispatch('users', data3).then(res3 => {
				this.holdingDetail.holdingDashboard.teamIdArr = res3.users.map(x => x.teamID)
				for (let index = 0; index < this.holdingDetail.holdingDashboard.items.length; index++) {
					const element = this.holdingDetail.holdingDashboard.items[index]
					if (element.assingnmentData) {
						element.assingnmentUserData = res3.users.filter(x => x.id === element.assingnmentData.userID)[0]
					}
				}
			})
			const data4 = {
				idArr: this.holdingDetail.holdingDashboard.teamIdArr,
			}
			await this.$store.dispatch('teams', data4).then(res4 => {
				for (let index = 0; index < this.holdingDetail.holdingDashboard.items.length; index++) {
					const element = this.holdingDetail.holdingDashboard.items[index]
					if (element.assingnmentData) {
						element.assingnmentTeamData = res4.teams.filter(x => x.id === element.assingnmentUserData.teamID)[0]
					}
				}
				this.holdingDetail.holdingDashboard.items = JSON.parse(JSON.stringify(this.holdingDetail.holdingDashboard.items))
				this.holdingDetail.holdingDashboard.items.forEach(el => {
					if (el.assingnmentData) {
						el['leaveTime'] = this.$moment(this.$moment().format(`YYYY-MM-DD`) + ' ' + el.assingnmentData.end.substr(0, 5)).diff(
							this.$moment(),
							'minute',
						)
					}
				})
			})
			this.holdingDetail.holdingDashboard.items = this.holdingDetail.holdingDashboard.items.filter(x => x.assingnmentData)

			// this.holdingDetail.holdingDashboard.items = this.productManager.items.filter(x => x.assingnmentData)
			this.holdingDetail.todayTime = this.$moment().format('YYYY-MM-DD HH:mm')
			this.holdingDetail.dialog = true
		},
	},
}
</script>

<style lang="scss"></style>
