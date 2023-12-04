<template>
	<v-row class="fill-height">
		<v-col>
			<v-sheet height="64">
				<v-toolbar flat>
					<v-btn fab text small color="grey darken-2" @click="prev">
						<v-icon small>
							mdi-chevron-left
						</v-icon>
					</v-btn>
					<v-btn fab text small color="grey darken-2" @click="next">
						<v-icon small>
							mdi-chevron-right
						</v-icon>
					</v-btn>
					<v-toolbar-title v-if="$refs.calendar">
						{{ $refs.calendar.title }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-flex xs4>
						<v-layout>
							<v-flex xs2>
								<span style="font-size:0.75rem;">
									계약상태
								</span>
							</v-flex>
							<!-- <v-flex xs3>
						<div style="width:10px; height:10px; background-color:red; display: inline-flex;  border:1px solid black;"></div>
						상담예정 : 건
						<v-icon style="margin-bottom: 1px;" small @click="refreshAction()">mdi-refresh</v-icon>
					</v-flex> -->
							<v-flex v-for="(status, index) in vacationStatus" :key="index">
								<div
									:style="'width:10px; height:10px; background-color:' + status.color + '; display: inline-flex;  border:1px solid black;'"
								></div>
								<span style="font-size:0.75rem;">
									{{ status.title }}
								</span>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
								<span>{{ typeToLabel[type] }}</span>
								<v-icon right>
									mdi-menu-down
								</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="type = 'day'">
								<v-list-item-title>Day</v-list-item-title>
							</v-list-item>

							<v-list-item @click="type = 'month'">
								<v-list-item-title>Month</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</v-sheet>
			<v-sheet height="600">
				<v-calendar
					ref="calendar"
					v-model="focus"
					color="primary"
					:events="events"
					:event-color="getEventColor"
					:type="type"
					@click:event="showEvent"
					@click:more="viewDay"
					@click:date="viewDay"
					@change="updateRange"
				></v-calendar>
				<!-- <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
					<v-card color="grey lighten-4" min-width="350px" flat>
						<v-toolbar :color="selectedEvent.color" dark>
							<v-btn icon>
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
							<v-toolbar-title> {{ selectedEvent.name }}</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>mdi-heart</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</v-toolbar>
						<v-card-text>
							<span v-html="selectedEvent.details"></span>
						</v-card-text>
						<v-card-actions>
							<v-btn text color="secondary" @click="selectedOpen = false">
								Cancel
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu> -->
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
export default {
	data: () => ({
		vacationStatus: [
			{
				title: '연차',
				color: '#ff6600',
			},
			{
				title: '오전반차',
				color: '#0168b2',
			},
			{
				title: '오후반차',
				color: '#323153',
			},
			{
				title: '병가',
				color: '#e24bff',
			},
			{
				title: '기타',
				color: '#c6c6c6',
			},
		],
		focus: '',
		type: 'month',
		typeToLabel: {
			month: 'Month',
			week: 'Week',
			day: 'Day',
			'4day': '4 Days',
		},
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [],
		colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
		names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
	}),
	mounted() {
		this.$refs.calendar.checkChange()
	},
	methods: {
		viewDay({ date }) {
			this.focus = date
			this.type = 'day'
		},
		getEventColor(event) {
			return event.color
		},

		prev() {
			this.$refs.calendar.prev()
		},
		next() {
			this.$refs.calendar.next()
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event
				this.selectedElement = nativeEvent.target
				requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)))
			}

			if (this.selectedOpen) {
				this.selectedOpen = false
				requestAnimationFrame(() => requestAnimationFrame(() => open()))
			} else {
				open()
			}

			nativeEvent.stopPropagation()
		},
		async updateRange() {
			let vacationIDArr = []
			let userData = []

			let input = {
				roleName: 'Counselor',
				businessID: this.$store.state.businessSelectBox.value,
				workingStatus: true,
			}

			await this.$store.dispatch('users', input).then(res => {
				userData = res.users
				for (let i = 0; i < res.users.length; i++) {
					vacationIDArr.push(res.users[i].id)
				}
			})

			let unattendedData = {
				vacationStatus: 'agree',
				idArr: vacationIDArr,
			}
			let eventCount
			await this.$store.dispatch('vacations', unattendedData).then(res => {
				eventCount = res.vacations
			})
			// { start, end }
			const events = []
			// const min = new Date(`${start.date}T00:00:00`)
			// const max = new Date(`${end.date}T23:59:59`)
			// const days = (max.getTime() - min.getTime()) / 86400000

			for (let i = 0; i < eventCount.length; i++) {
				// const allDay = this.rnd(0, 3) === 0
				// const firstTimestamp = this.rnd(min.getTime(), max.getTime())
				// const first = new Date(firstTimestamp - (firstTimestamp % 900000))
				// const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
				// const second = new Date(first.getTime() + secondTimestamp)
				let userName = userData.filter(x => x.id === eventCount[i].userID)[0].name
				//  ${eventCount[i].vacationReason}
				events.push({
					name: `${userName} (${this.vacationTypeConvert(eventCount[i].vacationType)})`,
					start: new Date(this.$moment(eventCount[i].date)),
					end: new Date(this.$moment(eventCount[i].date).add(1, 'h')),
					color: this.vacationTypeColor(eventCount[i].vacationType),
					// timed: true,
				})
			}
			this.events = events
		},
		vacationTypeConvert(val) {
			if (val === 'vacation') return '연차'
			if (val === 'morningVacation') return '오전 반차'
			if (val === 'afternoonVacation') return '오후 반차'
			if (val === 'sick') return '병가'
			if (val === 'etc') return '기타'
			return '-'
		},
		vacationTypeColor(val) {
			if (val === 'vacation') return '#ff6600'
			if (val === 'morningVacation') return '#0168b2'
			if (val === 'afternoonVacation') return '#323153'
			if (val === 'sick') return '#e24bff'
			if (val === 'etc') return '#c6c6c6'
			return '#3f3f3fde'
		},
		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a
		},
	},
}
</script>

<style></style>
