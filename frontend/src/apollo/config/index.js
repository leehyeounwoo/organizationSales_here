import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import axios from 'axios'
Vue.use(VueApollo)
// -------------------- 아폴로 셋팅 ------------------------ //
// HTTP connection to the API
const uploadLink = createUploadLink({
	uri: process.env.VUE_APP_BACKEND_URL + '/graphql',
})
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: process.env.BACKEND_HOST+'/graphql'
// })
// Cache implementation
const cache = new InMemoryCache()
// Create the apollo clients
const apolloClient = new ApolloClient({
	link: uploadLink,
	cache,
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
// let config = { headers: {} }
// let idArray = []
// let Apis = {}
// axios.get(process.env.VUE_APP_BACKEND_URL + '/user-api-List.json', config).then(({ data }) => {
// 	Apis = data
// 	idArray = Object.keys(data)
// 	idArray.forEach(element => {
// 		const set = createUploadLink({
// 			uri: Apis[element].admin + '/graphql',
// 		})
// 		const addClient = new ApolloClient({
// 			link: set,
// 			cache,
// 			defaultOptions: {
// 				watchQuery: {
// 					fetchPolicy: 'no-cache',
// 				},
// 				query: {
// 					fetchPolicy: 'no-cache',
// 				},
// 				mutate: {
// 					fetchPolicy: 'no-cache',
// 				},
// 			},
// 		})
// 		active.clients[element] = addClient
// 	})
// })
export default active
// -------------------- 아폴로 셋팅 ------------------------ //
