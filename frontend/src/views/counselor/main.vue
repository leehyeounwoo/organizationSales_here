<template>
	<v-container>
		<v-layout wrap justify-center>
			<v-layout class="login_background_t" flex-wrap justify-center>
				<v-layout style="max-width:768px; padding:0px 10px;" wrap justify-center>
					<div>
						<div class="text-center" style="margin: 0 auto; max-width:375px;">
							<div class="mt-12">
								<v-img src="/image/counselor_login_0.png"></v-img>
							</div>
							<div style="font-weight:400; font-size:12px;" class="mt-2 text-left">
								<span style="color: #ff6f00;">Notice</span> <br />
								<br />
								처음 접속하신 분은 <strong>[신규등록]</strong> 버튼을 클릭하시고<br />
								사용자 정보를 등록하시기 바랍니다.<br />
								정보 등록시 <strong>프로필 사진, 통장 사본</strong> 첨부가 필요하며<br />
								<strong>사업자이신 경우 사업자 등록증</strong>이 추가로 필요합니다,<br />
								<br />
								이미 등록하신 분은 <strong>[로그인]</strong> 버튼을 클릭하세요.
							</div>
							<v-btn elevation="0" height="40" class="loginButton_small mt-7" block color="#F6F2E9" @click="goto1">
								<span class="pb-1" style="font-size:14px; font-weight:normal;"> 신규등록 </span>
							</v-btn>
							<v-btn elevation="0" height="40" class="loginButton_small" block color="primary2" @click="goto2">
								<span style="color:white;	font-weight: bold;"> 로그인 </span>
							</v-btn>
						</div>
					</div>
				</v-layout>
			</v-layout>
		</v-layout>
	</v-container>
</template>
<script>
export default {
	methods: {
		goto1() {
			this.$router.push({ name: 'counselorRegister' })
		},
		goto2() {
			this.$router.push({ name: 'counselorLogin' })
		},
	},
}
</script>
