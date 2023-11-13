<template>
	<!-- <div>
		ss
	</div> -->
	<div class="mt-4">
		<v-layout wrap mb-4 style="font-size: 0.75rem;" align-center>
			<v-flex xs6>
				<v-layout>
					<v-flex xs1> 계약상태</v-flex>
					<!-- <v-flex xs3>
						<div style="width:10px; height:10px; background-color:red; display: inline-flex;  border:1px solid black;"></div>
						상담예정 : 건
						<v-icon style="margin-bottom: 1px;" small @click="refreshAction()">mdi-refresh</v-icon>
					</v-flex> -->
					<v-flex v-for="(status, index) in Object.keys(statusValue)" :key="index">
						<div
							:style="
								'width:10px; height:10px; background-color:' +
									legendStatusColor(status) +
									'; display: inline-flex;  border:1px solid black;'
							"
						></div>
						{{ legendStatus(status) }}
						{{ productRatioCalculation(statusValue, status) }}
					</v-flex>
					<!-- <v-flex xs3>
						<div style="width:10px; height:10px; background-color:yellow; display: inline-flex;  border:1px solid black;"></div>
						배정중 :{{ this.assignmentsData.length }} 건
					</v-flex>
					<v-flex xs3>
						<div style="width:10px; height:10px; background-color:#3a258f; display: inline-flex;  border:1px solid black;"></div>
						계약완료 :{{ this.settlementsData.length }} 건
					</v-flex> -->
					<!-- <v-flex xs3>평형</v-flex> -->
					<!-- <v-flex xs3 v-for="(area, index) in areaArr" :key="index">
						<div :style="`width:10px; height:10px; background-color:${area.color}; display: inline-flex; border:1px solid black;`"></div>
						{{ area.area }} : {{ area.count }}({{ area.remainingCount }})
					</v-flex> -->
				</v-layout>
			</v-flex>
		</v-layout>
		<div style="height:85vh; width:85vw; overflow:auto;" class="mt-4">
			<v-layout justify-center v-if="dashboardData.length > 0" style="padding-left: 94vw;">
				<div v-for="(d, index) in dashboardData" :key="index" style="margin-top:auto; margin-right:40px; width:300px; min-width:200px; ">
					<v-layout v-for="(f, idx) in d.floor" :key="idx" wrap :style="idx === d.floor.length - 1 ? 'border-bottom:1px solid black;' : ''">
						<!-- v-for="(d1, i) in Number(
								d.floor[d.floor.length - 1].data[d.floor[d.floor.length - 1].data.length - 1].ho.substring(
									d.floor[d.floor.length - 1].data[d.floor[d.floor.length - 1].data.length - 1].ho.length - 1,
								),
							)" -->
						<v-flex v-for="(d1, i) in d.maxHo" :key="i">
							<!-- :style="reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '배정 완료' ? 'background-color:red;' : ''" -->
							<v-layout justify-center>
								<v-flex
									v-if="f.data.filter(x => x.ho.includes('0' + (i + 1)))[0]"
									xs12
									style="text-align: center; width:10px; font-size:0.75rem; border:1px solid black; "
									:style="
										reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '계약'
											? 'background-color:red; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '가계약'
											? 'background-color:#7761A6; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '임대'
											? 'background-color:#DBDBDB; color:black;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '예정'
											? 'background-color:#87AE32; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '공실'
											? 'background-color:#63B4EE; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '기존'
											? 'background-color:#EFAB01; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '1차매각'
											? 'background-color:#AAAAAA; color:black;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '2차매각'
											? 'background-color:#656565; color:white;'
											: ''
									"
								>
									{{ f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].ho }}
									<!-- {{ f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].color }} -->
								</v-flex>
								<v-flex v-else xs12 style="text-align: center; width:10px; font-size:0.75rem; height:20px;"> </v-flex>
							</v-layout>
							<v-layout justify-center wrap>
								<v-flex
									v-if="f.data.filter(x => x.ho.includes('0' + (i + 1)))[0]"
									xs12
									:style="
										reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '계약'
											? 'background-color:red; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '가계약'
											? 'background-color:#7761A6; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '임대'
											? 'background-color:#DBDBDB; color:black;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '예정'
											? 'background-color:#87AE32; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '공실'
											? 'background-color:#63B4EE; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '기존'
											? 'background-color:#EFAB01; color:white;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '1차매각'
											? 'background-color:#AAAAAA; color:black;'
											: reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) === '2차매각'
											? 'background-color:#656565; color:white;'
											: ''
									"
									style="text-align: center; width:10px; font-size:0.5rem; border:1px solid black; border-top:0px; border-bottom:0px; height: 15px;"
								>
									{{ reserveStatus(f.data.filter(x => x.ho.includes('0' + (i + 1)))[0].id) }}
								</v-flex>

								<v-flex v-else style="text-align: center; width:10px; font-size:0.5rem; height:15px;"> </v-flex>
							</v-layout>
							<v-layout v-if="d.floor.length - 1 === idx">
								<v-flex
									style="text-align: center; font-size:0.75rem; border:1px solid black;"
									:style="
										`background-color:${
											d.housingType[i] === '61A'
												? '#ABAE77'
												: d.housingType[i] === '61B'
												? '#C6502A'
												: d.housingType[i] === '61C'
												? '#C6502A'
												: d.housingType[i] === '78A'
												? '#018F9E'
												: d.housingType[i] === '78B'
												? '#F05040'
												: '#FCB328'
										};`
									"
									xs12
								>
									{{ d.housingType[i] }}
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</div>
			</v-layout>
			<v-layout mt-4>
				<v-flex>
					<v-layout mb-10 justify-center style="padding-left: 94vw;">
						<div style="margin-right:40px; width:300px; min-width:200px; " v-for="(d, index) in dashboardData" :key="index" mr-2 mb-4>
							<v-layout wrap style="background-color:black; place-content: center;">
								<span style="color:white; font-size:0.85rem; font-weight:bold;"> {{ d.dong }} 동 </span>
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
		</div>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			total_product_data: [],
			total_product: 0,
			settlementsData: [],
			assignmentsData: [],
			statusValue: {},
			color: ['#FFFBEF', '#EBF4FF', '#EBFFEC', '#FFFEEB', '#FFF3EB', '#FFFBFE', '#ECECEC'],
			dashboardData: [],
			areaArr: [],
			productData: [],
			totalDashboardData: [],
		}
	},
	computed: {},
	methods: {
		// 상태 별 % 구하는 공식
		productRatioCalculation(statusValue, status) {
			// 상태 값 임대는 제외
			if (status !== 'lease') {
				let count = this.total_product - statusValue['lease'].length
				return `${statusValue[status].length} 건 (${Math.round((statusValue[status].length / count) * 100)}%)`
			} else {
				return `${statusValue[status].length} 건`
			}
		},
		legendStatus(val) {
			if (val === 'lease') {
				return '임대'
			} else if (val === 'vacancy') {
				return '공실'
			} else if (val === 'toBeRented') {
				return '예정'
			} else if (val === 'existing') {
				return '기존'
			} else if (val === 'contract') {
				return '계약'
			} else if (val === 'noContract') {
				return '가계약'
			} else {
				return ''
			}
		},

		legendStatusColor(val) {
			if (val === 'lease') {
				return '#95918B'
			} else if (val === 'vacancy') {
				return '#63B4EE'
			} else if (val === 'toBeRented') {
				return '#87AE32'
			} else if (val === 'existing') {
				return '#EFAB01'
			} else if (val === 'contract') {
				return '#C494BA'
			} else if (val === 'noContract') {
				return '#7761A6'
			} else {
				return ''
			}
		},
		returnStyle(floorData, i) {
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
				this.settlementsData = res.settlements.map(x => x.ProductID)
				for (let index = 0; index < res.settlements.length; index++) {
					const element = res.settlements[index]
					this.productData.filter(x => x.id === element.ProductID)[0].color = 'blue'
				}
			})
		},

		async assignmentsView(data) {
			await this.$store.dispatch('assignments', data).then(async res => {
				this.assignmentsData = res.assignments.map(x => x.productID)
				for (let index = 0; index < res.assignments.length; index++) {
					const element = res.assignments[index]

					this.productData.filter(x => x.id === element.productID)[0].color = 'yellow'
				}
			})
		},
		// 상품 정보 불러오는 API
		async productsView(productsViewData) {
			await this.$store.dispatch('products', productsViewData).then(async res => {
				this.total_product = res.products.length
				this.total_product_data = res.products
				// 상품 타입 별 key값 배열화
				const statusSetObj = new Set(res.products.map(x => x.contractStatus))
				const statusArr = [...statusSetObj]
				// 타입 별 로 상품 나누기
				for (let index = 0; index < statusArr.length; index++) {
					const element = statusArr[index]
					this.statusValue[element] = res.products.filter(x => x.contractStatus === element).map(x => x.id)
				}

				this.productData = []
				// for (let index = 0; index < res.products.length; index++) {
				// 	const element = res.products[index]
				// 	element.color = ''
				// }
				this.productData = res.products
				// const assignmentsViewData = {
				// 	status: 'assignment',
				// 	businessID: this.$store.state.businessSelectBox.value,
				// 	created_at_gte: this.$moment(this.$moment().format('YYYY-MM-DD')),
				// 	created_at_lte: this.$moment(
				// 		this.$moment()
				// 			.add(1, 'd')
				// 			.format('YYYY-MM-DD'),
				// 	),
				// }
				// await this.assignmentsView(assignmentsViewData)
				// const settlementData = {
				// 	date: this.$moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
				// 	businessID: this.$store.state.businessSelectBox.value,
				// }
				// await this.settlementView(settlementData)
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
				data.maxHo = 0
				data.housingType = []

				for (let i = 0; i < floorData.length; i++) {
					const e = floorData[i]
					let hosuData = this.productData.filter(x => x.dong === el && x.floor === e)
					if (data.maxHo < hosuData.length) {
						data.maxHo = hosuData.length
					}
					data.dong = el

					if (hosuData.map(x => x.housingType).length > data.housingType.length) {
						data.housingType = hosuData.map(x => x.housingType)
					}

					data.floor.push({
						floor: e,
						data: hosuData.sort((a, b) => {
							if (a.ho > b.ho) return 1
							if (a.ho === b.ho) return 0
							if (a.ho < b.ho) return -1
						}),
					})
					if (i === 0) {
						// console.log(el)
						// console.log(data.floor)
					}
				}
				arr.push(data)
			}

			// if (this.$route.path === '/fullScreen') {
			// 	this.chunk(arr, 6)
			// } else {
			// this.chunk(arr, 5)
			// }
			this.dashboardData = arr.sort(function(a, b) {
				if (Number(a.dong) > Number(b.dong)) return 1
				if (Number(a.dong) === Number(b.dong)) return 0
				if (Number(a.dong) < Number(b.dong)) return -1
			})
			this.$store.state.loading = false
		},
		chunk(data = [], size = 1) {
			const arr = []
			for (let i = 0; i < data.length; i += size) {
				arr.push(data.slice(i, i + size))
			}
			this.dashboardData = arr
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
		/** 11 11 */
		reserveStatus(val) {
			if (this.statusValue['lease'].indexOf(val) !== -1) {
				return '임대'
			} else if (this.statusValue['vacancy'].indexOf(val) !== -1) {
				return '공실'
			} else if (this.statusValue['toBeRented'].indexOf(val) !== -1) {
				return '예정'
			} else if (this.statusValue['existing'].indexOf(val) !== -1) {
				return '기존'
			} else if (this.statusValue['contract'].indexOf(val) !== -1) {
				return '계약'
			} else if (this.statusValue['noContract'].indexOf(val) !== -1) {
				return '가계약'
			} else if (this.statusValue['firstContract'].indexOf(val) !== -1) {
				return '1차매각'
			} else if (this.statusValue['secondContract'].indexOf(val) !== -1) {
				return '2차매각'
			} else if (this.assignmentsData.indexOf(val) !== -1) {
				return '배정 완료'
			} else if (this.settlementsData.indexOf(val) !== -1) {
				return '계약 완료'
			} else {
				return 'ㅤ'
			}
			// else if (this.statusValue['lease'].indexOf(val) !== -1) {
			// 				console.log(this.statusValue['lease'].indexOf(val))
			// 				return 'lease'
			// 			}

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
		console.log(this.$store.state.businessSelectBox.value)
		if (this.$store.state.businessSelectBox.value === '') {
			await this.$store.dispatch('businesses').then(res => {
				if (res.businesses.length !== 0) {
					this.$store.state.businessSelectBox.items = res.businesses
					this.$store.state.businessSelectBox.value = res.businesses[0].id
				} else {
					this.$router.push('/KIOSK').catch(() => {})
					return alert('등록된 사업지가 없습니다. \n등록 후 이용해주세요.')
				}
			})
			const productsViewData = {
				businessID: this.$store.state.businessSelectBox.value,
				// idArr: this.productArrData,
			}
			await this.productsView(productsViewData)
		} else {
			const productsViewData = {
				businessID: this.$store.state.businessSelectBox.value,
				// idArr: this.productArrData,
			}
			await this.productsView(productsViewData)
		}
	},
}
</script>

<style></style>
