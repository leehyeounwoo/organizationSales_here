import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import axios from 'axios'
import { ApolloLink } from 'apollo-link'
Vue.use(VueApollo)
const { buildAxiosFetch } = require('@lifeomic/axios-fetch')
const CryptoJS = require('crypto-js')
const crypto = require('crypto')
const decodeByAES56 = (key, data) => {
	const cipher = CryptoJS.AES.decrypt(data, key)
	return cipher.toString(CryptoJS.enc.Utf8)
}
const createHashedPassword = password => {
	return crypto
		.createHash('sha512')
		.update(password)
		.digest('base64')
}
const authMiddleware = new ApolloLink((operation, forward) => {
	return forward(operation).map(response => {
		if (response.data.me) {
			const secretKey = process.env.VUE_APP_SECRET_KEY + createHashedPassword(response.data.me.created_at)
			const decodeDatas = decodeByAES56(secretKey, response.data.me.secret)
			return { data: { me: JSON.parse(decodeDatas) } }
		}
		const array = ['sendMessages', 'messages']
		for (let index = 0; index < array.length; index++) {
			const el = array[index]
			if (response.data[el]) {
				if (response.data[el].length > 0) {
					const datas = []
					const secretKey = process.env.VUE_APP_SECRET_KEY + createHashedPassword(response.data[el][0].created_at)
					for (let index = 0; index < response.data[el].length; index++) {
						const el = response.data[el][index]
						const decodeDatas = decodeByAES56(secretKey, el.secret)
						datas.push(JSON.parse(decodeDatas))
					}
					if (response.data[el + 'Connection']) {
						return { data: { [el]: datas, [el + 'Connection']: response.data[el + 'Connection'] } }
					} else {
						return { data: { [el]: datas } }
					}
				} else return response
			}
		}
	})
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
	link: authMiddleware.concat(
		createUploadLink({
			uri: process.env.VUE_APP_BACKEND_URL + '/graphq',
			fetch: buildAxiosFetch(axios, (config, input, init) => ({
				...config,
				onUploadProgress: init.onUploadProgress,
				introspect: false,
			})),
		}),
	),
	cache,
	bodyParserConfig: {
		limit: '9000mb',
	},
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
		},
		mutate: {
			fetchPolicy: 'no-cache',
		},
	},
})
const active = new VueApollo({
	clients: {
		apolloClient,
	},
	defaultClient: apolloClient,
})
export default active
