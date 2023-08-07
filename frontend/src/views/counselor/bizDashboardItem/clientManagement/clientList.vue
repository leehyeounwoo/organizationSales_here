<template>
	<div>
		<div class="mx-2 mb-15">
			<v-layout class="mt-3 mb-2 mx-3">
				<v-text-field
					class="client_label"
					density="compact"
					variant="solo"
					label="이름/휴대폰번호로 검색하세요 "
					append-icon="mdi-magnify"
					color="#633efd"
					single-line
					hide-details
					v-model="datas.input"
					@click:append="change_select()"
				></v-text-field>
			</v-layout>
			<v-layout justify-center class="mt-3">
				<v-flex xs4 class="d-flex align-center date_picker_type" style="width:100px">
					<DatepickerDialog
						:picker="date.start"
						:allowed_dates="allowed_datesStart"
						@input="realRangeTimeCount('date_change')"
					></DatepickerDialog>
				</v-flex>
				<v-flex class="d-flex align-center justify-center mx-1">~</v-flex>
				<v-flex xs4 class="d-flex align-center date_picker_type" style="width:100px">
					<DatepickerDialog
						:picker="date.end"
						:allowed_dates="allowed_datesEnd"
						@input="realRangeTimeCount('date_change')"
					></DatepickerDialog>
				</v-flex>
				<v-flex xs3 class="ml-2">
					<v-select
						class="search_select_type"
						hideDetails
						v-model="date.value"
						:items="date.items"
						outlined
						color="#633efd"
						@change="changeDate"
					></v-select>
				</v-flex>
			</v-layout>
			<v-divider class="my-5"></v-divider>
			<v-layout class="mt-2 mb-2 mx-2">
				<div class="manage_table_result">
					검색결과 <span class="ml-2">{{ desserts.length }}</span> 건
				</div>

				<div class="ml-auto" style="width:100px">
					<v-select
						v-model="status_filter.value"
						hideDetails
						dense
						:items="status_filter.items"
						outlined
						color="primary2"
						class="search_select_type"
						@change="change_select()"
					></v-select>
				</div>
			</v-layout>
			<v-data-table
				:headers="headers"
				:items="desserts"
				mobile-breakpoint="100"
				class="elevation-0 dashboard-table table_font"
				:footer-props="{ itemsPerPageText: '' }"
			>
				<template v-slot:[`item.name`]="{ item }">
					<div style="text-decoration: underline; cursor:pointer;" @click="click_user_detail(item)">
						{{ item.name }}
					</div>
				</template>
				<template v-slot:[`item.created_at`]="{ item }">
					<div>
						{{ $moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
					</div>
				</template>
				<template v-slot:[`item.updated_at`]="{ item }">
					<div>
						{{ $moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
					</div>
				</template>
			</v-data-table>
			<v-layout justify-end class="py-3">
				<v-btn small outlined class="btn-style ml-3" style="background-color:white" color="green" @click="excelExport()">
					<img src="@/assets/images/excel-img2.png" />
					엑셀저장
				</v-btn>
			</v-layout>
			<download-excel
				class="btn btn-default"
				id="clientmangage_Excel"
				:data="desserts"
				style="display:none"
				:fields="json_fields"
				type="text/csv;charset=utf8"
				worksheet="My Worksheet"
				name="등록고객관리 리스트"
			/>
		</div>
		<clientUpdateDialog :setdialog="setdialog" />
	</div>
</template>
<script>
import { clientUpdateDialog } from '@/components'
import { DatepickerDialog } from '@/components'
export default {
	components: { DatepickerDialog, clientUpdateDialog },
	data() {
		return {
			setdialog: {
				dialog: false,
				data: {},
			},
			datas: {
				input: '',
				value1: '', // 이름
				value2: '', // 휴대전화
			},
			date: {
				value: '전체',
				items: ['전체', '1주일', '15일', '1개월', '3개월'],
				start: {
					date: this.$moment()
						.subtract(15, 'd')
						.format('YYYY-MM-DD'),
				},
				end: {
					date: this.$moment()
						.add(15, 'd')
						.format('YYYY-MM-DD'),
				},
				check: false,
			},
			status_filter: {
				value: '전체',
				items: ['전체', 'DB등록', '상담대기', '상담완료', '계약가망', '계약대기', '계약완료'],
			},
			json_fields: {
				이름: 'name',
				연락처: 'phone',
				등록일: 'created_at',
				수정일: 'updated_at',
			},
			headers: [
				{
					text: '이름',
					align: 'center',
					value: 'name',
					width: '20%',
				},
				{ text: '연락처', value: 'phone', align: 'center', width: '30%' },
				{ text: '등록일', value: 'created_at', align: 'center', width: '25%' },
				{ text: '수정일', value: 'updated_at', align: 'center', width: '25%' },
			],
			desserts: [],
		}
	},
	async created() {
		this.$store.state.loading = true
		await this.me()

		if (this.$route.query && this.$route.query.status === 'contractComplete') {
			// 첫 화면 에서 계약 완료 리스트 호출
			await this.cilent_compelte_all()
		} else {
			// 기존의 모든 리스트 호출
			await this.clients()
		}
		this.$store.state.loading = false
	},
	methods: {
		current_status2(value) {
			if (!value) return ''
			let data = ''
			if (value === 'DB등록') {
				data = 'db'
			} else if (value === '상담대기') {
				data = 'consultingWait'
			} else if (value === '상담완료') {
				data = 'consultingComplete'
			} else if (value === '계약가망') {
				data = 'contractWish'
			} else if (value === '계약대기') {
				data = 'contractWait'
			} else if (value === '계약완료') {
				data = 'contractComplete'
			}
			return data
		},
		async me() {
			await this.$store
				.dispatch('me')
				.then(() => {})
				.catch(() => {})
		},
		async clients() {
			let input = {
				users_permissions_user: this.$store.state.meData.id,
			}
			await this.$store.dispatch('clients', input).then(res => {
				this.desserts = res.clients
			})
		},
		click_user_detail(item) {
			this.setdialog.data = item
			this.setdialog.dialog = true
		},

		realRangeTimeCount(date_change) {
			if (this.date.start.date > this.date.end.date) {
				this.date.start.date = this.$moment(this.date.end.date)
					.subtract(1, 'day')
					.format('YYYY-MM-DD')
			}
			if (this.date.start.date && this.date.end.date) {
				this.change_select(date_change)
			}
		},

		async change_select(date_change) {
			let input = {
				users_permissions_user: this.$store.state.meData.id,
			}

			// 전체기간 조회
			if (this.date.value !== '전체') {
				input['created_at_gte'] = this.date.start.date
				input['created_at_lte'] = this.$moment(this.date.end.date)
					.add(1, 'day')
					.format('YYYY-MM-DD')
			}
			// 데이트피커 변경시 조회
			if (date_change) {
				input['created_at_gte'] = this.date.start.date
				input['created_at_lte'] = this.$moment(this.date.end.date).format('YYYY-MM-DD')
			}

			if (this.status_filter.value !== '전체') {
				input['contractStatus'] = this.current_status2(this.status_filter.value)
			}
			if (isNaN(this.datas.input)) {
				input['name'] = this.datas.input
			} else {
				input['phone'] = this.datas.input
			}
			this.$store.state.loading = true
			await this.$store.dispatch('clients', input).then(res => {
				this.desserts = res.clients
				this.$store.state.loading = false
			})
		},

		async cilent_compelte_all() {
			// 첫 화면 에서 계약 완료 리스트 호출

			let input = {
				users_permissions_user: this.$store.state.meData.id,
				contractStatus: 'contractComplete',
			}
			this.$store.state.loading = true
			await this.$store.dispatch('clients', input).then(res => {
				this.desserts = res.clients

				this.status_filter.value = '계약완료'
				this.$store.state.loading = false
			})
		},

		excelExport() {
			document.getElementById('clientmangage_Excel').click()
		},
		changeDate() {
			if (this.date.value === '1주일') {
				this.date.start.date = this.$moment()
					.subtract(7, 'days')
					.format('YYYY-MM-DD')
				this.date.end.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.date.value === '15일') {
				this.date.start.date = this.$moment()
					.subtract(15, 'days')
					.format('YYYY-MM-DD')
				this.date.end.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.date.value === '1개월') {
				this.date.start.date = this.$moment()
					.subtract(1, 'month')
					.format('YYYY-MM-DD')
				this.date.end.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.date.value === '3개월') {
				this.date.start.date = this.$moment()
					.subtract(3, 'month')
					.format('YYYY-MM-DD')
				this.date.end.date = this.$moment().format('YYYY-MM-DD')
			} else if (this.date.value === '전체') {
				this.date.start.date = ''
				this.date.end.date = ''
			}

			if (this.date.value !== '전체') {
				this.change_select(true)
			} else {
				this.change_select()
			}
		},
		allowed_datesEnd(val) {
			if (this.date.start.date === '') {
				return val
			} else {
				if (this.$moment().format('YYYY-MM-DD') >= val && val > this.$moment(this.date.start.date).format('YYYY-MM-DD')) {
					return true
				} else {
					return false
				}
			}
		},
		allowed_datesStart(val) {
			if (this.date.end.date === '') {
				if (val > this.$moment().format('YYYY-MM-DD')) {
					return true
				} else {
					return false
				}
			} else {
				if (this.$moment(this.date.end.date).format('YYYY-MM-DD') > val) {
					return true
				} else {
					return false
				}
			}
		},
	},
}
</script>
<style lang="scss">
.client-card {
	padding: 16px;
	width: 100%;
	background-color: #ffffff;
	border-radius: 22px !important;
}
.client-icon {
	font-size: 60px !important;
	transform: scaleX(-1);
}
.client-title {
	font-size: 16px;
	color: #333333;
}
.date_picker_type {
	div {
		div {
			.v-input__slot {
				padding: 0px 3px 0px 5px !important;
				min-height: 25px !important;
				height: 25px !important;
				background-color: #ffffff !important;
				.v-input__append-inner {
					margin-top: 0px !important;
					div {
						.v-icon {
							font-size: 20px;
							margin-top: 3px;
							color: #633efd;
						}
					}
				}
			}
		}
	}
}
.search_select_type {
	div {
		.v-input__slot {
			height: 25px !important;
			max-height: 25px !important;
			min-height: 25px !important;
			padding: 0px 8px !important;
			background-color: #ffffff !important;
			div {
				.v-select__selection {
					font-size: 0.75rem;
				}
				.v-input__append-inner {
					margin-top: 1px !important;
				}
			}
		}
	}
}
.client_label {
	div {
		div {
			div {
				.v-label {
					font-size: 0.75rem;
				}
			}
		}
	}
}
.table_font {
	div {
		table {
			thead {
				tr {
					th {
						font-size: 0.9rem !important;
						padding: 0px 10px !important;
					}
				}
			}
			tbody {
				tr {
					td {
						font-size: 0.75rem !important;
						padding: 0px !important;
					}
				}
			}
		}
	}
}
</style>
