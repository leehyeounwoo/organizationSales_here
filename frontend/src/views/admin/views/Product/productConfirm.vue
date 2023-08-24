<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter1" style="font-size:13px;" @change="selectFilter2"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter2" style="font-size:13px"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter3" style="font-size:13px"></selectBox>
			</v-flex>
			<v-btn class="ml-3 search_btn" color="#009dac">적용</v-btn>
		</v-layout>
		<datatable :datatable="productTable" :editAssignmentAction="editAssignmentAction" class="mt-5"></datatable>
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'

export default {
	async created() {
		this.$store.state.loading = true
		let ok = 0
		const createInterval = setInterval(async () => {
			if (this.$store.state.businessSelectBox.value !== '') {
				// const businessViewData = {
				// 	idArr: this.$store.state.businessSelectBox.value,
				// }
				// this.businessView(businessViewData)
				await this.$store.dispatch('businesses', { idArr: [this.$store.state.businessSelectBox.value] }).then(res => {
					let splitTime = res.businesses[0].maximumHoldingTime / res.businesses[0].splitHoldingTime

					for (let index = 0; index < splitTime; index++) {
						this.timeArr.push(res.businesses[0].splitHoldingTime * (index + 1))
					}
				})
				console.log(this.timeArr)
				const assignmentsViewData = {
					status: 'waiting',
				}
				await this.assignmentsView(assignmentsViewData)
				const usersViewData = {
					idArr: this.userIDArr,
				}
				await this.usersView(usersViewData)
				const teamViewData = {
					idArr: this.teamIdArr,
				}
				this.teamView(teamViewData)
				const productsViewData = {
					idArr: this.productIDArr,
				}
				await this.productsView(productsViewData)
				this.$store.state.loading = false
				clearInterval(createInterval)
			}

			if (ok === 10) {
				this.$store.state.loading = false
				clearInterval(createInterval)
				alert('비즈니스 정보가 없습니다.')
				this.$router.push({ name: 'dashBoard' })
			}
			ok += 1
		}, 1000)
	},
	methods: {
		selectFilter2() {
			console.log(123)
		},
		editAssignmentAction(item) {
			const data = {
				id: item.id,
			}
			if (item.status === 'noAssignment') {
				return alert('배정 상태를 선택해주세요.')
			} else {
				if (item.status === 'assignment') {
					data.status = 'assignment'

					data.start = this.$moment().format('HH:mm') + ':00.000'
					data.end =
						this.$moment()
							.add(item.holdingTimeSel.value, 'm')
							.format('HH:mm') + ':00.000'
				} else {
					data.status = 'reject'
				}
			}
			this.$store.dispatch('updateAssignment', data).then(async res => {
				console.log(res)
			})
		},
		// async businessView(businessViewData) {
		// 	await this.$store.dispatch('businesses', businessViewData).then(async res => {
		// 		console.log(res.businesses[0])
		// 		this.businessData = res.businesses[0]
		// 	})
		// },
		async assignmentsView(data) {
			await this.$store.dispatch('assignments', data).then(async res => {
				console.log(res)
				this.productIDArr = res.assignments.map(x => x.productID)
				this.userIDArr = res.assignments.map(x => x.userID)
				this.productTable.items = res.assignments
			})
		},
		async usersView(usersViewData) {
			await this.$store.dispatch('users', usersViewData).then(async res => {
				this.teamIdArr = res.users.map(x => x.teamID)
				for (let index = 0; index < this.productTable.items.length; index++) {
					const element = this.productTable.items[index]
					let idx = res.users.findIndex(x => x.id === element.userID)
					element.user = res.users[idx]
				}
			})
		},
		async productsView(productsViewData) {
			await this.$store.dispatch('products', productsViewData).then(async res => {
				for (let index = 0; index < this.productTable.items.length; index++) {
					const element = this.productTable.items[index]
					let idx = res.products.findIndex(x => x.id === element.productID)
					element.product = res.products[idx]
					element.product_counselor = element.team.title + ' ' + element.user.username
					element.holding_product = element.product.housingType + ' ' + element.product.dong + '동 ' + element.product.ho + '호'
					// element.holdingTime = element.holdingTime
					element.holdingTimeSel = {
						placeholder: '홀딩 요청 시간',
						value: Number(element.holdingTime),
						items: this.timeArr,
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
						disabled: false,
					}
				}
				console.log(this.productTable.items)
				this.productTable.items = JSON.parse(JSON.stringify(this.productTable.items))
				let data1 = [{ text: '전체', value: 'all' }]
				this.productTable.items.forEach(el => {
					data1.push({ text: el.product.housingType, value: el.product.housingType })
				})
				this.productFilter1.items = data1
			})
		},
		async teamView(teamViewData) {
			await this.$store
				.dispatch('teams', teamViewData)
				.then(res => {
					console.log(res.teams)
					for (let index = 0; index < this.productTable.items.length; index++) {
						const element = this.productTable.items[index]
						let idx = res.teams.findIndex(x => x.id === element.user.teamID)
						element.team = res.teams[idx]
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
	},
	components: {
		selectBox,
		datatable,
	},
	data() {
		return {
			timeArr: [],
			teamIdArr: [],
			userIDArr: [],
			productIDArr: [],
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
			productTable: {
				headers: [
					{ text: '요청 상담사', value: 'product_counselor', width: '12%' },
					{ text: '홀딩 요청 상품', value: 'holding_product', width: '15%' },
					{ text: '홀딩요청시간', value: 'holdingTime', width: '13%' },
					{ text: '배정 요청 처리', value: 'requestProcessing', width: '25%' },
					{ text: '상태', value: 'confirmStatus', width: '35%' },
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
}
</script>

<style lang="scss"></style>
