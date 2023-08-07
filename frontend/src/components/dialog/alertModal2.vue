<template>
	<v-dialog v-model="setdialog.dialog" max-width="700px" persistent content-class="common-modal">
		<v-card class="dialogAlert">
			<!-- 내용 -->
			<div class="title" :style="`background-color:${$store.state.PointColor2}`">
				<h2 v-if="$route.name === 'customer'">첨부 이미지</h2>
				<h2 v-else-if="setdialog.calculator">
					문의하기 완료
				</h2>
				<h2 v-else>Alert</h2>
				<v-spacer />
				<!-- icon -->
				<v-icon @click="setdialog.dialog = false" class="title-icon" large>mdi-close</v-icon>
			</div>
			<v-card-text v-if="setdialog.calculator">
				<div class="pa-6" style="font-size:1rem;">
					문의가 완료 되었습니다. <br />
					최대한 빠르게 연락 드리겠습니다.<br />
					빠른 문의를 원하신 때는 실시간 문의를 이용해 주세요.<br />
				</div>
			</v-card-text>
			<div class="dialog-content">
				<div id="divLineBreak"><span v-if="setdialog.reddot === true" class="red-dot">*</span>{{ setdialog.text }}</div>
				<v-carousel height="auto" v-model="model" v-if="$route.name === 'customerManagement'" hide-delimiters show-arrows-on-hover>
					<v-carousel-item v-for="(imgs, i) in $store.state.usersImg" :key="i">
						<v-img :src="imgs"></v-img>
					</v-carousel-item>
				</v-carousel>

				<div v-if="setdialog.done">
					<v-img min-height="130px" class="mb-5" src="/image/end_ok.jpg"></v-img>
					<v-divider class="mb-5" />
					<p class="doneTxt">코로나 예방을 위한 자가 문진표 작성이 완료되었습니다.</p>
				</div>
				<!-- bottom -->
				<!-- 버튼 -->
				<div class="bottom">
					<v-layout justify-end>
						<btn
							btn_txt="Go to unblock"
							class="ml-2"
							:btn="saveBtn"
							@click="toUnblock"
							v-if="setdialog.text === 'this ID is blocked.'"
						></btn>
						<btn :btn_txt="btn_txt ? btn_txt : 'ok'" class="ml-2" :btn="saveBtn" @click="close" v-else></btn>
					</v-layout>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
import { btn } from '@/components/index'
export default {
	data() {
		return {
			saveBtn: {
				dark: true,
				class: 'save',
			},
			model: 0,
		}
	},
	props: {
		btn_txt: String,
		setdialog: Object,
		saveData: Function,
	},
	methods: {
		close() {
			this.setdialog.dialog = false
			if (this.$route.name === 'temperatureCheck' && this.setdialog.text === '') {
				window.open('', '_self').close()
			} else if (this.$route.name === 'mypage' || this.$route.name === 'waitingCheck' || this.$route.name === 'sample1') {
				this.saveData()
			}
		},
		toUnblock() {
			this.$router.push({ name: 'unblock' })
		},
	},
	components: {
		btn,
	},
}
</script>
<style lang="scss" scoped>
.dialogAlert {
	.title {
		height: 60px;
		display: flex;
		align-items: center;
		padding: 0 25px;

		h2 {
			color: white;
		}

		.title-icon {
			color: white;
		}
	}

	.dialog-content {
		padding: 40px;
		font-weight: bold;
	}
	.bottom {
		display: flex;
		margin-top: 20px;
	}
	.doneTxt {
		font-size: 14px;
		font-weight: 500;
	}
}
.red-dot {
	font-size: 24px;
	color: #ff5252;
	margin-right: 10px;
}
#divLineBreak {
	white-space: pre-wrap;
}
</style>
