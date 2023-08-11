<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search" justify-end>
			<v-flex style="font-size:0.75rem;">
				<span class="mr-4 ml-4" style="font-weight:bold;"> {{ teamData.length }}개팀 / {{ totalUserLength }}명 </span>
				<span class="mr-2 pa-1 blueBox"> 근무 : 110명 </span>
				<span class="mr-2 pa-1 greenBox">
					휴무 : 5명
				</span>
				<span class="pa-1 yellowBox">
					미확인 : 5명
				</span>
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
				<v-layout mt-1 justify-center style="border:1px solid black;" @click="dataSetting(team, index)">
					{{ team.title }}/{{ team.count }} 명
				</v-layout>
				<v-layout mt-1 v-if="team.userData">
					<v-flex mr-1 class="blueBox text-center">16명</v-flex>
					<v-flex ml-1 mr-1 class="greenBox text-center">2명</v-flex>
					<v-flex ml-1 class="yellowBox text-center">2명</v-flex>
				</v-layout>
				<v-layout mt-1>
					<v-flex xs6 v-for="(user, index) in team.userData" :key="index">
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
		// const usersViewData = {
		// 	role: 3,
		// }
		// await this.usersView(usersViewData)
		const teamsViewData = {
			useYn: true,
		}

		await this.teamsView(teamsViewData)

		await this.usersConnectionView()

		const ranksViewData = {
			useYn: true,
		}
		await this.ranksView(ranksViewData)
		for (let index = 0; index < this.teamData.length; index++) {
			const element = this.teamData[index]
			const usersConnectionTeamViewData = {
				teamID: element.id,
			}
			await this.usersConnectionTeamView(usersConnectionTeamViewData)
		}
		this.teamData = JSON.parse(JSON.stringify(this.teamData))
		// await this.dataSetting()
		this.$store.state.loading = false
	},
	methods: {
		async usersView(usersViewData, index) {
			console.log(usersViewData)
			await this.$store
				.dispatch('users', usersViewData)
				.then(res => {
					console.log(res)
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
					this.rankData = res.ranks
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async usersConnectionView() {
			await this.$store
				.dispatch('usersConnection', {})
				.then(async res => {
					console.log(res)
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
					this.teamData.filter(x => x.id === usersConnectionTeamViewData.teamID)[0]['count'] = res.usersConnection.aggregate.count
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async dataSetting(team, index) {
			this.$store.state.loading = true
			if (team.userData) {
				delete team.userData
				this.teamData = JSON.parse(JSON.stringify(this.teamData))
				this.$store.state.loading = false
			} else {
				const usersViewData = {
					role: 3,
					teamID: team.id,
				}
				await this.usersView(usersViewData, index)
				const gotoworksView = {
					date: this.$moment().format('YYYY-MM-DD'),
				}
				await this.gotoworksView(gotoworksView, index)
				const vacaationsView = {}
				await this.vacaationsView(vacaationsView, index)
				this.$store.state.loading = false
			}
		},
		async gotoworksView(gotoworksView, index) {
			await this.$store
				.dispatch('gotoWork', gotoworksView)
				.then(res => {
					console.log(res)
					this.teamData[index].workCount = res.gotoworksConnection.aggregate.count
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		async vacaationsView(vacaationsView, index) {
			await this.$store
				.dispatch('usersConnection', vacaationsView)
				.then(res => {
					console.log(res)
					console.log(index)
					// this.teamData[index].vacationCount=
				})
				.catch(err => {
					console.log(err)
					this.$store.state.loading = false
				})
		},
		SearchBiz() {},
	},
	data() {
		return {
			totalUserLength: 0,
			backendURL: process.env.VUE_APP_BACKEND_URL,
			teamData: [],
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
				items: [],
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
