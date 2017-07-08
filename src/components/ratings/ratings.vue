<template>
	<div class="ratings" ref="ratingDiv">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="wrapper service">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<div class="score">{{seller.serviceScore}}</div>
					</div>
					<div class="wrapper foods">
						<span class="title">食品质量</span>
						<star :size="36" :score="seller.foodScore"></star>
						<div class="score">{{seller.foodScore}}</div>
					</div>
					<div class="wrapper delivery">
						<span class="title">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
		</div>
		<split></split>
		<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" :desc="desc"></ratingselect>
		<div class="rating-wrapper">
			<ul>
				<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
					<div class="avatar">
						<img :src="rating.avatar" width="28" height="28">
					</div>
					<div class="content">
						<h1 class="name">{{rating.username}}</h1>
						<div class="star-wrapper">
							<star :size="24" :score="rating.score"></star>
							<span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
						</div>
						<p class="text">{{rating.text}}</p>
						<div class="recomemnt" v-show="rating.recommend && rating.recommend.length">
							<span class="icon-thumb_up"></span>
							<span v-for="item in rating.recommend" class="tag">{{item}}</span>
						</div>
						<div class="time">
							{{rating.rateTime | parseTime}}
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import {formatDate} from '@/common/js/date'
import BScroll from 'better-scroll'
const ALL = 2
const ERR_OK = 0
  export default{
    props: {
      seller: Object
    },
    components: {
      star,
      split,
      ratingselect
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratingDiv, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      })
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratingDiv, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratingDiv, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      })
    },
    methods: {
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
    filters: {
      parseTime (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>
<style lang="stylus">
	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.overview
			display: flex
			padding: 18px 0
			.overview-left
				flex: 0 0 137px
				width: 137px
				border-right: 1px solid rgba(7,17,27,.1)
				text-align: center
				padding: 6px 0
				@media only screen and (max-width: 320px)
					flex: 0 0 120px
					width: 120px
				@media only screen and (max-width: 360px) and (min-width: 321px)
					flex: 0 0 130px
					width: 130px
				.score
					margin-bottom: 6px
					line-height: 28px
					font-size: 24px
					color: rgb(255,153,0)
				.title
					margin-bottom: 8px
					font-size: 12px
					line-height: 12px
					color: rgb(7,17,27)
				.rank
					font-size: 10px
					line-height: 10px
					color: rgb(147,153,159)
			.overview-right
				flex: 1
				padding: 0 24px
				@media only screen and (max-width: 320px)
					padding: 0 5px
				@media only screen and (max-width: 360px) and (min-width: 321px)
					padding-left: 16px
				.title
					display: inline-block
					line-height: 18px
					font-size: 12px
					color: rgb(7,17,27)
				.star
					display: inline-block
					vertical-align: top
					margin: 0 12px
				.score
					display: inline-block
					vertical-align: top
					font-size: 12px
					color: rgb(255,153,0)
				.wrapper
					margin-bottom: 8px
					font-size: 0px
					.time
						font-size: 12px
						color: rgb(147,153,159)
						margin-left: 12px
		.rating-wrapper
			margin: 0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-bottom: 1px solid rgba(7,17,27,.1)
				.avatar
					flex: 0 0 28px
					width: 28px
					margin-right: 12px
					img
						border-radius: 50%
				.content
					position: relative
					flex: 1
					.name
						font-size: 10px
						line-height: 12px
						color: rgb(7,17,27)
						margin-bottom: 4px
					.star-wrapper
						margin-bottom: 6px
						font-size: 0
						.star
							display: inline-block
							vertical-align: top
							margin-right: 6px
						.deliveryTime
							display: inline-block
							vertical-align: top
							line-height: 12px
							font-size: 10px
							font-weight: 200
							color: rgb(147,153,159)
					.text
						font-size: 12px
						color: rgb(7,17,27)
						line-height: 18px
						margin-bottom: 8px
					.recomemnt
						font-size: 0
						.icon-thumb_up
							display: inline-block
							font-size: 12px
							line-height: 16px
							color: rgb(0, 160, 220)
							margin: 0 8px 4px 0
						.tag
							display: inline-block
							border: 1px solid rgba(7,17,27,.1)
							padding: 0 4px
							border-radius: 2px
							background: #fff
							font-size: 9px
							color: rgb(147,153,159)
							line-height: 16px
							margin-right: 8px
					.time
						position: absolute
						top: 0
						right: 0
						line-height: 12px
						font-size: 10px
						color: rgb(147,153,159)
</style>
