import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getter'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // 严格模式检测state的修改是否来自mutation
  // 不建议在production使用
  plugins: debug ? [createLogger()] : []
})
