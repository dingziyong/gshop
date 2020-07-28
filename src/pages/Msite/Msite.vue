<template>
	<div class="msite">
		<!-- 首页头部 -->
		<HeaderTop :title='address.name'>
			<!-- 存在路由跳转  使用router-link组件 --> 
			<router-link  class="header_search" slot='left' to='/search'>
				<i class="iconfont icon-sousuo1"></i>
			</router-link>
			<router-link  class="header_login" slot='right'  :to="userInfo._id ? '/userinfo' :'/login' ">
				<span class="header_login_text" v-if='!userInfo._id'>
					登录|注册
				</span>
				<span class="header_login_text" v-else>
					<i class="iconfont icon-geren1"></i>
				</span>
			</router-link >
		</HeaderTop>
		<!-- 首页导航 -->
		<nav class="msite_nav border-1px">
			<div class="swiper-container" v-if='foodTypeArr.length>0'>
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(foodTypes,index) in foodTypeArr" :key='index'>
						<a href="javascript:;" class="link_to_food" v-for="(foodType,index) in foodTypes" :key='index'>
							<div class="food_container">
								<!-- <img src="./images/nav/1.jpg"> -->
								<img :src= "baseImgUrl + foodType.image_url" >
							</div>
							<span>{{foodType.title}}</span>
						</a>
					</div>
				</div>
				<!-- swiper pagination  分页器-->
				<div class="swiper-pagination"></div>
			</div>
			<img src="./images/msite_back.svg" v-else>
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
	import {mapState} from 'vuex'
	
	import  HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	
	export default{
		data(){
			return{
				baseImgUrl:'https://fuss10.elemecdn.com',
			}
		},
		mounted () {
			/**
			 * 数据异步显示的步骤（
			 * 1.调用action发请求获取数据，数据存储在state；2.读state状态  3.写模板显示）*/ 
			 // 指定action的名字  不需要传递参数
			this.$store.dispatch('getFoodList')//发送请求获取数据
			this.$store.dispatch('getShops')
			
			/*// 在实现异步显示数据后 ，轮播的时机就需要调整  应该是在列表显示以后才可以轮播
			// 在异步更新之前执行
			new Swiper('.swiper-container', {
				// Swiper实例对象  实现轮播  
				pagination: {//分页器
				el: '.swiper-pagination',
				},
				loop: true
			})*/
		},
		computed:{
			...mapState(['address','foodType','userInfo']),
 			foodTypeArr(){//根据foodType一维数组生成二维数组  内部数组 元素个数最大是8 外部数组的长度就是可以翻页的页数
				const {foodType} = this
				const max = 8//一页最多显示8个
				const arrOuter = []//外部数组 的长度 表示轮播图有几页
				let arrInner = [] //内部数组，每页最多8个元素 
				foodType.forEach( type =>{
					if(arrInner.length===max){
						arrInner = []//内部数组塞满，新创建一个空数组
					}
					// 先将空的内部数组放到外部数组
					if(arrInner.length === 0){
						arrOuter.push(arrInner)//此时塞进去是因为我们无法知道最后一页是有1-8多少个元素
					}
					// 将当前食品分类添加到内部数组中
					arrInner.push(type)
				})
				return arrOuter;
			}
		},
		watch:{
			// 监视列表数据是否显示
			foodTypeArr(value){
				// 界面更新就显示所有组件对象 不早也不晚
				this.$nextTick(() =>{//$nextTick
				// 将回调延迟到下一次DOM更新之后
					new Swiper('.swiper-container', {
						// Swiper实例对象  实现轮播  
						pagination: {//分页器
						el: '.swiper-pagination',
						},
						loop: true
					})
				})
			}
		},
		// 引入 映射成标签  使用
		components:{
			HeaderTop,
			ShopList
		},
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
		.icon-geren1
			font-size 30px
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