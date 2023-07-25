import Vue from 'vue'
import Vuex from 'vuex'
import apollo from '../apollo/config'
// import axios from 'axios'
import {} from '../apollo/mutation'
import { me } from '../apollo/query'
Vue.use(Vuex)
const tokenName = 'reserveLite-t'
export default new Vuex.Store({
	state: {
		leftNavDrawer: true,
	},
	mutations: {},
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
		// login({ commit }, input) {
		// 	return new Promise((resolve, reject) => {
		// 		apollo.clients['defaultClient']
		// 			.mutate({ mutation: login, variables: input })
		// 			.then(({ data }) => {
		// 				sessionStorage.setItem(tokenName, data.login.jwt)
		// 				commit('meData', data.login.user)
		// 				resolve(data.login.user)
		// 			})
		// 			.catch(err => {
		// 				reject(err)
		// 			})
		// 	})
		// },
	},
	modules: {},
})
