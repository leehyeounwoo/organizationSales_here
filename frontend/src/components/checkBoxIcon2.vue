<template>
	<v-checkbox
		:label="label"
		:color="color ? color : $store.state.PointColor1"
		:class="check.class"
		:value="label"
		on-icon="mdi-check-circle"
		off-icon="mdi-check-circle-outline"
		dense
		:error-messages="check.errorMessage"
		:hide-details="check.hideDetail"
		@click="$emit('click')"
		:disabled="disable"
		:ripple="false"
	>
	</v-checkbox>
</template>

<script>
export default {
	props: {
		label: String,
		color: String,
		disable: Boolean,
	},
	methods: {
		changeDummy() {},
	},
	data() {
		return {
			check: {
				type: 'text',
				required: true,
				maxlength: '255',
				outlined: true,
				hideDetail: true,
				errorMessage: '',
				autocomplete: 'off',
				placeholder: '',
			},
		}
	},
}
</script>

<style lang="scss">
.sliceCheck {
	margin: -5px 0px 0px 0px !important;
	padding: 0px;
	.v-input__slot {
		align-items: end;
	}

	.v-icon.v-icon--dense {
		font-size: 25px;
	}
	.v-label {
		font-size: 16px;
	}
}
.filterCheckBox {
	// padding: 0px;
	// margin: px !important;
	.v-label {
		font-size: 14px !important;
	}
	.v-input__slot {
		align-items: start;
	}
}
</style>
