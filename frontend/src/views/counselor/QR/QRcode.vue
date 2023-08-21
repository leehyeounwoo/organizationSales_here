<template>
	<v-dialog v-model="dialogQr.open" persistent content-class="qr-modal" max-width="400">
		<v-layout class="qr-header px-8" :style="`background-color:${$store.state.primary2}; height:60px;`" align-center>
			<div class="main-title ml-0 pl-0"><v-icon class="mr-1" dark> mdi-qrcode-scan </v-icon>출퇴근 QR코드</div>
			<div class="main-title mr-0">
				{{ dialogQr.meData.name }}
			</div>
		</v-layout>
		<div class="qr-layout px-10" wrap>
			<div class="qr_name mt-8">
				{{
					$moment()
						.locale('ko')
						.format('YYYY년 MM월DD일 (ddd) HH:mm:ss')
				}}
			</div>
			<div class="qr_name mt-1 point6--text" :key="key">
				유효시간
				<span style="font-size: 20px;"> {{ key }}</span
				>초 남음
			</div>
			<vue-qrcode :value="dialogQr.code" class="qr-code" />
			<div class="qr_info">QR리더기에 스캔하면,</div>
			<div class="qr_info mb-8">출/퇴근 등록이 완료 됩니다.</div>

			<v-btn
				class="mb-10"
				style="font-weight:bold;"
				color="primary2"
				dark
				depressed
				rounded
				width="120"
				height="40"
				@click="dialogQr.open = false"
				block
			>
				확인
			</v-btn>
		</div>
		<sweetAlert
			:dialog="sweetInfo"
			@close_active="
				() => {
					;(this.key = 10), (dialogQr.open = false)
				}
			"
		/>
	</v-dialog>
</template>
<script>
import VueQrcode from 'vue-qrcode'
import { sweetAlert } from '@/components'
export default {
	props: {
		dialogQr: Object,
	},
	components: {
		VueQrcode,
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
			key: 10,
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
	},
	watch: {
		dialogQr: {
			deep: true,
			handler() {
				if (this.dialogQr.open) {
					let keyTimes = setInterval(() => {
						this.key -= 1
						if (!this.dialogQr.open) {
							this.key = 10
							clearInterval(keyTimes)
						}
						if (this.key <= 0) {
							clearInterval(keyTimes)
							return this.open_disable_dialog({ title: '출(퇴)근 등록', content: '사용이 만료된 QR코드 입니다. \nQR코드를 다시 여세요.' })
						}
					}, 1000)
				}
			},
		},
	},
}
</script>
<style lang="scss">
.qr-code {
	width: 100%;
}
.qr-text {
	font-size: 14px;
	color: #828282;
}
.qr-modal {
	background-color: white;
	border-radius: 0 0 41px 41px !important;
	padding: 0px;
}
.qr-header {
	height: 50px;
	.main-title {
		padding-left: 30px;
		color: white;
		font-size: 14px;
		font-weight: bold;
		margin-right: auto;
	}
}
</style>
