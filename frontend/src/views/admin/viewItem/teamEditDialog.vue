<template>
	<v-dialog persistent v-model="setdialog.dialog" width="50%">
		<div class="create_wrap">
			<div class="project_title px-5">
				<span style="font-size:15px">팀/직급 관리</span>
				<v-spacer />
				<v-icon @click="modalClose" class="title-icon" color="white">mdi-close</v-icon>
			</div>
			<v-layout wrap class="pt-7 px-10" style="min-height:50vh;">
				<v-flex xs6 pr-1>
					<v-layout class="pb-3" align-center>
						<div class="slash mr-1"></div>
						<span style="font-weight:bold">팀 관리</span>
					</v-layout>
					<v-layout align-center class="right_table_header">
						<v-flex xs4 style="">No.</v-flex>
						<v-flex xs4 style="">팀명</v-flex>
						<v-flex xs4 style="">사용여부</v-flex>
					</v-layout>
					<v-layout px-1 align-center v-for="(left, idx) in left_data" :key="idx" class="manageTable">
						<v-flex xs4 style="">{{ idx + 1 }}</v-flex>
						<v-flex xs4 align-self-center style="">
							<txtField class="bizInput px-2" v-model="left.value" :txtField="left.txtfield1"></txtField>
						</v-flex>
						<v-flex xs4 align-self-center style="">
							<selectBox :sel="left.selectBox" style="font-size:13px; align-items: center;"></selectBox>
						</v-flex>
					</v-layout>
					<v-layout
						align-center
						style="
						border-bottom: 1px solid #c8c8c8;
						border-left: 1px solid #c8c8c8;
						border-right: 1px solid #c8c8c8;
					"
						py-2
					>
						<v-flex xs6>
							<txtField class="bizInput px-2" v-model="addTxtfield.value" :txtField="addTxtfield"></txtField>
						</v-flex>
						<v-flex xs3 pr-1>
							<btn :btn="addBtn" :btn_txt="'추가'" @click="addTeam(addTxtfield.value)"></btn>
						</v-flex>
						<v-flex xs3 pr-1>
							<btn :btn="saveBtn" :btn_txt="'적용'" @click="teamCheck()"></btn>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-flex xs6 pr-1>
					<v-layout class="pb-3" align-center>
						<div class="slash mr-1"></div>
						<span style="font-weight:bold">직급 관리</span>
					</v-layout>
					<v-layout align-center class="right_table_header">
						<v-flex xs4 style="">No.</v-flex>
						<v-flex xs4 style="">직급명</v-flex>
						<v-flex xs4 style="">사용여부</v-flex>
					</v-layout>
					<v-layout px-1 align-center v-for="(right, idx) in right_data" :key="idx" class="manageTable">
						<v-flex xs4 style="">{{ idx + 1 }}</v-flex>
						<v-flex xs4 align-self-center style="">
							<txtField class="bizInput px-2" v-model="right.value" :txtField="right.txtfield1"></txtField>
						</v-flex>
						<v-flex xs4 align-self-center style="">
							<selectBox :sel="right.selectBox" style="font-size:13px; align-items: center;"></selectBox>
						</v-flex>
					</v-layout>
					<v-layout
						align-center
						style="
	border-bottom: 1px solid #c8c8c8;
	border-left: 1px solid #c8c8c8;
	border-right: 1px solid #c8c8c8;
"
						py-2
					>
						<v-flex>
							<txtField class="bizInput px-2" v-model="addTxtfield1.value" :txtField="addTxtfield1"></txtField>
						</v-flex>
						<v-flex pr-1>
							<btn :btn="addBtn" :btn_txt="'추가'" @click="addRank(addTxtfield1.value)"></btn>
						</v-flex>
						<v-flex pr-1>
							<btn :btn="saveBtn" :btn_txt="'적용'" @click="rankCheck()"></btn>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-layout justify-end class="mt-2 mb-5">
					<v-flex xs1>
						<btn :btn="completeBtn" :btn_txt="'확인'" @click="setdialog.dialog = false"></btn>
					</v-flex>
				</v-layout>
			</v-layout>
		</div>
		<sweetAlert :dialog="sweetDialog2" @click="applyTeam" />
		<sweetAlert :dialog="sweetDialog3" @click="applyRank" />
	</v-dialog>
</template>

<script>
import { txtField, selectBox, btn, sweetAlert } from '@/components/index.js'

