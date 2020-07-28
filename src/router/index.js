// 路由器 对象模块  （路由器中配置路由）
import Vue from 'vue'
import VueRouter from 'vue-router'

// import MSite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Personal from '../pages/Personal/Personal.vue'
// import Search from '../pages/Search/Search.vue'

//路由组件懒加载  根据路由对JS代码进行分割
// 执行此函数才会加载路由组件  请求对应路由路径的时候才会执行
// import函数
const MSite = () =>import('../pages/Msite/Msite.vue')
const Order = () =>import('../pages/Order/Order.vue')
const Personal = () =>import('../pages/Personal/Personal.vue')
const Search = () =>import('../pages/Search/Search.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'



// 声明使用插件
Vue.use(VueRouter)
export  default new VueRouter({
	// VueRouter构造函数   传递配置对象 配置所有路由
	// 将路由组件映射成路由
	// meta:{showFooter:true}控制Footer的显示和隐藏 没有配置该属性 值默认是false 
	routes:[
		{path:'/',redirect:'/miste'},//默认路由
		{path:'/msite',component:MSite},
		{path:'/order',component:Order},
		{path:'/personal',component:Personal},
		{path:'/search',component:Search},
		{path:'/login',component:Login,meta:{showFooter:true}},
		{
			path:'/shop',
			component:Shop,
			children:[
				{path:'/shop/goods',component:ShopGoods,meta:{showFooter:true}},
				{path:'/shop/info',component:ShopInfo,meta:{showFooter:true}},
				{path:'/shop/rating',component:ShopRating,meta:{showFooter:true}},
				{path:'',redirect:'/shop/goods'},//默认路由
			]
		},
	]
	
})