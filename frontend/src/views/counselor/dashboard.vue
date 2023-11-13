<template>
	<!-- 로그인 화면 로고 -->
	<v-layout style="max-width:450px; margin: 0 auto;" wrap justify-center>
		<div class="work-header">
			<v-card class="ma-4 pa-4 header-card">
				<v-layout>
					<h3>사업지명 : {{ $store.state.businessName }}</h3>
				</v-layout>
				<v-layout align-center>
					<div class="point">
						{{ $store.state.meData.name }}
					</div>
					<div class="ml-2">
						<span class="point">[{{ rank.rankName }}]</span>
						<!-- 님, 오늘도 즐거운 하루 되세요. -->
					</div>
				</v-layout>
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
					<v-btn rounded small color="primary2" dark @click="holdingListOpen">전체보기</v-btn>
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
				<v-btn
					@click="
						() => {
							if (countDown === 0) refresh()
						}
					"
					small
					color="point4"
					dark
					rounded
					class="ml-2"
				>
					{{ countDown > 0 ? countDown : '새로고침' }}
				</v-btn>
				<v-spacer></v-spacer>
				<v-flex xs4 class="pl-2">
					<v-select :items="times" v-model="time" solo outlined class="nomal-select" hideDetails color="primary2" flat></v-select>
				</v-flex>
			</v-layout>
			<v-layout align-center wrap class="mt-4">
				<v-flex xs4 class="pr-2">
					<v-select
						placeholder="주택형"
						:items="products1"
						v-model="product1"
						solo
						dense
						outlined
						class="nomal-select"
						hideDetails
						@change="product1Change"
						flat
						color="primary2"
					></v-select>
				</v-flex>
				<v-flex xs4>
					<v-select
						placeholder="동"
						:items="products2"
						v-model="product2"
						solo
						:disabled="!product1"
						dense
						outlined
						class="nomal-select"
						hideDetails
						@change="product2Change"
						flat
						color="primary2"
					></v-select>
				</v-flex>
				<v-flex xs4 class="pl-2">
					<v-select
						placeholder="호수"
						:items="products3"
						v-model="product3"
						solo
						flat
						:disabled="!product2"
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-btn block :color="'primary2'" @click="holding" class="mt-4" rounded dark>
					홀딩 요청
				</v-btn>
				<v-flex xs12 v-for="(assignment, index) in assignmentHoldingDatas" :key="index">
					<v-btn block :color="'red'" @click="cancelHoldingAction(assignment.id)" class="mt-4" rounded dark>
						{{ holdingStatus(assignment) }}
					</v-btn>
				</v-flex>
				<strong>
					<div class="explain-text point4--text mt-2">
						상담 물건 홀딩은 최대 60분까지 가능합니다.
					</div>
				</strong>
			</v-layout>
		</v-card>
		<v-layout wrap justify-center>
			<v-flex xs6 :class="i % 2 !== 0 ? 'pl-2 pb-4' : 'pr-2 pb-4'" v-for="(icon, i) in iconList" :key="i">
				<v-card class="dashboard-icons pa-4" elevation="0" @click="$router.push({ name: icon.route })">
					<div class="icon">
						<v-icon large color="#633efd">{{ icon.icon }}</v-icon>
						<!-- <v-img class="mx-auto" :src="`${require(`@/assets/images/ico/${icon.icon}.png`)}`" width="35" height="35"></v-img> -->
					</div>
					<div class="text primary2--text">
						{{ icon.title }}
					</div>
				</v-card>
			</v-flex>
		</v-layout>
		<holdingDialog :setdialog="holdingDialog" @click="createAssignment" />
		<holdingListDialog :setdialog="holdingListDialog" />
		<sweetAlert :dialog="sweetInfo" />
		<sweetAlert :dialog="sweetInfo2" @click="cancelHolding" />
	</v-layout>
</template>

