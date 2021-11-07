<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<!--  headtabs 日期-->
				<view class="uni-tabs">
					<view :class="[activetab==item ? 'uni-tabs-item uni-tabs-item-active' : '', 'uni-tabs-item']"
						v-for="(item,index) in headtabs" :key="index" @click="handletabschange(item)">
						{{item}}
					</view>
					<view class="uni-tabs-item uni-tabs-item-selet">
						<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
							@nodeclick="onnodeclick">
						</uni-data-picker>
					</view>
				</view>
				<view class="box-style">
									<view class="box-style-head">
										<view class="">区级部门</view>
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
				<view class="data-chart">
					<view class="box-style datas" style="width: 35%;">
						<view class="box-style-head">
							<view class="">区人社局得分详情</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="data-type-content-list" v-for="(item) in 3" :key="item">
							<view class="content-list-1">疫情防控 200件</view>
							<view class="content-list-2"></view>
							<view class="pmzd-font content-list-3">60.30%</view>
						</view>
					</view>
					<view class="box-style chats" style="width: 65%;height: 100%;">
						<view class="box-style-head">
							<view class="">区人社局当年综合评分月度变化趋势</view>
							<view class="box-style-head-right uni-tabs-item-selet">
								<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
									@nodeclick="onnodeclick">
								</uni-data-picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="column"
								:opts="{legend:{show:false},color:['#0073FA','#0073FA'],extra:{column:{seriesGap:5,linearOpacity:0.5,barBorderCircle:true,customColor:['#0073FA','#0073FA']}}}"
								:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" />
						</view>
					</view>

				</view>
				<view class="data-chart">
					<view class="box-style datas" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">区人社局当年三率月度变化趋势</view>
							<view class="box-style-head-right uni-tabs-item-selet">
								<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
									@nodeclick="onnodeclick">
								</uni-data-picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
					<!-- 		<qiun-data-charts type="column"
								:opts="{legend:{show:false},color:['#FAC858','#EE6666'],extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true,customColor:['#FA7D8D','#EB88E2']}}}"
								:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" /> -->
								<qiun-data-charts type="area" :opts="{legend:{show:false},extra:{area:{type:'curve',addLine:true,gradient:true}}}" :chartData="chartsDataArea1"/>
						</view>
					</view>
					<view class="box-style chats" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">区人社局当年月度考核排名分布情况</view>
							<view class="box-style-head-right uni-tabs-item-selet">
								<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
									@nodeclick="onnodeclick">
								</uni-data-picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<!-- <qiun-data-charts type="column"
								:opts="{legend:{show:false},color:['#FAC858','#EE6666'],extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true,customColor:['#FA7D8D','#EB88E2']}}}"
								:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" /> -->
								<qiun-data-charts type="line" :opts="{legend:{show:false},extra:{line:{type:'curve'}}}" :chartData="chartsDataLine2"/>
						</view>
					</view>

				</view>
				<view style="height: 100rpx;"></view>
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
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				isLandScape: true,
				active: '考核数据', //左侧tabs
				array: ['中国', '美国', '巴西', '日本'],
				years: [{
					text: '2019',
					value: '2019'
				}, {
					text: '2020',
					value: '2020'
				}, {
					text: '2021',
					value: '2021'
				}],
				classes: '2021',
				headtabs: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '当月', '11月', '12月'],
				activetab: '当月',
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
				
				chartsDataArea1:{},
				chartsDataLine2:{},
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
			onnodeclick(e) {
				this.classes = e.value;
			},
			getServerData() {
				setTimeout(() => {
					//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
					//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
					this.chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column))
					this.chartsDataArea1=JSON.parse(JSON.stringify(demodata.Line))
					this.chartsDataLine2=JSON.parse(JSON.stringify(demodata.Line))
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
			handleClickDatareport() {
				uni.navigateTo({
					url: '/pages/acceptance/datareport' //跳转地址
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

	// 顶部tabs
	.uni-tabs {
		width: 100%;
		height: 145rpx;
		height: rpx2multiple(145);
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;


		.uni-tabs-item {
			width: rpx2multiple(100);
			height: rpx2multiple(65);
			font-size: rpx2multiple(24);
			line-height: rpx2multiple(65);
			font-family: PingFang SC;
			font-weight: 800;
			color: #B8C0CB;
			text-align: center;
		}

		.uni-tabs-item-selet {
			width: rpx2multiple(160);
			/deep/ .input-value-border {
				border-radius: rpx2multiple(65);
				color: #4585F5;
			}
		}

		.uni-tabs-item-active {
			background: #4585F5;
			border-radius: rpx2multiple(33);
			color: #FFFFFF;
		}
	}

	.uni-tabs-item-selet {
		width: rpx2multiple(160);
		/deep/ .input-value-border {
			border-radius: rpx2multiple(65);
			color: #4585F5;
		}
	}
	.data-chart {
		margin: rpx2multiple(40) 0;
		height: rpx2multiple(728);
		display: flex;
		justify-content: space-between;

		.datas {
			margin-right: rpx2multiple(40);

			.data-type-content-list {
				padding: rpx2multiple(30);
				background: #DAEFFF;
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
</style>
