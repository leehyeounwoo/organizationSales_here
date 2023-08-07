<template>
	<v-container class="login-counselor">
		<!-- 로그인 화면 로고 -->
		<v-layout style="max-width:400px; margin: 0 auto;" wrap justify-center>
			<div class="login-header">
				<v-layout>
					<!-- <v-btn icon dark @click="$router.push({ name: 'counselorMain' })">
						<v-icon>mdi-menu</v-icon>
					</v-btn> -->
					<v-btn icon dark @click="logout" class="ml-auto">
						<v-icon>mdi-logout</v-icon>
					</v-btn>
				</v-layout>
				<v-layout align-center>
					<div class="ml-2 title">
						{{ meData.name }}
					</div>
					<v-badge class="ml-2" overlap dark color="point1" :content="alertCount">
						<v-btn icon dark>
							<v-icon>mdi-bell-outline</v-icon>
						</v-btn>
					</v-badge>
				</v-layout>
				<div class="ml-2 subTitle">
					Members Here
				</div>
			</div>
			<div class="login-header" style="background-color:#8A56AC; margin-top:-67px; z-index:0; padding-top:80px; height:210px">
				<div class="timeText">
					{{ $moment().format('YYYY. MM. DD HH:mm:ss') }}
				</div>
				<v-layout>
					<div class="ml-2 title">
						사업지 선택
					</div>
				</v-layout>
				<div class="mt-2 mx-8">
					<v-select @change="selectBiz" :items="bizItems.map(x => x.title)" v-model="bizSelectData" solo flat></v-select>
				</div>
			</div>
			<div class="ma-4" style="width:100%;">
				<v-card class="biz-card" flat>
					<div class="bizTitle mb-8">
						사업지 정보
					</div>
					<v-layout v-for="(card, i) in bizData" :key="i" class="cardLayouot">
						<div class="cardTitle" style="width:70px;">
							{{ card.title }}
						</div>
						<v-layout v-if="i === 5" class="ml-2 cardValue" wrap style="width:180px;">
							<v-flex xs12>
								<v-layout>
									<div class="product-layout">
										타입
									</div>
									<div class="product-layout">
										세대수
									</div>
									<div class="product-layout">
										잔여세대
									</div>
								</v-layout>
							</v-flex>
							<v-flex
								xs12
								v-for="(product, i) in card.value.map(x => x.PD_Type).filter((v, i) => card.value.map(x => x.PD_Type).indexOf(v) === i)"
								:key="i"
							>
								<v-layout>
									<div class="product-layout">
										{{ product }}
									</div>
									<div class="product-layout">{{ card.value.filter(x => x.PD_Type === product).length }}세대</div>
									<div class="product-layout">
										{{
											card.value.filter(x => x.PD_Type === product).length -
												clientsList.filter(x => x.customDatas.PD_Type === product && x.contractStatus === '계약완료').length
										}}세대
									</div>
								</v-layout>
							</v-flex>
						</v-layout>
						<div class="cardValue ml-2" v-else>
							{{ card.value }}
						</div>
					</v-layout>
					<div v-if="bizSelectData">
						<v-btn
							dark
							@click="askAccess()"
							color="primary"
							v-if="
								bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
									.map(x => x.users_permissions_user.id)
									.indexOf(meData.id) === -1
							"
							block
							class="mt-10"
							rounded
						>
							등록승인요청
						</v-btn>
					</div>
					<div v-if="bizSelectData">
						<div v-if="bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors.length > 0">
							<div
								v-if="
									bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors[
										bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
											.map(x => x.users_permissions_user.id)
											.indexOf(meData.id)
									]
								"
							>
								<v-btn
									color="primary"
									disabled
									v-if="
										bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors[
											bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
												.map(x => x.users_permissions_user.id)
												.indexOf(meData.id)
										].status === 'waiting'
									"
									block
									class="mt-10"
									rounded
								>
									등록승인 대기중
								</v-btn>
							</div>
						</div>
					</div>
					<div v-if="bizSelectData">
						<div v-if="bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors.length > 0">
							<div
								v-if="
									bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors[
										bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
											.map(x => x.users_permissions_user.id)
											.indexOf(meData.id)
									]
								"
							>
								<v-btn
									dark
									@click="
										$router.push({
											name: 'counselorBizDashboard',
											params: { id: bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].id },
										})
									"
									color="primary"
									v-if="
										bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors[
											bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
												.map(x => x.users_permissions_user.id)
												.indexOf(meData.id)
										].status === 'allowed'
									"
									block
									class="mt-10"
									rounded
								>
									사업지로 이동
								</v-btn>
							</div>
						</div>
					</div>
					<div v-if="bizSelectData">
						<div v-if="bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors.length > 0">
							<div
								v-if="
									bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors[
										bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
											.map(x => x.users_permissions_user.id)
											.indexOf(meData.id)
									]
								"
							>
								<v-btn
									color="primary"
									v-if="
										bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors[
											bizItems[bizItems.map(x => x.title).indexOf(bizSelectData)].counselors
												.map(x => x.users_permissions_user.id)
												.indexOf(meData.id)
										].status === 'disallowed'
									"
									block
									class="mt-10"
									rounded
									disabled
								>
									등록승인 요청거절
								</v-btn>
							</div>
						</div>
					</div>
				</v-card>
			</div>
			<div class="mt-8">
				<v-btn text @click="dialogData.open = true">
					Privacy Policy & Terms of Service.
				</v-btn>
				<termsDialog :dialog="dialogData" />
			</div>
		</v-layout>
	</v-container>
