<template>
	<div class="counselor_container">
		<div class="counsel_create_wrap sticky_wrap small_sticky_header pt-0">
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="to_bizDashboard()">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						공지사항
					</span>
				</v-layout>
			</div>

			<div class=" ma-4">
				<div class="mb-4">
					<v-text-field
						:autofocus="false"
						class="search-textfiled"
						placeholder="검색어를 입력하세요"
						hideDetails
						maxlength="255"
						append-icon="mdi-magnify"
						flat
						dense
						color="primary2"
						v-model="search"
						autocomplete="off"
					></v-text-field>
					<!-- @keydown.enter="reservations()"
						@click:append="reservations()" -->
				</div>
				<v-data-table
					:search="search"
					:headers="headers"
					:items="desserts"
					mobile-breakpoint="100"
					class=""
					@click:row="openNotice"
					disable-sort
					:footer-props="{ itemsPerPageText: '' }"
				>
					<!-- show-expand -->
					<template v-slot:[`item.created_at`]="{ item }">
						<div>
							{{ $moment(item.created_at).format('YYYY-MM-DD') }}
						</div>
					</template>
					<template v-slot:[`item.title`]="{ item }">
						<div>
							<!-- <v-badge color="green" left content="new" v-if="$moment().diff($moment(item.created_at), 'days') < 8"> -->
							<!-- </v-badge> -->
							<v-layout v-if="item.fixYn" align-center>
								<v-img
									lazy-src="https://picsum.photos/id/11/10/6"
									max-height="12"
									max-width="12"
									src="@/assets/images/ico/clip.png"
								></v-img>
								<v-flex ml-1>
									{{ item.title }}
								</v-flex>
							</v-layout>
							<v-layout v-else-if="$moment().diff($moment(item.created_at), 'days') < 8" align-center>
								<!-- <v-img lazy-src="" width="15" height="15" src="@/assets/images/ico/clip.png"></v-img> -->
								<v-img
									lazy-src="https://picsum.photos/id/11/10/6"
									max-height="12"
									max-width="12"
									src="@/assets/images/ico/n_mark.png"
								></v-img>
								<v-flex ml-1>
									{{ item.title }}
								</v-flex>
							</v-layout>
							<!-- <v-img src="@/assets/images/ico/n_mark.png" width="15" style="display:inline-flex" /> -->

							<v-layout v-else align-center>
								<v-flex>
									{{ item.title }}
								</v-flex>
							</v-layout>
						</div>
					</template>
					<template v-slot:expanded-item="{ headers, item }">
						<td :colspan="headers.length">More info about {{ item.name }}</td>
					</template>
				</v-data-table>
				<!-- <v-layout justify-end>
			<v-btn color="point3" dark @click="excelExport">
				엑셀저장
			</v-btn>
		</v-layout> -->
			</div>
			<!-- <counselorFooter class="bottom_fix" /> -->
			<noticeDialog :dialog="noticeDialog" />
		</div>
	</div>
</template>
<script>
import noticeDialog from './noticeDialog.vue'
// import { counselorFooter } from '@/components'

export default {
	components: {
		noticeDialog,
		// counselorFooter,
	},
	data() {
		return {
			noticeDialog: {
				open: false,
				title: '',
				content: '',
				created_at: '',
				file: {},
			},
			headers: [
				{
					text: '날짜',
					align: 'center',
					value: 'created_at',
					width: 150,
				},
				{ text: '제목', value: 'title', align: 'left' },
			],
			expanded: [],
			desserts: [],
			search: '',
			startPicker: {
				date: this.$moment()
					.subtract(6, 'days')
					.format('YYYY-MM-DD'),
			},
			endPicker: {
				date: this.$moment().format('YYYY-MM-DD'),
			},
			day: '7일',
			days: ['30일', '21일', '14일', '7일'],
		}
	},
	created() {
		this.notices()
	},
	methods: {
		to_bizDashboard() {
			// 뒤로가기 버튼
			this.$router.go(-1)
		},
		notices() {
			const data = {
				business: this.$route.params.id,
				show: true,
				status: true,
			}
			this.$store.dispatch('notices', data).then(res => {
				res.notices.sort((a, b) => {
					return new Date(b.created_at) - new Date(a.created_at)
				}),
					res.notices.sort((a, b) => {
						return b.fixYn - a.fixYn
					}),
					(this.desserts = res.notices)
				this.$store.state.countShow[3].count1 = res.notices.filter(x => this.$moment().diff(this.$moment(x.created_at), 'days') < 8).length
				this.$store.state.countShow[3].count2 = localStorage.getItem('readNotice')
					? res.notices.length - (localStorage.getItem('readNotice').split(',').length - 1)
					: res.notices.length
				this.$store.state.countShow[3].count3 = res.notices.length
			})
		},
		openNotice(val) {
			this.noticeDialog.title = val.title
			this.noticeDialog.content = val.content
			this.noticeDialog.created_at = val.created_at
			this.noticeDialog.file = val.file ? val.file : {}
			this.noticeDialog.open = true
			let readNotice = ''
			if (localStorage.getItem('readNotice')) readNotice = localStorage.getItem('readNotice')
			if (readNotice.split(',').indexOf(val.id) === -1) readNotice += val.id + ','
			localStorage.setItem('readNotice', readNotice)
			this.$store.state.countShow[3].count2 = this.desserts.length - (readNotice.split(',').length - 1)
			if (this.$store.state.countShow[3].count2 < 0) {
				localStorage.removeItem('readNotice')
				localStorage.setItem('readNotice', val.id + ',')
				this.$store.state.countShow[3].count2 = this.desserts.length - 1
			}
		},
		excelExport() {},
		searchCounselor() {},
		allowed_datesEnd(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment().format('YYYY-MM-DD') >= val
			}
			return val
		},
		dayChange(val) {
			if (this.days[0] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(30, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[1] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(21, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[2] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(14, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[3] === val) {
				this.startPicker = {
					date: this.$moment()
						.subtract(7, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
			}
		},
	},
}
</script>
