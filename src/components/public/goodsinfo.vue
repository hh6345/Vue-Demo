<template>
    <div class="goodsinfo">

		<transition
		@before-enter="beforeEnter"
      	@enter="enter"
      	@after-enter="afterEnter">
		<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>

        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<img :src="require(`../../assets/huawei/${id}.jpeg`)" alt="">
					</div>
				</div>
		</div>
		 <!-- 商品购买区域 -->
    <div class="mui-card" ref="Ballxy">
      <div class="mui-card-header">{{ idData.name}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ idData.price * 2 }}</del>&nbsp;&nbsp;销售价<span class="now_price">￥{{ idData.price }}</span>
          </p>
		  <p>购买数量：<numbox @getCount="getSelectedCount"></numbox> {{ this.num }}</p>
          <p>
            <mt-button type="primary" size="small" @click="test">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>
        
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
		</div>
        <mt-button type="primary" size="large" @click="test">测试用{{ id }}</mt-button>
    </div>
</template>
<script>
import numbox from '../public/numbox.vue'

export default {

    data() {
        return {
            id: this.$store.state.nowParams,
			idData: '',
			num: '1',
			ballFlag: false,
        }
    },
	created() {	
		this.getIdData()		
	},
    methods: {
        test() {
			const da=this.idData
			da.count=6
			//console.log(da)
			//console.log(JSON.stringify(da))
        },
		getIdData() {

			const goodsdata=require('../../assets/goodsdata.json').data
			const newArr = goodsdata.filter((item, index) => {
				return item.id === this.id
			})
			this.idData = newArr[0]
			
		},
		getSelectedCount(val) {
			this.num = val
		},
		addCar() {
		  const ballTop = this.$refs.Ballxy.offsetTop + 90
	  	  this.$refs.ball.style.top = ballTop +'px'
		  //console.log(ballTop)
		  this.ballFlag = !this.ballFlag;
		  
		  const car = this.idData
		  car.count = this.num
		  car.select = true

		  this.$store.commit('addShopCar', car)
		},
		//动画过渡钩子函数
		beforeEnter(el) {
      	el.style.transform = "translate(0, 0)";
    	},
    	enter(el, done) {

      	el.offsetWidth;

		// 获取小球的 在页面中的位置
		const ballPosition = this.$refs.ball.getBoundingClientRect();
		// 获取 徽标 在页面中的位置
		const badgePosition = document
			.getElementById("badge")
			.getBoundingClientRect();

		const xDist = badgePosition.left - ballPosition.left;
		const yDist = badgePosition.top - ballPosition.top;

		el.style.transform = `translate(${xDist}px, ${yDist}px)`;
		el.style.transition = "all 0.6s cubic-bezier(.4,-0.3,1,.68)";
		done();
    	},
    	afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    	}
    },
	components: { numbox }   
}
</script>
<style lang="less" scoped>
.goodsinfo{
	position: relative;
	.ball {
		width: 15px;
    	height: 15px;
    	border-radius: 50%;
    	background-color: red;
    	position: absolute;
    	z-index: 99;
    	top: 460px;
    	left: 146px;

	}
	img{
    width: 100%;
	// &:hover {
	// 	transform: skewX(10deg);
	// }
	}
}
</style>