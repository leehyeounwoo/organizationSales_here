<template>
	<div class="qus-card">
		<!-- <v-layout class="mx-4 mb-2">
			<v-flex xs12>
				<v-layout align-center class="question-text">
					<div class="mr-4 mt-1">
						기본 수집 항목
					</div>
					<v-checkbox
						class="mt-0 mr-6 checkbox-set"
						hide-details
						v-model="$store.state.check_name"
						label="실명"
						color="MainColor2"
						@click="dafalutActive('name')"
					></v-checkbox>
					<v-checkbox
						small
						class="mt-0 mr-6 checkbox-set"
						hide-details
						v-model="$store.state.check_location"
						label="지역"
						color="MainColor2"
						@click="dafalutActive('location')"
					></v-checkbox>
					<v-checkbox
						small
						class="mt-0 mr-6 checkbox-set"
						hide-details
						v-model="$store.state.check_age"
						label="연령"
						color="MainColor2"
						@click="dafalutActive('age')"
					></v-checkbox>
					<v-checkbox
						small
						class="mt-0 mr-6 checkbox-set"
						hide-details
						v-model="$store.state.check_sex"
						label="성별"
						color="MainColor2"
						@click="dafalutActive('sex')"
					></v-checkbox>
				</v-layout>
			</v-flex>
		</v-layout> -->
		<v-layout wrap>
			<div v-for="(element, index) in $store.state.questions" :key="index" class="px-2 main-Qus" style="width:100%;">
				<!-- <v-layout wrap align-center>
					<v-flex xs12 class="question-text">
						<v-layout align-center class="mb-2">
							· 문항 {{ index + 1 }}
							<v-spacer />
							<div class="text-center">
								<div>
									<v-btn
										class="contentArrow"
										color="grey"
										outlined
										elevation="0"
										width="14"
										height="14"
										x-small
										icon
										@click="upContent(index)"
									>
										<v-icon color="black">mdi-chevron-up</v-icon>
									</v-btn>
								</div>
								<div>
									<v-btn
										class="contentArrow"
										color="grey"
										outlined
										width="14"
										height="14"
										icon
										x-small
										elevation="0"
										@click="downContent(index)"
									>
										<v-icon color="black">mdi-chevron-down</v-icon>
									</v-btn>
								</div>
							</div>
						</v-layout>
					</v-flex>
				</v-layout> -->
				<div>
					<v-layout
						:class="i === element.qusDatas.length - 1 ? 'pa-0' : 'pa-0 table_all_gray'"
						wrap
						:style="
							i === element.qusDatas.length - 1
								? 'min-height:40px; '
								: i === element.qusDatas.length - 2
								? 'min-height:40px; '
								: 'min-height:40px; '
						"
						v-for="(data, i) in element.qusDatas"
						:key="i"
					>
						<v-layout>
							<v-flex xs6 style="'text-align:center; width:80px; font-size:13px; height:32px; padding-top:7px;'" class="mr-1">
								<txtField
									class="pt-0 bizInput"
									v-model="data.title.txtfield.value"
									:txtField="data.title.txtfield"
									style="height:27px; margin:auto"
								></txtField>
							</v-flex>
							<v-flex xs3 class="pr-1" style="padding-top:7px; align-items: center !important;">
								<select-box :sel="data.title.selectBox" :disable="data.title.fixed" @change="change_Qus(index, i)"></select-box>
							</v-flex>
							<v-flex xs3 class="requirdStatus">
								<v-checkbox
									class="checkbox-set"
									v-model="data.title.required"
									small
									hide-details
									:disabled="data.title.fixed"
									label="필수"
								></v-checkbox>
								<!-- <v-radio-group v-model="data.title.radio" row class="pl-1 mt-0 system-radio-label" hide-details>
									<v-radio color="MainColor2" label="필수" :value="true"></v-radio>
									<v-radio color="MainColor2" label="선택" :value="false"></v-radio>
								</v-radio-group> -->
							</v-flex>
							<!-- <v-flex
								xs9
								class="sub_text table_right_white"
								:style="
									i === element.qusDatas.length - 1
										? 'border-left:none; padding-left:8px; padding-right:16px; !important'
										: 'padding:0 8px;'
								"
							>
								<v-layout wrap align-center style="height:100%">
									<v-flex xs6 class="pr-1" style="padding-top:10px;" v-if="data.selectBox && element.type === 'content'">
										<select-box :sel="data.selectBox" @change="change_Qus(index, i)"></select-box>
									</v-flex>

									<v-flex :xs6="data.selectBox" :xs12="!data.selectBox" align-self-center class="pr-1" v-if="data.txtfield">
										<txtField
											class="pt-0 bizInput"
											v-model="data.txtfield.value"
											:txtField="data.txtfield"
											style="height:27px; margin:auto"
										></txtField>
									</v-flex>
									<v-flex xs6 v-if="i === 0 && element.qusDatas[0].selectBox.value !== '파일업로드(jpg, png, pdf)'">
										<v-radio-group v-model="data.radio" row class="pl-1 mt-0 system-radio-label" hide-details>
											<v-radio color="MainColor2" label="필수" :value="true"></v-radio>
											<v-radio color="MainColor2" label="선택" :value="false"></v-radio>
										</v-radio-group>
									</v-flex>
									<v-flex
										xs12
										v-if="
											data.lists &&
												(element.qusDatas[0].selectBox.value === '객관식(단일선택)' ||
													element.qusDatas[0].selectBox.value === '객관식(복수선택)')
										"
									>
										<v-layout v-for="(list, listIndex) in data.lists" :key="listIndex">
											<v-flex xs11 align-self-center>
												<txtField class="pt-0 bizInput" v-model="list.value" :txtField="list" style="height:27px; margin:auto"></txtField>
											</v-flex>
											<v-flex xs1 class="pl-1">
												<div>
													<v-btn icon @click="removeList(i, listIndex, index)">
														<v-icon>mdi-close</v-icon>
													</v-btn>
												</div>
											</v-flex>
										</v-layout>
										<v-layout>
											<v-btn text color="MainColor2" @click="addContent(i, index)" class="addContent">
												+ 보기추가
											</v-btn>
											<v-btn
												v-if="element.qusDatas[i].lists.filter(x => x.value === '기타').length === 0"
												text
												color="MainColor2"
												class="addContent"
												@click="addEtcContent(i, index)"
											>
												+ 기타 보기 추가
											</v-btn>
										</v-layout>
									</v-flex>
								</v-layout>
							</v-flex> -->
						</v-layout>
						<v-layout v-for="(list, listIndex) in data.content" :key="listIndex" style="width:100%;">
							<v-flex xs11 align-self-center>
								<txtField
									class="pt-0 bizInput"
									v-model="list.txtfield.value"
									:txtField="list.txtfield"
									style="height:27px; margin:auto"
								></txtField>
							</v-flex>
							<v-flex v-if="data.content.length > 1" xs1 class="pl-1">
								<div>
									<v-btn :disabled="data.title.fixed" icon @click="removeList(i, listIndex, index)">
										<v-icon>mdi-close</v-icon>
									</v-btn>
								</div>
							</v-flex>
						</v-layout>
						<v-layout v-if="data.content.length !== 0" style="width:100%;">
							<v-btn :disabled="data.title.fixed" text color="MainColor2" @click="addContent(i, index)" class="addContent">
								옵션추가
							</v-btn>
							<!-- <v-btn
								v-if="data.content.filter(x => x.txtfield.value === '기타').length === 0"
								text
								color="MainColor2"
								class="addContent"
								@click="addEtcContent(i, index)"
							>
								기타추가
							</v-btn> -->
						</v-layout>
					</v-layout>
				</div>
				<v-divider></v-divider>
				<v-layout align-center class="my-3">
					<v-btn class="contentArrow mr-1" color="grey" outlined width="14" height="14" icon x-small @click="downContent(index)">
						<v-icon color="black">mdi-chevron-down</v-icon>
					</v-btn>
					<v-btn class="contentArrow" color="grey" outlined width="14" height="14" x-small icon @click="upContent(index)">
						<v-icon color="black">mdi-chevron-up</v-icon>
					</v-btn>
					<v-spacer></v-spacer>
					<btn btn_txt="복제" :btn="addBtn2" @click="copyQus(index)" class="mr-2" />
					<btn
						btn_txt="삭제"
						:disabled="element.qusDatas[0].title.fixed"
						:btn="addBtn"
						v-if="$store.state.questions.length > 1"
						@click="clickDelete(index)"
					/>
				</v-layout>
			</div>
		</v-layout>

		<v-btn class="detail_apply_btn mr-2 mb-4" small @click="addQusBtn()" :color="'#9A9C9B'" depressed block>문항추가</v-btn>
		<alertModal :setdialog="alertModal2" :clickDeleteBtnModal="deleteCategoryAndDetail" />
		<alertModal :setdialog="alertModal3" :clickDeleteBtnModal="deleteCategoryDetail" />
		<alertModal2 :setdialog="alertModal" />
	</div>
