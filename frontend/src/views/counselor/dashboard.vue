<template>
	<!-- 로그인 화면 로고 -->
	<v-layout style="max-width:450px; margin: 0 auto;" wrap justify-center>
		<div class="work-header">
			<v-card class="ma-4 pa-4 header-card">
				<v-layout align-center>
					<div class="title">
						{{ $store.state.meData.name }}
					</div>
					<div class="ml-2"><span class="point">상담사</span>님, 오늘도 즐거운 하루 되세요.</div>
				</v-layout>
				<div>
					팀 추가시 추가 필요 / 1팀 (예시)
				</div>
				<v-btn block color="point4" dark elevation="0" class="mt-2" @click="openQr">
					<v-icon class="mr-1">
						mdi-qrcode-scan
					</v-icon>
					출퇴근 QR 코드 열기
				</v-btn>
			</v-card>
		</div>
		<QRcode :dialogQr="dialogQr" />
		<v-card class="dashboard-card my-4" elevation="3">
			<v-layout align-center>
				<div class="main-text">
					홀딩 물건 현황
				</div>
				<v-spacer></v-spacer>
				<div>
					<v-btn rounded small color="primary2" dark>전체보기</v-btn>
				</div>
			</v-layout>
			<v-layout align-center wrap>
				<v-flex v-for="(list, i) in holdingList" :key="i" class="holding-text" xs4>
					{{ list }}
				</v-flex>
			</v-layout>
		</v-card>
		<v-card class="dashboard-card mt-1 mb-4" elevation="3">
			<v-layout align-center>
				<div class="main-text">
					물건 홀딩 요청
				</div>
				<v-spacer></v-spacer>
				<v-flex xs4 class="pl-2">
					<v-select :items="times" v-model="time" solo outlined class="nomal-select" hideDetails color="primary2"></v-select>
				</v-flex>
			</v-layout>
			<v-layout align-center wrap class="mt-4">
				<v-flex xs4 class="pr-2">
					<v-select
						placeholder="주택형"
						:items="products1"
						v-model="product1"
						solo
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-flex xs4>
					<v-select
						placeholder="동"
						:items="products2"
						v-model="product2"
						solo
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-flex xs4 class="pl-2">
					<v-select
						placeholder="호수"
						:items="products3"
						v-model="product3"
						solo
						outlined
						class="nomal-select"
						hideDetails
						color="primary2"
					></v-select>
				</v-flex>
				<v-btn block color="primary2" @click="holding" class="mt-4" rounded>
					{{ holdingText }}
				</v-btn>
				<div class="explain-text point4--text mt-2">
					상담 물건 홀딩은 최대 60분까지 가능합니다.
				</div>
			</v-layout>
		</v-card>
		<v-layout wrap justify-center>
			<v-flex xs6 :class="i % 2 !== 0 ? 'pl-2 pb-4' : 'pr-2 pb-4'" v-for="(icon, i) in iconList" :key="i">
				<v-card class="dashboard-icons pa-4" elevation="0">
					<div class="icon">
						<v-img class="mx-auto" :src="`${require(`@/assets/images/ico/${icon.icon}.png`)}`" width="35" height="35"></v-img>
					</div>
					<div class="text primary2--text">
						{{ icon.title }}
					</div>
				</v-card>
			</v-flex>
		</v-layout>
	</v-layout>
</template>

<script>
import QRcode from './QR/QRcode.vue'
export default {
	components: {
		QRcode,
	},
	data() {
		return {
			iconList: [
				{
					icon: 'footer_공지사항',
					title: '공지사항',
				},
				{
					icon: 'footer_출퇴근관리',
					title: '근태관리',
				},
				{
					icon: 'footer_고객관리',
					title: '계약관리',
				},
				{
					icon: 'footer_상담관리',
					title: '정산관리',
				},
			],
			holdingText: '',
			products1: [],
			products2: [],
			products3: [],
			product1: '',
			product2: '',
			product3: '',
			holdingList: ['hi', 'hi2', 'h3', 'hi'],
			dialogQr: { open: false, code: '!', business: { title: '' }, meData: { created_at: this.$moment(), name: '' } },
			times: [],
			time: '30분',
		}
	},
	created() {
		for (let index = 1; index < 7; index++) {
			const el = index * 10
			this.times.push(String(el) + '분')
		}
	},
	methods: {
		holding() {
			alert('홀딩')
		},
		openQr() {
			this.dialogQr.open = true

			this.dialogQr.code = this.$store.state.meData.id
			this.dialogQr.meData = this.$store.state.meData
		},
	},
}
</script>
<style lang="scss">
.dashboard-icons {
	cursor: pointer;
	border-radius: 10px !important;
	text-align: center;
	width: 100%;
	.text {
		margin-top: 8px;
		font-weight: bold;
		font-size: 20px;
	}
}
.explain-text {
	font-size: 12px;
}
.nomal-select {
	.v-input__control {
		min-height: 30px !important;
		height: 30px !important;
	}
	.v-input__slot {
		min-height: 30px !important;
		height: 30px !important;
	}
}
.holding-text {
	font-size: 14px;
	color: #878787;
}
.dashboard-card {
	margin: 0 auto;
	.main-text {
		font-size: 14px;
		font-weight: bold;
	}
	width: 100%;
	background-color: white !important;
}
.work-header {
	width: 100%;
	background-color: #633efd;
	.header-card {
		width: auto;
	}
}
</style>
