<template>
	<v-container class="login-container">
		<!-- 로그인 화면 로고 -->
		<v-layout class="login-layout" wrap justify-center>
			<!-- <v-flex xs12 style="margin-bottom:80px; margin-top:100px;">
				<div class="text-center"></div>
			</v-flex> -->
			<!-- CDP -->

			<v-layout class="login_background" flex-wrap justify-center align-center>
				<v-flex xs6 v-if="nowWidth > 1090">
					<div>
						<v-img height="100vh" src="@/assets/images/login_bg2.png">
							<div class="text-left" style="margin: 105px 0 200px 125px;">
								<span class="loginMainTitle">
									Members <br />
									Here
								</span>
								<span class="loginSubTitle">
									<br />
									Sales force management system
								</span>
							</div>
							<div class="text-left" style="margin-left: 125px; margin-bottom: 123.4px;">
								<v-img style="max-width: 400px;" src="/image/counselor_login_1.png"></v-img>
							</div>
						</v-img>
					</div>
				</v-flex>
				<v-flex md6 xs12>
					<div style="width:320px; padding:0px;" class="mr-5">
						<div class="login_text text-left mb-3">LOG IN</div>
						<div class="text-center test002" style="margin: 0 auto; width:320px;">
							<!-- 아이디 -->
							<v-text-field
								:error-messages="iderrorMessages"
								:autofocus="false"
								placeholder="아이디"
								maxlength="255"
								height="50px"
								outlined
								:hideDetails="iderrorMessages === '' ? true : false"
								flat
								v-model="userid"
								@keydown.enter="login()"
								autocomplete="off"
								:class="iderrorMessages === '' ? 'mb-4' : ''"
							></v-text-field>
							<!-- 비밀번호 -->
							<v-text-field
								class="test001"
								:error-messages="pwerrorMessages"
								:autofocus="false"
								placeholder="비밀번호"
								type="password"
								height="50px"
								outlined
								:hideDetails="pwerrorMessages === '' ? true : false"
								maxlength="255"
								v-model="password"
								@keydown.enter="login()"
								autocomplete="off"
								:class="pwerrorMessages === '' ? 'mb-4' : ''"
							></v-text-field>
							<!-- 로그인 버튼 -->
							<v-checkbox v-model="rememberId" color="#009dac" :label="`아이디 저장`" class="mt-0 pt-0" hideDetails></v-checkbox>
							<v-btn class="AdminLoginButton mt-5" height="50px" color="#3e7ccc" block elevation="0" @click="login()">
								<span class="loginSpan" style="color:white;	font-weight: bold;">
									로그인
								</span>
							</v-btn>
							<!-- <p class="footer-text">Don't have an account? <span class="signup-text" @click="toSignup">Sign Up</span></p> -->
						</div>
					</div>
				</v-flex>
			</v-layout>
			<!-- 하단 -->
		</v-layout>
		<alertModal :setdialog="alertModal"></alertModal>
	</v-container>
</template>

