<template>
	<!-- <div>
		ss
	</div> -->
	<div style="height:100vh; width:85vw" class="mt-4">
		<v-layout wrap mb-4 style="font-size: 0.75rem;" align-center>
			<v-flex xs4>
				<v-layout>
					<v-flex xs2> 계약상태</v-flex>
					<!-- <v-flex xs3>
						<div style="width:10px; height:10px; background-color:red; display: inline-flex;  border:1px solid black;"></div>
						상담예정 : 건
						<v-icon style="margin-bottom: 1px;" small @click="refreshAction()">mdi-refresh</v-icon>
					</v-flex> -->
					<v-flex xs3>
						<div style="width:10px; height:10px; background-color:yellow; display: inline-flex;  border:1px solid black;"></div>
						배정중 :{{ this.assignmentsData.length }} 건
					</v-flex>
					<v-flex xs3>
						<div style="width:10px; height:10px; background-color:#3a258f; display: inline-flex;  border:1px solid black;"></div>
						계약완료 :{{ this.settlementsData.length }} 건
					</v-flex>
					<!-- <v-flex xs3>평형</v-flex> -->
					<!-- <v-flex xs3 v-for="(area, index) in areaArr" :key="index">
						<div :style="`width:10px; height:10px; background-color:${area.color}; display: inline-flex; border:1px solid black;`"></div>
						{{ area.area }} : {{ area.count }}({{ area.remainingCount }})
					</v-flex> -->
				</v-layout>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex>
				<v-layout mb-10 justify-center>
					<div style="margin-right:40px; width:300px;" v-for="(d, index) in dashboardData" :key="index" mr-2 mb-4>
						<v-layout wrap style="background-color:black; place-content: center;">
							<span style="color:white; font-size:0.5rem; font-weight:bold;"> {{ d.dong }} 동 </span>
						</v-layout>
					</div>
				</v-layout>
				<!-- <v-layout style="margin-top:auto;">

					<v-layout>
						<v-flex v-for="(te, idx) in testData" :key="idx" :style="true ? 'border-bottom:1px solid black;' : ''">

							<v-layout v-for="(t, i) in te" :key="i">
								<v-flex style="text-align: center; width:10px; font-size:0.75rem; border:1px solid black;">
									{{ t.data4 }}
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-layout> -->
			</v-flex>
		</v-layout>
		<v-layout justify-center v-if="dashboardData.length > 0">
			<div v-for="(d, index) in dashboardData" :key="index" style="margin-top:auto; margin-right:40px; width:300px;">
				<v-layout v-for="(f, idx) in d.floor" :key="idx" wrap :style="idx === d.floor.length - 1 ? 'border-bottom:1px solid black;' : ''">
					<v-flex v-for="(d1, i) in d.floor[d.floor.length - 1].data.length" :key="i">
						<!-- :style="reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '배정 완료' ? 'background-color:red;' : ''" -->
						<v-layout justify-center>
							<v-flex
								v-if="f.data.filter(x => x.ho.includes('0' + (i + 1)))[0]"
								xs12
								style="text-align: center; width:10px; font-size:0.75rem; border:1px solid black;"
								:style="
									reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '배정 완료'
										? 'background-color:yellow;'
										: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '계약 완료'
										? 'background-color:#3a258f; color:white;'
										: ''
								"
							>
								<!-- :style="areaStyle(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0])" -->
								{{ f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].ho }}
								<!-- {{ f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].color }} -->
							</v-flex>
							<v-flex v-else xs12 style="text-align: center; width:10px; font-size:0.75rem; height:19px;"> </v-flex>
						</v-layout>
						<v-layout justify-center>
							<v-flex
								v-if="f.data.filter(x => x.ho.includes('0' + (i + 1)))[0]"
								xs12
								:style="
									reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '배정 완료'
										? 'background-color:yellow;'
										: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '계약 완료'
										? 'background-color:#3a258f; color:white;'
										: ''
								"
								style="text-align: center; width:10px; font-size:0.5rem; border:1px solid black; border-top:0px; border-bottom:0px;"
							>
								{{ reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) }}
							</v-flex>

							<v-flex
								v-else
								style="text-align: center; width:10px; font-size:0.5rem; border:1px solid black; border-top:0px; border-bottom:0px;"
							></v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</div>
		</v-layout>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			settlementsData: [],
			assignmentsData: [],
			color: ['#FFFBEF', '#EBF4FF', '#EBFFEC', '#FFFEEB', '#FFF3EB', '#FFFBFE', '#ECECEC'],
			dashboardData: [],
			areaArr: [],
			productData: [],
			totalDashboardData: [],
		}
	},
	computed: {},
	methods: {
		returnStyle(floorData, i) {
			console.log(floorData)
			if (floorData[i].data.filter(x => x.ho.includes('0' + i)).length !== 0) {
				return 'background-color:yellow; color:white;'
				// let idData = floorData[i].data.filter(x => x.ho.includes('0' + (i + 1)))[0].id
				// console.log(idData)
				// console.log(this.assignmentsData)
				// console.log(this.assignmentsData.indexOf(idData))
				// if (this.assignmentsData.indexOf(idData) !== -1) {
				// 	return 'background-color:#3a258f; color:white;'
				// } else if (this.settlementsData.indexOf(idData) !== -1) {
				// 	return 'background-color:yellow; color:white;'
				// } else {
				// 	return ''
				// }
			} else {
				return ''
			}

			// console.log(f.data.filter(x => x.ho.includes('0' + (i + 1))).length)
			// this.settlementsData.indexOf(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0]).id
			// if (val) {
			// 	if (this.assignmentsData.indexOf(val)) {
			// 		return 'background-color:#3a258f; color:white;'
			// 	} else if (this.settlementsData.indexOf(val)) {
			// 		return 'background-color:#3a258f; color:white;'
			// 	}
			// } else {
			// 	return ''
			// }
		},
		async settlementView(settlementData) {
			await this.$store.dispatch('settlements', settlementData).then(res => {
				console.log(res)
				this.settlementsData = res.settlements.map(x => x.ProductID)
				for (let index = 0; index < res.settlements.length; index++) {
					const element = res.settlements[index]
					this.productData.filter(x => x.id === element.ProductID)[0].color = 'blue'
				}
			})
		},
		async assignmentsView(data) {
			await this.$store.dispatch('assignments', data).then(async res => {
				console.log(res)
				this.assignmentsData = res.assignments.map(x => x.productID)
				for (let index = 0; index < res.assignments.length; index++) {
					const element = res.assignments[index]
					console.log()
					this.productData.filter(x => x.id === element.productID)[0].color = 'yellow'
				}
			})
		},
		async productsView(productsViewData) {
			await this.$store.dispatch('products', productsViewData).then(async res => {
				this.productData = []
				for (let index = 0; index < res.products.length; index++) {
					const element = res.products[index]
					element.color = ''
				}
				this.productData = res.products
				const assignmentsViewData = {
					status: 'assignment',
					businessID: this.$store.state.businessSelectBox.value,
					created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
					created_at_lte: this.$moment(
						this.$moment()
							.add(1, 'd')
							.format('YYYY-MM-DD'),
					),
				}
				await this.assignmentsView(assignmentsViewData)
				const settlementData = {
					date: this.$moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
					businessID: this.$store.state.businessSelectBox.value,
				}
				await this.settlementView(settlementData)
				await this.dataResult()
			})
		},
		async dataResult() {
			let arr = []
			let dong = Array.from(new Set(this.productData.map(x => x.dong)))
			// this.complete = this.productData.filter(x => x.status === 'contract').length
			// this.contractHope = 0
			for (let index = 0; index < this.productData.length; index++) {
				const element = this.productData[index]
				if (element.ho.length === 3) {
					element.floor = element.ho.substr(0, 1)
				} else {
					element.floor = element.ho.substr(0, 2)
				}
			}
			for (let idx = 0; idx < dong.length; idx++) {
				const el = dong[idx]
				let data = {}
				let dongData = this.productData.filter(x => x.dong === el)
				let floorData = Array.from(new Set(dongData.map(x => x.floor)))
				floorData = floorData.sort(function(b, a) {
					if (Number(a) > Number(b)) return 1
					if (Number(a) === Number(b)) return 0
					if (Number(a) < Number(b)) return -1
				})
				data.floor = []
				for (let i = 0; i < floorData.length; i++) {
					const e = floorData[i]
					let hosuData = this.productData.filter(x => x.dong === el && x.floor === e)
					data.dong = el
					data.floor.push({
						floor: e,
						data: hosuData.sort((a, b) => {
							if (a.data4 > b.data4) return 1
							if (a.data4 === b.data4) return 0
							if (a.data4 < b.data4) return -1
						}),
					})
				}
				arr.push(data)
			}

			// if (this.$route.path === '/fullScreen') {
			// 	this.chunk(arr, 6)
			// } else {
			// 	this.chunk(arr, 5)
			// }

			this.dashboardData = arr
			// console.log(this.dashboardData)
			// this.dashboardData = JSON.parse(JSON.stringify(arr.slice(0, 4)))
			this.$store.state.loading = false
		},
		// chunk(data = [], size = 1) {
		// const arr = []
		// 	for (let i = 0; i < data.length; i += size) {
		// 	arr.push(data.slice(i, i + size))
		// }
		// this.dashboardData = arr
		// },
		areaStyle(val) {
			if (val) {
				if (this.reserveStatus(val) === 'ㅤ') {
					// let color = this.areaArr.filter(x => x.area === val.housingType)[0].color
					return
					// return `background-color:${color}; color:black;`
				}
			}
		},
		styleReturn(val) {
			if (val) {
				if (val.status === 'contractcompleted') {
					return 'background-color:#3a258f; color:white;'
				} else {
					// if (val.reservations.length !== 0) {
					// 	return 'background-color:red; color:white;'
					// } else {
					return this.styleReversedMessage(val)
					// }
				}
			}
		},
		styleReversedMessage() {
			// val
			// console.log(val)
			// if (val.clients.length !== 0) {
			// 	for (let index = 0; index < val.clients.length; index++) {
			// 		const element = val.clients[index]
			// 		let targetData = element.customDatas.add_info.filter(x => x.codeName === '고객상태')
			// 		if (targetData.length !== 0) {
			// 			if (targetData[0].value === '계약가망') {
			// 				return 'background-color:yellow; '
			// 			} else {
			// 				return ''
			// 			}
			// 		} else {
			// 			return ''
			// 		}
			// 	}
			// } else {
			return ''
			// }
		},
		reserveStatus(val) {
			if (this.assignmentsData.indexOf(val) !== -1) {
				return '배정 완료'
			} else if (this.settlementsData.indexOf(val) !== -1) {
				return '계약 완료'
			} else {
				return 'ㅤ'
			}
			// if (val === 'contractcompleted') {
			// 	return '계약완료'
			// } else {
			// 	// if (val.reservations.length !== 0) {
			// 	// 	return '상담예정'
			// 	// } else {
			// 	return this.reversedMessage(val)
			// 	// }
			// }
		},
		reversedMessage() {
			// console.log(val)
			// if (val.clients.length !== 0) {
			// 	for (let index = 0; index < val.clients.length; index++) {
			// 		const element = val.clients[index]
			// 		let targetData = element.customDatas.add_info.filter(x => x.codeName === '고객상태')
			// 		if (targetData.length !== 0) {
			// 			return targetData[0].value
			// 		} else {
			// 			return 'ㅤ'
			// 		}
			// 	}
			// } else {
			return 'ㅤ'
			// }
		},
	},
	async created() {
		const productsViewData = {
			businessID: this.$store.state.businessSelectBox.value,
			// idArr: this.productArrData,
		}
		await this.productsView(productsViewData)
	},
}
</script>

<style></style>
