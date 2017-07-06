/*
* @Author: 马润豪
* @Date:   2017-07-06 19:40:15
* @Last Modified by:   马润豪
* @Last Modified time: 2017-07-06 19:56:48
*/

'use strict'
export function formatDate (date, fmt) {
  let d = new Date(date) || d
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, d.getFullYear().toString().substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : str.padStart(2, '0'))
    }
  }
  return fmt
}
