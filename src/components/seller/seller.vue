<template>
	<div class="seller" ref="sellerDiv">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span>{{seller.minPrice}}</span><span class="unit">元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span>{{seller.deliveryPrice}}</span><span class="unit">元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span>{{seller.deliveryTime}}</span><span class="unit">分钟</span>
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<i class="icon-favorite" :class="{'active': favorite}"></i>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pictures">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picDiv">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" class="pic-img" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">
						<p class="text">{{info}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import star from '@/components/star/star'
import split from '@/components/split/split'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/common/js/store'
  export default{
    props: {
      seller: Object
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    components: {
      star,
      split
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
        this._picScroll()
      })
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initScroll()
          this._picScroll()
        })
      }
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      },
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerDiv, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _picScroll () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picDiv, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      }
    }
  }
</script>
<style lang="stylus">
	.seller
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.overview
			position: relative
			padding: 18px
			.title
				margin-bottom: 8px
				font-size: 14px
				line-height: 14px
				color: rgb(7,17,27)
			.desc
				padding-bottom: 18px
				line-height: 18px
				font-size: 0
				border-bottom: 1px solid rgba(7,17,27,.1)
				.star
					display: inline-block
					margin-right: 8px
					vertical-align: top
				.text
					display: inline-block
					margin-right: 12px
					font-size: 10px
					vertical-align: top
					color: rgb(77,85,93)
			.remark
				display: flex
				margin-top: 18px
				.block
					flex: 1
					text-align: center
					border-right: 1px solid rgba(7,17,27,.1)
					&:last-child
						border-right: 0
					h2
						margin-bottom: 4px
						line-height:10px
						font-size: 10px
						color: rgb(147,153,159)
					.content
						font-size: 24px
						font-weight: 200
						color: rgb(7,17,27)
						line-height: 24px
						.unit
							font-size: 10px
			.favorite
				position: absolute
				top: 18px
				right: 18px
				width: 36px
				text-align: center
				.icon-favorite
					display: block
					font-size: 24px
					line-height: 24px
					color: #d4d6d9
					margin-bottom: 4px
					&.active
						color: rgb(240,20,20)
				.text
					font-size: 10px
					line-height: 10px
					color: rgb(77,85,93)
		.bulletin
			margin: 0 18px
			padding-top: 18px
			.title
				margin-bottom: 8px
				font-size: 14px
				line-height: 14px
				color: rgb(7,17,27)
			.content-wrapper
				padding: 0 12px 16px
				border-bottom: 1px solid rgba(7,17,27,.1)
				.content
					line-height: 24px
					font-size: 12px
					font-weight: 200
					color: rgb(240,20,20)
			.supports
				.support-item
					padding: 16px 12px
					font-size: 0
					border-bottom: 1px solid rgba(7,17,27,.1)
					&:last-child
						border-bottom: 0
					.icon
						display: inline-block
						width: 16px
						height: 16px
						margin-right: 6px
						background-size: 16px 16px
						background-repeat: no-repeat
						vertical-align: top
						&.decrease
							background-image: url('./decrease_4@2x.png')
						&.discount
							background-image: url('./discount_4@2x.png')
						&.guarantee
							background-image: url('./guarantee_4@2x.png')
						&.invoice
							background-image: url('./invoice_4@2x.png')
						&.special
							background-image: url('./special_4@2x.png')
					.text
						line-height: 16px
						font-size: 12px
						font-weight: 200
						color: rgb(7,17,27)
		.pictures
			margin: 18px
			.title
				margin-bottom: 12px
				font-size: 14px
				line-height: 14px
				color: rgb(7,17,27)
			.pic-wrapper
				width: 100%
				overflow: hidden
				white-space: nowrap
				.pic-list
					font-size: 0
					.pic-item
						display: inline-block
						margin-right: 6px
						width: 120px
						height: 90px
						&:last-child
							margin-right: 0
		.info
			margin: 18px 18px 0
			.title
				margin-bottom: 12px
				font-size: 14px
				line-height: 14px
				color: rgb(7,17,27)
			.info-item
				padding: 16px 12px
				border-top: 1px solid rgba(7,17,27,.1)
				.text
					font-size: 12px
					font-weight: 200
					line-height: 16px
					color: rgb(7,17,27)
</style>
