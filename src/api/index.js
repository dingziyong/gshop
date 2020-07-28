//根据接口文档 封装请求函数
 //   通过ajax 与后台进行交互  // 引用二次封装后的ajax
import ajax  from './ajax'

// 1、根据经纬度获取位置详情   箭头函数              query参数  
export const reqAddress  =  (geohash) => ajax(`/api/position/${geohash}`)
// 2、获取msite页面食品分类列表
export const reqFoodList = () =>ajax(`/api/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) =>ajax(`/api/shops`,{longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash,keyword) =>ajax(`/api/search_shops`,{geohash,keyword})
// 5、获取一次性验证码   不需要发送ajax请求
// export const reqVerification = () =>ajax(`/api/captcha`)
// 6、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) =>ajax(`/api/login_pwd`,{name,pwd,captcha},"POST")
// 7、发送短信验证码
export const reqSendcode = (phone) =>ajax('/api/sendcode',{phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone,code) =>ajax(`/api/login_sms`,{phone,code},"POST")
// 9、根据会话获取用户信息
export const reqUserInfo = () =>ajax(`/api/userinfo`)
// 10、用户登出
export const reqLogout = () =>ajax(`/api/logout`)

// mockJS 不需要  代理  api
// 获取商家信息
export const reqShopInfo = () =>ajax('/info')
// 获取商家评价数组
export const reqShopRating = () =>ajax('/rating')
// 获取商家商品数组
export const reqShopGoods = () =>ajax('/goods')

