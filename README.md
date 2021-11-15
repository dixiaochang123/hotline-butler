# 热线管家pad

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

## 接口
<code>
http://www.czssqw.net/zhzf_ly/
</code>

## 适配移动端
<code>
@media (max-width:500px) or
</code>

<code>
<!-- 获取屏幕宽度 -->
let windowWidth = 600
uni.getSystemInfo({
	success: function(res) {
		// _this.setWidth = res.windowWidth * 0.8
		console.log(res.windowWidth)
		windowWidth = res.windowWidth
	}
})
</code>

## 发布背景图不显示解决方法
<code>
background: url('~@/static/image/dlybg.png')  no-repeat rpx2multiple(128) center;
</code>

## 发布h5跨域解决方法
<code>
"router" : {
	"base" : "./",
	"mode" : "hash"
}
'production': {
	baseUrl: 'http://218.93.116.190:18080/wjrxgj',
}
</code>