<template>
	<v-dialog v-model="setdialog.open" persistent content-class="qr-modal" max-width="400">
		<v-layout align-center class="px-10" :style="`background-color:${$store.state.primary2}; height:60px;`">
			<div class="white--text body">물건 홀딩 현황</div>
			<v-spacer></v-spacer>
			<div class="white--text body">{{ $moment().format('YYYY.MM.DD HH:mm') }} 현재</div>
		</v-layout>
		<div class="qr-layout px-10" wrap>
			<strong>
				<div class="text-left point4--text mt-4 mb-2" style="font-size: 12px;">
					현재시간 기준으로 홀딩된 물건입니다.
				</div>
			</strong>
			<datatable :datatable="setdialog.datatable" class="front-datatable mb-2" />

			<div class="my-6">
				<v-btn
					class=""
					style="font-weight:bold;"
					color="primary2"
					dark
					depressed
					rounded
					block
					width="120"
					height="40"
					@click="setdialog.open = false"
				>
					<v-icon>mdi-check</v-icon>
					확인
				</v-btn>
			</div>
		</div>
	</v-dialog>
</template>
<script>
import datatable from '../datatable.vue'
export default {
	components: {
		datatable,
	},
	props: {
		setdialog: Object,
	},
}
</script>
<style lang="scss">
.front-datatable {
	.v-data-table__wrapper {
		margin-top: 0px !important;
	}
}
</style>
