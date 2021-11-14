<template>
	<view class="content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="app">
			<view class="logo-c">
				<image class="logo" src="/static/image/app/login/logo.png" mode=""></image>
				<view class="text1">武进12345热线管家</view>
			</view>
			<view class="" style="height:50rpx;"></view>
			<view class="view-f">
				<view class="f-1" @click="handleclickgettogo('/pages/acceptance/index')">
					<view class="p-1">受理情况</view>
					<view class="p-2"></view>
					<view class="p-3">Acceptance</view>
					<image class="img-icon" src="/static/image/app/index/slqk.png" mode=""></image>
				</view>
				<view class="f-1" @click="handleclickgettogo('/pages/assessdata/index')">
					<view class="p-1">考核数据</view>
					<view class="p-2"></view>
					<view class="p-3">Assessment data</view>
					<image class="img-icon" src="/static/image/app/index/khsj.png" mode=""></image>
				</view>

			</view>
			<view class="view-f">
				<view class="f-1 f-1-2" @click="handleclickgettogo('/pages/supervise/index')">
					<view class="p-1">督查督办</view>
					<view class="p-2"></view>
					<view class="p-3">Supervision</view>
					<image class="img-icon" src="/static/image/app/index/dcdb.png" mode=""></image>
				</view>
				<view class="f-1 f-1-2" @click="handleclickgettogo('/pages/dataanalysis/index')">
					<view class="p-1">数据分析</view>
					<view class="p-2"></view>
					<view class="p-3">Data analysis</view>
					<image class="img-icon" src="/static/image/app/index/sjfx.png" mode=""></image>
				</view>

			</view>

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
				
			};
		},
		
		methods: {
			...mapActions(["setToken"]),
			handleclickgettogo(data) {
				uni.navigateTo({
			　　     url: data //跳转地址
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

	.content {
		// background-color: rgba(244, 247, 249, 1);
		background-color: #F4F7F9;
		height: 100vh;
		width: 100%;
		// background: url(../../image/dlyBG.png) no-repeat rpx2multiple(128) center;
		// background-size: contain;
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
			background: url(~@/static/image/app/index/bj.png) no-repeat left top;
			background-size: 100% 100%;
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
				background-size: 100% 100%;

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

			.view-f {
				display: flex;
				justify-content: space-around;
				padding: 0 40rpx;
			}

			.f-1 {
				width: 365rpx;
				height: 400rpx;
				background: url(~@/static/image/app/index/slbj.png) no-repeat left top;
				background-size: 100% 100%;
				color: #ffffff;
				padding-top: 80rpx;
				padding-left: 40rpx;
				position: relative;
				&:nth-of-type(2) {
					background: url(~@/static/image/app/index/khsjbj.png) no-repeat left top;
					background-size: 100% 100%;
				}
			}
			.f-1-2 {
				&:nth-of-type(1) {
					background: url(~@/static/image/app/index/dcbj.png) no-repeat left top;
					background-size: 100% 100%;
				}
				&:nth-of-type(2) {
					background: url(~@/static/image/app/index/sjfxbj.png) no-repeat left top;
					background-size: 100% 100%;
				}
			}

			.p-1 {
				font-size: 32rpx;
			}

			.p-2 {
				width: 32rpx;
				height: 6rpx;
				border-radius: 3rpx;
				background-color: #5cf1e7;
			}

			.p-3 {
				font-size: 20rpx;
			}

			.img-icon {
				width: 68rpx;
				height: 68rpx;
				position: absolute;
				bottom: 80rpx;
				left: 40rpx;
			}

		}
	}
</style>
