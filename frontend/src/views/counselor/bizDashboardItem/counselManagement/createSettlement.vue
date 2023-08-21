<template>
	<!-- 로그인 화면 로고 -->
	<v-layout style="margin: 0 auto; width:100vw;" wrap justify-center>
		<v-dialog :value="openDaum" width="500"> <VueDaumPostcode @complete="onComplete"/></v-dialog>
		<!-- 회웡가입 영역 -->
		<div class="mx-5" style="width:100%">
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="$router.go(-1)">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						계약등록
					</span>
				</v-layout>
			</div>
			<!-- 정보 입력 -->
			<div class="mt-4 mb-12">
				<!-- 개인정보 입력 -->
				<div class="px-4 pt-8 pb-4 input_field_white">
					<p class="input_main_title">
						고객정보 입력
					</p>
					<!-- 텍스트필드 -->

					<div style="margin: 0 auto;">
						<!-- 이름 -->
						<p class="input_title mb-2">
							고객명
						</p>
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-4"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.name"
							autocomplete="off"
							color="primary2"
						></v-text-field>

						<!-- 전화번호 -->
						<p class="input_title mb-2">
							휴대전화
						</p>
						<v-layout class="mb-4">
							<v-text-field
								hideDetails
								:autofocus="false"
								class="txtLogin1_border_radius"
								outlined
								type="text"
								maxlength="13"
								dense
								@keyup="phoneCheck(siginup.phone)"
								v-model="siginup.phone"
								autocomplete="off"
								color="primary2"
							></v-text-field>
						</v-layout>
						<p class="input_title mb-2">
							생년월일
						</p>
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-2"
							outlined
							maxlength="255"
							flat
							dense
							v-mask="'####-##-##'"
							v-model="siginup.birth"
							autocomplete="off"
							color="primary2"
							placeholder="1999-01-01"
						></v-text-field>
						<p class="input_title mb-2">
							거주지
						</p>
						<v-layout>
							<v-text-field
								hideDetails
								:autofocus="false"
								class="txtLogin1_border_radius mb-2"
								outlined
								maxlength="255"
								flat
								dense
								v-model="siginup.location"
								autocomplete="off"
								:readonly="addressCheck === true"
								placeholder="주소찾기 or 직접입력"
								color="primary2"
							></v-text-field>
							<v-btn color="primary2" class="ml-2" dark elevation="0" @click="openDaum = !openDaum">주소찾기</v-btn>
						</v-layout>
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-2"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.subLocation"
							autocomplete="off"
							placeholder="나머지 주소"
							color="primary2"
						></v-text-field>
					</div>
				</div>
				<div class="mt-4 px-4 py-4 input_field_white">
					<p class="input_main_title">
						계약물건 정보
					</p>
					<v-layout align-center wrap>
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
								flat
								placeholder="호수"
								:items="products3"
								v-model="product3"
								solo
								:disabled="!product2"
								dense
								outlined
								class="nomal-select"
								hideDetails
								color="primary2"
							></v-select>
						</v-flex>
					</v-layout>
				</div>
				<!-- 이메일 / 비밀번호 입력 -->
				<div class="mt-4 px-4 py-4 input_field_white">
					<p class="input_main_title">
						증빙서류 등록
					</p>
					<strong>
						<div class="explain-text point4--text my-2">
							분양계약서, 계약금 입금증, 완납증 등 고객 계약을 증빙할 수 있는 자료를 첨부하세요.
						</div>
					</strong>

					<v-layout class="mb-2">
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-2 mr-2"
							placeholder="※png, pdf, jpg"
							outlined
							flat
							dense
							readonly
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage()">
							<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
						</v-btn>
					</v-layout>
					<div>
						<v-chip-group class="white--text">
							<v-chip v-for="(file, i) in files" :key="i" color="point6" close dark @click:close="deleteFiles(i)">
								{{ file.name }}
							</v-chip>
						</v-chip-group>
					</div>
				</div>
				<v-btn elevation="0" height="48" class="loginButton_small mt-10" block color="primary2" @click="createSettlement" rounded>
					<span style="color:white;	font-weight: bold;"> {{ $route.name === 'editSettlement' ? '수정하기' : '등록하기' }} </span>
				</v-btn>
				<v-btn
					v-if="$route.name === 'editSettlement'"
					elevation="0"
					height="48"
					class="loginButton_small"
					block
					color="primary"
					@click="$router.push({ name: 'settlementTruns' })"
					rounded
				>
					<span style="color:white;	font-weight: bold;"> 정산등록하기 </span>
				</v-btn>
			</div>
			<input
				type="file"
				style="display:none;"
				:id="'file_upload_settlement'"
				@change="fileUpload($event)"
				accept=".pdf, image/jpg, image/png, image/jpeg"
			/>
			<sweetAlert
				:dialog="sweetInfo"
				@close_active="sweetInfo.title === '등록완료' || sweetInfo.title === '접근불가' ? $router.push({ name: 'settlements' }) : ''"
			/>
		</div>
	</v-layout>
