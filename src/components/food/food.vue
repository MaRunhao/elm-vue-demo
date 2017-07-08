<template>
	<transition name="move">
		<div v-show="showFlag" class="food" ref="foodDiv">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" :alt="food.name">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now"><span class="unit">￥</span>{{food.price}}</span>
						<span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<transition name="fade">
						<div class="add-to-cart" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">
							加入购物车
						</div>
					</transition>
					<div class="cart-control-wrapper">
						<cart-control :food="food" @add="addFood"></cart-control>
					</div>
				</div>
				<split v-show="food.info"></split>
				<div class="food-info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="food-rating">
					<h1 class="title">商品评价</h1>
					<ratingselect @select="selectRating" @toggle="toggleContent" :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
					<div class="rating-wrapper">
						<ul v-if="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="time">{{rating.rateTime | parseTime}}</div>
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" class="avatar" width="12" height="12">
								</div>
								<p class="text">
									<i :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></i>
									{{rating.text || '暂无评价'}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-else>
							暂无评价
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartControl from '@/components/cartControl/cartControl'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import {formatDate} from '@/common/js/date'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

  export default {
    props: {
      food: Object
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    filters: {
      parseTime (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDiv, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      addFood(target) {
        this.$emit('add', target)
      },
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    components: {
      cartControl,
      split,
      ratingselect
    }
  }
</script>
<style lang="stylus">
	.food
		position: fixed
		left: 0
		top: 0
		bottom: 48px
		z-index: 30
		width: 100%
		background: #fff
		&.move-enter-active, &.move-leave-active
			transition: all .3s ease
			transform: translate3d(0,0,0)
		&.move-enter, &.move-leave-to
			transform: translate3d(100%,0,0)
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 10px
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 20px
					color: #fff
		.content
			position: relative
			padding: 18px
			.title
				line-height: 14px
				font-size: 14px
				margin-bottom: 8px
				font-weight: 700
				color: rgb(7,17,27)
			.detail
				margin-bottom: 18px
				font-size: 10px
				color: rgb(147,153,159)
				line-height: 10px
				height: 10px
				.sell-count
					margin-right: 12px
			.price
				font-size: 14px;
				color: rgb(240, 0, 0)
				font-weight: 700
				line-height: 24px
				margin-right: 8px
				.unit
					font-size: 10px
				.oldPrice
					font-size: 10px;
					color: rgb(147, 153, 159)
					font-weight: 700
					line-height: 10px
					text-decoration: line-through
					vertical-align: middle
			.cart-control-wrapper
				position: absolute
				right: 14px
				bottom: 16px
		.add-to-cart
			position: absolute
			right: 18px
			bottom: 18px
			z-index: 10
			height: 24px
			line-height:24px
			padding: 0 12px
			box-sizing: border-box
			border-radius: 12px
			font-size: 10px
			color: #fff
			background: rgb(0, 160, 220)
			&.fade-enter-active, &.fade-leave-active
				transition: all 0.2s
				opacity: 1
			&.fade-enter, &.fade-leave-to
				opacity: 0
		.food-info
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7,17,27)
			.text
				margin-left: 8px
				color: rgb(77,85,93)
				line-height:24px
				font-size:12px
				font-weight: 200
		.food-rating
			padding-top: 18px
			.title
				line-height: 14px
				margin: 0 0 6px 18px
				font-size: 14px
				color: rgb(7,17,27)
			.rating-wrapper
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-bottom: 1px solid rgba(7,17,27,.1)
					.user
						position: absolute
						right: 0
						top: 16px
						font-size: 0
						line-height: 12px
						.name
							font-size: 10px
							color: rgb(147,153,159)
							margin-right: 6px
							vertical-align: top
						.avatar
							border-radius: 50%
					.time
						font-size: 10px
						color: rgb(147,153,159)
						line-height: 12px
						margin-bottom: 6px
					.text
						font-size: 12px
						color: rgb(7,17,27)
						line-height: 16px
						.icon-thumb_up
							line-height: 24px
							color: rgb(0,160,220)
						.icon-thumb_down
							line-height: 24px
							color: rgb(147,153,159)
				.no-rating
					padding: 16px 0
					font-size: 12px
					color: rgb(147,153,159)
					text-align: center
</style>
