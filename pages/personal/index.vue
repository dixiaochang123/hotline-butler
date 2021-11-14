<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="个人中心" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<view class="data-chart">
					<view class="box-style datas" style="width: 100%;">
						<view class="datas-info" v-if="!isChangePassword">

							<view class="welcome">
								<text class="text1">欢迎使用</text>
								<text class="text2">-热线管家</text>
							</view>
							<view class="banner">
								<!-- <image src="" mode=""></image> -->
								<view class="image">

								</view>
								<view class="admin">
									<text class="text1">GAFFES</text>
									<text class="text2">ID: <text>admin</text></text>
								</view>
							</view>
							<view class="info">
								<view class="">
									<text>部门</text>
									<text>研发中心</text>
								</view>
								<view class="">
									<text>岗位</text>
									<text>研发工程师</text>
								</view>
								<view class="">
									<text>角色</text>
									<text>员工</text>
								</view>
								<view class="">
									<text>联系电话</text>
									<text>025-83656073</text>
								</view>
								<view class="">
									<text>邮箱</text>
									<text>1234567@qq.com</text>
								</view>
							</view>
						</view>
						<view v-if="!!isChangePassword" class="">
							<view class="box-style-head">
								<view class="">修改密码</view>
							</view>
							<uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
								<uni-forms-item label="" name="password">
									<uni-easyinput class="input" v-model="formData.password" type="password"
										placeholder="请输入您的旧密码" @input="binddata('password',$event)" />
								</uni-forms-item>
								<uni-forms-item label="" name="password">
									<uni-easyinput class="input" v-model="formData.password" type="password"
										placeholder="请输入您的新密码" @input="binddata('password',$event)" />
								</uni-forms-item>
								<uni-forms-item label="" name="password">
									<uni-easyinput class="input" v-model="formData.password" type="password"
										placeholder="请确认您的新密码" @input="binddata('password',$event)" />
								</uni-forms-item>
							</uni-forms>
							<view class="" style="height: 80rpx;"></view>
							<button type="primary" @click="submit">确认修改</button>
						</view>
						<view class="btns" v-if="isshow">
							<view class="update" @click="updatepassword">修改密码</view>
							<view class="loginout" @click="loginout">退出登录</view>

						</view>
					</view>
				</view>
				<view style="height: 80rpx;"></view>
				<uni-popup ref="popup" type="dialog">
				    <uni-popup-dialog mode="base" title="提示" content="是否确认退出?" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
			</view>

		</view>
	</view>
</template>

