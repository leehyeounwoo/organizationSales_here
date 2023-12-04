<template>
	<v-layout style="margin: 0 auto;" wrap justify-center>
		<!-- 로그인 영역 -->
		<div class="px-5" style="width:100%">
			<div class="conunselor_login_header">
				<!-- 버튼 -->
				<div class="header_back_btn">
					<v-btn large icon dark color="#333" @click="$router.go(-1)">
						<v-icon large>mdi-chevron-left</v-icon>
					</v-btn>
				</div>
				<!-- 문구 -->
				<div class="header_info">
					<div class="ml-2 header_title">
						Log In Our Community
					</div>
					<div class="ml-2 header_subTitle">
						로그인
					</div>
				</div>
			</div>
			<!-- 이메일 / 비밀번호 입력 영역 -->
			<div class="my-7">
				<div class="" style="margin: 0 auto; width:100%;">
					<div class="px-4 pt-8 pb-4 input_field_white">
						<p class="input_main_title ">
							LOG IN
						</p>

						<!-- 아이디 -->

						<p class="input_title mb-2">
							이메일
						</p>
						<v-text-field
							:error-messages="iderrorMessages"
							:autofocus="false"
							class="txtLogin1_border_radius"
							placeholder="Email"
							outlined
							maxlength="255"
							flat
							dense
							v-model="userid"
							@change="iderrorMessages = ''"
							@keydown.enter="login()"
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<!-- 비밀번호 -->

						<p class="input_title">
							비밀번호
						</p>
						<v-text-field
							:append-icon="pwshow ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
							:type="pwshow ? 'text' : 'password'"
							:error-messages="pwerrorMessages"
							:autofocus="false"
							class="txtLogin1_border_radius"
							outlined
							flat
							placeholder="Password"
							dense
							maxlength="255"
							v-model="password"
							@keydown.enter="login()"
							autocomplete="off"
							@change="pwerrorMessages = ''"
							@click:append="pwshow = !pwshow"
							color="primary2"
						></v-text-field>
						<v-layout class="input_title">
							<span
								style="color:gray; font-size:0.5rem; text-decoration:underline; cursor:pointer;"
								@click="find_user_dialog.dialog = true"
							>
								아이디/비밀번호 찾기
							</span>
						</v-layout>
					</div>
					<!-- 로그인 버튼 -->
					<v-btn elevation="0" height="40" class="loginButton_small mt-10" block color="primary2" @click="login()" rounded>
						<span style="color:white;	font-weight: bold;"> LOG IN </span>
					</v-btn>
				</div>
			</div>
			<div class="mt-8">
				<!-- <v-btn text @click="dialogData.open = true">
					Privacy Policy & Terms of Service.
				</v-btn> -->
				<termsDialog :dialog="dialogData" />
			</div>
		</div>
		<sweetAlert :dialog="sweetInfo" />
		<v-dialog v-model="find_user_dialog.dialog" max-width="50vw">
			<v-card class="pa-2">
				<v-layout>
					<div style="margin: 0 auto;">
						<p class="input_title mb-2 mt-2" style="width:100%;">
							휴대폰 번호*
						</p>
						<v-text-field
							v-mask="'###-####-####'"
							:autofocus="false"
							class="txtLogin1_border_radius mb-4"
							outlined
							maxlength="255"
							flat
							dense
							:error-messages="find_user_dialog.errmessage"
							v-model="find_user_dialog.findUser"
							autocomplete="off"
							color="primary2"
						></v-text-field>
					</div>

					<!-- <div style="margin: 0 auto;">
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
							v-model="findUser"
							autocomplete="off"
							color="primary2"
						></v-text-field>
					</div> -->
				</v-layout>
				<v-layout justify-center wrap>
					<v-flex xs12>
						<v-btn height="40" class="findButton_small" block color="primary2" @click="findUser()">
							<span style="color:white;	font-weight: bold;">아이디/비밀번호 찾기 </span>
						</v-btn>
					</v-flex>
					<v-flex xs12>
						<v-btn height="40" class="findButton_small" dark block color="" @click="find_user_dialog.dialog = false">
							<span style="color:white;	font-weight: bold;"> 취소 </span>
						</v-btn>
					</v-flex>
				</v-layout>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import termsDialog from './termsDialog.vue'
import { sweetAlert } from '@/components'
export default {
	components: {
		termsDialog,
		sweetAlert,
	},
	data() {
		return {
			find_user_dialog: {
				dialog: false,
				findUser: '',
				errmessage: '',
			},
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			dialogData: { open: false },
			pwshow: false,
			// 아이디 에러메세지
			iderrorMessages: '',
			// 패스워드 에러메세지
			pwerrorMessages: '',
			// id,password 데이터
			userid: '',
			password: '',
		}
	},
	methods: {
		generateRandomCodeStr(n) {
			let str = ''
			for (let i = 0; i < n; i++) {
				str += Math.floor(Math.random() * 10)
			}
			return str
		},

		findUser() {
			if (this.find_user_dialog.findUser !== '') {
				this.find_user_dialog.errmessage = ''
				const data = {
					phoneNumber: this.find_user_dialog.findUser,
				}
				this.$store
					.dispatch('usersConnection', data)
					.then(res => {
						if (res.usersConnection.values.length !== 0) {
							let password = this.generateRandomCodeStr(6)
							const updateUserData = {
								id: res.usersConnection.values[0].id,
								password: password,
							}
							this.$store.dispatch('updateUser', updateUserData).then(() => {
								if (this.find_user_dialog.findUser.replace(/-/g, '').length < 10) alert('정상적인 휴대전화번호가 아닙니다.')
								let input = {
									phoneNumber: this.find_user_dialog.findUser.replace(/-/g, ''),
									content: `아이디 : ${res.usersConnection.values[0].username} \n 패스워드 : ${password} \n 마이페이지에서 사용하실 비밀번호로 변경하시기 바랍니다.`,
								}
								this.$store
									.dispatch('sendSmsSettlement', input)
									.then(() => {})
									.catch(() => {})
								alert('휴대폰으로 정보가 전송되었습니다.')
								this.find_user_dialog.dialog = false
							})
						} else {
							if (this.find_user_dialog.findUser.replace(/-/g, '').length < 10) {
								alert('정상적인 휴대전화번호가 아닙니다.')
							} else {
								alert('계정이 존재하지 않습니다.')
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else {
				this.find_user_dialog.errmessage = '휴대폰 번호를 입력해주세요.'
			}
		},
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
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
					username: this.userid,
					password: this.password,
				}
				this.$store
					.dispatch('login', data)
					.then(res => {
						if (!res.workingStatus) {
							return this.open_disable_dialog({
								title: '퇴사 OR 재직 미승인',
								content: '퇴사처리 OR 재직 미승인 되었습니다.\n 관리자에게 문의하세요.',
							})
						}
						if (res && res.role.name === 'Counselor') {
							this.$router.push({
								name: 'counselorDashboard',
							})
						} else {
							return this.open_disable_dialog({
								title: '상담사만 접속가능',
								content: '상담사만 접속가능한 로그인 페이지 입니다.',
							})
						}
					})
					.catch(() => {
						this.iderrorMessages = '이메일 OR 비밀번호가 틀렸습니다.'
						this.pwerrorMessages = '이메일 OR 비밀번호가 틀렸습니다.'
					})
			}
		},
	},
}
</script>
