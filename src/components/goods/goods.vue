<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
					<span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="foodsWrapper">
		<ul>
			<li v-for="item in goods" class="foods-list food-list-hook">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li v-for="food in item.foods" class="food-item" @click="clickFood(food, $event)">
						<div class="icon">
							<img :src="food.icon" alt="" width="57" height="57">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span>月售{{food.sellCount}}份</span>
								<span>好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span><span class="unit">￥</span>{{food.price}}</span>
								<span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
							</div>
							<div class="control-wrapper">
								<cart-control :food="food"></cart-control>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
		</div>
		<shopcart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :select-foods="selectFoods"></shopcart>
		<food :food="selectFood" ref="food" @add="addFood"></food>
	</div>	
</template>
<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
import cartControl from '@/components/cartControl/cartControl'
import food from '@/components/food/food'
  const ERR_OK = 0
  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectFood: {}
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
          console.log(this.goods)
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex () {
        for (let i = 0, length = this.listHeight.length; i < length; i++) {
          let height = this.listHeight[i]
          let heightNext = this.listHeight[i + 1]
          if (!heightNext || (this.scrollY >= height && this.scrollY < heightNext)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      addFood (target) {
        this._drop(target)
      },
      _drop (target) {
        // 异步执行动画，优化体验
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      clickFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectFood = food
        this.$refs.food.show()
      }
    },
    components: {
      shopcart,
      cartControl,
      food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 100%
				line-height: 14px
				border-bottom: 1px solid rgba(0, 0, 0, .1)
				&.current
					position: relative
					margin-top: -1px
					z-index: 10
					background: #fff
					font-weight: 700
					border-bottom: 0
				.icon
					display: inline-block
					width: 12px
					height: 12px
					vertical-align: top
					margin-right: 2px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						background-image: url('./decrease_3@2x.png')
					&.discount
						background-image: url('./discount_3@2x.png')
					&.guarantee
						background-image: url('./guarantee_3@2x.png')
					&.invoice
						background-image: url('./invoice_3@2x.png')
					&.special
						background-image: url('./special_3@2x.png')
				.text
					display: table-cell
					width: 56px
					padding: 0 5px 0 10px
					vertical-align: middle
					font-size: 12px
		.goods-wrapper	
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				font-size: 12px
				color: rgb(147, 153, 159)
				border-left: 2px solid #d9dde1
				background: #f3f5f7
			.food-item
				display: flex
				padding: 18px
				border-bottom: 1px solid rgba(7, 17, 27, .1)
				&:last-child
					border-bottom: 0
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					position: relative
					flex: 1
					.name
						margin: 2px 0 8px
						font-size: 14px
						line-height: 10px
						color: rgb(7,17,27)
					.desc
						margin-bottom: 8px
						font-size: 10px
						color: rgb(147,153,159)
						line-height: 10px
					.extra
						font-size: 10px
						color: rgb(147,153,159)
						line-height: 10px
						margin-bottom: 8px
						span
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
					.control-wrapper
						position: absolute
						right: 0
						bottom: 0
</style>
