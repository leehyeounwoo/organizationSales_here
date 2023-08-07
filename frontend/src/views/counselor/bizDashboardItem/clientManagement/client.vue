<template>
	<div>
		<div v-if="step === '1'" class="px-4 client-card" style="margin-bottom:80px;">
			<v-layout wrap align-center justify-center class="mt-3">
				<v-flex xs12>
					<div style="text-align:center">
						<v-img src="@/assets/images/ico/고객등록.png" width="60" style="display:inline-flex; width:60px;" />
						<p class="tab_title">기본정보입력</p>
					</div>
				</v-flex>
			</v-layout>
			<v-layout align-center class="mt-10">
				<div class="client-subTitle pl-2">
					고객이름
				</div>
			</v-layout>
			<v-layout class="mt-1">
				<v-text-field
					hideDetails
					dense
					:autofocus="false"
					outlined
					maxlength="255"
					flat
					v-model="datas.value1"
					autocomplete="off"
					@input="input_name"
				></v-text-field>
			</v-layout>
			<v-layout align-center class="mt-5">
				<div class="client-subTitle pl-2">
					연락처
				</div>
			</v-layout>
			<v-layout class="mt-1">
				<v-text-field
					dense
					:error-messages="phoneErrorMessage"
					:success-messages="phoneSuccessMessage"
					:autofocus="false"
					outlined
					maxlength="11"
					flat
					:class="phoneErrorMessage ? '' : 'client_text_field_err_none'"
					oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
					v-model="datas.value2"
					:readonly="phoneReadOnly"
					autocomplete="off"
					@input="input_check_phone"
				></v-text-field>
				<v-btn
					v-if="phoneCheck === false"
					color="primary2"
					width="85"
					class="ml-3"
					style="border-radius:20px"
					:disabled="phoneDisabled === false"
					:dark="phoneDisabled"
					@click="click_phone"
				>
					중복확인
				</v-btn>
				<v-btn v-else color="primary2" dark width="95" class="ml-3" style="border-radius:20px" @click="click_phone">
					<v-icon> mdi-check</v-icon> 중복확인
				</v-btn>
			</v-layout>
			<v-layout align-center class="mt-5">
				<div class="client-subTitle pl-2">
					생년월일
				</div>
			</v-layout>
			<v-layout class="mt-1">
				<v-text-field
					hideDetails
					dense
					:autofocus="false"
					outlined
					maxlength="8"
					flat
					type="text"
					oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
					v-model="datas.value3"
					@input="check_birth"
					autocomplete="off"
					placeholder="ex)19900101"
				></v-text-field>
				<!-- :disabled="phoneCheck === false" -->
			</v-layout>
			<v-layout align-center class="mt-5">
				<div class="client-subTitle pl-2">
					거주지
				</div>
			</v-layout>
			<v-layout class="mt-1">
				<v-text-field
					hideDetails
					dense
					:autofocus="false"
					outlined
					maxlength="8"
					flat
					type="text"
					disabled
					v-model="datas.value4"
					autocomplete="off"
				></v-text-field>
				<!-- :disabled="birthCheck === false"
					:dark="birthCheck" -->
				<v-btn color="primary2" width="85" dark class="ml-3" style="border-radius:20px" @click="execDaumPostcode">
					주소찾기
				</v-btn>
			</v-layout>
			<v-layout justify-center>
				<div id="layer" class="my-2" style="display:none;overflow:hidden;-webkit-overflow-scrolling:touch;">
					<!-- <img
						src="//t1.daumcdn.net/postcode/resource/images/close.png"
						id="btnCloseLayer"
						style="cursor:pointer;"
						@click="closeDaumPostcode()"
						alt="닫기 버튼"
					/> -->
				</div>
			</v-layout>
			<v-layout class="mt-2">
				<v-text-field
					id="detail_adress"
					hideDetails
					dense
					:autofocus="false"
					outlined
					flat
					type="text"
					v-model="datas.value5"
					autocomplete="off"
					:disabled="addressCheck === false"
					@input="input_detail_address"
				></v-text-field>
			</v-layout>
		</div>
		<div v-if="step === '2'" style="padding-bottom:80px;">
			<div class="px-4 mb-5 client-card">
				<v-layout wrap align-center justify-center class="mt-3">
					<v-flex xs12>
						<div style="text-align:center">
							<v-img src="@/assets/images/ico/상담물건선택.png" width="60" style="display:inline-flex; width:60px;" />
							<p class="tab_title">관심상품등록</p>
						</div>
					</v-flex>
				</v-layout>
				<div v-for="(product, index) in product_title" :key="product.name">
					<v-layout align-center class="mt-5">
						<div class="client-subTitle pl-2">
							{{ product.name }}
						</div>
					</v-layout>
					<v-layout>
						<div style="width:100%" class="mt-1">
							<v-select
								class="search_select"
								hideDetails
								v-model="product_list['data' + (index + 1)].value"
								:items="product_list['data' + (index + 1)].items"
								outlined
								color="#633efd"
								:placeholder="product.name + '를 선택하세요'"
								@change="click_select(index)"
							></v-select>
						</div>
					</v-layout>
				</div>
				<v-layout align-center class="mt-5" v-if="product_select.length > 1">
					<v-flex>
						<div class="client-subTitle pl-2">선택상품 리스트 ({{ product_select.length }})</div>
					</v-flex>
					<v-flex style="color:#633efd; font-size:7px;">
						※ 상품을 선택해 관심상품에 등록해주세요
					</v-flex>
				</v-layout>
				<div class="mt-1 product_box_type" v-if="product_select.length > 1">
					<v-layout justify-space-between v-for="product in product_select" :key="product.id">
						<v-flex xs11 @click="click_add_interest(product)">
							<v-layout>
								<div v-if="product['data1']">
									{{ product.data1 }}
								</div>
								<div class="d-flex align-center" v-if="product['data2']">
									<div class="px-2">|</div>
									{{ product.data2 }}
								</div>
								<div class="d-flex align-center" v-if="product['data3']">
									<div class="px-2">|</div>
									{{ product.data3 }}
								</div>
								<div class="d-flex align-center" v-if="product['data4']">
									<div class="px-2">|</div>
									{{ product.data4 }}
								</div>
								<div class="d-flex align-center" v-if="product['data5']">
									<div class="px-2">|</div>
									{{ product.data5 }}
								</div>
								<div class="d-flex align-center" v-if="product['data6']">
									<div class="px-2">|</div>
									{{ product.data6 }}
								</div>
								<div class="d-flex align-center" v-if="product['data7']">
									<div class="px-2">|</div>
									{{ product.data7 }}
								</div>
								<div class="d-flex align-center" v-if="product['id']">
									<div class="px-2">-</div>
									{{ product.id }}
								</div>
							</v-layout>
						</v-flex>
					</v-layout>
				</div>
				<v-layout align-center class="mt-5">
					<div class="client-subTitle pl-2">관심상품 ({{ product_interest.length }})</div>
				</v-layout>
				<div class="mt-1 product_box_type">
					<v-layout justify-space-between v-for="(product, index) in product_interest" :key="product.id">
						<v-flex xs11 @click="click_product(index)" :class="index === select_product ? 'product_focus' : 'product_hover'">
							<v-layout>
								<div v-if="product['data1']">
									{{ product.data1 }}
								</div>
								<div class="d-flex align-center" v-if="product['data2']">
									<div class="px-2">|</div>
									{{ product.data2 }}
								</div>
								<div class="d-flex align-center" v-if="product['data3']">
									<div class="px-2">|</div>
									{{ product.data3 }}
								</div>
								<div class="d-flex align-center" v-if="product['data4']">
									<div class="px-2">|</div>
									{{ product.data4 }}
								</div>
								<div class="d-flex align-center" v-if="product['data5']">
									<div class="px-2">|</div>
									{{ product.data5 }}
								</div>
								<div class="d-flex align-center" v-if="product['data6']">
									<div class="px-2">|</div>
									{{ product.data6 }}
								</div>
								<div class="d-flex align-center" v-if="product['data7']">
									<div class="px-2">|</div>
									{{ product.data7 }}
								</div>
								<div class="d-flex align-center" v-if="product['id']">
									<div class="px-1">-</div>
									{{ product.id }}
								</div>
							</v-layout>
						</v-flex>
						<v-flex xs1 style="text-align:end;">
							<v-icon @click="click_delete(product, index)">mdi-window-close</v-icon>
						</v-flex>
					</v-layout>
				</div>
			</div>
			<div class="px-4  client-card">
				<v-layout wrap align-center justify-center class="mt-3 mb-5">
					<v-flex xs12>
						<div style="text-align:center">
							<v-img src="@/assets/images/ico/상담고객정보입력.png" width="60" style="display:inline-flex; width:60px;" />
							<p class="tab_title">부가정보입력</p>
						</div>
					</v-flex>
				</v-layout>
				<v-layout v-for="(item, i) in add_info" class="viewport-item" :key="i + '123'" justify-center>
					<!-- <div v-if="item.type === 'location'" class="width300">
									<p class="surveyName mb-1"> {{ item.qusDatas[2].txtfield.value }}</p>
									<div class="mt-2">
										<select-box :sel="searchsel_city1" @change="loc_firstSelect"></select-box>
									</div>
									<div>
										<select-box :sel="searchsel_city2" :disabled="searchsel_city2.disabled" @change="loc_twoSelect"></select-box>
									</div>
									<div>
										<select-box :sel="searchsel_city3" :disabled="searchsel_city3.disabled"></select-box>
									</div>
								</div> -->
					<div v-if="item.qusDatas[0].title.selectBox.value === '단일 선택'" style="width:100%">
						<p class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
						<!-- <pre class="visitexplain">{{ item.qusDatas[0].title.txtfield.value }}</pre> -->
						<v-radio-group v-model="add_info_data[i].value" hideDetails row class="mt-1">
							<div v-for="(option, idx) in item.qusDatas[0].content" :key="idx" class="mb-2">
								<v-radio
									:color="$store.state.PointColor1"
									:label="option.txtfield.value"
									:value="option.txtfield.value"
									:ripple="false"
									@change="change_radio(i, item)"
									class="focusColorButton"
								></v-radio>
								<div v-if="option.value === '기타' && add_info_data[i].value === '기타'">
									<txtField v-model="txt.value" :txtField="txt" class="mt-5 focusColor" />
								</div>
							</div>
						</v-radio-group>
					</div>
					<div v-else-if="item.qusDatas[0].title.selectBox.value === '다중 선택'" style="width:100%">
						<p class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
						<div class="checkbox-frame" v-for="(item, idx) in item.qusDatas[0].content" :key="idx">
							<checkBoxIcon2
								:label="item.txtfield.value"
								:value="item.txtfield.value"
								:color="$store.state.PointColor1"
								style="border-bottom:1px;"
								class="focusColorButton"
								v-model="add_info_data[i].value"
								@change="change_check(i, item)"
							/>
						</div>
					</div>
					<div v-else-if="item.qusDatas[0].title.selectBox.value === '목록 선택박스'" style="width:100%">
						<p class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
						<p v-if="item.qusDatas[0].title.txtfield.value === '고객상태'" class="surveyName mb-1" style="color:#633efd; font-size:7px;">
							※ DB등록 / 상담대기 / 상담완료 / 계약가망 / 계약대기 / 계약완료
						</p>
						<selectBox_qus2
							:items="item.qusDatas[0].content.map((x, index2) => x.txtfield.value)"
							:placeholder="item.qusDatas[0].title.txtfield.value + '를 선택해주세요'"
							:current_value="add_info_data[i]"
							@change="change_select(i, item)"
						></selectBox_qus2>
					</div>
					<div v-else-if="item.qusDatas[0].title.selectBox.value === '단답 입력'" style="width:100%">
						<p class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
						<txtField v-model="add_info_data[i].value" :txtField="txt" class="pt-0 bizInput mr-1" style="height:27px; margin:auto" />
					</div>
					<div v-else-if="item.qusDatas[0].title.selectBox.value === '파일 업로드'" style="width:100%">
						<div v-if="item.qusDatas[0].title.txtfield.value === '증빙서류'" class="d-flex justify-space-between align-center">
							<p class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
							<p class="surveyName mb-1" style="color:#633efd; font-size:7px;">
								※청약, 계약서 등 고객 증빙서류 첨부
							</p>
						</div>
						<p v-else class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
						<v-layout>
							<txtFieldType
								v-model="txt.value"
								:txtField="txt"
								:disable="true"
								class="pt-0 bizInput mr-1"
								style="height:27px; margin:auto"
							/>
							<btn btn_txt="파일첨부" :btn="addBtn2" class="mr-2" @click="click_file(i, item)" />
							<input
								type="file"
								style="display:none;"
								id="client_file_upload"
								@change="fileUploadChange"
								accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
							/>
						</v-layout>
						<div
							v-for="(item, index3) in pricePaper"
							:key="index3 + 'g'"
							class="px-2 d-flex align-center mt-2"
							outlined
							style="height:25px; font-size:12px; border-radius:25px; border:1px solid #7D7D7D; width:fit-content"
						>
							{{ item.fileName }}
							<v-icon color="#C4C4C4" class="select_option ml-5" @click="click_delete_file(index3)">mdi-close-circle</v-icon>
						</div>
					</div>
					<div class="mt-2" v-else-if="item.qusDatas[0].title.selectBox.value === '긴문장 입력'" style="width:100%">
						<p class="surveyName mb-1">{{ item.qusDatas[0].title.txtfield.value }}</p>
						<v-textarea
							outlined
							value=""
							v-model="add_info_data[i].value"
							style="border-radius:10px;"
							@input="input_text(i, item)"
						></v-textarea>
					</div>
					<div v-else-if="item.qusDatas[0].title.selectBox.value === '파일업로드(jpg, png, pdf)'">
						<pre class="visitexplain">{{ item.qusDatas[0].txtfield.value }}</pre>
						<v-divider class="mt-2 mb-3"></v-divider>
						<upload-images
							:uploadMsg="uploadImagesOptions.uploadMsg"
							clearAll=" "
							@changed="handleImages"
							class="imgUploads direction-row"
						/>
					</div>
				</v-layout>
			</div>
			<div class="px-4  ">
				<v-layout align-center class="mt-5">
					<div class="client-subTitle pl-2">
						등록고객에 대한 법적고지
					</div>
				</v-layout>

				<v-layout class="mt-1">
					<v-textarea outlined value="" v-model="agree.value" readonly style="border-radius:10px;" class="custom_text_field"></v-textarea>
				</v-layout>

				<v-layout class="mb-15">
					<v-checkbox label="동의" class="add_info_check" v-model="agree.check"></v-checkbox>
				</v-layout>
			</div>
		</div>
		<div v-if="step === '1'">
			<v-layout v-if="phoneDisabled && nameDisabled" justify-center align-center class="client_footer ">
				<v-flex xs12 class="client_footer_text" @click="next_step()">
					다 음
				</v-flex>
			</v-layout>
			<v-layout v-else justify-center align-center class="client_footer_disabled ">
				<v-flex xs12 class="client_footer_text">
					다 음
				</v-flex>
			</v-layout>
		</div>
		<div v-if="step === '2'">
			<v-layout v-if="agree.check" justify-center align-center class="client_footer ">
				<v-flex xs12 class="client_footer_text" @click="click_create()">
					등 록
				</v-flex>
			</v-layout>
			<v-layout v-else justify-center align-center class="client_footer_disabled ">
				<v-flex xs12 class="client_footer_text">
					등 록
				</v-flex>
			</v-layout>
		</div>
		<clientAddDialog :setdialog="setdialog" @select_user="select_user" />
		<clientUpdateDialog :setdialog="setdialog2" />
		<!-- 저장 불가 팝업 -->
		<sweet-alert :dialog="sweetDialog_info" />
	</div>
