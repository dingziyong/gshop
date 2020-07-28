// vuex管理对象 store  ( 需要4个配置选项 对应4个对象类型  模块 )  vuex核心管理对象

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 声明使用插件
Vue.use(Vuex)

export default new Vuex.Store({
	state,//状态对象
	mutations,//包含多个更新state函数的对象
	actions,//包含多个对应事件回调函数的对象
	getters//包含多个get计算属性函数的对象
})
