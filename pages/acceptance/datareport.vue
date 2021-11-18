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
						<view class="t-1 t-1-app">{{TITLE}}</view>
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
							{{totaldatas.CREATE_DATE}}・区12345热线共受理群众诉求{{GDTOTAL}}件，整体接通率{{JTRATE}}。其中，投诉类{{totaldatas.TS}}件，占{{totaldatas.TSRATE}}，咨询类{{totaldatas.ZX}}件，占{{totaldatas.ZXRATE}},建议类{{totaldatas.JY}}件,占{{totaldatas.JYRATE}}，求助类{{totaldatas.QZ}}件，占{{totaldatas.QZRATE}}，表扬类{{totaldatas.BY}}件，占{{totaldatas.BYRATE}}，举报类{{totaldatas.JB}}件，占{{totaldatas.JBRATE}}。
						</view>

					</view>
					<view class="chart chart-pie">
						<!-- <view class="charts-box">
							<qiun-data-charts type="ring" :opts="{legend:{show:false},grid:{left: '10%',}}"
								:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
						</view> -->
						<view class="charts-box">
							<!-- 演示动态改变eopts -->
							<qiun-data-charts type="ring" :opts="{legend:{show:false},tooltip:{show:false}}"
								:eopts="ringOpts" :chartData="chartsDataPie2" />
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
								<uni-th align="center">总数</uni-th>
								<uni-th align="center">数量</uni-th>
								<uni-th align="center">环比</uni-th>
								<uni-th align="center">数量</uni-th>
								<uni-th align="center">环比</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="'info'+index">
								<uni-td align="center">{{ item.type }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.total }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.lasttotal }}</view>
								</uni-td>
								<uni-td align="center">{{ item.rate }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.lasttotal }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.rate }}</view>
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
							<view class="jzsqlist">
								市民通过热线反映诉求.主要诉求集中以下几个方面：
							</view>
							<view class="jzsqlist" v-for="(item,index) in tableData1" :key="'info'+index">
								{{index+1}}.{{item.OPTNAME}}({{item.TOTAL}}件)，昨日受理{{item.LASTTOTAL}}件，环比下降{{item.RATETOTAL}}.集中反映区域有：{{item.DIQU}}
							</view>
						</view>
					</view>
					<view class="uni-container">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th align="center">诉求类型</uni-th>
								<uni-th align="center">总数</uni-th>
								<uni-th align="center">数量</uni-th>
								<uni-th align="center">环比</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData1" :key="'info'+index">
								<!-- DIQU: "武进区湖塘镇,武进区嘉泽镇,武进区礼嘉镇,武进区洛阳镇,武进区南夏墅街道,武进区牛塘镇,武进区前黄镇,武进区西湖街道,武进区雪堰镇,武进区湟里镇"
								LASTTOTAL: "111.0"
								OPTNAME: "住房保障"
								RATETOTAL: "-18.02%"
								TITLE: "2021-11-08至2021-11-14周报"
								TOTAL: "91.0" -->
								<uni-td align="center">{{ item.OPTNAME }}</uni-td>
								<uni-td align="center">{{ item.TOTAL }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.LASTTOTAL }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.RATETOTAL }}</view>
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

		weekall,
		weekform,
		weekjzsu,

		monall,
		monform,
		monjzsu,

		quaall,
		quaform,
		quajzsu,

		yearall,
		yearform,
		yearjzsu,
	} from '@/utils/api.js';
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				isLandScape: true,
				active: '受理情况', //左侧tabs
				TITLE: '',
				GDTOTAL: '',
				JTRATE: '',
				chartsDataPie2: {},
				searchVal: '',
				tableData1: [],
				// DIQU: "武进区湖塘镇,武进区嘉泽镇,武进区礼嘉镇,武进区洛阳镇,武进区南夏墅街道,武进区牛塘镇,武进区前黄镇,武进区西湖街道,武进区雪堰镇,武进区湟里镇"
				// LASTTOTAL: "111.0"
				// OPTNAME: "住房保障"
				// RATETOTAL: "-18.02%"
				// TITLE: "2021-11-08至2021-11-14周报"
				// TOTAL: "91.0"
				tableData: [{
					type: '投诉',
					total: '0',
					lasttotal: '0',
					rate: '0',
				}, {
					type: '咨询',
					total: '0',
					lasttotal: '0',
					rate: '0',
				}, {
					type: '建议',
					total: '0',
					lasttotal: '0',
					rate: '0',
				}, {
					type: '求助',
					total: '0',
					lasttotal: '0',
					rate: '0',
				}, {
					type: '表扬',
					total: '0',
					lasttotal: '0',
					rate: '0',
				}, {
					type: '举报',
					total: '0',
					lasttotal: '0',
					rate: '0',
				}],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				ringOpts: {},
				totaldatas: {},
				ringOptsLegend0: [{
					name: '投诉',
					value: '0%',
					color: "#4585F5"
				}, {
					name: '咨询',
					value: '0%',
					color: "#6CD67F"
				}, {
					name: '建议',
					value: '0%',
					color: "#FFE554"
				}, {
					name: '求助',
					value: '0%',
					color: "#FF9054"
				}, {
					name: '表扬',
					value: '0%',
					color: "#9454FF"
				}, {
					name: '举报',
					value: '0%',
					color: "#9454FF"
				}],
			};
		},
		onReady() {
			// this.getServerData()
		},
		onLoad(option) {
			try {
				console.log(option.title, option.type)
				if (option.type == '日报') {
					this.dayall(option.title)
				}
				if (option.type == '周报') {
					this.weekall(option.title)
				}
				if (option.type == '月报') {
					this.monall(option.title)
				}
				if (option.type == '季报') {
					this.quaall(option.title)
				}
				if (option.type == '年报') {
					this.yearall(option.title)
				}

			} catch (e) {
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
				dayall(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						this.getotalfn(data)
					}

				}).catch(error => console.log(error));
				dayform(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {

							this.getotaltablefn(data)

						}

					}
				}).catch(error => console.log(error));
				dayjzsu(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.tableData1 = data;
						}
					}
				}).catch(error => console.log(error));
			},
			weekall(title) {
				weekall(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						this.getotalfn(data)
					}

				}).catch(error => console.log(error));
				weekform(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {

							this.getotaltablefn(data)

						}

					}
				}).catch(error => console.log(error));
				weekjzsu(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.tableData1 = data;
							console.log(this.tableData1)
						}
					}
				}).catch(error => console.log(error));
			},
			monall(title) {
				monall(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						this.getotalfn(data)
					}

				}).catch(error => console.log(error));
				monform(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {

							this.getotaltablefn(data)

						}

					}
				}).catch(error => console.log(error));
				monjzsu(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.tableData1 = data;
							console.log(this.tableData1)
						}
					}
				}).catch(error => console.log(error));
			},
			quaall(title) {
				quaall(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						this.getotalfn(data)
					}

				}).catch(error => console.log(error));
				quaform(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.getotaltablefn(data)

						}

					}
				}).catch(error => console.log(error));
				quajzsu(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.tableData1 = data;
							console.log(this.tableData1)
						}
					}
				}).catch(error => console.log(error));
			},
			yearall(title) {
				yearall(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						this.getotalfn(data)
					}

				}).catch(error => console.log(error));
				yearform(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.getotaltablefn(data)

						}

					}
				}).catch(error => console.log(error));
				yearjzsu(title).then(res => {
					let {
						code,
						data
					} = res.data;
					if (code == 0) {
						if (!!data[0]) {
							this.tableData1 = data;
						}
					}
				}).catch(error => console.log(error));
			},
			getotalfn(data) {
				this.TITLE = data[0].TITLE;
				this.GDTOTAL = data[0].GDTOTAL;
				this.JTRATE = data[0].JTRATE;
				this.totaldatas = data[0];

				this.ringOptsLegend0[0].name = '投诉 ' + data[0].TS + '件';
				this.ringOptsLegend0[0].value = data[0].TSRATE;

				this.ringOptsLegend0[1].name = '咨询 ' + data[0].ZX + '件';
				this.ringOptsLegend0[1].value = data[0].ZXRATE;

				this.ringOptsLegend0[2].name = '建议 ' + data[0].JY + '件';
				this.ringOptsLegend0[2].value = data[0].JYRATE;

				this.ringOptsLegend0[3].name = '求助 ' + data[0].QZ + '件';
				this.ringOptsLegend0[3].value = data[0].QZRATE;

				this.ringOptsLegend0[4].name = '表扬 ' + data[0].BYS + '件';
				this.ringOptsLegend0[4].value = data[0].BYSRATE;

				this.ringOptsLegend0[5].name = '举报 ' + data[0].JB + '件';
				this.ringOptsLegend0[5].value = data[0].JBRATE;
			},
			getotaltablefn(data) {
				this.tableData[0].total = data[0].TS
				this.tableData[0].lasttotal = data[0].LASTTS
				this.tableData[0].rate = data[0].RATETS

				this.tableData[1].total = data[0].ZX
				this.tableData[1].lasttotal = data[0].LASTZX
				this.tableData[1].rate = data[0].RATEZX

				this.tableData[2].total = data[0].JY
				this.tableData[2].lasttotal = data[0].LASTJY
				this.tableData[2].rate = data[0].RATEJY

				this.tableData[3].total = data[0].QZ
				this.tableData[3].lasttotal = data[0].LASTQZ
				this.tableData[3].rate = data[0].RATEQZ

				this.tableData[4].total = data[0].BYS
				this.tableData[4].lasttotal = data[0].LASTBYS
				this.tableData[4].rate = data[0].RATEBYS

				this.tableData[5].total = data[0].JB
				this.tableData[5].lasttotal = data[0].LASTJB
				this.tableData[5].rate = data[0].RATEJB
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
					success: function(res) {
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
						tooltip: {
							show: false
						},
						title: {
							text: "14件",
							left: "center",
							top: "center",
							textStyle: {
								color: "#395176",
								fontSize: windowWidth < 500 ? 16 : 20,
								align: "center"
							}
						},
						tooltip: {
							show: false
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

	.jzsqlist {
		line-height: 48rpx;
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
			padding: 0;
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
			padding: 0 10rpx !important;
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
			padding-left: 0 !important;
			padding-right: 0 !important;
		}

		.data-type-content-list {
			width: calc(100% / 3) !important;
		}








	}
</style>
<style>
	@import "../../static/style.css";
</style>
