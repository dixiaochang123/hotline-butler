<template>
	<view class="content">
		<view :class="[active==item.name ? 'item active-class' : '', 'item']" v-for="(item,index) in datalist"
			:key="index" @click="handlechange(item)">
			<image style="width: 80rpx; height: 80rpx; background-color: #eeeeee;" mode="aspectFit"
				src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
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
					name: '受理情况',
					url:'/pages/acceptance/index'
				}, {
					name: '考核数据',
					url:'/pages/index/index'
				}, {
					name: '督察督办',
					url:'/pages/login/index'
				}, {
					name: '数据分析',
					url:'/pages/login/index'
				}, {
					name: '个人中心',
					url:'/pages/login/index'
				}],
			};
		},
		methods: {
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			handlechange(item) {
				console.log(item.url)
				uni.navigateTo({
			　　     url: item.url //跳转地址
			　　  })
			},
		}
	}
</script>

<style lang="scss" scoped>
	@function rpx2multiple ($px) {
		@return ($px * 1.5)+rpx;
	}

	.content {
		width: 150rpx;
		width: rpx2multiple(150);
		height: 100%;
		background: #1E427B !important;
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
		color: #FFFFFF;
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
