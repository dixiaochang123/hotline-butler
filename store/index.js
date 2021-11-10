import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		serviceclass:'',
		token: uni.getStorageSync('token') ? uni.getStorageSync('token') :null,
	},
	getters:{
		serviceclass: state => state.serviceclass,
		token: state => state.token,
	},
    mutations: {
		serviceclass_change(state, data){
			state.serviceclass = data
		},
		setToken(state,data) {
			let token = uni.getStorageSync('token')
			if (token) {
				state.token = token;
			  } else {
				state.token = data;
			  }
		}
	},
    actions: {
		serviceclass_change({ commit }, data){
			commit('serviceclass_change', data)
		},
		setToken({ commit }, data){
			commit('setToken', data)
		}
	}
})
export default store