<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter1" style="font-size:13px;"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter2" style="font-size:13px"></selectBox>
			</v-flex>
			<v-flex xs1 class="mr-2">
				<selectBox :sel="productFilter3" style="font-size:13px"></selectBox>
			</v-flex>
			<v-btn class="ml-3 search_btn" color="#009dac">적용</v-btn>
		</v-layout>
		<v-layout justify-end>
			<v-btn elevation="0" class="mt-3" color="#f0f2f8" style="border:1px solid #cfdcdd; font-size:13px">상태 업데이트</v-btn>
		</v-layout>
		<datatable :datatable="productManager" :teamChange="teamChange" :managerChoiceStatusChange="managerChoiceStatusChange"></datatable>
		<v-btn class="mt-3 new_biz" @click="holdTimeShow()">배정현황</v-btn>
		<holdTimeDetail :setdialog="holdingDetail" />
	</div>
</template>

<script>
import { selectBox, datatable } from '@/components/index.js'
import holdTimeDetail from '../../viewItem/holdTimeDetail.vue'

export default {
	async created() {
		let ok = 0
		const createInterval = setInterval(async () => {
			if (this.$store.state.businessSelectBox.value !== '') {
				const product_tableData = {
					businessID: this.$store.state.businessSelectBox.value,
				}
				await this.product_table(product_tableData)

				clearInterval(createInterval)
			}

			if (ok === 10) {
				clearInterval(createInterval)
				alert('비즈니스 정보가 없습니다.')
				this.$router.push({ name: 'dashBoard' })
			}
			ok += 1
		}, 1000)
	},
	components: {
		selectBox,
		datatable,
		holdTimeDetail,
	},
	data() {
		return {
			holdingDetail: {
				dialog: false,
				todayTime: '',
			},
			productFilter1: {
				placeholder: '주택형 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productFilter2: {
				placeholder: '동 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productFilter3: {
				placeholder: '호 선택',
				value: '',
				items: [],
				hideDetail: true,
				outlined: true,
				class: 'searchSel',
			},
			productManager: {
				headers: [
					{ text: '주택형', value: 'housingType', width: '6%' },
					{ text: '동', value: 'dong', width: '5%' },
					{ text: '호수', value: 'ho', width: '5%' },
					{ text: '담당자', value: 'manager', width: '21%' },
					{ text: '배정', value: 'holdTime', width: '28%' },
					{ text: '상태', value: 'product_status', width: '35%' },
				],
				class: 'datatablehover3',
				items: [],
				noweditting: '',
				itemsPerPage: 10,
				page: 1,
				pageCount: 0,
				product_manager: {
					placeholder: '담당자 지정여부',
					value: '미지정',
					items: ['담당자 지정', '미지정'],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},

				user: {
					placeholder: '상담사',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
				select_holding: {
					placeholder: '시간 선택',
					value: '',
					items: [],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
				holdingTime1: {
					dialog: false,
					time: '',
				},
				holdingTime2: {
					dialog: false,
					time: '',
				},
				holdingTime3: {
					placeholder: '선택',
					value: '',
					items: ['30분', '60분', '90분'],
					hideDetail: true,
					outlined: true,
					class: 'searchSel',
				},
			},
		}
	},
	methods: {
		managerChoiceStatusChange(val, item) {
			if (val === '담당자 지정') {
				const teamViewData = {
					businessID: this.$store.state.businessSelectBox.value,
				}
				this.$store.dispatch('teams', teamViewData).then(res => {
					item.team.items = res.teams
					item.team.disabled = false
				})
			} else {
				item.managerTeam = ''
				item.team.items = []
				item.team.disabled = true
			}
		},
		teamChange(val) {
			this.$store.state.loading = true
			const usersData = {
				teamID: val,
			}
			this.$store.dispatch('users', usersData).then(res => {
				console.log(res)
				this.$store.state.loading = false
			})
		},
		product_table(product_tableData) {
			this.$store.dispatch('products', product_tableData).then(res => {
				for (let index = 0; index < res.products.length; index++) {
					const element = res.products[index]
					element.managerChoiceStatus = '미지정'
					element.managerTeam = ''
					element.managerUser = ''
					element.team = {
						placeholder: '팀',
						value: '',
						items: [],
						disabled: true,
						hideDetail: true,
						outlined: true,
						class: 'searchSel',
						itemValue: 'id',
						itemText: 'title',
					}
				}
				this.productManager.items = res.products
			})
		},
		holdTimeShow() {
			this.holdingDetail.todayTime = this.$moment().format('YYYY-MM-DD HH:mm')
			this.holdingDetail.dialog = true
		},
	},
}
</script>

<style lang="scss"></style>
