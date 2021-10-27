<template>
	<view class="content">
		<view class="" v-for="(item,index) in datalist" :key="item.name">
			{{item.name}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:[{
					name:'受理情况'
				},{
					name:'考核数据'
				},{
					name:'督察督办'
				},{
					name:'数据分析'
				},{
					name:'个人中心'
				}]
			};
		}
	}
</script>

<style lang="scss">
.content {
	width: 10%;
	height: 100%;
	background: #1E427B;
}
</style>
