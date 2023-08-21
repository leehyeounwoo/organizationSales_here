<template>
	<!-- 로그인 화면 로고 -->
	<v-layout style="max-width:450px; margin: 0 auto;" wrap justify-center>
		<div class="work-header">
			<v-card class="ma-4 pa-4 header-card">
				<v-layout align-center>
					<div class="title">
						{{ $store.state.meData.name }}
					</div>
					<div class="ml-2"><span class="point">상담사</span>님, 오늘도 즐거운 하루 되세요.</div>
				</v-layout>
				<div>
					팀 추가시 추가 필요 / 1팀 (예시)
				</div>
				<v-btn block color="point4" dark elevation="0" class="mt-2" @click="openQr">
					<v-icon class="mr-1">
						mdi-qrcode-scan
					</v-icon>
					출퇴근 QR 코드 열기
				</v-btn>
			</v-card>
		</div>
		<QRcode :dialogQr="dialogQr" />
		<v-card class="dashboard-card my-4" elevation="3">
			<v-layout align-center>
				<div class="main-text">
					홀딩 물건 현황
				</div>
				<v-spacer></v-spacer>
				<div>
					<v-btn rounded small color="primary2" dark>전체보기</v-btn>
				</div>
			</v-layout>
			<v-layout align-center wrap>
				<v-flex v-for="(list, i) in holdingList" :key="i" class="holding-text" xs4>
					<div v-if="list.product">{{ list.product.housingType }} {{ list.product.dong }} {{ list.product.ho }}</div>
				</v-flex>
			</v-layout>
		</v-card>
		<v-card class="dashboard-card mt-1 mb-4" elevation="3">
			<v-layout align-center>
				<div class="main-text">
					물건 홀딩 요청
				</div>
				<v-spacer></v-spacer>
				<v-flex xs4 class="pl-2">
					<v-select :items="times" v-model="time" solo outlined class="nomal-select" hideDetails color="primary2"></v-select>
				</v-flex>
			</v-layout>
			<v-layout align-center wrap class="mt-4">
				<v-flex xs4 class="pr-2">
					<v-select
						placeholder="주택형"
						:items="products1"
						v-model="product1"
						solo
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-flex xs4>
					<v-select
						placeholder="동"
						:items="products2"
						v-model="product2"
						solo
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-flex xs4 class="pl-2">
					<v-select
						placeholder="호수"
						:items="products3"
						v-model="product3"
						solo
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-btn block color="primary2" @click="holding" class="mt-4" rounded dark>
					{{ holdingText }}
				</v-btn>
				<div class="explain-text point4--text mt-2">
					상담 물건 홀딩은 최대 60분까지 가능합니다.
				</div>
			</v-layout>
		</v-card>
		<v-layout wrap justify-center>
			<v-flex xs6 :class="i % 2 !== 0 ? 'pl-2 pb-4' : 'pr-2 pb-4'" v-for="(icon, i) in iconList" :key="i">
				<v-card class="dashboard-icons pa-4" elevation="0" @click="$router.push({ name: icon.route })">
					<div class="icon">
						<v-img class="mx-auto" :src="`${require(`@/assets/images/ico/${icon.icon}.png`)}`" width="35" height="35"></v-img>
					</div>
					<div class="text primary2--text">
						{{ icon.title }}
					</div>
				</v-card>
			</v-flex>
		</v-layout>
		<holdingDialog :setdialog="holdingDialog" @click="createAssignment" />
		<sweetAlert :dialog="sweetInfo" />
	</v-layout>
</template>

