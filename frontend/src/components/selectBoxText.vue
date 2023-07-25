<template>
	<v-select
		v-model="sel.value"
		:outlined="sel.outlined"
		:items="sel.items"
		:label="sel.label"
		:class="sel.class"
		dense
		:prepend-icon="sel.prependicon"
		:error-messages="sel.errorMessage"
		:hide-details="sel.hideDetail"
		@change="$emit('change', $event)"
		@click="$emit('click', $event)"
		style="min-height:36px;"
		:disabled="disable"
		:item-color="sel.itemColor ? sel.itemColor : $store.state.PointColor1"
		:color="sel.color ? sel.color : $store.state.PointColor1"
		:placeholder="sel.placeholder"
		:item-text="sel.itemText"
		:item-value="sel.itemValue"
		:return-object="sel.returnObject"
	>
		<template v-if="sel.filter" v-slot:prepend-item>
			<v-list-item>
				<v-text-field hide-details filled @input="searchFruit" rounded placeholder="search" class="px-2 pb-2" />
			</v-list-item>
			<v-divider class=""></v-divider>
		</template>
	</v-select>
</template>

<script>
export default {
	name: 'selectBoxText',
	props: {
		sel: Object,
		change: Function,
		searchFruit: {
			type: Function,
			default: () => 1,
		},
		disable: Boolean,
	},
	methods: {
		changeDummy() {},
	},
	computed: {
		comma(val) {
			return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
		},
	},
	filters: {
		// comma(val) {
		// 	return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
		// },
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
