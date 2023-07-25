<template>
	<v-select
		v-model="sel.value"
		:outlined="true"
		:items="sel.items"
		:label="sel.label"
		:class="sel.class"
		dense
		:multiple="sel.multiple"
		:error-messages="''"
		:hide-details="true"
		@change="$emit('change', $event)"
		@click="$emit('click', $event)"
		style="min-height:36px;"
		:disabled="disable"
		:placeholder="sel.placeholder"
		:item-color="sel.itemColor ? sel.itemColor : $store.state.PointColor1"
		:color="sel.color ? sel.color : $store.state.PointColor1"
		:return-object="sel.returnObject"
		:item-text="sel.itemText"
		:item-value="sel.itemValue"
		:readonly="sel.readonly"
	>
	</v-select>
</template>

<script>
export default {
	props: {
		sel: Object,
		change: Function,
		disable: Boolean,
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
