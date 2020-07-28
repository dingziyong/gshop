// 使用mockJS提供的数据接口
import Mock from "mockjs"
import data from "./data.json"

// 不需要向外暴露任何数据  只需要保证能执行一次即可

// 返回goods的接口    返回给前台数据的格式
Mock.mock('/goods',{code:0,data:data.goods})
// reating的接口
Mock.mock('/rating',{code:0,data:data.ratings})
// 返回info的接口
Mock.mock('/info',{code:0,data:data.info})