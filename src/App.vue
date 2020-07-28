<template>
  <div id="app">
	  <!-- 路由 -->
	<router-view />
	<!-- 导航 -->
	<!-- $route代表当前路由  在配置路由的时候配置meta属性  可以控制显示和隐藏 -->
	<FooterGuide v-show='!$route.meta.showFooter'/>
  </div>
</template>

<script>
	import FooterGuide from './components/FooterGuide/FooterGuide.vue'
	import {mapActions} from 'vuex' //2使用映射函数 发送请求
	
	export default {
		mounted(){
			// this.$store.dispatch('getAddress')//1发送请求
			this.getAddress()//异步获取address
			this.getUserInfo()//获取用户信息（根据用户信息修改头部右侧状态）
		},
		components: {
			// 导航 引入 映射成标签
			FooterGuide
		},
		methods:{
			...mapActions(['getAddress','getUserInfo'])
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		width 100%
		height 100%
		background #f5f5f5
</style>
