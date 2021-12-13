<template>
	<view class="content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="app">
			<view class="logo-c">
				<image class="logo" src="/static/image/app/login/logo.png" mode=""></image>
				<view class="text1">武进12345热线管家</view>
			</view>
			<uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="" name="username">
					<uni-easyinput class="input" v-model="formData.username" type="text" placeholder="请输入您的账号"
						@input="binddata('username',$event.detail.value)" />
				</uni-forms-item>
				<uni-forms-item label="" name="password">
					<uni-easyinput class="input" v-model="formData.password" type="password" placeholder="请输入您的密码"
						@input="binddata('password',$event.detail.value)" />
				</uni-forms-item>
				<text class="forget-password">忘记密码?</text>
			</uni-forms>
			<button type="primary" @click="appsubmit">登 陆</button>
		</view>
		<view :class="{'a-i-d': isLandScape, 'a-i-d-v': !isLandScape}">
			<view class="a-i-c">
				<text class="text1">热线管家</text>
				<text class="text2">LOGIN</text>
				<text class="text3">登录</text>
			</view>
			<uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="" name="username">
					<uni-easyinput class="input" v-model="formData.username" type="text" placeholder="请输入您的账号"
						@input="binddata('username',$event.detail.value)" />
				</uni-forms-item>
				<uni-forms-item label="" name="password">
					<uni-easyinput class="input" v-model="formData.password" type="password" placeholder="请输入您的密码"
						@input="binddata('password',$event.detail.value)" />
				</uni-forms-item>
				<text class="forget-password">忘记密码?</text>
			</uni-forms>
			<button style="visibility: hidden;">登 陆</button>
			<button type="primary" @click="submit">登 陆</button>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/utils/api.js';
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				 matches: false,
				 landscape: false,
				mediaQueryOb: null,
				isLandScape: true,
				// 表单数据
				formData: {
					// 13461309556 1234 区中心
					username: '13461309556',
					password: '1234',
					
					// liuzhifeng czzw99999 领导
					username: 'liuzhifeng',
					password: '1234',
					
					// wjqzfb001 czzw99999 部门
					// username: 'wjqzfb001',
					// password: '1234',
					
					username: '',
					password: '',

				},
				rules: {
					// 对name字段进行必填验证
					// name: {
					// 	rules: [{
					// 			required: true,
					// 			errorMessage: '请输入姓名',
					// 		},
					// 		{
					// 			minLength: 3,
					// 			maxLength: 5,
					// 			errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
					// 		}
					// 	]
					// },
					// 对username字段进行必填验证
					username: {
						rules: [{
							required: true,
							errorMessage: '请输入您的账号',
						}]
					},
					// 对username字段进行必填验证
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入您的密码',
						}]
					}
				}
			};
		},
		onResize() {
			console.log(this)
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.windowWidth > res.windowHeight) {
						// 横屏
						_this.isLandScape = true
						console.log('横屏')
					} else {
						// 竖屏
						_this.isLandScape = false
						console.log('竖屏')
					}
				}
			})
		},
		mounted() {
			 // this.testMediaQueryObserver()
			            // this.landscapeObserver()
		},
		methods: {
			...mapActions(["setToken"]),
			testMediaQueryObserver() {
				this.mediaQueryOb = uni.createMediaQueryObserver(this)

				this.mediaQueryOb.observe({
					minWidth: 375,  //页面最小宽度 375px
					maxWidth: 500  //页面宽度最大 500px
				}, matches => {
					console.log(matches)
					this.matches = matches;
				})
			},
			landscapeObserver() {
				landscapeOb = uni.createMediaQueryObserver(this)
				landscapeOb.observe({
					orientation: 'landscape'  //屏幕方向为纵向
				}, matches => {
						this.landscape = matches
				})
			},
			onnodeclick(e) {
				this.classes = e.value;
			},
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			binddata(name, value) {
				// 通过 input 事件设置表单指定 name 的值
				this.$refs.form.setValue(name, value)
			},
			// 触发提交表单
			submit() {
				// uni.navigateTo({
				// 	url: '/pages/acceptance/index' //跳转地址
				// })
				// return
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					login({
						...this.formData
					}).then(res => {
						let {
							code,
							data
						} = res.data
						console.log(code, data)
						if (code == 200) {
							uni.setStorageSync('token', data.token.token)
							uni.setStorageSync('role', data.role)
							uni.setStorageSync('password', this.formData.password)
							this.setToken(data.token.token)
							uni.navigateTo({
								url: '/pages/supervise/index' //跳转地址
							})
						}
					}).catch(error => console.log(error))

				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			appsubmit() {
				// uni.navigateTo({
				// 	url: '/pages/index/index' //跳转地址
				// })
				// return
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					login({
						...this.formData
					}).then(res => {
						let {
							code,
							data
						} = res.data
						console.log(code, data)
						if (code == 200) {
							uni.setStorageSync('role', data.role)
							uni.setStorageSync('token', data.token)
							this.setToken(data.token)
							uni.navigateTo({
								url: '/pages/index/index' //跳转地址
							})
						}
					}).catch(error => console.log(error))

				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>
<style>
	@import "/static/style.css";
</style>
<style lang="scss" scoped>
	@function rpx2multiple ($px) {
		@return ($px * 1)+rpx;
	}

	/deep/ .uni-app--maxwidth {
		background: url(~@/static/image/dlbg.png) no-repeat left center;
		background-size: contain;
	}

	.content {
		// background-color: rgba(244, 247, 249, 1);
		background-color: #F4F7F9;
		height: 100vh;
		width: 100%;
		// background: url(~@/static/image/dlybg.png) no-repeat rpx2multiple(128) center;
		background: url('~@/static/image/dlybg.png')  no-repeat rpx2multiple(128) center;
		background-size: contain;
		position: relative;
	}

	.a-i-d {
		// border:solid 1px;
		// width: 600rpx;
		// height: 816rpx;
		width: rpx2multiple(600);
		height: rpx2multiple(816);
		background: #FFFFFF;
		box-shadow: 0px 34px 88px 4px rgba(0, 20, 199, 0.04);
		border-radius: rpx2multiple(10);
		text-align: center;
		position: absolute;
		right: rpx2multiple(128);
		top: 0;
		bottom: 0;
		margin: auto;
		padding: 0 rpx2multiple(100);
		box-sizing: border-box;
	}

	.a-i-d-v {
		// border:solid 1px;
		width: rpx2multiple(600);
		height: rpx2multiple(816);
		background: #FFFFFF;
		box-shadow: 0px 34px 88px 4px rgba(0, 20, 199, 0.04);
		border-radius: rpx2multiple(10);
		text-align: center;
		position: absolute;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		padding: 0 rpx2multiple(100);
		box-sizing: border-box;
	}

	.a-i-c {
		position: relative;
		height: 233rpx;
		height: rpx2multiple(233);

		text {
			display: block;
			font-size: 50rpx;
			font-size: rpx2multiple(50);
			color: #395176;
			font-family: PingFang SC;
		}

		.text1 {
			padding-top: 50rpx;
			font-size: 32px;
			font-size: rpx2multiple(32);
			font-family: DOUYU;
			font-weight: normal;
			background: linear-gradient(0deg, #0030E1 0%, #0073FA 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.text2 {
			font-weight: bold;
			opacity: 0.1;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;

		}

		.text3 {
			font-weight: 600;
			position: absolute;
			bottom: 15rpx;
			bottom: rpx2multiple(2);
			left: 0;
			right: 0;
			margin: auto;
		}
	}

	.form {
		position: relative;
	}

	.forget-password {
		position: absolute;
		bottom: 30rpx;
		bottom: rpx2multiple(30);
		right: 0;
		font-size: 20rpx;
		font-size: rpx2multiple(20);
		font-family: PingFang SC;
		font-weight: 500;
		color: #395176;
	}

	.uni-forms-item {
		padding: 33rpx 0;
		padding: rpx2multiple(33) 0;
	}

	/deep/ .uni-easyinput__content {
		border-left: none;
		border-right: none;
		border-top: none;
		border-radius: 0;
	}

	uni-button {
		background: #0C24FF;
		border-radius: 80prx;
		border-radius: rpx2multiple(80);
		color: #FFFFFF;
		font-family: PingFang SC;
		font-weight: 600;
	}

	.app {
		display: none;
	}

	@media (max-width:500px) {

		.a-i-d,
		.a-i-d-v {
			display: none;
		}

		.content {
			background: none;
		}

		.app {
			display: block;
			width: 100%;

			.logo-c {
				text-align: center;
				width: 100%;
				height: 550rpx;
				padding-top: 150rpx;
				background: url(~@/static/image/app/login/loginbg.png) no-repeat left top;
				background-size: cover;
				.logo {
					width: 75rpx;
					height: 55rpx;
					margin: 0 auto;
				}

				.text1 {
					padding-top: 50rpx;
					font-size: 32px;
					font-size: rpx2multiple(32);
					font-family: DOUYU;
					font-weight: normal;
					background: linear-gradient(0deg, #ffffff 0%, #ffffff 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					text-align: center;
				}
			}
			.form {
				padding:70rpx;
			}
			.forget-password {
				right: 70rpx;
			}
			uni-button {
				border-radius: 10rpx;
				width: 90%;
				position: fixed;
				left: 0;
				right: 0;
				bottom: 100rpx;
				margin:0 auto;
				
			}

		}
	}
</style>
