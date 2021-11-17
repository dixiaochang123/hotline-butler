<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<Tabs class="isapp" :active="active" />
			<view class="box-main-parent">

				<view class="box-main box-style">
					<view class="box-style-head isapp">
						<view class="">数据分析报告</view>
					</view>
					<view class="title">
						<view class="b-1 b-1-app"></view>
						<view class="t-1 t-1-app">武进区政府便民热线服务中心</view>
						<view class="b-1 b-2 b-1-app"></view>
					</view>
					<view class="title1">
						<view class="t-1 t-1-app">2021-09-11日报</view>
						<view class="b-1 isapp"></view>
					</view>
					<view class="first-t">
						<view class="f-t-1">
							区便民服务中心积极发挥12345政府便民热线的载体和平台作用，紧紧围绕党委 政府中心工作，立足服务群众、方便群众、推动机关作风转变，在办好民生诉求、深化
							诉接速办、提升服务质效上呈现了良好发展态势。现将有关运行情况汇报如下：
						</view>
						<view class="f-t-2 t-1-app">
							一、总体情况
						</view>
						<view class="f-t-3">
							2021年09月11日00:00至14：00・区12345热线共受理群众诉求14件，整体接通率0.00%。其中，投诉类11件，占78.57%，咨询类3件，占21.43%建议类0件,占0.00%，求助类0件，占。00%，表扬类0件，占0.00%，举报类0件，占0.00%。
						</view>

					</view>
					<view class="chart chart-pie">
						<!-- <view class="charts-box">
							<qiun-data-charts type="ring" :opts="{legend:{show:false},grid:{left: '10%',}}"
								:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
						</view> -->
						<view class="charts-box">
							<!-- 演示动态改变eopts -->
							<qiun-data-charts type="ring" :opts="{legend:{show:false},tooltip:{show:false}}" :eopts="ringOpts"
								:chartData="chartsDataPie2"  />
						</view>
						<view class="chart-pie-legend">
							<view class="data-type-content-list" v-for="item in ringOptsLegend0" :key="item.name">
								<view class="content-list-1">
									<!-- <image :src="item.url" mode="aspectFit"></image> -->
									<uni-icons type="circle" :color="item.color" size="10"></uni-icons>
								</view>
								<view class="content-list-2">
									<view class="content-list-2-1">{{item.name}}</view>
									<view class="content-list-2-2">{{item.value}}</view>
								</view>
							</view>
													
						</view>
					</view>
					<view class="uni-container">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th align="center">诉求类型</uni-th>
								<uni-th  align="center">总数</uni-th>
								<uni-th  align="center">数量</uni-th>
								<uni-th  align="center">环比</uni-th>
								<uni-th  align="center">数量</uni-th>
								<uni-th  align="center">环比</uni-th>
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
						<view class="f-t-2 t-1-app">
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
								<uni-th align="center">诉求类型</uni-th>
								<uni-th  align="center">总数</uni-th>
								<uni-th  align="center">数量</uni-th>
								<uni-th  align="center">环比</uni-th>
								<uni-th  align="center">数量</uni-th>
								<uni-th  align="center">环比</uni-th>
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
	import tableData from './tableData.js'
	import {
		dayall,
		dayform,
		dayjzsu,
	} from '@/utils/api.js';
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
				ringOpts: {},
				ringOptsLegend0:[{
					name:'国务院督办工单  99件',
					value:'15.63%',
					color:"#4585F5"
				},{
					name:'省工单  99件',
					value:'15.63%',
					color:"#6CD67F"
				},{
					name:'市工单  99件',
					value:'15.63%',
					color:"#FFE554"
				},{
					name:'涉企工单  99件',
					value:'15.63%',
					color:"#FF9054"
				},{
					name:'疫情单位  99件',
					value:'15.63%',
					color:"#9454FF"
				}]
			};
		},
		onReady() {
			this.getServerData()
		},
		onLoad(option) {
			try{
			console.log(option.title,option.type)
			if(option.type=='日报') {
				this.dayall(option.title)
				
			}
			
			}catch(e){
				//TODO handle the exception
			}
			// this.selectedIndexs = []
			// this.getData(1)
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
		mounted() {},
		methods: {
			dayall(title) {
				dayall(title).then(res=>{

				}).catch(error=>console.log(error));
				dayform(title).then(res=>{
					let {code,data} = res.data;
					console.log(data)
					if(code==0) {
						this.tableData = data
						
					}
				}).catch(error=>console.log(error));
				dayjzsu(title).then(res=>{

				}).catch(error=>console.log(error));
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
			getServerData() {
				let windowWidth = 600
				uni.getSystemInfo({
				      success: function (res) {
				        // _this.setWidth = res.windowWidth * 0.8
						console.log(res.windowWidth)
						windowWidth = res.windowWidth
				      }
				    })
				setTimeout(() => {
					this.chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA))
					// this.chartsDataPie2.series[0].radius = ['70%', '90%'];
					this.chartsDataPie2.series.legendHoverLink = false;
					this.ringOpts = {
						tooltip:{show:false},
						title:{
							text:"14件",
							left:"center",
							top:"center",
							textStyle:{
								color:"#395176",
								fontSize:windowWidth<500?16:20,
								align:"center"
							}
						},
						tooltip:{
							show:false
						},
						color: ['#E9A700', '#E95F5E', '#5E63FF', '#5EC4FF', '#EA7FE3', '#9B8EFF', '#6CDC2C',
							'#672099', '#F2984E', '#0263FF'
						],
						legend: {
							show: false
						},
					}
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
		display: flex;
		flex-wrap: nowrap;
		

		.charts-box {
			width: 20%;
			height: 100%;
			padding: rpx2multiple(35) 0;
			box-sizing: border-box;
		}
		.chart-pie-legend {
			width: 80%;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			padding: rpx2multiple(100);
		
			.data-type-content-list {
				width: calc(100% / 6);
				height: auto;
				// background: #4585F5;
				border-radius: rpx2multiple(30);
				display: flex;
				justify-content: flex-start;
				padding: rpx2multiple(30) rpx2multiple(39);
				color: #395176;
		
				.content-list-1 {
					// width: rpx2multiple(10);
					// height: rpx2multiple(10);
					// background-color: #E9A700;
					// margin-right: rpx2multiple(30);
					image {
						width: 100%; 
						height: 100%; 
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
	@media (max-width:500px) {
		.box-main-parent {
			padding:0;
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
			.t-1-app {
				font-size: 36rpx !important;
				padding:0 10rpx !important;
			}
			.b-1-app {
				width: 35rpx !important;
				    height: 4rpx !important;
			}
			.chart {
				height: auto;
				flex-direction: column;
			}
			.charts-box {
				width: 100% !important;
			}
			.chart-pie-legend {
				width: 100% !important;
				padding-left:0 !important;
				padding-right:0 !important;
			}
			.data-type-content-list {
				width: calc(100% / 3)!important;
			}
	
			
	
			
			
	
	
	
		}
</style>
<style>
	@import "../../static/style.css";
	
	
</style>
