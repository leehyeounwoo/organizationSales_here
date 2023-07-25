<template>
	<div>
		<v-text-field
			:maxlength="txtField.maxlength ? txtField.maxlength : '255'"
			:label="txtField.label"
			:disabled="txtField.disable"
			:readonly="txtField.readonly"
			:value="txtField.value"
			:error-messages="''"
			:success-messages="''"
			:hide-details="true"
			:outlined="true"
			@input="$emit('input', $event)"
			:type="txtField.type"
			:color="txtField.color ? txtField.color : $store.state.PointColor1"
			:background-color="'white'"
			:autofocus="false"
			:autocomplete="'off'"
			:placeholder="txtField.placeholder"
			dense
			:max="txtField.max"
			@keyup="$emit('keyup', $event)"
			@keyup.enter="$emit('enter', $event)"
			:oninput="
				txtField.type === 'Number'
					? txtField.maxNumber
						? 'if(Number(this.value) > Number(this.max)) this.value = this.max'
						: 'if(Number(this.value) > Number(this.max)) this.value = null'
					: ''
			"
		>
		</v-text-field>
	</div>
</template>

<script>
export default {
	props: {
		value: String,
		txtField: Object,
		keydownEnter: Function,
	},
}
</script>

<style lang="scss">
.v-input__append-inner {
	.mdi-close {
		margin-bottom: 14px !important;
		font-size: 18px !important;
	}
}
</style>