<script>
import { alertModal } from '@/components'
export default {
	components: {
		alertModal,
	},
	data() {
		return {
			rememberId: false,
			isFocused: false,
			alertModal: {
				dialog: false,
				text: '',
			},
			// 아이디 에러메세지
			iderrorMessages: '',
			// 패스워드 에러메세지
			pwerrorMessages: '',
			// id,password 데이터
			userid: '',
			password: '',
			screenWidth: 0, //창크기
		}
	},
	created() {
		if (localStorage.getItem('loginId')) {
			this.userid = localStorage.getItem('loginId')
			this.rememberId = true
		}
		this.screenWidth = window.innerWidth

		if (sessionStorage.getItem('reserveLite-t')) {
			this.$router.push('/admin/login').catch(() => {})
		}
	},
	computed: {
		nowWidth() {
			window.addEventListener('resize', () => {
				this.screenWidth = window.innerWidth
			})
			return this.screenWidth
		},
	},
	methods: {
		login() {
			if (!this.userid) {
				this.iderrorMessages = '아이디를 입력해 주세요.'
				if (!this.password) {
					this.pwerrorMessages = '비밀번호를 입력해 주세요.'
				} else {
					this.pwerrorMessages = ''
				}
				return
			} else if (!this.password) {
				if (!this.userid) {
					this.iderrorMessages = '아이디를 입력해 주세요.'
				} else {
					this.iderrorMessages = ''
				}
				this.pwerrorMessages = '비밀번호를 입력해 주세요.'
				return
			} else {
				const data = {
					username: this.userid,
					password: this.password,
				}
				this.$store
					.dispatch('login', data)
					.then(res => {
						console.log(res)
						if (this.rememberId) {
							localStorage.setItem('loginId', this.userid)
							this.$router.push({ name: 'dashBoard' }).catch(() => {})
						} else {
							localStorage.removeItem('loginId')
							this.$router.push({ name: 'dashBoard' }).catch(() => {})
						}
						// if (res.out === true) {
						// 	this.iderrorMessages = 'Block된 아이디 입니다. 관리자에게 문의 하세요.'
						// 	this.pwerrorMessages = 'Block된 아이디 입니다. 관리자에게 문의 하세요.'
						// 	sessionStorage.removeItem('reserveLite-t')
						// } else {

						// }
					})
					.catch(err => {
						console.log({ err })
						// if ({ err }.err.message === 'Network error: Network Error') {
						// 	this.alertModal2.dialog = true
						// 	this.alertModal2.text = '수신이 원활하지 않습니다. 관리자에게 문의 하세요.'
						// } else if ({ err }.err.graphQLErrors.length !== 0) {
						// 	if ({ err }.err.graphQLErrors[0].extensions.exception.data.data[0].messages[0].id === 'Auth.form.error.blocked') {
						// 		this.iderrorMessages = 'Block된 아이디 입니다. 관리자에게 문의 하세요.'
						// 		this.pwerrorMessages = 'Block된 아이디 입니다. 관리자에게 문의 하세요.'
						// 		this.alertModal2.dialog = true
						// 		this.alertModal2.text = 'Block된 아이디 입니다. 관리자에게 문의 하세요.'
						// 	} else if (
						// 		{ err }.err.graphQLErrors[0].extensions.exception.data.data[0].messages[0].id === 'Auth.form.error.password.wrong'
						// 	) {
						// 		let trial = { err }.err.graphQLErrors[0].extensions.exception.data.data[0].messages[0].message
						// 		this.pwerrorMessages = `패스워드가 정확하지 않습니다. (${trial}/5)`
						// 	} else {
						// 		this.iderrorMessages = '아이디 혹은 비밀번호가 정확하지 않습니다.'
						// 		this.pwerrorMessages = '아이디 혹은 비밀번호가 정확하지 않습니다.'
						// 	}
						// } else {
						// 	alert('네트워크오류입니다.')
						// }
					})
			}
		},
		toFindPasswod() {
			this.$router.push({ name: 'findPassword' }).catch(() => {})
		},
		toSignup() {
			this.$router.push({ name: 'signup' }).catch(() => {})
		},
	},
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
.loginMainTitle {
	width: 208px;
	height: 132px;
	font-family: Inter;
	font-size: 50px;
	font-weight: 800;
	line-height: 1.3;
	letter-spacing: normal;
	text-align: left;
	color: #fff;
}

.loginSubTitle {
	width: 215px;
	height: 21px;
	font-family: Inter;
	font-size: 16px;
	font-weight: 300;
	line-height: 0.94;
	letter-spacing: normal;
	text-align: left;
	color: #fff;
}

.login_text {
	font-family: MalgunGothic;
	font-size: 25px;
	font-weight: bold;
	text-align: left;
	color: #3e7ccc;
}

.AdminLoginButton {
	width: 402px;
	height: 70px;
	border-radius: 2px;
	color: #3e7ccc;
}

.test002 {
	width: 402px !important;
}
.test001 {
	width: 402px !important;
	.v-input__control {
		.v-input__slot {
			width: 402px;
		}
	}
}

.loginSpan {
	width: 60px;
	height: 27px;
	font-family: MalgunGothic;
	font-size: 20px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.2;
	letter-spacing: normal;
	text-align: center;
	color: #fff;
}
</style>
