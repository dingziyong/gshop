// 操作state的对象  直接更新state多个方法  由action触发
import {RECEIVE_ADDRESS,RECEIVE_FOODTYPE,RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,
RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,
CLEAR_CART,RECEIVE_SEARCH_SHOPS} from './mutation-type'
 import Vue from 'vue'


export default {
	// 方法名   参数  address从服务器获取的
	[RECEIVE_ADDRESS](state,{address}){
		state.address = address
	},
	[RECEIVE_FOODTYPE](state,{foodType}){
		state.foodType = foodType
	},
	[RECEIVE_SHOPS](state,{shops}){
		state.shops = shops
	},
	[RECEIVE_USER_INFO](state,{userInfo}){
		state.userInfo = userInfo
	},
	// 用户登出 重置信息
	[RESET_USER_INFO](state){
		state.userInfo = {}
	},
	
	// mockJS
	[RECEIVE_INFO](state, {info}) {
	state.info = info
	},
	[RECEIVE_RATINGS](state, {ratings}) {
	state.ratings = ratings
	},
	[RECEIVE_GOODS](state, {goods}) {
	state.goods = goods
	},
	
	// 购物车 + -
	[INCREMENT_FOOD_COUNT](state,{food}){
		if(!food.count){
			// food.count = 1//第一次新增加属性，没有数据绑定  
			//  对象 属性名 属性值
			Vue.set(food,"count",1)//让新增的属性也有数据绑定
			// 将食物添加到cartFoods(食物种类)
			state.cartFoods.push(food)
		}else{
			food.count++
		}
	},
	[DECREMENT_FOOD_COUNT](state,{food}){
		if(food.count){
			food.count--
			if(food.count===0){
				// 将food从cartFoods中移出
				state.cartFoods.splice(state.cartFoods.indexOf(food),1)
			}
		}
	},
	// 清空购物车
	[CLEAR_CART](state){
		// 清除food中count
		state.cartFoods.forEach(food =>food.count = 0)
		// 清除购物车中所有列表项
		state.cartFoods = []
	},
	
	// 搜索
	[RECEIVE_SEARCH_SHOPS](state,{searchShops}){
		state.searchShops = searchShops
	}
}
