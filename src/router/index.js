// 路由器 对象模块  （路由器中配置路由）
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Personal from '../pages/Personal/Personal.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

// 声明使用插件
Vue.use(VueRouter)
export  default new VueRouter({
	// VueRouter构造函数   传递配置对象 配置所有路由
	// 将路由组件映射成路由
	// meta:{showFooter:true}控制Footer的显示和隐藏 没有配置该属性 值默认是false 
	routes:[
		{path:'/msite',component:MSite,meta:{showFooter:true}},
		{path:'/order',component:Order,meta:{showFooter:true}},
		{path:'/personal',component:Personal,meta:{showFooter:true}},
		{path:'/search',component:Search,meta:{showFooter:true}},
		{path:'/login',component:Login},
		{path:'/',redirect:'/miste'}//默认路由
	]
	
})