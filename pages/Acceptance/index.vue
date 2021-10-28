<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
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
						<view class="data-type-title">
							<text class="text1">按内容类别</text>
							<text class="text2">按诉求类别</text>
						</view>
						<view class="data-type">
							<view class="data-type-content">
								<view class="data-type-content-list" v-for="(item) in 5" :key="item">
									<view class="content-list-1">疫情防控 200件</view>
									<view class="content-list-2"></view>
									<view class="pmzd-font content-list-3">60.30%</view>
								</view>

							</view>
							<view class="data-type-appeal">
								<view class="data-type-content-list" v-for="(item) in 6" :key="item">
									<view class="content-list-1">疫情防控 200件</view>
									<view class="content-list-2"></view>
									<view class="pmzd-font content-list-3">60.30%</view>
								</view>

							</view>

						</view>

					</view>
					<!-- right -->
					<view class="acceptance-data-show-right">
						<view class="acceptance-data-show-right1 box-style">
							<view class="box-style-head">
								<view class="">当日热点诉求Top5 (二级归口)</view>
							</view>
							<view class="chart" id="container">
								
							</view>
						</view>
						<view class="acceptance-data-show-right2 box-style">
							<view class="box-style-head">
								<view class="">当日热点诉求Top5 (三级归口)</view>
							</view>
							<view class="chart" id="container1">
								
							</view>
						</view>
						<view class="acceptance-data-show-right3 box-style">
							<view class="box-style-head">
								<view class="">当日***单位办理数据</view>
							</view>
							<view class="chart" id="container2">
								
							</view>
						</view>

					</view>

				</view>
				<view class="word-order box-style" >
					<view class="box-style-head">
						<view class="">回访不满意工单</view>
					</view>
					<view style="width: 100%;">
						
						<uni-table border stripe emptyText="暂无更多数据" >
							<!-- 表头行 -->
							<uni-tr>
								<uni-th width="30%" align="center">日期</uni-th>
								<uni-th width="30%" align="center">姓名</uni-th>
								<uni-th width="30%" align="left">地址</uni-th>
							</uni-tr>
							<!-- 表格数据行 -->
							<uni-tr>
								<uni-td>2020-10-20</uni-td>
								<uni-td>Jeson</uni-td>
								<uni-td>北京市海淀区</uni-td>
							</uni-tr>
							<uni-tr>
								<uni-td>2020-10-21</uni-td>
								<uni-td>HanMeiMei</uni-td>
								<uni-td>北京市海淀区</uni-td>
							</uni-tr>
							<uni-tr>
								<uni-td>2020-10-22</uni-td>
								<uni-td>LiLei</uni-td>
								<uni-td>北京市海淀区</uni-td>
							</uni-tr>
							<uni-tr>
								<uni-td>2020-10-23</uni-td>
								<uni-td>Danner</uni-td>
								<uni-td>北京市海淀区</uni-td>
							</uni-tr>
						
						</uni-table>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
	import Tabs from '@/components/Tabs/index.vue';
	import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue';
	import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue';
	import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue';
	import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue';
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	let myChart;
	export default {
		components: {
			uniNavBar,
			Tabs,
			uniTable,
			uniTh,
			uniTd
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
				}],
				canvas: '',
			}
		},
		onLoad() {

		},
		mounted() {
			console.log(this.sdata);
			// renderjs 里可以自由操作 window 、dom等浏览器环境属性
			const container = document.getElementById('container')
			// 创建 html5 canvas DOM
			const canvas = document.createElement('canvas')
			// id 不可重复
			canvas.id = 'f2'
			// canvas.width = uni.upx2px(750)
			// canvas.height = uni.upx2px(750)
			canvas.width = 1058;
			canvas.height = 380;
			console.log(canvas.width,canvas.height)
			container.appendChild(canvas)
			this.canvas = canvas;
			
			if (typeof window.F2 === 'function') {
				this.initF4()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				script.src = 'static/echarts.min.js'
				script.onload = this.initF4.bind(this)
				document.head.appendChild(script)
			
			}
		},
		methods: {
			clickLeft() {

			},
			handletabschange(item) {
				this.activetab = item.name

			},
			init5: function() {
				console.log(234);
			},
			initF4() {
				var myChart = echarts.init(this.canvas);
				var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
				var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
				var yMax = 500;
				var dataShadow = [];
				
				for (var i = 0; i < data.length; i++) {
				    dataShadow.push(yMax);
				}
				
				var option = {
				    title: {
				        text: '特性示例：渐变色 阴影 点击缩放',
				        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
				    },
				    xAxis: {
				        data: dataAxis,
				        axisLabel: {
				            inside: true,
				            textStyle: {
				                color: '#fff'
				            }
				        },
				        axisTick: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        z: 10
				    },
				    yAxis: {
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#999'
				            }
				        }
				    },
				    dataZoom: [
				        {
				            type: 'inside'
				        }
				    ],
				    series: [
				        { // For shadow
				            type: 'bar',
				            itemStyle: {
				                color: 'rgba(0,0,0,0.05)'
				            },
				            barGap: '-100%',
				            barCategoryGap: '40%',
				            data: dataShadow,
				            animation: false
				        },
				        {
				            type: 'bar',
				            itemStyle: {
				                color: new echarts.graphic.LinearGradient(
				                    0, 0, 0, 1,
				                    [
				                        {offset: 0, color: '#83bff6'},
				                        {offset: 0.5, color: '#188df0'},
				                        {offset: 1, color: '#188df0'}
				                    ]
				                )
				            },
				            emphasis: {
				                itemStyle: {
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1,
				                        [
				                            {offset: 0, color: '#2378f7'},
				                            {offset: 0.7, color: '#2378f7'},
				                            {offset: 1, color: '#83bff6'}
				                        ]
				                    )
				                }
				            },
				            data: data
				        }
				    ]
				};
				
				// Enable data zoom when user click bar.
				var zoomSize = 6;
				myChart.on('click', function (params) {
				    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
				    myChart.dispatchAction({
				        type: 'dataZoom',
				        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
				        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
				    });
				});
				myChart.setOption(option);
			},
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
		height: rpx2multiple(1700);

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
				padding: rpx2multiple(58) rpx2multiple(50);
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

			.data-type-title {
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: rpx2multiple(30);
				font-family: PingFang SC;
				font-weight: bold;
				color: #395176;
				margin: rpx2multiple(40) 0 rpx2multiple(30);

				text {
					width: 50%;
					padding: 0;
					text-align: left;
				}

				.text1 {
					margin-right: rpx2multiple(20);
				}

				.text2 {
					margin-left: rpx2multiple(20);
				}
			}

			// 数据分类 内容 诉求
			.data-type {
				width: 100%;
				height: calc(100% - 850rpx);
				display: flex;
				justify-content: space-between;


			}

			// 内容
			.data-type-content {
				height: 100%;
				width: 50%;
				margin-right: rpx2multiple(20);
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
			}

			// 诉求
			.data-type-appeal {
				height: 100%;
				width: 50%;
				margin-left: rpx2multiple(20);
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
			}

			.data-type-content-list {
				padding: rpx2multiple(30);
				// height: rpx2multiple(180);
				// height: calc(100% / 6);
				background: #DAEFFF;
				border-radius: rpx2multiple(10);
				margin-bottom: rpx2multiple(20);
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
				}
			}
		}

		// width  58.2  60
		.acceptance-data-show-right {
			width: 60%;
			height: 100%;
			margin-left: rpx2multiple(20);
			display: flex;
			justify-content: space-between;
			flex-direction: column;

			>view {
				height: 33%;
			}

			.acceptance-data-show-right1 {
				margin-bottom: rpx2multiple(40);
			}

			.acceptance-data-show-right2 {
				margin-bottom: rpx2multiple(40);
			}
			.acceptance-data-show-right3 {
				
			}
			.chart {
				width: 100%;
				height: 100%;
				border:solid 1px red;
				// canvas {
				// 	width: 100% !important;
				// 	height: 100% !important;
				// }
			}
		}
	}
	.word-order {
		width: 100%;
		margin-top: rpx2multiple(40);
	}
</style>
