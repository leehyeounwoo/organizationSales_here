<template>
	<v-dialog v-model="setdialog.open" persistent content-class="qr-modal" max-width="400">
		<v-layout align-center class="px-10" :style="`background-color:${$store.state.primary2}; height:60px;`">
			<div class="white--text body">물건 홀딩 요청</div>
			<v-spacer></v-spacer>
			<div class="white--text body">
				승인전
			</div>
		</v-layout>
		<div class="qr-layout px-10" wrap>
			<div style="font-size: 14px;" class="text-left mt-4 mb-2">요청물건</div>
			<datatable :datatable="setdialog.datatable" class="front-datatable mb-2" />
			<strong>
				<div class="text-left point4--text" style="font-size: 12px;">
					관리자의 승인이 필요합니다.<br />
					승인 완료시 [홀딩 요청] 버튼이 [홀딩중]으로 표시됩니다.<br />
					승인 거절시 [홀딩 요청] 버튼이 [미승인]으로 표시됩니다.<br />
					[미승인] 버튼을 클릭하면 초기화 됩니다.<br />
				</div>
			</strong>

			<div class="my-6">
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

				<v-btn
					class=""
					style="font-weight:bold;"
					color="primary2"
					dark
					depressed
					rounded
					width="120"
					height="40"
					@click="$emit('click', $event)"
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
