<template>
	<v-dialog v-model="setdialog.open" persistent content-class="qr-modal" max-width="400">
		<v-layout align-center class="px-4" :style="`background-color:${$store.state.primary2}; height:60px;`">
			<div class="white--text body">물건 홀딩 요청</div>
			<v-spacer></v-spacer>
			<div class="white--text body">
				승인전
			</div>
		</v-layout>
		<div class="qr-layout px-4" wrap>
			<div style="font-size: 14px;" class="text-left mt-4 mb-2">요청물건</div>
			<datatable :datatable="setdialog.datatable" class="front-datatable mb-2" />
			<strong>
				<div class="text-left point4--text" style="font-size: 12px;">
					관리자의 승인이 필요합니다.<br />
					승인 완료시 [홀딩 요청] 버튼이 [홀딩중]으로 표시됩니다.<br />
					승인 거절시 [홀딩 요청] 버튼이 [미승인]으로 표시됩니다.<br />
				</div>
			</strong>

			<div class="my-6">
				<v-layout>
					<v-flex xs5>
						<v-btn
							class="mr-3"
							style="width:100%; font-weight:bold;"
							color="#c4c4c4"
							dark
							depressed
							rounded
							height="40"
							@click="setdialog.open = false"
						>
							취소
						</v-btn>
					</v-flex>
					<v-spacer></v-spacer>
					<v-flex xs5>
						<v-btn
							class=""
							style="width:100%; font-weight:bold;"
							color="primary2"
							dark
							depressed
							rounded
							height="40"
							@click="$emit('click', $event)"
						>
							<v-icon>mdi-check</v-icon>
							확인
						</v-btn>
					</v-flex>
				</v-layout>
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