</template>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
import { clientUpdateDialog } from '@/components'
import { clientAddDialog } from '@/components'
import { btn, makingQuestions, sweetAlert, txtField, checkBoxIcon2, selectBox_qus2 } from '@/components'
import axios from 'axios'

export default {
	components: {
		clientAddDialog,
		clientUpdateDialog,
		btn,
		makingQuestions,
		sweetAlert,
		checkBoxIcon2,
		selectBox_qus2,
		txtField,
		txtFieldType: () => import('@/components/txtField2.vue'),
	},
	data() {
		return {
			phoneReadOnly: false,
			phoneErrorMessage: '',
			phoneSuccessMessage: '',
			likeList: ['S', 'A', 'B', 'C', 'D'],
			datas: {
				radio_select: false,
				id: null,
				comment: '',
				like: '',
				value1: '', // 이름
				value2: '', // 휴대전화
				value3: '', // 생년월일
				value4: '', // 주소
				value5: '', // 상세주소
			},
			nameDisabled: false,
			phoneDisabled: false,
			phoneCheck: false,
			birthCheck: false,
			addressCheck: false,
			next: false,
			create: false,
			setdialog: {
				dialog: false,
				data: {},
			},
			setdialog2: {
				dialog: false,
				item: {},
			},
			step: '1',
			product_select: [],
			product_interest: [],
			product_title: [],
			product_list: {
				data1: {
					value: '',
					items: [],
				},
				data2: {
					value: '',
					items: [],
				},
				data3: {
					value: '',
					items: [],
				},
				data4: {
					value: '',
					items: [],
				},
				data5: {
					value: '',
					items: [],
				},
				data6: {
					value: '',
					items: [],
				},
				data7: {
					value: '',
					items: [],
				},
			},
			select_product: '',
			product_status: {
				value: '',
				items: ['DB등록', '상담대기', '상담완료', '계약가망', '계약대기', '계약완료'],
			},
			add_info: {},
			locationSelected: '',
			txt: {
				value: '',
				maxlength: '255',
				outlined: true,
				hideDetail: false,
				errorMessage: '',
			},
			addBtn2: {
				class: 'makingBtn',
				small: true,
				width: '70px',
				color: 'primary',
			},
			add_info_data: [],
			pricePaper: [],
			agree: {
				check: false,
				value: '',
			},

			sweetDialog_info: {
				// 저장 불가 팝업
				open: false,
				title: '',
				content: ``,
				buttonType: 'oneBtn',
				saveBtnText: '저장',
				cancelBtnText: '확인',
				modalIcon: 'info',
			},
		}
	},
	filters: {
		current_status(value) {
			if (!value) return ''
			let data = ''
			if (value === 'db') {
				data = 'DB등록'
			} else if (value === 'consultingWait') {
				data = '상담대기'
			} else if (value === 'consultingComplete') {
				data = '상담완료'
			} else if (value === 'contractWish') {
				data = '계약가망'
			} else if (value === 'contractWait') {
				data = '계약대기'
			} else if (value === 'contractComplete') {
				data = '계약완료'
			}
			return data
		},
	},
	async created() {
		this.$store.state.loading = true
		await this.me()
		await this.businesses()
		await this.first_productList()
		let ok = 0
		let interval = setInterval(() => {
			ok = ok + 1
			if (this.$store.state.meData) {
				const data = {
					business: this.$store.state.meData.business.id,
				}
				this.inputBoxesView(data)
				clearInterval(interval)
			}
			if (ok === 5) {
				clearInterval(interval)
				this.$store.state.loading = false
				this.$router.push({ name: 'adminLogin' })
			}
		}, 1000)
	},
	methods: {
		// nextStatus() {
		// 	if (this.phoneDisabled && this.nameDisabled) {
		// 		return false
		// 	} else {
		// 		return true
		// 	}
		// },
		input_check_phone() {
			if (this.datas.value2.length === 11) {
				this.phoneDisabled = true
			} else {
				this.phoneDisabled = false
			}
		},
		input_name() {
			if (this.datas.value1 === '') {
				this.nameDisabled = false
			} else {
				this.nameDisabled = true
			}
		},
		check_birth() {
			if (this.datas.value3.length === 8) {
				this.birthCheck = true
			} else {
				this.birthCheck = false
			}
		},
		click_product(index) {
			this.select_product = index
		},
		async me() {
			await this.$store
				.dispatch('me')
				.then(res => {
					this.agree.value = res.business.law
				})
				.catch(() => {})
		},
		click_add_interest(item) {
			if (this.product_interest.findIndex(x => x.id === item.id) === -1) {
				this.product_interest.push(item)
			}
		},
		// test() {
		// 	axios({
		// 		url: 'http://localhost:5000/uploads/_ac1a5cef57.jpg',
		// 		method: 'GET',
		// 		responseType: 'blob',
		// 	}).then(response => {
		// 		var fileURL = window.URL.createObjectURL(new Blob([response.data]))
		// 		var fileLink = document.createElement('a')

		// 		fileLink.href = fileURL
		// 		fileLink.setAttribute('download', 'file.jpg')
		// 		document.body.appendChild(fileLink)

		// 		fileLink.click()
		// 	})
		// },
		current_status2(value) {
			if (!value) return ''
			let data = ''
			if (value === 'DB등록') {
				data = 'db'
			} else if (value === '상담대기') {
				data = 'consultingWait'
			} else if (value === '상담완료') {
				data = 'consultingComplete'
			} else if (value === '계약가망') {
				data = 'contractWish'
			} else if (value === '계약대기') {
				data = 'contractWait'
			} else if (value === '계약완료') {
				data = 'contractComplete'
			}
			return data
		},
		typeCheck(val) {
			if (val === 10) {
				return '단일 선택'
			} else if (val == 11) {
				return '다중 선택'
			} else if (val == 12) {
				return '목록 선택박스'
			} else if (val == 20) {
				return '단답 입력'
			} else if (val == 21) {
				return '긴문장 입력'
			} else if (val == 22) {
				return '파일 업로드'
			}
		},
		inputBoxesView(data) {
			this.$store.dispatch('inputBoxes', data).then(res => {
				if (res.inputBoxes.length > 0) {
					this.inputboxData = res.inputBoxes[0]
					this.idData = res.inputBoxes[0].id
					let inputDataArr = []
					res.inputBoxes[0].categories.sort((a, b) => a.listorder - b.listorder)
					for (let index = 0; index < res.inputBoxes[0].categories.length; index++) {
						const element = res.inputBoxes[0].categories[index]
						element.category_details.sort((a, b) => a.listorder - b.listorder)
					}
					res.inputBoxes[0].categories.forEach((element, index) => {
						let qusDatas = {
							id: element.id,
							title: {
								// 설문 질문
								txtfield: {
									value: element.codename,
									maxlength: '255',
									outlined: true,
									hideDetail: true,
									errorMessage: '',
									autocomplete: 'off',
									placeholder: '직접입력',
								},
								// 설문타입
								selectBox: {
									value: this.typeCheck(element.type),
									disable: false,
									errorMessage: '',
									hideDetail: true,
									items: ['단답 입력', '긴문장 입력', '단일 선택', '다중 선택', '목록 선택박스', '파일 업로드'],
									inputItems: [],
									outlined: true,
									class: 'small_font bizInput',
									placeholder: '유형',
								},
							},
							musthave: element.musthave,
							type: element.type,
							content: [],
						}

						let qusData = JSON.parse(JSON.stringify(qusDatas))
						inputDataArr.push({ qusDatas: [qusData] })
						element.category_details.forEach(el => {
							inputDataArr[index].qusDatas[0].content.push({
								id: el.id,
								txtfield: {
									value: el.detailname,
									maxlength: '255',
									outlined: true,
									hideDetail: true,
									errorMessage: '',
									autocomplete: 'off',
									placeholder: '직접입력',
								},
							})
						})
					})
					this.add_info = inputDataArr
					for (let i = 0; i < inputDataArr.length; i++) {
						this.add_info_data.push({
							type: '',
							codeName: inputDataArr[i].qusDatas[0].title.txtfield.value,
							value: '',
						})
					}
				}
				this.$store.state.loading = false
			})
		},
		first_productList() {
			let input = {
				business: this.$store.state.meData.business.id,
			}
			this.$store
				.dispatch('productList', input)
				.then(res => {
					let data1_list = []
					res.products.forEach(el => {
						if (el.data1) {
							data1_list.push(el.data1)
						}
					})
					let uniqueArr = data1_list.filter((element, index) => {
						return data1_list.indexOf(element) === index
					})
					let clear_li = {
						value: '',
						items: uniqueArr,
					}

					this.product_list.data1 = clear_li
				})
				.catch(err => {
					console.log({ err })
				})
		},
		businesses() {
			this.$store.dispatch('businesses').then(res => {
				if (res.businesses[0].product.length > 0) {
					this.product_title = res.businesses[0].product
				}
			})
		},
		async click_select(idx) {
			for (let i = idx; i < 6; i++) {
				this.product_list['data' + (i + 2)].value = null
			}
			let input = {
				status: 'uncontracted',
				business: this.$store.state.meData.business.id,
				data1: this.product_list.data1.value ? this.product_list.data1.value : '',
				data2: this.product_list.data2.value ? this.product_list.data2.value : '',
				data3: this.product_list.data3.value ? this.product_list.data3.value : '',
				data4: this.product_list.data4.value ? this.product_list.data4.value : '',
				data5: this.product_list.data5.value ? this.product_list.data5.value : '',
				data6: this.product_list.data6.value ? this.product_list.data6.value : '',
				data7: this.product_list.data7.value ? this.product_list.data7.value : '',
			}
			this.$store.state.loading = true
			await this.$store
				.dispatch('productList', input)
				.then(res => {
					let data_list = []
					if (this.product_title.length - 1 === idx) {
						this.product_select = res.products
						if (res.products.length === 1) {
							this.product_interest.push(res.products[0])
						}
					}
					res.products.forEach(el => {
						if (el[`data${idx + 2}`]) {
							data_list.push(el[`data${idx + 2}`])
						}
					})
					let uniqueArr = data_list.filter((element, index) => {
						return data_list.indexOf(element) === index
					})
					if (this.product_title.length === idx + 1) {
					}
					this.product_list['data' + (idx + 2)].items = uniqueArr

					this.$store.state.loading = false
				})
				.catch(err => {
					this.$store.state.loading = false
					console.log({ err })
				})
		},
		input_detail_address() {
			if (this.datas.value5) {
				this.next = true
			} else {
				this.next = false
			}
		},
		click_delete(item, index) {
			this.product_interest.splice(index, 1)
			this.select_product = ''
		},
		click_phone() {
			this.setdialog.data = this.datas
			this.setdialog.dialog = true
		},
		select_user(data) {
			if (data.radio_select) {
				this.setdialog2.data = data
				this.setdialog2.dialog = true
			} else {
				this.datas.value2 = data.phone
				this.datas.value1 = data.name
				this.phoneCheck = true
			}
		},
		closeDaumPostcode() {
			let element_layer = document.getElementById('layer')
			element_layer.style.display = 'none'
		},
		execDaumPostcode() {
			let element_layer = document.getElementById('layer')
			new daum.Postcode({
				oncomplete: data => {
					// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

					// 각 주소의 노출 규칙에 따라 주소를 조합한다.
					// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
					var addr = '' // 주소 변수
					var extraAddr = '' // 참고항목 변수

					//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
					if (data.userSelectedType === 'R') {
						// 사용자가 도로명 주소를 선택했을 경우
						addr = data.roadAddress
					} else {
						// 사용자가 지번 주소를 선택했을 경우(J)
						addr = data.jibunAddress
					}

					// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
					if (data.userSelectedType === 'R') {
						// 법정동명이 있을 경우 추가한다. (법정리는 제외)
						// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
						if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
							extraAddr += data.bname
						}
						// 건물명이 있고, 공동주택일 경우 추가한다.
						if (data.buildingName !== '' && data.apartment === 'Y') {
							extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName
						}
						// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
						if (extraAddr !== '') {
							extraAddr = ' (' + extraAddr + ')'
						}
						// 조합된 참고항목을 해당 필드에 넣는다.
						// document.getElementById('sample2_extraAddress').value = extraAddr
					} else {
						// document.getElementById('sample2_extraAddress').value = ''
					}

					// 우편번호와 주소 정보를 해당 필드에 넣는다.
					// document.getElementById('sample2_postcode').value = data.zonecode
					// document.getElementById('sample2_address').value = addr
					this.datas.value4 = addr
					this.addressCheck = true
					// 커서를 상세주소 필드로 이동한다.
					// document.getElementById('detail_adress').focus()

					// iframe을 넣은 element를 안보이게 한다.
					// (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
					element_layer.style.display = 'none'
				},
				width: '100%',
				height: '100%',
				maxSuggestItems: 5,
			}).embed(element_layer)

			// iframe을 넣은 element를 보이게 한다.
			element_layer.style.display = 'block'

			// iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
			this.initLayerPosition()
		},
		initLayerPosition() {
			let element_layer = document.getElementById('layer')
			var width = 330 //우편번호서비스가 들어갈 element의 width
			var height = 460 //우편번호서비스가 들어갈 element의 height

			// 위에서 선언한 값들을 실제 element에 넣는다.
			element_layer.style.width = width + 'px'
			element_layer.style.height = height + 'px'
			// 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
			// element_layer.style.left = ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth + 'px'
			// element_layer.style.top = ((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth + 'px'
		},
		change_radio(i, item) {
			this.add_info_data[i].codeName = item.qusDatas[0].title.txtfield.value
			this.add_info_data[i].type = item.qusDatas[0].type
		},
		change_check(i, item) {
			this.add_info_data[i].codeName = item.qusDatas[0].title.txtfield.value
			this.add_info_data[i].type = item.qusDatas[0].type
		},
		fileUploadChange(val) {
			this.pricePaper.push({
				file: val.target.files[0],
				fileName: val.target.files[0].name,
			})
		},
		click_delete_file(index) {
			this.$delete(this.pricePaper, index)
		},
		click_file(i, item) {
			document.getElementById(`client_file_upload`).click()
			this.add_info_data[i].codeName = item.qusDatas[0].title.txtfield.value
			this.add_info_data[i].type = item.qusDatas[0].type
		},
		change_select(i, item) {
			this.add_info_data[i].codeName = item.qusDatas[0].title.txtfield.value
			this.add_info_data[i].type = item.qusDatas[0].type
		},
		input_text(i, item) {
			this.add_info_data[i].codeName = item.qusDatas[0].title.txtfield.value
			this.add_info_data[i].type = item.qusDatas[0].type
		},
		next_step() {
			this.datas.value2
			let phone_check = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/
			let birth_check = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
			if (!phone_check.test(this.datas.value2)) {
				this.sweetDialog_info.open = true
				this.sweetDialog_info.title = '휴대폰번호 에러'
				this.sweetDialog_info.content = '잘못된 휴대전화번호입니다.'
			} else if (!this.phoneCheck) {
				this.sweetDialog_info.open = true
				this.sweetDialog_info.title = '중복체크 에러'
				this.sweetDialog_info.content = '연락처 중복확인을 해야합니다.'
			} else if (this.datas.value3 !== '') {
				if (!birth_check.test(this.datas.value3)) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '생년월일 에러'
					this.sweetDialog_info.content = '잘못된 생년월일입니다.'
				} else {
					this.step = '2'
				}
			} else {
				this.step = '2'
			}
		},
		async click_create() {
			this.$store.state.loading = true
			let file_li = []

			for (let i = 0; i < this.pricePaper.length; i++) {
				if (this.pricePaper[i].id) {
					file_li.push(this.pricePaper[i].id)
				} else {
					let input = {
						files: this.pricePaper[i].file,
					}
					await this.$store.dispatch('upload', input).then(res => {
						file_li.push(res.data[0].id)
					})
				}
			}
			let li = []
			for (let i = 0; i < this.product_interest.length; i++) {
				li.push(this.product_interest[i].id)
			}

			let input2 = {
				id: this.datas.id,
				name: this.datas.value1,
				phone: this.datas.value2,
				birthday: this.datas.value3,
				address: this.datas.value4 + '_' + this.datas.value5,
				products: li,
				pricePaper: file_li,
				customDatas: {
					contract_product: {
						name: '',
						id: '',
						date: '',
					},
					add_info: this.add_info_data,
				},
				agreeDate: new Date(),
				business: this.$store.state.meData.business.id,
				users_permissions_user: this.$store.state.meData.id,
			}
			let ok = true

			for (let i = 0; i < this.add_info_data.length; i++) {
				if (this.add_info_data[i].codeName === '고객상태') {
					input2['contractStatus'] = this.current_status2(this.add_info_data[i].value)
				} else if (this.add_info_data[i].codeName === '고객성향') {
					input2['like'] = this.add_info_data[i].value
				} else if (this.add_info_data[i].codeName === '고객 특이사항') {
					input2['comment'] = this.add_info_data[i].value
				}

				// 필수 항목인 설문에 답변 안됬는지 체크
				if (this.add_info[i].qusDatas[0].musthave && !this.add_info_data[i].value) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = `${this.add_info[i].qusDatas[0].title.txtfield.value} 미입력`
					this.sweetDialog_info.content = `${this.add_info[i].qusDatas[0].title.txtfield.value}을(를) 입력해주세요.`
					ok = false
					this.$store.state.loading = false
					break
				}
			}
			// 필수항목 답변 안됬을 시 저장 막기
			if (!ok) {
				return
			}

			for (let i = 0; i < this.add_info_data.length; i++) {
				if (this.add_info_data[i].codeName === '고객상태' && this.add_info_data[i].value === '계약완료') {
					if (this.select_product === '') {
						this.sweetDialog_info.open = true
						this.sweetDialog_info.title = '계약 상품'
						this.sweetDialog_info.content = '계약 상품 선택후 계약완료로 바꿔주세요.'
						this.add_info_data[i].value = null
						this.$store.state.loading = false
						return
					} else if (
						this.product_interest[this.select_product] === 'contractcompleted' &&
						this.product_interest[this.select_product].contractorPhone !== this.datas.value2
					) {
						this.sweetDialog_info.open = true
						this.sweetDialog_info.title = '계약 상품'
						this.sweetDialog_info.content = '이미 계약완료된 상품 입니다.'
						this.add_info_data[i].value = null
						this.$store.state.loading = false
						return
					}
					if (this.add_info_data[i].value === '계약완료') {
						input2.customDatas.contract_product.name = this.product_interest[this.select_product].title
						input2.customDatas.contract_product.id = this.product_interest[this.select_product].id
						input2.customDatas.contract_product.date = new Date()
					}

					let input3 = {
						id: this.product_interest[this.select_product].id,
						contractorName: this.datas.value1,
						contractorPhone: this.datas.value2,
						contractDate: new Date(),
						users_permissions_user: this.$store.state.meData.id,
						status: 'contractcompleted',
					}

					this.product_interest[this.select_product].editHistory.unshift({
						updated_at: new Date(),
						updated_name: this.$store.state.meData.name,
						detail: '상품상태',
					})
					input3['editHistory'] = this.product_interest[this.select_product].editHistory
					this.$store.dispatch('updateProduct', input3).then(res => {})
					break
				}
			}

			await this.$store
				.dispatch('createClient', input2)
				.then(res => {
					this.$router.push({
						name: 'counselorBizDashboard',
						params: { id: this.$store.state.meData.business.id },
					})
					this.$store.state.loading = false
				})
				.catch(err => {
					this.$store.state.loading = false
				})
		},
	},
}
</script>
<style lang="scss">
.custom_text_field {
	div {
		.v-input__slot {
			background-color: #ffffff !important;
		}
	}
}
</style>
