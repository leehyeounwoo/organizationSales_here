<template>
	<v-dialog v-model="setdialog.dialog" max-width="300px">
		<v-time-picker v-model="picker">
			<v-btn text @click="$emit('click', picker)">확인</v-btn>
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
