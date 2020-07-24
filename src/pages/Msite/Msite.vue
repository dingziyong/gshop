<template>
	<div class="msite">
		<!-- 首页头部 -->
		<HeaderTop title='昌平区北六家鸿鹄科技园（337省道北）'>
			<a  class="header_search" slot='left'>
				<i class="iconfont icon-sousuo1"></i>
			</a>
			<a class="header_login" slot='right'>
				<span>登录|注册</span>
			</a>
		</HeaderTop>
		<!-- 首页导航 -->
		<nav class="msite_nav border-1px">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/1.jpg">
							</div>
							<span>甜品饮品</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/2.jpg">
							</div>
							<span>超市便利</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/3.jpg">
							</div>
							<span>美食</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/4.jpg">
							</div>
							<span>简餐</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/5.jpg">
							</div>
							<span>新店特惠</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/6.jpg">
							</div>
							<span>准时送达</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/7.jpg">
							</div>
							<span>预定早餐</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/8.jpg">
							</div>
							<span>土豪推荐</span>
						</a>
					</div>
					<div class="swiper-slide">
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/9.jpg">
							</div>
							<span>甜品饮品</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/10.jpg">
							</div>
							<span>超市便利</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/11.jpg">
							</div>
							<span>美食</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/12.jpg">
							</div>
							<span>简餐</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/13.jpg">
							</div>
							<span>新店特惠</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/14.jpg">
							</div>
							<span>准时送达</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/7.jpg">
							</div>
							<span>预定早餐</span>
						</a>
						<a href="javascript:;" class="link_to_food">
							<div class="food_container">
								<img src="./images/nav/8.jpg">
							</div>
							<span>土豪推荐</span>
						</a>
					</div>				
				</div>
				<!-- swiper pagination  分页器-->
				<div class="swiper-pagination"></div>
			</div>
		</nav>
		<!-- 首页 附近商家 -->
		<div class="msite_shop_list" border-1px>
			<div class="shop_header">
				<i class="iconfont icon-xuanxiang"></i>
				<span class="shop_header_title">附近商家</span>
			</div>
			<ShopList />
		</div>
	</div>
</template>
<script>
	import Swiper from 'swiper'
	import 'swiper/swiper-bundle.css'
	
	import  HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	
	export default{

		mounted () {
			new Swiper('.swiper-container', {
				
				pagination: {//分页器
				el: '.swiper-pagination',
				},
				loop: true
			})
		},
		// 引入 映射成标签  使用
		components:{
			HeaderTop,
			ShopList
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	.msite
		width 100%
		ul
			list-style-type none
		a
			text-decoration none
			color white		
		.msite_nav
			bottom-border-1px(#e4e4e4)
			margin-top 2.8125rem
			height 12.5rem
			background-color white
			.swiper-container
				width 100%
				height 100%
				.swiper-slide
					display flex
					justify-content center
					align-items flex-start
					flex-wrap wrap
					.link_to_food
						width 25%
						.food_container
							display block
							width 100%
							text-align center
							padding-bottom 0.625rem
							font-size 0
							img
								display inline-block
								width 3.125rem
								height 3.125rem
						span
							display block
							width 100%
							text-align center
							font-size 0.8125rem
							color #666600
			.swiper-pagination
				>span.swiper-pagination-bullet-active
					background #02A774
	
		.msite_shop_list
			top-border-1px(#e4e4e4)
			margin-top 0.625rem
			background white
			.shop_header
				padding 10px 10px 0px
				.shop_icon
					margin-left 0.3125rem
					color #999
				.shop_header_title
					color #999
					font-size 0.875rem
					line-height 1.25rem
			
													
			
			
</style>