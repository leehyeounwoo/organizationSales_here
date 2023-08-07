<template>
	<v-dialog v-model="dialog.open" persistent content-class="notice-modal" max-width="400">
		<v-layout align-center>
			<div class="reserve-title mr-auto">
				고객 기본정보
			</div>
			<v-btn icon @click="dialog.open = false" color="black">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<v-layout align-center style="" class="mt-4 mb-2">
			<div class="reserve-subTitle pl-3" style="margin-right:38px;">
				이름
			</div>
			<div class="mr-2" style="width:243px;">
				<v-text-field
					hideDetails
					dense
					:autofocus="false"
					outlined
					maxlength="255"
					flat
					v-model="dialog.value1"
					autocomplete="off"
				></v-text-field>
			</div>
		</v-layout>
		<v-layout align-center style="" class="mb-2">
			<div class="reserve-subTitle pl-3 mr-4">
				휴대전화
			</div>
			<div class="mr-2" style="width:243px;">
				<v-text-field
					readonly
					dense
					hideDetails
					:autofocus="false"
					outlined
					maxlength="255"
					flat
					v-model="dialog.value2"
					autocomplete="off"
				></v-text-field>
			</div>
		</v-layout>
		<v-layout align-center style="" class="mb-2">
			<div class="reserve-subTitle pl-3 mr-4">
				생년월일
			</div>
			<div style="width:243px;" class="mr-2">
				<v-text-field
					hideDetails
					dense
					:autofocus="false"
					outlined
					maxlength="255"
					flat
					v-model="dialog.value3"
					autocomplete="off"
				></v-text-field>
			</div>
		</v-layout>
		<div class="reserve-title mt-4">
			고객 부가정보
		</div>
		<v-layout align-center style="justify-content: space-around;" class="mt-2 mb-2">
			<div class="reserve-subTitle pl-3 mr-6">
				주택형
			</div>
			<div class="reserve-select">
				<v-select dense :items="dialog.data1Items" hideDetails solo flat v-model="dialog.data1" @change="data1"></v-select>
			</div>
		</v-layout>
		<v-layout align-center style="justify-content: space-around;" class="mb-2" v-if="dialog.data1">
			<div class="reserve-subTitle pl-3 mr-6">
				동선택
			</div>
			<div class="reserve-select">
				<v-select dense :items="dialog.data2Items" hideDetails solo flat v-model="dialog.data2" @change="data2"></v-select>
			</div>
		</v-layout>
		<v-layout align-center style="justify-content: space-around;" class="mb-2" v-if="dialog.data2">
			<div class="reserve-subTitle pl-3 mr-6">
				층선택
			</div>
			<div class="reserve-select">
				<v-select dense :items="dialog.data3Items" hideDetails solo flat v-model="dialog.data3" @change="data3"></v-select>
			</div>
		</v-layout>
		<v-layout align-center style="justify-content: space-around;" class="mb-2" v-if="dialog.data3">
			<div class="reserve-subTitle pl-3 mr-6">
				호선택
			</div>
			<div class="reserve-select">
				<v-select dense :items="dialog.data4Items" hideDetails solo flat v-model="dialog.data4"></v-select>
			</div>
		</v-layout>
		<v-layout align-center style="justify-content: space-around;" class="mb-2 mt-4">
			<div class="reserve-subTitle pl-2 pt-1">
				성향
			</div>
			<v-radio-group v-model="dialog.like" class="radio-group mt-0" row hideDetails>
				<v-radio class="mr-1" color="primary" v-for="n in likeList" :key="n" :label="`${n}`" :value="n"></v-radio>
			</v-radio-group>
		</v-layout>
		<div class="mt-2">
			<div class="reserve-subTitle pl-2">
				고객 특이사항
			</div>
			<v-textarea hideDetails height="70" class="mt-2 mb-3 ml-2" outlined v-model="dialog.comment" dense no-resize></v-textarea>
		</div>
		<!-- <v-layout align-center style="justify-content: space-around;" class="mb-2">
			<div class="reserve-subTitle pl-3 mr-6">
				상담횟수
			</div>
			<div style="width:243px;">
				<v-text-field
					hideDetails
					dense
					:autofocus="false"
					outlined
					maxlength="255"
					flat
					readonly
					v-model="counseloingCount"
					autocomplete="off"
				></v-text-field>
			</div>
		</v-layout> -->
		<v-layout align-center style="justify-content: space-around;" class="mb-2">
			<div class="reserve-subTitle pl-3 mr-6">
				계약여부
			</div>
			<div class="reserve-select">
				<v-select dense :items="contractItmes" hideDetails solo flat v-model="dialog.contract"></v-select>
			</div>
		</v-layout>
		<v-layout align-center style="justify-content: space-around;" class="mb-2">
			<div class="reserve-subTitle pl-3 mr-6" style="width:104px;">
				입금증
			</div>
			<div class="mr-2">
				<v-text-field
					hideDetails
					dense
					readonly
					:autofocus="false"
					outlined
					maxlength="255"
					flat
					v-model="dialog.fileName"
					autocomplete="off"
				></v-text-field>
			</div>
			<input
				type="file"
				style="display:none;"
				id="reserveListDialog_file_upload"
				@change="fileUploadChange"
				accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
			/>
			<v-btn color="point1" dark width="85" @click="fileUpload">
				파일첨부
			</v-btn>
		</v-layout>
		<v-btn dark @click="updateClient()" color="primary" block class="mt-7" rounded height="48">
			업데이트
		</v-btn>
		<v-btn dark @click="call()" color="#61C726" block class="mb-7 mt-3" rounded height="48">
			전화걸기
		</v-btn>
	</v-dialog>
