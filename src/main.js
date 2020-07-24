import Vue from 'vue'
import App from './App'
import router from './router'



new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>',
  render:h => h(App), //等价于上面两行代码
  // 配置路由器 产生 1.标签：<Route-Link><Route-View><Keep-Aline>  2.属性：$route  $router
  router
})
