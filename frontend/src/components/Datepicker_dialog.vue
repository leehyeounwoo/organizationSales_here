<template>
	<v-dialog v-model="dialog" :return-value.sync="date" persistent width="fit-content">
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-model="picker.date"
				outlined
				:class="picker.class + (disable ? ' disabled_txtField' : '')"
				dense
				:label="picker.label"
				:error-messages="picker.errorMessage"
				append-icon="mdi-calendar"
				readonly
				v-bind="attrs"
				v-on="on"
				:hide-details="picker.hideDetail"
				:disabled="disable"
				@click:append="dialog = true"
				:color="picker.color ? picker.color : $store.state.PointColor1"
			></v-text-field>
		</template>

		<v-date-picker
			v-model="picker.date"
			:multiple="picker.multiple"
			:range="picker.range"
			:allowed-dates="allowed_dates"
			:type="picker.type"
			no-title
			scrollable
			@input="$emit('input'), (dialog = false)"
			@change="$emit('change')"
			:color="picker.color ? picker.color : $store.state.PointColor1"
			locale="ko-kr"
		>
			<v-spacer></v-spacer>
			<v-btn text color="PointColor2" @click="dialog = false">
				Cancel
			</v-btn>
		</v-date-picker>
	</v-dialog>
</template>

<script>
export default {
	props: {
		picker: Object,
		disable: Boolean,
		allowed_dates: Function,
		// disabledata: Function,
	},
	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
			dialog: false,
			off: 0,
		}
	},
	methods: {},
}
</script>

<style lang="scss">
.whiteBack {
	background-color: white;
}
.samplePicker {
	background-color: white;
}

.v-picker__body.v-picker__body--no-title {
	width: 100% !important;
	max-width: 290px;
}
</style>
