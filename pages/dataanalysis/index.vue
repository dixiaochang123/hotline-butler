<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="●热线管家●\nHotline housekeeper" @clickLeft="clickLeft"></uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="数据分析" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="bg nav"></view>
		<view class="bg bg1 nav"></view>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<!--  headtabs 日期-->
				<view class="uni-tabs">
					<!-- <view class=" uni-tabs-item-selet app-nav">
						<picker class="uni-tabs-item-active uni-tabs-item-active-picker" :range="years"
							@change="yearChange" mode="multiSelector">
							{{ years[0][yearsIndex1] }} - {{ years[1][yearsIndex2]  }}
						</picker>
					</view> -->
					<view class=" uni-tabs-item-selet app-nav">
						<picker class="uni-tabs-item-active uni-tabs-item-active-picker" :range="years"
							@change="yearChange" mode="multiSelector">
							{{ years[0][yearsIndex1] }} - {{ years[1][yearsIndex2]  }}
						</picker>
						<uni-easyinput class="search-input" suffixIcon="search" v-model="searchvalue"
							placeholder="请输入关键字" @iconClick="handlesearch"></uni-easyinput>
					</view>
					<view style="visibility: hidden;" class="uni-tabs-item-parent">
						<view :class="[activetab==item ? 'uni-tabs-item uni-tabs-item-active' : '', 'uni-tabs-item']"
							v-for="(item,index) in headtabs" :key="index" @click="handletabschange(item)">
							{{item}}
						</view>

					</view>
					<view class=" uni-tabs-item-selet nav">
						<!-- <uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
							@nodeclick="onnodeclick">
						</uni-data-picker> -->
						<picker class="uni-tabs-item-active" :range="years" @change="yearChange" mode="multiSelector">
							{{ years[0][yearsIndex1] }} - {{ years[1][yearsIndex2]  }}
						</picker>
						<uni-easyinput class="search-input" suffixIcon="search" v-model="searchvalue"
							placeholder="请输入关键字" @iconClick="handlesearch"></uni-easyinput>
					</view>
				</view>
				<view class="data-chart">
					<view class="box-style datas" style="width: 100%;" v-for="(item,index) in report" :key="'info'+index">
						<view class="data-type-content-list">
							<view class="content-list-1">
								<image class="images" src="/static/image/bg.png" mode="aspectFit"></image>
							</view>
							<view class="content-list-2">
								<view class="">{{item.titlenew}}</view>
								<view class="">{{item.edit}}</view>
							</view>
						</view>
						<view class="data-type-appeal"><text><text class="bor" style="color: #29CCB6;">●</text>
								报告类型：{{item.edit}}</text></view>
						<view class="data-type-appeal"><text><text class="bor"
									style="color: #FF9054;">●</text>报告状态：已生成</text></view>
						<view class="data-type-appeal">
							<text><text class="bor" style="color: #9454FF;">●</text>创建时间：{{item.createDate}}</text>
							<view class="btn" @click="handleClickDatareport(item)">查看报告</view>
						</view>
					</view>
				</view>

				<view style="height: 80rpx;"></view>
			</view>

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
		reportcase
	} from '@/utils/api.js'
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				isLandScape: true,
				active: '数据分析', //左侧tabs
				array: ['中国', '美国', '巴西', '日本'],
				years: [
					['2021年'],
					['日报', '周报', '月报', '季报', '年报', '所有'],
				],
				params: ['d', 'w', 'm', 'q', 'y', null],
				yearsIndex1: 0,
				yearsIndex2: 0,
				report:[],


				headtabs: ['12345报告', '网络报告', '综合报告'],
				activetab: '12345报告',
				searchvalue: '',
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
			let _this = this;
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
			this.reportcase(this.params[0])
		},
		methods: {
			yearChange: function(e) {
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
				this.reportcase(this.params[this.yearsIndex2])
			},
			handlesearch() {
				console.log(this.searchvalue)
			},
			reportcase(type) {
				reportcase(type).then(res => {
					let {
						code,
						data
					} = res.data;
					if(!!data) {
						data.map(item=>{
							item['titlenew'] = item.title.substring(0,item.title.length-2)
							item['edit'] = item.title.substring(item.title.length-2)
						})
						this.report = data;
					console.log(data)
					}
				}).catch(error => console.log(error))
			},
			getServerData() {
				setTimeout(() => {
					//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
					//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
					this.chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column))
					this.chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA))
					console.log(this.chartsDataPie2)
				}, 1500);
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
			handleClickDatareport(item) {
				uni.navigateTo({
					url: '/pages/acceptance/datareport?title='+item.title+'&type='+item.edit//跳转地址
				})
			},
			handletabschange(item) {
				this.activetab = item;

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
		@return ($px * 1)+rpx;
	}

	.content {
		height: 100vh;
		overflow: hidden;
		background-color: #F4F7F9;
		position: relative;
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
		min-height: 100vh;
		overflow-y: auto;
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

	// 顶部tabs
	.uni-tabs {
		width: 100%;
		height: 145rpx;
		height: rpx2multiple(160);
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.uni-tabs-item-parent {
			height: 100%;
			width: 30%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

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

		.uni-tabs-item-selet {
			width: 35%;
			height: rpx2multiple(65);
			line-height: rpx2multiple(65);
			display: flex;
			justify-content: flex-end;
			align-items: center;

		}

		.uni-tabs-item-active {

			padding: 0 rpx2multiple(20);
		}

		.search-input {
			margin-left: rpx2multiple(20);

			// padding:0 rpx2multiple(40);
			/deep/ .uni-input-input {
				padding: 0 rpx2multiple(20);
			}

		}

		/deep/ .is-input-border {
			border-radius: rpx2multiple(65);
		}

		/deep/ .uni-data-tree {
			width: rpx2multiple(200);
		}

		/deep/ .uni-easyinput {
			// width: rpx2multiple(170);
		}

		/deep/ .uni-easyinput__content {
			// width: rpx2multiple(370);
		}

		.uni-tabs-item-active {
			background: none;
			border: solid 1px;
			border-radius: rpx2multiple(33);
			color: #4585F5;
		}
	}

	.data-chart {
		margin: rpx2multiple(40) 0;
		// height: rpx2multiple(518);
		display: grid;
		grid-template-columns: calc(50% - 60rpx) 50%;
		grid-template-rows: rpx2multiple(390) rpx2multiple(518);
		grid-row-gap: rpx2multiple(40);
		grid-column-gap: rpx2multiple(40);

		.datas {
			display: flex;
			justify-content: space-between;
			flex-direction: column;

			.data-type-content-list {
				// width: 809px;
				height: rpx2multiple(140);
				background: #4585F5;
				border-radius: rpx2multiple(20);
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: rpx2multiple(30) rpx2multiple(39);

				.content-list-1 {
					width: rpx2multiple(70);
					height: rpx2multiple(88);

					// background-color: #FFFFFF;
					.images {
						width: rpx2multiple(70);
						height: rpx2multiple(88);
					}
				}

				.content-list-2 {
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					font-family: PangMenZhengDao;
					color: #FFFFFF;
					font-size: rpx2multiple(40);
					padding-left: rpx2multiple(20);
				}

			}

			.data-type-appeal {
				font-size: rpx2multiple(24);
				font-family: PingFang;
				font-weight: bold;
				color: #395176;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bor {
					font-size: rpx2multiple(48);
					vertical-align: sub;
					padding-right: rpx2multiple(10);
				}

				.btn {
					width: rpx2multiple(220);
					height: rpx2multiple(70);
					line-height: rpx2multiple(70);
					text-align: center;
					background: #DAEFFF;
					border-radius: rpx2multiple(18);
					font-size: rpx2multiple(30);
					font-family: PingFang;
					font-weight: bold;
					color: #1EA2FF;
				}
			}
		}

		.charts {
			margin-left: rpx2multiple(40);

			.charts-box {
				width: 100%;
				height: 100%;
				padding: rpx2multiple(55) 0;
			}
		}
	}

	.uni-group {
		display: flex;
		align-items: center;
	}

	.app-nav {
		display: none !important;
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

		.uni-tabs-item-active-picker {
			min-width: 250rpx;
			font-size: 16rpx;
			position: absolute;
			top: 0;
			z-index: 1;
			color: #4585F5 !important;
			background: none !important;

			&::after {
				content: "|";
				position: absolute;
				right: 0;
				top: 0;

			}
		}

		/deep/ .uni-easyinput__content-input {
			padding-left: 300rpx !important;
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
			position: relative;
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

		.uni-tabs {
			display: block;
			height: auto;

			.uni-tabs-item-parent {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
			}

			.search-input {
				margin-left: 0;
				margin-top: 20rpx;
			}

			.uni-tabs-item-selet {
				width: 100%;
			}
		}

		.data-chart .datas .data-type-content-list {
			display: flex;
		}








	}
</style>
