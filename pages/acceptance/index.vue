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
							<view class="">{{subname}}受理数据</view>
							<view class="box-style-head-right">数据分析报告</view>
						</view>
						<view class="data-report" @click="handleClickDatareport">
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
							<view class="charts-box">
								<qiun-data-charts type="column"
									:opts="{legend:{show:false},color:['#FAC858','#EE6666'],extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true,customColor:['#FA7D8D','#EB88E2']}}}"
									:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" />
							</view>
						</view>
						<view class="acceptance-data-show-right2 box-style">
							<view class="box-style-head">
								<view class="">当日热点诉求Top5 (三级归口)</view>
							</view>
							<view class="charts-box">
								<qiun-data-charts type="column"
									:opts="{legend:{show:false},color:['#FAC858','#EE6666'],extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true,customColor:['#FA7D8D','#EB88E2']}}}"
									:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" />
							</view>
						</view>
						<view class="acceptance-data-show-right3 box-style">
							<view class="box-style-head">
								<view class="">当日***单位办理数据</view>
							</view>
							<view class="charts-box">
								<qiun-data-charts type="column"
									:opts="{legend:{show:false},color:['#FAC858','#EE6666'],extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true,customColor:['#FA7D8D','#EB88E2']}}}"
									:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" />
							</view>
						</view>

					</view>

				</view>
				<view class="word-order box-style">
					<view class="box-style-head">
						<view class="">回访不满意工单</view>
					</view>

					<view class="uni-container">
						<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th align="center">日期</uni-th>
								<uni-th width="25%" align="center">姓名</uni-th>
								<uni-th width="25%" align="center">姓名</uni-th>
								<uni-th width="25%" align="center">地址</uni-th>
								<uni-th width="25%" align="center">设置</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="index">
								<uni-td align="center">{{ item.date }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.name }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.name }}</view>
								</uni-td>
								<uni-td align="center">{{ item.address }}</uni-td>
								<uni-td align="center">
									<view class="uni-group">
										<button class="uni-button" size="mini" type="primary">修改</button>
										<button class="uni-button" size="mini" type="warn">删除</button>
									</view>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view v-if="false" class="uni-pagination-box">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
								@change="change" />
						</view>
					</view>

				</view>
				<view class="order-details box-style">
					<view class="box-style-head">
						<view class="">一次不满意工单详情</view>
					</view>
					<view class="" style="width: 100%;">
						<uni-collapse>
							<uni-collapse-item title="标题文字" :border="true"
								thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="标题文字" :border="true"
								thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="标题文字" :border="true"
								thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="标题文字" :border="true"
								thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
						</uni-collapse>

					</view>

				</view>
				<view class="order-details-pie box-style">
					<view class="box-style-head">
						<view class="">一次不满意工单详情</view>
					</view>
					<view class="charts-box">
						<!-- 演示动态改变eopts -->
						<qiun-data-charts type="ring" :opts="{legend:{show:false}}" :eopts="ringOpts"
							:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
					</view>


				</view>
				<view style="height: 150rpx;"></view>
			</view>

		</view>
	</view>
</template>

<script>
	import demodata from '@/mockdata/demodata.json';
	import mapdata from '@/mockdata/mapdata.json'
	import tableData from './tableData.js'
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
				active: '受理情况', //左侧tabs
				activetab: '当日诉求', //顶部tabs
				subname: '当日', //顶部tabs
				headtabs: [{
					name: '当日诉求',
					subname: '当日'
				}, {
					name: '近一周诉求',
					subname: '近一周'
				}, {
					name: '当月诉求',
					subname: '当月'
				}],
				canvas: '',

				searchVal: '',
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,

				chartsDataColumn5: {},
				chartsDataPie2: {},
				ringOpts: {},
			}
		},
		onReady() {
			//模拟从服务器获取数据
			this.getServerData()
		},
		onLoad() {
			this.selectedIndexs = []
			this.getData(1)
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
			getServerData() {
				setTimeout(() => {
					//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
					//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
					this.chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column))
					this.chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA))
					this.ringOpts = {
						color:['#E9A700','#E95F5E','#5E63FF','#5EC4FF','#EA7FE3','#9B8EFF','#6CDC2C','#672099','#F2984E','#0263FF'],
						legend: {
							show: false
						},
					}
					console.log(this.chartsDataPie2)
				}, 1000);
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
			handleClickDatareport() {
				uni.navigateTo({
					url: '/pages/acceptance/datareport' //跳转地址
				})
			},
			handletabschange(item) {
				this.activetab = item.name;
				this.subname = item.subname;

			},
			// 多选处理
			selectedItems() {
				return this.selectedIndexs.map(i => this.tableData[i])
			},
			// 多选
			selectionChange(e) {
				console.log(e.detail.index)
				this.selectedIndexs = e.detail.index
			},
			//批量删除
			delTable() {
				console.log(this.selectedItems())
			},
			// 分页触发
			change(e) {
				this.$refs.table.clearSelection()
				this.selectedIndexs.length = 0
				this.getData(e.current)
			},
			// 搜索
			search() {
				this.getData(1, this.searchVal)
			},
			// 获取数据
			getData(pageCurrent, value = '') {
				this.loading = true
				this.pageCurrent = pageCurrent
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					value: value,
					success: res => {
						// console.log('data', res);
						this.tableData = res.data
						this.total = res.total
						this.loading = false
					}
				})
			},
			// 伪request请求
			request(options) {
				const {
					pageSize,
					pageCurrent,
					success,
					value
				} = options
				let total = tableData.length
				let data = tableData.filter((item, index) => {
					const idx = index - (pageCurrent - 1) * pageSize
					return idx < pageSize && idx >= 0
				})
				if (value) {
					data = []
					tableData.forEach(item => {
						if (item.name.indexOf(value) !== -1) {
							data.push(item)
						}
					})
					total = data.length
				}

				setTimeout(() => {
					typeof success === 'function' &&
						success({
							data: data,
							total: total
						})
				}, 500)
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

			.acceptance-data-show-right3 {}

			.charts-box {
				width: 100%;
				height: 100%;
				padding: rpx2multiple(35) 0;
			}
		}
	}

	.word-order {
		width: 100%;
		margin-top: rpx2multiple(40);

		.uni-container {
			margin-top: rpx2multiple(50);
		}

		td {
			font-size: rpx2multiple(24);
			font-family: PingFang SC;
			font-weight: 500;
			color: #395176;
		}
	}

	.order-details {
		margin-top: rpx2multiple(40);

		/deep/ .uni-collapse-item {
			margin-bottom: rpx2multiple(30);
			background: #F9FBFC;
		}

		/deep/ .uni-collapse-item__title-box {
			height: rpx2multiple(150);
			background: #F9FBFC;
			font-size: rpx2multiple(24);
			font-family: PingFang SC;
			font-weight: bold;
			color: #395176;
		}

		/deep/ .uni-collapse-item__wrap-content {
			height: auto;

			.content {
				height: auto;
				background: #F9FBFC;
				border-top: solid 1px #000000;
				padding: rpx2multiple(40) rpx2multiple(15);
				font-size: rpx2multiple(24);
				font-family: PingFang SC;
				font-weight: 300;
				color: #395176;
				line-height: rpx2multiple(38);
			}
		}
	}

	.order-details-pie {
		margin-top: rpx2multiple(40);
		height: rpx2multiple(715);

		.charts-box {
			width: 100%;
			height: 100%;
			padding: rpx2multiple(35) 0;
			box-sizing: border-box;
		}
	}


	.uni-group {
		display: flex;
		align-items: center;
	}
</style>
