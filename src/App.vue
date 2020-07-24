<template>
  <div id="app">
	  <!-- 上面是路由 -->
	<router-view />
	<!-- 下面是导航 -->
	<!-- $route代表当前路由  在配置路由的时候配置meta属性  可以控制显示和隐藏 -->
	<FooterGuide v-show='$route.meta.showFooter'/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

export default {
  name: 'App',
  components: {
    // 导航 引入 映射成标签
	FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		width 100%
		height 100%
		background #f5f5f5
</style>
