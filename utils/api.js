import request from './request.js'
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
	data
  })
}
export function log(data) {
  return request({
    url: '/log',
    method: 'post',
	data
  })
}
export function hfbmygd() {
  return request({
    url: '/slqk/hfbmygd',
    method: 'get'
  })
}

export function wjpajsPaxc(data) {
  return request({
    url: '/activiti/wjpajsPaxc',
    method: 'post',
    data
  })
}
