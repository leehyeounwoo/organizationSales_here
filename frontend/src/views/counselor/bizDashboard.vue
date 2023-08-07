<template>
	<v-container class="login-counselor counselor_gray_background mx-auto" style="max-width:100vw; width:100vw !important">
		<!-- 로그인 화면 로고 -->
		<v-layout style=" margin: 0 auto;" wrap justify-center>
			<!-- 메인 헤더 -->

			<!-- 헤더 - 상담사 정보  / 활동 현황 -->
			<div class="dash_counselor">
				<!-- 상담사 정보 / qr -->
				<v-layout wrap class="dash_counselor_info">
					<v-flex xs7>
						<div>
							<span class="dash_name">
								{{ $store.state.meData.name }}
							</span>

							<span class="dash_team" v-if="$store.state.meData.team && $store.state.meData.rank">
								{{ `${$store.state.meData.team.title} ${$store.state.meData.rank.title}` }}
							</span>

							<span class="dash_nim"> 님,</span>
						</div>
						<div class="dash_greeting">오늘도 즐거운 하루되세요!</div>
					</v-flex>
					<v-flex xs5 class="display_flex counselor_qr">
						<div class="qr_wrap ml-auto">
							출·퇴근 QR
							<v-img
								@click="openQr()"
								class="ml-2"
								src="@/assets/images/ico/ico_scanner.png"
								style="cursor:pointer; display:inline-block"
								max-width="35"
								width="35"
							></v-img>
						</div>
					</v-flex>
				</v-layout>

				<!-- 활동 현황 -->
				<v-layout wrap class="dash_counselor_performance">
					<v-flex xs12 class="performance_title">
						<span>
							활동현황
						</span>
					</v-flex>
					<v-flex xs12 class="display_flex">
						<!-- 예약고객 -->
						<div class="performance_detail">
							<div class="detail_num" @click="go_to_manage('예약고객')">
								{{ view > 0 ? $store.state.countShow[view - 1].count1 : $store.state.countShow[0].count1 }}
							</div>
							<div class="detail_name">
								{{ view === 4 ? '새글' : '예약고객' }}
							</div>
						</div>

						<!-- 등록고객 -->
						<div class="performance_detail">
							<div class="detail_num" @click="go_to_manage('등록고객')">
								{{ view > 0 ? $store.state.countShow[view - 1].count2 : $store.state.countShow[0].count2 }}
							</div>
							<div class="detail_name">
								{{ view === 4 ? '안읽은 글' : '등록고객' }}
							</div>
						</div>

						<!-- 계약고객 -->
						<div class="performance_detail">
							<div class="detail_num" @click="go_to_manage('계약고객')">
								{{ view > 0 ? $store.state.countShow[view - 1].count3 : $store.state.countShow[0].count3 }}
							</div>
							<div class="detail_name">
								{{ view === 4 ? '전체글' : '계약고객' }}
							</div>
						</div>
					</v-flex>
				</v-layout>
			</div>

			<!-- 대시보드 컨텐츠 -->
			<v-layout wrap class="dash_contents px-5">
				<!-- 사업지 정보 -->
				<v-flex xs12 class="display_flex my-5">
					<div class="dash_business" v-if="$store.state.meData.business">
						{{ $store.state.meData.business.title }}
					</div>
					<div>
						<v-btn color="primary2" rounded class="dash_business_btn" @click="openInfo" block dark depressed height="30">
							사업지 정보 보기
						</v-btn>
					</div>
				</v-flex>
				<!-- 화면 이동 버튼들 v-for -- 시작 -->

				<v-flex
					xs12
					v-for="(button, index) in buttons"
					:key="button.title + index"
					class="display_flex dash_button"
					:class="index > 0 ? '' : 'dash_small_padding'"
					@click="index > 0 ? goTo(button) : ''"
				>
					<!-- 화면 이동 버튼 -->
					<div v-if="index > 0" class="display_flex" style="width:100%; align-items: center;">
						<v-img
							class="ml-2"
							:src="`${require(`@/assets/images/ico/${button.ico}.png`)}`"
							max-width="15"
							width="15"
							height="15"
							contain
						></v-img>

						<div class="dash_button_title ml-3">
							{{ button.title }}
						</div>

						<v-btn class="ml-auto" color="primary2" dark depressed icon height="15">
							<v-icon>mdi-chevron-right</v-icon>
						</v-btn>
					</div>

					<!-- 나의 영업 페이스 -->
					<div v-else style="width:100%;">
						<!-- 항상 보이는 영역  -->
						<div class="display_flex" style="width:100%; align-items: center;">
							<div>
								<!-- 영업페이스 상태 -->
								<div class="dash_button_pace">
									<span class="pace_title">
										나의 영업페이스
									</span>
									<span class="ml-3 status" :class="`${button.status}_0 ${!expand ? 'show_transition' : 'hide_transition'}`">{{
										button.status === 'theFastest' ? 'the Fastest' : button.status
									}}</span>
								</div>
								<!-- 영업페이스 목표-->
								<div class="dash_button_pace">
									<span class="goal_text">
										목표
										<span class="goal_num">{{ button.goal }}</span>
										건
									</span>
									<span class="goal_duration">{{ button.duartion }}</span>
								</div>
							</div>

							<v-btn class="ml-auto " color="primary2" :ripple="false" dark depressed icon x-small @click="expand = !expand">
								<v-icon v-if="expand">mdi-arrow-up-drop-circle-outline</v-icon>
								<v-icon v-else>mdi-arrow-down-drop-circle-outline</v-icon>
							</v-btn>
						</div>

						<!-- 접히는 영역 -->
						<v-expand-transition>
							<div
								v-show="expand"
								:class="button.status ? 'show_transition' : 'hide_transition'"
								class="display_flex"
								style="position:relative"
							>
								<!-- 상태 텍스트 -->
								<div class="dash_button_pace expand pt-6">
									<!-- 영업페이스 상태 - 텍스트 -->
									<div class="dash_button_expand">
										<span class="status" :class="button.status + '_0'">{{
											button.status === 'theFastest' ? 'the Fastest' : button.status
										}}</span>
									</div>

									<!-- 영업페이스 상태 - 숫자 -->
									<div class="dash_button_expand">
										<span class="status big_num" :class="button.status + '_0'">{{ button.bigNum }}</span>
										<span v-if="Number(button.smallNum) > 0" class="status small_num" :class="button.status + '_0'">
											.{{ button.smallNum }}
										</span>
										<span class="km">km</span>
									</div>
								</div>
								<!-- 이미지 -->
								<div class="status_img">
									<v-img
										v-if="button.status"
										class="ml-2"
										:src="`${require(`@/assets/images/ico/${button.status}_0.png`)}`"
										height="100px"
										contain
										max-width="180"
									></v-img>
								</div>
							</div>
						</v-expand-transition>
					</div>
				</v-flex>

				<!-- 화면 이동 버튼들 v-for -- 종료  -->
			</v-layout>
		</v-layout>

		<InfoDialog :dialogInfo="dialogInfo" />
		<QRcode :dialogQr="dialogQr" />
		<!-- <counselorFooter /> -->
	</v-container>
