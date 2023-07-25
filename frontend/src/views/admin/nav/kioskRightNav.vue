<template>
	<div class="alertLayout">
		<!-- alert head -->
		<v-layout wrap class="alertHead" align-baseline>
			알림
			<v-spacer />
			<btn v-if="$store.state.bellStatus" :btn="showAllBtn" btn_txt="모두 보기" @click="toAllAlert"></btn>
		</v-layout>
		<!-- 새로운 알림 -->
		<v-layout wrap>
			<v-flex lg12 xs12 v-if="newAlert.length > 0">
				<div class="alertSort">새로운 알림</div>
			</v-flex>
			<v-flex xs12>
				<v-card class="alertCard" elevation="1" v-for="(alert, i) in newAlert" :key="i">
					<v-layout class="alertText">
						<!-- alert Icon -->
						<div>
							<v-icon :color="alert.color">mdi-{{ alert.icon }}</v-icon>
						</div>
						<!-- alert content -->
						<div style="overflow:auto">
							<div class="alertName" :style="`color:${alert.color}`">
								{{ alert.title }}
							</div>
							<div class="alertContent">
								{{ alert.content }}
							</div>
							<div :style="`color:${alert.color}; font-weight:bold;`">
								{{ alert.time }}
							</div>
						</div>
						<!-- close button -->
						<div class="ml-3">
							<v-icon color="grey lighten-1" @click="closeAlert(alert)">mdi-close</v-icon>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
		<!-- 이전 알림 -->
		<v-layout wrap>
			<v-flex lg12 xs12 v-if="pervAlert.length > 0">
				<div class="alertSort">이전 알림</div>
			</v-flex>
			<v-flex xs12>
				<v-card class="alertCard" elevation="1" v-for="(alert, i) in pervAlert" :key="'alert' + i">
					<v-layout class="alertText">
						<!-- alert Icon -->
						<div>
							<v-icon :color="alert.color">mdi-{{ alert.icon }}</v-icon>
						</div>
						<!-- alert content -->
						<div style="overflow:auto">
							<div class="alertName" :style="`color:${alert.color}`">
								{{ alert.title }}
							</div>
							<div class="alertContent">
								{{ alert.content }}
							</div>
							<div :style="`color:${alert.color}; font-weight:bold;`">
								{{ alert.time }}
							</div>
						</div>
						<!-- close button -->
						<div class="ml-3">
							<v-icon color="grey lighten-1" @click="closeAlert(alert)">mdi-close</v-icon>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { btn } from '@/components/index'
export default {
	components: {
		btn,
	},
	data() {
		return {
			showAllBtn: {
				class: 'showAllAlert',
				text: true,
				color: 'skyblue',
			},
			newAlert: [],
			pervAlert: [],
		}
	},
	created() {
		setTimeout(() => {
			this.alerts()
		}, 500)
	},
	methods: {
		alerts() {
			let data = {
				groupcode: this.$store.state.meData.group ? this.$store.state.meData.group.groupcode : this.$store.state.meData.groupcode,
				show: true,
			}

			this.$store
				.dispatch('alerts', data)
				.then(res => {
					let newItems = []
					let prevItems = []
					let item = {}

					let date = this.$moment()
						.subtract(7, 'day')
						.format('YYYY-MM-DD HH:mm')
					res.data.alerts.forEach(e => {
						item = e
						if (item.type === 'update') {
							item.icon = 'alert-outline'
							item.color = 'orange'
						} else if (item.type === 'delete') {
							item.icon = 'alert-rhombus-outline'
							item.color = 'red'
						} else if (item.type === 'created') {
							item.icon = 'checkbox-marked-outline'
							item.color = 'green'
						} else if (item.type === 'payment' || item.type === 'paymentCancel' || item.type === 'paymentRefund') {
							item.icon = 'alert-box-outline'
							item.color = '#4169E3'
						} else if (item.type.includes('max')) {
							item.icon = 'alert-box-outline'
							item.color = '#4169E3'
						}
						item.time = this.$moment(e.created_at).format('MM/DD HH:mm')

						let alertTime = this.$moment(e.created_at).format('YYYY-MM-DD HH:mm')
						if (alertTime > date) {
							newItems.push(item)
						} else {
							prevItems.push(item)
						}
					})

					let newSort = newItems.sort((a, b) => {
						return new Date(b.created_at) - new Date(a.created_at)
					})
					let preSort = prevItems.sort((a, b) => {
						return new Date(b.created_at) - new Date(a.created_at)
					})
					this.newAlert = newSort
					this.$store.state.bellNum.alert = newSort.length
					this.pervAlert = preSort
				})
				.catch(() => {})
		},

		closeAlert(item) {
			this.$store.state.loading = true
			const data = {
				id: item.id,
				show: false,
			}
			this.$store
				.dispatch('updateAlert', data)
				.then(() => {
					this.alerts()
					this.$store.state.loading = false
				})
				.catch(err => {
					console.log({ err })
				})
		},
		toAllAlert() {
			this.$router.push({ name: 'allAlert' })
			this.$store.state.bellStatus = false
		},
		passedTIme(createdAt) {
			// 알림 받은 시간 차 표시
			const milliSeconds = new Date() - createdAt
			const seconds = milliSeconds / 1000
			if (seconds < 60) return `방금 전`
			const minutes = seconds / 60
			if (minutes < 60) return `${Math.floor(minutes)}분 전`
			const hours = minutes / 60
			if (hours < 24) return `${Math.floor(hours)}시간 전`
			const days = hours / 24
			if (days < 7) return `${Math.floor(days)}일 전`
			const weeks = days / 7
			if (weeks < 5) return `${Math.floor(weeks)}주 전`
			const months = days / 30
			if (months < 12) return `${Math.floor(months)}개월 전`
			const years = days / 365
			return `${Math.floor(years)}년 전`
		},
	},
}
</script>

<style lang="scss" scoped>
.alertHead {
	font-size: 30px;
	font-weight: bold;
	padding: 20px 24px;
	.showAllAlert {
		font-size: 14px;
		font-weight: normal;
		color: dodgerblue;
		cursor: pointer;
		padding: 0px 4px !important;
		height: 26px;
	}
}
.alertSort {
	font-size: 20px;
	font-weight: bold;
	padding: 10px 24px;
}
.alertCard {
	margin: 10px 24px;
	font-size: 14px;
	width: max-content;
	max-width: calc(100% - 48px);
}
.alertText {
	padding: 10px 7px;
	gap: 7px;
}
.alertName {
	font-weight: bold;
	color: #555f6e;
}
.alertContent {
	color: #555f6e;
}
.alertLayout {
	width: 100%;
	max-width: 700px;
}
</style>
<style></style>