<script>
	import {signout} from '@/utils/api.js';
	import Tabs from '@/components/Tabs/index.vue';
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				isLandScape: true,
				active: '个人中心', //左侧tabs
				isChangePassword: false,
				isshow:true,
				formData: {
					// name: '',
					phone: '1361166910',
					password: '111111',

				},
				rules: {
					phone: {
						rules: [{
							required: true,
							errorMessage: '请输入您的账号',
						}]
					},
					// 对phone字段进行必填验证
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入您的密码',
						}]
					}
				}

			}
		},
		onReady() {

		},
		onLoad() {

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
		watch: {
			password(newValue, oldValue) {
				this.isshow = false
			}
		},
		mounted() {

		},
		methods: {
			...mapActions(["setToken"]),
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				try {
				    uni.clearStorageSync();
					uni.clearStorage();
					uni.removeStorageSync('token');
				} catch (e) {
				    // error
				}
				this.setToken('')
				uni.setStorageSync('token', '')
				uni.navigateTo({
					url: '/pages/login/index' //跳转地址
				})
			},
			clickLeft() {
				const pages = getCurrentPages();
				if (pages.length === 2) {
					uni.navigateBack({
						delta: 1
					});
				} else if (pages.length === 1) {
					uni.switchTab({
						url: '/pages/login/index',
					})
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			updatepassword() {
				this.isChangePassword = true;
				this.isshow = false;
			},
			loginout() {
				this.$refs.popup.open()
			},
			handleClickDatareport() {
				uni.navigateTo({
					url: '/pages/acceptance/datareport' //跳转地址
				})
			},
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			binddata(name,e) {
				console.log(name,e)
				this.isshow = false
				// 通过 input 事件设置表单指定 name 的值
				// this.$refs.form.setValue(name, value)
			},
			// 触发提交表单
			submit() {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					this.isChangePassword = false;
					this.isshow = true
					// uni.navigateTo({
					// 	url: '../acceptance/index' //跳转地址
					// })

				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>
<style>
	@import "../../static/style.css";
</style>
<style lang="scss" scoped>
	@function rpx2multiple ($px) {
		@return ($px * 1)+rpx;
	}

	.content {
		height: 100vh;
		overflow: hidden;
		background-color: #F4F7F9;
	}

	.box {
		height: 100%;
		display: flex;
		justify-content: flex-start;

	}

	// 右侧内容区
	.box-main {
		width: 100%;
		height: 100vh;
		height: calc(100vh - 140rpx);
		padding: 0 40rpx;
		padding: 0 rpx2multiple(40);
	}

	.data-chart {
		height: calc(100% - 40rpx);
		margin: rpx2multiple(40) 0;
		margin-bottom: 0;
		display: flex;
		justify-content: space-between;

		.datas {
			position: relative;
		}

		.datas-info {
			width: 100%;
			height: 100%;
		}

		.welcome {
			font-size: rpx2multiple(70);
			font-family: PingFang SC;
			font-weight: 100;
			color: #000000;
			padding: rpx2multiple(30) 0;
			padding-top: 0;

			.text2 {
				font-weight: 500;
			}
		}

		.banner {
			width: 100%;
			height: rpx2multiple(250);
			// background-color: linear-gradient(90deg, rgba(117, 162, 255, 0.7), rgba(0, 115, 250, 0.7));
			background: url(~@/static/image/grzxhd.png) no-repeat center;
			background-size: 100% 100%;
			border-radius: rpx2multiple(20);
			margin-bottom: rpx2multiple(30);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-left: rpx2multiple(139);

			.image {
				width: rpx2multiple(175);
				height: rpx2multiple(175);
				border-radius: 50%;
				border: solid 1px;
				margin-right: rpx2multiple(54);
			}

			.admin {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: #FFFFFF;

				.text1 {
					font-size: rpx2multiple(60);
				}

				.text12 {
					font-size: rpx2multiple(30);
				}
			}
		}

		.info {
			&>view {
				height: rpx2multiple(100);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 rpx2multiple(43);
				font-size: rpx2multiple(24);
				font-family: PingFang SC;
				font-weight: bold;
				color: #395176;

				// &:nth-child(odd) 与 :nth-child(even)
				&:nth-child(odd) {
					border-top: solid 1px #F2F2F2;
					border-bottom: solid 1px #F2F2F2;
				}

			}
		}

		.btns {
			position: absolute;
			bottom: rpx2multiple(30);
			left: 0;
			right: 0;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;

			view {
				width: rpx2multiple(400);
				height: rpx2multiple(80);
				line-height: rpx2multiple(80);
				font-size: rpx2multiple(30);
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				background: #FF7E7E;
				border-radius: rpx2multiple(40);
				margin: 0 rpx2multiple(40);
				text-align: center;
			}

			.update {
				background-color: #0C24FF;
			}

			.loginout {
				background-color: #FF7E7E;
			}
		}
	}

	.form {
		width: 50%;
		margin: rpx2multiple(180) auto 0;
	}

	/deep/ .uni-forms-item {
		height: rpx2multiple(100);
		border-bottom:solid 1px #F2F2F2;
	}
	/deep/ .uni-forms-item__box {
		height: 100%;
	}
	/deep/ .uni-input-input,/deep/ .uni-forms-item__inner {
		height: rpx2multiple(100);
		text-align: center;
	}
	/deep/ .uni-easyinput__content-input {
		height: rpx2multiple(100);
		text-align: center;
	}
	/deep/ .uni-easyinput__content {
		border:none;
	}
	uni-button {
		background: #0073FA;
		border-radius: 80prx;
		border-radius: rpx2multiple(80);
		color: #FFFFFF;
		font-family: PingFang SC;
		font-weight: 600;
		width: rpx2multiple(400);
	}

	.uni-group {
		display: flex;
		align-items: center;
	}
	.app-nav {
			display: none;
		}
	
		@media (max-width:500px) {
			/deep/ .uni-nav-bar-text {
				font-family: PingFang !important;
				font-weight:900;
				background: linear-gradient(
				0deg, #000000 0%, #000000 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.app-nav {
				display: block !important;
			}
	
			.nav {
				display: none !important;
			}
	
			.isapp {
				display: none !important;
			}
	
			.box-style-head {
				font-size: 35rpx;
				padding-left: 12px;
	
				&::before {
					content: "";
					position: absolute;
					left: 0;
					top: 11px;
					width: 4px;
					height: 13px;
					background: #0073FA;
					border-radius: 2px;
				}
			}
	
			.box-style-head-right {
				font-size: 32rpx;
			}
	
			.uni-tabs .uni-tabs-item-selet {
				width: 228rpx;
			}
	
			.data-chart {
				display: block;
				height: auto;
	
				.datas {
					margin-bottom: 40rpx;
				}
			}
	
			.box-style {
				width: 100% !important;
				border-radius: 10rpx !important;
			}
	
			.data-chart .datas .data-type-content-list {
				width: 100% !important;
				display: inline-block;
	
				&:nth-of-type(2) {
					width: 48% !important;
					float: right !important;
				}
	
				&:last-of-type {
					width: 100% !important;
					text-align: center !important;
	
					.content-list-2 {
						margin: 0 auto !important;
					}
				}
			}
	
			.data-chart .datas .data-type-content-list .content-list-3 {
				font-size: 20rpx;
				white-space: nowrap;
			}
			.popup-box {
				width: 350px !important;
			}
	
	
	
	
	
	
	
	
		}
	
</style>
