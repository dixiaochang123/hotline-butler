<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="●热线管家●\nHotline housekeeper" @clickLeft="clickLeft">
		</uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="督办工单" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="bg nav"></view>
		<view class="bg bg1 nav"></view>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<view class="box-style">
					<view class="box-style-head">
						<view class="">待督办工单详情</view>
					</view>
					<view class="uni-container">
						<uni-list>
							<uni-list-item title="工单标题" :rightText="detail.title"></uni-list-item>
							<uni-list-item title="计划完成时间" :rightText="detail.jiHauWanChengShiJian"></uni-list-item>
							<uni-list-item class="isapp" title="诉求目的" :rightText="detail.suQiuMuDi"></uni-list-item>
							<uni-list-item class="app-nav" title="诉求目的" :note="detail.suQiuMuDi"></uni-list-item>
							<uni-list-item title="内容描述" :note="detail.neiRong"></uni-list-item>
						</uni-list>
						<uni-list v-for="(item,index) in detail.processList" :key="'info'+index">
							<view class="box-style-head">
								<view class="">第{{indexs[index]}}次流转</view>
							</view>
							<uni-list-item title="流转部门" :rightText="item.deptName"></uni-list-item>
							<uni-list-item title="派发时间" :rightText="item.paiFaShiJian"></uni-list-item>
							<uni-list-item title="处理意见" :note="item.chuLiYiJian"></uni-list-item>
						</uni-list>
						<view>
							<view class="box-style-head">
								<view class="">审批意见</view>
							</view>
							<!-- <uni-list-item title="审批意见"></uni-list-item> -->
							<view class="textareabox" >
								
								<textarea v-model="contentText" auto-height />
							</view>
							<!-- <uni-list-item title="派发时间" rightText="这里是标题名称"></uni-list-item>
							<uni-list-item title="处理意见" note="文字是人类用符号记录表达信息以传之久远的方式和工具。现代文字大多是记录语言的工具。人类往往先有口头的语言后产生书面文字，很多小语种，有语言但没有
						   字。文字的不同体现了国家和民族的书面表达的方式和思维不同。文字使人类进入有历史记录的文明社会。"></uni-list-item> -->
						</view>
						<view class="btn">

							<button size="mini" type="primary" @click="save">督办提交</button>
						</view>

					</view>

				</view>
				<view style="height: 150rpx;"></view>
			</view>
			<uni-popup ref="popup1" type="bottom">
				<view class="box-style popup-box">
					<!-- <view class="box-style-head" style="visibility: hidden;">
						<view class="">督办/催办信息</view>
						<view @click="close" class="box-style-head-right"><uni-icons type="closeempty" size="30"></uni-icons></view>
					</view> -->
					<view class="textarea" style="visibility: hidden;">
			
					</view>
					<view class="info">办理信息已提交</view>
					<button class="btn" type="default" @click="closeinfo">确 定</button>
					<view style="height:20rpx;"></view>
				</view>
			</uni-popup>
			<uni-popup ref="popup1" type="bottom">
				<view class="box-style popup-box">
					<!-- <view class="box-style-head" style="visibility: hidden;">
						<view class="">督办/催办信息</view>
						<view @click="close" class="box-style-head-right"><uni-icons type="closeempty" size="30"></uni-icons></view>
					</view> -->
					<view class="textarea" style="visibility: hidden;">
			
					</view>
					<view class="info">督办/催办信息已发送</view>
					<button class="btn" type="default" @click="closeinfo">确 定</button>
					<view style="height:20rpx;"></view>
				</view>
			</uni-popup>

		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from "vuex";
	import Tabs from '@/components/Tabs/index.vue';
	import {
		gdDetail,
		addNetWorkOrder
	} from '@/utils/api.js';
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {value:'',
				contentText: '',
				sldata: '',
				isLandScape: true,
				active: '督查督办', //左侧tabs
				detail:{},
				indexs:['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五'],
				date:''
				
			}
		},
		onReady() {
			//模拟从服务器获取数据
		},
		onLoad(option) {
			this.gdDetail(option.formId)
			this.date = option.date

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
		computed: {
			...mapGetters(["token"])
		},
		mounted() {

		},
		methods: {
			gdDetail(id) {
				gdDetail(id).then(res=>{
					let {code,data} = res.data
					// console.log(res)
					console.log(code,data)
					this.detail = data
				}).catch(error=>console.log(error))
			},
			save() {
				// this.$refs.popup1.open('center');
				let params = {
					id:this.detail.busiNum,
					context:this.contentText
				}
				addNetWorkOrder(params).then(res=>{
					let {
						code,
						data
					} = res.data;
					console.log(code,data,data.operMsg)
					if(data.operMsg=="提交成功") {
						// this.$refs.popup.close();
						this.$refs.popup1.open('center');
					} else {
						this.message = data.operMsg
						// this.$refs.popup.close();
						uni.showModal({
						    title: '提示',
							showCancel:false,
						    content: data.operMsg,
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}).catch(error=>console.log(error))
			},
			sendinfo() {
				this.$refs.popup.close();
				this.$refs.popup1.open('center');
			},
			closeinfo() {
				this.$refs.popup1.close();
				uni.navigateTo({
					url: `/pages/supervise/superviselist?activetab=已督办&date=${this.date}`
				})
			},
			
			clickLeft() {
				uni.navigateBack({
					delta: 1
				});
				// const pages = getCurrentPages();
				// if (pages.length === 2) {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	});
				// } else if (pages.length === 1) {
				// 	uni.switchTab({
				// 		url: '/pages/login/index',
				// 	})
				// } else {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	});
				// }
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
		// background: url(../../static/image/1125/城市底纹.png) no-repeat left top;
		// background-size: 100% 500rpx;
		background-color: #F4F7F9;
		position: relative;
	}

	.bg {
		width: 100%;
		height: 425rpx;
		position: absolute;
		top: 0;
		z-index: 1;
		background: linear-gradient(0deg, #F4F7F9 0%, #2D72FF 100%);
	}

	.bg1 {
		width: 100%;
		height: 425rpx;
		position: absolute;
		top: 0;
		background: url(../../static/image/update/bg.png) no-repeat left top;
		background-size: 100% 90%;
		z-index: 2;
	}

	.box {
		height: 100%;
		display: flex;
		justify-content: flex-start;
		position: relative;
		background-color: transparent;
		z-index: 2;

	}

	// 右侧内容区
	.box-main {
		width: 100%;
		// min-height: 100vh;
		// overflow-y: auto;
		padding: 0 40rpx;
		padding: 0 rpx2multiple(40);
	}

	// 顶部tabs
	.uni-tabs {
		width: 30%;
		height: 165rpx;
		height: rpx2multiple(165);
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.uni-tabs-item {
			width: rpx2multiple(200);
			height: rpx2multiple(65);
			font-size: rpx2multiple(24);
			line-height: rpx2multiple(65);
			font-family: PingFang SC;
			font-weight: 800;
			color: #FFFFFF;
			text-align: center;
		}

		.uni-tabs-item-active {
			background: #FFFFFF;
			border-radius: rpx2multiple(33);
			color: #4B93F7;
		}
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

	.box-style {
		max-height: 80vh;
		overflow-y: auto;
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

	.btn {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		align-items: center;
	}
	.textareabox {
			// border:solid 1px #CCCCCC;
			border-radius: 5rpx;
			background-color: #fcfafa;
			overflow: hidden;
			padding:10rpx;
			color: #3b4144;
		// 	min-height:200rpx !important;
		// height:auto !important;
	}
	/deep/ uni-textarea {
		min-height:200rpx !important;
		height:auto !important;
		width: 100% !important;
		// border: solid 1px !important;
	}
	// /deep/ .uni-textarea-textarea {
	// 	height:100rpx;
	// 	border:solid 1px #CCCCCC;
	// 	border-radius: 5rpx;
	// 	background-color: #EEEEEE;
	// 	overflow: hidden;
	// 	padding:10rpx;
	// 	color: #3b4144;
	// }


	// app
	.app-nav {
		display: none;
	}

	@media (max-width:500px) {
		.content {
			background-color: #FFFFFF;
		}

		.box {
			border-top: solid 10px #F4F4F4;
			box-sizing: border-box;
		}

		/deep/ .uni-nav-bar-text {
			font-family: PingFang !important;
			font-weight: 900;
			background: linear-gradient(0deg, #000000 0%, #000000 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.app-nav {
			display: block;
		}

		.nav {
			display: none;
		}

		.isapp {
			display: none !important;
		}

		.box-style {
			border-radius: 10rpx;
			padding-left: 0;
			padding-right: 0;
			max-height: calc(80vh - 10px);
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
		.popup-box {
			width: 550rpx !important;
			min-height: 200rpx;
			background-size: 70% 50%;
			.textarea {
				height: 200rpx;
			}
		}

		.box-style-head-right {
			font-size: 32rpx;
		}

		// 顶部tabs
		.uni-tabs {
			width: 90%;
			height: 145rpx;
			height: rpx2multiple(145);
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.uni-tabs-item {
				width: rpx2multiple(200);
				height: rpx2multiple(65);
				font-size: rpx2multiple(24);
				line-height: rpx2multiple(65);
				font-family: PingFang SC;
				font-weight: 800;
				color: #B8C0CB;
				text-align: center;
			}

			.uni-tabs-item-active {
				background: #4585F5;
				border-radius: rpx2multiple(33);
				color: #FFFFFF;
			}
		}


	}
</style>
