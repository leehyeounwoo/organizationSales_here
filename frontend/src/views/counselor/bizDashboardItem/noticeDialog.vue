<template>
	<v-dialog v-model="dialog.open" persistent content-class="notice-modal" max-width="400">
		<v-layout class="qr-header px-4" :style="`background-color:${$store.state.primary2}; height:60px;`" align-center>
			<div class="main-title ml-0 pl-0"><v-icon class="mr-1" dark> mdi-notice </v-icon>공지사항</div>
			<v-btn icon @click="dialog.open = false" dark>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<div class="px-4 mt-4 mb-8">
			<v-layout align-center class="mb-1">
				<div class="notice-title" style="width:50px;">제 목</div>
				<div class="notice-title">{{ dialog.title }}</div>
			</v-layout>
			<v-layout align-center class="mb-4">
				<div class="notice-title" style="width:50px;">작성일</div>
				<div class="notice-title">
					{{ dialog.created_at | moment('YYYY-MM-DD HH:mm:ss') }}
				</div>
			</v-layout>
			<v-layout
				pa-2
				class="mb-0"
				style="border:1px solid #999999; height:200px; overflow-y:auto;"
				:style="
					dialog.files.length > 0
						? 'border-radius:10px 10px 0 0; border-bottom:0px;'
						: 'border-radius:10px; border-bottom:1px solid #999999;'
				"
			>
				<div class="notice-title" style="width:50px;">내용</div>
				<div class="notice-title ml-2" style="max-height:186px; overflow-y:auto; width:100%;" v-html="dialog.content"></div>
			</v-layout>
			<v-layout
				pa-2
				align-center
				class="mb-4"
				v-if="dialog.files.length > 0"
				style="border:1px solid #999999; border-radius:0 0 10px 10px;"
			>
				<div class="notice-title" style="width:50px;">첨부파일</div>
				<div class="notice-title cursor" @click="download(file)" v-for="(file, i) in dialog.files" :key="i">{{ file.name }}</div>
			</v-layout>
		</div>
	</v-dialog>
</template>
<script>
export default {
	props: {
		dialog: Object,
	},
	methods: {
		download(file) {
			const url = process.env.VUE_APP_BACKEND_URL + file.url
			const link = document.createElement('a')
			link.href = url
			link.target = '_blank'
			link.download = file.name
			link.click()
			link.remove()
			window.URL.revokeObjectURL(url)
		},
	},
}
</script>
