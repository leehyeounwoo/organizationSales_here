<template>
	<v-dialog v-model="dialog.open" :return-value.sync="date" persistent width="400">
		<v-layout :style="`background-color:${$store.state.primary}; height:45px`" align-center justify-end>
			<v-btn icon @click="dialog.open = false" dark>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<v-layout class="pt-8 pa-4" style=" background-color:white">
			{{ dialog.content }}
		</v-layout>
		<v-layout class="pa-4" style="background-color:white" align-center justify-end>
			<v-btn v-if="dialog.activeBtn" elevation="0" height="40" width="100" class="ml-3" color="primary" @click="activeSave()">
				{{ dialog.btnTxt }}</v-btn
			>
			<v-btn v-if="dialog.cancelBtn" class="ml-3" outlined height="40" width="100" @click="dialog.open = false">
				{{ dialog.cancelBtnTxt }}
			</v-btn>
		</v-layout>
	</v-dialog>
</template>

<script>
export default {
	props: {
		dialog: {
			type: Object,
			default: () => {
				return {
					open: false,
					content: '',
					btnTxt: '저장',
					activeBtn: true,
					cancelBtn: false,
				}
			},
		},
		activeSave: Function,
	},

	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
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
</style>
