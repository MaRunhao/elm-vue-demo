<template>
	<div class="cart-control">
		<transition name="fade">
			<div class="minus" @click.stop.prevent="minusFood" v-show="food.count>0">
				<i class="icon-remove_circle_outline"></i>
			</div>
		</transition>
		<transition name="count">
			<div class="count" v-show="food.count>0">
				{{food.count}}
			</div>
		</transition>
		<div class="plus" @click.stop.prevent="addFood">
			<i class="icon-add_circle"></i>
		</div>
	</div>	
</template>
<script>
  import Vue from 'vue'
  export default {
    props: {
      food: Object
    },
    methods: {
      addFood (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        console.log(this)
        this.$emit('cart.add', event.target)
      },
      minusFood () {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
        console.log(this.food.count)
      }
    }
  }
</script>
<style lang="stylus">
	.cart-control
		font-size: 0
		.minus, .plus
			display: inline-block
			padding: 6px
			font-size: 24px
			line-height: 24px
			color: rgb(0,160,220)
			padding: 0 5px
			vertical-align: top
		.count
			display: inline-block
			font-size: 10px
			vertical-align: top
			padding: 0 2px
			line-height: 24px
			text-align: center
			color: rgb(7,17,27)
		.fade-enter-active, .fade-leave-active 
			transition: all .2s linear
			opacity: 1
			transform: translate3D(0,0,0) rotate(0deg)
		.fade-enter, .fade-leave-to
			opacity: 0
			transform: translate3D(24px ,0,0) rotate(180deg)
		.count-enter-active, .count-leave-active 
			transition: all .2s linear
			opacity: 1
			transform: translate3D(0,0,0)
		.count-enter, .count-leave-to
			opacity: 0
			transform: translate3D(24px ,0,0)
</style>
