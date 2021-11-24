<template>
	<view>
		<uni-table stripe border :loading="loading">
        <uni-tr style="display:table">
          <uni-th v-for="(item,index) in headers" :key="index" :width="item.width"
		  :style="{
			  display:item.hidden?'none':'table-cell',position:'relative',minWidth:item.width+'px'
			  }">
			  <view v-if="item.sort" style="height: 100%;width: 100%;position: absolute;left: 0;top: 0;" @click="doSort(item)"></view>
			<view style="display: flex;flex-direction: row;justify-content: center;">
			<text :style="{lineHeight:'20px'}">{{item.label}}</text>
			<view class="header-icon" :style="{lineHeight:'10px',display:'flex',flexDirection:'column',marginLeft:'10px'}" v-if="item.sort">
            <text
              class="iconfont icon-arrow-up"
			  :style="{fontSize:'10px',height:'10px',color:lastSortItem===item.key&&sortWay=='asc'?'#333':'#bcbcbc'}"
            />
            <text
              class="iconfont icon-arrow-down"
			  :style="{fontSize:'10px',height:'10px',color:lastSortItem===item.key&&sortWay=='desc'?'#333':'#bcbcbc'}"
            />
          </view>
		  </view>
		  </uni-th>
        </uni-tr>
		<tbody id="lyy-tbody" style="display:block;overflow-y:auto">
		<uni-tr v-if="contents.length<1" style="height: 50px;">
			<uni-td style="position: absolute;width: 100%;text-align: center;">暂无数据</uni-td>
		</uni-tr>
        <uni-tr v-else v-for="(content,sindex) in sortContents" :key="sindex" style="width:100%;display:table;table-layout: fixed;" @click.native="rowClick(content)" >
          <uni-td v-for="(header,hindex) in headers" :key="hindex" :style="{display:header.hidden?'none':'table-cell',textAlign:'center',width:header.width+'px'}">
		  <lyy-progress v-if="typeof header.format!=='undefined'&& header.format.type==='progress'&&!isNaN(parseFloat(content[header.key]))" :percent="content[header.key].toFixed(2)" show-info round ></lyy-progress>
		  <view v-else-if="typeof header.format!=='undefined'&& header.format.type==='html'" v-html="content[header.key]"></view>
		  <text v-else>{{content[header.key]}}</text>
		  </uni-td>
        </uni-tr>
		  <uni-tr v-if="totalRow.length>0">
			  <uni-td v-for="(header,index) in headers" :key="Math.random()" :style="{textAlign: 'center',display:header.hidden?'none':'table-cell',width:header.width+'px'}">
				  <text v-if="index==0">合计</text>
				  <view v-else>
					<!--<progress v-if="typeof header.format!=='undefined'&& header.format.type==='progress'" :percent="rendertotalRow(header)" :show-info="true" stroke-width="10" :active="true"></progress>-->
					<lyy-progress v-if="typeof header.format!=='undefined'&& header.format.type==='progress'&&!isNaN(parseFloat(rendertotalRow(header)))" :percent="rendertotalRow(header)" :show-info="true" round ></lyy-progress>
					<text v-else>{{ rendertotalRow(header)}}</text>
				  </view>
			  </uni-td>
		  </uni-tr>
		</tbody>
    </uni-table>
	</view>
</template>

<script>
	/**
	 * lyyTable ver1.2.0
	 * @description lyyTable表格组件 ver1.2.0
	 * @property {Boolean} loading = [true | false] 显示加载
	 * @property {Boolean} headerFixed = [true | false] 固定表头
	 * @property {Array} sortWays = ['none','asc','desc'] 排序顺序
	 *  @value none 不排序
	 *  @value asc  升序
	 *  @value desc 降序
	 * @property {String} emptyString 数据空白占位符
	 * @property {Array} Headers 表头列表
	 *  @value label 表头文字
	 *  @value key 绑定值
	 *  @value width 列宽
	 *  @value {Boolean} sort = [true | false] 是否启用排序
	 *  @value format 格式化
	 *   @value type = [string|html|conpute|progress]
	 *    @value string 字符串格式化
	 *    @value html html格式化
	 *    @value compute 计算格式化
	 *    @value progress 进度条格式化
	 *   @value {Array} keys 绑定值列表
	 *   @value template 格式化模板，占位符样式为{0}、{1}...以此类推
	 * @property {Array} contents 数据内容
	 * @property {Array} totalRow 合计行
	 * @property {Function} rowClick 行点击事件，回传参数为行数据
	 */
	import lyyProgress from './lyy-progress'
