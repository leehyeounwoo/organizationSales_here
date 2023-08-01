<template>
	<v-dialog v-model="setdialog.dialog" max-width="300px">
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="setdialog.time"
				v-on="on"
				outlined
				dense
				readonly
				hide-details="true"
				append-icon="mdi-calendar"
				class="worktime_picker small_font bizInput"
			></v-text-field>
		</template>
		<v-time-picker v-model="picker">
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
	},
	data() {
		return {
			picker: '',
		}
	},
}
</script>

<style></style>
