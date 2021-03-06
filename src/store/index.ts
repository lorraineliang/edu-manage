import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    collapse: JSON.parse(localStorage.getItem('collapse') || 'false'),
    course: {}
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止页面刷新数据丢失 需要把user数据持久化
      localStorage.setItem('user', payload)
    },
    setCollapse (state, payload) {
      state.collapse = JSON.parse(payload)
      localStorage.setItem('collapse', payload)
    },
    setCourse (state, payload) {
      state.course = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
