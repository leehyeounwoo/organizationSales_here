<template>
	<div class="counselor_container">
		<div class="counselor_content_wrap sticky_wrap pt-0 mt-0">
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="to_bizDashboard()">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						정산관리
					</span>
				</v-layout>
			</div>
			<v-card class="pa-2 mx-2 my-4" flat>
				<!-- 상담예약관리 -->
				<!-- 날짜 선택  -->
				<v-layout align-center class="date_filter">
					<div style="width:115px">
						<DatepickerDialog
							:picker="startPicker"
							@input="realRangeTimeCount('date_change')"
							class="super_dense"
							:allowed_dates="allowed_datesStart"
						></DatepickerDialog>
					</div>
					<div class="mx-2">
						~
					</div>
					<div style="width:115px" class="mr-6">
						<DatepickerDialog :picker="endPicker" @input="realRangeTimeCount('date_change')" class="super_dense"></DatepickerDialog>
					</div>
					<div style="width:115px">
						<v-select
							v-model="day"
							hideDetails
							dense
							:items="days"
							outlined
							@change="dayChange"
							class="super_dense"
							color="primary2"
						></v-select>
					</div>
				</v-layout>
				<v-layout align-center class="date_filter">
					<div style="width:115px" class="mr-6">
						<v-select
							v-model="product1"
							hideDetails
							dense
							:items="products1"
							outlined
							@change="product1Change"
							class="super_dense"
							color="primary2"
							placeholder="주택형"
						></v-select>
					</div>
					<div style="width:115px" class="mr-6">
						<v-select
							v-model="product2"
							hideDetails
							dense
							:items="products2"
							outlined
							@change="product2Change"
							class="super_dense"
							color="primary2"
							placeholder="동"
						></v-select>
					</div>
					<div style="width:115px">
						<v-select
							v-model="product3"
							hideDetails
							dense
							:items="products3"
							outlined
							class="super_dense"
							color="primary2"
							placeholder="호수"
						></v-select>
					</div>
				</v-layout>
				<v-layout align-center>
					<div style="width:115px">
						<v-select
							v-model="selectType"
							hideDetails
							dense
							:items="selectTypes"
							outlined
							class="super_dense"
							color="primary2"
							placeholder="호수"
						></v-select>
					</div>
					<div style="width:203px;">
						<v-text-field
							:autofocus="false"
							class="search-textfiled"
							placeholder="검색어입력"
							hideDetails
							maxlength="255"
							flat
							height="25"
							dense
							color="primary2"
							v-model="search"
							@keyup.enter="settlements('search')"
							autocomplete="off"
						></v-text-field>
					</div>
					<v-btn color="primary2" small dark dense height="25" @click="settlements('search')">
						<v-icon>mdi-magnify</v-icon>
						조회</v-btn
					>
				</v-layout>

				<!-- 검색결과  -->
				<v-layout class="mt-2 mb-2">
					<div class="manage_table_result">
						전체 <span class="ml-2">{{ total }}</span> 건
					</div>
				</v-layout>
				<!-- 데이터 테이블 -->
				<datatable :datatable="datatable" class="front-datatable mb-2" @click="editSettlement" />
			</v-card>
		</div>
		<!-- 고객상세 팝업 -->
	</div>
</template>
<script>
import { DatepickerDialog, datatable } from '@/components'
export default {
	components: {
		DatepickerDialog,
		datatable,
	},
	data() {
		return {
			total: 0,
			selectTypes: ['이름', '전화번호'],
			selectType: '이름',
			products1: [],
			products2: [],
			products3: [],
			product1: '',
			product2: '',
			product3: '',

			datatable: {
				headers: [
					{ text: '계약자', value: 'name', align: 'center' },
					{ text: '계약일', value: 'contractDate', align: 'center' },
					{
						text: '계약 물건',
						align: 'center',
						value: 'product_settlements',
					},
					{ text: '상태', value: 'settlementStatus', align: 'center' },
				],
				class: 'mt-0',
				items: [],
				noweditting: '',
				hidedefaultfooter: true,
				itemsPerPage: 99,
				page: 1,
				pageCount: 0,
			},

			search: '',
			startPicker: {
				class: 'super_dense',
				date: this.$moment().format('YYYY-MM-DD'),
			},
			endPicker: {
				class: 'super_dense',
				date: this.$moment().format('YYYY-MM-DD'),
			},
			day: '전체',
			days: ['전체', '1주일', '15일', '1개월', '3개월'],
			productDatas: [],
		}
	},
	created() {
		this.products()
		this.settlements('first')
	},
	methods: {
		editSettlement(val) {
			this.$router.push({ name: 'editSettlementTruns', params: { id: val.id } })
		},
		product1Change(val) {
			this.products2 = this.productDatas.filter(x => x.housingType === val).map(x => x.dong)
			this.product2 = ''
			this.product3 = ''
		},
		product2Change(val) {
			this.products3 = this.productDatas.filter(x => x.dong === val).map(x => x.ho)
			this.product3 = ''
		},
		products() {
			this.$store.dispatch('me').then(() => {
				this.$store.dispatch('products', { businessID: this.$store.state.meData.businessID }).then(res => {
					this.productDatas = res.products
					this.products1 = res.products.map(x => x.housingType)
				})
			})
		},
		allowedDates(val) {
			if (this.able_date.start <= val && this.able_date.end >= val && this.$moment().format('YYYY-MM-DD') <= val) return val
		},
		settlements(type) {
			this.$store.state.loading = true
			this.$store.dispatch('me').then(() => {
				const data = {
					userID: this.$store.state.meData.id,
				}
				if (type !== 'first') {
					data.contractDate_gte =
						this.$moment(this.startPicker.date)
							.subtract('h', 9)
							.format('YYYY-MM-DD') + 'T00:00:00.000Z'
					data.contractDate_lte = this.$moment(this.endPicker.date).format('YYYY-MM-DD') + 'T15:00:00.000Z'
					if (this.search) {
						if (this.selectType === '이름') data.name = this.search
						else data.phone = this.search
					}
					if (this.product1 && this.product2 && this.product3) {
						if (
							this.productDatas.filter(x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3).length >
							0
						) {
							const productID = this.productDatas.filter(
								x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3,
							)[0].id

							data.ProductID = productID
						}
					}
				}
				this.$store.dispatch('settlementsList', data).then(res => {
					console.log(res.settlements)
					this.total = res.settlements.length
					for (let index = 0; index < res.settlements.length; index++) {
						const el = res.settlements[index]
						el.product = this.productDatas.filter(x => x.id === el.ProductID)[0]
						el.contractDate = this.$moment(el.contractDate).format('YYYY.MM.DD')
					}
					this.datatable.items = res.settlements
					this.$store.state.loading = false
				})
			})
		},
		excelExport() {
			document.getElementById('cunselmangage_Excel').click()
		},
		allowed_datesEnd(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment().format('YYYY-MM-DD') >= val
			}
			return val
		},
		allowed_datesStart(val) {
			if (this.endPicker.date === '') {
				return val
			} else {
				val = this.endPicker.date >= val
			}
			return val
		},

		dayChange(val) {
			if (this.days[0] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: '',
				}
				this.endPicker = {
					class: 'super_dense',
					date: '',
				}
			} else if (this.days[1] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(7, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[2] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(15, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[3] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(1, 'months')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[4] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(3, 'months')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			}
		},
		to_bizDashboard() {
			// 뒤로가기 버튼
			this.$router.push({ name: 'counselorDashboard' })
		},
	},
}
</script>
