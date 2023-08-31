<template>
	<!-- 로그인 화면 로고 -->
	<v-layout style="margin: 0 auto; width:100vw;" wrap justify-center>
		<v-dialog :value="openDaum" width="500"> <VueDaumPostcode @complete="onComplete"/></v-dialog>
		<!-- 회웡가입 영역 -->
		<div class="mx-5" style="width:100%">
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="$router.go(-1)">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						정산요청
					</span>
				</v-layout>
			</div>
			<!-- 정보 입력 -->
			<div class="mt-4 mb-12">
				<!-- 개인정보 입력 -->
				<div class="px-4 pt-4 pb-4 input_field_white">
					<p class="input_main_title mb-0">
						계약정보
					</p>
					<strong>
						<div class="explain-text point4--text my-2">
							계약정보와 그에 따른 정산 상태를 확인합니다.
						</div>
					</strong>
					<!-- 텍스트필드 -->

					<div style="margin: 0 auto;">
						<datatable :datatable="datatable" class="front-datatable mb-2" />
					</div>
				</div>
				<div class="mt-4 px-4 py-4 input_field_white" v-if="moneyDatatable.items.length > 0">
					<p class="input_main_title">
						지급현황
					</p>
					<div style="margin: 0 auto;">
						<datatable :datatable="moneyDatatable" class="front-datatable mb-2" />
					</div>
				</div>
				<!-- 이메일 / 비밀번호 입력 -->
				<div class="mt-4 px-4 py-4 input_field_white">
					<v-layout align-center>
						<p class="input_main_title mb-0">
							정산요청
						</p>
						<v-spacer></v-spacer>
						<v-btn color="primary2" rounded dark small @click="sweetAlertInfo.open = true">증빙서류 안내</v-btn>
					</v-layout>
					<strong>
						<div class="explain-text point4--text my-2">
							분양계약서, 계약금 입금증, 완납증 등 고객 계약을 증빙할 수 있는 자료를 첨부하세요.
						</div>
					</strong>

					<v-layout class="mb-2">
						<v-text-field
							hideDetails
							:autofocus="false"
							class="txtLogin1_border_radius mb-2 mr-2"
							placeholder="※png, pdf, jpg"
							outlined
							flat
							dense
							readonly
							autocomplete="off"
							color="primary2"
						></v-text-field>
						<v-btn class="input_btn px-2" depressed @click="clickFileUploadImage()">
							<v-img max-width="14" class="mr-2" src="@/assets/images/input_btn.png" />파일첨부
						</v-btn>
					</v-layout>
					<div>
						<v-chip-group class="white--text">
							<v-chip
								v-for="(file, i) in files"
								:key="i"
								color="point6"
								close
								dark
								@click:close="deleteFiles(i)"
								@click="e => viewAttachment(e, file.url)"
							>
								{{ file.name }}
							</v-chip>
						</v-chip-group>
					</div>
				</div>
				<v-btn
					elevation="0"
					height="48"
					class="loginButton_small mt-10"
					block
					color="primary2"
					@click="createSettlement"
					rounded
					v-if="
						settlement.settlement_turn_tables.length === 0
							? true
							: settlement.settlement_turn_tables.filter(x => x.turnStatus === 'complete').length ===
							  settlement.settlement_turn_tables.length
							? false
							: true
					"
				>
					<span style="color:white;	font-weight: bold;"> 정산요청하기 </span>
				</v-btn>
			</div>
			<input
				type="file"
				style="display:none;"
				:id="'file_upload_settlement'"
				@change="fileUpload($event)"
				accept=".pdf, image/jpg, image/png, image/jpeg"
			/>
			<sweetAlertInfo :dialog="sweetAlertInfo" />
			<sweetAlert
				:dialog="sweetInfo"
				@close_active="sweetInfo.title === '요청완료' || sweetInfo.title === '접근불가' ? $router.push({ name: 'settlementTruns' }) : ''"
			/>
		</div>
	</v-layout>
