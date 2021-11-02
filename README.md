# 热线管家pad
## 引入 echarts.min.js
<!-- #ifdef APP-PLUS || H5  -->
		<view id="container"></view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
## 创建图表
<code>
// 创建 html5 canvas DOM
			const canvas = document.createElement('canvas')
			// id 不可重复
			canvas.id = 'f2'
			canvas.width = uni.upx2px(750)
			canvas.height = uni.upx2px(750)
			container.appendChild(canvas)
			this.canvas = canvas;
			<!-- #endif -->
</code>

## 分辨率
<code>
华为MatePad Pro屏幕分辩率
分辨率：2560×1440
像素密度：240PPI
设备像素比= 240PPI/160PPI 约等于 1.5‬
屏幕物理像素/设备独立像素 = 设备像素比
设备独立像素-长= 屏幕物理像素/设备像素比 = 2560/1.5 = 1707
设备独立像素-宽= 屏幕物理像素/设备像素比 = 1440/1.5 = 960
</code>