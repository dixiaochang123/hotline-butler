<template>
	<view class="content">
		<view :class="[active==item.name ? 'item active-class' : '', 'item']" v-for="(item,index) in datalist"
			:key="index" @click="handlechange(item)">
			<image style="width: 80rpx; height: 80rpx;" mode="aspectFit"
				:src="item.imgurl"
				@error="imageError"></image>
			<view>{{item.name}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			active: {
				type: String,
				default: "受理情况"
			},
		},
		data() {
			return {
				datalist: [{
					name: '督办',
					url:'/pages/supervise/index',
					imgurl:'/static/image/update/dcdb.png',
				}, {
					name: '受理情况',
					url:'/pages/acceptance/index',
					imgurl:'/static/image/update/slqk.png',
				}, {
					name: '考核数据',
					url:'/pages/assessdata/index',
					imgurl:'/static/image/update/khsj.png',
				}, {
					name: '数据分析',
					url:'/pages/dataanalysis/index',
					imgurl:'/static/image/update/sjfx.png',
				}, {
					name: '个人中心',
					url:'/pages/personal/index',
					imgurl:'/static/image/update/grzx.png',
				}],
			};
		},
		methods: {
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			handlechange(item) {
				console.log(item.url)
				if(this.active == item.name)return;
				uni.navigateTo({
			　　     url: item.url //跳转地址
			　　 })
			},
		}
	}
</script>

<style lang="scss" scoped>
	@function rpx2multiple ($px) {
		@return ($px * 1.2)+rpx;
	}

	.content {
		width: 150rpx;
		width: rpx2multiple(150);
		height: 100%;
		background: #ffffff !important;
		border-top-right-radius: 30rpx;
	}

	.item {
		text-align: center;
		width: 100%;
		height: rpx2multiple(100);
		margin-top: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 18px;
		font-size: rpx2multiple(18);
		font-family: PingFang SC;
		font-weight: bold;
		color: #395176;
		color: #395176;
		position: relative;

	}

	.active-class {
		&::after {
			content: "";
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 6rpx;
			height: rpx2multiple(100);
			background: #4585F5;
			border-radius: 3rpx;

		}
	}
</style>