</template>
<script>
export default {
	props: {
		dialog: Object,
	},
	data() {
		return {
			counseloingCount: 0,
			contractItmes: ['계약대기', '계약완료'],
			likeList: ['S', 'A', 'B', 'C', 'D'],
		}
	},
	methods: {
		data1(val, type) {
			this.dialog.data2Items = this.$store.state.business.product.filter(x => x.PD_Type === val).map(x => x.PD_Dong)
			if (type !== 'update') {
				this.dialog.data2 = ''
				this.dialog.data3 = ''
				this.dialog.data3Items = []
				this.dialog.data4Items = []
			}
		},
		data2(val, type) {
			const filterData = this.$store.state.business.product.filter(x => x.PD_Type === this.dialog.data1 && x.PD_Dong === val)
			this.dialog.data3Items = filterData.map(x => x.PD_Floor)
			if (type !== 'update') {
				this.dialog.data3 = ''
				this.dialog.data4Items = []
			}
		},
		data3(val, type) {
			const filterData = this.$store.state.business.product.filter(
				x => x.PD_Type === this.dialog.data1 && x.PD_Dong === this.dialog.data2 && x.PD_Floor === val,
			)
			this.$store.state.loading = true
			const data2 = {
				business: this.$store.state.business.id,
				contractStatus: '계약완료',
			}
			this.$store.dispatch('clients', data2).then(res2 => {
				if (type === 'update') {
					const myClients = res2.clients.filter(x => x.users_permissions_user.id !== this.$store.state.meData.id)
					this.dialog.data4Items = filterData
						.map(x => x.PD_Ho)
						.filter(
							x =>
								!myClients
									.map(x => x.customDatas)
									.filter(x => x.PD_Type === this.dialog.data1 && x.PD_Dong === this.dialog.data2 && x.PD_Floor === val)
									.map(x => x.PD_Ho)
									.includes(x),
						)
				} else {
					this.dialog.data4Items = filterData
						.map(x => x.PD_Ho)
						.filter(
							x =>
								!res2.clients
									.map(x => x.customDatas)
									.filter(x => x.PD_Type === this.dialog.data1 && x.PD_Dong === this.dialog.data2 && x.PD_Floor === val)
									.map(x => x.PD_Ho)
									.includes(x),
						)
				}
				this.$store.state.loading = false
			})
		},
		updateClient() {
			if (!this.dialog.value1) return alert('이름을 입력해 주세요.')
			if (!this.dialog.value2) return alert('휴대전화 번호를 입력해 주세요.')
			// if (!this.dialog.value1) return alert('생년월일을 입력해 주세요.')
			if (!this.dialog.like) return alert('성향을 입력해 주세요.')
			if (this.dialog.fileUpload) {
				this.$store.dispatch('upload', { files: this.dialog.file }).then(res => {
					let customDatas = {}
					customDatas['PD_Type'] = this.dialog.data1 ? this.dialog.data1 : ''
					customDatas['PD_Dong'] = this.dialog.data2 ? this.dialog.data2 : ''
					customDatas['PD_Floor'] = this.dialog.data3 ? this.dialog.data3 : ''
					customDatas['PD_Ho'] = this.dialog.data4 ? this.dialog.data4 : ''
					const data = {
						id: this.dialog.id,
						name: this.dialog.value1,
						phone: this.dialog.value2,
						birthday: this.dialog.value3,
						users_permissions_user: this.$store.state.meData.id,
						sex: this.dialog.value4,
						customDatas: customDatas,
						comment: this.dialog.comment,
						like: this.dialog.like,
						contractStatus: this.dialog.contract,
						pricePaper: res.data[0].id,
						agreeDate: new Date(),
						business: this.$route.params.id,
					}
					this.$store.dispatch('updateClient', data).then(() => {
						alert('고객이 정보가 수정되었습니다.')
						this.dialog.open = false
					})
				})
			} else {
				let customDatas = {}
				customDatas['PD_Type'] = this.dialog.data1 ? this.dialog.data1 : ''
				customDatas['PD_Dong'] = this.dialog.data2 ? this.dialog.data2 : ''
				customDatas['PD_Floor'] = this.dialog.data3 ? this.dialog.data3 : ''
				customDatas['PD_Ho'] = this.dialog.data4 ? this.dialog.data4 : ''
				const data = {
					id: this.dialog.id,
					name: this.dialog.value1,
					phone: this.dialog.value2,
					birthday: this.dialog.value3,
					address: this.dialog.value1,
					users_permissions_user: this.$store.state.meData.id,
					sex: this.dialog.value4,
					customDatas: customDatas,
					comment: this.dialog.comment,
					like: this.dialog.like,
					contractStatus: this.dialog.contract,
					agreeDate: new Date(),
					business: this.$route.params.id,
				}
				this.$store
					.dispatch('updateClient', data)
					.then(() => {
						this.dialog.open = false
						alert('고객이 정보가 수정되었습니다.')
					})
					.catch(err => {
						console.log({ err })
					})
			}
		},
		fileUploadChange(val) {
			this.dialog.file = val.target.files[0]
			this.dialog.fileName = val.target.files[0].name
			this.dialog.fileUpload = true
		},
		fileUpload() {
			document.getElementById(`reserveListDialog_file_upload`).click()
		},
		call() {
			document.location.href = 'tel:' + this.dialog.value2
		},
	},
}
</script>
