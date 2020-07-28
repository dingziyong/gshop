<template>
	<div>
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="toogleShow">
					<div class="logo-wrapper">
						<div class="logo" :class="{highlight:totalCount}">
							<i class="iconfont icon-gouwucheman" :class="{highlight:totalCount}"></i>
						</div>
						<div class="num" v-if="totalCount">{{totalCount}}</div>
					</div>
					<div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
				</div>
				<div class="content-right" :class="payClass">
					<!-- 这里需要根据起送价  和 totalPrice来计算 应该显示的类名
					 当totalPrice大于起送价时显示"去结算" 当totalPrice小于起送价时显示"还差3元起送"
					  div本身的状态和里面的文本都需要计算判断比较麻烦就定义类名payClass和payText
					 模板里需要显示的数据的来源：props、state和计算属性
					 这里所需要的数据是在这里产生的所以使用计算属性
					 -->					
					<div class="pay" >
						{{payText}}
					</div>
				</div>
			</div>
			<transition name="move">
				<div class="shopcart-list" v-show='listShow' >
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="clearCart">清空</span>
					</div>
					<div class="list-content">
						<ul>
							<li class="food" v-for="(food,index) in cartFoods" :key='index'>
								<span class="name">{{food.name}}</span>
								<div class="price"><span>￥{{food.price}}</span></div>
								<div class="cartcontrol-wrapper">
									<div class="cartcontrol">
										<div class="iconfont icon-remove_circle_outline"></div>
										<div class="cart-count">
											<CartControl :food='food'/>
										</div>
										<div class="iconfont icon-add_circle"></div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="toogleShow"></div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { MessageBox } from 'mint-ui';
	import {mapState,mapGetters} from 'vuex'
	import CartControl from '../CartControl/CartControl.vue'
	
	// 分析接收的数据
	// 购物项列表  选中的 count>0  这个数据存在哪里？涉及到数据更新 
	// 购物车的数据是否存？存在vuex？（放在vuex中效率高一些，修改一个数据只更新一个数据，不更新整个数组）
	// 不存？计算属性，计算count>0  或者是放在数组中存储（计算属性在初始化或数据发送改变时执行，两层循环）
	// 存储在vuex中，ShopGoods组件中的goods
	export default {
		data(){
			return{
				isShow:false
			}
		},
		computed:{
			//获取组件管理的多个状态  购物车里的食物  配送费/起送费在info里面(info在state)
			// 购物车上的总数量 总价格 是基于cartFoods的有vuex管理的一个状态
			...mapState(['cartFoods','info']),
			// 计算属性  总数量  总价格
			...mapGetters(['totalCount','totalPrice']),
			payClass(){
				const {totalPrice} = this
				const {minPrice} = this.info
				return totalPrice>=minPrice ? 'enough' : 'not-enough'
			},
			payText(){//显示的文本有3种状态
				const {totalPrice} = this
				const {minPrice} = this.info
				if(totalPrice===0){// 20元起送
					return `￥${minPrice}元起送`
				}else if(totalPrice<minPrice){// 还差n元起送
					return `还差￥${minPrice-totalPrice}元起送`
				}else{
					return '结算'
				}
			},
			listShow(){//如果总数量为0 食物列表不显示
				if(this.totalCount===0){
					this.isShow = false
					return false
				}
				if(this.isShow){
					// 食物列表即将展现  创建实例对象（单例模式）  滑动
					// 1.创建前 判断是否已经创建实例
					// 2.创建后  this.scroll保存起来
					this.$nextTick(() =>{
						if(!this.scroll){
							this.scroll = new BScroll('.list-content',{
								click:true
							})
						}						
					})
				}
				return this.isShow
			}
		},
		methods:{
			toogleShow(){
				if(this.totalCount>0){
					this.isShow = !this.isShow
				}
			},
			clearCart(){
				// 先提示一下  点击确认再清理
				MessageBox.confirm('你确定清空购物车吗？').then(action => {
				  // 更新状态
				  this.$store.dispatch('clearCart')
				},() =>{});
			}
		},
		components:{
			CartControl
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	.shopcart
		position fixed
		left 0
		bottom 0
		z-index 50
		width 100%
		height 48px
		.content
			display flex
			background #141d27
			font-size 0
			color rgba(255, 255, 255, 0.4)
			.content-left
				flex 1
				.logo-wrapper
					display inline-block
					vertical-align top
					position relative
					top -10px
					margin 0 12px
					padding 6px
					width 56px
					height 56px
					box-sizing border-box
					border-radius 50%
					background #141d27
					.logo
						width 100%
						height 100%
						border-radius 50%
						text-align center
						background #2b343c
						&.highlight
							background $green
						.icon-gouwucheman
							line-height 44px
							font-size 24px
							color #80858a
							&.highlight
								color #fff
					.num
						position absolute
						top 0
						right 0
						width 24px
						height 16px
						line-height 16px
						text-align center
						border-radius 16px
						font-size 9px
						font-weight 700
						color #ffffff
						background rgb(240, 20, 20)
						box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
				.price
					display inline-block
					position relative
					vertical-align top
					margin-top 5px
					line-height 24px
					padding-right 12px
					box-sizing border-box
					font-size 16px
					font-weight 700
					color #fff
					&.highlight
						color #fff
				.desc
					display inline-block
					vertical-align bottom
					margin-bottom 15px
					margin-left -45px
					font-size 10px
			.content-right
				flex 0 0 105px
				width 105px
				.pay
					height 48px
					line-height 48px
					text-align center
					font-size 12px
					font-weight 700
					color #fff
				&.not-enough
					background #2b333b
				&.enough
					background #00b43c
					color #fff
				.ball-container
					.ball
						position fixed
						left 32px
						bottom 22px
						z-index 200
						transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
					.inner
						width 16px
						height 16px
						border-radius 50%
						background $green
						transition all 0.4s linear
		.shopcart-list
			position absolute
			left 0
			top 0
			z-index -1
			width 100%
			transform translateY(-100%)
			&.move-enter-active,&.move-leave-active
				transition transform .3s
			&.move-enter,&.move-leave-to
				transform translateY(100%)
			&.swipe-enter-active, &.swipe-leave-active
				transition transform .3s
			&.swipe-enter, &.swipe-leave-to
				transform translateY(0)
			.list-header
				height 40px
				line-height 40px
				padding 0 18px
				background #f3f5f7
				border-bottom 1px solid rgba(7, 17, 27, 0.1)
				.title
					float left
					font-size 14px
					color rgb(7, 17, 27)
				.empty
					float right
					font-size 12px
					color rgb(0, 160, 220)
			.list-content
				padding 0 18px
				max-height 217px
				overflow hidden
				background #fff
				.food
					position relative
					padding 12px 0
					box-sizing border-box
					bottom-border-1px(rgba(7, 17, 27, 0.1))
					.name
						line-height 24px
						font-size 14px
						color rgb(7, 17, 27)
					.price
						position absolute
						right 90px
						bottom 12px
						line-height 24px
						font-size 14px
						font-weight 700
						color rgb(240, 20, 20)
					.cartcontrol-wrapper
						position absolute
						right 0
						bottom 6px
	.list-mask
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		z-index 40
		backdrop-filter blur(10px)
		opacity 1
		background rgba(7, 17, 27, 0.1)
		&.fade-enter-active, &.fade-leave-active
			transition all 0.3s
		&.fade-enter, &.fade-leave-to
			opacity 0
			background rgba(7, 17, 27, 0)
</style>