export default {
	name:"lyyTable",
	components:{
		lyyProgress
	},
	data() {
		return {
			lastSortItem:'',//上一次排序列
			sortWay:'none',//默认无排序
			sortIndex:0,
			sortContents:[],//排序时的表格内容
			footContent:{}
		}
	},
	props:{
		loading:{
			type:Boolean,
			default:false
		},
		headerFixed:{
			type:Boolean,
			default:false
		},
		sortWays:{
			type:Array,
			default:()=>['none','asc','desc']
		},
		emptyString:{
			type:String,
			default:'-'
		},
		headers:{
			type:Array,
			default:[],
		},
		contents:{
			type:Array,
			default:[]
		},
		totalRow:{
			type:Array,
			default:[]
		}
	},
	mounted(){
		//uni.setStorageSync('contents',this.contents)
		this.sortContents=this.contents.slice()
		this.renderContents()
		this.createTotalRow()
		//ver 1.2.0 修复 uni-table minWidth 问题
		this.$nextTick(() => {
			document.getElementsByClassName('uni-table')[0].removeAttribute('style')
		})
		//ver 1.2.0 新增 固定表头
		if(this.headerFixed){
			var wHeight = document.body.clientHeight
			var tablePoseY = document.getElementById('lyy-tbody').getBoundingClientRect().y
			document.getElementById('lyy-tbody').style.height=wHeight - tablePoseY +'px'
		}
	},
	watch:{
		contents(value) {
			this.sortContents = value
			this.renderContents()
			this.createTotalRow()
			for (var header of this.headers) {
				this.rendertotalRow(header)
			}
			this.$forceUpdate()
		// console.log(value)
		},
		//监听排序变化
		sortChange(value){
			var that = this
			var contents=that.contents.slice()
			console.log(that.sortContents)
			switch(value.sortWay){
				case 'none':
				that.sortContents=contents
				break
				case 'asc'://正序
				that.sortContents=that.sortContents.sort(function(a,b){
					//需要排序的列为数字时直接计算
					if(!isNaN(parseFloat(a[that.lastSortItem]))&&!isNaN(parseFloat(b[that.lastSortItem]))){
						return a[that.lastSortItem]-b[that.lastSortItem]
					}
					//非数字转为ASCII排序
					else{
						return a[that.lastSortItem].charCodeAt()-b[that.lastSortItem].charCodeAt()
					}
				})
				break
				case 'desc'://倒序
				that.sortContents=that.sortContents.sort(function(a,b){
					if(!isNaN(parseFloat(a[that.lastSortItem]))&&!isNaN(parseFloat(b[that.lastSortItem]))){
						return b[that.lastSortItem]-a[that.lastSortItem]
					} else{
						return b[that.lastSortItem].charCodeAt()-a[that.lastSortItem].charCodeAt()
					}
				})
				break
			}
			that.$forceUpdate()
		}
	},
	computed:{
		//将排序方式、上次排序列作为一个整体进行监听，不然会出现切换排序列不排序的现象
		sortChange(){
			var{sortWay,lastSortItem}=this
			return{
				sortWay,
				lastSortItem
			}
		}
	},
    methods:{
		//点击排序表头时存储上次排序列名，并循环切换排序方式
		doSort(item){
			if(this.lastSortItem !== item.key){
				this.lastSortItem=item.key
				this.sortIndex=0
				this.sortIndex++
				this.sortWay=this.sortWays[this.sortIndex]
			} else {
				if(this.sortIndex<2){
				this.sortIndex++
				this.sortWay=this.sortWays[this.sortIndex]
				}else{
				this.sortIndex=0
				this.sortWay=this.sortWays[0]
				}
			}
		},
		//表格内容渲染
		renderContents(){
			console.log('aaaa')
			const headers=this.headers
			//防止修改穿透
			var contents=JSON.parse(JSON.stringify(this.contents))
			//var contents=uni.getStorageSync('contents')
			let sortContents=this.sortContents
			var result = ''
			sortContents.forEach((content,index)=>{
				headers.forEach(header=>{
			//字符类型格式化
				if(typeof header.format!=='undefined'&&(header.format.type==='string'||header.format.type==='html')){
				var template = header.format.template
				var keys = header.format.keys
				console.log(typeof template)
				if(typeof template ==='function'){
					var arg=[]
					keys.forEach((el,i)=>{
						arg.push(contents[index][el])
					})
					result = template(arg)
					console.log(result)
				}else{
				keys.forEach((el,i)=>{
					var value = contents[index][el]
					var reg = new RegExp('\\{'+i+'}','g')
					template = template.replace(reg,value)
				})
				result =template
				}
				content[header.key] = result
				}
			//计算类型格式化
				else if(typeof header.format!=='undefined'&& (header.format.type==='compute'||header.format.type==='progress')){
					console.log(header.format.template)
					var temp = header.format.template
					var keys = header.format.keys
					keys.forEach((el,i)=>{
						var reg = new RegExp('\\{'+i+'}','g')
						temp = temp.replace(reg,contents[index][el])
					})
					content[header.key] =(new Function('return '+temp))()
						//this.sortContents[index][header.key]=result
				}
			})
		})
	},
    createTotalRow() {
      if (this.totalRow.length > 0) {
        var obj = this.contents[0]
        for (var i in obj) {
          this.footContent[i] = obj[i]
        }
        for (var i in this.footContent) {
          var result = 0
          if (this.sortContents.length > 0) {
            for (var j in this.sortContents) {
              result += parseFloat(this.sortContents[j][i])
            }
          }
          this.footContent[i] = result
        }
      }
    },
		//合计列渲染
		rendertotalRow(header){
			var content = this.footContent
			var result = this.emptyString
			if(this.totalRow.indexOf(header.key)>-1){
				if(typeof header.format!=='undefined'&& header.format.type==='compute') {
					var temp = header.format.template
					var keys = header.format.keys
					for(var index in keys){
						var reg = new RegExp('\\{'+index+'}','g')
						temp = temp.replace(reg,content[keys[index]])
					}
					result = (new Function('return '+temp))()
					result =isNaN(result)?this.emptyString:result
				}
				else if (typeof header.format !== 'undefined' && header.format.type === 'progress') {
					var temp = header.format.template
					var keys = header.format.keys
					for (var index in keys) {
						var reg = new RegExp('\\{' + index + '}', 'g')
						temp = temp.replace(reg, this.footContent[keys[index]])
						//console.log(this.footContent[keys[index]])
					}
					result = (new Function('return ' + temp))()
					result = isNaN(result) ? 0 : result
				}
				else if(typeof header.format==='undefined'|| header.format.type!=='compute'){
					if(!isNaN(content[header.key])){
						result = content[header.key]
					}
				}
			}
			return result
		},
		rowClick(data){
			this.$emit('rowClick',data)
		}
    }
}
</script>

<style scoped>
@import './css/iconfont.css';
</style>
