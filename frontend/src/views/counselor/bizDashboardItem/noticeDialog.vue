<template>
	<v-dialog v-model="dialog.open" persistent content-class="notice-modal" max-width="400">
		<v-layout justify-end>
			<v-btn icon @click="dialog.open = false" color="black">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<v-layout align-center class="mb-4">
			<div class="notice-title" style="width:50px;">제 목</div>
			<div class="notice-title">{{ dialog.title }}</div>
		</v-layout>
		<v-layout align-center class="mb-4">
			<div class="notice-title" style="width:50px;">작성일</div>
			<div class="notice-title">
				{{ dialog.created_at | moment('YYYY-MM-DD HH:mm:ss') }}
			</div>
		</v-layout>
		<v-layout class="mb-4">
			<div class="notice-title" style="width:50px;">내용</div>
			<div class="notice-title ml-2" style="max-height:186px; overflow-y:auto; width:100%;" v-html="dialog.content"></div>
		</v-layout>
		<v-layout align-center class="mb-8" v-if="dialog.file.name">
			<div class="notice-title" style="width:50px;">첨부파일</div>
			<div class="notice-title cursor" @click="download">{{ dialog.file.name }}</div>
		</v-layout>
	</v-dialog>
</template>
<script>
export default {
	props: {
		dialog: Object,
	},
	methods: {
		download() {
			const url = process.env.VUE_APP_BACKEND_URL + this.dialog.file.url
			const link = document.createElement('a')
			link.href = url
			link.target = '_blank'
			link.download = this.dialog.file.name
			link.click()
			link.remove()
			window.URL.revokeObjectURL(url)
		},
	},
}
</script>
