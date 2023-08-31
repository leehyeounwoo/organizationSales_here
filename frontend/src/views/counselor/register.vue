<template>
	<!-- 로그인 화면 로고 -->
	<v-layout style="margin: 0 auto; width:100vw;" wrap justify-center>
		<!-- 회웡가입 영역 -->
		<div class="px-5" style="width:100%">
			<div class="conunselor_login_header">
				<!-- 버튼 -->
				<div class="header_back_btn">
					<v-btn large icon dark color="#333" @click="$router.push({ name: 'counselorMain' })">
						<v-icon large>mdi-chevron-left</v-icon>
					</v-btn>
				</div>
				<!-- 문구 -->
				<div class="header_info">
					<div class="ml-2 header_subTitle" style="line-height: 44px; font-size: 24px !important;">
						회원가입
					</div>
				</div>
			</div>
			<!-- 정보 입력 -->
			<div class="mt-4 mb-12">
				<!-- 개인정보 입력 -->
				<div class="px-4 pt-8 pb-4 input_field_white">
					<p class="input_main_title ">
						개인정보 입력
					</p>
					<!-- 텍스트필드 -->

					<div style="margin: 0 auto;">
						<!-- 코드 -->
						<p class="input_title mb-2">
							사업지 코드*
						</p>
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-4"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.code"
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<!-- 이름 -->
						<p class="input_title mb-2">
							이름*
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
							휴대전화*
						</p>
						<v-layout class="mb-4">
							<v-text-field
								:readonly="sendActive"
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
							프로필 사진*
						</p>
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
								v-model="files[0].name"
								autocomplete="off"
								color="primary2"
							></v-text-field>
							<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage(0)">
								<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
							</v-btn>
						</v-layout>

						<!-- 계좌번호 -->
						<p class="input_title mb-2">
							계좌정보*
						</p>
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-2"
							placeholder="은행명"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.bank"
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-2"
							placeholder="계좌번호 (숫자만 입력하세요)"
							outlined
							type="number"
							maxlength="255"
							flat
							dense
							v-model="siginup.account"
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<p class="input_title mb-2">
							통장사본*
						</p>
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
								v-model="files[1].name"
								autocomplete="off"
								color="primary2"
							></v-text-field>
							<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage(1)">
								<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
							</v-btn>
						</v-layout>
						<p class="input_title mb-2">
							근로계약서*
						</p>
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
								v-model="files[2].name"
								autocomplete="off"
								color="primary2"
							></v-text-field>
							<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage(2)">
								<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
							</v-btn>
						</v-layout>
						<p class="input_title mb-2">
							신분증 사본등 기타 첨부자료*
						</p>
						<v-layout class="mb-2">
							<v-text-field
								hideDetails
								:autofocus="false"
								class="txtLogin1_border_radius mb-2 mr-2"
								placeholder="※png, pdf, jpg"
								outlined
								maxlength="255"
								flat
								dense
								readonly
								v-model="files[3].name"
								autocomplete="off"
								color="primary2"
							></v-text-field>
							<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage(3)">
								<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
							</v-btn>
						</v-layout>
						<div style="display:flex; align-items:end;">
							<!-- 회사명-->
							<p class="input_title mb-2">
								회사명
							</p>

							<v-checkbox v-model="siginup.biz" color="primary2" hide-details class="mb-1" style="margin-left:auto">
								<div slot="label" style="font-size:12px; font-weight:300;">
									사업자인 경우 추가입력
								</div>
							</v-checkbox>
						</div>
						<v-text-field
							hideDetails
							:disabled="!siginup.biz"
							:autofocus="false"
							class="txtLogin1_border_radius mb-4"
							:class="!siginup.biz ? 'disabled_txtField' : ''"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.companyName"
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<!-- 사업자등록번호 -->
						<p class="input_title mb-2">
							사업자 등록번호
						</p>
						<v-text-field
							hideDetails
							:disabled="!siginup.biz"
							:autofocus="false"
							class="txtLogin1_border_radius mb-2"
							:class="!siginup.biz ? 'disabled_txtField' : ''"
							outlined
							maxlength="255"
							flat
							dense
							@keyup="businessNumCheck(siginup.companyNumber)"
							v-model="siginup.companyNumber"
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<p class="input_title mb-2">
							사업자 등록증
						</p>
						<v-layout class="mb-2">
							<v-text-field
								hideDetails
								:class="!siginup.biz ? 'disabled_txtField' : ''"
								:disabled="!siginup.biz"
								:autofocus="false"
								class="txtLogin1_border_radius mb-2 mr-2"
								placeholder="※png, pdf, jpg"
								outlined
								flat
								dense
								readonly
								v-model="files[4].name"
								autocomplete="off"
								color="primary2"
							></v-text-field>
							<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage(4)" :disabled="!siginup.biz">
								<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
							</v-btn>
						</v-layout>
					</div>
				</div>
				<!-- 이메일 / 비밀번호 입력 -->
				<div class="mt-8 px-4 pt-8 pb-10 input_field_white">
					<p class="input_main_title ">
						로그인 정보
					</p>
					<!-- 이메일 -->
					<p class="input_title mb-2">
						이메일*
					</p>
					<div style="margin: 0 auto;">
						<v-layout class="mb-4">
							<v-text-field
								hideDetails
								rounded
								:autofocus="false"
								class="txtLogin1_border_radius"
								placeholder="로그인시 사용할 이메일 입력"
								outlined
								type="text"
								maxlength="255"
								dense
								v-model="siginup.email"
								autocomplete="off"
								color="primary2"
							></v-text-field>
							<!-- <v-btn elevation="0" height="40" width="100" class="ml-4" color="primary" @click="emailDuplicateAction()">
									<span style="color:white;	font-weight: bold;"> 중복확인 </span>
								</v-btn> -->
						</v-layout>

						<!-- 비밀번호 -->
						<p class="input_title mb-2">
							비밀번호*
						</p>

						<v-text-field
							:append-icon="siginup.pwshow1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
							hideDetails
							rounded
							:autofocus="false"
							class="txtLogin1_border_radius mb-4"
							placeholder="Password"
							:type="siginup.pwshow1 ? 'text' : 'password'"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.password"
							autocomplete="off"
							@click:append="siginup.pwshow1 = !siginup.pwshow1"
							color="primary2"
						></v-text-field>

						<!-- 비밀번호 확인 -->
						<p class="input_title mb-2">
							비밀번호 확인*
						</p>

						<v-text-field
							:append-icon="siginup.pwshow2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
							hideDetails
							rounded
							:autofocus="false"
							class="txtLogin1_border_radius mb-2"
							placeholder="Confirm Password"
							:type="siginup.pwshow2 ? 'text' : 'password'"
							outlined
							maxlength="255"
							flat
							dense
							v-model="siginup.password_re"
							autocomplete="off"
							@click:append="siginup.pwshow2 = !siginup.pwshow2"
							color="primary2"
						></v-text-field>
					</div>
				</div>
				<v-btn elevation="0" height="48" class="loginButton_small mt-10" block color="primary2" @click="register()" rounded>
					<span style="color:white;	font-weight: bold;"> 등록하기 </span>
				</v-btn>
			</div>
			<input
				v-for="(i, index) in 5"
				:key="i"
				type="file"
				style="display:none;"
				:id="'file_upload_' + index"
				@change="fileUpload($event, index)"
				accept=".pdf, image/jpg, image/png, image/jpeg"
			/>
			<sweetAlert :dialog="sweetInfo" @close_active="sweetInfo.title === '등록완료' ? $router.push({ name: 'counselorLogin' }) : ''" />
			<!-- <div class="mt-8">
					<v-btn text>
						Privacy Policy & Terms of Service.
					</v-btn>
				</div> -->
		</div>
	</v-layout>
