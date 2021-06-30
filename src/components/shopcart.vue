<template>
<div class="shopcart">
    <div class="mui-card">
			<div class="mui-input-row mui-checkbox mui-left" v-for="item in this.$store.state.car" :key="item.id"
            @touchstart.prevent="goTouchstart(item.id)" @touchend.prevent="goTouchend()"
            >
				<!-- <label>checked：{{item.id}}++{{item.select}}</label> -->
                 <label></label>
				<input name="checkbox" value="Item 1" type="checkbox" :checked="item.select"
                @change="selectChange(item.id)">
                  <img :src="require(`../assets/huawei/${item.id}.jpeg`)" alt="">
                <div class="info">
                    <!-- <h5>{{item.name}}</h5> -->
                    <p>{{item.name}}</p>
                    <p><span>￥{{item.price}}</span>
                        <numbox :goodsid="item.id" :initcount="item.count"></numbox>
                        <!-- <a href="#" >删除</a> -->
                    </p>           
              
                </div>
                   
                
			</div>

    </div>
    <p>长按宝贝删除</p>

 <div class="count">
     <div class="mui-input-row mui-checkbox mui-left">
     <label>全选</label>
     <input name="checkbox" type="checkbox" :checked="this.$store.getters.getCheckAll" ref="check" @click="amountChanged">
     </div>
     <div class="btn">
     <p>合计:<span>￥{{ this.$store.getters.getAmount }}</span> </p>
     <mt-button type="primary">去结算</mt-button>
     </div>
 </div>
</div>
   
</template>
<script>
import { MessageBox } from 'mint-ui';
import numbox from './public/numbox2.vue'

export default{
    data() {
        return {

            timeOutEvent: 0 //记录触摸时长
        }
    },
    created(){
        
    },
    methods: {
        selectChange(id) {
            this.$store.commit("updateGoodsSelected",id)
        },
        amountChanged() {
			//console.log(this.$refs.check.checked)
            this.$store.commit("checkAll",this.$refs.check.checked)
		},

        goTouchstart(id) {
            let _this = this;
            clearTimeout(_this.timeOutEvent);
            _this.timeOutEvent = setTimeout(function() {
                _this.timeOutEvent = 0;
                //  处理长按事件
                MessageBox.confirm('移除该宝贝').then(action => {
                    // console.log(id)
                    _this.$store.commit("removeCar",id)
                });
            }, 600);
        },
        //手如果在600毫秒内就释放，则取消长按事件
        goTouchend() {
            let _this = this;
            clearTimeout(_this.timeOutEvent);
            // if (_this.timeOutEvent !== 0) {
            //     //  处理单击事件
            // }
        }
  
    },
    components: {
        numbox
    }
}

</script>

<style lang="less" scoped>
.shopcart{
width: 100%;
padding-bottom: 50px;

.mui-card {

    .mui-input-row{
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    // flex-direction:row;
    align-items: center;
    label {
        width: 0;
        padding-right:0;
    }
    input[type=checkbox]:before {
        line-height: 100px;
    }
    img {
        border: 3px solid #eee;
        border-radius: 3px;
        height: 100px;
    }
    .info {
        width: 100%;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
         p {

            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
             span {
                 color: red;
             }
         }
    }
    }
}
.count {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
    // text-align: center;
    display: flex;
    // flex-direction:row;
    align-items: center;
    justify-content: space-between;
    .btn {

        display: flex;
        align-items: center;
        margin-right: 5px;
    // justify-content: space-between;
    p{
        span {
            color: red;
        }
       font-size: 18px;
       margin-right: 10px;
    }
    }
    
}
}
</style>