</template>

<script>
// import { counselorFooter } from '@/components'
import QRcode from './QR/QRcode.vue'
import InfoDialog from './bizInfoDialog/infoDialog.vue'
// import notice from './bizDashboardItem/notice.vue'
// import reserve from './bizDashboardItem/reserve'
// import client from './bizDashboardItem/client.vue'
// import reserveList from './bizDashboardItem/reserveList.vue'
export default {
	components: {
		QRcode,
		// reserve,
		// client,
		// reserveList,
		// notice,
		InfoDialog,
		// counselorFooter,
	},
	data() {
		return {
			content: '',
			dialog: { open: false },
			dialogInfo: {
				open: false,
				code: '!',
				business: { title: '' },
				meData: { created_at: '', name: '' },
				bizData: [
					{ title: '사업지명', value: '' },
					{ title: '건설사명', value: '' },
					{ title: '대표번호', value: '' },
					{ title: '사업지', value: '' },
					{ title: '견본주택', value: '' },
					{ title: '상품정보', value: [] },
					{ title: '홈페이지', value: '' },
					{ title: 'SNS', value: '' },
				],
				productsList: [],
			},
			dialogQr: { open: false, code: '!', business: { title: '' }, meData: { created_at: this.$moment(), name: '' } },
			view: 0,
			cards: [
				{ icon: 'mdi-calendar-blank-outline', title: '상품상담예약', view: 1 },
				{ icon: 'mdi-account-multiple-outline', title: '고객등록', view: 2 },
				{ icon: 'mdi-badge-account-outline', title: '등록고객 관리', view: 3 },
				{ icon: 'mdi-bell-outline', title: '공지사항', view: 4 },
			],
			alertCount: '0',
			pwshow: false,
			// 아이디 에러메세지
			iderrorMessages: '',
			// 패스워드 에러메세지
			pwerrorMessages: '',
			// id,password 데이터
			userid: '',
			password: '',

			// 화면이동 버튼
			buttons: [
				{
					title: '나의 영업페이스',
					status: '',
					goal: '0',
					duartion: '',
					bigNum: '0',
					smallNum: '0',
				},

				{
					title: '상담예약하기',
					route: 'counselorBizReservation',
					ico: '상담예약',
				},
				{
					title: '상담예약관리',
					route: 'counselorBizReservation',
					ico: '상담관리',
				},
				{
					title: '고객등록하기',
					route: 'counselorClients',
					ico: '고객등록',
				},
				{
					title: '등록고객관리',
					route: 'counselorClients',
					ico: '고객관리01',
				},
				{
					title: '출/퇴근관리',
					route: '/counselor/commuteManagement/manage',
					ico: '출퇴근',
				},
				{
					title: '공지사항',
					route: 'counselorNotice',
					ico: '공지',
				},
			],

			expand: true, // 영업페이스 펼침/닫힘
			businessInfo: {}, // 사업지 정보
		}
	},
	async created() {
		await this.me()
		await this.business()
	},
	methods: {
		openInfo() {
			this.$store.state.loading = true
			const data = {
				business: this.dialogInfo.business.id,
			}
			this.$store
				.dispatch('productCounts', data)
				.then(res => {
					this.dialogInfo.productsList = res.productCounts.count
					this.dialogInfo.open = true
					this.$store.state.loading = false
				})
				.catch(err => {
					this.$store.state.loading = false
					console.log({ err })
				})
		},
		openQr() {
			this.dialogQr.open = true

			this.dialogQr.code = this.$store.state.meData.id
			this.dialogQr.meData = this.$store.state.meData
		},
		activeText(text) {
			if (text === 'active') {
				return '분양중'
			} else if (text === 'stop') {
				return '분양정지'
			} else if (text === 'close') {
				return '분양종료'
			}
		},
		async business() {
			await this.$store
				.dispatch('business', { id: this.$route.params.id, type: 'goal' })
				.then(async res => {
					this.dialogInfo.business = res.business
					this.dialogInfo.bizData[0].value = res.business.title
					this.dialogInfo.bizData[1].value = res.business.groupName
					this.dialogInfo.bizData[2].value = res.business.mainPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
					this.dialogInfo.bizData[3].value = res.business.bizAddress
					this.dialogInfo.bizData[4].value = res.business.houseAddress
					this.dialogInfo.bizData[5].value = res.business.product
					this.dialogInfo.bizData[6].value = res.business.homepage ? res.business.homepage.map(el => el.url).join('\n') : ''
					this.dialogInfo.bizData[7].value = res.business.sns ? res.business.sns.map(el => el.url).join('\n') : ''
					this.dialogQr.business = res.business

					if (res.business.systems && res.business.systems.length > 0) {
						let goal = res.business.systems[0]

						this.buttons[0].goal = goal.goalCount
						this.buttons[0].duartion = `(${this.$moment(goal.goalStart).format('YYYY. MM. DD')} ~ ${this.$moment(goal.goalEnd).format(
							'YYYY. MM. DD',
						)})`
					}
					this.businessInfo = res.business

					await this.clientCount()
				})
				.catch(err => {
					console.log(err)
				})
		},
		async terms() {
			await this.$store.dispatch('terms').then(res => {
				this.content = res.terms[0].content
			})
		},
		async clientCount() {
			const data = {
				business: this.$route.params.id,
			}
			await this.$store.dispatch('clientCount', data).then(res => {
				this.$store.state.countShow[0].count1 = res.clientCount.count.count1
				this.$store.state.countShow[0].count2 = res.clientCount.count.count2
				this.$store.state.countShow[0].count3 = res.clientCount.count.count3
				this.$store.state.countShow[1].count1 = res.clientCount.count.count1
				this.$store.state.countShow[1].count2 = res.clientCount.count.count2
				this.$store.state.countShow[1].count3 = res.clientCount.count.count3
				this.$store.state.countShow[2].count1 = res.clientCount.count.count1
				this.$store.state.countShow[2].count2 = res.clientCount.count.count2
				this.$store.state.countShow[2].count3 = res.clientCount.count.count3

				if (this.businessInfo.systems && this.businessInfo.systems.length > 0) {
					let goal = this.businessInfo.systems[0]

					let percent = (res.clientCount.count.count4 / goal.goalCount) * 100
					let percent_num = percent.toFixed(2)

					// 영업페이스 - 성과율
					this.buttons[0].bigNum = percent_num.split('.')[0]
					this.buttons[0].smallNum = percent_num.split('.')[1]

					// 사업지의 목표 활성화 여부 확인
					if (this.businessInfo.systems[0].goalActive) {
						// 사용자의 목표 황성화 여부 확인
						if (this.$store.state.meData.goalActive) {
							// 퍼센트별 상태
							if (percent >= 0 && percent <= 5) {
								this.buttons[0].status = 'warning'
							} else if (percent > 5 && percent <= 25) {
								this.buttons[0].status = 'slower'
							} else if (percent > 25 && percent <= 50) {
								this.buttons[0].status = 'walking'
							} else if (percent > 50 && percent <= 75) {
								this.buttons[0].status = 'running'
							} else if (percent > 75 && percent <= 100) {
								this.buttons[0].status = 'faster'
							} else if (percent > 100) {
								this.buttons[0].status = 'theFastest'
							}
						} else {
							this.buttons[0].status = 'waiting'
						}
					} else {
						this.buttons[0].status = 'waiting'
					}
				}
			})
		},
		changeText() {
			if (this.view === 1 || this.view === 2) {
				return '등록고객'
			} else if (this.view === 3) {
				return '등록고객 관리'
			} else if (this.view === 4) {
				return '공지사항'
			} else {
				return '등록고객'
			}
		},
		cardActive(i) {
			this.view = i + 1
		},
		reload() {
			this.clientCount()
			// this.$router.push({ name: 'counselorDashboard' })
		},
		logout() {
			sessionStorage.removeItem('here-t')
			this.$router.push({ name: 'counselorMain' })
		},
		async me() {
			await this.$store
				.dispatch('me')
				.then(res => {
					if (res.role.name !== 'counselor') {
						this.$router.push({ name: 'block' })
						sessionStorage.removeItem('here-t')
					}
				})
				.catch(err => {
					console.log({ err })
					this.$router.push({ name: 'block' })
				})
		},
		login() {
			if (!this.userid) {
				this.iderrorMessages = 'Please enter your EMAIL.'
				if (!this.password) {
					this.pwerrorMessages = 'Please enter your PASSWORD.'
				} else {
					this.pwerrorMessages = ''
				}
				return
			} else if (!this.password) {
				this.pwerrorMessages = 'Please enter your PASSWORD.'
				return
			} else {
				const data = {
					identifier: this.userid,
					password: this.password,
				}
				this.$store
					.dispatch('login', data)
					.then(() => {
						this.$router.push({ name: 'MANAGER' })
					})
					.catch(() => {
						this.iderrorMessages = 'Your ID or Password is incorrect.'
						this.pwerrorMessages = 'Your ID or Password is incorrect.'
					})
			}
		},
		goTo(item) {
			if (item.title === '상담예약관리') {
				this.$router.push({ name: item.route, query: { tab: '1', status: 'waiting' } })
			} else if (item.title === '등록고객관리') {
				this.$router.push({ name: item.route, query: { tab: '1' } })
			} else {
				this.$router.push({ name: item.route })
			}
		},
		go_to_manage(type) {
			if (type === '예약고객') {
				this.$router.push({ name: 'counselorBizReservation', query: { tab: '1', status: 'waiting' } })
			} else if (type === '등록고객') {
				this.$router.push({ name: 'counselorClients', query: { tab: '1' } })
			} else if (type === '계약고객') {
				this.$router.push({ name: 'counselorClients', query: { tab: '1', status: 'contractComplete' } })
			}
		},
	},
}
</script>