</template>

<script>
import termsDialog from './termsDialog.vue'
export default {
	components: {
		termsDialog,
	},
	data() {
		return {
			meData: { name: '' },
			dialogData: { open: false },
			status: true,
			bizData: [
				{ title: '사업지명', value: '' },
				{ title: '건설사명', value: '' },
				{ title: '대표번호', value: '' },
				{ title: '사업지', value: '' },
				{ title: '견본주택', value: '' },
				{ title: '상품정보', value: [] },
				{ title: '홈페이지', value: '' },
				{ title: 'SNS', value: '' },
				{ title: '상태', value: '' },
			],
			bizItems: [],
			alertCount: '0',
			pwshow: false,
			// 아이디 에러메세지
			iderrorMessages: '',
			// 패스워드 에러메세지
			pwerrorMessages: '',
			// id,password 데이터
			userid: '',
			password: '',
			bizSelectData: '',
			clientsList: [],
		}
	},
	created() {
		this.me()
	},
	methods: {
		activeText(text) {
			if (text === 'active') {
				return '분양중'
			} else if (text === 'stop') {
				return '분양정지'
			} else if (text === 'close') {
				return '분양종료'
			}
		},
		clients() {
			const index = this.bizItems.map(x => x.title).indexOf(this.bizSelectData)
			const data = {
				business: this.bizItems[index].id,
			}
			this.$store
				.dispatch('clients', data)
				.then(res => {
					this.clientsList = res.clients
				})
				.catch(err => {
					console.log({ err })
				})
		},
		selectBiz(val) {
			const index = this.bizItems.map(x => x.title).indexOf(val)
			this.bizData[0].value = this.bizItems[index].title
			this.bizData[1].value = this.bizItems[index].groupName
			this.bizData[2].value = this.bizItems[index].mainPhone
			this.bizData[3].value = this.bizItems[index].bizAddress
			this.bizData[4].value = this.bizItems[index].houseAddress
			this.bizData[5].value = this.bizItems[index].product
			this.bizData[6].value = this.bizItems[index].homepage
			this.bizData[7].value = `
			${this.bizItems[index].sns.facebook}
			${this.bizItems[index].sns.youtube}
			${this.bizItems[index].sns.instagram}`
			this.bizData[8].value = this.activeText(this.bizItems[index].status)
			this.clients()
		},
		businesses() {
			this.$store.dispatch('businesses').then(res => {
				this.bizItems = res.businesses
				this.bizSelectData = this.bizItems.map(x => x.title)[0]
				this.selectBiz(this.bizSelectData)
				this.clients()
			})
		},
		askAccess() {
			const index = this.bizItems.map(x => x.title).indexOf(this.bizSelectData)
			const datas = {
				business: this.bizItems[index].id,
				users_permissions_user: this.$store.state.meData.id,
			}
			this.$store.dispatch('counselors', datas).then(res => {
				if (res.counselors.length === 0) {
					var result = confirm(`${this.bizItems[index].title} - 사업지를 등록승인요청 하시겠습니까?`)
					if (result) {
						const data = {
							business: this.bizItems[index].id,
							users_permissions_user: this.$store.state.meData.id,
						}
						this.$store.dispatch('createCounselor', data).then(() => {
							this.businesses()
							alert('신청 되었습니다.')
						})
					} else {
						alert('이미 등록승인을 요청하였습니다.')
					}
				}
			})
		},
		logout() {
			sessionStorage.removeItem('here-t')
			this.$router.push({ name: 'counselorMain' })
		},
		me() {
			this.$store
				.dispatch('me')
				.then(res => {
					this.meData = res
					if (res.role.name !== 'counselor') {
						this.$router.push({ name: 'block' })
						sessionStorage.removeItem('here-t')
					} else {
						this.businesses()
					}
				})
				.catch(() => {
					this.$router.push({ name: 'block' })
				})
		},
	},
}
</script>
