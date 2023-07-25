<template>
	<div>
		<v-text-field
			:maxlength="txtField.maxlength"
			:label="txtField.label"
			:disabled="txtField.disable"
			:readonly="txtField.readonly"
			:value="value"
			:error-messages="txtField.errorMessage"
			:success-messages="txtField.SuccessMessage"
			:hide-details="txtField.hideDetail"
			:outlined="txtField.outlined"
			@input="$emit('input', $event)"
			:type="txtField.type"
			:persistent-hint="txtField.persistentHint"
			:hint="txtField.hint"
			:clearable="txtField.clearable"
			:prepend-inner-icon="txtField.prependinnericon"
			:color="txtField.color ? txtField.color : $store.state.PointColor1"
			:background-color="txtField.backCol"
			:autofocus="txtField.autofocus"
			:placeholder="txtField.placeholder"
			autocomplete="new-password"
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
			<!-- :autocomplete="txtField.autocomplete" -->
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
