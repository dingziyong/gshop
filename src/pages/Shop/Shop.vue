<template>
	<div>
		<ShopHeader />
		<div class="tab">
			<div class="tab-item">
				<router-link to='/shop/goods' replace>点餐</router-link>
			</div>
			<div class="tab-item">
				<router-link to='/shop/rating' replace>评价</router-link>
			</div>
			<div class="tab-item">
				<router-link to='/shop/info' replace>商家</router-link>
			</div>
		</div>
		<keep-alive>
			<!-- 魂缓存路由组件 -->
			<router-view />
		</keep-alive>
	</div>
</template>

<script>
	import ShopHeader  from '../../components/ShopHeader/ShopHeader.vue'
	export default{
		mounted(){
			this.$store.dispatch('getShopInfo')
		},
		components:{
			ShopHeader
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	.tab
		height 2.5rem
		line-height 2.5rem
		background-color #FFF
		bottom-border-1px(rgba(7,17,27,.1))
		.tab-item
			float left
			width 33.3333%
			text-align center
			font-size 14px
			color rgb(77,85,93)
			a
				display block
				position relative
				&.router-link-active
					color #02a774
					&::after
						content ''
						position absolute
						left 50%
						bottom 1px
						width 35px
						height 2px
						transform translateX(-50%)
						background #02a774
			
</style>
