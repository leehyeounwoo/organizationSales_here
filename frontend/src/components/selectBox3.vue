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
		@change="$emit('change')"
		@click="$emit('click')"
		:disabled="disable"
		:item-color="sel.itemColor ? sel.itemColor : $store.state.PointColor1"
		:color="sel.color ? sel.color : $store.state.PointColor1"
	>
	</v-select>
	<!-- style="min-height:30px;" -->
</template>

<script>
export default {
	props: {
		sel: Object,
		disable: Boolean,
	},
	methods: {},
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
</style>
