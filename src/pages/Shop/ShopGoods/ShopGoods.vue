<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper">
				<ul>
					<li class="menu-item" v-for="(good,index) in goods" :key='index'
					 :class="{current:currentIndex===index}"
					 @click="clickMenuItem(index)" >
						<span class="text bottom-border-1px">
							<img class="icon" :src="good.icon" v-if="good.icon">
							{{good.name}}
						</span>
					</li>				
				</ul>
			</div>
			<div class="foods-wrapper">
				<ul ref='foodsUl'>
					<li class="food-list-hook" v-for="(good,index) in goods" :key='index'>
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key='index' @click="showFood(food)">
								<div class="icon">
									<img width="57" height="57" :src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}} 份</span>
										<span>好评率 {{food.rating}}</span></div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span class="old" v-if="food.oldPrice">￥{{food.old}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food='food'/>
									</div>
								</div>
							</li>
						</ul>
					</li>
					
				</ul>
			</div>		
			<ShopCart/>
		</div>
		<Food :food='food' ref='food'/>
	</div>
</template>

<script>
	import {mapState} from  'vuex'
	import BScroll from 'better-scroll'
	import CartControl from '../../../components/CartControl/CartControl.vue'
	import Food from '../../../components/Food/Food.vue'
	import ShopCart from '../../../components/ShopCart/ShopCart.vue'
	
	export default {
		data(){
			return{
				scrollY:0,//右侧滚动的y轴坐标（滑动过程中实时变化）
				tops:[],//所有右侧分类li的top组成的数组（列表第一次显示后就不在变化）
				food:{},//需要显示的food
			}
		},
		mounted(){
			this.$store.dispatch('getShopGoods',() =>{//异步获取数据
				// 列表显示之后创建  (如何知道列表显示？方法一，watch  native深度监视)
				this.$nextTick(() =>{//数据更新显示后执行
					this._initScroll()
					this._initTops()
				})
			})
			
		},
		computed:{
			...mapState(['goods']),
			currentIndex () {//计算当前分类的下标
				return this.tops.findIndex((top, index)=> {//找区间
					return this.scrollY>=top && this.scrollY<this.tops[index+1]// 当前top  和下一个top
				})
			},
			
		},
		methods:{//一般放事件相关的回调函数
			_initScroll(){
				new BScroll('.menu-wrapper',{//左侧分类列表的BScroll
					click:true//点击响应
				})
				// 右侧food列表的BScroll
				this.foodScroll = new BScroll('.foods-wrapper',{
					probeType:2  ,//手指离开后不会再触发
					click:true
				})
				// 给右侧列表绑定scroll监听  (监视滑动过程)
				this.foodScroll.on('scroll',({x,y}) =>{
					// console.log(y)
					this.scrollY = Math.abs(y)
				})
				// 绑定滚动结束的监听   probeType:3时
				this.foodScroll.on('scrollEnd',({x,y}) =>{
					console.log('scrollEnd',y)
					this.scrollY = Math.abs(y)//解决惯性滑动更新
				})
			},
			_initTops(){
				const tops =[]//1.初始化tops
				let top =0
				tops.push(top)
				// 给ul添加标识  方便迅速找到指定元素
				// const lis = this.$refs.foodsUl.getElementsByClassName('.food-list-hook');
				const lis = this.$refs.foodsUl.children;//2.收集所有分类的li
				Array.prototype.slice.call(lis).forEach( li =>{
					top += li.clientHeight//将伪数组转换为数组
					tops.push(top)
				})
				this.tops = tops
				console.log(tops)
			},
			clickMenuItem(index){
				// console.log(index)
				// 点击后使右侧的列表滑动到相应的位置   
				const y = this.tops[index]//得到目标位置
				this.scrollY = y;//立即更新
				this.foodScroll.scrollTo(0,-y,300)//平滑滚动右侧列表
			},
			// 显示点击的food
			showFood(food){
				// 更新
				this.food = food
				// 调用子组件food里面的方法// 标识子组件标签  显示
				this.$refs.food.toggleShow()
			}
		},
		components:{
			CartControl,
			Food,
			ShopCart
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../../assets/stylus/mixins.styl'
	.goods
		display: flex
		position: absolute
		top: 195px
		bottom: 46px
		width: 100%
		background: #fff;
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				padding: 0 12px
				line-height: 14px
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					color: green
					font-weight: 700
				.text
					border-none()
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 2px
						background-size: 12px 12px
						background-repeat: no-repeat
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					bottom-border-1px(rgba(7, 17, 27, 0.1))
					font-size: 12px
		.foods-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147, 153, 159)
				background: #f3f5f7
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				bottom-border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					.name
						margin: 2px 0 8px
						height: 14px
						line-height: 14px
						font-size: 14px
						color: rgb(7, 17, 27)
					.desc, .extra
						line-height: 10px
						font-size: 10px
						color: rgb(147, 153, 159)
					.desc
						line-height: 12px
						margin-bottom: 8px
					.extra
						.count
							margin-right: 12px
					.price
						font-weight: 700
						line-height: 24px
						.now
							margin-right: 8px
							font-size: 14px
							color: rgb(240, 20, 20)
						.old
							text-decoration: line-through
							font-size: 10px
							color: rgb(147, 153, 159)
					.cartcontrol-wrapper
						position: absolute
						right: 0
						bottom: 12px
</style>
