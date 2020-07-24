<template>
	<section class="search">
		<!-- 头部 -->
		<HeaderTop title='搜索'></HeaderTop>
		
		<!-- 搜索表单 -->
		<form action="#" class="search_from">
			<input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
			<input type="submit" class="search_submit">
		</form>
	</section>
</template>
<script>
	import  HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	export default{
		// 引入 映射成标签  使用
		components:{
			HeaderTop
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	body
		margin 0
	.search
		width 100%
		height 100%
		
		.search_from
			clearFix()
			margin-top 45px
			background-color #fff
			padding 12px 8px
			input
				height 35px
				padding 0 4px
				border-radius 2px
				font-weight bold
				outline none
				&.search_input
					float left
					width 79%
					border 4px solid #f2f2f2
					font-size 14px
					color #333
					background-color #f2f2f2
				&.search_submit
					float right
					width 18%
					border 4px solid #02a774
					font-size 16px
					color #fff
					background-color #02a774
</style>