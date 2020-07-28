import Vue from 'vue'
import App from './App'
import router from './router'//注册router  没有到下级目录
import store from './store'//注册store

import {Button} from "mint-ui" // 注册全局组件标签
import  './mock/mockServer.js'  //加载mock

import VueLazyload from 'vue-lazyload'
import loading from './assets/img/loading.gif'

import './filters/index.js'//加载过滤器

Vue.component(Button.name,Button)//<mt-button> 全局标签
Vue.use(VueLazyload, {//内部自定义了一个指令lazy   v-lazy
	loading
})
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>',
  render:h => h(App), //等价于上面两行代码
  // 配置路由器 产生 1.标签：<Route-Link><Route-View><Keep-Aline>  2.属性：$route  $router
  router,//vue-router
  // 配置store对象 所有vuex管理的组件中都增加了$store属性，是一个store对象
  // 有属性： state:注册的state对象  getters:注册的getters对象
  // 有方法： dispacth()分发调用action 
  store,//vuex
})
