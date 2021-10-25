import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		serviceclass:''
	},
	getters:{
		serviceclass: state => state.serviceclass
	},
    mutations: {
		serviceclass_change(state, data){
			state.serviceclass = data
		}
	},
    actions: {
		serviceclass_change({ commit }, data){
			commit('serviceclass_change', data)
		}
	}
})
export default store