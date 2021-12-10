<template>
	<view class="content">
		<uni-nav-bar class="nav" left-icon="back" title="●武进热线管家●" @clickLeft="clickLeft">
		</uni-nav-bar>
		<uni-nav-bar class="app-nav" left-icon="back" :title="text+'工单'" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="bg nav"></view>
		<view class="bg bg1 nav"></view>
		<view class="box">
			<!-- 左侧tabs -->
			<Tabs class="isapp" :active="active" />
			<!-- 右侧内容区 -->
			<view class="box-main">
				<view class="box-style">
					<view class="box-style-head">
						<view v-if="type==1" class="">待{{text}}工单详情</view>
						<view v-if="type==2" class="">已{{text}}工单详情</view>
					</view>
					<view class="uni-container">
						<uni-list>
							<uni-list-item title="工单标题" :rightText="detail.title"></uni-list-item>
							<uni-list-item title="计划完成时间" :rightText="detail.jiHauWanChengShiJian"></uni-list-item>
							<uni-list-item class="isapp" title="诉求目的" :rightText="detail.suQiuMuDi"></uni-list-item>
							<uni-list-item class="app-nav" title="诉求目的" :note="detail.suQiuMuDi"></uni-list-item>
							<uni-list-item title="内容描述" :note="detail.neiRong"></uni-list-item>
						</uni-list>
						<view class="box-style-head">
							<view class="">第一次流转</view>
						</view>
						<uni-list v-for="(item,index) in detail.processList" :key="'info'+index">
							<view v-if="!!item.i" class="box-style-head">
								<view class="">第{{indexs[item.i]}}次流转</view>
							</view>
							<uni-list-item class="lzbm" title="流转部门" :rightText="item.deptName"></uni-list-item>
							<uni-list-item title="派发时间" :rightText="item.paiFaShiJian"></uni-list-item>
							<!-- <uni-list-item title="处理意见" :note="item.chuLiYiJian"></uni-list-item> -->
							<uni-list-item title="处理意见" :rightText="item.chuLiShiJian"></uni-list-item>
							<view class="clyj">{{item.chuLiYiJian}}</view>
						</uni-list>
						<view>
							<view class="box-style-head">
								<view class="">中心信息</view>
							</view>
							<uni-list-item title="中心建议" :rightText="CENTER_ADVICE_TIME"></uni-list-item>
							<view v-if="type==2 && text=='督办' || text=='办理'" class="clyj">{{CENTER_ADVICE}}</view>
							<view v-if="text=='审核' && type==1" class="textareabox">
								<textarea maxlength="200" placeholder="请输入您的意见" v-model="CENTER_ADVICE" auto-height />
							</view>
						</view>
						<view>
							<view v-if="text!='审核'" class="box-style-head">
								<view class="">办理信息</view>
							</view>
							<uni-list-item v-if="text!='审核'" title="签批意见" :rightText="LEAD_ADVICE_TIME"></uni-list-item>
							<view v-if="text=='办理' || type==2" class="clyj">{{contentText}}</view>
							<view v-if="type==1 && text=='督办'" class="textareabox" >
								<textarea maxlength="200" placeholder="请输入您的意见" v-model="contentText" auto-height />
							</view>
							<uni-list-item v-if="text!='审核'" title="办理领导"></uni-list-item>
							<view class="tjld" v-if="text=='审核'">
								<view class="">提交领导</view>
								<view class="">
									<uni-data-checkbox v-model="value2" :localdata="range2" @change="change2">
									</uni-data-checkbox>
								</view>
							</view>
							<view v-if="value2==1" class="ld">
								<uni-data-checkbox multiple v-model="value" :localdata="range" @change="change">
								</uni-data-checkbox>
								<uni-list-item class="err" v-if="type==1 && text=='审核' && value.length==0" title="请选择提交领导"></uni-list-item>
							</view>
							<view v-if="text!='审核' && type==1" class="ld">
								<uni-data-checkbox multiple v-model="value" :localdata="range" @change="change">
								</uni-data-checkbox>
								<uni-list-item class="err" v-if="text=='审核' && value.length==0" title="请选择提交领导"></uni-list-item>
							</view>
							<uni-list-item v-if="text!='审核'" title="办理单位"></uni-list-item>
							<view v-if="text!='审核'" class="ld">
								<uni-data-checkbox  multiple v-model="value1" :localdata="range1" @change="change1">
								</uni-data-checkbox>
							</view>
						</view>
						<view v-if="type==1 && text != '办理'" class="btn">
							<button size="mini" type="primary" @click="save">{{text}}提交</button>
						</view>

					</view>

				</view>
				<view style="height: 150rpx;"></view>
			</view>
			<uni-popup ref="popup1" type="bottom" :mask-click="false">
				<view class="box-style popup-box">
					<view class="textarea" style="visibility: hidden;">

					</view>
					<view class="info">办理信息已提交</view>
					<button class="btn" type="default" @click="closeinfo">确 定</button>
					<view style="height:20rpx;"></view>
				</view>
			</uni-popup>
			<uni-popup ref="popup1" type="bottom">
				<view class="box-style popup-box">
					<view class="textarea" style="visibility: hidden;"></view>
					<view class="info">{{text}}/催办信息已发送</view>
					<button class="btn" type="default" @click="closeinfo">确 定</button>
					<view style="height:20rpx;"></view>
				</view>
			</uni-popup>

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
	import Tabs from '@/components/Tabs/index.vue';
	import {
		gdDetail,
		addNetWorkOrder,
		getLeaders,
		gdDeptByLeader,
		tjsh
	} from '@/utils/api.js';
	let myChart;
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				type:1,
				text:'督办',
				value: [],
				range: [],
				value1: [],
				range1: [],
				value2: 2,
				range2: [{
					text:'是',
					value:1
				},{
					text:'否',
					value:2
				}],
				contentText: '',
				CENTER_ADVICE: '',
				CENTER_ADVICE_TIME: '',
				LEAD_ADVICE_TIME: '',
				sldata: '',
				isLandScape: true,
				active: '督办', //左侧tabs
				detail: {},
				indexs: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'],
				date: '',
				depts:'',
				depts1:'',
				deptLeaders:'',

			}
		},
		onReady() {
			//模拟从服务器获取数据
		},
		onLoad(option) {
			this.type = option.type;
			let role = uni.getStorageSync('role')
			console.log('role',role)
			if(role==='区领导账号') {
				this.text = '督办'
				if(this.type==1) {
					
				this.getLeaders()
				}
			};
			if(role==='区中心账号') {
				this.text = '审核'
				if(this.type==1) {
					
				this.getLeaders()
				}
			};
			if(role==='部门账号') {
				this.text = '办理'
			}
			this.gdDetail(option.formId)
			this.date = option.date
			// this.getLeaders()

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
			getLeaders() {
				getLeaders().then(res => {
					let {
						code,
						data
					} = res.data;
					console.log(code, data)
					this.range = data.map(item=>{
						return {
							value:item,
							text:item,
						}
					})
				}).catch(error => console.log(error))
			},
			gdDeptByLeader(rowId){
				return new Promise((resolve,reject)=>{
					gdDeptByLeader(rowId).then(res => {
						let {
							code,
							data
						} = res.data;
						console.log(code, data)
						let range1 = data.map(item=>{
							return {
								value:item.dept_leader_id,
								text:item.dept_leader,
							}
						})
						resolve(range1)
					}).catch(error => reject(error))
					
				})
			},
			change(e) {
				let deptLeaders = e.detail.value;
				this.deptLeaders = e.detail.value.toString();
				console.log(e)
				if(this.text=='审核')return;
				let arr= [];
				let arrAll = []
				if(deptLeaders.length==0) {
					this.range1 = []
				} else {
					deptLeaders.map((item,index)=>{
						let range = this.gdDeptByLeader(item);
						arr.push(range)
						Promise.all(arr).then(function(values) {
						  console.log(values);
						  arrAll = values.flat()
						  this.range1 = arrAll
						  console.log(range,arrAll)
						}.bind(this));
					})
					
				}
				
			},
			change1(e) {
				let depts = e.detail.value.toString()
				let depts1 = e.detail.data.map(item=>item.text).toString()
				this.depts = depts;
				this.depts1 = depts1;
				console.log('e:', depts1);
			},
			change2(e) {
				
			},
			gdDetail(id) {
				gdDetail(id).then(res => {
					let {
						code,
						data
					} = res.data
					// console.log(res)
					console.log(code, data)
					this.CENTER_ADVICE = data.busiFormAdvice.CENTER_ADVICE || ''
					this.CENTER_ADVICE_TIME = data.busiFormAdvice.CENTER_ADVICE_TIME || ''
					this.contentText = data.busiFormAdvice.LEAD_ADVICE || ''
					this.LEAD_ADVICE_TIME = data.busiFormAdvice.LEAD_ADVICE_TIME || ''
					let i= 0
					!!data.processList && data.processList.map((item,index)=>{
						// if(item.deptName.search('局')==true) {
						if(item.deptName.indexOf("局") != -1) {
							i+=1
							// item['i'] = i
							data.processList[index+1]['i'] = i
						}
					})
					this.detail = data
					// if(this.text == '办理') {
					if(!!data.busiFormAdvice.MANAGE_LEAD) {
						this.range =data.busiFormAdvice.MANAGE_LEAD.split(",").map(item=>{
							return {
								value:item,
								text:item,
							}
						})
						this.value= data.busiFormAdvice.MANAGE_LEAD.split(",")
						this.range1 =data.busiFormAdvice.MANAGE_DEPT.split(",").map(item=>{
							return {
								value:item,
								text:item,
							}
						})
						this.value1= data.busiFormAdvice.MANAGE_DEPT.split(",")
						this.value2 = 1;
						console.log(this.range)
					}
					console.log(this.detail)
				}).catch(error => console.log(error))
			},
			save() {
				// LEAD_ADVICE 领导建议
				// deptLeaders 单位负责人ID eg:单位1,单位2,单位3
				// depts 办理单位 eg:单位1,单位2,单位3
				// flag 是否提交到领导账号 1-是 2-否
				// leaders 提交到那些领导账号 eg:领导1,领导2,领导3
				let params = {}
				if(this.text == '审核') {
					 params = {
						id: this.detail.busiNum,
						// context: this.contentText,
						CENTER_ADVICE:this.CENTER_ADVICE,
						leaders:this.deptLeaders,
						flag:this.value2,
					}
				}
				if(this.text == '督办') {
					 params = {
						id: this.detail.busiNum,
						// context: this.contentText,
						// CENTER_ADVICE:this.CENTER_ADVICE,
						LEAD_ADVICE: this.contentText,
						// leaders:this.deptLeaders,
						deptLeaders:this.depts,
						depts:this.depts1,
					}
				}
				if(this.flag==1 && value.length==0)return;
				console.log(params)
				// return;
				tjsh(params).then(res => {
					let {
						code,
						data
					} = res.data;
					console.log(code, data, data.operMsg)
					if (code==0) {
						// this.$refs.popup.close();
						this.$refs.popup1.open('center');
					} else {
						this.message = data.operMsg
						// this.$refs.popup.close();
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: data.operMsg,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
						  	console.log('用户点击取消');
								}
							}
						});
					}
				}).catch(error => console.log(error))
			},
			sendinfo() {
				this.$refs.popup.close();
				this.$refs.popup1.open('center');
			},
			closeinfo() {
				this.$refs.popup1.close();
				uni.navigateTo({
					url: `/pages/supervise/superviselist?activetab=已${this.text}&date=${this.date}`
				})
			},

			clickLeft() {
				uni.navigateBack({
					delta: 1
				});
				// const pages = getCurrentPages();
				// if (pages.length === 2) {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	});
				// } else if (pages.length === 1) {
				// 	uni.switchTab({
				// 		url: '/pages/login/index',
				// 	})
				// } else {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	});
				// }
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
		overflow-x: hidden;

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

	/deep/ .uni-list-item__extra-text {
		// color: red;
	}

	.box-style {
		max-height: 80vh;
		overflow-y: auto;
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

	.btn {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		align-items: center;
	}

	.textareabox {
		// border:solid 1px #CCCCCC;
		border-radius: 5rpx;
		background-color: #fcfafa;
		overflow: hidden;
		padding: 10rpx 20rpx;
		color: #3b4144;
		box-sizing: border-box !important;
		margin-bottom: 20rpx;
		// 	min-height:200rpx !important;
		// height:auto !important;
	}

	/deep/ uni-textarea {
		min-height: 200rpx !important;
		height: auto !important;
		width: 100% !important;
		// border: solid 1px !important;
	}
	
	.ld {
		padding: 10rpx 30rpx;
		margin-bottom: 30rpx;
	}

	.clyj {
		height: auto !important;
		width: 100% !important;
		background-color: #fcfafa;
		overflow: hidden;
		padding: 10rpx;
		color: #3b4144;
		margin-bottom: 20rpx;
		font-size: 18rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		box-sizing: border-box !important;
	}

	// /deep/ .uni-textarea-textarea {
	// 	height:100rpx;
	// 	border:solid 1px #CCCCCC;
	// 	border-radius: 5rpx;
	// 	background-color: #EEEEEE;
	// 	overflow: hidden;
	// 	padding:10rpx;
	// 	color: #3b4144;
	// }


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

		.clyj {
			height: auto !important;
			width: 100% !important;
			background-color: #fcfafa;
			overflow: hidden;
			padding: 10rpx;
			color: #3b4144;
			margin-bottom: 20rpx;
			font-size: 18rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			box-sizing: border-box !important;
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

		.popup-box {
			width: 550rpx !important;
			min-height: 200rpx;
			background-size: 70% 50%;

			.textarea {
				height: 200rpx;
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
	.tjld {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.err {
		/deep/ .uni-list-item__container .uni-list-item__content-title {
			color: red !important;
			
		}
	}
</style>
