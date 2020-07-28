<template>
	<section class="profile">
		<!-- 头部 -->
		<HeaderTop title='我的'></HeaderTop>
		<!-- 详情 -->
		<section class="profile-number">
			<!-- 此处  需要路由跳转  -->
			<router-link :to="userInfo._id ? '/userinfo' :'/login' " class="profile-link">
				<div class="profile_image">
					<i class="iconfont icon-geren1"></i>
				</div>
				<div class="user-info">
					<p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name||'登录/注册'}}</p>
					<p>
						<span class="user-icon">
							<i class="iconfont icon-shouji icon-shouji"></i>
						</span>
						<span class="icon-mobile-number" >{{userInfo.phone || '暂无绑定手机号'}}</span>
					</p>
				</div>
				<span class="arrow">
					<i class="iconfont icon-dibudaohanglan-"></i>
				</span>
			</router-link>
		</section>
		<section class="profile_info_data border-1px">
			<ul class="info_data_list">
				<a href="javascript:" class="info_data_link">
					<span class="info_data_top"><span>0.00</span>元</span>
					<span class="info_data_bottom">我的余额</span>
				</a>
				<a href="javascript:" class="info_data_link">
					<span class="info_data_top"><span>0</span>个</span>
					<span class="info_data_bottom">我的优惠</span>
				</a>
				<a href="javascript:" class="info_data_link">
					<span class="info_data_top"><span>0</span>分</span>
					<span class="info_data_bottom">我的积分</span>
				</a>
			</ul>
		</section>
		<section class="profile_my_order border-1px">
			<!-- 我的订单 -->
			<a href='javascript:' class="my_order">
				<span>
					<i class="iconfont icon-dingdan"></i>
				</span>
				<div class="my_order_div">
					<span>我的订单</span>
					<span class="my_order_icon">
						<i class="iconfont icon-dibudaohanglan-"></i>
					</span>
				</div>
			</a>
			<!-- 积分商城 -->
			<a href='javascript:' class="my_order">
				<span>
					<i class="iconfont icon-jifen"></i>
				</span>
				<div class="my_order_div">
					<span>积分商城</span>
					<span class="my_order_icon">
						<i class="iconfont icon-dibudaohanglan-"></i>
					</span>
				</div>
			</a>
			<!-- 饿了么外卖会员卡 -->
			<a href="javascript:" class="my_order">
				<span>
					<i class="iconfont icon-hudiejie"></i>
				</span>
				<div class="my_order_div">
					<span>饿了么外卖会员卡</span> <span class="my_order_icon">
						<i class="iconfont icon-dibudaohanglan-"></i>
						</span>
				</div>
			</a>
		</section>
		<section class="profile_my_order border-1px">
			<!-- 服务中心 -->
			<a href="javascript:" class="my_order">
				<span>
					<i class="iconfont icon-qiye"></i>
				</span>
				<div class="my_order_div">
					<span>服务中心</span>
					<span class="my_order_icon">
						<i class="iconfont icon-dibudaohanglan-"></i>
					</span>
				</div>
			</a>
		</section>
		<section class="profile_info_data border-1px">
			<mt-button type='danger' style='width: 100%;' v-if="userInfo._id" @click='logout'>退出登录</mt-button>
		</section>
	</section>
</template>
<script>
	import {mapState}  from 'vuex'
	import  HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import { MessageBox,Toast  } from 'mint-ui';
	
	export default{
		computed:{//3读取userInfo
			...mapState(['userInfo'])
		},
		// 引入 映射成标签  使用
		components:{
			HeaderTop
		},
		methods:{
			logout(){
				MessageBox.confirm("去确认退出吗？").then(
					action =>{//点击确认调用  请求退出  异步action无需参数
						this.$store.dispatch('logout')
						Toast('退出登录')
						},
					action =>{console.log('点击了取消')}//点击取消调用
				)
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	body
		margin 0
	a
		text-decoration none
	.profile
		width 100%
		overflow hidden//禁止页面滚动
		.profile-number
			margin-top 45.5px
			.profile-link
				clearFix()
				position relative
				display block
				background #02A774
				padding 20px 10px
				.profile_image
					float left
					width 3.75rem
					height 3.75rem
					border-radius 50%
					overflow hidden
					vertical-align top
					.icon-geren1
						background #E4E4E4
						font-size 64px
						color white
				.user-info
					float left
					margin-top 8px
					margin-left 15px
					p
						font-weight 700
						font-size 18px
						color #fff
						margin 0
						&.user-info-top
							padding-bottom 8px
							margin 0px
						.user-icon
							display inline-block
							margin-left -15px
							margin-right 5px
							width 20px
							height 20px
							.icon-shouji
								font-size 25px
								vertical-align text-top
						.icon-mobile-number
							font-size 14px
							color #fff
				.arrow
					width 12px
					height 12px
					position absolute
					right 15px
					top 40%
					.icon-dibudaohanglan-
						color white
						font-size 20px		
					
					
		.profile_info_data
			bottom-border-1px(#e4e4e4)
			width 100%
			background #fff
			overflow hidden
			.info_data_list
				clearFix()
				padding-left 0px
				.info_data_link
					float left
					width 33%
					text-align center
					border-right 1px solid #f1f1f1
					.info_data_top
						display block
						width 100%
						font-size 14px
						color #333
						padding 15px 5px 10px
						span
							display inline-block
							font-size 30px
							color #f90
							font-weight 700
							line-height 30px
					.info_data_bottom
						display inline-block
						font-size 14px
						color #666
						font-weight 400
						padding-bottom 10px
				.info_data_link:nth-of-type(2)
					.info_data_top
						span
							color #FF5F3E
				.info_data_link:nth-of-type(3)
					border 0
					.info_data_top
						span
							color #6ac20b
						
		.profile_my_order
			top-border-1px(#e4e4e4)
			margin-top 10px
			background #fff
			.my_order
				display flex
				align-items center
				padding-left 15px
				>span
					display flex
					align-items center
					width 20px
					height 20px
					>.iconfont
						margin-left -10px
						font-size 30px
					.icon-dingdan
						color #02a774
					.icon-jifen
						color #ff5f3e
					.icon-hudiejie
						color #f90
					.icon-qiye
						color #02a774
				.my_order_div
					width 100%
					border-bottom 1px solid #f1f1f1
					padding 18px 10px 18px 0
					font-size 16px
					color #333
					display flex
					justify-content space-between
					span
						display inline-block
					.my_order_icon
						float right
						width 10px
						height 10px
					.icon-jiantou1
						color #bbb
						font-size 10px
</style>
