<template>
	<v-dialog v-model="setdialog.open" persistent content-class="qr-modal" max-width="400">
		<v-layout class="qr-header" :style="`background-color:${$store.state.primary2}`" align-center>
			<div class="main-title">
				{{ setdialog.title }}
			</div>
			<v-btn icon @click="setdialog.open = false" dark class="pr-8">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<div class="qr-layout px-10" wrap>
			<div class="delete_subtitle mt-9">
				{{ setdialog.subtitle }}
			</div>
			<div class="delete_explanation mt-1">
				{{ setdialog.explanation }}
			</div>
			<v-textarea
				filled
				hideDetails
				height="130"
				class="mt-2 small_textarea"
				dense
				no-resize
				v-model="setdialog.content"
				color="primary2"
				background-color="#f3f3f3"
			></v-textarea>
			<div class="mb-10 mt-7">
				<v-btn
					class="mr-3"
					style="font-weight:bold;"
					color="#c4c4c4"
					dark
					depressed
					rounded
					width="120"
					height="40"
					@click="setdialog.open = false"
				>
					취소
				</v-btn>

				<v-btn class="" style="font-weight:bold;" color="primary2" dark depressed rounded width="120" height="40" @click="deleteActive()">
					확인
				</v-btn>
			</div>
		</div>
	</v-dialog>
</template>
<script>
export default {
	props: {
		setdialog: Object,
		deleteActive: Function,
	},
	components: {},
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