</template>
<script>
import { sweetAlert, datatable, sweetAlertInfo } from '@/components'
export default {
	components: {
		sweetAlert,
		datatable,
		sweetAlertInfo,
	},
	data() {
		return {
			sweetAlertInfo: {
				open: false,
				title: '정산요청시 필요서류',
				content: `정산요청시 필요서류를 확인하세요.`,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
				info1: '※ 증빙서류 누락시 정산 승인이 보류 될 수 있으니 확인 후',
				info1_sub: '첨부바랍니다.',
				info2: '※ pdf, png, jpg파일만 업로드 가능합니다.',
				datatable: {
					headers: [
						{ text: '차수', value: 'trun_info', align: 'center' },
						{ text: '필요증빙 서류', value: 'paper_info', align: 'center', height: '60px' },
					],
					class: 'mt-0 info-datatable',
					items: [],
					noweditting: '',
					hidedefaultfooter: true,
					itemsPerPage: 99,
					page: 1,
					pageCount: 0,
				},
			},
			moneyDatatable: {
				headers: [
					{ text: '차수', value: 'trun', align: 'center' },
					{ text: '지급일', value: 'contractDate', align: 'center' },
					{
						text: '비율',
						align: 'center',
						value: 'amountValue',
					},
					{ text: '지급금액', value: 'amount', align: 'center' },
					{ text: '비고', value: 'depositFile', align: 'center' },
				],
				class: 'mt-0',
				items: [],
				noweditting: '',
				hidedefaultfooter: true,
				itemsPerPage: 99,
				page: 1,
				pageCount: 0,
			},
			datatable: {
				headers: [
					{ text: '계약자', value: 'name', align: 'center' },
					{ text: '계약일', value: 'contractDate', align: 'center' },
					{
						text: '계약 물건',
						align: 'center',
						value: 'product_settlements',
					},
					{ text: '수수료', value: 'totalPrice', align: 'center' },
				],
				class: 'mt-0',
				items: [],
				noweditting: '',
				hidedefaultfooter: true,
				itemsPerPage: 99,
				page: 1,
				pageCount: 0,
			},
			options: {},
			openDaum: false,
			addressCheck: false,
			products1: [],
			products2: [],
			products3: [],
			product1: '',
			product2: '',
			product3: '',
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			files: [],
			emailDuplicate: null,
			siginup: {
				name: '',
				phone: '',
				birth: '',
				location: '',
				subLocation: '',
			},
			productDatas: [],
			settlement: {},
		}
	},
	created() {
		this.sweetAlertInfo.datatable.items.push(
			{
				trun_info: '1차',
				paper_info: `분양계약서(사본) \n계약금 입금증(사본) \n기타 필요서류\n`,
			},
			{
				trun_info: '2차',
				paper_info: `중도금 납부 완납증(사본) \n기타 필요서류\n`,
			},
			{
				trun_info: '3차',
				paper_info: `분양대금 잔금 납부 완납증(사본) \n기타 필요서류\n`,
			},
		)
		this.$store.dispatch('settlementsList', { id: this.$route.params.id }).then(res => {
			if (res.settlements.length === 0)
				return this.open_disable_dialog(
					{
						title: '접근불가',
						content: `접근불가한 데이터 입니다..`,
					},
					'error',
				)
			this.settlement = res.settlements[0]
			console.log(res.settlements[0])
			if (res.settlements[0].attachment) {
				for (let index = 0; index < res.settlements[0].attachment.length; index++) {
					const el = res.settlements[0].attachment[index]
					this.files.push(el)
				}
			}
			this.products()
		})
	},
	methods: {
		viewAttachment(e, val) {
			const url = process.env.VUE_APP_BACKEND_URL + val
			const link = document.createElement('a')
			link.href = url
			link.target = '_blank'
			link.download = val
			link.click()
			link.remove()
			window.URL.revokeObjectURL(url)
		},
		deleteFiles(i) {
			this.files.splice(i, 1)
		},
		onComplete(val) {
			this.addressCheck = true
			this.siginup.location = val.address
			this.openDaum = !this.openDaum
		},
		products() {
			this.$store.dispatch('me').then(() => {
				this.$store.dispatch('products', { businessID: this.$store.state.meData.businessID }).then(res => {
					this.productDatas = res.products
					if (this.settlement.paymentReject)
						this.open_disable_dialog(
							{
								title: '정산요청 반려사유',
								content: `${this.settlement.rejectComment}`,
							},
							'warning',
						)

					if (this.settlement.settlement_turn_tables.length > 0) {
						let totalamountValue = 0
						let totalamout = 0
						this.settlement.settlement_turn_tables.forEach((el, index) => {
							this.moneyDatatable.items.push({
								trun: el.turnTableDegree,
								contractDate: el.prePaymentDate,
								amountValue: String(Math.floor((el.amount / this.settlement.totalPrice) * 100)) + '%',
								amount: el.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
								depositFile: el.depositFile,
							})
							if (el.depositFile) {
								totalamout += el.amount
								totalamountValue += Math.floor((el.amount / this.settlement.totalPrice) * 100)
							}
							if (index === this.settlement.settlement_turn_tables.length - 1) {
								this.moneyDatatable.items.push({
									trun: '지급금액',
									contractDate: '',
									amountValue: String(totalamountValue) + '%',
									amount: totalamout.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
									depositFile: '',
								})
								this.moneyDatatable.items.push({
									trun: '잔여금액',
									contractDate: '',
									amountValue: String(100 - totalamountValue) + '%',
									amount: (this.settlement.totalPrice - totalamout).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
									depositFile: '',
								})
							}
						})
					}
					this.datatable.items.push({
						name: this.settlement.name,
						contractDate: this.$moment(this.settlement.contractDate).format('YYYY.MM.DD'),
						totalPrice: this.settlement.totalPrice
							? this.settlement.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
							: '미산정',
						product: res.products.filter(x => x.id === this.settlement.ProductID)[0],
					})
				})
			})
		},
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
		},
		// 단일 파일 업로드
		fileUpload(event) {
			// - 파일형식 및 크기 : jpg, png / 최대 500KB
			if (event.target.files[0].size / 1024 > 500) {
				return this.open_disable_dialog({
					title: '용량초과',
					content: `500kb 이하의 파일을 업로드해주세요.`,
				})
			} else {
				this.files.push(event.target.files[0])
			}
		},
		clickFileUploadImage() {
			document.getElementById('file_upload_settlement').click()
		},
		phoneCheck(item) {
			//전화번호 체크
			let value = item
				.replace(/[^0-9.]/g, '')
				.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
				.replace('--', '-')
			this.siginup.phone = value
		},
		async createSettlement() {
			const filesData = this.files
			if (filesData.length > 0) {
				this.$store.state.loading = true
				const filesId = []
				for (let i = 0; i < filesData.length; i++) {
					const el = filesData[i]
					if (!el.id) {
						let input = {
							file: el,
						}
						await this.$store.dispatch('upload', input).then(res => {
							filesId.push(res.data[0].id)
						})
					} else filesId.push(el.id)
					if (filesData.length - 1 === i) {
						const data = {
							paymentReject: false,
							attachment: filesId,
							id: this.settlement.id,
							settlementStatus: 'waiting',
						}
						this.$store
							.dispatch('updateSettlement_front', data)
							.then(() => {
								this.$store.state.loading = false
								this.open_disable_dialog({ title: '요청완료', content: '정산요청이 완료되었습니다.' }, 'success')
							})
							.catch(err => {
								this.$store.state.loading = false
								this.open_disable_dialog({ title: '오류발생', content: '수정 도중 오류가 발생하였습니다. 관리자에게 문의하세요.' }, 'error')
								console.log({ err })
							})
					}
				}
			} else {
				this.open_disable_dialog({ title: '정산요청 파일첨부', content: '정산요청시에는 파일첨부가 필수입니다.' }, 'error')
			}
		},
	},
}
</script>
<style lang="scss">
.info-datatable {
	.v-data-table__mobile-row {
		height: 60px !important;
	}
}
</style>
