<template>
	<div class="rating-select">
		<div class="rating-type">
			<span class="block all" :class="{'active': selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active': selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positiveRatings.length}}</span></span>
			<span class="block negative" :class="{'active': selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negativeRatings.length}}</span></span>
		</div>
		<div class="switch" :class="{'on': onlyContent}" @click="toggleContent">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        this.selectType = type
        this.$dispatch('ratingtype.select', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.onlyContent = !this.onlyContent
      }
    },
    computed: {
      positiveRatings () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negativeRatings () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>
<style lang="stylus">
	.rating-select
		.rating-type
			padding: 12px 0 18px 
			margin: 0 18px
			border-bottom: 1px solid rgba(7,17,27,.1)
			font-size: 0
			.block
				display: inline-block
				padding: 8px 12px
				border-radius: 2px
				margin-right: 8px
				font-size:12px
				line-height: 16px
				color: rgb(77,85,93)
				background: rgba(0,160,220,.2)
				&.active
					color: #fff
					background: rgb(0,160,220)
				&.positive
					color: rgb(77,85,93)
					background: rgba(0,160,220,.2)
					&.active
						color: #fff
						background: rgb(0,160,220)
				&.negative
					color: rgb(77,85,93)
					background: rgba(77,85,93,.2)
					&.active
						color: #fff
						background: rgb(77,85,93)
				.count
					font-size: 8px
					margin-left: 2px
		.switch
			padding: 12px 0
			line-height: 24px
			font-size: 12px
			color: rgb(147,153,159)
			border-bottom: 1px solid rgba(7,17,27,.1)
			&.on
				.icon-check_circle
					color: #00c850
			.icon-check_circle
				margin: 0 4px 0 18px
				font-size: 24px
			.text
				font-size: 12px
				vertical-align: top
</style>
