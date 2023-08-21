<template>
	<sweet-modal
		:class="`${changeModalClass(dialog.modalIcon)} ${$vuetify.breakpoint.smAndDown ? 'moblie_sweet' : ''}`"
		:icon="dialog.modalIcon"
		ref="modal"
		:title="dialog.title"
		hide-close-button
		blocking
	>
		<div v-if="dialog.modalValue === 'no'">
			<textarea class="search_box_modal" v-model="dialog.rejectionReason[0].value"> </textarea>
		</div>

		<div style="white-space: pre-line;">
			{{ dialog.content }}
		</div>
		<div style="margin: 0 auto;" class="mt-4 px-4">
			<datatable :datatable="dialog.datatable" class="front-datatable mb-2" />
		</div>
		<strong>
			<div class="explain-text point4--text mt-2 text-left px-4" style="white-space: pre-line;">
				{{ dialog.info1 }}
			</div>
		</strong>
		<strong>
			<div class="explain-text point4--text mb-2 ml-4 text-left px-4" style="white-space: pre-line;">
				{{ dialog.info1_sub }}
			</div>
		</strong>
		<strong>
			<div class="explain-text point4--text mb-2 text-left px-4">
				{{ dialog.info2 }}
			</div>
		</strong>
		<v-layout class="sweet_btn mt-5 mb-5" justify-center>
			<v-btn
				elevation="0"
				class="mr-3"
				:color="dialog.buttonType === 'twoBtn' ? '#C5C5C5' : '#323153'"
				@click="close(), $emit('close_active', $event)"
				>{{ dialog.cancelBtnText }}</v-btn
			>
			<v-btn elevation="0" v-if="dialog.buttonType === 'twoBtn'" color="#323153" @click="$emit('click', $event)"
				><v-icon>mdi-check</v-icon>{{ dialog.saveBtnText }}</v-btn
			>
		</v-layout>
	</sweet-modal>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import datatable from './datatable.vue'
export default {
	components: {
		SweetModal,
		datatable,
	},
	props: {
		dialog: Object,
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
			this.$emit('close')
			if (this.dialog.modalValue === 'no') {
				this.dialog.rejectionReason[0].value = ''
			}
			this.dialog.open = false
		},
		changeModalClass(val) {
			if (val === 'success') return 'success_modal'
			else if (val === 'info') return 'info_modal'
			else if (val === 'warning') return 'warning_modal'
			else if (val === 'error') return 'error_modal'
		},
	},
}
</script>

<style lang="scss">
.sweet-modal-overlay {
	background: rgba(255, 255, 255, 0.7);
	z-index: 200 !important;
}
.sweet-modal {
	width: 390px !important;
	min-height: 330px !important;
	height: auto !important;
	text-align: center;
}
.sweet-modal .sweet-title {
	padding: 0;
	margin-top: 24px;
	border-bottom: none;
	h2 {
		font-size: 20px;
		font-weight: bold;
	}
}
.sweet-modal.is-alert .sweet-content {
	padding: 0;
}
.sweet_btn {
	.theme--light.v-btn {
		width: 85px;
		height: 26px !important;
		color: #fff;
	}
}

.search_box_modal {
	border: 1px solid rgba(0, 0, 0, 0.1);
	height: 200px;
	width: calc(100% - 20%);
	margin: 0 30px 0 30px;
	resize: none;
	overflow-y: hidden;
	font-size: 13px;
}
</style>
