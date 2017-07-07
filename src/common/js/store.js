/*
* @Author: 马润豪
* @Date:   2017-07-07 16:40:13
* @Last Modified by:   马润豪
* @Last Modified time: 2017-07-07 16:50:24
*/

'use strict'
export function saveToLocal (id, key, val) {
  let seller = localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = val
  localStorage.__seller__ = JSON.stringify(seller)
}
export function loadFromLocal (id, key, def) {
  let seller = localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