<script>
import QRcode from './QR/QRcode.vue'
import { holdingDialog, sweetAlert, holdingListDialog } from '@/components/index'
export default {
	components: {
		QRcode,
		holdingDialog,
		sweetAlert,
		holdingListDialog,
	},
	data() {
		return {
			countDown: 0,
			assignmentHoldingDatas: [],
			cancel_assignment_id: '',
			holdingListDialog: {
				open: false,
				datatable: {
					headers: [
						{ text: '주택형', value: 'product.housingType', sortable: false },
						{ text: '동', value: 'product.dong', sortable: false },
						{ text: '호', value: 'product.ho', sortable: false },
						{ text: '잔여시간', value: 'timePeriod', sortable: false },
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
			sweetInfo2: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'warning',
				cancelBtnText: '취소',
				saveBtnText: '확인',
				buttonType: 'twoBtn',
			},
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
					icon: 'mdi-bullhorn-variant-outline',
					title: '공지사항',
					route: 'counselorNotice',
				},
				{
					icon: 'mdi-subway-variant',
					title: '근태관리',
					route: 'counselorManage',
				},
				{
					icon: 'mdi-account-check',
					title: '계약관리',
					route: 'settlements',
				},
				{
					icon: 'mdi-calendar-clock-outline',
					title: '정산관리',
					route: 'settlementTruns',
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
			time: '',
			productDatas: [],
			assignmentDatas: [],
			waitingHoldingList: {},
			rejectHoldingList: {},
			rank: {},
			business: {},
			assignmentHoldingList: {},
		}
	},
	async created() {
		for (let index = 1; index < 2; index++) {
			const el = index * 30
			this.times.push(String(el) + '분')
		}
		await this.$store
			.dispatch('me')
			.then(async res => {
				this.$store.state.meData = res.me
			})
			.catch(err => {
				console.log(err)
				this.$store.state.loading = false
				// sessionStorage.removeItem('reserveLite-t')
				this.$router.push('/').catch(() => {})
			})
		await this.$store.dispatch('businesses', { idArr: [this.$store.state.meData.businessID] }).then(res => {
			console.log(res)
			if (res.businesses.length !== 0) {
				this.$store.state.businessName = res.businesses[0].name
			}
			this.$store.state.meData.businessID = res.businesses[0].id
		})
		await this.products()
	},
	methods: {
		businesses() {
			this.$store.dispatch('businesses', { idArr: [this.$store.state.meData.businessID] }).then(res => {
				this.business = res.businesses[0]
				if (this.business.splitHoldingTime && this.business.maximumHoldingTime) {
					this.times = []
					if (this.business.maximumHoldingTime === '60') {
						if (this.business.maximumHoldingTime === '60') this.times.push('60분')
						if (this.business.maximumHoldingTime === '30') {
							this.times.push('30분')
							this.times.push('60분')
						}
					} else if (this.business.maximumHoldingTime === '90') {
						this.times.push('30분')
						this.times.push('60분')
						this.times.push('90분')
					} else if (this.business.maximumHoldingTime === '120') {
						if (this.business.splitHoldingTime === '60') {
							this.times.push('60분')
							this.times.push('120분')
						}
						if (this.business.splitHoldingTime === '30') {
							this.times.push('30분')
							this.times.push('60분')
							this.times.push('90분')
							this.times.push('120분')
						}
					}
					this.time = this.times[0]
				}
				this.business.splitHoldingTime
			})
		},
		ranks() {
			this.$store
				.dispatch('ranks', { idArr: [this.$store.state.meData.rankID], useYn: true, businessID: this.$store.state.meData.businessID })
				.then(res => {
					this.rank = res.ranks[0]
				})
		},
		product1Change(val) {
			this.products2 = this.productDatas.filter(x => x.housingType === val).map(x => x.dong)
			this.product2 = ''
			this.product3 = ''
		},
		product2Change(val) {
			const datas = this.assignmentDatas.filter(x => x.product && (x.status === 'assignment' || x.status === 'waiting'))
			const alreadyDatas = []
			for (let index = 0; index < datas.length; index++) {
				const el = datas[index]
				alreadyDatas.push({
					housingType: el.product.housingType,
					dong: el.product.dong,
					ho: el.product.ho,
				})
			}
			this.products3 = this.productDatas
				.filter(x => x.dong === val && x.housingType === this.product1)
				.filter(
					x =>
						!alreadyDatas
							.filter(x => x.dong === val && x.housingType === this.product1)
							.map(x => x.ho)
							.includes(x.ho),
				)
				.map(x => x.ho)
			this.product3 = ''
		},
		secondChange(data) {
			return Number(data.split(':')[0]) * 3600 + Number(data.split(':')[1]) * 60
		},
		rangeChange(holdingData) {
			console.log(holdingData)
			let leaveHour = this.$moment(holdingData.endDate + ' ' + holdingData.end.substr(0, 5)).diff(this.$moment(), 'hour')
			let leaveMinute = this.$moment(holdingData.endDate + ' ' + holdingData.end.substr(0, 5)).diff(this.$moment(), 'minute') % 60
			return `${leaveHour}시간 ${leaveMinute}분`
		},
		holdingListOpen() {
			this.holdingListDialog.open = true
			this.$store
				.dispatch('assignments', {
					// created_at_gte: this.$moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
					// created_at_lte: this.$moment().format('YYYY-MM-DD') + 'T23:59:00.000Z',
					startDate_lte: this.$moment().format('YYYY-MM-DD'),
					endDate_gte: this.$moment().format('YYYY-MM-DD'),
					businessID: this.$store.state.meData.businessID,
					status: 'assignment',
					userID: this.$store.state.meData.name.id,
					sort: 'created_at:desc',
				})
				.then(res => {
					const filterDatas = res.assignments.filter(
						x => x.status === 'allday' || this.secondChange(this.$moment().format('HH:mm')) < this.secondChange(x.end),
					)
					for (let index = 0; index < filterDatas.length; index++) {
						const el = filterDatas[index]
						if (this.productDatas.filter(x => x.id === el.productID).length > 0)
							el.product = this.productDatas.filter(x => x.id === el.productID)[0]
					}
					this.holdingListDialog.datatable.items = filterDatas
				})
		},
		cancelHolding() {
			this.$store.state.loading = true
			this.$store
				.dispatch('updateAssignment', {
					// id: this.waitingHoldingList ? this.waitingHoldingList.id : this.assignmentHoldingList.id,
					id: this.cancel_assignment_id,
					status: 'counselorNoAssignment',
				})
				.then(() => {
					this.$store.state.loading = false
					this.sweetInfo2.open = false
					this.products()
				})
		},
		open_twobtn_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo2.title = data.title
			this.sweetInfo2.content = data.content
			if (!info) this.sweetInfo2.modalIcon = `warning`
			else this.sweetInfo2.modalIcon = info
			this.sweetInfo2.open = true
		},
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
		},
		async products() {
			await this.$store.dispatch('me').then(() => {
				this.$store
					.dispatch('products', {
						businessID: this.$store.state.meData.businessID,

						contractStatus: ['noContract', 'existing', 'toBeRented', 'vacancy'],
					})
					.then(async res => {
						this.productDatas = res.products
						this.products1 = res.products.map(x => x.housingType)
						await this.assignments()
						await this.ranks()
						await this.businesses()
					})
			})
		},
		refresh() {
			this.countDown = 5
			const countDown = setInterval(() => {
				this.countDown -= 1
				if (this.countDown === 0) {
					clearInterval(countDown)
				}
			}, 1000)
			this.assignments()
		},
		async assignments() {
			this.$store
				.dispatch('assignments', {
					// created_at_gte: this.$moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
					// created_at_lte: this.$moment().format('YYYY-MM-DD') + 'T23:59:00.000Z',
					startDate_lte: this.$moment().format('YYYY-MM-DD'),
					endDate_gte: this.$moment().format('YYYY-MM-DD'),

					businessID: this.$store.state.meData.businessID,
					userID: this.$store.state.meData.name.id,
					sort: 'created_at:desc',
				})
				.then(res => {
					console.log(res)
					this.assignmentDatas = res.assignments
					this.assignmentHoldingDatas = res.assignments.filter(x => x.status === 'assignment')
					this.holdingList = res.assignments.filter(
						x => x.status === 'assignment' && this.secondChange(this.$moment().format('HH:mm')) < this.secondChange(x.end),
					)
					let myData = res.assignments.filter(x => x.userID === this.$store.state.meData.id)
					for (let index = 0; index < this.assignmentDatas.length; index++) {
						const el = this.assignmentDatas[index]
						if (this.productDatas.filter(x => x.id === el.productID).length > 0)
							el.product = this.productDatas.filter(x => x.id === el.productID)[0]
					}
					for (let index = 0; index < this.holdingList.length; index++) {
						const el = this.holdingList[index]
						if (this.productDatas.filter(x => x.id === el.productID).length > 0)
							el.product = this.productDatas.filter(x => x.id === el.productID)[0]
					}
					if (
						myData.filter(x => x.status === 'assignment').length > 0 &&
						this.secondChange(myData.filter(x => x.status === 'assignment')[0].end) - this.secondChange(this.$moment().format('HH:mm')) > 0
					) {
						const holdingData = myData.filter(x => x.status === 'assignment')[0]
						const product = this.productDatas.filter(x => x.id === holdingData.productID)[0]
						if (holdingData.type === 'allday') this.holdingText = `홀딩중 [${product.housingType} ${product.dong} ${product.ho}] All Day`
						else if (holdingData.type === 'time' || holdingData.type === 'now')
							this.holdingText = `홀딩중 [${product.housingType} ${product.dong} ${product.ho}] 남은시간:${(this.secondChange(
								myData.filter(x => x.status === 'assignment')[0].end,
							) -
								this.secondChange(this.$moment().format('HH:mm'))) /
								60}분`
						else
							this.holdingText = `홀딩중 [${product.housingType} ${product.dong} ${product.ho}] 남은시간:${this.rangeChange(holdingData)}`
					} else if (myData.length > 0 ? myData[0].status === 'reject' : false) this.holdingText = '미승인 [다시 홀딩 요청하기]'
					else if (myData.filter(x => x.status === 'waiting').length === 0) this.holdingText = '홀딩 요청'
					else if (myData.filter(x => x.status === 'waiting').length > 0) {
						const holdingData = myData.filter(x => x.status === 'waiting')[0]
						const product = this.productDatas.filter(x => x.id === holdingData.productID)[0]
						this.holdingText = `홀딩 요청중 [${product.housingType} ${product.dong} ${product.ho}]`
					}
					this.assignmentHoldingList = myData.filter(x => x.status === 'assignment')[0]
					this.waitingHoldingList = myData.filter(x => x.status === 'waiting')[0]
					this.rejectHoldingList = myData.filter(x => x.status === 'reject')[0]
				})
		},
		holdingStatus(myData) {
			console.log(myData)
			console.log(myData.id)
			return `홀딩중 [${myData.product.housingType} ${myData.product.dong} ${myData.product.ho}] 남은시간:${(this.secondChange(myData.end) -
				this.secondChange(this.$moment().format('HH:mm'))) /
				60}분`

			// if (
			// 	myData.filter(x => x.status === 'assignment').length > 0 &&
			// 	this.secondChange(myData.filter(x => x.status === 'assignment')[0].end) - this.secondChange(this.$moment().format('HH:mm')) > 0
			// ) {
			// 	const holdingData = myData.filter(x => x.status === 'assignment')[0]
			// 	const product = this.productDatas.filter(x => x.id === holdingData.productID)[0]
			// 	if (holdingData.type === 'allday') this.holdingText = `홀딩중 [${product.housingType} ${product.dong} ${product.ho}] All Day`
			// 	else if (holdingData.type === 'time' || holdingData.type === 'now')
			// 		this.holdingText = `홀딩중 [${product.housingType} ${product.dong} ${product.ho}] 남은시간:${(this.secondChange(
			// 			myData.filter(x => x.status === 'assignment')[0].end,
			// 		) -
			// 			this.secondChange(this.$moment().format('HH:mm'))) /
			// 			60}분`
			// 	else this.holdingText = `홀딩중 [${product.housingType} ${product.dong} ${product.ho}] 남은시간:${this.rangeChange(holdingData)}`
			// } else if (myData.length > 0 ? myData[0].status === 'reject' : false) this.holdingText = '미승인 [다시 홀딩 요청하기]'
			// else if (myData.filter(x => x.status === 'waiting').length === 0) this.holdingText = '홀딩 요청'
			// else if (myData.filter(x => x.status === 'waiting').length > 0) {
			// 	const holdingData = myData.filter(x => x.status === 'waiting')[0]
			// 	const product = this.productDatas.filter(x => x.id === holdingData.productID)[0]
			// 	this.holdingText = `홀딩 요청중 [${product.housingType} ${product.dong} ${product.ho}]`
			// }
		},
		createAssignment() {
			if (this.productDatas.filter(x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3).length > 0) {
				this.$store
					.dispatch('assignments', {
						created_at_gte: this.$moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
						created_at_lte: this.$moment().format('YYYY-MM-DD') + 'T23:59:00.000Z',
						businessID: this.$store.state.meData.businessID,
						productArr: this.productDatas.filter(
							x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3,
						)[0].id,
						end_gte: this.$moment().format('HH:mm:ss:SSS'),
					})
					.then(ass => {
						const assDatas = ass.assignments.filter(x => x.status === 'waiting' || x.status === 'assignment')
						if (assDatas.length > 0) {
							this.holdingDialog.open = false
							this.open_disable_dialog({ title: '중복요청', content: '이미 요청된 홀딩건 입니다.' })
						} else {
							const data = {
								userID: this.$store.state.meData.id,
								type: 'now',
								start: this.$moment().format('HH:mm:ss:SSS'),
								end: this.$moment()
									.add(Number(this.time.replace('분', '')), 'm')
									.format('HH:mm:ss:SSS'),
								productID: this.productDatas.filter(
									x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3,
								)[0].id,
								orderType: 'couselor',
								holdingTime: this.time.replace('분', ''),
								businessID: this.$store.state.meData.businessID,
							}
							this.$store.state.loading = true
							this.$store.dispatch('createAssignment', data).then(() => {
								this.$store.state.loading = false
								this.holdingDialog.open = false
								this.products()
							})
						}
					})
			} else {
				this.holdingDialog.open = false
				this.open_disable_dialog({ title: '일시적 오류', content: '오류가 발생하였습니다. 새로고침 후 다시 신청해주세요.' }, 'error')
			}
		},
		holding() {
			if (this.holdingText.indexOf('홀딩 요청중') === -1) {
				if (this.secondChange(this.business.workingHoursStart) > this.secondChange(this.$moment().format('HH:mm')))
					return this.open_disable_dialog({
						title: '홀딩 시작전',
						content: `금일 홀딩요청은 [${this.business.workingHoursStart.substr(0, 5)}] 부터 입니다.`,
					})
				else if (this.secondChange(this.business.workingHoursEnd) < this.secondChange(this.$moment().format('HH:mm')))
					return this.open_disable_dialog({
						title: '홀딩종료',
						content: `금일 홀딩요청은 [${this.business.workingHoursEnd.substr(0, 5)}] 까지입니다.`,
					})
				else if (!this.product1) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '주택형을 선택해주세요.' })
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
			}
			// if (this.holdingText.indexOf('홀딩중') > -1)
			// 	this.open_twobtn_dialog(
			// 		{
			// 			title: '물건 홀딩 취소',

			// 			content: `홀딩중인 물건을 취소하시겠습니까?`,
			// 		},
			// 		'error',
			// 	)
			// else if (this.holdingText.indexOf('홀딩 요청중') === -1) {
			// 	if (this.secondChange(this.business.workingHoursStart) > this.secondChange(this.$moment().format('HH:mm')))
			// 		return this.open_disable_dialog({
			// 			title: '홀딩 시작전',
			// 			content: `금일 홀딩요청은 [${this.business.workingHoursStart.substr(0, 5)}] 부터 입니다.`,
			// 		})
			// 	else if (this.secondChange(this.business.workingHoursEnd) < this.secondChange(this.$moment().format('HH:mm')))
			// 		return this.open_disable_dialog({
			// 			title: '홀딩종료',
			// 			content: `금일 홀딩요청은 [${this.business.workingHoursEnd.substr(0, 5)}] 까지입니다.`,
			// 		})
			// 	else if (!this.product1) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '주택형을 선택해주세요.' })
			// 	else if (!this.product2) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '동을 선택해주세요.' })
			// 	else if (!this.product3) return this.open_disable_dialog({ title: '물건 홀딩 요청', content: '호수를 선택해주세요.' })
			// 	this.holdingDialog.open = true
			// 	this.holdingDialog.datatable.items = []
			// 	this.holdingDialog.datatable.items.push({
			// 		protect1: this.product1,
			// 		protect2: this.product2,
			// 		protect3: this.product3,
			// 		time: this.time,
			// 	})
			// } else
			// 	this.open_twobtn_dialog(
			// 		{
			// 			title: '물건 홀딩 취소',

			// 			content: `${this.holdingText.replace('홀딩 취소 ', '')} 물건을 취소하시겠습니까?`,
			// 		},
			// 		'error',
			// 	)
		},
		cancelHoldingAction(id) {
			this.cancel_assignment_id = id
			this.open_twobtn_dialog(
				{
					title: '물건 홀딩 취소',

					content: `홀딩중인 물건을 취소하시겠습니까?`,
				},
				'error',
			)
		},
		openQr() {
			this.dialogQr.open = true

			this.dialogQr.code = this.$store.state.meData.id + '/' + this.$moment().format('YYYY-MM-DD HH:mm:ss')
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
