<template>
	<v-select
		:value="value"
		:outlined="sel.outlined"
		:items="items"
		:label="sel.label"
		:class="sel.class"
		dense
		:multiple="sel.multiple"
		:prepend-icon="sel.prependicon"
		:error-messages="sel.errorMessage"
		:hide-details="sel.hideDetail"
		@change="$emit('change', $event)"
		@click="$emit('click', $event)"
		style="min-height:36px;"
		:return-object="sel.returnObject"
		:disabled="disable"
		:readonly="readonly"
		:placeholder="sel.placeholder"
		:item-color="sel.itemColor ? sel.itemColor : $store.state.PointColor1"
		:color="sel.color ? sel.color : $store.state.PointColor1"
		:item-text="sel.itemText"
		:item-value="sel.itemValue"
	>
	</v-select>
</template>

<script>
export default {
	props: {
		value: String,
		items: Array,
		sel: Object,
		change: Function,
		disable: Boolean,
		readonly: Boolean,
	},
	methods: {
		changeDummy() {},
	},
}
</script>

<style>
.counselorpage {
	background: none !important;
}
.selectNum {
	background: none !important;
	font-weight: bold;
}
.selectNum .v-input__control .v-input__slot {
	padding: 0px 0px 0px 7px !important;
}
</style>
