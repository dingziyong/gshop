<template>
	<header class="header">
		<!-- 插槽占位 -->
		<slot name="left"></slot>
		<span href="" class="header_title">
			<span class="header_title_text ellipsis">{{title}}</span>
		</span>
		<slot name="right"></slot>
	</header>
</template>

<script>
	export default {
		// 声明组件接收的属性 
		props:{
			title:String
		},
	}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
	.ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.header
		background-color #02A774
		position fixed
		z-index 100
		left 0
		top 0
		width 100%
		height 2.8125rem
		color white
		.header_search
			position absolute
			left 0.9375rem
			top 50%
			transform  translateY(-50%)
			width 10%
			height 50%
			.icon-sousuo1
				font-size 1.5625rem	
		.header_title
			position absolute
			top 50%
			left 50%
			transform  translate(-50%,-50%)
			width 50%
			text-align center
			.header_title_text
				font-size 1.25rem
				display block
		.header_login
			font-size 0.875rem
			position absolute
			right 0.9375rem
			top 50%
			transform translateY(-50%)
</style>
