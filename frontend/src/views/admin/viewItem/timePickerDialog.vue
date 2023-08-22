<template>
	<v-dialog v-model="setdialog.dialog" max-width="300px">
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="setdialog.time"
				v-on="on"
				outlined
				dense
				readonly
				:disabled="setdialog.disabled"
				hide-details="true"
				append-icon="mdi-calendar"
				class="worktime_picker small_font bizInput"
				@click:append="setdialog.dialog = true"
			></v-text-field>
		</template>
		<v-time-picker v-model="picker" :min="minTime" :max="maxTime">
			<v-btn text @click="$emit('input', picker)">확인</v-btn>
			<v-spacer></v-spacer>
			<v-btn text @click="setdialog.dialog = false">취소</v-btn>
		</v-time-picker>
	</v-dialog>
</template>

<script>
export default {
	props: {
		setdialog: Object,
		minTime: {
			type: String,
			default: '',
		},
		maxTime: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			picker: '',
		}
	},
}
</script>

<style lang="scss">
.worktime_picker {
	.v-input__icon {
		min-width: 15px;
		width: 15px;
	}
	.v-icon.v-icon {
		color: #009dac;
		font-size: 20px;
	}
	.v-input__slot {
		padding: 0 8px !important;
	}
	.v-input__append-inner {
		margin-top: 3px !important;
	}
}
</style>
