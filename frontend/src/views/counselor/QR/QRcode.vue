<template>
	<v-dialog v-model="dialogQr.open" persistent content-class="qr-modal" max-width="400">
		<v-layout class="qr-header" :style="`background-color:${$store.state.primary2}`" align-center>
			<div class="main-title">
				{{ dialogQr.business.title }}
			</div>
			<v-btn icon @click="dialogQr.open = false" dark class="pr-8">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<div class="qr-layout px-10" wrap>
			<div class="qr_name mt-12">{{ dialogQr.meData.name }} 상담사</div>
			<div class="qr_date mt-1">등 록 일 자 {{ dialogQr.meData.created_at | moment('YYYY. MM. DD') }}</div>
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
			>
				확인
			</v-btn>
		</div>
	</v-dialog>
</template>
<script>
import VueQrcode from 'vue-qrcode'
export default {
	props: {
		dialogQr: Object,
	},
	components: {
		VueQrcode,
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
	border-radius: 0 0px 41px 0px !important;
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
