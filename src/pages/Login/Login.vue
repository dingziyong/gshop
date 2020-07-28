<template>
	<div class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<h2 class="login_logo">饿了么外卖</h2>
				<div class="login_header_title">
					<a href="javascript:;" :class="{on:loginWay}" @click='loginWay=true'>短信登录</a>
					<a href="javascript:;" :class="{on:!loginWay}" @click='loginWay=false'>密码登录</a>
				</div>
			</div>
			<div class="login_content">
				<form @submit.prevent="login" >
					<div :class="{on:loginWay}" >
						<section class="login_message">
							<input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
							<button :disabled="!rightPhone" class="get_verification" 
							:class="{right_phone:rightPhone}" @click.prevent="getCode">
							{{computedTime>0 ?`剩余（${computedTime}s）`:`获取验证码`}}</button>
						</section>
						<section class="login_verification">
							<input type="tel" maxlength="8" placeholder="验证码" v-model="code">
						</section>
						<section class="login_hint">
							温馨提示：未注册饿了么外卖帐号的手机号，登录时将自动注册，且代表已同意
							<a href="javascript:;">《用户服务协议》</a>
						</section>
					</div>
					<div :class="{on:!loginWay}">
						<section>
							<section class="login_message">
								<input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
							</section>
							<section class="login_verification">
								<input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
								<input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
								<div class="switch_button" @click="showPwd=!showPwd" :class="showPwd?'on':'off'">
									<div class="switch_circle" :class="{right:showPwd}"></div>
									<span class="switch_text">{{showPwd?'abc':'...'}}</span>
								</div>
							</section>
							<section class="login_message">
								<input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
								<img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
								@click=" getCaptcha" ref='captcha'>
							</section>
						</section>
					</div>
					<button class="login_submit">登录</button>
				</form>
				<a href="javascript:;" class="about_us">关于我们</a>
			</div>
			<span href="javascript:" class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantou2"></i>
			</span>
		</div>
		<AlertTip :alertText = 'alertText' v-show='showAlter' @closeTip='closeTip'></AlertTip>
	</div>
</template>

