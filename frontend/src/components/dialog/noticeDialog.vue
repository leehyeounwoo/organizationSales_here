<template>
	<v-dialog
		:content-class="`confirm_modal py-4`"
		:attach="dialog.noAttach ? false : true"
		v-model="dialog.open"
		persistent
		max-width="350"
		overlay-opacity="0"
		:style="`--marginLeft:${dialog.left}; --marginTop:${dialog.top};`"
	>
		<!-- dialog_wrap -->
		<v-layout align-center justify-center>
			<div class="confirm_header">{{ dialog.title }}</div>
		</v-layout>
		<v-img width="60" style="margin:15px auto 25px;" :src="image_type()"></v-img>
		<v-layout align-center justify-center>
			<span style="text-align:center; width:200px;">{{ dialog.content }}</span>
		</v-layout>
		<v-layout v-if="dialog.oneBtn" align-center justify-center style="margin-top:25px;">
			<v-btn class="confirm_btn" color="#323153" elevation="0" @click="cancle()"><v-icon>mdi-check</v-icon>확인</v-btn>
		</v-layout>
		<v-layout v-else align-center justify-center style="margin-top:25px;">
			<v-btn class="confirm_btn mr-2" color="#C5C5C5" elevation="0" @click="dialog.open = false">취소</v-btn>
			<v-btn class="confirm_btn" color="#323153" elevation="0" @click="save()"><v-icon>mdi-check</v-icon>확인</v-btn>
		</v-layout>
	</v-dialog>
</template>

<script>
export default {
	props: {
		dialog: Object,
	},
	methods: {
		image_type() {
			if (this.dialog.type && this.dialog.type === 'question') {
				return require('@/assets/images/ico/ico_question.png')
			} else if (this.dialog.type && this.dialog.type === 'alert') {
				return require('@/assets/images/ico/ico_exclamation.png')
			} else if (this.dialog.type && this.dialog.type === 'customer_question') {
				return require('@/assets/images/ico/ico_exclamation.png')
			} else {
				return require('@/assets/images/ico/ico_check.png')
			}
		},
		save() {
			this.$emit('click')
		},
		cancle() {
			this.dialog.open = false
		},
	},
}
</script>

<style lang="scss">
.confirm_modal {
	background-color: white;
	border-radius: 6px;
	border: 1px solid #707070;
	position: absolute;
	margin-left: var(--marginLeft);
	margin-top: var(--marginTop);
}
.confirm_header {
	font-size: 18px;
	font-weight: bold;
}
.confirm_btn {
	width: 85px !important;
	height: 26px !important;
	padding: 0 !important;
	font-size: 12px !important;
	font-weight: normal;
	.v-btn__content {
		color: #fff;
	}
}
</style>
