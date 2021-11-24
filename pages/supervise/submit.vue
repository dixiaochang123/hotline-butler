<template>
	<view class="content">
		<uni-nav-bar class="app-nav" left-icon="back" title="督办/催办信息" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="" style="height: 20rpx;background: #F4F4F4;"></view>
		<view class="" style="height: 30rpx;"></view>
		<textarea class="textarea" v-model="textarea" placeholder="输入字体" />
		<button class="mini-btn" type="default" @click="submit">发送</button>
		<view class="box">
			<uni-popup ref="popup" type="bottom">
				<view class="box-style popup-box">
					<view class="" style="height:400rpx;">
						
					</view>
					<view class="info">督办/催办信息已发送</view>
					<view style="height:20rpx;">
						
					</view>
					<!-- <button class="btn" type="default" @click="closeinfo">确 定</button> -->
					<view style="height:20rpx;"></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import demodata from '@/mockdata/demodata.json';
	import mapdata from '@/mockdata/mapdata.json'
	import Tabs from '@/components/Tabs/index.vue';
	import tableData from './tableData.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	import {
		overview,
		gldept,
		dbdc2jgk,
		dbdc3jgk,
		wtgd,
		dbdchfbmygd,
		lzdtbhb,
		sqlbhqs,
		zysjbm
	} from '@/utils/api.js'
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				textarea: ''
			}
		},
		onReady() {

		},
		onLoad(option) {

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

		},
		methods: {
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
			submit() {
				this.$refs.popup.open('center');
				setTimeout(()=>{
					this.clickLeft()
				},1000)
			},
			close() {
				this.$refs.popup.close();
			},
			sendinfo() {
				this.$refs.popup.close();
				this.$refs.popup1.open('center');
			},
			closeinfo() {
				this.$refs.popup.close();
			},
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
		background-color: #FFFFFF;
	}

	.box {
		height: 100%;
		display: flex;
		justify-content: flex-start;

	}

	// 右侧内容区
	.box-main {
		width: 100%;
		min-height: 100vh;
		overflow-y: auto;
		padding: 0 40rpx;
		padding: 0 rpx2multiple(40);
	}

	.uni-container {
		.uni-table-tr {
			height: rpx2multiple(100);
		}

		td {
			font-size: rpx2multiple(24);
			font-family: PingFang SC;
			font-weight: 500;
			color: #395176;
		}
	}

	.data-chart {
		margin: rpx2multiple(40) 0;
		height: rpx2multiple(658);
		display: flex;
		justify-content: space-between;

		.datas {
			margin-right: rpx2multiple(40);

			.data-type-content-list {
				height: rpx2multiple(250);
				padding: rpx2multiple(50) rpx2multiple(30);
				background: url(~@/static/image/wtgdzl.png) no-repeat right center;
				background-size: contain;
				background-color: #4585F5;
				border-radius: rpx2multiple(10);
				margin-bottom: rpx2multiple(40);
				font-family: PingFang SC;
				display: flex;
				justify-content: space-between;
				flex-direction: column;

				&:last-of-type {
					margin-bottom: 0;
				}

				.content-list-1 {
					font-size: rpx2multiple(24);
					font-weight: 500;
					color: #1EA2FF;
					color: #FFFFFF;
				}

				.content-list-2 {
					width: rpx2multiple(33);
					height: rpx2multiple(4);
					background: #1EA2FF;
					border-radius: rpx2multiple(2);
				}

				.content-list-3 {
					font-size: rpx2multiple(50);
					color: #1EA2FF;
					color: #FFFFFF;
				}
			}

			.data-type-content-list-3 {
				display: flex;
				justify-content: flex-start;

				.data-type-content-list-4 {
					display: flex;
					justify-content: flex-start;
					width: 41%;
				}

				.data-type-content-list-5 {
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					font-size: rpx2multiple(46);
					font-family: PangMenZhengDao;
					font-weight: 400;
					color: #395176;
					padding-left: rpx2multiple(10);

					.t-1 {
						font-size: rpx2multiple(20);
						display: inline-block;
						padding-left: rpx2multiple(10);
					}

					.t-2 {
						font-size: rpx2multiple(24);
					}
				}

			}
		}

		.datas-2 {
			// margin-left: rpx2multiple(40);
			display: flex;
			justify-content: space-between;
		}

		.charts {
			margin-left: rpx2multiple(40);

			.charts-box {
				width: 100%;
				height: 100%;
				padding: rpx2multiple(55) 0;
			}
		}

		.chats-main {
			margin-right: rpx2multiple(40);
		}
	}

	.popup-box {
		width: rpx2multiple(980);
		min-height: rpx2multiple(640);
		background: url(~@/static/image/dcdb1.png) no-repeat center top;
		background-size: 70% 70%;
		background-color: #FFFFFF;

		.textarea {
			margin-top: rpx2multiple(40);
			margin-bottom: rpx2multiple(40);
			width: 100%;
			height: rpx2multiple(387);
			background: #F2F2F2;
			border-radius: rpx2multiple(18);
			padding: rpx2multiple(21);
			font-size: rpx2multiple(24);
			font-family: PingFang;
			font-weight: bold;
		}

		.info {
			font-size: rpx2multiple(36);
			font-family: PingFang;
			font-weight: bold;
			color: #4585F5;
			text-align: center;
		}

		.btn {
			width: rpx2multiple(140);
			height: rpx2multiple(60);
			line-height: rpx2multiple(60);
			background: #0073FA;
			border-radius: rpx2multiple(10);
			font-size: 24rpx;
			font-family: PingFang;
			font-weight: bold;
			color: #FFFFFF;
		}
	}

	.chart-pie {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;

		.charts-box {
			width: 30%;
			height: 100%;
			padding: rpx2multiple(35) 0;
			box-sizing: border-box;
		}

		.chart-pie-legend {
			width: 70%;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			padding: rpx2multiple(100);

			.data-type-content-list {
				width: 25%;
				// height: rpx2multiple(68);
				// background: #4585F5;
				border-radius: rpx2multiple(30);
				display: flex;
				justify-content: flex-start;
				padding: rpx2multiple(30) rpx2multiple(39);
				color: #395176;

				.content-list-1 {
					width: rpx2multiple(68);
					height: rpx2multiple(68);

					// background-color: #E9A700;
					.images,
					img {
						width: rpx2multiple(68);
						height: rpx2multiple(68);
					}
				}

				.content-list-2 {
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					font-family: PangMenZhengDao;
					font-size: rpx2multiple(24);
					padding-left: rpx2multiple(20);

					.content-list-2-2 {
						font-size: rpx2multiple(36);
					}
				}

			}
		}
	}

	.uni-tabs-item-selet {
		width: rpx2multiple(260);
		border-radius: rpx2multiple(65);
		border: solid 1px #4585F5;
		padding: 10rpx;

		/deep/ .input-value-border {
			// border-radius: rpx2multiple(65);
			color: #000000;
		}
	}

	.uni-table-scroll {
		height: 800rpx;
		overflow-y: auto;
	}


	.uni-group {
		display: flex;
		align-items: center;
	}

	.app-nav {
		display: none;
	}
	.textarea {
		width: 90%;
		min-height: 580rpx;
		margin:0 auto;
		background: #F4F4F4;
		border-radius: 9rpx;
		padding:20rpx;
	}
	.mini-btn{
		 width: 90%;
		 height: 95rpx;
		 line-height: 95rpx;
		 margin:0 auto;
		 background: #1E427B;
		 border-radius: 8rpx;
		 text-align: center;
		 color: #FFFFFF;
		 font-size: 30rpx;
		 font-family: PingFang SC;
		 font-weight: bold;
		 position: fixed;
		 bottom: 200rpx;
		 left: 0;
		 right: 0;
	 }

	@media (max-width:500px) {
		/deep/ .uni-nav-bar-text {
			font-family: PingFang !important;
			font-weight: 900;
			background: linear-gradient(0deg, #000000 0%, #000000 100%);
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
			width: 80% !important;
			height: 200rpx;
			border-radius: 10rpx !important;
		}

		.chart-pie {
			height: 470rpx;
		}

		.chart-pie .chart-pie-legend .data-type-content-list {
			padding: rpx2multiple(10) rpx2multiple(30);
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

		.chart-pie .chart-pie-legend {
			padding: 0;
		}

		.chart-pie .chart-pie-legend .data-type-content-list {
			width: 50%;
		}








	}
</style>