export default {
	props: {
		setdialog: Object,
		left_data: Array,
		right_data: Array,
		addTeam: Function,
		addRank: Function,
		applyTeam: Function,
		applyRank: Function,
		sweetDialog2: Object,
		sweetDialog3: Object,
	},
	components: {
		txtField,
		selectBox,
		btn,
		sweetAlert,
	},
	data() {
		return {
			addBtn: {
				class: '',
				classtxt: '',
				width: '100%',
				dense: true,
				small: true,
				color: '#323153',
				tile: true,
				dark: true,
			},
			saveBtn: {
				class: '',
				classtxt: '',
				width: '100%',
				dense: true,
				small: true,
				color: '#3e7ccc',
				tile: true,
				dark: true,
				frontIconMdi: true,
				frontIconSize: 'small',
				frontIconColor: 'white',
				frontBtn_icon: 'mdi-check',
			},
			completeBtn: {
				class: '',
				classtxt: '',
				width: '100%',
				dense: true,
				small: true,
				color: '#3e7ccc',
				tile: true,
				dark: true,
			},
			selectBox: {
				value: '사용',
				items: ['사용', '미사용'],
				hideDetail: true,
				outlined: true,
				class: 'small_font bizInput',
			},
			addTxtfield: {
				value: '',
				maxlength: '255',
				outlined: true,
				hideDetail: true,
				errorMessage: '',
			},
			addTxtfield1: {
				value: '',
				maxlength: '255',
				outlined: true,
				hideDetail: true,
				errorMessage: '',
			},
			// right_data: [
			// {
			// 	number: 1,
			// 	value: '',
			// 	txtfield1: {
			// 		maxlength: '255',
			// 		outlined: true,
			// 		hideDetail: true,
			// 		errorMessage: '',
			// 	},
			// },
			// ],
			editTimePicker: {
				dialog: false,
				start: '',
				end: '',
			},
		}
	},
	methods: {
		modalClose() {
			this.addTxtfield.value = ''
			this.addTxtfield1.value = ''
			this.setdialog.dialog = false
		},
		rankCheck() {
			this.sweetDialog3.open = true
		},
		teamCheck() {
			this.sweetDialog2.open = true
		},
		edit_time() {
			this.editTimePicker.dialog = true
		},
		save_time(picker) {
			this.editTimePicker.dialog = false
			this.setdialog.items[2].worktime.start = picker
		},
	},
}
</script>

<style lang="scss">
.table_font {
	text-align: center;
	font-size: 13px;
	font-weight: bold;
}
.table_all_gray:nth-last-child(1) {
	margin-bottom: 50px;
}
.table_all_gray:nth-last-child(6) {
	border-top: 1px solid black;
}
.biz_table_right {
	border-left: 1px solid #c8c8c8;
}
.new_biz_btn {
	width: 75px !important;
	height: 26px !important;
	padding: 0 10px !important;
	background: #f0f2f8 !important;
	font-size: 12px !important;
	font-weight: normal;
	border-radius: 0 !important;
	border: 1px solid #cfdcdd;
}
.file_btn {
	width: 115px !important;
	height: 26px !important;
	padding: 0 10px !important;
	background: #fff !important;
	font-size: 12px !important;
	font-weight: normal;
	border-radius: 0 !important;
	border: 1px solid #9a9c9b;
}
.file_sample {
	min-width: unset !important;
	width: 32px !important;
	font-size: 13px !important;
	color: black !important;
	background-color: white !important;
	border: 1px solid #9a9c9b !important;
	padding: 0px !important;
	height: 26px !important;
}
.sample_span {
	font-size: 12px;
	font-weight: normal;
	color: #2a5e34;
	text-decoration: underline;
	cursor: pointer;
}
.right_table_header {
	border-top: 1px solid black;
	border-right: 1px solid #c8c8c8;
	border-bottom: 1px solid #c8c8c8;
	border-left: 1px solid #c8c8c8;
	text-align: center;
	background: #f0f2f8;
	height: 50px;
	font-size: 13px;
	font-weight: bold;
}
.manageTable {
	text-align: center;
	height: 50px;
	font-size: 14px;
	border-bottom: 1px solid #c8c8c8;
	border-left: 1px solid #c8c8c8;
	border-right: 1px solid #c8c8c8;
}
// .save_biz {
// 	width: 100px !important;
// 	height: 26px !important;
// 	padding: 0 10px !important;
// 	font-weight: bold;
// 	color: white !important;
// 	background: #3e7ccc !important;
// 	border-radius: 0 !important;
// }
.etc_btn {
	height: 26px !important;
	padding: 0 !important;
	background: #f0f2f8 !important;
	font-size: 12px !important;
	font-weight: normal;
	border-radius: 0 !important;
	border: 1px solid #cfdcdd;
}
.worktime_picker {
	.v-icon.v-icon {
		color: #009dac;
	}
	.v-input__slot {
		padding: 0 8px !important;
	}
	.v-input__append-inner {
		margin-top: 3px !important;
	}
}
</style>