<script>
	import AlertTip from '../../components/AlertTip/AlertTip.vue'
	import {reqPwdLogin,reqSendcode,reqSmsLogin} from '../../api/index.js'
	export default{
		// 标识登录方式的属性  点击时切换
		data(){
			return{
				loginWay:true,//true短信登录  false 密码登录
				showPwd:false,//是否显示密码
				phone:"",//手机号
				code:"",//短信验证码
				computedTime:0,//倒计时
				name:"",//用户名
				pwd:'',//密码
				captcha:"",//图像验证码
				alertText:'',//提示文本
				showAlter:false,//是否显示提示框
			}
		},
		computed:{
			rightPhone(){
				return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
			}
		},
		methods:{
			// 异步获取短信验证码
			async getCode(){
				if(this.computedTime ===0){//没有定时器时  
					// 启动倒计时
					this.computedTime = 30
					const timer =  setInterval(()=>{
						this.computedTime --
						if(this.computedTime<=0){
							// 停止倒计时
							clearInterval(timer)
						}
					},1000)
					// 发送ajax请求(向指定手机号发送验短信)
					const result = await reqSendcode(this.phone)
					if(result.code===1){
						// 显示提示框
						this.showAlter = true
						this.alertText = result.msg
						// 停止倒计时
						if(this.dcomputedTime){
							this.computedTime = 0
							clearInterval(this.timer)
							this.timer =undefined
						}
					}
				}
			},
			// 异步登录   前台表单数据验证  
			alterShow(alertText){
				this.showAlter = true
				this.alertText = alertText
			},
			async login(){//收集表单数据 
				let result  //ajax请求结果
				// 首先判断登录方式
				if(this.loginWay){//短信登陆了
					const {rightPhone,phone,code} =this
					if(!rightPhone){//手机号错误
						this.alterShow('手机号不正确')
						return
					}else if(!/^\d{6}$/.test(code)){
						// 验证码必须是6位
						this.alterShow('验证码必须是6位')
						return
					}
				//发送ajax请求短信登录
					result = await reqSmsLogin(phone,code)
				}else{
					const {name,pwd,captcha} = this
					if(!name){
						this.alterShow('请输入手机号/邮箱/用户名')
						return
					}else if(!pwd){
						this.alterShow('密码必须指定')
						return
					}else if(!captcha){
						this.alterShow('验证码必须指定')
						return
					}
					// 发送ajax请求密码登录
					result = await reqPwdLogin({name,pwd,captcha})
				}
				// 停止计时器
				// 停止倒计时
				if(this.dcomputedTime){
					this.computedTime = 0
					clearInterval(this.timer)
					this.timer =undefined
				}
				// 根据结果处理数据
				if(result.code===0){
					// 将user保存到vuex的state中
					const userInfo = result.data
					this.$store.dispatch('recordUserInfo',userInfo)
					// 跳转路由  个人中心
					this.$router.replace('/personal')//无需再返回
					
				}else{
					this.getCaptcha()//登录失败需要刷新验证码，
					const msg = result.msg
					this.alterShow(msg)
				}
			},
			closeTip(){
				this.showAlter = false
				this.alertText = ''
			},
			// 获取一个新的图片验证码，svg图片的src=""是postman接口测试里面的请求地址
			// 每次刷新页面都会更新验证码，但是在实际中应该是点击验证码的时候也会更新，可以点击一次就刷新一次
			getCaptcha(){//请求的还是原来的路径，但是路径必须不一样才能更新 在后面加时间
				// ajax请求才存在跨域问题
				// event.target.src ="http://localhost:4000/captcha?time="+Date.now()
				// 通过event可以刷新 但后面 登录失败需要刷新  没有event 所以改用ref
				this.$refs.captcha.src= "http://localhost:4000/captcha?time="+Date.now()
			}
		},
		components:{
			AlertTip
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../assets/stylus/mixins.styl'
	body 
		margin 0 
	.loginContainer
		width 100%
		height 100%
		background #fff
		.loginInner
			padding-top 60px
			width 80%
			margin 0 auto
			.login_header
				.login_logo
					font-size 40px
					font-weight bold
					color #02a774
					text-align center
				.login_header_title
					padding-top 40px
					text-align center
					>a
						color #333
						font-size 14px
						padding-bottom 4px
						&:first-child
							margin-right 40px
						&.on
							color #02a774
							font-weight 700
							border-bottom 2px solid #02a774
			.login_content
				>form
					>div
						display none
						&.on
							display block	
						input
							width 100%
							height 100%
							padding-left 10px
							box-sizing border-box
							border 1px solid #ddd
							border-radius 4px
							outline 0
							font 400 14px Arial
							&:focus
								border 1px solid #02a774		
						.login_message
							position relative
							margin-top 16px
							height 48px
							font-size 14px
							background #fff
							.get_verification
								position absolute
								top 50%
								right 10px
								transform translateY(-50%)
								border 0
								color #ccc
								font-size 14px
								background transparent
								&.right_phone
									color black
						.login_verification	
							position relative
							margin-top 16px
							height 48px
							font-size 14px
							background #fff
							.switch_button
								font-size 12px
								border 1px solid #ddd
								border-radius 8px
								transition background-color .3s,border-color .3s
								padding 0 6px
								width 30px
								height 16px
								line-height 16px
								color #fff
								position absolute
								top 50%
								right 10px
								transform translateY(-50%)
								&.off
									background #fff
									.switch_text
										float right
										color #ddd
								&.on
									background #02a774
								>.switch_circle	
									position absolute
									top -1px
									left -1px
									width 16px
									height 16px
									border 1px solid #ddd
									border-radius 50%
									background #fff
									box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
									transition transform .3s
									&.right
										transform translateX(30px)
						.login_hint
							margin-top 12px
							color #999
							font-size 13px
							line-height 20px
							>a
								color #02a774	
					.login_submit
						display block
						width 100%
						height 42px
						margin-top 30px
						border-radius 4px
						background #4cd96f
						color #fff
						text-align center
						font-size 16px
						line-height 42px
						border 0	
				.about_us
					display block
					font-size 12px
					margin-top 20px
					text-align center
					color #999
			.go_back
				position absolute
				top 5px
				left 5px
				width 30px
				height 30px
				>.iconfont
					font-size 20px
					color #999
</style>
