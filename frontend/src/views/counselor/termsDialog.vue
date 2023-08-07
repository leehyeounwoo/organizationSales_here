<template>
	<v-dialog v-model="dialog.open" persistent content-class="notice-modal" max-width="400">
		<v-layout justify-end>
			<v-btn icon @click="dialog.open = false">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<div class="terms-content">
			{{ content }}
		</div>
	</v-dialog>
</template>
<script>
export default {
	props: { dialog: Object },
	data() {
		return {
			content: '',
		}
	},
	created() {},
	methods: {},
}
</script>
