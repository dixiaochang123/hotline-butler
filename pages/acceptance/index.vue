<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="受理情况" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
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
							<view class="box-style-head-right" @click="handleClickDatareport">数据分析报告</view>
						</view>
						<view class="data-report" @click="handleClickDatareport">
							<view class="pmzd-font data-report-value">{{sldata}}</view>
							<view class="data-report-border"></view>
							<view class="data-report-text">受理总量(件)</view>
							<view class="data-report-text-right">
								查看数据 <br /> 分析报告
							</view>
						</view>
						<view class="data-type-title">
							<text class="text1">按内容类别</text>
							<text class="text2">按诉求类别</text>
						</view>
						<view class="data-type">
							<view class="data-type-content">
								<view class="data-type-content-list" v-for="(item,index) in contextdata" :key="index">
									<view class="content-list-1">{{item.OPTNAME}} {{item.TOTAL}}件</view>
									<view class="content-list-2"></view>
									<view class="pmzd-font content-list-3">{{item.percentage}}%</view>
								</view>

							</view>
							<view class="data-type-appeal">
								<view class="data-type-content-list" v-for="(item,index) in typedata" :key="index">
									<view class="content-list-1">{{item.PDKEY}} {{item.TOTAL}}件</view>
									<view class="content-list-2 content-list-2-2"></view>
									<view class="pmzd-font content-list-3">{{item.percentage}}%</view>
								</view>

							</view>

						</view>

					</view>
					<!-- right -->
					<view class="acceptance-data-show-right isapp">
						<view class="acceptance-data-show-right1 box-style">
							<view class="box-style-head">
								<view class="">当日热点诉求Top5 (二级归口)</view>
							</view>
							<view class="charts-box">
								<qiun-data-charts type="column" :eopts="columnOpts"
									:opts="{extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true}}}"
									:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true"
									:echartsH5="true" />
							</view>
						</view>
						<view class="acceptance-data-show-right2 box-style">
							<view class="box-style-head">
								<view class="">当日热点诉求Top5 (三级归口)</view>
							</view>
							<view class="charts-box">
								<qiun-data-charts type="column" :eopts="columnOpts" :chartData="chartsDataColumn6"
									:loadingType="1" :echartsApp="true" :echartsH5="true" />
							</view>
						</view>
						<view class="acceptance-data-show-right3 box-style ">
							<view class="box-style-head">
								<view class="">当日***单位办理数据</view>
							</view>
							<view class="chart-pie">
								<view class="charts-box">
									<!-- 演示动态改变eopts -->
									<qiun-data-charts type="ring" :opts="{legend:{show:false}}" :eopts="ringOpts"
										:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
								</view>
								<view class="chart-pie-legend">
									<view class="data-type-content-list" v-for="item in ringOptsLegend0"
										:key="item.name">
										<view class="content-list-1">
											<!-- <image :src="item.url" mode="aspectFit"></image> -->
											<uni-icons style="float: right;" type="circle" :color="item.color"
												size="10"></uni-icons>
										</view>
										<view class="content-list-2">
											<view class="content-list-2-1" style="">{{item.name}}
											</view>
											<view class="content-list-2-2">{{item.value}}</view>
										</view>
									</view>

								</view>
							</view>
						</view>

					</view>

				</view>
				<view class="acceptance-data-show-right-app">
					<view class="acceptance-data-show-right1 box-style">
						<view class="box-style-head">
							<view class="">当日热点诉求Top5 (二级归口)</view>
						</view>
						<view class="charts-box">
							<qiun-data-charts type="column" :eopts="columnOpts"
								:opts="{extra:{column:{linearType:'custom',seriesGap:5,linearOpacity:0.5,barBorderCircle:true}}}"
								:chartData="chartsDataColumn5" :loadingType="1" :echartsApp="true" :echartsH5="true" />
						</view>
					</view>
					<view class="acceptance-data-show-right2 box-style">
						<view class="box-style-head">
							<view class="">当日热点诉求Top5 (三级归口)</view>
						</view>
						<view class="charts-box">
							<qiun-data-charts type="column" :eopts="columnOpts" :chartData="chartsDataColumn5"
								:loadingType="1" :echartsApp="true" :echartsH5="true" />
						</view>
					</view>
					<view class="acceptance-data-show-right3 box-style ">
						<view class="box-style-head">
							<view class="">当日***单位办理数据</view>
						</view>
						<view class="chart-pie">
							<view class="charts-box">
								<!-- 演示动态改变eopts -->
								<qiun-data-charts type="ring" :opts="{legend:{show:false}}" :eopts="ringOpts"
									:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
							</view>
							<view class="chart-pie-legend">
								<view class="data-type-content-list" v-for="item in ringOptsLegend0" :key="item.name">
									<view class="content-list-1">
										<!-- <image :src="item.url" mode="aspectFit"></image> -->
										<uni-icons style="float: right;" type="circle" :color="item.color" size="10">
										</uni-icons>
									</view>
									<view class="content-list-2">
										<view class="content-list-2-1" style="">{{item.name}}</view>
										<view class="content-list-2-2">{{item.value}}</view>
									</view>
								</view>

							</view>
						</view>
					</view>

				</view>
				<view class="word-order box-style">
					<view class="box-style-head">
						<view class="">回访不满意工单</view>
					</view>

					<view class="uni-container">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据">
							<uni-tr>
								<uni-th width="1%" align="center">序号</uni-th>
								<uni-th align="center">单位</uni-th>
								<uni-th align="center">交办量</uni-th>
								<uni-th align="center">一次不满工单量</uni-th>
								<uni-th width="1%" align="center">办结不满工单量</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="index">
								<uni-td align="center">{{ index+1 }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.TOTAL }}</view>
								</uni-td>
								<uni-td align="center">{{ item.YCBMY }}</uni-td>
								<uni-td align="center">{{ item.BMY}}</uni-td>
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
							<uni-collapse-item title="标题文字" :border="true" thumb="/static/image/edit.svg">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="标题文字" :border="false" thumb="/static/image/edit.svg">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="标题文字" :border="false" thumb="/static/image/edit.svg">
								<view class="content">
									<text class="text">折叠内容主体，可自定义内容及样式</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="标题文字" :border="false" thumb="/static/image/edit.svg">
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
					<view class="chart-pie">
						<view class="charts-box">
							<!-- 演示动态改变eopts -->
							<qiun-data-charts type="ring" :opts="{legend:{show:false}}" :eopts="ringOpts"
								:chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
						</view>
						<view class="chart-pie-legend chart-pie-legend-app">
							<view class="data-type-content-list data-type-content-list-app"
								v-for="item in ringOptsLegend" :key="item.name">
								<view class="content-list-1">
									<image class="images" :src="item.url" mode="aspectFit"></image>
								</view>
								<view class="content-list-2">
									<view class="content-list-2-1">{{item.name}}</view>
									<view class="content-list-2-2">{{item.value}}</view>
								</view>
							</view>

						</view>
					</view>


				</view>
				<view style="height: 150rpx;"></view>
			</view>

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
	import demodata from '@/mockdata/demodata.json';
	import mapdata from '@/mockdata/mapdata.json'
	import tableData from './tableData.js'
	import Tabs from '@/components/Tabs/index.vue';
	import {
		hfbmygd,
		twojgk,
		threejgk,
		slsj,
		context,
		type,
		detail
	} from '@/utils/api.js';
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				sldata:'',
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
				chartsDataColumn6: {},
				chartsDataPie2: {},
				ringOpts: {},
				columnOpts: {
					grid: {
						left: 60,
					},
					xAxis: {
						axisLabel: {
							show: true,
							color: "#395176",
							margin: 20,
							fontSize: 16,
						},
					},
					yAxis: {
						axisLine: {
							show: false
						},
						axisLabel: {
							show: true,
							color: "#395176",
							margin: 20,
							fontSize: 16,
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "#E1E1E1",
								type: "dashed"
							}
						}
					},
					legend: {
						show: false
					},
					series: [{
						itemStyle: {
							borderRadius: [15, 15, 0, 0]
						}
					}]
				},
				ringOptsLegend: [{
					name: '路况管理',
					value: '15.63%',
					url: "/static/image/lkgl.png"
				}, {
					name: '社会保障',
					value: '15.63%',
					url: "/static/image/shbz.png"
				}, {
					name: '政务热线',
					value: '15.63%',
					url: "/static/image/zwrx.png"
				}, {
					name: '供水服务',
					value: '15.63%',
					url: "/static/image/gsfw.png"
				}, {
					name: '车辆管理',
					value: '15.63%',
					url: "/static/image/clgl.png"
				}, {
					name: '公共卫生',
					value: '15.63%',
					url: "/static/image/ggws.png"
				}, {
					name: '物业管理',
					value: '15.63%',
					url: "/static/image/wygl.png"
				}, {
					name: '园林管理',
					value: '15.63%',
					url: "/static/image/ylgl.png"
				}, {
					name: '垂管行业',
					value: '15.63%',
					url: "/static/image/cghy.png"
				}, {
					name: '计划生育',
					value: '15.63%',
					url: "/static/image/jhsy.png"
				}],
				ringOptsLegend0: [{
					name: '国务院督办工单  99件',
					value: '15.63%',
					color: "#4585F5"
				}, {
					name: '省工单  99件',
					value: '15.63%',
					color: "#6CD67F"
				}, {
					name: '市工单  99件',
					value: '15.63%',
					color: "#FFE554"
				}, {
					name: '涉企工单  99件',
					value: '15.63%',
					color: "#FF9054"
				}, {
					name: '疫情单位  99件',
					value: '15.63%',
					color: "#9454FF"
				}],
				contextdata:[],
				typedata:[]
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
		computed: {
			...mapGetters(["token"])
		},
		mounted() {
			console.log(22, this.token)
			this.hfbmygd('day')
			this.twojgk('day')
			this.threejgk('day')
			this.slsj()
			this.context('day')
			this.type('day')
			// this.detail()
		},
		methods: {
			hfbmygd(params) {
				hfbmygd(params).then(res => {
					let {code,data} =res.data;
					if(code==0) {
						this.tableData = data;
						this.loading = false;
					}

				}).catch(error => console.log(error))
			},
			twojgk(params) {
				twojgk(params).then(res => {
					let {code,data} =res.data;
					let chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column));
					console.log(chartsDataColumn5)
					chartsDataColumn5.categories = data.map(item=>item.OPTNAME);
					chartsDataColumn5.series[0].data = data.map((item, index) => {
						var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
						return {
							name: item.OPTNAME,
							value: item.TOTAL,
							itemStyle: {
								color: colorList[index],
								borderRadius: [15, 15, 0, 0]
							}
						}
					})
					this.chartsDataColumn5 = chartsDataColumn5

				}).catch(error => console.log(error))
			},
			threejgk(params) {
				threejgk(params).then(res => {
					let {code,data} =res.data;
					let chartsDataColumn6 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataColumn6.categories = data.map(item=>item.OPTNAME);
					chartsDataColumn6.series[0].data = data.map((item, index) => {
						var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
						return {
							name: item.OPTNAME,
							value: item.TOTAL,
							itemStyle: {
								color: colorList[index],
								borderRadius: [15, 15, 0, 0]
							}
						}
					})
					this.chartsDataColumn6 = chartsDataColumn6

				}).catch(error => console.log(error))
			},
			slsj() {
				slsj().then(res => {
					let {code,data} = res.data;
					if(this.activetab=='当日诉求'){
						this.sldata = data[0].TODAY
					} else if(this.activetab=='近一周诉求') {
						this.sldata = data[0].WEEK
					} else {
						this.sldata = data[0].MON
					}
				}).catch(error => console.log(error))
			},
			context(params) {
				context(params).then(res => {
					let {code,data} =res.data;
					let total = 0;
					data.map(item=>{
						total+=parseInt(item.TOTAL)
					})
					data.map(item=>{
						item['percentage'] = (parseInt(item.TOTAL)/total).toFixed(2)
					})
					this.contextdata = data
					console.log(this.contextdata,total )

				}).catch(error => console.log(error))
			},
			type(params) {
				type(params).then(res => {
					let {code,data} =res.data;
					let total = 0;
					data.map(item=>{
						total+=parseInt(item.TOTAL)
					})
					data.map(item=>{
						item['percentage'] = (parseInt(item.TOTAL)/total).toFixed(2)
					})
					this.typedata = data
					console.log(this.typedata,total )

				}).catch(error => console.log(error))
			},
			detail() {
				detail({

				}).then(res => {
					console.log(res)

				}).catch(error => console.log(error))
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
					//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
					//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
					// color:['#0073FA','#6CD67F','#FFE554','#FF9054','#9454FF']
					// let chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column));
					// chartsDataColumn5.series[0].data = chartsDataColumn5.series[0].data.map((item, index) => {
					// 	var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
					// 	return {
					// 		name: '111',
					// 		value: item,
					// 		itemStyle: {
					// 			color: colorList[index],
					// 			borderRadius: [15, 15, 0, 0]
					// 		}
					// 	}

					// })
					// this.chartsDataColumn5 = chartsDataColumn5
					this.chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA))
					this.chartsDataPie2.series[0].radius = ['50%', '80%'];
					this.ringOpts = {
						title: {
							text: "诉求问题",
							left: "center",
							top: "center",
							textStyle: {
								color: "#395176",
								fontSize: windowWidth < 500 ? 12 : 16,
								align: "center"
							}
						},
						color: ['#E9A700', '#E95F5E', '#5E63FF', '#5EC4FF', '#EA7FE3', '#9B8EFF', '#6CDC2C',
							'#672099', '#F2984E', '#0263FF'
						],
						legend: {
							show: false
						},
					}
					console.log(this.chartsDataPie2, this.chartsDataColumn5)
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
				console.log(item)
				if(item.name=='当日诉求'){
					this.hfbmygd('day')
					this.twojgk('day')
					this.threejgk('day')
					this.context('day')
				} else if(item.name=='近一周诉求') {
					this.hfbmygd('week')
					this.twojgk('week')
					this.threejgk('week')
					this.context('week')
				} else {
					this.hfbmygd('mon')
					this.twojgk('mon')
					this.threejgk('mon')
					this.context('mon')
				}
				this.slsj()

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
			height: calc(100% - 20rpx);
			margin-right: rpx2multiple(20);

			.data-report {
				height: rpx2multiple(250);
				border-radius: 20rpx;
				margin-top: rpx2multiple(40);
				padding: rpx2multiple(58) rpx2multiple(50);
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				background: url(/static/image/slsjbg.png) no-repeat right center;
				background-size: contain;
				background-color: #4585F5;
				position: relative;
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

			.data-report-text-right {
				position: absolute;
				right: rpx2multiple(85);
				top: 50%;
				margin-top: -rpx2multiple(20);
				font-family: DOUYU;
				font-size: rpx2multiple(20);
				font-weight: normal;
				color: #4585F5;
				z-index: 1;
				line-height: rpx2multiple(27);
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
				color: #1EA2FF;
			}

			// 诉求
			.data-type-appeal {
				height: 100%;
				width: 50%;
				margin-left: rpx2multiple(20);
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				color: #50D4E3;
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

					// color: #1EA2FF;
					image {
						width: 100%;
						height: 100%;
					}
				}

				.content-list-2 {
					width: rpx2multiple(33);
					height: rpx2multiple(4);
					background: #1EA2FF;
					border-radius: rpx2multiple(2);
				}

				.content-list-2-2 {
					width: rpx2multiple(33);
					height: rpx2multiple(4);
					background: #50D4E3;
					border-radius: rpx2multiple(2);
				}

				.content-list-3 {
					font-size: rpx2multiple(50);
					// color: #1EA2FF;
				}
			}
		}

		// width  58.2  60
		.acceptance-data-show-right {
			width: 60%;
			height: calc(100% - 120rpx);
			height: rpx2multiple(1600);
			margin-left: rpx2multiple(20);
			display: flex;
			justify-content: space-between;
			flex-direction: column;

			>view {
				// height: 33%;
				height: calc(100% / 3);
			}

			.acceptance-data-show-right1 {
				// margin-bottom: rpx2multiple(40);
			}

			.acceptance-data-show-right2 {
				margin: rpx2multiple(40) 0;
			}

			.acceptance-data-show-right3 {
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
					flex-wrap: wrap-reverse;
					padding: rpx2multiple(60) 0;

					.data-type-content-list {
						width: calc(100% / 3);
						height: auto;
						// background: #4585F5;
						border-radius: rpx2multiple(30);
						display: flex;
						justify-content: flex-start;
						padding: rpx2multiple(30) rpx2multiple(10);
						color: #395176;

						.content-list-1 {
							width: rpx2multiple(10);
							height: rpx2multiple(10);

							// background-color: #E9A700;
							// margin-right: rpx2multiple(30);
							image,
							.images {
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
							padding-left: rpx2multiple(8);

							.content-list-2-2 {
								font-size: rpx2multiple(36);
							}
						}

					}
				}
			}

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

			.uni-table-tr {
				height: rpx2multiple(100);
			}
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

	}

	.chart-pie {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

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

	.acceptance-data-show-right-app {
		display: none;
	}

	.uni-group {
		display: flex;
		align-items: center;
	}

	/deep/ .uni-collapse-item__title.uni-collapse-item-border {
		border: none;
	}

	// app
	.app-nav {
		display: none;
	}

	@media (max-width:500px) {
		/deep/ .uni-nav-bar-text {
			font-family: PingFang !important;
			font-weight:900;
			background: linear-gradient(
			0deg, #000000 0%, #000000 100%);
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

		.acceptance-data-show {
			display: block;
			// height: auto !important;
		}

		.acceptance-data-show-left,
		.acceptance-data-show-right {
			width: 100% !important;
		}

		.acceptance-data-show-right {
			margin-left: 0 !important;
		}

		.acceptance-data-show-right-app {
			width: 100%;
			height: calc(100% - 120rpx);
			height: rpx2multiple(1700);
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			margin-bottom: rpx2multiple(100);

			>view {
				// height: 33%;
				height: calc(100% / 3);
			}

			.acceptance-data-show-right1 {
				// margin-bottom: rpx2multiple(40);
			}

			.acceptance-data-show-right2 {
				margin: rpx2multiple(40) 0;
			}

			.acceptance-data-show-right3 {
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
					flex-wrap: wrap-reverse;
					padding: rpx2multiple(60) 0;

					.data-type-content-list {
						width: calc(100% / 3);
						height: auto;
						// background: #4585F5;
						border-radius: rpx2multiple(30);
						display: flex;
						justify-content: flex-start;
						padding: rpx2multiple(30) rpx2multiple(10);
						color: #395176;

						.content-list-1 {
							width: rpx2multiple(10);
							height: rpx2multiple(10);

							// background-color: #E9A700;
							// margin-right: rpx2multiple(30);
							image,
							.images {
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
							padding-left: rpx2multiple(8);

							.content-list-2-2 {
								font-size: rpx2multiple(36);
							}
						}

					}
				}
			}

			.charts-box {
				width: 100%;
				height: 100%;
				padding: rpx2multiple(35) 0;
			}
		}

		.order-details-pie[data-v-3c4f2293] {
			height: 357px;
			min-height: 357px !important;
		}

		.chart-pie-legend-app {
			height: 80%;
			padding: 0 !important;

			.data-type-content-list {
				padding: rpx2multiple(8);
			}
		}

		.data-type-content-list-app {
			width: 50% !important;
		}

		.data-report-text-right {
			position: absolute !important;
			right: rpx2multiple(80) !important;
		}
	}
</style>