</template>

<script>
import { selectBox, btn, txtField } from '@/components/index.js'
import AlertModal from './dialog/alertModal.vue'
import AlertModal2 from './dialog/alertModal2.vue'

export default {
	components: {
		btn,
		AlertModal,
		AlertModal2,
		selectBox,
		txtField,
	},
	props: {
		draggableDisable: Boolean,
		questions: Array,
		originData: Array,
		inputBoxData: Object,
		modifySwitch: Boolean,
		// save: Function,
	},
	data() {
		return {
			qusDatas: [
				{
					title: {
						// 설문 질문
						txtfield: {
							value: '',
							maxlength: '255',
							outlined: true,
							hideDetail: true,
							errorMessage: '',
							autocomplete: 'off',
							placeholder: '직접입력',
						},
						// 설문타입
						selectBox: {
							value: '목록 선택박스',
							disable: true,
							errorMessage: '',
							hideDetail: true,
							items: ['단답 입력', '긴문장 입력', '단일 선택', '다중 선택', '목록 선택박스', '파일 업로드'],
							inputItems: [],
							outlined: true,
							class: 'small_font bizInput',
							placeholder: '유형',
						},
						required: true,
						fixed: false,
					},
					content: [
						{
							txtfield: {
								value: '',
								maxlength: '255',
								outlined: true,
								hideDetail: true,
								errorMessage: '',
								autocomplete: 'off',
								placeholder: '직접입력',
							},
						},
					],
				},

				// {
				// 	title: '분류(필수)',
				// 	txtfieldTitle: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '직접입력',
				// 	},
				// 	txtfield: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '직접입력',
				// 	},
				// 	selectBox: {
				// 		value: '',
				// 		disable: false,
				// 		errorMessage: '',
				// 		hideDetail: true,
				// 		items: [],
				// 		inputItems: [],
				// 		outlined: true,
				// 		class: 'small_font bizInput',
				// 		placeholder: '유형',
				// 	},
				// },
				// {
				// 	title: '질문(필수)',
				// 	txtfieldTitle: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '직접입력',
				// 	},
				// 	txtfield: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '메인 질문내용',
				// 	},
				// },
				// {
				// 	title: '설명(선택)',
				// 	txtfieldTitle: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '직접입력',
				// 	},
				// 	txtfield: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '질문내용 보충 텍스트',
				// 	},
				// },
				// {
				// 	title: '보기',
				// 	txtfieldTitle: {
				// 		value: '',
				// 		maxlength: '255',
				// 		outlined: true,
				// 		hideDetail: true,
				// 		errorMessage: '',
				// 		autocomplete: 'off',
				// 		placeholder: '직접입력',
				// 	},
				// 	lists: [
				// 		{
				// 			type: 'text',
				// 			value: '',
				// 			required: true,
				// 			maxlength: '255',
				// 			outlined: true,
				// 			hideDetail: true,
				// 			errorMessage: '',
				// 			autocomplete: 'off',
				// 			placeholder: '',
				// 		},
				// 		{
				// 			type: 'text',
				// 			value: '',
				// 			required: true,
				// 			maxlength: '255',
				// 			outlined: true,
				// 			hideDetail: true,
				// 			errorMessage: '',
				// 			autocomplete: 'off',
				// 			placeholder: '',
				// 		},
				// 		{
				// 			type: 'text',
				// 			value: '',
				// 			required: true,
				// 			maxlength: '255',
				// 			outlined: true,
				// 			hideDetail: true,
				// 			errorMessage: '',
				// 			autocomplete: 'off',
				// 			placeholder: '',
				// 		},
				// 	],
				// },
			],
			choiceSel: false,
			panel: [],
			alertModal: {
				dialog: false,
				text: '',
			},
			alertModal2: {
				dialog: false,
				text: '질문을 삭제 하시겠습니까?',
			},
			alertModal3: {
				dialog: false,
				text: '선택지를 삭제 하시겠습니까?',
			},
			deleteDetailTargetIdx: '', // 선택지 삭제시, 질문 Index 값 임시 저장
			deleteDetailTargetIdx2: '', // 선택지 삭제시, 선택지 Index 값 임시 저장
			deleteTargetId: '', // 질문 삭제시 ID 임시 저장
			deleteTargetEx: [], // 질문 삭제시 EX(category_details) 임시 저장
			timeQuestionId: '', // 달력/시간 질문 삭제시, 시간 질문의 ID 임시 저장
			picker: {
				date: '',
				errorMessage: '',
				allowedDates: '',
			},
			selectedTime: '',
			timeData: [],
			uploadImagesOptions: {
				max: 3,
				uploadMsg: '이미지를 등록해주세요.',
				fileError: '이미지 파일만 등록 할 수 있습니다.',
			},
			addBtn2: {
				class: 'makingBtn',
				small: true,
				width: '70px',
				color: 'primary',
			},
			addBtn: {
				dark: true,
				color: 'error',
				small: true,
				width: '70px',
				outlined: true,
			},

			questionType: ['라디오버튼', '체크박스', '셀렉트박스', '텍스트필드', '파일업로드'],
			tagType: ['기타', '관심', '연령', '성별', '지역', '자본'],
			questionStatus: ['사용', '미사용'],
		}
	},
	created() {
		setTimeout(() => {}, 1000)
		if (this.$store.state.questions.length === 0) {
			// let qusData = JSON.parse(JSON.stringify(this.qusDatas))
			this.$store.state.questions = [
				{
					qusDatas: [
						{
							title: {
								// 설문 질문
								txtfield: {
									value: '고객상태',
									maxlength: '255',
									outlined: true,
									hideDetail: true,
									disable: true,
									errorMessage: '',
									autocomplete: 'off',
									placeholder: '직접입력',
								},
								// 설문타입
								selectBox: {
									value: '목록 선택박스',
									disabled: true,
									errorMessage: '',
									hideDetail: true,
									items: ['단답 입력', '긴문장 입력', '단일 선택', '다중 선택', '목록 선택박스', '파일 업로드'],
									inputItems: [],
									outlined: true,
									class: 'small_font bizInput',
									placeholder: '유형',
								},
								required: true,
								fixed: true,
							},
							content: [
								{
									txtfield: {
										value: 'DB등록',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: '상담대기',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: '상담완료',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: '계약가망',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: '계약완료',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
							],
						},
					],
				},
				{
					qusDatas: [
						{
							title: {
								// 설문 질문
								txtfield: {
									value: '고객성향',
									maxlength: '255',
									disable: true,
									outlined: true,
									hideDetail: true,
									errorMessage: '',
									autocomplete: 'off',
									placeholder: '직접입력',
								},
								// 설문타입
								selectBox: {
									value: '단일 선택',
									disabled: true,
									errorMessage: '',
									hideDetail: true,
									items: ['단답 입력', '긴문장 입력', '단일 선택', '다중 선택', '목록 선택박스', '파일 업로드'],
									inputItems: [],
									outlined: true,
									class: 'small_font bizInput',
									placeholder: '유형',
								},
								required: true,
								fixed: true,
							},
							content: [
								{
									txtfield: {
										value: 'S',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: 'A',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: 'B',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: 'C',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
								{
									txtfield: {
										value: 'D',
										maxlength: '255',
										disable: true,
										outlined: true,
										hideDetail: true,
										errorMessage: '',
										autocomplete: 'off',
										placeholder: '직접입력',
									},
								},
							],
						},
					],
				},
			]

			// {
			// 	qusDatas: {
			// 		title: {
			// 			// 설문 질문
			// 			txtfield: {
			// 				value: '',
			// 				maxlength: '255',
			// 				outlined: true,
			// 				hideDetail: true,
			// 				errorMessage: '',
			// 				autocomplete: 'off',
			// 				placeholder: '직접입력',
			// 			},
			// 			// 설문타입
			// 			selectBox: {
			// 				value: '목록 선택박스',
			// 				disable: false,
			// 				errorMessage: '',
			// 				hideDetail: true,
			// 				items: ['단답 입력', '긴문장 입력', '단일 선택', '다중 선택', '목록 선택박스', '파일 업로드'],
			// 				inputItems: [],
			// 				outlined: true,
			// 				class: 'small_font bizInput',
			// 				placeholder: '유형',
			// 			},
			// 			required: true,
			// 			fixed: true,
			// 		},
			// 		content: [
			// 			{
			// 				txtfield: {
			// 					value: '',
			// 					maxlength: '255',
			// 					outlined: true,
			// 					hideDetail: true,
			// 					errorMessage: '',
			// 					autocomplete: 'off',
			// 					placeholder: '직접입력',
			// 				},
			// 			},
			// 		],
			// 	},
			// },
			// {
			// 	qusDatas: {
			// 		title: {
			// 			// 설문 질문
			// 			txtfield: {
			// 				value: '',
			// 				maxlength: '255',
			// 				outlined: true,
			// 				hideDetail: true,
			// 				errorMessage: '',
			// 				autocomplete: 'off',
			// 				placeholder: '직접입력',
			// 			},
			// 			// 설문타입
			// 			selectBox: {
			// 				value: '목록 선택박스',
			// 				disable: false,
			// 				errorMessage: '',
			// 				hideDetail: true,
			// 				items: ['단답 입력', '긴문장 입력', '단일 선택', '다중 선택', '목록 선택박스', '파일 업로드'],
			// 				inputItems: [],
			// 				outlined: true,
			// 				class: 'small_font bizInput',
			// 				placeholder: '유형',
			// 			},
			// 			required: true,
			// 			fixed: true,
			// 		},
			// 		content: [
			// 			{
			// 				txtfield: {
			// 					value: '',
			// 					maxlength: '255',
			// 					outlined: true,
			// 					hideDetail: true,
			// 					errorMessage: '',
			// 					autocomplete: 'off',
			// 					placeholder: '직접입력',
			// 				},
			// 			},
			// 		],
			// 	},
			// },
		}
	},
	methods: {
		// dafalutActive(val) {
		// 	let qusData = JSON.parse(JSON.stringify(this.qusDatas))
		// 	if (val === 'name') {
		// 		qusData[0].selectBox.value = '주관식'
		// 		qusData[1].txtfield.value = '이름'
		// 		qusData[2].txtfield.value = '고객님의 정확한 실명을 입력해주세요.'
		// 	} else if (val === 'location') {
		// 		qusData[0].selectBox.value = '주관식'
		// 		qusData[1].txtfield.value = '지역'
		// 		qusData[2].txtfield.value = '고객님의 현재 거주지역을 선택해 주세요.'
		// 	} else if (val === 'age') {
		// 		qusData[0].selectBox.value = '객관식(단일선택)'
		// 		qusData[1].txtfield.value = '나이'
		// 		qusData[2].txtfield.value = '고객님의 연령대를 선택해 주세요.'
		// 		const datas = ['20대', '30대', '40대', '50대', '60대 이상']
		// 		let listsArray = []
		// 		for (let index = 0; index < datas.length; index++) {
		// 			listsArray.push({
		// 				type: 'text',
		// 				value: datas[index],
		// 				required: true,
		// 				maxlength: '255',
		// 				outlined: true,
		// 				hideDetail: true,
		// 				errorMessage: '',
		// 				autocomplete: 'off',
		// 				placeholder: '',
		// 			})
		// 		}
		// 		qusData[4].lists = listsArray
		// 	} else if (val === 'sex') {
		// 		qusData[0].selectBox.value = '객관식(단일선택)'
		// 		qusData[1].txtfield.value = '성별'
		// 		qusData[2].txtfield.value = '고객님의 성별을 선택해 주세요.'
		// 		const datas = ['남자', '여자']
		// 		let listsArray = []
		// 		for (let index = 0; index < datas.length; index++) {
		// 			listsArray.push({
		// 				type: 'text',
		// 				value: datas[index],
		// 				required: true,
		// 				maxlength: '255',
		// 				outlined: true,
		// 				hideDetail: true,
		// 				errorMessage: '',
		// 				autocomplete: 'off',
		// 				placeholder: '',
		// 			})
		// 		}
		// 		qusData[4].lists = listsArray
		// 	}
		// 	if (this.$store.state.questions.map(x => x.type).indexOf(val) === -1) {
		// 		this.$store.state.questions.push({
		// 			type: val,
		// 			qusDatas: qusData,
		// 		})
		// 	} else {
		// 		const index = this.$store.state.questions.map(x => x.type).indexOf(val)
		// 		this.$store.state.questions.splice(index, 1)
		// 	}
		// },
		copyQus(index) {
			const clone = JSON.parse(JSON.stringify(this.$store.state.questions[index].qusDatas))
			clone[0].title.fixed = false
			this.$store.state.questions.push({
				qusDatas: clone,
			})
		},
		addContent(i, index) {
			this.$store.state.questions[index].qusDatas[i].content.push({
				txtfield: {
					value: '',
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					autocomplete: 'off',
					placeholder: '직접입력',
				},
			})
		},
		// addEtcContent(i, index) {
		// 	this.$store.state.questions[index].qusDatas[i].content.push({
		// 		txtfield: {
		// 			value: '기타',
		// 			maxlength: '255',
		// 			readonly: true,
		// 			outlined: true,
		// 			hideDetail: true,
		// 			errorMessage: '',
		// 			autocomplete: 'off',
		// 			placeholder: '직접입력',
		// 		},
		// 	})
		// },
		removeList(i, listIndex, index) {
			if (this.$store.state.questions[index].qusDatas[i].content.length > 1) {
				this.$store.state.questions[index].qusDatas[i].content.splice(listIndex, 1)
				// this.questions[index].qusDatas[i].content.splice(listIndex, 1)
			}
		},
		change_Qus(index, i) {
			// '파일 업로드','단답 입력', '긴문장 입력'
			if (
				this.$store.state.questions[index].qusDatas[i].title.selectBox.value === '파일 업로드' ||
				this.$store.state.questions[index].qusDatas[i].title.selectBox.value === '단답 입력' ||
				this.$store.state.questions[index].qusDatas[i].title.selectBox.value === '긴문장 입력'
			) {
				this.$store.state.questions[index].qusDatas[i].content = []
			} else {
				this.$store.state.questions[index].qusDatas[i].content = []
				this.$store.state.questions[index].qusDatas[i].content.push({
					txtfield: {
						value: '',
						maxlength: '255',
						outlined: true,
						hideDetail: true,
						errorMessage: '',
						autocomplete: 'off',
						placeholder: '직접입력',
					},
				})
			}
			// if (i === 1) {
			// 	const systemsDatasIndex = this.$store.state.systemsDatas
			// 		.map(x => x.title)
			// 		.indexOf(this.$store.state.questions[index].qusDatas[i].selectBox.value)
			// 	const data = this.$store.state.systemsDatas[systemsDatasIndex]
			// 	this.$store.state.questions[index].qusDatas[0].selectBox.value = data.selectType ? data.selectType : '객관식(단일선택)'
			// 	this.$store.state.questions[index].qusDatas[i].txtfield.value = data.title
			// 	let list = []
			// 	for (let index = 0; index < data.content.length; index++) {
			// 		list.push({
			// 			type: 'text',
			// 			value: data.content[index].value,
			// 			required: true,
			// 			maxlength: '255',
			// 			outlined: true,
			// 			hideDetail: true,
			// 			errorMessage: '',
			// 			autocomplete: 'off',
			// 			placeholder: '',
			// 		})
			// 	}
			// 	this.$store.state.questions[index].qusDatas[4].lists = list
			// }
		},
		upContent(i) {
			if (i !== 0) {
				const arr = this.$store.state.questions
				const item = arr.splice(i, 1)
				arr.splice(i - 1, 0, item[0])
			}
		},
		downContent(i) {
			const data = this.$store.state.questions
			if (i !== data.length - 1) {
				var selectData = data.splice(i, 1)
				data.splice(i + 1, 0, selectData[0])
			}
		},
		openOnly(index) {
			let find = this.panel.indexOf(index)
			if (find === -1) {
				this.panel.push(index)
			}
		},
		// 변경 사항 모두 바로 적용돼서 화면에 보이게 refresh
		applyAll() {
			document.getElementsByClassName('check-underline-circle-outline')[0].click()
		},
		detailsSave(index) {
			for (let index = 0; index < this.$store.state.questions.length; index++) {
				let element = this.$store.state.questions[index]
				let prevData = ''
				for (let idx = 0; idx < element.ex.length; idx++) {
					let e = element.ex[idx].content
					if (prevData === e) {
						alert(index + 1 + '번째 문항에 중복된 선택지가 있습니다.')
						idx = element.ex.length
						index = this.$store.state.questions.length
						this.$store.state.loading = false
						return
					} else {
						prevData = e
					}
				}
			}
			// 추가된 선택지 확인 후, 생성
			let detailcode = []
			if (this.$store.state.questions[index].ex.length > this.originData[index].category_details.length) {
				const newEx = this.$store.state.questions[index].ex.filter(x => {
					return x.id === ''
				})
				newEx.forEach((obj, i) => {
					const data = {
						groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
						code: this.originData[index].code,
						detailcode: Math.random()
							.toString(36)
							.substring(2, 11),
						detailname: obj.content,
						listorder: this.$store.state.questions[index].ex.length + i,
						stat: 1,
						category: this.originData[index].id,
					}
					detailcode.push(data.detailcode)
					this.$store
						.dispatch('createCategoryDetail', data)
						.then(res => {
							this.originData[index].category_details.push({
								code: res.data.createCategoryDetail.categoryDetail.code,
								detailcode: res.data.createCategoryDetail.categoryDetail.detailcode,
								detailname: res.data.createCategoryDetail.categoryDetail.detailname,
								groupcode: res.data.createCategoryDetail.categoryDetail.groupcode,
								id: res.data.createCategoryDetail.categoryDetail.id,
								listorder: res.data.createCategoryDetail.categoryDetail.listorder,
								stat: res.data.createCategoryDetail.categoryDetail.stat,
								_typename: 'CategoryDetail',
							})

							// 선택지 비교 후, 업데이트
							this.alertModal.text = '선택지 상태가 저장 되었습니다.'
							this.alertModal.dialog = true
						})
						.catch(() => {})
				})
			} else {
				// 선택지 비교 후, 업데이트
				this.updateCategoryDetail(index)

				this.alertModal.text = '선택지 상태가 저장 되었습니다.'
				this.alertModal.dialog = true
			}
		},
		updateCategoryDetail(index) {
			this.originData[index].category_details.forEach((obj, i) => {
				if (obj.detailname !== this.$store.state.questions[index].ex[i].content) {
					const data = {
						id: this.$store.state.questions[index].ex[i].id,
						detailname: this.$store.state.questions[index].ex[i].content,
						groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
					}
					this.$store
						.dispatch('updateCategoryDetail', data)
						.then(() => {})
						.catch(err => {
							console.log({ err })
						})
				}
			})
		},

		deleteCategoryAndDetail() {
			const data = {
				id: this.deleteTargetId,
				groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
			}
			this.$store
				.dispatch('deleteCategory', data)
				.then(() => {
					this.alertModal2.dialog = false
					this.deleteTargetId = ''

					if (this.timeQuestionId === '') {
						this.applyAll()
					} else {
						// 삭제하는 질문의 타입이 달력/시간인 경우
						const targetData = {
							id: this.timeQuestionId,
						}
						this.$store
							.dispatch('deleteCategory', targetData)
							.then(() => {
								this.timeQuestionId = ''
								this.applyAll()
							})
							.catch(() => {})
					}
				})
				.catch(err => {
					console.log(err)
				})
			if (this.deleteTargetEx.length > 0) {
				this.deleteTargetEx.forEach((obj, index) => {
					const data = {
						id: obj.id,
						groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
					}
					this.$store
						.dispatch('deleteCategoryDetail', data)
						.then(() => {
							if (index + 1 === this.deleteTargetEx.length) {
								this.deleteTargetEx = []
							}
						})
						.catch(() => {})
				})
			}
		},
		// 질문 생성 버튼
		addQusBtn() {
			let qusData = JSON.parse(JSON.stringify(this.qusDatas))
			// qusData[1].selectBox.items = this.$store.state.systemsDatas.map(x => x.title)
			this.$store.state.questions.push({
				qusDatas: qusData,
			})
		},
		// 질문 삭제 버튼 --> questions 어레이에 해당 요소 삭제
		clickDelete(index) {
			this.$store.state.questions.splice(index, 1)
			// this.questions.splice(index, 1)
		},
		deleteCategoryDetail() {
			// let detailCode
			const data = {
				id: this.$store.state.questions[this.deleteDetailTargetIdx].ex[this.deleteDetailTargetIdx2].id,
				groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
			}
			const groupCode = {
				groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
			}
			this.$store
				.dispatch('categoryDetails', groupCode)
				.then(() => {
					// detailCode =
					// 	res.data.categoryDetails[
					// 		res.data.categoryDetails.findIndex(
					// 			x => x.id === this.questions[this.deleteDetailTargetIdx].ex[this.deleteDetailTargetIdx2].id,
					// 		)
					// 	].detailcode
					setTimeout(() => {
						this.$store
							.dispatch('deleteCategoryDetail', data)
							.then(() => {
								this.$store.state.questions[this.deleteDetailTargetIdx].ex.splice(this.deleteDetailTargetIdx2, 1)
								this.originData[this.deleteDetailTargetIdx].category_details.splice(this.deleteDetailTargetIdx2, 1)
								this.alertModal3.dialog = false
								this.alertModal.text = '선택지가 삭제되었습니다.'
								this.alertModal.dialog = true
							})
							.catch(err => {
								console.log(err)
							})
					}, 500)
				})
				.catch(err => {
					console.log({ err })
				})
		},
	},
}
</script>

<style lang="scss">
.main-Qus {
	width: 100%;
	border: 1px solid #e1e1e1;
	background-color: white;
	border-radius: 6px;
	margin-bottom: 20px;
}
.status-text-green {
	.v-select__selection {
		color: #4caf50 !important;
	}
}
.status-text-red {
	.v-select__selection {
		color: #ff5252 !important;
	}
}
.question-text {
	cursor: pointer;
	font-size: 13px;
	font-weight: bold;
}
.able {
	pointer-events: none !important;
}
.qus-card {
	overflow-x: hidden;
	overflow-y: auto;
	height: 70vh;
	padding: 8px;
	background-color: #f9f9fb !important;
}
.sortable-ghost {
	/* background-color: #fdc85a; */
	background-color: #ffe1a4;
}
.questions-time-table {
	width: 300px;
	margin-left: 200px;
}
.makingBtn {
	color: white !important;
}
.requirdStatus.xs3 > div {
	margin-top: 0;
}
.flex.requirdStatus.xs3 > div > div > div > div > i {
	font-size: 17px;
}
.requirdStatus > div > div > div > label {
	font-size: 12px;
}
.flex.requirdStatus.xs3 > div > div > div > div {
	margin-right: 0px;
}

.flex.requirdStatus.xs3 > div > div > div {
	margin-top: 4px;
}
.flex.requirdStatus.xs3 > div > div > div > div > i {
	margin-top: 2px;
}

.theme--dark.v-btn.v-btn--disabled {
	color: #1b1a1a4d !important;
}
</style>
