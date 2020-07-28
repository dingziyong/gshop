// mutation和action之间进行交互的常量模块，由多个mutation 的type常量名称模块

//首页 
export const RECEIVE_ADDRESS ='receive_address'//接收地址值
export const RECEIVE_FOODTYPE = 'receive_foodtype' // 接收分类数组
export const RECEIVE_SHOPS = 'receive_shops' // 接收商家数组

// 登录
export const RECEIVE_USER_INFO = 'receive_user_info' // 接收用户信息
export const RESET_USER_INFO = 'reset_user_info' //重置用户信息

// mockJS
export const RECEIVE_GOODS = 'receive_goods' // 接收商品数组
export const RECEIVE_RATINGS = 'receive_ratings' // 接收商家评价数组
export const RECEIVE_INFO = 'receive_info' // 接收商家信息

// 点餐时  + -
export const INCREMENT_FOOD_COUNT = 'increment_food_count' // 增加 food 的 count
export const DECREMENT_FOOD_COUNT = 'decrement_food_count' // 减少 food 的 count
export const CLEAR_CART = 'clear_cart'//清空购物车

export const RECEIVE_SEARCH_SHOPS = 'receive_search_shops' //接收搜索的商家数组
