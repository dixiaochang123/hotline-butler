<template>
	<view class="ly-progress" :style="{height:height+'px',fontSize:height+'px',borderRadius:round?parseFloat(height)/2+'px':'0px'}">
			<view class="ly-progress-bar"
			:style="{
				backgroundColor:bColor,
				border:`1px solid ${bColor}`,
				width:width,
				borderRadius:round?parseFloat(height)/2+'px':'0px',
				transition:'0.5s width'
				}">
			</view>
			<text v-if="showInfo" class="ly-progress-text" :style="{lineHeight:height+'px'}">{{percent+'%'}}</text>
	</view>
</template>

<script>
	export default{
		name:'lyyProgress',
		props:{
			percent:{
				type:[Number,String],
				default:0
			},
			height:{
				type:[Number,String],
				default:10
			},
			round:{
				type:Boolean,
				default:false
			},
			showInfo:{
				type:Boolean,
				default:false
			},
			colors:{
				type:Array,
				default:()=>['#1989FA']
			}
		},
		computed: {
			width() {
			if (parseFloat(this.percent) < 0) {
					return '0%'
				} else if (parseFloat(this.percent) > 100) {
				return '100%'
				} else {
					return parseFloat(this.percent) + '%'
				}
			},
			bColor(){
				if(this.colors.length<0){
					return '#1989FA'
				}else if(this.colors.length===1){
					return this.colors[0]
				}else{
					var per = 1/this.colors.length
					this.colors
				}
			}
		}
	}
</script>

<style lang="scss">
	.ly-progress{
		position: relative;
		min-width: 100%;
		display: flex;
		align-items: center;
		border: 1px solid #dedede;
		background-color: #efefef;
		.ly-progress-bar{
			height: 100%;
			width: 0%;
			background-color: #1989FA;
			border: 1px solid #1989FA;
		}
		.ly-progress-text{
			position: absolute;
			top: 0;
			right: 5px;
			color: black;
		}
	}
</style>
