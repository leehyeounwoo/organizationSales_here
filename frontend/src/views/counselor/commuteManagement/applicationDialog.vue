<template>
	<v-dialog v-model="dialog.open" persistent content-class="qr-modal" max-width="400">
		<v-layout class="qr-header" :style="`background-color:${$store.state.primary2}`" align-center>
			<div class="main-title">
				연차신청
			</div>
			<v-btn icon @click="dialog.open = false" dark class="pr-8">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<div class="qr-layout px-6" wrap>
			<!-- <div class="qr_name mt-12">{{ dialog.meData.name }} 상담사</div>
			<div class="qr_date mt-1">등 록 일 자 {{ dialog.meData.created_at | moment('YYYY. MM. DD') }}</div> -->

			<div class="qr_info mt-6" style="font-weight:700;">연차사유를 선택해주세요.</div>
			<div class="qr_info mb-8" style="font-size:0.5rem;">관리자 승인 후 처리가 완료됩니다.</div>
			<v-card v-for="(data, index) in checkData" :key="index" class="pa-6 mb-6" style="line-height: 1.5;">
				<v-radio-group style="font-size:0.75rem;" v-model="data.dialogType" row column @change="test(data)">
					<v-layout style="color:#633efd; font-weight:bold;"> {{ dayCheck(data.date) }}</v-layout>
					<v-layout>
						<v-flex xs4 style="text-align: left; font-weight:500;">반차사용</v-flex>
						<v-flex class="radioStyle">
							<div>
								<v-radio class="vacationDialog" label="오전반차" value="morningVacation"></v-radio>
							</div>
						</v-flex>
						<v-flex class="radioStyle">
							<div>
								<v-radio label="오후반차" value="afternoonVacation"></v-radio>
							</div>
						</v-flex>
					</v-layout>
					<v-layout style="width:100%;">
						<v-flex xs4 style="text-align: left; font-weight:500;">연차사용</v-flex>
						<v-flex class="radioStyle">
							<div>
								<v-radio label="연차" value="vacation"></v-radio>
							</div>
						</v-flex>
					</v-layout>
					<v-layout style="width:100%;">
						<v-flex xs4 style="text-align: left; font-weight:500;">병가사용</v-flex>
						<v-flex class="radioStyle">
							<div>
								<v-radio label="병가" value="sick"></v-radio>
							</div>
						</v-flex>
					</v-layout>
					<v-layout mb-1>
						<v-flex xs4 style="text-align: left; font-weight:500;">기타사유</v-flex>
						<v-flex class="radioStyle">
							<div>
								<v-radio label="기타" value="etc"></v-radio>
							</div>
						</v-flex>
					</v-layout>
					<v-layout>
						<v-textarea height="50" v-model="data.comment" :disabled="data.textAreaStatus" hide-details filled no-resize></v-textarea>
					</v-layout>
				</v-radio-group>
			</v-card>
			<v-btn
				class="mb-10 mr-1"
				style="font-weight:bold;"
				color="primary2"
				dark
				depressed
				rounded
				width="120"
				height="40"
				@click="dataCheck()"
			>
				확인
			</v-btn>
			<v-btn
				class="mb-10"
				style="font-weight:bold;"
				color="primary2"
				dark
				depressed
				rounded
				width="120"
				height="40"
				@click="dialog.open = false"
			>
				취소
			</v-btn>
		</div>
	</v-dialog>
</template>
<script>
export default {
	methods: {
		test(val) {
			val.comment = ''
			if (val.dialogType === 'etc') {
				val.textAreaStatus = false
			} else {
				val.textAreaStatus = true
			}
		},
		dataCheck() {
			this.actionSave()
		},
		async actionSave() {
			for (let index = 0; index < this.checkData.length; index++) {
				const element = this.checkData[index]
				if (element.dialogType === 'etc') {
					if (element.comment !== '') {
						const data = {
							vacationDate: this.$moment(element.date).format('YYYY-MM-DD'),
							type: element.dialogType,
							status: 'waiting',
							viewStatus: true,
							users_permissions_user: this.$store.state.meData.id,
							comment: element.comment,
						}
						await this.createVacationAction(data, index)
					} else {
						alert('사유를 입력해주세요.')
					}
				} else {
					const data = {
						vacationDate: this.$moment(element.date).format('YYYY-MM-DD'),
						type: element.dialogType,
						status: 'waiting',
						viewStatus: true,
						users_permissions_user: this.$store.state.meData.id,
					}
					await this.createVacationAction(data, index)
				}
			}
		},
		async createVacationAction(data, index) {
			await this.$store
				.dispatch('createVacation', data)
				.then(() => {
					if (index === this.checkData.length - 1) {
						this.dialog.open = false
					}
				})
				.catch(err => {
					console.log({ err })
				})
		},
		dayOfTheWeek(val) {
			if (val === '0') {
				return '(일)'
			} else if (val === '1') {
				return '(월)'
			} else if (val === '2') {
				return '(화)'
			} else if (val === '3') {
				return '(수)'
			} else if (val === '4') {
				return '(목)'
			} else if (val === '5') {
				return '(금)'
			} else if (val === '6') {
				return '(토)'
			}
		},
		dayCheck(val) {
			return this.$moment(val).format('gg.MM.DD') + ' ' + this.dayOfTheWeek(this.$moment(val).format('e'))
		},
	},
	data() {
		return {
			holydayType: 'morningVacation',
		}
	},
	props: {
		dialog: Object,
		checkData: {
			type: Array,
			default: () => {
				return []
			},
		},
	},
	created() {},
	components: {},
}
</script>
<style lang="scss">
.qr-code {
	width: 100%;
}
.qr-text {
	font-size: 14px;
	color: #828282;
}
.qr-modal {
	background-color: white;
	border-radius: 0 0px 41px 0px !important;
	padding: 0px;
}
.qr-header {
	height: 50px;
	.main-title {
		padding-left: 30px;
		color: white;
		font-size: 14px;
		font-weight: bold;
		margin-right: auto;
	}
}

.flex.radioStyle > div > div {
	margin-right: 0px !important;
}

.flex.radioStyle > div > div > label {
	font-size: 0.75rem;
}
</style>