<script>
import QRcode from './QR/QRcode.vue'
import { holdingDialog, sweetAlert } from '@/components/index'
export default {
	components: {
		QRcode,
		holdingDialog,
		sweetAlert,
	},
	data() {
		return {
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			holdingDialog: {
				open: false,
				datatable: {
					headers: [
						{ text: '주택형', value: 'protect1', sortable: false },
						{ text: '동', value: 'protect2', sortable: false },
						{ text: '호', value: 'protect3', sortable: false },
						{ text: '홀딩시간', value: 'time', sortable: false },
					],
					class: 'mt-0',
					items: [],
					noweditting: '',
					hidedefaultfooter: true,
					itemsPerPage: 99,
					page: 1,
					pageCount: 0,
				},
			},
			iconList: [
				{
					icon: 'footer_공지사항',
					title: '공지사항',
					route: 'counselorNotice',
				},
				{
					icon: 'footer_출퇴근관리',
					title: '근태관리',
					route: 'counselorManage',
				},
				{
					icon: 'footer_고객관리',
					title: '계약관리',
					route: 'counselorNotice',
				},
				{
					icon: 'footer_상담관리',
					title: '정산관리',
					route: 'counselorNotice',
				},
			],
			holdingText: '',
			products1: [],
			products2: [],
			products3: [],
			product1: '',
			product2: '',
			product3: '',
			holdingList: [],
			dialogQr: { open: false, code: '!', business: { title: '' }, meData: { created_at: this.$moment(), name: '' } },
			times: [],
			time: '30분',
			productDatas: [],
			assignmentDatas: [],
			waitingHoldingList: {},
			rejectHoldingList: {},
		}
	},
	created() {
		for (let index = 1; index < 7; index++) {
			const el = index * 10
			this.times.push(String(el) + '분')
		}
		this.products()
	},
	methods: {
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
		},
		products() {
			this.$store.dispatch('products', { businessID: this.$store.state.meData.businessID }).then(res => {
				this.productDatas = res.products
				this.products1 = res.products.map(x => x.housingType)
				this.products2 = res.products.map(x => x.dong)
				this.products3 = res.products.map(x => x.ho)
				this.assignments()
			})
		},
		assignments() {
			this.$store
				.dispatch('assignments', {
					created_gte: this.$moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
					created_lte: this.$moment().format('YYYY-MM-DD') + 'T23:59:00.000Z',
					businessID: this.$store.state.meData.businessID,
					userID: this.$store.state.meData.id,
				})
				.then(res => {
					this.holdingList = res.assignments.filter(x => x.status === 'assignment')
					for (let index = 0; index < this.holdingList.length; index++) {
						const el = this.holdingList[index]
						if (this.productDatas.filter(x => x.id === el.productID).length > 0)
							el.product = this.productDatas.filter(x => x.id === el.productID)[0]
					}
					this.assignmentDatas = res.assignments
					if (res.assignments.filter(x => x.status === null).length === 0) this.holdingText = '홀딩 요청'
					else if (res.assignments.filter(x => x.status === 'reject').length > 0) this.holdingText = '미승인'
					else this.holdingText = `홀딩 취소`
					this.waitingHoldingList = res.assignments.filter(x => x.status === null)[0]
					this.rejectHoldingList = res.assignments.filter(x => x.status === 'reject')[0]
					console.log(res.assignments)
				})
		},
		createAssignment() {
			if (this.productDatas.filter(x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3).length > 0) {
				const data = {
					userID: this.$store.state.meData.id,
					status: null,
					type: 'time',
					start: this.$moment().format('HH:mm:ss:SSS'),
					end: this.$moment()
						.add(Number(this.time.replace('분', '')), 'm')
						.format('HH:mm:ss:SSS'),
					productID: this.productDatas.filter(x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3)[0]
						.id,
					orderType: 'couselor',
					holdingTime: this.time,
					businessID: this.$store.state.meData.businessID,
				}
				this.$store.dispatch('createAssignment', data).then(() => {
					this.holdingDialog.open = false
					this.assignments()
				})
			} else {
				alert('오류가 발생하였습니다. 다시 신청해주세요.')
			}
		},
		holding() {
			if (!this.product1) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '주택형을 선택해주세요.' })
			else if (!this.product2) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '동을 선택해주세요.' })
			else if (!this.product3) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '호수를 선택해주세요.' })
			this.holdingDialog.open = true
			this.holdingDialog.datatable.items = []
			this.holdingDialog.datatable.items.push({
				protect1: this.product1,
				protect2: this.product2,
				protect3: this.product3,
				time: this.time,
			})
		},
		openQr() {
			this.dialogQr.open = true

			this.dialogQr.code = this.$store.state.meData.id
			this.dialogQr.meData = this.$store.state.meData
		},
	},
}
</script>
<style lang="scss">
.dashboard-icons {
	cursor: pointer;
	border-radius: 10px !important;
	text-align: center;
	width: 100%;
	.text {
		margin-top: 8px;
		font-weight: bold;
		font-size: 20px;
	}
}
.explain-text {
	font-size: 12px;
}
.nomal-select {
	.v-input__control {
		min-height: 30px !important;
		height: 30px !important;
	}
	.v-input__slot {
		min-height: 30px !important;
		height: 30px !important;
	}
}
.holding-text {
	font-size: 14px;
	color: #878787;
}
.dashboard-card {
	margin: 0 auto;
	.main-text {
		font-size: 14px;
		font-weight: bold;
	}
	width: 100%;
	background-color: white !important;
}
.work-header {
	width: 100%;
	background-color: #633efd;
	.header-card {
		width: auto;
	}
}
</style>
