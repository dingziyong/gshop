<template>
	<div class="footer_guide border-1px">
		<!-- 绑定class   :class="{on:isOn}"  on是确定  就是什么时候需要 根据请求路径 -->
		<a href="javascript:;" class="guide_item"  :class="{on: '/msite'===$route.path}" @click="goTo('/msite')">
			<span class="item_icon">
				<i class="iconfont icon-u"></i>
			</span>
			<span>外卖</span>
		</a>
		<a href="javascript:;" class="guide_item" :class="{on: '/search'===$route.path}"  @click="goTo('/search')">
			<span class="item_icon">
				<i class="iconfont icon-sousuo1"></i>
			</span>
			<span>搜索</span>
		</a>
		<a href="javascript:;" class="guide_item" :class="{on: '/order'===$route.path}"  @click="goTo('/order')">
			<span class="item_icon">
				<i class="iconfont icon-dingdan"></i>
			</span>
			<span>订单</span>
		</a>
		<a href="javascript:;" class="guide_item" :class="{on: '/personal'===$route.path}"  @click="goTo('/personal')">
			<span class="item_icon">
				<i class="iconfont icon-geren1"></i>
			</span>
			<span>我的</span>
		</a>
	</div>
</template>
<script>
	export default{
		methods:{
			goTo(path){
				// $router控制路由跳转  的两种方式
				// push :向history中添加一个新的记录，可以回退到之前的URL 
				// replace：导航后不会留下history记录
				this.$router.replace(path)
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	.footer_guide
		top-border-1px(#e4e4e4)
		position fixed
		z-index 100
		left 0
		bottom 0
		background-color #FFF
		width 100%
		height 50px
		display flex
		.guide_item
			display flex
			flex 1
			text-align center
			flex-direction column
			align-items center
			margin 5px
			text-decoration none
			color #999999
			&.on
				color #02A774
			span
				font-size 12px
				margin-top 0.125rem
				margin-bottom 0.125rem
				.iconfont
					font-size 22px
</style>