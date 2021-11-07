import request from './request.js'

export function getCartList() {
  return request({
    url: '/activiti/wjpajsPaxc',
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
