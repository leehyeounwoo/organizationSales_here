<template>
	<v-dialog persistent v-model="setdialog.dialog" width="90%">
		<div class="create_wrap">
			<div class="project_title px-5">
				<span style="font-size:15px">사업지 관리</span>
				<v-spacer />
				<v-icon @click="setdialog.dialog = false" class="title-icon" color="white">mdi-close</v-icon>
			</div>
			<v-layout class="pt-7 px-10">
				<v-flex xs5 class="mr-12">
					<v-layout class="pb-3" align-center>
						<div class="slash mr-1"></div>
						<span style="font-weight:bold">사업지 기본정보</span>
					</v-layout>
					<v-layout
						class="table_all_gray"
						wrap
						v-for="(left, index) in setdialog.items"
						:key="index"
						style="min-height:50px; border-bottom:1px solid #c8c8c8; border-left:1px solid #c8c8c8; border-right:1px solid #c8c8c8"
					>
						<v-flex xs3 align-self-center class="table_font">{{ left.title }}</v-flex>
						<v-flex xs9 v-if="left.type === 'txtfield'" class="table_right_white px-2 biz_table_right">
							<v-flex xs6>
								<txtField class="pt-3 bizInput" v-model="left.value" :txtField="left.txtfield" style="height:27px; margin:auto"></txtField>
							</v-flex>
						</v-flex>
						<v-flex xs9 v-else-if="left.type === 'time'" class="table_right_white px-2 biz_table_right">
							<v-flex xs6 class="pt-3">
								<v-layout>
									<v-flex xs6 @click="edit_time">
										<v-text-field
											v-model="left.worktime.start"
											outlined
											dense
											readonly
											hide-details="true"
											append-icon="mdi-calendar"
											class="worktime_picker small_font bizInput"
										></v-text-field>
									</v-flex>
									<div class="px-1">~</div>
									<v-flex xs6 @click="edit_time">
										<v-text-field
											v-model="left.worktime.end"
											outlined
											dense
											readonly
											hide-details="true"
											append-icon="mdi-calendar"
											class="worktime_picker small_font bizInput"
										></v-text-field>
									</v-flex>
								</v-layout>
							</v-flex>
							<timePickerDialog :setdialog="editTimePicker" @click="save_time" />
						</v-flex>
						<v-flex xs9 v-else-if="left.type === 'selectBox'" class="table_right_white px-2 biz_table_right">
							<v-flex class="pt-3" xs7>
								<v-layout>
									<v-flex xs4>
										<selectBox :sel="left.selectBox" style="font-size:13px"></selectBox>
									</v-flex>
									<div class="pt-1 mx-2" style="font-size:12px">단위 / 최대</div>
									<v-flex xs4>
										<selectBox :sel="left.selectBox2" style="font-size:13px"></selectBox>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-flex>
						<v-flex xs9 v-else-if="left.type === 'scan'" class="table_right_white px-2 biz_table_right">
							<v-flex xs8>
								<v-layout class="pt-3">
									<txtField class="bizInput" v-model="left.value" :txtField="left.txtfield" style="height:27px; margin:auto"></txtField>
									<v-flex>
										<v-btn elevation="0" class="ml-2 new_biz_btn">주소복사</v-btn>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-flex>
						<v-flex xs9 v-else-if="left.type === 'product'" class="table_right_white px-2 biz_table_right">
							<v-flex xs9>
								<v-layout wrap class="pt-3">
									<v-flex xs8>
										<txtField class="bizInput" v-model="left.value" :txtField="left.txtfield" style="height:27px; margin:auto"></txtField>
									</v-flex>
									<v-flex xs4>
										<v-btn elevation="0" class="ml-2 file_btn">
											<v-img max-width="14" class="mr-1" src="@/assets/images/input_btn.png" />파일 업로드
										</v-btn>
									</v-flex>
									<v-flex xs12 align-self-center class="py-2">
										<v-btn class="file_sample" depressed>
											<v-img max-width="22" src="@/assets/images/excel-img2.png" />
										</v-btn>
										<span class="sample_span ml-2">등록양식 다운받기</span>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-flex xs7>
					<v-layout class="pb-3" align-center>
						<div class="slash mr-1"></div>
						<span style="font-weight:bold">관리자 설정</span>
					</v-layout>
					<v-layout align-center class="right_table_header">
						<v-flex style="max-width:50px !important">No.</v-flex>
						<v-flex style="max-width:126px !important">이름</v-flex>
						<v-flex style="max-width:136px !important">연락처</v-flex>
						<v-flex style="max-width:136px !important">아이디</v-flex>
						<v-flex style="max-width:136px !important">비밀번호</v-flex>
						<v-flex>비고</v-flex>
					</v-layout>
					<div style="height:250px; overflow:auto">
						<v-layout align-center v-for="(right, idx) in right_data" :key="idx" class="right_table_item">
							<v-flex style="max-width:50px !important; width:50px">{{ right.number }}</v-flex>
							<v-flex align-self-center style="max-width:126px !important">
								<txtField class="bizInput px-2" v-model="right.value" :txtField="right.txtfield1"></txtField>
							</v-flex>
							<v-flex align-self-center style="max-width:136px !important">
								<txtField class="bizInput px-2" v-model="right.value" :txtField="right.txtfield2"></txtField>
							</v-flex>
							<v-flex align-self-center style="max-width:136px !important">
								<txtField class="bizInput px-2" v-model="right.value" :txtField="right.txtfield3"></txtField>
							</v-flex>
							<v-flex align-self-center style="max-width:136px !important">
								<txtField class="bizInput px-2" v-model="right.value" :txtField="right.txtfield4"></txtField>
							</v-flex>
							<v-flex>
								<v-layout align-center>
									<v-flex class="pl-3" style="max-width:150px">
										<v-radio-group row class="system-radio-label">
											<v-radio color="#009dac" label="지정" :value="true"></v-radio>
											<v-radio color="#009dac" label="해제" :value="false"></v-radio>
										</v-radio-group>
									</v-flex>
									<v-flex>
										<v-btn elevation="0" class="etc_btn" style="width:60px">적용</v-btn>
									</v-flex>
									<v-flex>
										<v-btn elevation="0" class="etc_btn" style="">계정정보 발송</v-btn>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</div>
					<v-layout justify-end>
						<v-btn class="mt-4 save_biz"><v-icon>mdi-check</v-icon>저장</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
	</v-dialog>
