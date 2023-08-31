import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import apollo from '../apollo/config'
// import axios from 'axios'
import {
	login,
	createGotowork,
	updateGotowork,
	deleteGotowork,
	updateVacation,
	updateUser,
	updateSettlement,
	createBusiness,
	updateNotice,
	createSettlementTurnTable,
	updateSettlementTurnTable,
	createNotice,
	fileUpload,
	createMessage,
	updateMessage,
	register,
	createSystem,
	createProduct,
	deleteProduct,
	createSettlementEditLogs,
	updateProduct,
	createAssignment,
	updateBusiness,
	sendSmsSettlement,
	updateAssignment,
	createTeam,
	createRank,
	createSettlement,
	updateSettlement_front,
	createVacation,
	updateTeam,
	updateRank,
} from '../apollo/mutation'
import {
	me,
	users,
	gotoWork,
	teams,
	products,
	ranks,
	businesses,
	settlements,
	notices,
	businesses_title,
	messages,
	businessManager,
	systems,
	usersConnection,
	settlementEditLogs,
	assignments,
	vacations,
	emailDuplicate,
	settlementsList,
	productsCount,
	usersConnectionTeamArr,
} from '../apollo/query'
Vue.use(Vuex)
const tokenName = 'reserveLite-t'
export default new Vuex.Store({
	state: {
		countShow: [
			{
				count1: 0,
				count2: 0,
				count3: 0,
			},
			{
				count1: 0,
				count2: 0,
				count3: 0,
			},
			{
				count1: 0,
				count2: 0,
				count3: 0,
			},
			{
				count1: 0,
				count2: 0,
				count3: 0,
			},
		],
		backServer: process.env.VUE_APP_BACKEND_URL,
		headerMobileStatus: false,
		footerMobileStatus: false,
		leftNavDrawer: true,
		businessSelectBox: {
			items: [],
			value: '',
			hideDetail: true,
			outlined: true,
			class: 'small_font bizInput',
			itemText: 'name',
			itemValue: 'id',
		},
		meData: { role: { name: '' }, name: '', team: { title: '' }, rank: { rankName: '' } },
		dashBoardList: [],
		loading: false,
		primary: '#3A258F',
		primary2: '#633efd',
	},
	mutations: {
		meData(state, payload) {
			state.meData = payload
		},
	},
	actions: {
		// eslint-disable-next-line no-empty-pattern
		me({ commit }) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: me,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						if (data.me.teamID) {
							Axios.get(process.env.VUE_APP_BACKEND_URL + '/team_data_api.json').then(res => {
								data.me.team = res.data.filter(x => Number(x.id) === Number(data.me.teamID))[0]
								resolve(data)
								commit('meData', data.me)
							})
						} else {
							resolve(data)
							commit('meData', data.me)
						}
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		login({ commit }, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({ mutation: login, variables: input })
					.then(({ data }) => {
						sessionStorage.setItem(tokenName, data.login.jwt)
						commit('meData', data.login.user)
						resolve(data.login.user)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		upload({}, input) {
			return new Promise((resolve, reject) => {
				var formData = new FormData()
				formData.append('files', input.file)
				let config = { headers: { 'Content-Type': 'multipart/form-data' } }
				Axios.post(process.env.VUE_APP_BACKEND_URL + '/upload', formData, config)
					.then(data => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		multipleUpload({}, input) {
			return new Promise((resolve, reject) => {
				var formData = new FormData()
				input.forEach(file => {
					formData.append('files', file)
				})
				let config = { headers: { 'Content-Type': 'multipart/form-data' } }
				Axios.post(process.env.VUE_APP_BACKEND_URL + '/upload', formData, config)
					.then(data => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		users({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: users,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createGotowork({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createGotowork,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateGotowork({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateGotowork,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		deleteGotowork({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: deleteGotowork,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		deleteProduct({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: deleteProduct,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		gotoWork({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: gotoWork,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		emailDuplicate({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: emailDuplicate,
						variables: input,
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		settlementsList({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: settlementsList,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		productsCount({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: productsCount,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		vacations({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: vacations,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		products({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: products,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		businesses({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: businesses,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		notices({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: notices,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		businesses_title({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: businesses_title,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateVacation({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateVacation,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateUser({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateUser,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		teamsList({}) {
			return new Promise((resolve, reject) => {
				Axios.get(process.env.VUE_APP_BACKEND_URL + '/team_data_api.json')
					.then(data => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		teams({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: teams,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		ranks({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: ranks,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		settlements({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: settlements,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},

		// eslint-disable-next-line no-empty-pattern
		updateSettlement({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateSettlement,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createBusiness({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createBusiness,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateNotice({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateNotice,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateBusiness({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateBusiness,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createVacation({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createVacation,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateSettlement_front({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateSettlement_front,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createSettlementTurnTable({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createSettlementTurnTable,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateSettlementTurnTable({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateSettlementTurnTable,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},

		// eslint-disable-next-line no-empty-pattern
		createNotice({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createNotice,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		fileUpload({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: fileUpload,
						variables: input,
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createMessage({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createMessage,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateMessage({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateMessage,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateProduct({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateProduct,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createAssignment({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createAssignment,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		register({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: register,
						variables: input,
						// context: {
						// 	headers: {
						// 		Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
						// 	},
						// },
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		messages({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: messages,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		usersConnectionTeamArr({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: usersConnectionTeamArr,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		businessManager({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: businessManager,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createSystem({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createSystem,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createProduct({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createProduct,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		systems({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: systems,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		usersConnection({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: usersConnection,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createSettlementEditLogs({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createSettlementEditLogs,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateAssignment({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateAssignment,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateTeam({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateTeam,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		updateRank({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: updateRank,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		settlementEditLogs({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: settlementEditLogs,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		sendSmsSettlement({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: sendSmsSettlement,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		assignments({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: assignments,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createTeam({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createTeam,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createRank({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createRank,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createSettlement({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.mutate({
						mutation: createSettlement,
						variables: input,
						context: {
							headers: {
								Authorization: 'Bearer ' + sessionStorage.getItem(tokenName),
							},
						},
					})
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
	},

	modules: {},
})
