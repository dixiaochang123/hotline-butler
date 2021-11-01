<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<Tabs :active="active" />
			<view class="box-main-parent">

				<view class="box-main box-style">
					<view class="box-style-head">
						<view class="">数据分析报告</view>
					</view>
					<view class="title">
						<view class="b-1"></view>
						<view class="t-1">武进区政府便民热线服务中心</view>
						<view class="b-1 b-2"></view>
					</view>
					<view class="title1">
						<view class="t-1">2021-09-11日报</view>
						<view class="b-1"></view>
					</view>
					<view class="first-t">
						<view class="f-t-1">
							区便民服务中心积极发挥12345政府便民热线的载体和平台作用，紧紧围绕党委 政府中心工作，立足服务群众、方便群众、推动机关作风转变，在办好民生诉求、深化
							诉接速办、提升服务质效上呈现了良好发展态势。现将有关运行情况汇报如下：
						</view>
						<view class="f-t-2">
							一、总体情况
						</view>
						<view class="f-t-3">
							2021年09月11日00:00至14：00・区12345热线共受理群众诉求14件，整体接通率0.00%。其中，投诉类11件，占78.57%，咨询类3件，占21.43%建议类0件,占0.00%，求助类0件，占。00%，表扬类0件，占0.00%，举报类0件，占0.00%。
						</view>

					</view>
					<view class="chart">
						<view class="charts-box">
							<qiun-data-charts type="ring" :opts="{legend:{show:false},grid:{left: '10%',}}"
								:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
						</view>
					</view>
					<view class="uni-container">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
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
									<view class="name">{{ item.name }}</view>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view v-if="false" class="uni-pagination-box">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
								@change="change" />
						</view>
					</view>
					<view class="first-t">
						<view class="f-t-2">
							二、集中诉求
						</view>
						<view class="f-t-3">
							市民通过热线反映诉求.主要诉求集中以下几个方面：
							1.建筑施I：噪声类⑴件）.昨日受理54件,环比下降79.63%。集中反映区域有: 西湖街道，洛阳镇，前黄镇等.
							2其他噪声污染类（2件）.昨日受理30件.环比下降93.33%.集中反映区域有: 西湖街道，前黄镇等.
							工其他服务类（1件）.昨日受理132件,环比下降99
						</view>
					</view>
					<view class="uni-container">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
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
									<view class="name">{{ item.name }}</view>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view v-if="false" class="uni-pagination-box">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
								@change="change" />
						</view>
					</view>
				</view>
				<view style="height: 100rpx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Tabs from '@/components/Tabs/index.vue';
	import demodata from '@/mockdata/demodata.json';
	import mapdata from '@/mockdata/mapdata.json'
	import tableData from './tableData.js'
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				isLandScape: true,
				active: '受理情况', //左侧tabs
				chartsDataPie2: {},
				searchVal: '',
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
			};
		},
		onReady() {
			this.getServerData()
		},
		onLoad() {
			this.selectedIndexs = []
			this.getData(1)
		},
		onResize() {
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
			getServerData() {
				setTimeout(() => {
					this.chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA))
				}, 1000);
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

	.box-main-parent {
		width: 100%;
		min-height: 100vh;
		overflow-y: auto;
		padding: rpx2multiple(40);
	}

	// 右侧内容区
	.box-main {
		width: 100%;
		// min-height: 100vh;
		// overflow-y: auto;
		// padding: 0 40rpx;
		// margin: rpx2multiple(40);
		padding: 0 rpx2multiple(40);
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: rpx2multiple(68) 0;
		padding-bottom: rpx2multiple(34);
		border-bottom: solid 1px #F2F2F2;

		.b-1 {
			width: rpx2multiple(110);
			height: rpx2multiple(11);
			// line-height: rpx2multiple(60);
			background: linear-gradient(-90deg, #4585F5 0%, #FFFFFF 100%);
			border-radius: rpx2multiple(6);
		}

		.b-2 {
			background: linear-gradient(90deg, #4585F5 0%, #FFFFFF 100%);
		}

		.t-1 {
			font-size: rpx2multiple(60);
			padding: 0 rpx2multiple(60);
			font-family: PingFang SC;
			font-weight: bold;
			color: #4585F5;
			vertical-align: middle;
		}
	}

	.title1 {
		font-size: rpx2multiple(60);
		font-family: PingFang SC;
		font-weight: bold;
		color: #395176;
		text-align: center;
		padding-bottom: rpx2multiple(70);

		.t-1 {
			padding: rpx2multiple(24) 0;
		}

		.b-1 {
			width: rpx2multiple(161);
			height: rpx2multiple(8);
			background: #4585F5;
			border-radius: rpx2multiple(4);
			margin: 0 auto;
		}
	}

	.first-t {
		// width: 1653px;
		// height: 212px;
		font-size: rpx2multiple(24);
		font-family: PingFang SC;
		font-weight: 400;
		color: #395176;
		line-height: rpx2multiple(38);
		text-indent: 2em;
		padding: 0 rpx2multiple(30);

		.f-t-1 {
			// padding:0 rpx2multiple(70)
		}

		.f-t-2 {
			font-size: rpx2multiple(50);
			font-weight: bold;
			font-family: PingFang SC;
			color: #395176;
			text-indent: 0;
			padding-top: rpx2multiple(50);
			padding-bottom: rpx2multiple(10);
		}
	}

	.chart {
		height: rpx2multiple(444);

		.charts-box {
			width: 100%;
			height: 100%;
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
</style>
<style>
	@import "../../static/style.css";
</style>
