<template>
  <div class="shopcart">
	<div class="content">
		<div class="content-left" @click="toggleList">
			<div class="logo-wrapper">
				<div class="logo" :class="{'highLight': totalCount>0}">
					<i class="icon-shopping_cart"></i>
				</div>
				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
			</div>
			<div class="total-price" :class="{'highLight': totalCount>0}">￥{{totalPrice}}</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="content-right" :class="{'highLight': totalPrice>=minPrice}" @click="pay">
			<div class="text" v-if="totalPrice===0">￥{{minPrice}}元起送</div>
			<div class="text" v-else-if="totalPrice<minPrice">还差{{minPrice-totalPrice}}元起送</div>
			<div class="pay" v-else>去结算</div>
		</div>
		<div class="ball-container">
			<transition-group name="drop">
				<div v-for="(ball, index) in balls" v-show="ball.show" class="ball" :key="index">
					<div class="inner inner-hook"></div>
				</div>
			</transition-group>
		</div>
	</div>
	<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li v-for="food in selectFoods" class="food">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span class="count"><span class="unit">￥</span>{{food.count * food.price}}</span>
						</div>
						<div class="cart-control-wrapper">
							<cart-control :food="food"></cart-control>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>
	  <transition name="mask">
	  	<div class="list-mask" v-show="listShow" @click="toggleList"></div>
	  </transition>
  </div>
</template>
<script>
import cartControl from '@/components/cartControl/cartControl'
import BScrool from 'better-scroll'
  export default {
    props: {
      deliveryPrice: Number,
      minPrice: Number,
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScrool(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop (el) {
        for (let i = 0, length = this.balls.length; i < length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        // ...订单
        window.alert(`支付${this.totalPrice}元`)
      }
    },
    transition: {
      drop: {
        befroeEnter (el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.ball[count]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect()
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top)
              el.style.display = ''
              el.style.webKitTransform = `translate3D(0, ${y}px, 0)`
              el.style.transform = `translate3D(0, ${y}px, 0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webKitTransform = `translate3d(${x}px, 0, 0)`
              inner.style.transform = `translate3d(${x}px, 0, 0)`
            }
          }
        },
        enter (el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
            el.style.webKitTransform = 'translate3D(0, 0, 0)'
            el.style.transform = 'translate3D(0, 0, 0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webKitTransform = 'translate3d(0, 0, 0)'
            inner.style.transform = 'translate3d(0, 0, 0)'
            })
        },
        afterEnter (el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      }
    },
    components: {
      cartControl
    }
  }
</script>
<style lang="stylus">
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		width: 100%
		height: 48px
		z-index: 90
		.content
			display: flex
			background: #141d27
			font-size: 0
			.content-left
				flex: 1
				.logo-wrapper
					position: relative
					display: inline-block
					top: -10px
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					border-radius: 50%
					vertical-align: top
					background: #141d27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background: #2b343c
						text-align: center
						&.highLight
							background: rgb(0, 160, 220)
							.icon-shopping_cart:before
								color: #fff
						.icon-shopping_cart:before
							font-size: 24px
							color: #80885a
							line-height: 44px
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						background: red
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #fff
						box-shadow: 0 4px 8px rgba(0,0,0,.4)
				.total-price
					display: inline-block
					vertical-align: top
					margin-top: 12px
					line-height: 24px
					font-size: 16px
					color: rgba(255,255,255,0.4)
					box-sizing: border-box
					padding-right: 12px
					border-right: 1px solid rgba(255,255,255,.1)
					&.highLight
						color: #fff
				.desc
					display: inline-block
					vertical-align: top
					margin-top: 12px
					line-height: 24px
					font-size: 12px
					color: rgba(255,255,255,.4)
					box-sizing: border-box
					padding: 0 12px
			.content-right
				flex: 0 0 105px
				width: 105px
				background: #2b343c
				&.highLight
					background: #00b43c
				.text, .pay
					margin: 0 8px
					font-weight: 700
					font-size: 12px
					color: rgba(255,255,255,.4)
					line-height: 24px
					margin-top: 12px
					text-align: center
				.pay
					color: #fff
		.ball-container
			.ball
				postion: fixed
				left: 32px
				bottom: 22px
				z-index: 99
				&.drop-enter-active, &.drop-leave-active
					transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
					.inner
						width: 16px
						height: 16px
						border-radius: 50%
						background: rgb(0, 160, 220)
						transition: all .4s line
		.shopcart-list
			position: fixed
			bottom: 48px
			left: 0
			z-index: -1
			width: 100%
			&.fold-enter-active, &.fold-leave-active
				transition: all .5s ease
				bottom: 48px
			&.fold-enter, &.fold-leave-to
				bottom: -100%
			.list-header
				height: 40px
				line-height: 40px
				padding: 0 18px
				background: #f3f5f7
				border-bottom: 1px solid rgba(7, 17, 27, .1)
				.title
					float: left
					font-size: 14px
					font-weight: 200
					color: rgb(7, 17, 27)
				.empty
					float: right
					font-size: 12px
					color: rgb(0, 160, 220)
			.list-content
				padding: 0 18px
				max-height: 217px
				overflow: hidden
				background: #fff
				.food
					position: relative
					padding: 12px 0
					box-sizing: border-box
					border-bottom: 1px solid rgba(0, 0, 0, .1)
					.name
						line-height: 24px
						font-size: 14px
						color: rgb(7, 17, 27)
					.price
						position: absolute
						right: 90px
						bottom: 12px
						line-height: 24px
						font-size: 14px
						font-weight: 700
						color: rgb(240, 20, 20)
						.unit
							font-size: 10px
							font-weight: normal
					.cart-control-wrapper
						position: absolute
						right: 0px
						bottom: 12px
	.list-mask
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -2
		backdrop-filter: blur(10px)
		background: rgba(7, 17, 27, .6)
		&.mask-enter-active, &.mask-leave-active
			transition: all .3s
			opacity: 1
			background: rgba(7, 17, 27, .6)
		&.mask-enter, &.mask-leave-to
			opacity: 0
			background: rgba(7, 17, 27, 0)
			
</style>
