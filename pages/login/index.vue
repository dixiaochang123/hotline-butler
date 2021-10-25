<template>
	<view>
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="a-i-c">
			武进12345热线管家
		</view>
		<view class="a-i-d">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uniFormsItem label="">
					<uniDataPicker placeholder="请选择班级"  :localdata="dataTree" v-model="classes" @nodeclick="onnodeclick"></uniDataPicker>
				</uniFormsItem>
				<uniFormsItem label="" name="name">
					<uniEasyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
				</uniFormsItem>
				<uniFormsItem label="" name="phone">
					<uniEasyinput class="input" v-model="formData.phone" type="number" placeholder="请输入手机号码" @input="binddata('phone',$event.detail.value)" />
				</uniFormsItem>
				<uniFormsItem label="" name="password">
					<uniEasyinput class="input" v-model="formData.password" type="password" placeholder="请输入密码" @input="binddata('phone',$event.detail.value)" />
				</uniFormsItem>
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
					name: '',
					phone: '',
					password:'',

				},
				index: 0,
				array: ['中国', '美国', '巴西', '日本'],
				classes: '3-0',
				dataTree: [{
						text: "一年级",
						value: "1-0",
					}, {
						text: "二年级",
						value: "2-0"

					},
					{
						text: "三年级",
						value: "3-0",
						disable: true
					}
				],
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对phone字段进行必填验证
					phone: {
						rules: [{
							required: true,
							errorMessage: '请输入手机号码',
						}]
					},
					// 对phone字段进行必填验证
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
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
	.a-i-c {
		font-size: 31rpx;
		text-align: center;
		color: #36f2ed;
		// margin-top: 250rpx;
	}
	.a-i-d {
		width:450rpx;
		margin:0 auto;
	}
	uni-input {
	    display: block;
	    font-size: 16px;
	    line-height: 1.4em;
	    height: 4.4em;
	    min-height: 1.4em;
	    overflow: hidden;
	}
</style>
