<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="iconfont icon-Remove" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
		</transition>
		<div class="iconfont icon-jia" @click.stop="updateFoodCount(true)"></div>
		<div class="cart-count" >{{food.count}}</div>
	</div>
</template>

<script>
	export default{
		props:{
			food:Object,//添加或减去 食物  是goods里
		},
		methods:{
			updateFoodCount(isAdd){
				// food是goods的一个属性  更新food就会更新goods
				// 因此不能在组件里面更新food需要更新state
				const {food} = this
				this.$store.dispatch('updateFoodCount',{isAdd,food})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	.cartcontrol
		font-size: 0
		width: 90px;
		position absolute
		right 0px
		bottom 0px
		.cart-decrease
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
		.icon-Remove
			display: inline-block
			padding 6px
			line-height 24px
			font-size 24px
			color $green
			&.move-enter-active,&.move-leave-active
				transition  all .2s
			&.move-enter,&.move-leave-to
				opacity  0
				transform translateX(15px) rotate(180deg)
		.cart-count
			display: inline-block
			float right
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.icon-jia
			display: inline-block
			float right
			margin-right 0px
			padding: 6px
			line-height: 24px
			font-size: 24px
			color $green
</style>
