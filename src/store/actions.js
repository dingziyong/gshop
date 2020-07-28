// 操作mutation对象  间接更新state多个方法的对象 接收组件通知触发 mutation调用
import {RECEIVE_ADDRESS,RECEIVE_FOODTYPE,RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,
RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,
CLEAR_CART,RECEIVE_SEARCH_SHOPS} from './mutation-type'
import {reqAddress,reqFoodList,reqShops,reqUserInfo,reqLogout,reqShopInfo,reqShopRating,
reqShopGoods,reqSearchShops} from "../api" //引入API接口函数

// 与后台交互的异步actions
export default {
	// 异步获取地址  
	async getAddress({commit,state}){
		// 发送异步ajax请求  async await
		const geohash = state.latitude+','+state.longitude //从state里面取数据
		const result = await reqAddress(geohash)//{"code":0,"data":{vuex管理的数据对象}}
		// 根据请求结果提交一个mutation
		if(result.code===0){//0获取到数据
			const address = result.data
			// 提交mutation
			commit(RECEIVE_ADDRESS,{address})
		}
	},
	// 异步获取获取msite页面食品分类列表
	async getFoodList({commit}){
		// 发送异步ajax请求 dispatch
		const result = await reqFoodList()
		// 根据请求结果提交一个mutation
		if(result.code===0){//0获取到数据
			const foodType = result.data
			// 提交mutation
			commit(RECEIVE_FOODTYPE,{foodType})
		}
	},
	// 异步获取商家列表
	async getShops({commit,state}){
		// 发送异步ajax请求  async await
		const {longitude,latitude} = state
		const result = await reqShops(longitude,latitude)//{"code":0,"data":{vuex管理的数据对象}}
		// 根据请求结果提交一个mutation
		if(result.code===0){//0获取到数据
			const shops = result.data
			// 提交mutation
			commit(RECEIVE_SHOPS,{shops})
		}
	},
	// 同步记录用户信息（同步是因为 我此时有用户信息不需要从后台获取）
	recordUserInfo({commit},userInfo){
		commit(RECEIVE_USER_INFO,{userInfo})
	},
	
	// (根据会话)异步获取用户信息 ，后台用户登录信息保存在session中
	// 这个方法应该在应用一打开的时候就调用 因此放在App.vue中调用
	async getUserInfo({commit}){
		const  result  = await reqUserInfo()
		if(result.code===0){
			const userInfo =result.data
			commit(RECEIVE_USER_INFO,{userInfo})
		}	
		
	},
	// 异步登出
	async logout({commit}){
		const  result = await reqLogout()
		if(result.code===0){
			commit(RESET_USER_INFO,{})
		}
	},
	
	// 异步获取商家信息
	async getShopInfo({commit},callback){
		const result = await reqShopInfo()
		if(result.code===0){
			const info = result.data
			info.score = 3.5
			commit(RECEIVE_INFO, {info})
			callback && callback()
		}
	},
	// 异步获取商家评价列表
	async getShopRatings({commit}, callback) {
		const result = await reqShopRatings()
		if(result.code===0) {
			const rating = result.data
			commit(RECEIVE_RATINGS, {rating})
			callback && callback()
		}
	},
	// 异步获取商家商品列表
	async getShopGoods({commit}, callback) {
		const result = await reqShopGoods()//异步发送请求
		if(result.code===0) {
			const goods = result.data
			commit(RECEIVE_GOODS, {goods})
			// 此时数据已经更新
			// 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
			callback && callback()
		}
	},
	// 同步更新food中的count
	updateFoodCount({commit},{isAdd,food}){
		if(isAdd){
			commit(INCREMENT_FOOD_COUNT,{food})
		}else{
			commit(DECREMENT_FOOD_COUNT,{food})
		}
	},
	// 同步清空购物车
	clearCart({commit}){
		commit(CLEAR_CART)
	},
	// 异步获取
	async searchShops({commit,state},keyword){
		const geohash = state.latitude+','+state.longitude 
		const result = await reqSearchShops(geohash,keyword)
		if(result.code===0){
			const searchShops = result.data
			commit(RECEIVE_SEARCH_SHOPS,{searchShops})
		}
	},
}
