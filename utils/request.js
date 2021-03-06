import { mapState,mapGetters, mapActions,mapMutations } from "vuex";
import store from '../store'
const config = require('./config')
console.log(config,process.env.NODE_ENV)
// 全局请求路径，也就是后端的请求基准路径
const baseURL = config[process.env.NODE_ENV].baseUrl
// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes=0;
// 封装请求方法，并向外暴露该方法
const service = (options)=>{
	// console.log(options.url)
	// 解构请求头参数
	let header = {...options.header};
	// 当前请求不是登录时请求，在header中加上后端返回的token
	if(options.url != '/login'){
	    // header["client-identity"] = uni.getStorageSync('session_id');
		let token = store.getters.token;
		if(!token) {
			uni.navigateTo({
		　　     url: '/pages/login/index' //跳转地址
		　　 })
		}
	    header["Authorization"] = token;
	}
	ajaxTimes++;
	// 显示加载中 效果
	uni.showLoading({
		title: "加载中",
	    mask: true,
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseURL+options.url,
			method: options.method || 'POST',
			data: options.data || {},
			header,
			sslVerify: false,
			success: (res)=>{
				console.log(res.statusCode)
				if(res.statusCode == 403) {
					uni.showModal({
					    title: '提示',
					    content: 'token过期，请重新登陆',
						showCancel:false,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
									uni.navigateTo({
								　　     url: '/pages/login/index' //跳转地址
								　　 })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				resolve(res)
			},
			fail: (err)=>{
				console.log(err)
				reject(err)
			},
			// 完成之后关闭加载效果
			complete:()=>{
				ajaxTimes--;
				if(ajaxTimes===0){
			        //  关闭正在等待的图标
			        uni.hideLoading();
			    }
			}
		})
	})
}
export default service
