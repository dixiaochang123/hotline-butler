<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="●热线管家●\nHotline housekeeper" @clickLeft="clickLeft"></uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" title="督办工单" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="bg nav"></view>
		<view class="bg bg1 nav"></view>
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
				<view class="box-style">
					<view class="box-style-head isapp">
						<view class="">待{{text}}工单详情</view>
					</view>
					<view class="uni-container isapp">
						<uni-table ref="table" :loading="loading" emptyText="暂无更多数据"
							@selection-change="selectionChange">
							<uni-tr>
								<uni-th width="20%" align="center">序号</uni-th>
								<uni-th width="800" align="center">工单标题</uni-th>
								<uni-th v-if="activetab=='已督办'" width="20%" align="center">处理人员</uni-th>
								<uni-th width="20%" align="center">紧急程度</uni-th>
								<uni-th width="20%" align="center">创建时间</uni-th>
								<uni-th width="20%" align="center">操作</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="'index-'+index">
								<uni-td align="center">{{ index+1 }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.content }}</view>
								</uni-td>
								<uni-td v-if="activetab=='已督办'" align="center">
									<view class="name">{{ item.createUserId }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.jjcd }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.createTime }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="uni-group">
										<button style="white-space: nowrap;" class="uni-button" size="mini" type="primary"
											@click="handleClickSupervise(item)">{{text}}</button>
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
								<uni-th width="100" align="center">序号</uni-th>
								<uni-th width="300" align="center">工单标题</uni-th>
								<uni-th width="100" v-if="activetab=='已督办'" align="center">处理人员</uni-th>
								<uni-th width="100" align="center">紧急程度</uni-th>
								<uni-th width="100" align="center">创建时间</uni-th>
								<uni-th width="100" align="center">操作</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="'index-'+index">
								<uni-td align="center">{{ index+1 }}</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.content }}</view>
								</uni-td>
								<uni-td v-if="activetab=='已督办'" align="center">
									<view class="name">{{ item.createUserId }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.jjcd }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="name">{{ item.createTime }}</view>
								</uni-td>
								<uni-td align="center">
									<view class="uni-group">
										<button style="white-space: nowrap;" class="uni-button" size="mini" type="primary"
											@click="handleClickSupervise1(item)">{{text}}</button>
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
		ddbgdList,
	} from '@/utils/api.js';
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				text:'督办',
				loading:false,
				sldata: '',
				isLandScape: true,
				active: '督办', //左侧tabs
				activetab: '待督办', //顶部tabs
				subname: '待督办', //顶部tabs
				headtabs: [{
					name: '待督办',
					subname: '待督办',
					type:1,
				}, {
					name: '已督办',
					subname: '已督办',
					type:2,
				}],
				tableData: [],
				date:''
			}
		},
		onReady() {
			//模拟从服务器获取数据
			this.getServerData()
		},
		onLoad(option) {
			console.log(option)
			let role = uni.getStorageSync('role')
			console.log('role',role)
			if(role==='区领导账号') {
				this.text = '督办'
			};
			if(role==='区中心账号') {
				this.text = '审核'
			};
			if(role==='部门账号') {
				this.text = '办理'
			}
			this.activetab = '待'+this.text;
			this.headtabs.map(item=>{
				item.name = '待'+this.text
				item.name = '待'+this.text
			})
			this.headtabs[0].name = '待'+this.text
			this.headtabs[0].subname = '待'+this.text
			this.headtabs[1].name = '已'+this.text
			this.headtabs[1].name = '已'+this.text
			
			this.date = option.date;
			let type = 1
			if(option.activetab=='已'+this.text) {
				type = 2
				this.activetab = '已'+this.text
			} else {
				type = 1
			}
			let params ={
				date:option.date,
				type
			}
			
			
			this.ddbgdList(params)

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
			
		},
		methods: {
			ddbgdList(params) {
				ddbgdList(params).then(res=>{
					let {
						code,
						data
					} = res.data;
					console.log(code,data)
					data.map(item=>{
						item['jjcd']
						if(item['jjcd']==1) {
							item['jjcd'] = '非常紧急'
						} else if(item['jjcd']==2) {
							item['jjcd'] = '紧急'
						} else {
							item['jjcd'] = '一般'
						}
					})
					this.tableData = data
					
				}).catch(error=>console.log(error))
			},
			handletabschange(item) {
				this.activetab = item.name;
				this.subname = item.subname;
				let params ={
					date:this.date,
					type:this.headtabs.find(key=>key.name==item.name).type
				}
				this.ddbgdList(params)
			
			},
			handleClickSupervise(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/supervise/supervisedetails?formId=${item.formId}&date=${this.date}`
				})
			
			},
			handleClickSupervise1(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/supervise/supervisedetails?formId=${item.formId}&date=${this.date}`
				})
			
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
		// background: url(../../static/image/1125/城市底纹.png) no-repeat left top;
		// background-size: 100% 500rpx;
		background-color: #F4F7F9;
		position: relative;
	}
	.bg {
		width: 100%;
		height: 425rpx;
		position: absolute;
		top: 0;
		z-index: 1;
		background: linear-gradient(0deg, #F4F7F9 0%, #2D72FF 100%);
	}
	.bg1 {
		width: 100%;
		height: 425rpx;
		position: absolute;
		top: 0;
		background: url(../../static/image/update/bg.png) no-repeat left top;
		background-size: 100% 90%;
		z-index: 2;
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
		// min-height: 100vh;
		// overflow-y: auto;
		padding: 0 40rpx;
		padding: 0 rpx2multiple(40);
	}

	// 顶部tabs
	.uni-tabs {
		width: 30%;
		height: 165rpx;
		height: rpx2multiple(165);
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
			color: #FFFFFF;
			text-align: center;
		}

		.uni-tabs-item-active {
			background: #FFFFFF;
			border-radius: rpx2multiple(33);
			color: #4B93F7;
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
	.box-style {
		max-height: 80vh;
		overflow-y: auto;
	}
	

	// app
	.app-nav {
		display: none;
	}

	@media (max-width:500px) {
		.content {
			background-color: #FFFFFF;
		}
		.box {
			border-top: solid 10px #F4F4F4;
			box-sizing: border-box;
		}
		/deep/ .uni-nav-bar-text {
			font-family: PingFang !important;
			font-weight: 900;
			background: linear-gradient(0deg, #000000 0%, #000000 100%);
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
			padding-left: 0;
			padding-right: 0;
			max-height: calc(80vh - 10px);
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

		
	}
</style>
