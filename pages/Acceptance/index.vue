<template>
	<view class="content">
		<uni-nav-bar left-icon="back" left-text="<" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<!--  headtabs 当日诉求  近一周诉求 当月诉求-->
				<view class="uni-tabs">
					<view :class="[activetab==item.name ? 'uni-tabs-item uni-tabs-item-active' : '', 'uni-tabs-item']"
						v-for="(item,index) in headtabs" :key="index" @click="handletabschange(item)">
						{{item.name}}
					</view>
				</view>
				<!-- 受理数据展示 -->
				<view class="acceptance-data-show">
					<!-- left -->
					<view class="acceptance-data-show-left box-style">
						<view class="box-style-head">
							<view class="">当日受理数据</view>
							<view class="box-style-head-right">数据分析报告</view>
						</view>
						<view class="data-report">
							<view class="pmzd-font data-report-value">{{'2367'}}</view>
							<view class="data-report-border"></view>
							<view class="data-report-text">受理总量(件)</view>
						</view>
						<view class="data-type">
							<view class="data-type-content">
								
							</view>
							<view class="data-type-appeal">
								
							</view>
							
						</view>

					</view>
					<!-- right -->
					<view class="acceptance-data-show-right box-style">

					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import Tabs from '@/components/Tabs/index.vue'
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	export default {
		components: {
			uniNavBar,
			Tabs
		},
		data() {
			return {
				active: '受理情况', //左侧tabs
				activetab: '当日诉求', //顶部tabs
				headtabs: [{
					name: '当日诉求'
				}, {
					name: '近一周诉求'
				}, {
					name: '当月诉求'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			clickLeft() {

			},
			handletabschange(item) {
				this.activetab = item.name

			}
		}
	}
</script>
<style>
	@import "../../static/style.css";
</style>
<style lang="scss" scoped>
	@function rpx2multiple ($px) {
		@return ($px * 1.5)+rpx;
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
		min-height: 100vh;
		overflow-y: auto;
		padding: 0 40rpx;
		padding: 0 rpx2multiple(40);
		border: solid 1px;
	}

	// 顶部tabs
	.uni-tabs {
		width: 40%;
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

	// 受理数据展示box
	.acceptance-data-show {
		display: flex;
		justify-content: space-between;
		height: 100%;
		height: rpx2multiple(1590);

		// width  39.6  40
		.acceptance-data-show-left {
			width: 40%;
			height: 100%;
			margin-right: rpx2multiple(20);

			.data-report {
				height: rpx2multiple(250);
				border-radius: 20rpx;
				background-color: #4585F5;
				margin-top: rpx2multiple(40);
				padding:rpx2multiple(58) rpx2multiple(50);
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.data-report-value {
				font-size: rpx2multiple(100);
			}
			.data-report-border {
				width: rpx2multiple(75);
				height: rpx2multiple(8);
				background: #51FFFD;
				border-radius: rpx2multiple(4);
			}
			.data-report-text {
				font-size: rpx2multiple(25);
				font-weight: 500;
			}
			// 数据分类 内容 诉求
			.data-type {
				width: 100%;
				border:solid 1px;
				
			}
			// 内容
			.data-type-content {
				
			}
			// 诉求
			.data-type-appeal {
				
			}
		}

		// width  58.2  60
		.acceptance-data-show-right {
			width: 60%;
			height: 100%;
			margin-left: rpx2multiple(20);
		}
	}
</style>
