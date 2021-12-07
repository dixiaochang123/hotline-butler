<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="●热线管家●" @clickLeft="clickLeft"></uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="督办" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="bg nav"></view>
		<view class="bg bg1 nav"></view>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<view class="data-chart data-chart1">
					<view class="box-style datas" style="width: 50%;">
						<view class="box-style-head">
							<view class="">{{text}}数据</view>
							<view class="box-style-head-right uni-tabs-item-selet">
								<picker class="uni-tabs-item-active uni-tabs-item-active-picker" :range="years"
									@change="yearChange" mode="multiSelector">
									{{ years[0][yearsIndex1] }} - {{ years[1][yearsIndex2]  }}
								</picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="data-type-content-list">
							<view class="pmzd-font content-list-3">{{dbtotal.dbbsl+dbtotal.dbzsl+dbtotal.dbyjssl}}</view>
							<view class="content-list-2"></view>
							<view class="content-list-1">{{text}}总量(件)</view>
						</view>
						<view class="data-type-content-list-3">
							<view class="data-type-content-list-4" @click="gotosuperviselist">
								<image style="width: 100rpx; height: 100rpx; background-color: #eeeeee;"
									mode="aspectFit"
									src="/static/image/ddb.png"
									@error="imageError"></image>
								<view class="data-type-content-list-5">
									<view class="">{{dbtotal.dbbsl}} <text class="t-1"> 件</text></view>
									<view class="t-2" style="font-family: PingFang;">待{{text}}</view>
								</view>
							</view>
							<view class="data-type-content-list-4" @click="gotosuperviselist1">
								<image style="width: 100rpx; height: 100rpx; background-color: #eeeeee;"
									mode="aspectFit"
									src="/static/image/tdl.png"
									@error="imageError"></image>
								<view class="data-type-content-list-5">
									<view class="">{{dbtotal.dbzsl}} <text class="t-1"> 件</text></view>
									<view class="t-2" style="font-family: PingFang;">{{text}}中</view>
								</view>
							</view>
							<view class="data-type-content-list-4">
								<image style="width: 100rpx; height: 100rpx; background-color: #eeeeee;"
									mode="aspectFit"
									src="/static/image/qsl.png"
									@error="imageError"></image>
								<view class="data-type-content-list-5">
									<view class="">{{dbtotal.dbyjssl}} <text class="t-1"> 件</text></view>
									<view class="t-2" style="font-family: PingFang;">已{{text}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="box-style chats" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">督办工单问题集中点（二级归口）</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="line" :opts="{legend:{show:false},extra:{line:{type:'curve'}}}"
								:chartData="chartsDataLine2" />
						</view>
					</view>

				</view>
				<view class="data-chart">
					<view class="box-style datas" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">督办工单关联单位</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="column"
								:opts="columnOpts"
								:ontouch="true" :chartData="chartsDataColumn5" :loadingType="1"/>
						</view>
					</view>
					<view class="box-style chats" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">督办工单问题集中点（三级归口）</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="line" :opts="{legend:{show:false},extra:{line:{type:'curve'}}}"
								:chartData="chartsDataLine3" />
						</view>
					</view>

				</view>
				<view class="data-chart">
					<view class="box-style datas" style="width: 50%;">
						<view class="box-style-head">
							<view class="">问题工单总量</view>
							<view class="box-style-head-right uni-tabs-item-selet">
								<!-- <uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
									@nodeclick="onnodeclick">
								</uni-data-picker> -->
								<picker class="uni-tabs-item-active uni-tabs-item-active-picker" :range="years"
									@change="yearChange" mode="multiSelector">
									{{ years[0][yearsIndex1] }} - {{ years[1][yearsIndex2]  }}
								</picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="data-type-content-list">
							<view class="pmzd-font content-list-3">{{WTTOTAL}}</view>
							<view class="content-list-2"></view>
							<view class="content-list-1">问题工单总量(件)</view>
						</view>
						<view class="data-type-content-list-3">
							<view class="data-type-content-list-4">
								<image style="width: 100rpx; height: 100rpx; background-color: #eeeeee;"
									mode="aspectFit"
									src="/static/image/ddb.png"
									@error="imageError"></image>
								<view class="data-type-content-list-5">
									<view class="">{{TH}} <text class="t-1"> 件</text></view>
									<view class="t-2" style="font-family: PingFang;">退单率</view>
								</view>
							</view>
							<view class="data-type-content-list-4">
								<image style="width: 100rpx; height: 100rpx; background-color: #eeeeee;"
									mode="aspectFit"
									src="/static/image/tdl.png"
									@error="imageError"></image>
								<view class="data-type-content-list-5">
									<view class="">{{QSLV}} <text class="t-1"></text></view>
									<view class="t-2" style="font-family: PingFang;">签收率</view>
								</view>
							</view>
							<view class="data-type-content-list-4">
								<image style="width: 100rpx; height: 100rpx; background-color: #eeeeee;"
									mode="aspectFit"
									src="/static/image/qsl.png"
									@error="imageError"></image>
								<view class="data-type-content-list-5">
									<view class="">{{DC}} <text class="t-1"> 件</text></view>
									<view class="t-2" style="font-family: PingFang;">多次流转</view>
								</view>
							</view>

						</view>
					</view>
					<view class="datas-2" style="width: 50%;height:100%;">

						<view class="box-style chats chats-main" style="width: 50%;height: 100%;">
							<view class="box-style-head">
								<view class="">多次流转单同比</view>
							</view>
							<view class="" style="height: 80rpx;"></view>
							<view class="charts-box" style="height: 80%;">
								<qiun-data-charts type="arcbar"
									:opts="opts"
									:chartData="chartsDataArcbar1" />
							</view>
						</view>
						<view class="box-style chats" style="width: 50%;height: 100%;">
							<view class="box-style-head">
								<view class="">多次流转单环比</view>
							</view>
							<view class="" style="height: 80rpx;"></view>
							<view class="charts-box" style="height: 80%;">
								<qiun-data-charts type="arcbar"
									:opts="opts1"
									:chartData="chartsDataArcbar2" />
							</view>
						</view>
					</view>

				</view>
				<view class="box-style">
					<view class="box-style-head">
						<view class="">问题工单列表</view>
					</view>
					<view class="uni-container isapp">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th width="25%" align="center">序号</uni-th>
								<uni-th width="25%" align="center">单位</uni-th>
								<uni-th width="25%" align="center">办理单位</uni-th>
								<uni-th width="25%" align="center">操作</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="'index-'+index">
								<uni-td align="center">{{ index+1 }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="uni-group">
										<button style="white-space: nowrap;" class="uni-button" size="mini" type="primary"
											@click="handleClickSupervise(item)">督办/催办</button>
									</view>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view v-if="false" class="uni-pagination-box">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
								@change="change" />
						</view>
					</view>
					<view class="uni-container app-nav">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th width="25%" align="center">序号</uni-th>
								<uni-th width="25%" align="center">单位</uni-th>
								<uni-th width="25%" align="center">办理单位</uni-th>
								<uni-th width="25%" align="center">操作</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="'index-'+index">
								<uni-td align="center">{{ index+1 }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="uni-group">
										<button style="white-space: nowrap;" class="uni-button" size="mini" type="primary"
											@click="handleClickSupervise1(item)">督办/催办</button>
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
				<view class="data-chart">
					<view class="box-style chats" style="width: 100%;height: 100%;">
						<view class="box-style-head">
							<view class="">回访不满意工单</view>
						</view>
						<!-- <view class="" style="height: 80rpx;"></view> -->
						<view class="chart-pie">
							<view class="charts-box">
								<!-- 演示动态改变eopts -->
								<qiun-data-charts type="ring" :opts="ringOpts" :eopts="ringOpts"
									:chartData="chartsDataPie2" />
							</view>
							<view class="chart-pie-legend">
								<view class="data-type-content-list" v-for="item in detaildata" :key="item.OPTNAME">
									<view class="content-list-1">
										<!-- <image class="images" :src="item.url" mode="aspectFit"></image> -->
										<image class="images" src="/static/image/lkgl.png" mode="aspectFit"></image>
									</view>
									<view class="content-list-2">
										<view class="content-list-2-1">{{item.OPTNAME}}</view>
										<view class="content-list-2-2">{{item.rate}}%</view>
									</view>
								</view>

							</view>
						</view>
					</view>

				</view>
				<view class="data-chart">
					<view class="box-style datas" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">诉求量变化趋势</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="line" :opts="{legend:{show:false},extra:{line:{type:'curve'}}}"
								:chartData="chartsDataLine2" />
							
						</view>
					</view>
					<view class="box-style chats" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">主要涉及部门</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="column"
								:opts="columnOpts"
								:ontouch="true" :chartData="chartsDataColumn6" :loadingType="1" />
						</view>
					</view>

				</view>
				<view style="height: 100rpx;"></view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="box-style popup-box popup-box1">
					<view class="box-style-head">
						<view class="">督办/催办信息</view>
						<view @click="close" class="box-style-head-right">
							<uni-icons type="closeempty" size="30"></uni-icons>
						</view>
					</view>
					<textarea class="textarea" v-model="contentText" placeholder="输入字体" />
					<button class="btn" type="default" @click="sendinfo">发 送</button>
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
		overview,
		gldept,
		dbdc2jgk,
		dbdc3jgk,
		wtgd,
		dbdchfbmygd,
		lzdtbhb,
		sqlbhqs,
		zysjbm,
		addNetWorkOrder,
		ddbgdList,
		ddbgdType,
		wtgdzl
	} from '@/utils/api.js'
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				text:'督办',
				WTTOTAL:0,
				TH:0,
				DC:0,
				QSLV:0,
				message:'',
				BUSI_NUMBER:'',//工单编号
				isLandScape: true,
				active: '督查督办', //左侧tabs
				dbtotal: {
					DBZHONG: "",
					ENDTOTAL: "",
					RQ: "",
					TOTAL: "",
					dbbsl:0,
					dbzsl:0,
					dbyjssl:0,
				},
				array: ['中国', '美国', '巴西', '日本'],
				classes: '2011',
				years: [
					['2021', '2020'],
					["01", '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
				],
				yearsIndex1: 0,
				yearsIndex2: 11,
				date: '',
				headtabs: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '当月', '11月', '12月'],
				activetab: '当月',
				canvas: '',
				contentText: '',
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

				chartsDataArcbar1: {},
				chartsDataArcbar2: {},
				chartsDataLine2: {},
				chartsDataLine3: {},
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
				detaildata: [],
				lzdtbhbdata: {
					HBRATE: 0,
					TBRATE: 0,
				},
				opts: {
					title: {
						name:'0',
						color: '#2fc25b',
						fontSize: 35
					},
					subtitle: {
						name: ''
					},
					extra: {
						arcbar: {
							type: 'circle',
							startAngle: 1.5
						}
					}
				},
				opts1: {
					title: {
						name:'0',
						color: '#2fc25b',
						fontSize: 35
					},
					subtitle: {
						name: ''
					},
					extra: {
						arcbar: {
							type: 'circle',
							startAngle: 1.5
						}
					}
				},
				ringOpts: {
					title: {
						text: "诉求问题",
						left: "center",
						top: "center",
						textStyle: {
							color: "#395176",
							fontSize: 12,
							align: "center"
						}
					},
					color: ['#E9A700', '#E95F5E', '#5E63FF', '#5EC4FF', '#EA7FE3', '#9B8EFF', '#6CDC2C','#672099', '#F2984E', '#0263FF'],
					legend: {
						show: false
					},
					"type": "ring",
					"canvasId": "",
					"canvas2d": false,
					"background": "none",
					"animation": true,
					"timing": "easeOut",
					"duration": 1000,
					"color": ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
					"padding": [5,5,5,5],
					"rotate": false,
					"errorReload": false,
					"fontSize": 13,
					"fontColor": "#666666",
					"enableScroll": false,
					"touchMoveLimit": 60,
					"enableMarkLine": false,
					"dataLabel": false,
					"dataPointShape": false,
					"dataPointShapeType": "solid",
					"tapLegend": false,
					"legend": {
						"show": false,
						"position": "right",
						"float": "center",
						"padding": 5,
						"margin": 5,
						"backgroundColor": "rgba(0,0,0,0)",
						"borderColor": "rgba(0,0,0,0)",
						"borderWidth": 0,
						"fontSize": 13,
						"fontColor": "#666666",
						"lineHeight": 25,
						"hiddenColor": "#CECECE",
						"itemGap": 10
					},
					"title": {
					    "name": "诉求问题",
					    "fontSize": 15,
					    "color": "#666666",
					    "offsetX": 0,
					    "offsetY": 0
					},
					"subtitle": {
					    "name": "",
					    "fontSize": 25,
					    "color": "#7cb5ec",
					    "offsetX": 0,
					    "offsetY": 0
					},
					"extra": {
						"ring": {
							"ringWidth": 30,
							"centerColor": "#FFFFFF",
							"activeOpacity": 0.5,
							"activeRadius": 10,
							"offsetAngle": 0,
							"customRadius": 0,
							"labelWidth": 15,
							"border": true,
							"borderWidth": 3,
							"borderColor": "#FFFFFF",
							"linearType": "none"
						},
						"tooltip": {
							"showBox": true,
							"showArrow": true,
							"showCategory": false,
							"borderWidth": 0,
							"borderRadius": 0,
							"borderColor": "#000000",
							"borderOpacity": 0.7,
							"bgColor": "#000000",
							"bgOpacity": 0.7,
							"gridType": "solid",
							"dashLength": 4,
							"gridColor": "#CCCCCC",
							"fontColor": "#FFFFFF",
							"splitLine": true,
							"horizentalLine": false,
							"xAxisLabel": false,
							"yAxisLabel": false,
							"labelBgColor": "#FFFFFF",
							"labelBgOpacity": 0.7,
							"labelFontColor": "#666666"
						}
					}
				},
				columnOpts: {
					padding:[15,0,10,0],
					legend: {
						show: false
					},
					color: ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'],
					enableScroll:true,
					xAxis: {
						fontSize:10,
						rotateLabel:true,
						itemCount:5,
						disabled: false,
						axisLine: {
							show: false
						},
						axisLabel: {
							show: true,
							color: "#395176",
							margin: 20,
							fontSize: 16,
						},
					},
					yAxis: {
						disabled: false,
						disableGrid: false,
						splitNumber: 5,
						gridType: "dash",
						dashLength: 5,
						gridColor: "#CCCCCC",
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
					extra: {
						column: {
							width:20,
							seriesGap: 5,
							linearOpacity: 0.5,
							barBorderCircle: true,
							customColor: ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'],
						}
					}
				},
					
			}
		},
		onReady() {
			//模拟从服务器获取数据
			this.getServerData()
		},
		onLoad() {
			this.selectedIndexs = []
			// this.getData(1)
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
			let date = this.years[0][this.yearsIndex1] + "-" + this.years[1][this.yearsIndex2];
			this.date = date;
			console.log(date)
			this.overview(date)
			this.gldept(date)
			this.dbdc2jgk(date)
			this.dbdc3jgk(date)
			this.wtgd(date)
			this.dbdchfbmygd(date)
			this.lzdtbhb(date)
			this.sqlbhqs(date)
			this.zysjbm(date)
			this.zysjbm(date)
			// 待督办数量
			this.ddbgdType(date)
			this.wtgdzl(date)
		},
		methods: {
			wtgdzl(date) {
				wtgdzl(date).then(res => {
					let {
						code,
						data
					} = res.data;
					console.log(data)
					this.WTTOTAL = data[0].WTTOTAL;
					this.TH = data[0].TH;
					this.DC = data[0].DC;
					this.QSLV = data[0].QSLV;
				}).catch(error => console.log(error));
			},
			ddbgdType(date) {
				ddbgdType(date,1).then(res => {
					let {
						code,
						data
					} = res.data;
					this.dbtotal.dbbsl = data
				}).catch(error => console.log(error));
				ddbgdType(date,2).then(res => {
					let {
						code,
						data
					} = res.data;
					this.dbtotal.dbzsl = data
				}).catch(error => console.log(error));
				ddbgdType(date,3).then(res => {
					let {
						code,
						data
					} = res.data;
					this.dbtotal.dbyjssl = data
				}).catch(error => console.log(error))
			},
			gotosuperviselist() {
				uni.navigateTo({
					url: `/pages/supervise/superviselist?date=${this.date}` //跳转地址
				})
			},
			gotosuperviselist1() {
				uni.navigateTo({
					url: `/pages/supervise/superviselist?date=${this.date}&activetab=已督办` //跳转地址
				})
			},
			yearChange: function(e) {
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
				let date = this.years[0][this.yearsIndex1] + "-" + this.years[1][this.yearsIndex2];
				this.date = date;
				this.overview(date)
				this.gldept(date)
				this.dbdc2jgk(date)
				this.dbdc3jgk(date)
				this.wtgd(date)
				this.dbdchfbmygd(date)
				this.lzdtbhb(date)
				this.sqlbhqs(date)
				this.zysjbm(date)
				this.ddbgdType(date)
			},
			overview(date) {
				overview(date).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						this.dbtotal.TOTAL = data[0].TOTAL
					}
				}).catch(error => console.log(error))

			},
			gldept(date) {
				gldept(date).then(res => {
					let {
						code,
						data
					} = res.data;
					let chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataColumn5.categories = data.map(item => item.DEPT_NAME);
					chartsDataColumn5.series[0].data = data.map((item, index) => {
						var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
						return {
							name: item.DEPT_NAME,
							value: item.TOTAL,
							// itemStyle: {
							// 	color: colorList[index],
							// 	borderRadius: [15, 15, 0, 0]
							// }
						}
					})
					this.chartsDataColumn5 = chartsDataColumn5
					console.log(this.chartsDataColumn5)
					
					
				}).catch(error => console.log(error))
			},
			dbdc2jgk(date) {
				dbdc2jgk(date).then(res => {
					let {
						code,
						data
					} = res.data;
					let chartsDataLine2 = JSON.parse(JSON.stringify(demodata.Column))
					chartsDataLine2.categories = data.map(item => item.OPTNAME);
					chartsDataLine2.series[0].data = data.map((item, index) => {
						return {
							name: item.OPTNAME,
							value: item.TOTAL,
						}
					})
					this.chartsDataLine2 = chartsDataLine2
					
					
				}).catch(error => console.log(error))

			},
			dbdc3jgk(date) {
				dbdc3jgk(date).then(res => {
					let {
						code,
						data
					} = res.data;
					let chartsDataLine2 = JSON.parse(JSON.stringify(demodata.Column))
					chartsDataLine2.categories = data.map(item => item.OPTNAME);
					chartsDataLine2.series[0].data = data.map((item, index) => {
						return {
							name: item.OPTNAME,
							value: item.TOTAL,
						}
					})
					this.chartsDataLine3 = chartsDataLine2
				}).catch(error => console.log(error))

			},
			wtgd(date) {
				wtgd(date).then(res => {
					let {
						code,
						data
					} = res.data;
					this.tableData = data
				}).catch(error => console.log(error))

			},
			dbdchfbmygd(date) {
				dbdchfbmygd(date).then(res => {
					let {
						code,
						data
					} = res.data;
					let total = 0
					data.map(item=>{
						total+=parseFloat(item.TOTAL)
					})
					data.map(item=>{
						item['rate'] = (parseFloat(item.TOTAL)/total).toFixed(3)
						
					})
					this.detaildata = data;
					let chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA));
					chartsDataPie2.series[0].data = data.map(item=>{
						return {
							name:item.OPTNAME,
							value:parseFloat(item.TOTAL)
						}
					})
					
					this.chartsDataPie2 = chartsDataPie2
				}).catch(error => console.log(error))

			},
			lzdtbhb(date) {
				lzdtbhb(date).then(res => {
					let {
						code,
						data
					} = res.data;
					if (!!data[0]) {
						data[0].HBRATE = data[0].HBRATE.substring(0, data[0].HBRATE.length - 1)
						data[0].TBRATE = data[0].TBRATE.substring(0, data[0].TBRATE.length - 1)
						let chartsDataArcbar1 = JSON.parse(JSON.stringify(demodata.Arcbar1))
						let chartsDataArcbar2 = JSON.parse(JSON.stringify(demodata.Arcbar1))
						chartsDataArcbar1.series[0].data = data[0].TBRATE
						chartsDataArcbar2.series[0].data = data[0].HBRATE
						this.chartsDataArcbar1 = chartsDataArcbar1;
						this.chartsDataArcbar2 = chartsDataArcbar2;
						this.opts.title.name = data[0].TBRATE
						this.opts1.title.name = data[0].HBRATE
					}
					this.lzdtbhbdata = data[0];
				}).catch(error => console.log(error))

			},
			sqlbhqs(date) {
				sqlbhqs(date).then(res => {
					let {
						code,
						data
					} = res.data;
					console.log(data)
					
				}).catch(error => console.log(error))
			},
			zysjbm(date) {
				zysjbm(date).then(res => {
					let {
						code,
						data
					} = res.data;
					console.log(data)
					let chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataColumn5.categories = data.map(item => item.DEPT_NAME);
					chartsDataColumn5.series[0].data = data.map((item, index) => {
						var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
						return {
							name: item.DEPT_NAME,
							value: item.TOTAL,
							// itemStyle: {
							// 	color: colorList[index],
							// 	borderRadius: [15, 15, 0, 0]
							// }
						}
					})
					this.chartsDataColumn6 = chartsDataColumn5
					
				}).catch(error => console.log(error))
			},
			close() {
				this.$refs.popup.close();
			},
			sendinfo() {
				let params = {
					id:this.BUSI_NUMBER,
					context:this.contentText
				}
				addNetWorkOrder(params).then(res=>{
					let {
						code,
						data
					} = res.data;
					console.log(code,data,data.operMsg)
					if(data.success=="true") {
						this.$refs.popup.close();
						this.$refs.popup1.open('center');
					} else {
						this.message = data.operMsg
						this.$refs.popup.close();
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
			closeinfo() {
				this.$refs.popup1.close();
			},
			onnodeclick(e) {
				this.classes = e.value;
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
					// this.chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column))
					// this.chartsDataPie2 = JSON.parse(JSON.stringify(demodata.PieA))
					this.chartsDataArcbar1 = JSON.parse(JSON.stringify(demodata.Arcbar1))
					// this.chartsDataLine2 = JSON.parse(JSON.stringify(demodata.Line))
					// this.chartsDataPie2.series[0].radius = ['50%', '80%'];
					// this.ringOpts = {
					// 	title: {
					// 		text: "诉求问题",
					// 		left: "center",
					// 		top: "center",
					// 		textStyle: {
					// 			color: "#395176",
					// 			fontSize: windowWidth < 500 ? 12 : 16,
					// 			align: "center"
					// 		}
					// 	},
					// 	color: ['#E9A700', '#E95F5E', '#5E63FF', '#5EC4FF', '#EA7FE3', '#9B8EFF', '#6CDC2C',
					// 		'#672099', '#F2984E', '#0263FF'
					// 	],
					// 	legend: {
					// 		show: false
					// 	},
					// }
					console.log(this.chartsDataPie2)
				}, 1500);
			},
			handleClickSupervise(item) {
				console.log(item)
				this.$refs.popup.open('center');
				this.BUSI_NUMBER = item.BUSI_NUMBER

			},
			handleClickSupervise1(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/supervise/submit?BUSI_NUMBER='+item.BUSI_NUMBER //跳转地址
				})

			},
			clickLeft() {
				console.log('返回上一页')
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

	.data-chart {
		margin: rpx2multiple(40) 0;
		height: rpx2multiple(658);
		display: flex;
		justify-content: space-between;
		&.data-chart1 {
			margin-top: 0;
		}

		.datas {
			margin-right: rpx2multiple(40);

			.data-type-content-list {
				height: rpx2multiple(250);
				padding: rpx2multiple(50) rpx2multiple(30);
				background: url(~@/static/image/wtgdzl.png) no-repeat right center;
				background-size: contain;
				background-color: #4585F5;
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
					font-size: rpx2multiple(48);
					font-weight: 500;
					color: #1EA2FF;
					color: #FFFFFF;
				}

				.content-list-2 {
					width: rpx2multiple(33);
					height: rpx2multiple(4);
					background: #1EA2FF;
					border-radius: rpx2multiple(2);
				}

				.content-list-3 {
					font-size: rpx2multiple(70);
					color: #1EA2FF;
					color: #FFFFFF;
				}
			}

			.data-type-content-list-3 {
				display: flex;
				justify-content: flex-start;

				.data-type-content-list-4 {
					display: flex;
					justify-content: flex-start;
					width: 41%;
				}

				.data-type-content-list-5 {
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					font-size: rpx2multiple(46);
					font-family: PangMenZhengDao;
					font-weight: 400;
					color: #395176;
					padding-left: rpx2multiple(10);

					.t-1 {
						font-size: rpx2multiple(20);
						display: inline-block;
						padding-left: rpx2multiple(10);
					}

					.t-2 {
						font-size: rpx2multiple(24);
					}
				}

			}
		}

		.datas-2 {
			// margin-left: rpx2multiple(40);
			display: flex;
			justify-content: space-between;
		}

		.charts {
			margin-left: rpx2multiple(40);

			.charts-box {
				width: 100%;
				height: 100%;
				padding: rpx2multiple(55) 0;
			}
		}

		.chats-main {
			margin-right: rpx2multiple(40);
		}
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

	.chart-pie {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;

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
	}

	.uni-tabs-item-selet {
		width: rpx2multiple(260);
		border-radius: rpx2multiple(65);
		border: solid 1px #4585F5;
		padding: 10rpx;

		/deep/ .input-value-border {
			// border-radius: rpx2multiple(65);
			color: #000000;
		}
	}

	.uni-table-scroll {
		height: 800rpx;
		overflow-y: auto;
	}


	.uni-group {
		display: flex;
		align-items: center;
	}

	.app-nav {
		display: none;
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

		.chart-pie {
			// height: 470rpx;
			height: auto;
			flex-wrap: wrap;
			.charts-box {
				width: 100%;
			}
			.chart-pie-legend {
				width: 100%;
			}
		}

		.chart-pie .chart-pie-legend .data-type-content-list {
			padding: rpx2multiple(10) rpx2multiple(30);
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
			font-size: 80rpx;
			white-space: nowrap;
		}

		.popup-box {
			width: 350px !important;
		}

		.chart-pie .chart-pie-legend {
			padding: 0;
		}

		.chart-pie .chart-pie-legend .data-type-content-list {
			width: 50%;
		}








	}
</style>
