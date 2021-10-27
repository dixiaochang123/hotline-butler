<template>
	<view class="content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="a-i-d">
			<view class="a-i-c">
				<text class="text1">热线管家</text>
				<text class="text2">LOGIN</text>
				<text class="text3">登录</text>
			</view>
			<uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
				<!-- <uniFormsItem label="">
					<uniDataPicker placeholder="请选择班级"  :localdata="dataTree" v-model="classes" @nodeclick="onnodeclick"></uniDataPicker>
				</uniFormsItem>
				<uniFormsItem label="" name="name">
					<uniEasyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
				</uniFormsItem> -->
				<uniFormsItem label="" name="phone">
					<uniEasyinput class="input" v-model="formData.phone" type="number" placeholder="请输入您的账号" @input="binddata('phone',$event.detail.value)" />
				</uniFormsItem>
				<uniFormsItem label="" name="password">
					<uniEasyinput class="input" v-model="formData.password" type="password" placeholder="请输入您的密码" @input="binddata('password',$event.detail.value)" />
				</uniFormsItem>
				<text class="forget-password">忘记密码?</text>
			</uni-forms>
			<button type="primary" @click="submit">登 陆</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uniForms from '@/components/uni-forms/components/uni-forms/uni-forms.vue'
	import uniFormsItem from '@/components/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uniEasyinput from '@/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uniDataPicker from '@/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue'

	export default {
		components: {
			uniNavBar,
			uniForms,
			uniFormsItem,
			uniEasyinput,
			uniDataPicker
		},
		data() {
			return {
				// 表单数据
				formData: {
					// name: '',
					phone: '',
					password:'',

				},
				// index: 0,
				// array: ['中国', '美国', '巴西', '日本'],
				// classes: '3-0',
				// dataTree: [{
				// 		text: "一年级",
				// 		value: "1-0",
				// 	}, {
				// 		text: "二年级",
				// 		value: "2-0"

				// 	},
				// 	{
				// 		text: "三年级",
				// 		value: "3-0",
				// 		disable: true
				// 	}
				// ],
				rules: {
					// 对name字段进行必填验证
					// name: {
					// 	rules: [{
					// 			required: true,
					// 			errorMessage: '请输入姓名',
					// 		},
					// 		{
					// 			minLength: 3,
					// 			maxLength: 5,
					// 			errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
					// 		}
					// 	]
					// },
					// 对phone字段进行必填验证
					phone: {
						rules: [{
							required: true,
							errorMessage: '请输入您的账号',
						}]
					},
					// 对phone字段进行必填验证
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入您的密码',
						}]
					}
				}
			};
		},
		methods: {
			onnodeclick(e) {
				this.classes = e.value;
			},
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			binddata(name, value) {
				// 通过 input 事件设置表单指定 name 的值
				this.$refs.form.setValue(name, value)
			},
			// 触发提交表单
			submit() {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: rgba(244, 247, 249, 1);
	}
	.a-i-d {
		width: 600rpx;
		height: 816rpx;
		background: #FFFFFF;
		box-shadow: 0px 34px 88px 4px rgba(0, 20, 199, 0.04);
		border-radius: 10rpx;
		text-align: center;
		position: absolute;
		right:128rpx;
		top:0;
		bottom:0;
		margin:auto;
		padding:0 100rpx;
	}
	.a-i-c {
		position: relative;
		height: 233rpx;
		text {
			display: block;
			font-size: 50rpx;
			color: #395176;
			font-family: PingFang SC;
		}
		.text1 {
			padding-top: 50rpx;
			font-size: 32px;
			font-family: DOUYU;
			font-weight: normal;
			background: linear-gradient(0deg, #0030E1 0%, #0073FA 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.text2 {
			font-weight: bold;
			opacity: 0.1;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin:auto;
			
		}
		.text3 {
			font-weight: 600;
			position: absolute;
			bottom: 15rpx;
			left: 0;
			right: 0;
			margin:auto;
		}
	}
	.form {
		position: relative;
	}
	.forget-password {
		position: absolute;
		bottom: 60rpx;
		right: 0;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #395176;
	}
	.uni-forms-item {
		padding-bottom: 67rpx;
	}
	/deep/ .uni-easyinput__content {
		border-left: none;
		border-right: none;
		border-top: none;
	}
</style>
