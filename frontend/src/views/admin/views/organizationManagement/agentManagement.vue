<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search" justify-end>
			<v-flex style="font-size:0.75rem;">
				<span class="mr-4 ml-4" style="font-weight:bold;"> {{ teamData.length }}개팀 / {{ totalUserLength }}명 </span>
				<span class="mr-2 pa-1 blueBox"> 근무 : {{ totalWorkCount }}명 </span>
				<span class="mr-2 pa-1 greenBox"> 휴무 : {{ totalVacationCount }}명 </span>
				<span class="pa-1 yellowBox"> 미확인 : {{ totalUserLength - totalWorkCount - totalVacationCount }}명 </span>
			</v-flex>
			<v-spacer></v-spacer>
			<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
				<selectBox :sel="searchsel1" :class="'searchSel'" style="font-size:12px"></selectBox>
			</v-flex>
			<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
				<selectBox :sel="searchsel2" :class="'searchSel'" style="font-size:12px"></selectBox>
			</v-flex>
			<v-flex style="max-width:200px;">
				<txtField class="search_box_admin" v-model="search_project" :txtField="search"></txtField>
			</v-flex>
			<v-flex class="ml-3" style="max-width:100px;">
				<v-btn class="search_btn" color="#5d19ff" @click="SearchBiz()" elevation="0"><v-icon>mdi-magnify</v-icon>조회</v-btn>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex mr-1 v-for="(team, index) in teamData" :key="index" xs2 style="font-size:0.75rem;">
				<v-layout mt-1 justify-center style="border:1px solid black; cursor:pointer;" @click="dataSetting(team, index)">
					{{ team.title }} / {{ team.count }} 명
				</v-layout>
				<v-layout mt-1 v-if="team.userData">
					<v-flex mr-1 class="blueBox text-center">{{ team.workCount }}명</v-flex>
					<v-flex ml-1 mr-1 class="greenBox text-center">{{ team.vacationCount }}명</v-flex>
					<v-flex ml-1 class="yellowBox text-center">{{ team.count - team.workCount - team.vacationCount }}명</v-flex>
				</v-layout>
				<v-layout mt-1 wrap>
					<v-flex xs6 v-for="(user, index) in team.userData" :key="index" @click="userInfoClick(team, user)" style="cursor:pointer;" mb-1>
						<v-layout style="border:1px solid black;  border-radius:5px;" :class="index % 2 === 0 ? 'mr-1' : 'ml-1'">
							<v-flex xs5>
								<div class="v-responsive__content">
									<v-avatar tile size="54">
										<!-- alt="John" -->
										<v-img
											:src="user.profile ? backendURL + user.profile.url : ''"
											lazy-src="https://picsum.photos/350/165?random"
											height="100%"
											width="100%"
											class="grey darken-4"
											style="border-radius: 5px 0px 0px 5px;"
										></v-img>
									</v-avatar>
								</div>
							</v-flex>
							<v-flex xs7 style="border-left:0.5px solid white; height:100%;">
								<v-layout class="blueBoxCard" justify-center :alt="user.username">
									<span
										style="overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;"
									>
										{{ user.username }}
									</span>
								</v-layout>

								<v-layout wrap class="grayBoxCard text-center" style="border-radius: 0 0 5px 0;">
									<v-flex xs12>계약수</v-flex>
									<v-flex xs12>12건</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>

					<!-- <v-flex xs6>
						<v-layout>
							<v-flex xs4>
								사진
							</v-flex>
							<v-flex xs8>
								<v-layout>상담사명</v-layout>
								<v-layout wrap>
									<v-flex xs12>계약수</v-flex>
									<v-flex xs12>12건</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex> -->
				</v-layout>
			</v-flex>
		</v-layout>
		<v-dialog v-if="infoDialog" v-model="infoDialog" width="25%">
			<v-card>
				<!-- <v-card-title>ss</v-card-title> -->

				<v-layout justify-center>
					<h2>직원 정보</h2>
				</v-layout>
				<v-layout mt-4>
					<v-flex xs5 class="text-center" pr-4>
						<v-avatar tile size="150">
							<v-img
								:src="dialogFileUrl !== '' ? backendURL + dialogFileUrl : ''"
								lazy-src="https://picsum.photos/350/165?random"
								height="100%"
								width="100%"
								class="grey darken-4"
							></v-img>
							<!-- style="border-radius: 5px 0px 0px 5px;" -->
						</v-avatar>
					</v-flex>
					<v-flex xs7 pr-8>
						<v-layout v-for="(edit, index) in rightEdit" :key="index" :style="index === 0 ? 'border-top:1px solid black' : ''">
							<v-flex py-2 class="notice_right_table" xs4>
								{{ edit.title }}
							</v-flex>
							<v-flex py-2 pl-4 xs8 class="notice_right_table2" style="font-size:0.75rem;">
								{{ edit.value }}
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-layout
					justify-center
					py-1
					mt-8
					style="background-color:rgb(87, 108, 215); color:white; font-size:0.75rem; font-weight:bold; cursor:pointer;"
					@click="infoDialog = false"
				>
					<v-icon small color="white" mr-1>mdi-check</v-icon>
					확인
				</v-layout>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {
	selectBox,
	txtField,
	//  btn
} from '@/components/index.js'
export default {
	components: {
		selectBox,
		txtField,
		// btn,
	},
	async created() {
		this.$store.state.loading = true
		const teamsViewData = {
			businessID: this.$store.state.businessSelectBox.value,
			useYn: true,
		}
		await this.teamsView(teamsViewData)
		const connectionUser = {
			businessID: this.$store.state.businessSelectBox.value,
			workingStatus: true,
			roleName: 'Counselor',
		}
		await this.usersConnectionView(connectionUser)

		const ranksViewData = {
			useYn: true,
		}
		await this.ranksView(ranksViewData)
		for (let index = 0; index < this.teamData.length; index++) {
			const element = this.teamData[index]
			const usersConnectionTeamViewData = {
				businessID: this.$store.state.businessSelectBox.value,
				teamID: element.id,
				workingStatus: true,
				roleName: 'Counselor',
			}
			await this.usersConnectionTeamView(usersConnectionTeamViewData)
		}
		const firstGotoworksViewData = {
			date: this.$moment().format('YYYY-MM-DD'),
		}
		await this.firstGotoworksView(firstGotoworksViewData)
		this.teamData = JSON.parse(JSON.stringify(this.teamData))
		console.log(this.teamData)
		this.teamData_origin = JSON.parse(JSON.stringify(this.teamData))
		// await this.dataSetting()
		await this.searchSelect()
		this.$store.state.loading = false
	},
	methods: {
		SearchBiz() {
			let item = JSON.parse(JSON.stringify(this.teamData_origin))
			if (this.searchsel1.value.value && this.searchsel1.value.value !== 'all') {
				item = item.filter(el => el.id === this.searchsel1.value.value)
			}
			this.teamData = item
		},
		async searchSelect() {
			let data = {
				businessID: this.$store.state.businessSelectBox.value,
				useYn: true,
			}
			await this.$store.dispatch('teams', data).then(res => {
				let item = [{ title: '전체', value: 'all' }]
				res.teams.forEach(el => {
					item.push({ title: el.title, value: el.id })
				})
				this.searchsel1.items = item
			})
		},
		async usersView(usersViewData, index) {
			await this.$store
				.dispatch('users', usersViewData)
				.then(res => {
					console.log(res.users)
					this.teamData[index].userData = res.users
					this.teamData = JSON.parse(JSON.stringify(this.teamData))
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async teamsView(teamsViewData) {
			await this.$store
				.dispatch('teams', teamsViewData)
				.then(async res => {
					console.log(res.teams)
					this.teamData = res.teams
					// this.teamData = JSON.parse(JSON.stringify(res.teams))
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async ranksView(teamsViewData) {
			await this.$store
				.dispatch('ranks', teamsViewData)
				.then(res => {
					console.log(res.ranks)
					this.rankData = res.ranks
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async usersConnectionView(connectionUser) {
			await this.$store
				.dispatch('usersConnection', connectionUser)
				.then(async res => {
					console.log(res.usersConnection)
					this.totalUserLength = res.usersConnection.aggregate.count
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async usersConnectionTeamView(usersConnectionTeamViewData) {
			await this.$store
				.dispatch('usersConnection', usersConnectionTeamViewData)
				.then(res => {
					console.log(res.usersConnection)
					this.teamData.filter(x => x.id === usersConnectionTeamViewData.teamID)[0]['count'] = res.usersConnection.aggregate.count
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async dataSetting(team, index) {
			this.$store.state.loading = true
			console.log(team)
			if (team.userData) {
				delete team.userData
				this.teamData = JSON.parse(JSON.stringify(this.teamData))
				this.$store.state.loading = false
			} else {
				const usersViewData = {
					businessID: this.$store.state.businessSelectBox.value,
					roleName: 'Counselor',
					teamID: team.id,
					workingStatus: true,
				}
				if (this.searchsel2.value.value && this.searchsel2.value.value !== 'all') {
					usersViewData.workingStatus = this.searchsel2.value.value
				}
				if (this.search_project) {
					usersViewData['username'] = this.search_project
				}
				await this.usersView(usersViewData, index)
				const gotoworksView = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
				console.log(gotoworksView)
				if (this.teamData[index].userData.map(x => x.id).length > 0) {
					gotoworksView['userID'] = this.teamData[index].userData.map(x => x.id)
				}
				await this.gotoworksView(gotoworksView, index)
				this.$store.state.loading = false
			}
		},
		async gotoworksView(gotoworksView, index) {
			await this.$store
				.dispatch('gotoWork', gotoworksView)
				.then(res => {
					console.log(res.gotoworks)
					this.teamData[index].workCount = res.gotoworks.filter(x => x.vacation === null).length
					this.teamData[index].vacationCount = res.gotoworks.filter(x => x.vacation !== null).length
					this.teamData = JSON.parse(JSON.stringify(this.teamData))
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async firstGotoworksView(gotoworksView) {
			await this.$store
				.dispatch('gotoWork', gotoworksView)
				.then(res => {
					this.totalWorkCount = res.gotoworks.filter(x => x.vacation === null).length
					this.totalVacationCount = res.gotoworks.filter(x => x.vacation !== null).length
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		userInfoClick(team, user) {
			this.rightEdit[0].value = user.username
			this.rightEdit[1].value = user.phoneNumber
			this.rightEdit[2].value = user.salesPhoneNumber
			// this.rightEdit[3].value = user.salesPhoneNumber
			this.rightEdit[4].value = this.$moment(user.created_at).format('YYYY-MM-DD HH:mm')
			this.rightEdit[5].value = team.title
			this.rightEdit[6].value = Math.floor(this.$moment.duration(this.$moment().diff(this.$moment(user.created_at))).asDays()) + '일'
			if (user.profile) {
				this.dialogFileUrl = user.profile.url
			} else {
				this.dialogFileUrl = ''
			}

			this.infoDialog = true
		},
	},
	data() {
		return {
			dialogFileUrl: '',
			rightEdit: [
				{
					title: '이름',
					value: '',
				},
				{
					title: '연락처',
					value: '',
				},
				{
					title: '영업번호',
					value: '',
				},
				{
					title: '사업자 정보',
					value: '',
				},
				{
					title: `등록일`,
					value: '',
				},
				{
					title: '팀',
					value: '',
				},
				{
					title: '근무기간',
					value: '',
				},
			],
			infoDialog: false,
			totalWorkCount: 0,
			totalVacationCount: 0,
			totalUserLength: 0,
			backendURL: process.env.VUE_APP_BACKEND_URL,
			teamData: [],
			teamData_origin: [],
			rankData: [],
			userData: [],
			searchsel1: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '팀선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel2: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [
					{ title: '전체', value: 'all' },
					{ title: '재직', value: true },
					{ title: '퇴직', value: false },
				],
				outlined: true,
				placeholder: '재직상태',
				returnObject: true,
				itemText: 'title',
			},
			search: {
				clearable: false,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			search_project: '',
		}
	},
}
</script>

<style>
.blueBox {
	background-color: rgb(72, 72, 213);
	color: white;
	border: 1px solid black;
}
.blueBoxCard {
	background-color: rgb(80, 80, 194);
	color: white;
}
.grayBoxCard {
	background-color: rgb(203, 203, 203);
	color: rgb(98, 98, 98);
}

.greenBox {
	background-color: rgb(79, 213, 72);
	color: white;
	border: 1px solid black;
}
.yellowBox {
	background-color: rgb(213, 175, 72);
	color: white;
	border: 1px solid black;
}
</style>
