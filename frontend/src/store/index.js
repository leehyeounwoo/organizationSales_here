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
} from '../apollo/mutation'
import { me, users, gotoWork, teams, products, ranks, businesses, settlements, notices } from '../apollo/query'
Vue.use(Vuex)
const tokenName = 'reserveLite-t'
export default new Vuex.Store({
	state: {
		headerMobileStatus: false,
		footerMobileStatus: false,
		leftNavDrawer: true,
		meData: { role: { name: '' }, group: { groupcode: '' }, visit: 0, day: 0, event: 0 },
		dashBoardList: [],
		loading: false,
		primary: '#3A258F',
	},
	mutations: {
		meData(state, payload) {
			state.meData = payload
		},
	},
	actions: {
		// sendMessage({ dispatch }, input) {
		// 	return new Promise((resolve, reject) => {
		// 		dispatch('getToken').then(res => {
		// 			var formData = new FormData()
		// 			formData.append('token', res.data.token)
		// 			for (var key in input) {
		// 				formData.append(key, input[key])
		// 			}
		// 			let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
		// 			axios
		// 				.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', formData, config)
		// 				.then(data => {
		// 					resolve(data)
		// 				})
		// 				.catch(err => {
		// 					reject(err)
		// 				})
		// 		})
		// 	})
		// },
		// eslint-disable-next-line no-empty-pattern
		// createSendMessage({}, input) {
		// 	return new Promise((resolve, reject) => {
		// 		apollo.clients['defaultClient']
		// 			.mutate({ mutation: createSendMessage, variables: input })
		// 			.then(res => {
		// 				resolve(res)
		// 			})
		// 			.catch(err => {
		// 				reject(err)
		// 			})
		// 	})
		// },
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
						resolve(data)
						commit('meData', data.me)
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
					.mutate({ mutation: createGotowork, variables: input })
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
		gotoWork({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: gotoWork,
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
		products({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: products,
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
		businesses({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: businesses,
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
		notices({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: notices,
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
