<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="supports-more" @click="showDetail">
				<span class="count">{{seller.supports.length}}个 &gt;</span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-arrow-right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
					<div class="detail-wrapper clear-fix">
						<div class="detail-main">
							<h1 class="name">{{seller.name}}</h1>
							<div class="star-wrapper">
								<star :size="48" :score="3.6"></star>
							</div>
							<div class="title">
								<div class="line"></div>
								<div class="text">优惠信息</div>
								<div class="line"></div>
							</div>
							<ul v-if="seller.supports" class="supports">
								<li class="support-item" v-for="item in seller.supports">
									<span class="icon" :class="classMap[item.type]"></span>
									<span class="text">{{item.description}}</span>
								</li>
							</ul>
							<div class="title">
								<div class="line"></div>
								<div class="text">商家公告</div>
								<div class="line"></div>
							</div>
							<div class="bulletin">
								<div class="content">{{seller.bulletin}}</div>
							</div>
						</div>
					</div>
					
				<div class="detail-close">
					<b class="icon-error" @click="showDetail"></b>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import star from '@/components/star/star'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = !this.detailShow
      }
    },
    components: {
      star
    }
  }
</script>
<style lang="stylus">
	.header
		position: relative
		color: #fff
		background-color: rgba(7, 17, 27, .5)
		overflow: hidden
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				margin-left: 16px
				.title
					margin: 2px 0 8px 0
					.name
						margin-left: 6px
						font-size: 16px
						line-height: 18px
						font-weight: bold
					.brand
						display: inline-block
						width: 30px
						height: 18px
						vertical-align: bottom
					  background: url("./brand@2x.png") no-repeat
					  background-size: 30px 18px
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.supports
					.icon
						display: inline-block
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						vertical-align: top
						&.decrease
							background-image: url('./decrease_1@2x.png')
						&.discount
							background-image: url('./discount_1@2x.png')
						&.guarantee
							background-image: url('./guarantee_1@2x.png')
						&.invoice
							background-image: url('./invoice_1@2x.png')
						&.special
							background-image: url('./special_1@2x.png')
					.text
						line-height: 12px
						font-size: 12px
			.supports-more
				position: absolute
				right: 12px
				bottom: 14px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background: rgba(0,0,0,0.2)
				
				text-align: center
				.count
					font-size: 12px
					line-height: 24px
		.bulletin-wrapper
			position: relative
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			background: rgba(7, 17, 27, 0.2)
			.bulletin-title
				display: inline-block
				width: 22px
				height: 12px
				background: url('./bulletin@2x.png') no-repeat
				background-size: 100%
				vertical-align: top
				margin-top: 8px
			.bulletin-text
				display: inline-block
				max-width: 90%
				font-size: 12px
				margin: 0 4px
				white-space: nowrap
				overflow: hidden
				text-overflow: ellipsis
				vertical-align: top
			.icon-arrow-right::after
				position: absolute
				font-size: 14px
				font-family: 'Microsoft YaHei'
				right: 10px
				top: 0px
				content: '>'
		.background
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		.detail
			position: fixed
			z-index: 100
			top: 0
			left: 0
			width: 100%
			height: 100%
			overflow: auto
			background: rgba(7, 17, 27, .8)
			transition: opacity .5s
			&.fade-enter-active, &.fade-leave-active
				opacity: 1
			&.fade-enter, &.fade-leave-to
				opacity: 0
			.detail-wrapper
				width: 100%
				min-height: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						font-weight: 700
						text-align: center
						font-size: 16px
					.star-wrapper
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						width: 80%
						margin: 28px auto 24px
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255,255,255,0.2)
						.text
							padding: 0 12px
							font-size: 14px
							font-weight: 700
					.supports
						width: 80%
						margin: 0 auto
						.support-item
							padding: 0 12px
							margin-bottom: 12px
							font-size: 0
							&:last-child
								margin-bottom: 0
							.icon
								display: inline-block
								height: 16px
								width: 16px
								vertical-align: top
								margin-right: 6px
								background-size: 16px 16px
								background-repeat: no-repeat
								&.decrease
									background-image: url('./decrease_2@2x.png')
								&.discount
									background-image: url('./discount_2@2x.png')
								&.guarantee
									background-image: url('./guarantee_2@2x.png')
								&.invoice
									background-image: url('./invoice_2@2x.png')
								&.special
									background-image: url('./special_2@2x.png')
							.text
								font-size: 12px
								line-height: 16px
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							line-height: 24px
							font-size: 12px
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin: -64px auto 0
				clear: both
				font-size: 32px
				.icon-error:before
					content: "×"
						
</style>
