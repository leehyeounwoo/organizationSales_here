<template>
	<v-dialog persistent v-model="setdialog.dialog" width="90%">
		<div class="create_wrap">
			<div class="project_title px-5">
				<span style="font-size:15px">사업지 관리</span>
				<v-spacer />
				<v-icon @click="modalClose()" class="title-icon" color="white">mdi-close</v-icon>
			</div>
			<v-layout class="pt-7 px-10">
				<v-flex xs5 class="mr-12">
					<v-layout class="pb-3" align-center>
						<div class="slash mr-1"></div>
						<span style="font-weight:bold">사업지 기본정보</span>
					</v-layout>
					<div v-for="(left, index) in setdialog.items" :key="index" class="table_all_gray" style="border-top:1px solid #c8c8c8">
						<v-layout
							wrap
							style="min-height:50px;  border-left:1px solid #c8c8c8; border-right:1px solid #c8c8c8; "
							:style="setdialog.items.length - 1 === index ? 'border-bottom: 1px solid #c8c8c8;' : ''"
						>
							<!-- v-if="left.title !== '상품 등록'" -->
							<v-flex xs3 align-self-center class="table_font"><span v-if="left.must" style="color:red">* </span>{{ left.title }}</v-flex>

							<v-flex xs9 v-if="left.type === 'txtfield'" class="table_right_white px-2 biz_table_right">
								<v-flex xs6>
									<txtField
										v-if="left.title === '대표번호' && left.value === ''"
										class="pt-3 bizInput"
										v-model="left.value"
										:txtField="left.txtfield"
										style="height:27px; margin:auto"
									></txtField>
									<txtField
										v-else-if="left.title === '대표번호' && left.value.substr(0, 3).includes('02')"
										class="pt-3 bizInput"
										v-model="left.value"
										v-mask="'##-####-####'"
										:txtField="left.txtfield"
										style="height:27px; margin:auto"
									></txtField>
									<txtField
										v-else-if="left.title === '대표번호' && !left.value.substr(0, 3).includes('02')"
										class="pt-3 bizInput"
										v-model="left.value"
										v-mask="'###-####-####'"
										:txtField="left.txtfield"
										style="height:27px; margin:auto"
									></txtField>
									<txtField
										v-else
										class="pt-3 bizInput"
										v-model="left.value"
										:txtField="left.txtfield"
										style="height:27px; margin:auto"
									></txtField>
								</v-flex>
							</v-flex>
							<v-flex xs9 v-else-if="left.type === 'txtfieldCheck'" class="table_right_white px-2 biz_table_right">
								<v-layout pt-3>
									<v-flex xs6>
										<txtField class="bizInput" v-model="left.value" :txtField="left.txtfield" style="height:27px; margin:auto"></txtField>
									</v-flex>
									<v-flex xs4>
										<v-btn v-if="left.txtfield.readonly === false" elevation="0" class="ml-2 file_btn" @click="checkBusinessName(left)">
											중복 체크
										</v-btn>
										<v-layout v-else>
											<v-btn elevation="0" class="ml-2 file_btn">
												중복 체크 완료
											</v-btn>
											<v-btn elevation="0" class="ml-2 file_btn" @click="resetName(left)">
												다시 입력
											</v-btn>
										</v-layout>
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex xs9 v-else-if="left.type === 'time'" class="table_right_white px-2 biz_table_right">
								<v-flex xs6 class="pt-3">
									<v-layout>
										<v-flex xs6>
											<TimePickerDialog :setdialog="left.worktime1" @input="save_time1" />
										</v-flex>
										<div class="px-1">~</div>
										<v-flex xs6>
											<TimePickerDialog :setdialog="left.worktime2" :minTime="left.worktime1.time" @input="save_time2" />
										</v-flex>
									</v-layout>
								</v-flex>
							</v-flex>
							<v-flex xs9 v-else-if="left.type === 'selectBox'" class="table_right_white px-2 biz_table_right">
								<v-flex class="pt-3" xs7>
									<v-layout>
										<v-flex xs4>
											<selectBox :sel="left.selectBox" style="font-size:13px" @change="select2(left)"></selectBox>
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
									</v-layout>
								</v-flex>
							</v-flex>
							<!-- && setdialog.type === 'create' -->
							<v-flex xs9 v-else-if="left.type === 'product'" class="table_right_white px-2 biz_table_right">
								<v-flex xs9>
									<v-layout wrap class="pt-3">
										<v-flex xs8>
											<txtField class="bizInput" v-model="left.value" :txtField="left.txtfield" style="height:27px; margin:auto"></txtField>
										</v-flex>
										<v-flex xs4 v-if="setdialog.product.length === 0">
											<v-btn elevation="0" class="ml-2 file_btn" @click="csvImportClick(index)">
												<v-img max-width="14" class="mr-1" src="@/assets/images/input_btn.png" />파일 업로드
											</v-btn>
										</v-flex>
										<v-flex xs12 align-self-center class="py-2">
											<v-btn class="file_sample" depressed @click="csvDownloadClick()">
												<v-img max-width="22" src="@/assets/images/excel-img2.png" />
											</v-btn>
											<span class="sample_span ml-2" @click="csvDownloadClick()">등록양식 다운받기</span>
										</v-flex>

										<VueCsvImport
											v-if="parseCsvStatus"
											style="display:none;"
											id="csvimport"
											inputClass="inputclasstest"
											v-model="parseCsv"
											:map-fields="mapfields"
											:autoMatchFields="true"
											:autoMatchIgnoreCase="true"
										>
										</VueCsvImport>
									</v-layout>
								</v-flex>
							</v-flex>
							<v-flex xs9 v-else-if="left.type === 'location'" class="table_right_white px-2 biz_table_right">
								<v-flex xs8>
									<v-layout class="pt-3">
										<txtField class="bizInput" v-model="left.value" :txtField="left.txtfield" style="height:27px; margin:auto"></txtField>
										<v-flex>
											<v-btn
												@click="checkLocation"
												elevation="0"
												class="ml-2 new_biz_btn"
												style="min-width:30px !important; width:30px !important"
												><v-icon small>mdi-crosshairs</v-icon></v-btn
											>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-flex>
						</v-layout>
					</div>
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
						<v-flex style="max-width:250px !important">아이디</v-flex>
						<v-flex style="max-width:136px !important">비밀번호</v-flex>
						<v-flex>비고</v-flex>
					</v-layout>

					<div style="height:250px; overflow:auto">
						<v-layout align-center v-for="(right, idx) in right_data" :key="idx" class="right_table_item">
							<v-flex style="max-width:50px !important; width:50px">{{ idx + 1 }}</v-flex>
							<v-flex align-self-center style="max-width:126px !important">
								<txtField class="bizInput px-2" v-model="right.txtfield1.value" :txtField="right.txtfield1"></txtField>
							</v-flex>
							<v-flex align-self-center style="max-width:136px !important">
								<txtField
									v-mask="'###-####-####'"
									class="bizInput px-2"
									v-model="right.txtfield2.value"
									:txtField="right.txtfield2"
								></txtField>
							</v-flex>
							<v-flex align-self-center style="max-width:250px !important">
								<txtField class="bizInput px-2" v-model="right.txtfield3.value" :txtField="right.txtfield3"></txtField>
							</v-flex>
							<v-flex align-self-center style="max-width:136px !important">
								<txtField class="bizInput px-2" v-model="right.txtfield4.value" :txtField="right.txtfield4"></txtField>
							</v-flex>
							<v-flex>
								<v-layout align-center>
									<!-- <v-flex class="pl-3" style="max-width:150px">
										<v-radio-group v-model="right.user_confirmed" row class="system-radio-label">
											<v-radio color="#009dac" label="지정" :value="true"></v-radio>
											<v-radio color="#009dac" label="해제" :value="false"></v-radio>
										</v-radio-group>
									</v-flex>
									<v-flex v-if="setdialog.type === 'create'">
										<v-btn elevation="0" class="etc_btn" style="width:60px" @click="checkManager(right)">생성</v-btn>
									</v-flex>
									<v-flex v-else>
										<v-btn elevation="0" class="etc_btn" style="width:60px" @click="checkManager(right)">적용</v-btn>
									</v-flex>
									<v-flex>
										<v-btn elevation="0" class="etc_btn" style="">계정정보 발송</v-btn>
									</v-flex> -->
									<v-flex>
										<v-btn elevation="0" class="etc_btn" style="" @click="deleteRightData(idx)">삭제</v-btn>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>

						<v-layout class="mt-2" justify-center>
							<v-icon style="cursor:pointer" @click="addManager()">mdi-plus-circle-outline</v-icon>
						</v-layout>
					</div>
					<v-layout justify-end>
						<v-btn class="save_biz" @click="businessCheck()" style="margin-top:61px"><v-icon>mdi-check</v-icon>저장</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
		<sweetAlert :dialog="sweetDialog1" @click="saveUser" />
		<sweetAlert :dialog="sweetDialog" @click="saveBusiness" />
		<sweetAlert :dialog="sweetInfo" />
	</v-dialog>
