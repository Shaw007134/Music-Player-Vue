import * as types from './mutation-types'

const mutations = {
  //方便检测是否出错
  // ES6 允许字面量定义对象时，用表达式作为对象的属性名或方法名，即把表达式放在方括号内。
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.UPDATE_SINGER](state, objs) {
    state.singer = Object.assign({},state.singer,objs)
  },
}

export default mutations