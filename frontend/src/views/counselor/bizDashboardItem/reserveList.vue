<template>
	<div class="reserve-card ma-4">
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
				dense
				clearable
				v-model="search"
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
			:search="search"
			:headers="headers"
			:items="desserts"
			class="elevation-0 dashboard-table"
			:footer-props="{ itemsPerPageText: '' }"
			@click:row="openReserve"
		>
			<template v-slot:[`item.created_at`]="{ item }">
				<div>
					{{ $moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
				</div>
			</template>
		</v-data-table>
		<v-layout justify-end>
			<v-btn color="point3" dark @click="excelExport">
				엑셀저장
			</v-btn>
		</v-layout>
		<reserveListDialog :dialog="reserveDialog" />
		<download-excel
			class="btn btn-default"
			id="reserveListExcel"
			:data="desserts"
			style="display:none"
			:fields="json_fields"
			type="csv; charset=utf-8;"
			worksheet="My Worksheet"
			:name="startPicker.date + '~' + endPicker.date + '_' + $store.state.business.title + '_등록고객현황'"
		>
		</download-excel>
	</div>
</template>
<script>
import { DatepickerDialog } from '@/components'
import reserveListDialog from './reserveListDialog'
export default {
	components: {
		reserveListDialog,
		DatepickerDialog,
	},
	data() {
		return {
			json_fields: {
				고객이름: 'name',
				휴대전화번호: 'phoneExcel',
				생년월일: 'birthday',
				성별: 'sex',
				등록상담사: 'users_permissions_user.name',
				희망평형: 'customDatas.PD_Type',
				동: 'customDatas.PD_Dong',
				층: 'customDatas.PD_Floor',
				호수: 'customDatas.PD_Ho',
				고객성향: 'like',
				계약여부: 'contractStatus',
				등록일: 'created',
				수정일: 'updated',
			},
			reserveDialog: {
				open: false,
				comment: '',
				like: '',
				value1: '', // 이름
				value2: '', // 휴대전화
				value3: '', // 생년월일
				data1: '',
				data1Items: [],
				data2: '',
				data2Items: [],
				data3: '',
				data3Items: [],
				data4: '',
				data4Items: [],
				data5: '',
				data5Items: [],
				contract: '',
				contractItmes: [],
				file: {},
				fileName: '',
				contractCounts: [],
				contractCount: '',
			},
			headers: [
				{
					text: '이름',
					align: 'center',
					value: 'name',
				},
				{ text: '휴대전화번호', value: 'phone', align: 'center' },
				{ text: '등록일', value: 'created_at', align: 'center', width: '30%' },
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
		}
	},
	created() {
		this.clients()
	},
	methods: {
		clients() {
			const data = {
				business: this.$route.params.id,
				updated_at_gte: this.startPicker.date + 'T00:00:00.000Z',
				updated_at_lte: this.endPicker.date + 'T23:59:59.000Z',
			}
			this.$store
				.dispatch('clients', data)
				.then(res => {
					this.desserts = res.clients
					this.desserts.forEach(el => {
						el.phoneExcel = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el.created = this.$moment(el.created_at).format('YYYY-MM-DD HH:mm')
						el.updated = this.$moment(el.updated_at).format('YYYY-MM-DD HH:mm')
					})
				})
				.catch(err => {
					console.log({ err })
				})
		},
		openReserve(val) {
			this.$store.state.loading = true
			this.$store.dispatch('business', { id: this.$route.params.id }).then(res3 => {
				const data = {
					id: val.id,
				}
				this.$store
					.dispatch('client', data)
					.then(res => {
						this.$store.state.business = res3.business
						this.reserveDialog.open = true
						this.reserveDialog.id = val.id
						const val2 = res.client
						this.reserveDialog.data1Items = this.$store.state.business.product.map(x => x.PD_Type)
						this.reserveDialog.data2Items = this.$store.state.business.product
							.filter(x => x.PD_Type === val2.customDatas?.PD_Type)
							.map(x => x.PD_Dong)
						const filterData = this.$store.state.business.product.filter(
							x => x.PD_Type === val2.customDatas?.PD_Type && x.PD_Dong === val2.customDatas?.PD_Dong,
						)
						this.reserveDialog.data3Items = filterData.map(x => x.PD_Floor)
						const filterData2 = this.$store.state.business.product.filter(
							x =>
								x.PD_Type === val2.customDatas?.PD_Type &&
								x.PD_Dong === val2.customDatas?.PD_Dong &&
								x.PD_Floor === val2.customDatas?.PD_Floor,
						)
						const data2 = {
							business: this.$store.state.business.id,
							contractStatus: '계약완료',
						}
						this.$store.dispatch('clients', data2).then(res2 => {
							const myClients = res2.clients.filter(x => x.users_permissions_user.id !== this.$store.state.meData.id)
							this.reserveDialog.data4Items = filterData2
								.map(x => x.PD_Ho)
								.filter(
									x =>
										!myClients
											.map(x => x.customDatas)
											.filter(
												x =>
													x.PD_Type === val2.customDatas?.PD_Type &&
													x.PD_Dong === val2.customDatas?.PD_Dong &&
													x.PD_Floor === val2.customDatas?.PD_Floor,
											)
											.map(x => x.PD_Ho)
											.includes(x),
								)

							this.$store.state.loading = false
							this.reserveDialog.value1 = val2.name
							this.reserveDialog.value2 = val2.phone
							this.reserveDialog.value3 = val2.birthday
							this.reserveDialog.value4 = val2.sex
							this.reserveDialog.comment = val2.comment
							this.reserveDialog.like = val2.like
							this.reserveDialog.contract = val2.contractStatus
							this.reserveDialog.data1 = val2.customDatas?.PD_Type
							this.reserveDialog.data2 = val2.customDatas?.PD_Dong
							this.reserveDialog.data3 = val2.customDatas?.PD_Floor
							this.reserveDialog.data4 = val2.customDatas?.PD_Ho
							if (val2.pricePaper) {
								this.reserveDialog.fileName = val2.pricePaper.name
							} else {
								this.reserveDialog.fileName = ''
							}
						})
					})
					.catch(err => {
						console.log({ err })
					})
			})
		},
		excelExport() {
			document.getElementById('reserveListExcel').click()
		},
		allowed_datesEnd(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment().format('YYYY-MM-DD') >= val
			}
			return val
		},
		realRangeTimeCount() {
			this.clients()
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
	},
}
</script>
