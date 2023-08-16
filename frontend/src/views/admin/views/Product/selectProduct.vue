<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter1" style="font-size:13px;"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter2" style="font-size:13px"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter3" style="font-size:13px"></selectBox>
			</v-flex>
			<v-btn class="ml-3 search_btn" color="#009dac">적용</v-btn>
		</v-layout>
		<v-layout justify-end>
			<v-btn elevation="0" class="mt-3" color="#f0f2f8" style="border:1px solid #cfdcdd; font-size:13px">상태 업데이트</v-btn>
		</v-layout>
		<datatable
			:datatable="productManager"
			:teamChange="teamChange"
			:managerChoiceStatusChange="managerChoiceStatusChange"
			:holdingTypeChoice="holdingTypeChoice"
			:createAssignmentAction="createAssignmentAction"
		></datatable>

		<v-btn class="mt-3 new_biz" @click="holdTimeShow()">배정현황</v-btn>
		<holdTimeDetail :setdialog="holdingDetail" />
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'
import holdTimeDetail from '../../viewItem/holdTimeDetail.vue'

export default {
	async created() {
		let ok = 0
		const createInterval = setInterval(async () => {
			if (this.$store.state.businessSelectBox.value !== '') {
				const businessViewData = {
					idArr: this.$store.state.businessSelectBox.value,
				}
				await this.businessView(businessViewData)
				const product_tableData = {
					businessID: this.$store.state.businessSelectBox.value,
				}
				await this.product_table(product_tableData)

				clearInterval(createInterval)
			}

			if (ok === 10) {
				clearInterval(createInterval)
				alert('비즈니스 정보가 없습니다.')
				this.$router.push({ name: 'dashBoard' })
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
			businessData: {},
			holdingDetail: {
				dialog: false,
				todayTime: '',
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
				class: 'datatablehover3',
				items: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
			},
		}
	},
	methods: {
		holdingTypeChoice(val, item) {
			let splitStartData = this.businessData.workingHoursStart.split(':')[0] + ':' + this.businessData.workingHoursStart.split(':')[1]
			let splitEndData = this.businessData.workingHoursEnd.split(':')[0] + ':' + this.businessData.workingHoursEnd.split(':')[1]
			if (val === '종일 홀딩') {
				item.holdingTime1.time = splitStartData
				item.holdingTime1.disabled = true
				item.holdingTime2.time = splitEndData
				item.holdingTime2.disabled = true
			} else if (val === '시간 홀딩') {
				item.holdingTime1.time = ''
				item.holdingTime1.disabled = false
				item.holdingTime2.time = ''
				item.holdingTime2.disabled = false
			}
			// else{
			// }
		},
		async businessView(businessViewData) {
			await this.$store.dispatch('businesses', businessViewData).then(async res => {
				console.log(res.businesses[0])
				this.businessData = res.businesses[0]
			})
		},
		createAssignmentAction(item) {
			const data = {
				useYn: true,
				userID: item.user.value,
				status: 'assignment',
				start: item.holdingTime1.time + ':00.000',
				end: item.holdingTime2.time + ':00.000',
				productID: item.id,
				orderType: 'admin',
				businessID: this.$store.state.businessSelectBox.value,
			}
			if (item.select_holding.value === '종일 홀딩') {
				data.type = 'allday'
				data.start = item.holdingTime1.time + ':00.000'
				data.end = item.holdingTime2.time + ':00.000'
			} else if (item.select_holding.value === '즉시 홀딩') {
				data.type = 'now'
				data.start = item.holdingTime1.time + ':00.000'
				data.end = item.holdingTime2.time + ':00.000'
			} else if (item.select_holding.value === '시간 홀딩') {
				data.type = 'time'
				data.holdingTime = item.holdingTime2.time
			}
			console.log(data)
			this.$store
				.dispatch('createAssignment', data)
				.then(async res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
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
				console.log(res.users)
				item.user.value = ''
				item.user.items = res.users
				item.user.disabled = false
				this.$store.state.loading = false
			})
		},
		product_table(product_tableData) {
			this.$store.dispatch('products', product_tableData).then(res => {
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
					}
					element.holdingTime2 = {
						dialog: false,
						time: '',
						disabled: false,
					}
					element.holdingTime3 = {
						placeholder: '선택',
						value: '',
						items: ['30분', '60분', '90분'],
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
					}
				}
				this.productManager.items = res.products
			})
		},
		holdTimeShow() {
			this.holdingDetail.todayTime = this.$moment().format('YYYY-MM-DD HH:mm')
			this.holdingDetail.dialog = true
		},
	},
}
</script>

<style lang="scss"></style>
