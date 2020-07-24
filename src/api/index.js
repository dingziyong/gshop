//根据接口文档 封装请求函数
 //   通过ajax 与后台进行交互  // 引用二次封装后的ajax
import ajax  from './ajax'

// 1、根据经纬度获取位置详情   箭头函数              query参数  
export const reqAddress  =  (geohash) => ajax(`/position/${geohash}`)
// 2、获取msite页面食品分类列表
export const reqFoodList = () =>ajax(`/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) =>ajax(`/shops`,{longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash,keyword) =>ajax(`/search_shops`,{geohash,keyword})
// 5、获取一次性验证码
export const reqVerification = () =>ajax(`/captcha`)
// 6、用户名密码登陆
export const reqPwdLogin = (name,pwd,captcha) =>ajax(`/login_pwd`,{name,pwd,captcha},"POST")
// 7、发送短信验证码
export const reqSendcode = (phone) =>ajax('/sendcode',{phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone,code) =>ajax(`/login_msm`,{phone,code},"POST")
// 9、根据会话获取用户信息
export const reqUserInfo = () =>ajax(`/userinfo`)
// 10、用户登出
export const reqLogin = () =>ajax(`/logout`)