<template>
	<v-select
		v-model="current_value.value"
		:outlined="sel.outlined"
		:items="items"
		:label="sel.label"
		:class="sel.class"
		dense
		:placeholder="placeholder"
		:prepend-icon="sel.prependicon"
		:error-messages="sel.errorMessage"
		:hide-details="sel.hideDetail"
		@change="$emit('change', $event)"
		@click="$emit('click', $event)"
		style="min-height:36px;"
		:disabled="disable"
		:item-color="sel.itemColor ? sel.itemColor : $store.state.PointColor1"
		:color="sel.color ? sel.color : $store.state.PointColor1"
	>
	</v-select>
</template>

<script>
export default {
	name: 'selectBox_qus_name',
	props: {
		// sel: Object,
		change: Function,
		disable: Boolean,
		items: Array,
		placeholder: String,
		current_value: Object,
	},
	methods: {
		changeDummy() {},
	},
	data() {
		return {
			sel: {
				value: '목록 선택박스',
				disable: false,
				errorMessage: '',
				hideDetail: true,
				inputItems: [],
				outlined: true,
				class: 'small_font bizInput',
				placeholder: '유형',
			},
		}
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
