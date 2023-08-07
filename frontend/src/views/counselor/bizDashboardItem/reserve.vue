<template>
	<div>
		<v-tabs v-model="tab" color="primary" grow>
			<v-tab>
				상담예약
			</v-tab>
			<v-tab>
				상담내역
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item class="pa-4">
				<div class="reserve-card">
					<div class="reserve-title">
						상담 물건 예약
					</div>
					<div class="reserve-tip">
						* 최대 8개의 물건을 예약을 할 수 있습니다.
					</div>
					<v-layout align-center style="justify-content: space-around;" class="mt-4 mb-2">
						<div class="reserve-subTitle">
							주택형
						</div>
						<div class="reserve-select">
							<v-select dense :items="datas.data1Items" hideDetails solo flat v-model="datas.data1" @change="data1"></v-select>
						</div>
					</v-layout>
					<v-layout align-center style="justify-content: space-around;" class="mb-2" v-if="datas.data1">
						<div class="reserve-subTitle">
							동선택
						</div>
						<div class="reserve-select">
							<v-select dense :items="datas.data2Items" hideDetails solo flat v-model="datas.data2" @change="data2"></v-select>
						</div>
					</v-layout>
					<v-layout align-center style="justify-content: space-around;" class="mb-2" v-if="datas.data2">
						<div class="reserve-subTitle">
							층선택
						</div>
						<div class="reserve-select">
							<v-select dense :items="datas.data3Items" hideDetails solo flat v-model="datas.data3" @change="data3"></v-select>
						</div>
					</v-layout>
					<v-layout align-center style="justify-content: space-around;" class="mb-2" v-if="datas.data3">
						<div class="reserve-subTitle">
							해당물건
						</div>
						<div style="width:75%; max-width:245px;">
							<v-chip-group column class="reserve-chips" v-model="productsList" multiple v-if="datas.data4Items.length > 0">
								<v-chip
									v-for="(tag, i) in datas.data4Items"
									:key="i"
									:value="tag"
									color="#E1A5C0"
									class="chipStyle"
									:disabled="productsList.length > 7"
									@click="addChips(tag)"
								>
									{{ tag }}
								</v-chip>
							</v-chip-group>
							<div v-else class="font-weight-bold primary--text">
								예약가능 물건이 없습니다.
							</div>
						</div>
					</v-layout>
					<v-layout style="justify-content: space-around;" class="mb-2" v-if="datas.data3">
						<div class="reserve-subTitle mt-4">
							선택물건
						</div>
						<div style="width:75%; max-width:245px;">
							<div class="mt-2">
								<v-btn
									v-for="(product, i) in houseDatas"
									:key="i"
									outlined
									color="#C4C4C4"
									class="mr-2 mb-1"
									width="60"
									@click="spliceProduct(i, product)"
									block
								>
									<span style="color:#0CB3D6;">
										{{ product.PD_Type }} / {{ product.PD_Dong }}동 / {{ product.PD_Floor }}층 /{{ product.PD_Ho }}호
									</span>
								</v-btn>
							</div>
						</div>
					</v-layout>

					<div class="reserve-title mt-4" style="color:#636363;">
						날짜를 선택하세요.
					</div>
					<div class="text-center">
						<v-date-picker
							color="point4"
							class="reserve-datepicker"
							width="100%"
							no-title
							locale="ko"
							v-model="selectDatas.date"
							:allowed-dates="allowedDates"
						></v-date-picker>
					</div>
					<v-layout class="mt-4 ml-3">
						<div class="info-1 mr-1"></div>
						<span class="info-text">선택</span>
						<div class="info-2 mr-1 ml-6"></div>
						<span class="info-text">불가</span>
					</v-layout>
					<v-divider color="#E1A5C0" class="my-4"></v-divider>
					<v-layout align-center>
						<v-icon class="mr-2" color="#636363">mdi-clock-time-four-outline</v-icon>
						<div class="reserve-timeText">
							시간을 선택하세요
						</div>
					</v-layout>
					<div class="reserve-tip">
						* 최대 2개의 시간대를 선택 할 수 있습니다.
					</div>
					<v-layout wrap class="mt-2">
						<v-btn
							v-for="(time, i) in timeList"
							:key="i"
							:outlined="selectDatas.times.indexOf(time) === -1 ? true : false"
							:dark="selectDatas.times.indexOf(time) === -1 ? false : true"
							class="mr-2 mb-1"
							width="60"
							@click="selectTimes(time)"
							:color="selectDatas.times.indexOf(time) === -1 ? '' : 'point1'"
						>
							<v-icon v-show="selectDatas.times.indexOf(time) > -1" small>
								mdi-check
							</v-icon>
							<span>
								{{ time }}
							</span>
						</v-btn>
					</v-layout>
					<div class="reserve-timeText mt-2" v-if="houseDatas.length > 0">
						▣ 선택 물건
					</div>
					<v-layout style="justify-content: space-around;" class="mb-2" v-if="houseDatas.length > 0">
						<div style="width:100%;">
							<div class="mt-2">
								<v-btn v-for="(product, i) in houseDatas" :key="i" outlined color="#C4C4C4" class="mr-2 mb-1" width="60" block text>
									<span style="color:#0CB3D6;">
										{{ product.PD_Type }} / {{ product.PD_Dong }}동 / {{ product.PD_Floor }}층 /{{ product.PD_Ho }}호
									</span>
								</v-btn>
							</div>
						</div>
					</v-layout>
					<div class="reserve-timeText mt-2">
						▣ 예약일시
					</div>
					<div class="reserve-select-time mt-2">
						<span class="point">{{ $moment(selectDatas.date).format('YYYY- MM-DD') }}</span>
						<span class="point">{{ selectDatas.times.join(' /') }}</span>
					</div>
					<v-divider color="point1" class="mt-3"></v-divider>
					<div class="reserve-timeText my-2">
						<v-icon color="black">mdi-account-circle</v-icon>
						고객정보를 입력하세요
					</div>
					<v-layout style="justify-content: space-around;" class="mb-2">
						<div class="reserve-subTitle mt-2">
							고객명
						</div>
						<div style="width:75%; max-width:245px;">
							<v-text-field
								:autofocus="false"
								hideDetails
								maxlength="255"
								flat
								clearable
								dense
								outlined
								v-model="reserveuser.name"
								autocomplete="off"
							></v-text-field>
						</div>
					</v-layout>
					<v-layout style="justify-content: space-around;" class="mb-2">
						<div class="reserve-subTitle mt-2">
							연락처
						</div>
						<div style="width:75%; max-width:245px;">
							<v-text-field
								:autofocus="false"
								hideDetails
								maxlength="13"
								flat
								clearable
								dense
								outlined
								type="number"
								v-model="reserveuser.phone"
								autocomplete="off"
							></v-text-field>
						</div>
					</v-layout>
					<v-btn dark @click="createReserve()" color="primary" block class="mt-6" rounded height="48">
						예약하기
					</v-btn>
				</div>
			</v-tab-item>
			<v-tab-item class="pa-4">
				<div class="reserve-card" style="max-width:368px;">
					<div class="mb-4">
						<v-text-field
							:autofocus="false"
							label="Search"
							solo
							dark
							class="search-textfiled"
							hideDetails
							maxlength="255"
							append-icon="mdi-magnify"
							flat
							rounded
							clearable
							dense
							v-model="search"
							@keydown.enter="searchCounselor()"
							autocomplete="off"
						></v-text-field>
					</div>
					<v-layout align-center class="mt-6" justify-end>
						<div style="width:150px">
							<DatepickerDialog :picker="startPicker" @input="realRangeTimeCount"></DatepickerDialog>
						</div>
						<div class="mx-2">
							~
						</div>
						<div style="width:150px">
							<DatepickerDialog :picker="endPicker" @input="realRangeTimeCount" :allowed_dates="allowed_datesEnd"></DatepickerDialog>
						</div>
					</v-layout>
					<v-layout justify-end class="mt-2 mb-4">
						<div style="width:100px">
							<v-select v-model="day" hideDetails dense :items="days" label="날짜 단위" outlined @change="dayChange"></v-select>
						</div>
					</v-layout>
					<v-data-table
						mobile-breakpoint="5000"
						:search="search"
						:headers="headers"
						:items="desserts"
						class="elevation-0 dashboard-table"
						:footer-props="{ itemsPerPageText: '' }"
						:options="{ itemsPerPage: 5 }"
					>
						<template v-slot:[`item.houseDatas`]="{ item }">
							<v-layout>
								<div style="width:50px;">타입</div>
								<div style="width:50px;">동</div>
								<div style="width:50px;">층</div>
								<div style="width:50px;">호수</div>
							</v-layout>
							<v-layout v-for="(data, i) in item.houseDatas" :key="i">
								<div style="width:50px;">{{ data.PD_Type }}</div>
								<div style="width:50px;">{{ data.PD_Dong }}</div>
								<div style="width:50px;">{{ data.PD_Floor }}</div>
								<div style="width:50px;">{{ data.PD_Ho }}</div>
							</v-layout>
						</template>
						<template v-slot:[`item.created_at`]="{ item }">
							<div>
								{{ $moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
							</div>
						</template>
						<template v-slot:[`item.action`]="{ item }">
							<v-layout v-if="item.show">
								<v-btn color="primary" small @click="cancelReserve(item)">예약취소</v-btn>
							</v-layout>
							<div v-else class="error--text">
								상담취소
							</div>
						</template>
					</v-data-table>
					<!-- <v-layout justify-end>
						<v-btn color="point3" dark @click="excelExport">
							엑셀저장
						</v-btn>
					</v-layout> -->
				</div>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>
<script>
import { DatepickerDialog } from '@/components'
import changeTime from '../../../utils/timeRange2.js'
import tiems from '../../../utils/times'
export default {
	components: {
		DatepickerDialog,
	},
	data() {
		return {
			selectDatas: {
				date: '',
				times: [],
			},
			tab: 0,
			timeList: ['10:00', '11:00'],
			date: '',
			productsList: [],
			datas: {
				data1: '',
				data1Items: [],
				data2: '',
				data2Items: [],
				data3: '',
				data3Items: [],
				data4: '',
				data4Items: [],
			},
			headers: [
				{
					text: '예약날짜',
					align: 'center',
					value: 'date',
				},
				{ text: '예약시간', value: 'times', align: 'center' },
				{ text: '예약물건', value: 'houseDatas', align: 'center' },
				{ text: '등록일', value: 'created_at', align: 'center' },
				{ text: '비고', value: 'action', align: 'center' },
			],
			desserts: [],
			search: '',
			startPicker: {
				date: this.$moment()
					.subtract(6, 'days')
					.format('YYYY-MM-DD'),
			},
			endPicker: {
				date: this.$moment().format('YYYY-MM-DD'),
			},
			day: '7일',
			days: ['30일', '21일', '14일', '7일'],
			houseDatas: [],
			reserveuser: {
				name: '',
				phone: '',
			},
		}
	},
	created() {
		this.business()
	},
	methods: {
		addChips(tag) {
			if (
				this.houseDatas.filter(
					x => x.PD_Type === this.datas.data1 && x.PD_Dong === this.datas.data2 && x.PD_Floor === this.datas.data3 && x.PD_Ho === tag,
				).length > 0
			) {
				const index = this.houseDatas.indexOf({
					PD_Type: this.datas.data1,
					PD_Dong: this.datas.data2,
					PD_Floor: this.datas.data3,
					PD_Ho: tag,
				})
				this.houseDatas.splice(index, 1)
			} else {
				this.houseDatas.push({
					PD_Type: this.datas.data1,
					PD_Dong: this.datas.data2,
					PD_Floor: this.datas.data3,
					PD_Ho: tag,
				})
			}
		},
		data1(val) {
			this.datas.data2Items = this.$store.state.business.product.filter(x => x.PD_Type === val).map(x => x.PD_Dong)
			this.datas.data2 = ''
			this.datas.data3 = ''
			this.datas.data3Items = []
			this.datas.data4Items = []
		},
		data2(val) {
			const filterData = this.$store.state.business.product.filter(x => x.PD_Type === this.datas.data1 && x.PD_Dong === val)
			this.datas.data3Items = filterData.map(x => x.PD_Floor)
			this.datas.data3 = ''
			this.datas.data4Items = []
		},
		data3(val) {
			const filterData = this.$store.state.business.product.filter(
				x => x.PD_Type === this.datas.data1 && x.PD_Dong === this.datas.data2 && x.PD_Floor === val,
			)
			this.$store.state.loading = true
			const data2 = {
				business: this.$store.state.business.id,
				contractStatus: '계약완료',
			}
			this.$store.dispatch('clients', data2).then(res2 => {
				this.datas.data4Items = filterData
					.map(x => x.PD_Ho)
					.filter(
						x =>
							!res2.clients
								.map(x => x.customDatas)
								.filter(x => x.PD_Type === this.datas.data1 && x.PD_Dong === this.datas.data2 && x.PD_Floor === val)
								.map(x => x.PD_Ho)
								.includes(x),
					)
				this.$store.state.loading = false
			})
		},
		cancelReserve(item) {
			if (item.show) {
				var result = confirm(`${item.date} - 상담예약을 취소 하시겠습니까?`)
				if (result) {
					const data = {
						id: item.id,
						show: false,
					}
					this.$store.dispatch('updateReservation', data).then(() => {
						alert('상담예약이 취소 되었습니다.')
						this.reservations()
					})
				}
			}
		},

		spliceProduct(i, tag) {
			const index = this.houseDatas.indexOf({
				PD_Type: this.datas.data1,
				PD_Dong: this.datas.data2,
				PD_Floor: this.datas.data3,
				PD_Ho: tag,
			})
			this.houseDatas.splice(index, 1)
			this.productsList.splice(i, 1)
		},
		selectTimes(val) {
			if (this.selectDatas.times.length < 8) {
				if (this.selectDatas.times.indexOf(val) > -1) {
					const index = this.selectDatas.times.indexOf(val)
					this.selectDatas.times.splice(index, 1)
				} else {
					this.selectDatas.times.push(val)
				}
			} else {
				const index = this.selectDatas.times.indexOf(val)
				this.selectDatas.times.splice(index, 1)
			}
		},
		allowedDates(val) {
			if (this.$store.state.business.reserveday) {
				if (this.$store.state.business.reserveday.sdate <= val && this.$store.state.business.reserveday.edate >= val) {
					if (this.$moment().format('YYYY-MM-DD') <= val) return val
				}
			}
		},
		reservations() {
			const data = {
				users_permissions_user: this.$store.state.meData.id,
				business: this.$store.state.business.id,
				updated_at_gte: this.startPicker.date + 'T00:00:00.000Z',
				updated_at_lte: this.endPicker.date + 'T23:59:59.000Z',
			}
			this.$store.dispatch('reservations', data).then(res => {
				this.desserts = res.reservations
			})
		},
		excelExport() {},
		allowed_datesEnd(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment().format('YYYY-MM-DD') >= val
			}
			return val
		},
		realRangeTimeCount() {
			this.reservations()
		},
		dayChange(val) {
			if (this.days[0] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(30, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[1] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(21, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[2] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(14, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[3] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(7, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			}
			this.realRangeTimeCount()
		},
		business() {
			this.$store.dispatch('business', { id: this.$route.params.id }).then(res => {
				this.selectDatas.date = this.$moment().format('YYYY-MM-DD')
				this.$store.state.business = res.business
				this.reservations()
				if (this.$store.state.business.product.length > 0) {
					this.datas.data1Items = this.$store.state.business.product.map(x => x.PD_Type)
				}
				const start = this.$store.state.business.reserveday.timeRange.split('/')[0]
				const end = this.$store.state.business.reserveday.timeRange.split('/')[1]
				this.timeList = []
				if (res.business.reserveday.splitMinute === '30') {
					tiems.forEach((el, index) => {
						if (tiems.indexOf(start) <= index && tiems.indexOf(end) >= index) {
							this.timeList.push(el)
						}
					})
				} else {
					changeTime.forEach((el, index) => {
						if (changeTime.indexOf(start) <= index && changeTime.indexOf(end) >= index) {
							this.timeList.push(el)
						}
					})
				}
			})
		},
		createReserve() {
			if (this.productsList.length === 0) return alert('예약가능 물건을 선택해 주세요.')
			if (!this.selectDatas.date) return alert('예약 날짜를 입력해 주세요.')
			if (this.selectDatas.times.length === 0) return alert('예약 시간을 입력해 주세요.')
			this.$store.state.loading = true
			const data = {
				show: true,
				business: this.$store.state.business.id,
				date: this.selectDatas.date,
			}
			this.$store.dispatch('reservations', data).then(res => {
				let checkArray = []
				let duDatas = []
				if (res.reservations.length > 0) {
					res.reservations.forEach((el, index) => {
						el.houseDatas.forEach(el2 => {
							checkArray.push({
								...el2,
								name: el.users_permissions_user.name,
								phone: el.users_permissions_user.phone,
								tiems: el.times,
								updated_at: el.updated_at,
							})
						})
						if (index === res.reservations.length - 1) {
							this.houseDatas.forEach((el, index2) => {
								const datas = checkArray.filter(
									x =>
										x.PD_Type === el.PD_Type &&
										x.PD_Dong === el.PD_Dong &&
										x.PD_Floor === el.PD_Floor &&
										x.PD_Ho === el.PD_Ho &&
										x.tiems.split(',').filter(x => this.selectDatas.times.includes(x)).length > 0,
								)
								for (let index = 0; index < datas.length; index++) {
									duDatas.push(datas[index])
								}
								if (index2 === this.houseDatas.length - 1) {
									if (duDatas.length === 0) {
										const data = {
											houseDatas: this.houseDatas,
											users_permissions_user: this.$store.state.meData.id,
											business: this.$store.state.business.id,
											date: this.selectDatas.date,
											times: this.selectDatas.times.join(','),
										}
										this.$store.dispatch('createReservation', data).then(() => {
											alert('상담예약이 완료 되었습니다.')
											this.$store.state.loading = false
											this.reservations()
											this.selectDatas = {
												date: this.$moment().format('YYYY-MM-DD'),
												times: [],
											}
											this.houseDatas = []
											this.productsList = []
											this.datas = {
												data1: '',
												data1Items: [],
												data2: '',
												data2Items: [],
												data3: '',
												data3Items: [],
												data4: '',
												data4Items: [],
											}
											this.datas.data1Items = this.$store.state.business.product.map(x => x.PD_Type)
										})
									} else {
										let comment = `현재 상담예약된 물건이 존재합니다.`
										duDatas.forEach((el, duIndex) => {
											comment += `
	내역 ==================
	물건: 타입-${el.PD_Type}, 동-${el.PD_Dong}, 층-${el.PD_Floor}, 호수-${el.PD_Ho}
	이름: ${el.name}
	전화번호: ${el.phone}
	예약시간: ${el.tiems}`
											if (duIndex === duDatas.length - 1) {
												alert(comment)
											}
										})
									}
								}
							})
						}
					})
				} else {
					const data = {
						houseDatas: this.houseDatas,
						users_permissions_user: this.$store.state.meData.id,
						business: this.$store.state.business.id,
						date: this.selectDatas.date,
						times: this.selectDatas.times.join(','),
						name: this.reserveuser.name,
						phone: String(this.reserveuser.phone),
					}
					this.$store.dispatch('createReservation', data).then(() => {
						alert('상담예약이 완료 되었습니다.')
						this.$store.state.loading = false
						this.reservations()
						this.selectDatas = {
							date: this.$moment().format('YYYY-MM-DD'),
							times: [],
						}
						this.reserveuser.name = ''
						this.reserveuser.phone = ''
						this.houseDatas = []
						this.productsList = []
						this.datas = {
							data1: '',
							data1Items: [],
							data2: '',
							data2Items: [],
							data3: '',
							data3Items: [],
							data4: '',
							data4Items: [],
						}
						this.datas.data1Items = this.$store.state.business.product.map(x => x.PD_Type)
					})
				}
			})
		},
	},
}
</script>
<style lang="scss">
.reserve-datepicker {
	.v-date-picker-table--date .v-btn {
		border-radius: 0px !important;
	}
	.theme--light.v-btn.v-btn--disabled {
		color: white !important;
		background-color: #b2b2b2 !important;
	}
}
.chipStyle {
	color: white !important;
}
</style>