</template>

<script>
import { txtField, selectBox, sweetAlert } from '@/components/index.js'
import TimePickerDialog from './timePickerDialog.vue'
import { VueCsvImport } from 'vue-csv-import'

export default {
	props: {
		setdialog: Object,
		getTable: Function,
		right_data: Array,
	},
	components: {
		txtField,
		selectBox,
		TimePickerDialog,
		sweetAlert,
		VueCsvImport,
	},
	data() {
		return {
			duplicateCheck: false,
			parseCsvStatus: false,
			mapfields: ['housingType', 'dong', 'ho', 'status'],
			parseCsv: null,
			deleteUserArr: [],
			sweetDialog: {
				open: false,
				title: '',
				content: '',
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			sweetDialog1: {
				open: false,
				title: '',
				content: '',
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
			},
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			newUser: [],
		}
	},
	watch: {
		setdialog: {
			deep: true,
			handler() {
				if (!this.setdialog.dialog) {
					this.parseCsv = null
				}
			},
		},
	},
	created() {},
	methods: {
		deleteRightData(idx) {
			if (this.right_data[idx].id) {
				this.deleteUserArr.push(this.right_data[idx])
			}
			this.right_data.splice(idx, 1)
		},
		resetName(val) {
			val.txtfield.readonly = false
		},
		checkBusinessName(val) {
			if (val.value !== '') {
				const data = {
					name: val.value,
				}
				this.$store.dispatch('businessNameCheck', data).then(res => {
					if (res.businessNameCheck.ok) {
						this.sweetInfo.modalIcon = 'info'
						this.sweetInfo.open = true
						this.sweetInfo.title = '중복 체크'
						this.sweetInfo.content = '사용가능한 사업지 명 입니다.'
						val.txtfield.readonly = true
					} else {
						this.sweetInfo.open = true
						this.sweetInfo.modalIcon = 'error'
						this.sweetInfo.title = '중복 체크'
						this.sweetInfo.content = '중복된 사업지 명 입니다.'
					}
				})
			} else {
				this.sweetInfo.open = true
				this.sweetInfo.modalIcon = 'info'
				this.sweetInfo.title = '중복 체크'
				this.sweetInfo.content = '사업지 명을 입력해주세요.'
			}
		},
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
		},
		computeDistance(startCoords) {
			var startLatRads = startCoords.latitude
			var startLongRads = startCoords.longitude
			return String(startLatRads.toFixed(5)) + '_' + String(startLongRads.toFixed(5))
		},
		checkLocation() {
			this.$store.state.loading = true
			if (!navigator.geolocation) {
				this.$store.state.loading = false
				return this.open_disable_dialog({ title: '오류발생', content: '위치정보를 허용해 주세요.' }, 'error')
			} else {
				let ok = 0
				const geolocation = setInterval(() => {
					ok += 1
					if (ok === 7) {
						if (!navigator.geolocation.coords) {
							this.$store.state.loading = false
							clearInterval(geolocation)
							return this.open_disable_dialog({ title: '오류발생', content: '다시 시도 해주세요.' }, 'error')
						}
					}
					navigator.geolocation.getCurrentPosition(position => {
						this.setdialog.items[6].value = this.computeDistance(position.coords)
						clearInterval(geolocation)
						this.$store.state.loading = false
					})
				}, 1000)
			}
		},
		select2(select) {
			if (select.selectBox.value === '30') {
				select.selectBox2.items = [
					{ text: '60분', value: '60' },
					{ text: '90분', value: '90' },
					{ text: '120분', value: '120' },
				]
			} else {
				select.selectBox2.items = [
					{ text: '60분', value: '60' },
					{ text: '120분', value: '120' },
				]
			}
		},
		addManager() {
			this.right_data.push({
				detail: [],
				user_confirmed: true,
				txtfield1: {
					value: '',
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
				},
				txtfield2: {
					value: '',
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
				},
				txtfield3: {
					value: '',
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					placeholder: '이메일 형식',
				},
				txtfield4: {
					value: '',
					maxlength: '255',
					outlined: true,
					hideDetail: true,
					errorMessage: '',
					type: 'password',
				},
			})
		},
		csvDownloadClick() {
			var a = document.createElement('a')
			a.href = location.protocol + '//' + location.host + '/sampleCSV.csv'
			a.download = 'sampleCSV.csv'
			a.style.display = 'none'
			document.body.appendChild(a)
			a.click()
		},
		csvImportClick(index) {
			this.$store.state.loading = true
			// setTimeout(() => {
			// var theFile = document.getElementsByClassName('inputclasstest')[0]

			// 	theFile.value = []

			document.body.onfocus = () => {
				this.$store.state.loading = false

				// 		document.body.onfocus = null
			}
			// }, 1000)

			document.getElementsByClassName('inputclasstest')[0]

			this.parseCsvStatus = true
			this.parseCsv = null
			const statusInterval = setInterval(() => {
				if (this.parseCsvStatus) {
					clearInterval(statusInterval)
					document.getElementsByClassName('form-check-input')[0].click()
					document.getElementsByClassName('inputclasstest')[0].click()
					var interval = setInterval(async () => {
						document.getElementsByClassName('btn-primary')[0].click()
						if (this.parseCsv !== null) {
							this.$store.state.loading = true
							clearInterval(interval)

							await this.forValue(interval)
							if (this.parseCsv !== null) {
								this.setdialog.items[index].value = this.parseCsv.map(x => x.housingType).toString()
								this.setdialog.items[index].csvImport = true
							}
							this.parseCsvStatus = false
							this.$store.state.loading = false
						}
					}, 1000)
				}
			}, 1000)
		},

		async forValue(interval) {
			for (let index = 0; index < this.parseCsv.length; index++) {
				const element = this.parseCsv[index]
				if (element.status === '임대') element.statusValue = 'lease'
				else if (element.status === '계약') element.statusValue = 'contract'
				else if (element.status === '가계약') element.statusValue = 'noContract'
				else if (element.status === '공실') element.statusValue = 'vacancy'
				else if (element.status === '예정') element.statusValue = 'toBeRented'
				else if (element.status === '기존') element.statusValue = 'existing'
				else if (element.status === '1차매각') element.statusValue = 'firstContract'
				else if (element.status === '2차매각') element.statusValue = 'secondContract'
				else {
					this.parseCsv = null
					clearInterval(interval)
					return alert(`${index + 2}열에 잘못된 정보가 있습니다.`)
				}
				if (index === this.parseCsv.length - 1) {
					return
				}
				// if (index === this.parseCsv.length - 1) return '1'
			}
		},
		async saveUser() {
			let data = {
				username: this.right_data.detail.username,
				email: this.right_data.detail.email,
				name: this.right_data.detail.username,
				phoneNumber: this.right_data.detail.phoneNumber,
				password: this.right_data.detail.password,
				confirmed: this.right_data.detail.confirmed,
				role: 1,
			}
			if (this.setdialog.type === 'create') {
				await this.$store.dispatch('register', data).then(res => {
					let id = { id: res.register.user.id }
					this.newUser.push(id)
					this.sweetDialog1.open = false
				})
			} else if (this.setdialog.type === 'edit') {
				data['id'] = this.right_data.detail.id
				delete data.password
				await this.$store
					.dispatch('updateUser', data)
					.then(() => {
						this.sweetDialog1.open = false
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		async forUserCreate(val) {
			let createUser = this.right_data.filter(x => !x.id)

			if (createUser.length > 0) {
				for (let index = 0; index < createUser.length; index++) {
					const element = createUser[index]

					let data = {
						businessID: this.setdialog.code,
						username: element.txtfield3.value,
						email: element.txtfield3.value,
						name: element.txtfield1.value,
						phoneNumber: element.txtfield2.value,
						password: element.txtfield4.value,
						confirmed: true,
					}
					if (this.setdialog.type === 'create') {
						data.businessID = val.code
					}
					await this.$store
						.dispatch('register', data)
						.then(() => {})
						.catch(err => {
							console.log(err)
						})
				}
				return
			} else {
				return
			}
		},
		async forUserUpdate() {
			let updateUser = this.right_data.filter(x => x.id)
			if (updateUser.length > 0) {
				for (let index = 0; index < updateUser.length; index++) {
					const element = updateUser[index]

					let data = {
						id: element.id,
						username: element.txtfield3.value,
						email: element.txtfield3.value,
						name: element.txtfield1.value,
						phoneNumber: element.txtfield2.value,
						password: element.txtfield4.value,
						confirmed: true,
					}
					if (element.txtfield4.value === '') {
						delete data.password
					}
					await this.$store
						.dispatch('updateUser', data)
						.then(() => {})
						.catch(err => {
							console.log(err)
						})
				}
			}
		},
		async forUserDelete() {
			if (this.deleteUserArr.length > 0) {
				for (let index = 0; index < this.deleteUserArr.length; index++) {
					const element = this.deleteUserArr[index]
					let data = {
						id: element.id,
						username: element.txtfield3.value,
						email: element.txtfield3.value,
						name: element.txtfield1.value,
						phoneNumber: element.txtfield2.value,
						// password: element.txtfield4.value,
						confirmed: false,
					}

					await this.$store
						.dispatch('updateUser', data)
						.then(() => {})
						.catch(err => {
							console.log(err)
						})
				}
			}
		},
		async userCheck() {
			for (let i = 0; i < this.right_data.length; i++) {
				if (!this.right_data[i].txtfield1.value) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '이름 입력'
					this.sweetInfo.content = '이름을 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (this.right_data[i].txtfield2.value.length < 12) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '연락처 형식'
					this.sweetInfo.content = '연락처를 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (this.right_data[i].txtfield3.value === '') {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '이메일 형식'
					this.sweetInfo.content = '이메일을 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (!this.checkUrl(this.right_data[i].txtfield3.value)) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '이메일 형식'
					this.sweetInfo.content = '이메일 형식이 아닙니다'
					return (this.sweetInfo.open = true)
				}
				if (!this.checkUrl(this.right_data[i].txtfield4.value === '')) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '비밀번로 입력'
					this.sweetInfo.content = '비밀번호를 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				// let data = {
				// 	id: this.right_data[i].user_id,
				// 	username: this.right_data[i].txtfield1.value,
				// 	name: this.right_data[i].txtfield1.value,
				// 	phoneNumber: this.right_data[i].txtfield2.value,
				// 	email: this.right_data[i].txtfield3.value,
				// 	password: this.right_data[i].txtfield4.value,
				// 	confirmed: this.right_data[i].user_confirmed,
				// }
				// this.right_data[i].detail = data
			}
		},
		async saveBusiness() {
			let data = {
				name: this.setdialog.items[0].value,
				phoneNumber: this.setdialog.items[1].value,
				workingHoursStart: this.setdialog.items[2].worktime1.time + ':00.000',
				workingHoursEnd: this.setdialog.items[2].worktime2.time + ':00.000',
				splitHoldingTime: this.setdialog.items[3].selectBox.value,
				maximumHoldingTime: this.setdialog.items[3].selectBox2.value,
				product: this.setdialog.items[5].value ? this.parseCsv : [],
				location: this.setdialog.items[6].value ? this.setdialog.items[6].value : null,
			}
			if (this.setdialog.type === 'create') {
				this.$store.state.loading = true
				await this.$store.dispatch('createBusiness', data).then(async res => {
					await this.forUserCreate(res.createBusiness.business)
					await this.forUserUpdate()
					await this.forUserDelete()
					if (data.product) {
						for (let i = 0; i < data.product.length; i++) {
							let item = {
								businessID: res.createBusiness.business.id,
								housingType: data.product[i].housingType,
								dong: data.product[i].dong,
								ho: data.product[i].ho,
								contractStatus: data.product[i].statusValue,
							}
							this.$store.dispatch('createProduct', item).then(() => {})
						}
					}
				})
				// 	console.log(this.right_data)
				// 	for (let idx = 0; idx < this.right_data.length; idx++) {
				// 		if (this.right_data[idx].detail) {
				// 			// let user = {
				// 			// 	username: this.right_data[idx].detail.username,
				// 			// 	email: this.right_data[idx].detail.email,
				// 			// 	name: this.right_data[idx].detail.username,
				// 			// 	phoneNumber: this.right_data[idx].detail.phoneNumber,
				// 			// 	password: this.right_data[idx].detail.password,
				// 			// 	confirmed: this.right_data[idx].detail.confirmed,
				// 			// }
				// 			if (this.setdialog.type === 'create') {
				// 				// await this.$store.dispatch('register', user).then(res => {
				// 				// 	let id = { id: res.register.user.id }
				// 				// 	this.newUser.push(id)
				// 				// 	this.sweetDialog1.open = false
				// 				// })
				// 			}
				// 		}
				// 	}
				// 	if (this.newUser) {
				// 		for (let i = 0; i < this.newUser.length; i++) {
				// 			let adduser = {
				// 				id: this.newUser[i].id,
				// 				businessID: res.createBusiness.business.id,
				// 				username: this.right_data[i].txtfield1.value,
				// 				email: this.right_data[i].txtfield3.value,
				// 			}
				// 			await this.forUpdateUser(adduser)
				// 		}
				// 		// setTimeout(() => {
				// 		await this.getTable()
				// 		// }, 2000)
				// 		// await this.getTable()
				// 		this.sweetDialog.open = false
				// 		this.modalClose()
				// 		this.businessRefresh()
				// 	} else {
				// 		this.sweetDialog.open = false
				// 		this.modalClose()
				// 		this.getTable()
				// 		this.businessRefresh()
				// 	}
				// })
			} else if (this.setdialog.type === 'edit') {
				this.$store.state.loading = true
				data.id = this.setdialog.id
				await this.$store.dispatch('updateBusiness', data).then(async res => {
					await this.forUserCreate()
					await this.forUserUpdate()
					await this.forUserDelete()
					if (data.product) {
						for (let i = 0; i < data.product.length; i++) {
							let item = {
								businessID: res.updateBusiness.business.id,
								housingType: data.product[i].housingType,
								dong: data.product[i].dong,
								ho: data.product[i].ho,
								contractStatus: data.product[i].statusValue,
							}

							await this.$store.dispatch('createProduct', item).then(() => {})
						}
					}
				})
			}
			// await this.userCheck

			await this.businessRefresh()
			await this.getTable()
			this.modalClose()
			this.sweetDialog.open = false
		},
		async forUpdateUser(adduser) {
			await this.$store.dispatch('updateUser', adduser).then(() => {})
		},
		async businessRefresh() {
			await this.$store.dispatch('businesses').then(async res => {
				this.$store.state.businessSelectBox.items = res.businesses
				this.$store.state.businessSelectBox.value = res.businesses[0].id
			})
		},
		checkManager(item) {
			if (!item.txtfield3.value) {
				this.sweetInfo.modalIcon = 'info'
				this.sweetInfo.title = '아이디 입력'
				this.sweetInfo.content = '아이디를 입력해주세요.'
				return (this.sweetInfo.open = true)
			}
			if (!this.checkUrl(item.txtfield3.value)) {
				this.sweetInfo.modalIcon = 'info'
				this.sweetInfo.title = '이메일 형식'
				this.sweetInfo.content = '이메일 형식이 아닙니다'
				return (this.sweetInfo.open = true)
			}
			// let data = {
			// 	id: item.user_id,
			// 	username: item.txtfield1.value,
			// 	name: item.txtfield1.value,
			// 	phoneNumber: item.txtfield2.value,
			// 	email: item.txtfield3.value,
			// 	password: item.txtfield4.value,
			// 	confirmed: item.user_confirmed,
			// }
			// this.right_data.detail = data
			if (this.setdialog.type === 'create') {
				this.sweetDialog1.title = '관리자 생성'
				this.sweetDialog1.content = '관리자를 생성합니다.'
				this.sweetDialog1.open = true
			} else if (this.setdialog.type === 'edit') {
				this.sweetDialog1.title = '관리자 적용'
				this.sweetDialog1.content = '관리자 내용을 적용합니다.'
				this.sweetDialog1.open = true
			}
		},
		businessCheck() {
			if (this.setdialog.type === 'create') {
				if (this.setdialog.items[0].value === '') {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '사업지명 입력'
					this.sweetInfo.content = '사업지명을 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (this.setdialog.items[0].txtfield.readonly === false) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '중복 체크'
					this.sweetInfo.content = '사업지명 중복 체크를 실행해주세요.'
					return (this.sweetInfo.open = true)
				}
			}
			if (this.setdialog.items[1].value === '') {
				this.sweetInfo.modalIcon = 'info'
				this.sweetInfo.title = '대표번호 입력'
				this.sweetInfo.content = '대표번호를 입력해주세요'
				return (this.sweetInfo.open = true)
			}
			if (!this.checkPhone(this.setdialog.items[1].value) && !this.checkCall(this.setdialog.items[1].value)) {
				this.sweetInfo.modalIcon = 'info'
				this.sweetInfo.title = '대표번호 형식'
				this.sweetInfo.content = '전화번호 형식이 아닙니다.'
				return (this.sweetInfo.open = true)
			}
			for (let i = 0; i < this.right_data.length; i++) {
				if (this.right_data[i].txtfield3.value) {
					if (!this.checkUrl(this.right_data[i].txtfield3.value)) {
						this.sweetInfo.modalIcon = 'info'
						this.sweetInfo.title = '이메일 형식'
						this.sweetInfo.content = '이메일 형식이 아닙니다.'
						return (this.sweetInfo.open = true)
					}
				}
			}
			for (let i = 0; i < this.right_data.length; i++) {
				if (!this.right_data[i].txtfield1.value) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '이름 입력'
					this.sweetInfo.content = '이름을 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (this.right_data[i].txtfield2.value.length < 12) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '연락처 형식'
					this.sweetInfo.content = '연락처를 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (this.right_data[i].txtfield3.value === '') {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '이메일 형식'
					this.sweetInfo.content = '이메일을 입력해주세요'
					return (this.sweetInfo.open = true)
				}
				if (!this.checkUrl(this.right_data[i].txtfield3.value)) {
					this.sweetInfo.modalIcon = 'info'
					this.sweetInfo.title = '이메일 형식'
					this.sweetInfo.content = '이메일 형식이 아닙니다'
					return (this.sweetInfo.open = true)
				}
				if (!this.right_data[i].id) {
					if (this.right_data[i].txtfield4.value === '') {
						this.sweetInfo.modalIcon = 'info'
						this.sweetInfo.title = '비밀번로 입력'
						this.sweetInfo.content = '비밀번호를 입력해주세요'
						return (this.sweetInfo.open = true)
					}
				}
			}
			if (this.setdialog.type === 'create') {
				this.sweetDialog.title = '사업지 생성'
				this.sweetDialog.content = '사업지를 생성합니다.'
				this.sweetDialog.open = true
			} else if (this.setdialog.type === 'edit') {
				this.sweetDialog.title = '사업지 수정'
				this.sweetDialog.content = '사업지 정보를 수정합니다.'
				this.sweetDialog.open = true
			}
		},
		modalClose() {
			this.setdialog.items[0].value = ''
			this.setdialog.items[1].value = ''
			this.setdialog.items[2].worktime1.time = ''
			this.setdialog.items[2].worktime2.time = ''
			this.setdialog.items[3].selectBox.value = '30분'
			this.setdialog.items[3].selectBox2.value = '120분'
			this.setdialog.items[4].value = ''
			this.setdialog.items[5].value = ''
			this.setdialog.items[6].value = ''
			this.parseCsv = null
			for (let i = 0; i < this.right_data.length; i++) {
				this.right_data[i].txtfield1.value = ''
				this.right_data[i].txtfield2.value = ''
				this.right_data[i].txtfield3.value = ''
				this.right_data[i].txtfield4.value = ''
			}
			this.right_data.splice(1, this.right_data.length - 1)
			this.setdialog.dialog = false
		},
		save_time1(picker) {
			this.setdialog.items[2].worktime1.dialog = false
			this.setdialog.items[2].worktime1.time = picker
		},
		save_time2(picker) {
			this.setdialog.items[2].worktime2.dialog = false
			this.setdialog.items[2].worktime2.time = picker
		},
		checkPhone(str) {
			let exp = /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/
			return exp.test(str)
		},
		checkCall(str) {
			let exp = /^(1544|1566|1577|1588|1644|1688)-?([0-9]{4})$/
			return exp.test(str)
		},
		checkUrl(str) {
			let exp = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
			return exp.test(str)
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
.table_all_gray:nth-last-child(7) {
	border-top: 1px solid black !important;
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
	border-right: 1px solid #c8c8c8;
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
</style>