</template>
<script>
import { sweetAlert } from '@/components'
import { VueDaumPostcode } from 'vue-daum-postcode'
export default {
	components: {
		sweetAlert,
		VueDaumPostcode,
	},
	data() {
		return {
			options: {},
			openDaum: false,
			addressCheck: false,
			products1: [],
			products2: [],
			products3: [],
			product1: '',
			product2: '',
			product3: '',
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			files: [],
			emailDuplicate: null,
			siginup: {
				name: '',
				phone: '',
				birth: '',
				location: '',
				subLocation: '',
			},
			productDatas: [],
			settlement: {},
		}
	},
	created() {
		if (this.$route.name === 'editSettlement') {
			this.$store.dispatch('settlementsList', { id: this.$route.params.id }).then(res => {
				if (res.settlements.length === 0)
					return this.open_disable_dialog(
						{
							title: '접근불가',
							content: `접근불가한 데이터 입니다..`,
						},
						'error',
					)
				this.settlement = res.settlements[0]
				this.siginup.name = res.settlements[0].name
				this.siginup.phone = res.settlements[0].phone
				this.siginup.birth = res.settlements[0].birth
				this.siginup.location = res.settlements[0].location
				this.siginup.subLocation = res.settlements[0].subLocation
				if (res.settlements[0].attachment) {
					for (let index = 0; index < res.settlements[0].attachment.length; index++) {
						const el = res.settlements[0].attachment[index]
						this.files.push(el)
					}
				}
				this.products()
			})
		} else this.products()
	},
	methods: {
		product1Change(val) {
			this.products2 = this.productDatas.filter(x => x.housingType === val).map(x => x.dong)
			this.product2 = ''
			this.product3 = ''
		},
		product2Change(val) {
			this.products3 = this.productDatas.filter(x => x.dong === val).map(x => x.ho)
			this.product3 = ''
		},
		deleteFiles(i) {
			this.files.splice(i, 1)
		},
		onComplete(val) {
			this.addressCheck = true
			this.siginup.location = val.address
			this.openDaum = !this.openDaum
		},
		products() {
			this.$store.dispatch('me').then(() => {
				this.$store.dispatch('products', { businessID: this.$store.state.meData.businessID }).then(res => {
					this.productDatas = res.products
					if (this.$route.name === 'editSettlement') {
						this.products1 = res.products.map(x => x.housingType)
						this.products2 = res.products.map(x => x.dong)
						this.products3 = res.products.map(x => x.ho)
						this.product1 = res.products.filter(x => x.id === this.settlement.ProductID)[0].housingType
						this.product2 = res.products.filter(x => x.id === this.settlement.ProductID)[0].dong
						this.product3 = res.products.filter(x => x.id === this.settlement.ProductID)[0].ho
					} else this.products1 = res.products.map(x => x.housingType)
				})
			})
		},
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
		},
		// 단일 파일 업로드
		fileUpload(event) {
			// - 파일형식 및 크기 : jpg, png / 최대 500KB
			if (event.target.files[0].size / 1024 > 500) {
				return this.open_disable_dialog({
					title: '용량초과',
					content: `500kb 이하의 파일을 업로드해주세요.`,
				})
			} else {
				this.files.push(event.target.files[0])
			}
		},
		clickFileUploadImage() {
			document.getElementById('file_upload_settlement').click()
		},
		phoneCheck(item) {
			//전화번호 체크
			let value = item
				.replace(/[^0-9.]/g, '')
				.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
				.replace('--', '-')
			this.siginup.phone = value
		},
		async createSettlement() {
			if (!this.siginup.name) return this.open_disable_dialog({ title: '계약등록', content: '고객명을 입력해주세요.' })
			else if (!this.siginup.phone) return this.open_disable_dialog({ title: '계약등록', content: '휴대전화를 입력해주세요.' })
			else if (!this.siginup.birth) return this.open_disable_dialog({ title: '계약등록', content: '생년월일을 입력해주세요.' })
			else if (!this.siginup.location) return this.open_disable_dialog({ title: '계약등록', content: '거주지를 입력해주세요.' })
			else if (!this.product1) return this.open_disable_dialog({ title: '계약등록', content: '계약물건 정보의 주택형을 입력해주세요.' })
			else if (!this.product2) return this.open_disable_dialog({ title: '계약등록', content: '계약물건 정보의 동을 입력해주세요.' })
			else if (!this.product3) return this.open_disable_dialog({ title: '계약등록', content: '계약물건 정보의 호수를 입력해주세요.' })
			const filesData = this.files
			if (filesData.length > 0) {
				const filesId = []
				for (let i = 0; i < filesData.length; i++) {
					const el = filesData[i]
					if (!el.id) {
						let input = {
							file: el,
						}
						await this.$store.dispatch('upload', input).then(res => {
							filesId.push(res.data[0].id)
						})
					} else filesId.push(el.id)
					if (filesData.length - 1 === i) {
						const productID = this.productDatas.filter(
							x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3,
						)[0].id
						const data = {
							ProductID: productID,
							contractDate: this.$moment().format('YYYY-MM-DDTHH:mm:ss') + '.000Z',
							userID: this.$store.state.meData.id,
							attachment: filesId,
							name: this.siginup.name,
							phone: this.siginup.phone,
							birth: this.siginup.birth,
							location: this.siginup.location,
							subLocation: this.siginup.subLocation,
						}
						if (this.$route.name === 'editSettlement') {
							data.id = this.settlement.id
						}
						this.$store
							.dispatch(this.$route.name === 'editSettlement' ? 'updateSettlement_front' : 'createSettlement', data)
							.then(() => {
								this.open_disable_dialog({ title: '등록완료', content: '정상적으로 등록 되었습니다.' }, 'success')
							})
							.catch(err => {
								this.open_disable_dialog({ title: '오류발생', content: '수정 도중 오류가 발생하였습니다. 관리자에게 문의하세요.' }, 'error')
								console.log({ err })
							})
					}
				}
			} else {
				const productID = this.productDatas.filter(
					x => x.housingType === this.product1 && x.dong === this.product2 && x.ho === this.product3,
				)[0].id
				const data = {
					ProductID: productID,
					contractDate: this.$moment().format('YYYY-MM-DDTHH:mm:ss') + '.000Z',
					userID: this.$store.state.meData.id,
					name: this.siginup.name,
					attachment: [],
					phone: this.siginup.phone,
					birth: this.siginup.birth,
					location: this.siginup.location,
					subLocation: this.siginup.subLocation,
				}
				if (this.$route.name === 'editSettlement') {
					data.id = this.settlement.id
				}
				this.$store
					.dispatch(this.$route.name === 'editSettlement' ? 'updateSettlement_front' : 'createSettlement', data)
					.then(() => {
						this.open_disable_dialog({ title: '등록완료', content: '정상적으로 등록 되었습니다.' }, 'success')
					})
					.catch(err => {
						this.open_disable_dialog({ title: '오류발생', content: '수정 도중 오류가 발생하였습니다. 관리자에게 문의하세요.' }, 'error')
						console.log({ err })
					})
			}
		},
	},
}
</script>
<style lang="scss">
.explain-text {
	font-size: 12px;
}
</style>
