import request from './request.js'
// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
	data
  })
}
// 退出
export function signout(data) {
  return request({
    url: '/log',
    method: 'post',
	data
	
  })
}
// 回访不满意工单
export function hfbmygd(data) {
  return request({
    url: `/slqk/hfbmygd?date=${data}`,
    method: 'get',
	params:''
  })
}
// 诉求热点top5二级归口
export function twojgk(data) {
  return request({
    url: `/slqk/hot/top5/2jgk?date=${data}`,
    method: 'get',
    params:''
  })
}

// 诉求热点top5三级归口
export function threejgk(data) {
  return request({
    url: `/slqk/hot/top5/3jgk?date=${data}`,
    method: 'get',
    params:''
  })
}

// 受理数据
export function slsj(data) {
  return request({
    url: `/slqk/slsj?date=${data}`,
    method: 'get',
    params:''
  })
}

// 受理数据按内容分类
export function context(data) {
  return request({
    url: `/slqk/slsj/context?date=${data}`,
    method: 'get',
    params:''
  })
}
// 受理数据按诉求类型分类
export function type(data) {
  return request({
    url: `/slqk/slsj/type?date=${data}`,
    method: 'get',
    params:''
  })
}

// 一次不满意工单详情
export function detail(data) {
  return request({
    url: `/slqk/ycbmy/detail?date=${data}`,
    method: 'get',
    params:''
  })
}
// 一次不满意工单详情
export function detaillist(data) {
  return request({
    url: `/slqk/ycbmy/detail/list?date=${data}`,
    method: 'get',
    params:''
  })
}

// 督办工单问题集中点--二级归口
export function dbdc2jgk(data) {
  return request({
    url: `/dbdc/2jgk?date=${data}`,
    method: 'get',
    params:''
  })
}

// 督办工单问题集中点--三级归口
export function dbdc3jgk(data) {
  return request({
    url: `/dbdc/3jgk?date=${data}`,
    method: 'get',
    params:''
  })
}

// 督办工单关联单位
export function gldept(data) {
  return request({
    url: `/dbdc/gldept?date=${data}`,
    method: 'get',
    params:''
  })
}
// 回访不满意工单
export function dbdchfbmygd(data) {
  return request({
    url: `/dbdc/hfbmygd?date=${data}`,
    method: 'get',
    params:''
  })
}

// 多次流转单--同比环比
export function lzdtbhb(data) {
  return request({
    url: `/dbdc/lzdtbhb?date=${data}`,
    method: 'get',
    params:''
  })
}

// 督办数据
export function overview(data) {
  return request({
    url: `/dbdc/overview?date=${data}`,
    method: 'get',
    params:''
  })
}
// 诉求量变化趋势
export function sqlbhqs(data) {
  return request({
    url: `/dbdc/sqlbhqs?date=${data}`,
    method: 'get',
    params:''
  })
}

// 问题工单列表
export function wtgd(data) {
  return request({
    url: `/dbdc/wtgd?date=${data}`,
    method: 'get',
    params:''
  })
}

// 问题工单总量
export function wtgdzl(data) {
  return request({
    url: `/dbdc/wtgdzl?date=${data}`,
    method: 'get',
    params:''
  })
}
// 主要涉及部门
export function zysjbm(data) {
  return request({
    url: `/dbdc/zysjbm?date=${data}`,
    method: 'get',
    params:''
  })
}

// 区级部门
export function qjbm(data) {
  return request({
    url: `/khsjcz/qjbm?date=${data}`,
    method: 'get',
    params:''
  })
}
// 区人社局当年三率月度变化趋势
export function dnsltrend(data) {
  return request({
    url: `/khsjcz/qrsj/dnsl/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 区人社局当年月度考核排名分布情况
export function dnydkhtrend(data) {
  return request({
    url: `/khsjcz/qrsj/dnydkh/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 区人社局当年综合评分月度变化趋势
export function dnzhpftrend(data) {
  return request({
    url: `/khsjcz/qrsj/dnzhpf/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 区人社局得分情况
export function score(data) {
  return request({
    url: `/khsjcz/qrsj/score?date=${data}`,
    method: 'get',
    params:''
  })
}

// 镇街道
export function zjd(data) {
  return request({
    url: `/khsjcz/zjd?date=${data}`,
    method: 'get',
    params:''
  })
}

// 街道当年三率月度变化趋势
export function zjddnsltrend(data) {
  return request({
    url: `/khsjcz/zjd/dnsl/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 区人社局当年月度考核排名分布情况
export function zjddnydkhtrend(data) {
  return request({
    url: `/khsjcz/qrsj/dnydkh/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 街道当年综合评分月度变化趋势
export function zjddnzhpftrend(data) {
  return request({
    url: `/khsjcz/zjd/dnzhpf/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 街道得分情况
export function zjdscore(data) {
  return request({
    url: `/khsjcz/zjd/score?date=${data}`,
    method: 'get',
    params:''
  })
}
// 街道当年月度考核排名分布情况
export function zjddnydkhtrend1(data) {
  return request({
    url: `/khsjcz/zjd/dnydkh/trend?date=${data}`,
    method: 'get',
    params:''
  })
}

// 查询所有报告生成情况
export function reportcase(type) {
  return request({
    url: `/sjfx/all/report/case?type=${type}`,
    method: 'get',
    params:''
  })
}

// 数据分析-日报-总体情况
export function dayall(title) {
  return request({
    url: `/sjfx/day/all/case?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-日报-表格部分
export function dayform(title) {
  return request({
    url: `/sjfx/day/form?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-日报-集中诉求
export function dayjzsu(title) {
  return request({
    url: `/sjfx/day/jzsu?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-周报-总体情况
export function weekall(title) {
  return request({
    url: `/sjfx/week/all/case?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-周报-表格部分
export function weekform(title) {
  return request({
    url: `/sjfx/week/form?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-周报-集中诉求
export function weekjzsu(title) {
  return request({
    url: `/sjfx/week/jzsu?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-月报-总体情况
export function monall(title) {
  return request({
    url: `/sjfx/mon/all/case?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-月报-表格部分
export function monform(title) {
  return request({
    url: `/sjfx/mon/form?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-月报-集中诉求
export function monjzsu(title) {
  return request({
    url: `/sjfx/mon/jzsu?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-季报-集中诉求
export function quaall(title) {
  return request({
    url: `/sjfx/qua/all/case?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-季报-表格部分
export function quaform(title) {
  return request({
    url: `/sjfx/qua/form?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-季报-集中诉求
export function quajzsu(title) {
  return request({
    url: `/sjfx/qua/jzsu?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-年报-集中诉求
export function yearall(title) {
  return request({
    url: `/sjfx/year/all/case?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-年报-表格部分
export function yearform(title) {
  return request({
    url: `/sjfx/year/form?title=${title}`,
    method: 'get',
    params:''
  })
}

// 数据分析-年报-集中诉求
export function yearjzsu(title) {
  return request({
    url: `/sjfx/year/jzsu?title=${title}`,
    method: 'get',
    params:''
  })
}
