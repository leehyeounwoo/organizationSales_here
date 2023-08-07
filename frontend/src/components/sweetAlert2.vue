<template>
	<sweet-modal
		class="copymodal"
		:class="changeModalClass(dialog.modalIcon)"
		:icon="dialog.modalIcon"
		ref="modal"
		:title="dialog.title"
		hide-close-button
		blocking
	>
		<div class="select_wrap" style="white-space: pre-line;">
			<v-layout justify-center align-center class="my-2">
				<txtField v-model="dialog.addcopy.value" :txtField="dialog.addcopy" class="copy_txt"></txtField>
				<div>으로</div>
			</v-layout>
			<v-layout justify-center align-center>
				<div v-if="dialog.buttonType === 'twoBtn'">{{ dialog.copyBefore }}</div>
				<div v-if="dialog.buttonType === 'oneBtn'">{{ dialog.copyAfter }}</div>
			</v-layout>
		</div>

		<v-layout class="sweet_btn mt-5 mb-3" justify-center>
			<v-btn elevation="0" class="mr-3" v-if="dialog.buttonType === 'twoBtn'" color="#C5C5C5" @click="close()">{{
				dialog.cancelBtnText
			}}</v-btn>
			<v-btn elevation="0" v-if="dialog.buttonType === 'twoBtn'" color="#323153" @click="$emit('click', $event)">{{
				dialog.saveBtnText
			}}</v-btn>
			<v-btn elevation="0" v-if="dialog.buttonType === 'oneBtn'" color="#323153" style="width:175px" @click="close()">확인</v-btn>
		</v-layout>
	</sweet-modal>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import txtField from './txtField.vue'

export default {
	components: {
		SweetModal,
		txtField,
	},
	props: {
		dialog: {
			type: Object,
			default() {
				return {
					modalIcon: '',
					addcopy: {
						value: '',
						// maxlength: '255',
						// outlined: true,
						// hideDetail: true,
						// errorMessage: '',
						// autocomplete: 'off',
					},
				}
			},
		},
	},
	data() {
		return {
			modal: this.$refs.modal,
			modalclose: false,
		}
	},
	watch: {
		dialog: {
			deep: true,
			handler() {
				if (this.dialog.open) {
					this.$refs.modal.open()
				} else this.$refs.modal.close()
			},
		},
	},
	methods: {
		close() {
			this.$refs.modal.close()
			this.dialog.open = false
		},
		changeModalClass(val) {
			if (val === 'success') return 'success_modal'
			else if (val === 'warning') return 'warning'
			else if (val === '') return ''
		},
	},
}
</script>

<style lang="scss">
.copymodal {
	.sweet-modal {
		width: 430px !important;
		height: 370px !important;
		text-align: center;
		&.sweet-title {
			padding: 0;
			border-bottom: none;
			margin-top: 8px !important;
			h2 {
				font-size: 20px;
				font-weight: bold;
			}
		}
	}
}
.v-application .mx-12 {
	margin-right: 81px !important;
}
.copy_select {
	min-height: 26px !important;
	.v-input__control {
		.v-input__slot {
			width: 202px !important;
			margin-left: auto !important;
			margin-right: 10px !important;
		}
	}
}
.copy_txt {
	.v-input__slot {
		width: 202px !important;
		margin-right: 10px !important;
	}
}
.sweet_btn {
	.theme--light.v-btn {
		width: 85px;
		height: 26px !important;
		color: #fff;
	}
}
</style>
