// 基于state的gettter计算属性的对象
export default {
	totalCount(state){//购物车中食物的列表数组
		// 统计 cartFoods中的count
		return state.cartFoods.reduce((preTotal,food) =>preTotal+food.count ,0)//参数1 回调函数 参数2初始值为0
	},
	totalPrice(state){
		return state.cartFoods.reduce((preTotal,food) =>preTotal+food.count*food.price ,0)
	}
}
