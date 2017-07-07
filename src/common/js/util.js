/*
* @Author: 马润豪
* @Date:   2017-07-07 16:23:29
* @Last Modified by:   马润豪
* @Last Modified time: 2017-07-07 16:35:20
*/

'use strict'
/**
 * 解析url参数
 * @return Object {id: 123, a: b}
 */
export function urlParse () {
  let obj = {}
  let url = window.location.search
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  console.log(obj)
  return obj
}
