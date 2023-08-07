<template>
	<v-dialog v-model="setdialog.dialog" persistent fullscreen>
		<div style="background-color:#ffffff; height:100%;">
			<v-layout justify-center class="tab_name_bar">
				<div class="header_left_btn">
					<v-btn icon x-large>
						<v-icon @click="click_close" style="color:#633efd;">
							mdi-chevron-left
						</v-icon>
					</v-btn>
				</div>
				<span style="color:#633efd;">
					고객관리
				</span>
			</v-layout>
			<v-layout class="mx-10 my-10 ">
				<v-text-field
					density="compact"
					variant="solo"
					label="고객 이름 또는 전화번호로 검색하세요 "
					append-icon="mdi-magnify"
					color="#633efd"
					single-line
					hide-details
					v-model="datas.input"
					@click:append="click_search"
					@keydown.enter="click_search"
				></v-text-field>
			</v-layout>
			<div class="mx-10">
				<v-layout v-if="user_list.length === 0" align-center justify-center class="py-7" style="border-top:1px solid #C4C4C4">
					<v-flex x12 class="client_search_text">
						검색결과가 없습니다.
					</v-flex>
				</v-layout>
				<v-layout
					wrap
					v-else
					align-center
					justify-center
					class="py-7"
					style="border-top:1px solid #C4C4C4; max-height:200px; overflow:auto;"
				>
					<v-flex xs12 v-for="(user, index) in user_list" :key="user.id + index">
						<v-layout justify-center align-center class="mb-1">
							<v-flex xs1 class="client_search_text3">
								<input type="radio" label="" :value="index" v-model="radio.value" @click="click_radio(index)" />
							</v-flex>
							<v-flex xs2 class="client_search_text2">{{ user.name }}</v-flex>
							<v-flex xs6 class="client_search_text2">{{ user.phone }}</v-flex>
							<v-flex xs3 class="client_search_text2">{{ user.birthday | birth }}</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout align-center justify-center class="pb-7 mt-5" style="border-bottom:1px solid #C4C4C4">
					<v-btn class="ml-3" color="#707070" outlined dark width="128" style="border-radius:15px;" @click="click_direct">
						직접 입력
					</v-btn>
				</v-layout>
			</div>
			<div v-if="direct && !select" class="mx-10">
				<v-layout align-center class="mt-5">
					<div class="client-subTitle pl-2">
						고객
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
						@input="input_text()"
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
						autocomplete="off"
						@input="input_text()"
					></v-text-field>
				</v-layout>
			</div>
			<v-layout
				v-if="select === true || (direct === true && this.datas.value1 && this.datas.value2)"
				justify-center
				align-center
				class="client_footer"
			>
				<v-flex xs12 class="client_footer_text" @click="click_select">
					선 택
				</v-flex>
			</v-layout>
			<v-layout v-else justify-center align-center class="client_footer_disabled">
				<v-flex xs12 class="client_footer_text">
					선 택
				</v-flex>
			</v-layout>
		</div>
		<sweet-alert :dialog="sweetDialog" @click="clickSave()" @close="clickCLose()" />
	</v-dialog>
</template>

<script>
import { sweetAlert } from '@/components'

export default {
	components: { sweetAlert },
	data() {
		return {
			direct: false,
			phoneReadOnly: false,
			phoneErrorMessage: '',
			phoneSuccessMessage: '',
			datas: {
				input: '',
				value1: '', // 이름
				value2: '', // 휴대전화
			},
			radio: {
				value: '',
				obj: {},
			},
			select: false,
			user_list: [],
			sweetDialog: {
				// 저장 확인 팝업
				open: false,
				title: '중복된 회원',
				content: `존재하는 회원입니다. 상세화면으로 이동하시겠습니까?`,
				cancelBtnText: '아니요',
				buttonType: 'twoBtn',
				saveBtnText: '확인',
				modalIcon: 'success',
			},
		}
	},
	props: {
		setdialog: Object,
	},
	filters: {
		birth(value) {
			if (value === null) {
				return ''
			} else {
				return value.substr(2, 2) + '.' + value.substr(4, 2) + '.' + value.substr(6, 2)
			}
		},
	},
	watch: {
		setdialog: {
			deep: true,
			async handler() {
				if (this.setdialog.dialog) {
					await this.check_client()
				} else this.click_close()
			},
		},
	},
	methods: {
		async clickSave() {
			let data = {
				name: this.radio.obj.name,
				phone: this.radio.obj.phone,
				id: this.radio.obj.id,
				radio_select: true,
			}
			this.$emit('select_user', data)
			this.click_close()
			this.sweetDialog.open = false
		},
		clickCLose() {
			let data = {
				name: this.datas.value1,
				phone: this.datas.value2,
				radio_select: false,
			}
			this.$emit('select_user', data)
			this.click_close()
		},
		click_direct() {
			this.direct = true
			this.select = false
			this.radio.value = ''
		},
		check_client() {
			this.$store.state.loading = true
			this.datas.input = this.setdialog.data.value2
			this.datas.value1 = this.setdialog.data.value1
			this.datas.value2 = this.setdialog.data.value2
			let input = {
				phone: this.datas.value2,
			}
			this.$store.dispatch('clients', input).then(res => {
				this.user_list = res.clients
				this.$store.state.loading = false
			})
		},
		click_radio(index) {
			if (this.radio.value === index) {
				this.radio.value = ''
				this.select = false
				this.radio.obj = {}
			} else {
				this.select = true
				this.direct = false
				this.radio.obj = this.user_list[index]
			}
		},
		input_text() {},
		click_close() {
			this.setdialog.dialog = false
			this.datas = {
				input: '',
				value1: '',
				value2: '',
			}
			this.radio.value = ''
			this.select = false
			this.direct = false
		},
		click_search() {
			let input
			if (isNaN(this.datas.input)) {
				input = {
					name: this.datas.input,
				}
			} else {
				input = {
					phone: this.datas.input,
				}
			}
			this.$store.state.loading = true
			this.$store.dispatch('clients', input).then(res => {
				this.user_list = res.clients
				this.$store.state.loading = false
			})
		},
		click_select() {
			let data
			if (this.direct) {
				let input = {
					phone: this.datas.value2,
				}
				this.$store.dispatch('clients', input).then(res => {
					if (res.clients.length > 0) {
						this.sweetDialog.open = true
					} else {
						data = {
							name: this.datas.value1,
							phone: this.datas.value2,
							radio_select: false,
						}
						this.$emit('select_user', data)
						this.click_close()
					}
				})
			} else {
				data = {
					name: this.radio.obj.name,
					phone: this.radio.obj.phone,
					id: this.radio.obj.id,
					radio_select: true,
				}
				this.$emit('select_user', data)
				this.click_close()
			}
		},
	},
	created() {},
}
</script>

<style></style>
