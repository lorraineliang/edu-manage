import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止页面刷新数据丢失 需要把user数据持久化
      localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