</template>

<script>
import { txtField, selectBox } from '@/components/index.js'
import timePickerDialog from './timePickerDialog.vue'

export default {
	props: {
		setdialog: Object,
	},
	components: {
		txtField,
		selectBox,
		timePickerDialog,
	},
	data() {
		return {
			right_data: [
				{
					number: 1,
					value: '',
					txtfield1: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield2: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield3: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield4: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
				},
				{
					number: 2,
					value: '',
					txtfield1: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield2: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield3: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield4: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
				},
				{
					number: 3,
					value: '',
					txtfield1: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield2: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield3: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield4: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
				},
				{
					number: 4,
					value: '',
					txtfield1: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield2: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield3: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield4: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
				},
				{
					number: 5,
					value: '',
					txtfield1: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield2: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield3: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield4: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
				},
				{
					number: 6,
					value: '',
					txtfield1: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield2: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield3: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
					txtfield4: {
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
					},
				},
			],
			editTimePicker: {
				dialog: false,
				start: '',
				end: '',
			},
		}
	},
	methods: {
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
.right_table_item {
	text-align: center;
	height: 50px;
	font-size: 14px;
	border-bottom: 1px solid #c8c8c8;
	border-left: 1px solid #c8c8c8;
}
.save_biz {
	width: 100px !important;
	height: 26px !important;
	padding: 0 10px !important;
	font-weight: bold;
	color: white !important;
	background: #3e7ccc !important;
	border-radius: 0 !important;
}
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
