<template>
	<view class="content">
		<uni-nav-bar left-icon="back" left-text="<"  title="热线管家" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="box">
			<Tabs :active="active"/>
			<view class="box-main" >
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
				<view class="" style="height: 100px;">111111</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import Tabs from '@/components/Tabs/index.vue'
	import { mapState, mapActions,mapMutations } from "vuex";
	export default {
		components: {
			uniNavBar,
			Tabs
		},
		data() {
			return {
				active:''
			}
		},
		onLoad() {
			
		},
		methods: {
			clickLeft() {
				
			}
		}
	}
</script>
<style>
	@import "../../static/font.css";
</style>
<style lang="scss" scoped>
	.content {
		height: 100vh;
		overflow: hidden;
	}
	.box {
		height: 100%;
		display: flex;
		justify-content: flex-start;
		
	}
	.box-main {
		width: 100%;
		overflow-y: auto;
	}
	// /deep/ .uni-nav-bar-text {
	// 	font-size: 32rpx;
	// 	font-family: DOUYU;
	// 	font-weight: normal;
	// 	color: #395176;
	// 	background: linear-gradient(0deg, #0030E1 0%, #0073FA 100%);
	// 	-webkit-background-clip: text;
	// 	-webkit-text-fill-color: transparent;
	// }

</style>
