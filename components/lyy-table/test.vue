<template>
	<view>
		<lyy-table :headerFixed="true" :contents="contents" :headers="headers" :totalRow="totalRow" @rowClick="rowClick"></lyy-table>
	</view>
</template>

<script>
	export default {
		name:"btable",
		data() {
			return {
				loading:false,
				totalRow:['sales','orders','saleroom','gross','test2'],
				headers:[{
					label: '排名',
					key: 'rank',
					width: 50
				}, {
					label: '姓名',
					key: 'name',
					width: 75
				}, {
					label: '部门',
					key: 'dept',
					width: 100
				}, {
					label: '销量',
					key: 'sales',
					width: 100,
					sort:true
				},{
					label:'销量完成率',
					key:'sales_task',
					width:130,
					sort:true,
					format:{
						type:'progress',
						keys:['sales','sales_task','orders'],
						template:'{0}/{1}*100'
					}
				},{
					label: '订单',
					key: 'orders',
					width: 100,
					sort:true
				}, {
					label: '销售额',
					key: 'saleroom',
					width: 125,
					sort:true
				}, {
					label: '毛利',
					key: 'gross',
					width: 125,
					sort:true
				}, {
					label: 'string格式化',
					key: 'test1',
					width: 125,
					format:{
						type:'string',
						keys:['name','dept'],
						template:'{0}--{1}'
					}
				}, {
					label: '计算格式化',
					key: 'test2',
					width: 125,
					sort:true,
					format:{
						type:'compute',
						keys:['orders','sales'],
						template:'{0}*{1}'
					}
				}, {
					label: 'html普通格式化',
					key: 'test3',
					width: 200,
					format:{
						type:'html',
						keys:['name','dept'],
						template:'<span><h1>{0}</h1>{1}</span>'
					}
				}, {
					label: 'html条件格式化',
					key: 'test4',
					width: 125,
					format:{
						type:'html',
						keys:['orders'],
						template:function(e){
							if(e[0]>1){
								return '<p style="color:red">'+e[0]+'</p>'
							} else return '<p style="color:green">'+e[0]+'</p>'
						}
					}
				}],
				contents:[{"rank":1,"id":10000,"name":"张三","dept":"销售一部","sales":26,'sales_task':100,"orders":2,"saleroom":2050000,"gross":240002},
					{"rank":2,"id":10002,"name":"王五","dept":"销售一部","sales":25,'sales_task':100,"orders":2,"saleroom":1530000,"gross":232001},
					{"rank":3,"id":10004,"name":"小明","dept":"销售二部","sales":50,'sales_task':120,"orders":2,"saleroom":1200000,"gross":130000},
					{"rank":4,"id":10001,"name":"李四","dept":"销售二部","sales":43,'sales_task':120,"orders":1,"saleroom":1100000,"gross":80001},
					{"rank":5,"id":10003,"name":"小红","dept":"销售三部","sales":19,'sales_task':80,"orders":1,"saleroom":200000,"gross":23334}],
				}
		},
		methods:{
			rowClick(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
.uni-progress{
	color: red;
	/deep/ .uni-progress-info{
		font-size: 10px !important;
	}
}
</style>