</template>

<script>
import { sweetAlert } from '@/components'
export default {
	components: {
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
			files: [
				{ file: null, name: '' },
				{ file: null, name: '' },
				{ file: null, name: '' },
				{ file: null, name: '' },
				{ file: null, name: '' },
			],
			emailDuplicate: null,
			authButton: true,
			sendActive: false,
			siginup: {
				name: '',
				phone: '',
				authNumber: '',
				authNumberCheck: false,
				email: '',
				password: '',
				password_re: '',
				companyName: '',
				companyNumber: '',
				companyPaper: null,
				companyPaperName: '',
				pwshow1: false,
				pwshow2: false,
				agree: false,
				biz: false,
				bank: '',
				account: '',
			},
			pwshow: false,
		}
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
		// 단일 파일 업로드
		fileUpload(event, index) {
			// - 파일형식 및 크기 : jpg, png / 최대 500KB
			if (event.target.files[0].size / 1024 > 500) {
				this.files[index] = { file: null, name: '' }
				return this.open_disable_dialog({
					title: '용량초과',
					content: `500kb 이하의 파일을 업로드해주세요.`,
				})
			} else {
				this.files[index].name = event.target.files[0].name
				this.files[index].file = event.target.files[0]
			}
		},
		clickFileUploadImage(index) {
			document.getElementById('file_upload_' + index).click()
		},
		async emailDuplicateAction() {
			const data = {
				email: this.siginup.email.toLowerCase(),
			}
			let ducpliate

			await this.$store.dispatch('emailDuplicate', data).then(res => {
				if (res.emailDuplicate.duplicate) {
					ducpliate = false
				} else {
					ducpliate = true
				}
			})
			return ducpliate
		},

		checkAuthNumber() {
			const data = {
				receiver: this.siginup.phone.replace(/-/g, ''),
				authcode: Number(this.siginup.authNumber),
				created_at_gte: this.$moment().subtract(1, 'h')._d,
			}
			this.$store.dispatch('sendSms', data).then(res => {
				if (res.sendSms.length > 0) {
					this.siginup.authNumberCheck = true
					return alert('인증번호가 확인 되었습니다.')
				} else return alert('인증번호가 틀렸습니다.')
			})
		},
		createSendMessage() {
			if (this.siginup.phone.replace(/-/g, '').length < 10) alert('정상적인 휴대전화번호가 아닙니다.')
			const data = {
				receiver: this.siginup.phone.replace(/-/g, ''),
			}
			this.$store.dispatch('createSendSm', data).then(() => {
				this.siginup.authNumberCheck = false
				this.authButton = false
				this.sendActive = true
			})
		},
		businessNumCheck(item) {
			//사업지 번호 체크
			let value = item.replace(/[^0-9.]/g, '').replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')

			this.siginup.companyNumber = value
		},
		phoneCheck(item) {
			//전화번호 체크
			let value = item
				.replace(/[^0-9.]/g, '')
				.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
				.replace('--', '-')
			this.siginup.phone = value
		},
		async register() {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (!this.siginup.code) return this.open_disable_dialog({ title: '등록안내', content: '사업지 코드를 입력해주세요.' })
			else if (!this.siginup.name) return this.open_disable_dialog({ title: '등록안내', content: '이름을 입력해주세요.' })
			else if (!this.siginup.phone) return this.open_disable_dialog({ title: '등록안내', content: '휴대전화를 입력해주세요.' })
			else if (!this.files[0].file) return this.open_disable_dialog({ title: '등록안내', content: '프로필사진을 업로드 해주세요.' })
			else if (!this.siginup.bank) return this.open_disable_dialog({ title: '등록안내', content: '계좌정보의 은행명을 입력해주세요.' })
			else if (!this.siginup.account) return this.open_disable_dialog({ title: '등록안내', content: '계좌정보의 계좌번호를 입력해주세요.' })
			else if (!this.files[1].file) return this.open_disable_dialog({ title: '등록안내', content: '통장사본을 업로드 해주세요.' })
			else if (!this.files[2].file) return this.open_disable_dialog({ title: '등록안내', content: '근로계약서를 업로드 해주세요.' })
			else if (!this.files[3].file)
				return this.open_disable_dialog({ title: '등록안내', content: '신분증 사본등 기타 첨부자료를 업로드 해주세요.' })
			else if (!this.siginup.email) return this.open_disable_dialog({ title: '등록안내', content: '이메일을 입력해주세요.' })
			else if (!this.siginup.password) return this.open_disable_dialog({ title: '등록안내', content: '비밀번호를 입력해주세요.' })
			else if (!this.siginup.password_re) return this.open_disable_dialog({ title: '등록안내', content: '비밀번호 확인을 입력해주세요.' })
			else if (!re.test(this.siginup.email))
				return this.open_disable_dialog({ title: '등록안내', content: '정상적인 이메일 형식이 아닙니다.' })
			else if (!(await this.emailDuplicateAction())) return this.open_disable_dialog({ title: '등록안내', content: '중복된 이메일입니다.' })
			else if (this.siginup.password.length < 6)
				return this.open_disable_dialog({ title: '등록안내', content: '비밀번호는 6자리 이상으로 입력해주세요.' })
			else if (this.siginup.password !== this.siginup.password_re)
				return this.open_disable_dialog({ title: '등록안내', content: '비밀번호와 비밀번호 확인이 동일하지 않습니다.' })
			if (this.siginup.biz) {
				if (!this.siginup.companyName) return this.open_disable_dialog({ title: '등록안내', content: '회사명을 입력해주세요.' })
				else if (!this.siginup.companyNumber)
					return this.open_disable_dialog({ title: '등록안내', content: '사업자등록번호를 입력해주세요.' })
				else if (!this.files[4].file) return this.open_disable_dialog({ title: '등록안내', content: '사업자 등록증을 업로드 해주세요.' })
			}
			this.$store.state.loading = true
			const filesData = this.files.filter(x => x.file !== null)
			const filesId = []
			for (let i = 0; i < filesData.length; i++) {
				const el = filesData[i].file
				let input = {
					file: el,
				}
				await this.$store.dispatch('upload', input).then(res => {
					filesId.push(res.data[0].id)
					if (filesData.length - 1 === i) {
						const data = {
							username: this.siginup.email.toLowerCase(),
							name: this.siginup.name.toLowerCase(),
							email: this.siginup.email.toLowerCase(),
							password: this.siginup.password,
							bank: this.siginup.bank,
							phoneNumber: this.siginup.phone,
							accountNumber: this.siginup.account,
							businessID: this.siginup.code,
							company: this.siginup.companyName,
							businessNumber: this.siginup.companyNumber,
							profile: filesId[0],
							copyAccount: filesId[1],
							employmentContract: filesId[2],
							ID_Card: filesId[3],
							businessRegistration: this.siginup.biz ? filesId[4] : null,
						}
						this.$store
							.dispatch('register', data)
							.then(() => {
								this.$store.state.loading = false
								this.open_disable_dialog(
									{ title: '등록완료', content: '정상적으로 등록 되었습니다. \n입력하신 정보로 로그인 하시기 바랍니다.' },
									'success',
								)
								this.authButton = true
								this.sendActive = false
								// Object.assign(this.$data, this.$options.data())
							})
							.catch(() => {
								this.$store.state.loading = false
								this.open_disable_dialog(
									{ title: '오류발생', content: '사업지 코드가 맞지 않습니다. \n관리자에게 정확한 사업지 코드를 문의해주세요.' },
									'error',
								)
							})
					}
				})
			}
		},
	},
}
</script>
<style lang="scss"></style>
