<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="考核数据" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<!--  headtabs 日期-->
				<view class="uni-tabs">
					<view :class="[activetab==item ? 'uni-tabs-item uni-tabs-item-active' : '', 'uni-tabs-item isapp']"
						v-for="(item,index) in headtabs" :key="'index-'+index" @click="handletabschange(item,index)">
						{{item}}
					</view>
					<view class="uni-tabs-item uni-tabs-item-selet isapp">
						<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes"
							@nodeclick="onnodeclick">
						</uni-data-picker>
					</view>
					<view class="uni-tabs-item uni-tabs-item-selet app-nav">
						<!-- <uni-data-picker placeholder="请选择" :localdata="yearsapp" v-model="classesapp"
							@nodeclick="onnodeclick">
						</uni-data-picker> -->
						<picker class="uni-tabs-item-active" :range="yearsapp" @change="yearChange" mode="multiSelector">
							{{  yearsapp[0][yearsIndex1] }} - {{ yearsapp[1][yearsIndex2]  }}
						</picker>
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
								<uni-th width="25%" align="center">序号</uni-th>
								<uni-th width="25%" align="center">单位</uni-th>
								<uni-th width="25%" align="center">综合得分</uni-th>
								<uni-th width="25%" align="center">排名升降</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="'index-'+index">
								<uni-td align="center">
									<view class="name">{{ index+1 }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">{{ item.MARK }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.SJ==0?'/':item.SJ }} <text
											style="visibility: hidden;">↑</text><text style="color: red;"
											v-if="item.SJ>0">↑</text><text v-if="item.SJ<0"
											style="color: #4585F5;">↓</text></view>
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
						<view class="isapp" style="height: 80rpx;"></view>
						<view class="app-nav" style="height: 40rpx;"></view>
						<view class="data-type-content-list isapp" v-for="(item,index) in scoredata" :key="'index-'+index">
							<view class="content-list-1">响应率</view>
							<view class="content-list-2"></view>
							<view class="pmzd-font content-list-3">{{item.XYRATE}}% I {{item.XYMARK}}分</view>
						</view>
						<view class="data-type-content-list app-nav" :style="{float:item==1?'right':'none'}"
							v-for="(item,index) in scoredata" :key="'index-'+index">
							<view class="content-list-1">响应率</view>
							<view class="content-list-2"></view>
							<view class="pmzd-font content-list-3">{{item.XYRATE}}% I {{item.XYMARK}}分</view>
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
								<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes1"
									@nodeclick="onnodeclick1">
								</uni-data-picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="area"
								:opts="{legend:{show:false},extra:{area:{type:'curve',addLine:true,gradient:true}}}"
								:chartData="chartsDataArea1" />
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
							<qiun-data-charts type="line" :opts="{legend:{show:false},extra:{line:{type:'curve'}}}"
								:chartData="chartsDataLine2" />
						</view>
					</view>

				</view>
				<view class="box-stdex">
					<view class="box-style-head">
						<view class="">镇街道</view>
					</view>
					<view class="uni-container">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th width="25%" align="center">序号</uni-th>
								<uni-th width="25%" align="center">单位</uni-th>
								<uni-th width="25%" align="center">综合得分</uni-th>
								<uni-th width="25%" align="center">排名升降</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData1" :key="'info2-'+index">
								<uni-td align="center">
									<view class="name">{{ index+1 }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.DEPT_NAME }}</view>
								</uni-td>
								<uni-td align="center">{{ item.MARK }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.SJ==0?'/':item.SJ }} <text
											style="visibility: hidden;">↑</text><text style="color: red;"
											v-if="item.SJ>0">↑</text><text v-if="item.SJ<0"
											style="color: #4585F5;">↓</text></view>
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
							<view class="">西湖街道得分详情</view>
						</view>
						<view class="isapp" style="height: 80rpx;"></view>
						<view class="app-nav" style="height: 40rpx;"></view>
						<view class="data-type-content-list isapp" v-for="(item,index) in zjdscoredata" :key="'index-'+index">
							<view class="content-list-1">响应率</view>
							<view class="content-list-2"></view>
							<view class="pmzd-font content-list-3">{{item.XYRATE}}% I {{item.XYMARK}}分</view>
						</view>
						<view class="data-type-content-list app-nav" :style="{float:item==1?'right':'none'}"
							v-for="(item,index) in zjdscoredata" :key="'index-'+index">
							<view class="content-list-1">响应率</view>
							<view class="content-list-2"></view>
							<view class="pmzd-font content-list-3">{{item.XYRATE}}% I {{item.XYMARK}}分</view>
						</view>
					</view>
					<view class="box-style chats" style="width: 65%;height: 100%;">
						<view class="box-style-head">
							<view class="">西湖街道当年综合评分月度变化趋势</view>
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
								:chartData="chartsDataColumn6" :loadingType="1" :echartsApp="true" />
						</view>
					</view>
				
				</view>
				<view class="data-chart">
					<view class="box-style datas" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">西湖街道当年三率月度变化趋势</view>
							<view class="box-style-head-right uni-tabs-item-selet">
								<uni-data-picker placeholder="请选择" :localdata="years" v-model="classes1"
									@nodeclick="onnodeclick1">
								</uni-data-picker>
							</view>
						</view>
						<view class="" style="height: 80rpx;"></view>
						<view class="charts-box" style="height: 80%;">
							<qiun-data-charts type="area"
								:opts="{legend:{show:false},extra:{area:{type:'curve',addLine:true,gradient:true}}}"
								:chartData="chartsDataArea2" />
						</view>
					</view>
					<view class="box-style chats" style="width: 50%;height: 100%;">
						<view class="box-style-head">
							<view class="">西湖街道当年月度考核排名分布情况</view>
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
							<qiun-data-charts type="line" :opts="{legend:{show:false},extra:{line:{type:'curve'}}}"
								:chartData="chartsDataLine3" />
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
		qjbm,
		dnsltrend,
		score,
		dnzhpftrend,
		dnydkhtrend,
		zjd,
		zjddnsltrend,
		zjdscore,
		zjddnzhpftrend,
		zjddnydkhtrend1
	} from '@/utils/api.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
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
					text: '2020',
					value: '2020'
				}, {
					text: '2021',
					value: '2021'
				}],
				yearsapp:[
					["请选择年", '2020','2021'],
					["请选择月", '01', '02', '03', '04', '05','06','07','08','09','10','11','12']
				],
				yearsIndex1: 0,
				yearsIndex2: 0,
				classesapp: '',
				classes: '2021',
				classes1: '2021',
				headtabs: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '当月', '12月'],
				headtabs1: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				activetab: '当月',
				canvas: '',

				searchVal: '',
				tableData: [],
				tableData1: [],
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

				chartsDataArea1: {},
				chartsDataArea2: {},
				chartsDataLine2: {},
				chartsDataLine3: {},
				dnsltrenddata: [],
				scoredata:[],
				zjdscoredata:[],
				dnzhpftrenddata:[],
				zjddnzhpftrenddata:[],
				dnydkhtrenddata:[],
				zjddnydkhtrenddata:[],
				zjddnsltrenddata:[]
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
			let index = this.headtabs.indexOf(this.activetab);
			let date = this.classes + '-' + this.headtabs1[index]
			this.qjbm(date)
			this.score(date)
			this.dnzhpftrend('2021')
			this.dnsltrend('2021')
			this.dnydkhtrend('2021')
			
			this.zjd(date)
			this.zjdscore(date)
			this.zjddnsltrend('2021')
			this.zjddnzhpftrend('2021')
			this.zjddnydkhtrend1('2021')
		},
		methods: {
			yearChange(e){
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
				console.log(this.yearsIndex1)
				console.log(this.yearsIndex2)
			},
			qjbm(date) {
				qjbm(date).then(res => {
					let {
						code,
						data
					} = res.data
					if (code == 0) {
						this.tableData = data
					}
				}).catch(error => console.log(error))
			},
			zjd(date) {
				zjd(date).then(res => {
					let {
						code,
						data
					} = res.data
					if (code == 0) {
						this.tableData1 = data
					}
				}).catch(error => console.log(error))
			},
			dnsltrend(date) {
				dnsltrend(date).then(res => {
					let {
						code,
						data
					} = res.data
					this.dnsltrenddata = this.sort_pro(data)[0]
					let chartsDataArea1 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataArea1.categories = this.dnsltrenddata.map(item => item.RQ);
					chartsDataArea1.series[0].data = this.dnsltrenddata.map((item, index) => {
						return {
							name: item.RQ,
							value: item.XYRATE,
						}
					})
					this.chartsDataArea1 = chartsDataArea1
					console.log( this.dnsltrenddata)
				}).catch(error => console.log(error));
			},
			zjddnsltrend(date) {
				zjddnsltrend(date).then(res => {
					let {
						code,
						data
					} = res.data
					let zjddnsltrenddata = this.sort_pro(data)[0]
					let chartsDataArea2 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataArea2.categories = zjddnsltrenddata.map(item => item.RQ);
					chartsDataArea2.series[0].data = zjddnsltrenddata.map((item, index) => {
						return {
							name: item.RQ,
							value: item.XYRATE,
						}
					})
					this.chartsDataArea2 = chartsDataArea2;
				}).catch(error => console.log(error))
				
			},
			dnydkhtrend(date) {
				dnydkhtrend(date).then(res => {
					let {
						code,
						data
					} = res.data
					this.dnydkhtrenddata = this.sort_pro(data)[0]
					// let chartsDataArea1 = JSON.parse(JSON.stringify(demodata.Column));
					let chartsDataLine2 = JSON.parse(JSON.stringify(demodata.Column))
					chartsDataLine2.categories = this.dnydkhtrenddata.map(item => item.RQ);
					chartsDataLine2.series[0].data = this.dnydkhtrenddata.map((item, index) => {
						return {
							name: item.RQ,
							value: item.RN,
						}
					})
					this.chartsDataLine2 = chartsDataLine2
					console.log( this.dnydkhtrenddata)
				}).catch(error => console.log(error))
			},
			zjddnydkhtrend1(date) {
				zjddnydkhtrend1(date).then(res => {
					let {
						code,
						data
					} = res.data
					this.zjddnydkhtrenddata = this.sort_pro(data)[0]
					// let chartsDataArea1 = JSON.parse(JSON.stringify(demodata.Column));
					let chartsDataLine3 = JSON.parse(JSON.stringify(demodata.Column))
					chartsDataLine3.categories = this.zjddnydkhtrenddata.map(item => item.RQ);
					chartsDataLine3.series[0].data = this.zjddnydkhtrenddata.map((item, index) => {
						return {
							name: item.RQ,
							value: item.RN,
						}
					})
					this.chartsDataLine3 = chartsDataLine3
					console.log( this.zjddnydkhtrenddata)
				}).catch(error => console.log(error))
			},
			dnzhpftrend(date) {
				dnzhpftrend(date).then(res => {
					let {
						code,
						data
					} = res.data
					// console.log(data)
					this.dnzhpftrenddata = this.sort_pro(data)[0]
					let chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataColumn5.categories = this.dnzhpftrenddata.map(item => item.RQ);
					chartsDataColumn5.series[0].data = this.dnzhpftrenddata.map((item, index) => {
						var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
						return {
							name: item.RQ,
							value: item.RN,
							itemStyle: {
								color: colorList[index],
								borderRadius: [15, 15, 0, 0]
							}
						}
					})
					this.chartsDataColumn5 = chartsDataColumn5
				}).catch(error => console.log(error))
			},
			zjddnzhpftrend(date) {
				zjddnzhpftrend(date).then(res => {
					let {
						code,
						data
					} = res.data
					console.log(3333,data)
					this.zjddnzhpftrenddata = this.sort_pro(data)[0];
					let chartsDataColumn6 = JSON.parse(JSON.stringify(demodata.Column));
					chartsDataColumn6.categories = this.zjddnzhpftrenddata.map(item => item.RQ);
					chartsDataColumn6.series[0].data = this.zjddnzhpftrenddata.map((item, index) => {
						var colorList = ['#0073FA', '#6CD67F', '#FFE554', '#FF9054', '#9454FF'];
						return {
							name: item.RQ,
							value: item.RN,
							itemStyle: {
								color: colorList[index],
								borderRadius: [15, 15, 0, 0]
							}
						}
					})
					this.chartsDataColumn6 = chartsDataColumn6
				}).catch(error => console.log(error))
			},
			score(date) {
				score(date).then(res => {
					let {
						code,
						data
					} = res.data
					this.scoredata = this.sort_pro(data)[0].slice(0,3)
				}).catch(error => console.log(error));
			},
			zjdscore(date) {
				
			zjdscore(date).then(res => {
				let {
					code,
					data
				} = res.data
				this.zjdscoredata = this.sort_pro(data)[0].slice(0,3)
			}).catch(error => console.log(error))
			},
			sort_pro(arr) {
				const c = []
				const d = {}
				arr.forEach(item => {
					if (d[item.DEPT_NAME] === undefined) {
						d[item.DEPT_NAME] = c.length
						c.push([item])
					} else {
						c[d[item.DEPT_NAME]].push(item)
					}
				})
				return c;
			},
			onnodeclick(e) {
				this.classes = e.value;
				let index = this.headtabs.indexOf(this.activetab);
				let date = this.classes + '-' + this.headtabs1[index];
				this.qjbm(date)
			},
			// 区人社局当年三率月度变化趋势
			onnodeclick1(e) {
				this.classes1 = e.value;
				this.dnsltrend(this.classes1)
			},
			getServerData() {
				setTimeout(() => {
					//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
					//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
					// this.chartsDataColumn5 = JSON.parse(JSON.stringify(demodata.Column))
					// this.chartsDataArea1 = JSON.parse(JSON.stringify(demodata.Line))

					// this.chartsDataLine2 = JSON.parse(JSON.stringify(demodata.Line))
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
			handletabschange(item, index) {
				this.activetab = item;
				let date = this.classes + '-' + this.headtabs1[index];
				this.qjbm(date)

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
		height: auto;
		max-height: rpx2multiple(1000);
		overflow-y: auto;

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
	.app-nav {
		display: none !important;
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

		.data-chart .datas .data-type-content-list {
			width: 48% !important;
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









	}
</style>
