<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link tag="a" to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
const ERR_OK = 0

export default {
    name: 'app',
    components: {
      'v-header': header
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      }, (response) => {

      })
    },
    data () {
      return {
        seller: {}
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
#app
  line-height: 1
  font-weight: 200
  font-family: "微软雅黑", "Microsoft YaHei"
  .clear-fix
    display: inline-block
    &:after
      display: block
      content: "."
      height: 0
      line-height: 0
      clear: both
      visibility: hidden
  .tab
    display: flex
    position: relative
    width: 100%
    height: 40px
    line-height: 40px
    &::after
        position: absolute
        display: block
        width: 100%
        bottom: 0
        border-bottom: 1px solid rgba(0, 20, 20, .2)
        content: ' '
    .tab-item
        flex: 1
        text-align: center
        & > a
            display: block
            text-decoration: none
            font-size: 14px
            color: rgb(77, 85, 93)
            &.router-link-active
                color: rgb(240, 20, 20)
</style>
