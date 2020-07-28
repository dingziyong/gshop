// 状态对象 
export default {
	// 首页需要管理的状态 地址{}  食物列表 商家列表
	// 从后台获取数据 覆盖初始默认数据
	latitude: 40.10038, // 纬度
	longitude: 116.36867, // 经度
	address:{},//地址信息对象
	foodType:[],//食品分类对象
	shops:[],//商家数组
	
	// 登录时 需要管理的状态
	userInfo:{},//用户信息
	
	// mockJS 模拟后台交互的数据
	goods:[],//商品列表
	rating:[],//商品评价列表
	info:{},//商家信息
	
	// 购物车
	cartFoods:[],//购物车中食物列表 第一次点击某个事物才会添加
	// 搜索
	searchShops:[],//搜索得到的商家列表
}
