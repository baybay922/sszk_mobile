import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import storage from '../storage.js'
Vue.use(Vuex)

const state = {
  orderAdultNum: 1,
  orderChildNum: 0,
  departCity: '',
  arriveCity: '',
  positionCity: '',
  customName: '',
  customPhoneNum: '',
  customUserName: '',
  setIime:''
}

let store = new Vuex.Store({
  state,
  actions,
  mutations,
  storage
})
export default store;
