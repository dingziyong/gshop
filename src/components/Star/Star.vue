<template>
	<div class="star" :class="`star-${size}`">
		<span class="star-item" v-for="(s,index) in starClasses" :class="s" :key='index'></span>
	</div>
</template>

<script>
	const CLASS_ON = 'on'
	const CLASS_HALF = 'half'
	const CLASS_OFF = 'off'
	export default {
		props:{
			// 分数不一样  star不一样  尺寸也不一样
			score:Number,
			size:Number
		},
		computed:{
			starClasses(){
				const {score} = this
				const sClassName = []//存放类名
				const scoreInteger = Math.floor(score)
				// 整数部分 显示 on   
				for(let i=0;i<scoreInteger;i++){
					sClassName.push(CLASS_ON)
				}
				// 小数部分大于0.5显示half  0 个或1个 JS小数不精确  需要*10
				if(score*10-scoreInteger*10>=5){
					sClassName.push(CLASS_HALF)
				}
				 // 最多5颗star
				 while(sClassName.length<5){
					 sClassName.push(CLASS_OFF)
				 }
				 return sClassName;
			}
		}
	}
</script>

<style lang="stylus" rel = 'stylesheet/stylus'>
	@import '../../assets/stylus/mixins.styl'
	.star//2X  3X
		float left
		font-size 0
		.star-item
			display inline-block
			background-repeat no-repeat
		&.star-48
			.star-item
				width 20px
				height 20px
				margin-right 22px
				background-size 20px 20px
				&:last-child
					margin-right: 0
				&.on
					bg-image('./images/star48_on')
				&.half
					bg-image('./images/star48_half')
				&.off
					bg-image('./images/star48_off')
		&.star-36
			.star-item
				width 15px
				height 15px
				margin-right 6px
				background-size 15px 15px
			&:last-child
				margin-right 0
			&.on
				bg-image('./images/star36_on')
			&.half
				bg-image('./images/star36_half')
			&.off
				bg-image('./images/star36_off')
		&.star-24
			.star-item
				width 10px
				height 10px
				margin-right 3px
				background-size 10px 10px
				&:last-child
					margin-right 0
				&.on
					bg-image('./images/star24_on')
				&.half
					bg-image('./images/star24_half')
				&.off
					bg-image('./images/star24_off')																																														
	
</style>